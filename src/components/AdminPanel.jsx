import { useState, useEffect, useMemo } from 'react'
import { Plus, Edit2, Trash2, LayoutDashboard, Database, LogOut, Upload, Check, AlertCircle, ShoppingBag, Percent, Tag, Star, Image as ImageIcon, RefreshCw, X } from 'lucide-react'
import { supabase } from '../supabaseClient'
import { upsertSiteImage, deleteSiteImage } from '../hooks/useSiteImages'
import styles from './AdminPanel.module.css'

const CATEGORIES = ['Festival Wear', 'Birthday', 'Casual', 'Traditional', 'Baby']
const AVAILABLE_SIZES = ['0-3m', '3-6m', '6-12m', '18-24m', '2-4y', '4-6y', '6-8y', '8-10y', 'S', 'M', 'L', 'XL']

/**
 * Converts a file to WebP format with high quality compression to keep
 * images looking crisp and HD while staying lightweight in database payload.
 * Max 900px × 1200px (ideal portrait aspect ratio), quality 0.85
 */
const convertToWebP = (file, maxWidth = 900, maxHeight = 1200, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Downscale image to fit within max constraints
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Try WebP first, fallback to JPEG if WebP not supported
        const webpDataUrl = canvas.toDataURL('image/webp', quality)
        // If browser doesn't support WebP, toDataURL returns PNG — fallback to JPEG
        if (webpDataUrl.startsWith('data:image/webp')) {
          resolve(webpDataUrl)
        } else {
          resolve(canvas.toDataURL('image/jpeg', quality))
        }
      }
      img.onerror = (err) => reject(err)
    }
    reader.onerror = (err) => reject(err)
  })
}

// Home page image slot definitions
const HOME_IMAGE_SLOTS = [
  {
    section: 'Hero Banner',
    slots: [
      { key: 'hero_left',   label: 'Left Card (Festival Wear)',   defaultSrc: '/images/festival_wear.webp',  description: 'Left tilted card in the hero collage' },
      { key: 'hero_center', label: 'Center Card (Main Hero)',     defaultSrc: '/images/hero_girl.webp',      description: 'Large center card — most prominent image' },
      { key: 'hero_right',  label: 'Right Card (Birthday)',       defaultSrc: '/images/birthday_dress.webp', description: 'Right tilted card in the hero collage' },
    ]
  },
  {
    section: 'Category Grid',
    slots: [
      { key: 'category_festival', label: 'Festival Season (Large Card)', defaultSrc: '/images/festival_wear.webp',  description: 'Large featured card — Festival / Navratri / Diwali' },
      { key: 'category_birthday', label: 'Birthday Special',             defaultSrc: '/images/birthday_dress.webp', description: 'Party & princess wear category card' },
      { key: 'category_casual',   label: 'Boys Casual',                  defaultSrc: '/images/casual_boys.webp',    description: 'Everyday casual wear category card' },
    ]
  }
]

export default function AdminPanel({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [loginError, setLoginError] = useState('')

  // Tab state: 'products' | 'homeImages'
  const [activeTab, setActiveTab] = useState('products')

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' }) // success or error

  // Form states
  const [editingId, setEditingId] = useState(null) // null means adding new product
  const [name, setName] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [priceVal, setPriceVal] = useState('')
  const [discount, setDiscount] = useState('0')
  const [tag, setTag] = useState('')
  const [tagColor, setTagColor] = useState('#E07A5F')
  const [description, setDescription] = useState('')
  const [selectedSizes, setSelectedSizes] = useState([])
  const [fabric, setFabric] = useState('')
  const [wash, setWash] = useState('')
  const [setItem, setSetItem] = useState('')
  const [images, setImages] = useState([]) // Array of Base64 strings
  const [customSizeInput, setCustomSizeInput] = useState('')

  // Home images editor state
  const [siteImages, setSiteImages] = useState({}) // { [key]: dataUrl }
  const [siteImagesLoading, setSiteImagesLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState({}) // { [key]: bool }

// Native browser SHA-256 hash helper
const sha256 = async (text) => {
  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

  // Passcode verification using cryptographic hashing
  const handleLogin = async (e) => {
    e.preventDefault()
    const inputHash = await sha256(passcode)
    const targetHash = '4b0d50e914c7bdee548fb3b0384fdb5d25cdefb0126a6c5d9f3a6edd34c1325c'
    
    if (inputHash === targetHash) {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Invalid passcode.')
    }
  }

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })
      
      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error("Error fetching products:", err.message)
      setMessage({ text: 'Error fetching products from database.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Fetch current site_images from Supabase
  const fetchSiteImages = async () => {
    setSiteImagesLoading(true)
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('key, image_data')

      if (error) throw error

      const map = {}
      ;(data || []).forEach(row => {
        if (row.image_data) map[row.key] = row.image_data
      })
      setSiteImages(map)
    } catch (err) {
      console.warn('Could not load site_images:', err.message)
    } finally {
      setSiteImagesLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
      fetchSiteImages()
    }
  }, [isAuthenticated])

  // Handle multiple image uploads, convert to WebP, compress, and save
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    for (const file of files) {
      try {
        const webpDataUrl = await convertToWebP(file)
        // Log compressed size for debugging
        const sizeKB = Math.round(webpDataUrl.length * 0.75 / 1024)
        console.log(`Compressed image: ${sizeKB}KB (base64 length: ${webpDataUrl.length})`)
        if (sizeKB > 300) {
          console.warn(`Image is still large (${sizeKB}KB). Consider using a smaller source image.`)
        }
        setImages(prev => [...prev, webpDataUrl])
      } catch (err) {
        console.error("Failed to convert product image to WebP:", err)
        setMessage({ text: `Image conversion failed: ${err.message}`, type: 'error' })
      }
    }
  }

  // Remove image from preview list
  const removeImage = (idxToRemove) => {
    setImages(prev => prev.filter((_, idx) => idx !== idxToRemove))
  }

  // Toggle sizes checkboxes
  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  // Reset form helper
  const resetForm = () => {
    setEditingId(null)
    setName('')
    setCategory(CATEGORIES[0])
    setPriceVal('')
    setDiscount('0')
    setTag('')
    setTagColor('#E07A5F')
    setDescription('')
    setSelectedSizes([])
    setFabric('')
    setWash('')
    setSetItem('')
    setImages([])
    setCustomSizeInput('')
  }

  const handleAddCustomSize = () => {
    const val = customSizeInput.trim()
    if (!val) return
    if (!selectedSizes.includes(val)) {
      setSelectedSizes(prev => [...prev, val])
    }
    setCustomSizeInput('')
  }

  // Submit Handler: Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !priceVal) {
      setMessage({ text: 'Please fill name and price details.', type: 'error' })
      return
    }

    setSubmitting(true)
    setMessage({ text: '', type: '' })

    const parsedPrice = parseFloat(priceVal)
    const discountVal = parseFloat(discount) || 0
    const finalPriceVal = discountVal > 0 ? Math.round(parsedPrice * (1 - discountVal / 100)) : parsedPrice

    const productPayload = {
      name,
      category,
      price_val: finalPriceVal,
      price: `₹${finalPriceVal}`,
      tag: tag || null,
      tag_color: tag ? tagColor : null,
      img: images[0] || null, // primary image
      sizes: selectedSizes,
      description,
      specs: {
        Fabric: fabric || 'Premium Cotton',
        Wash: wash || 'Machine Washable',
        Set: setItem || 'Clothing Piece'
      },
      gallery: images,
      discount: discountVal
    }

    try {
      if (editingId) {
        // Edit Mode
        const { error } = await supabase
          .from('products')
          .update(productPayload)
          .eq('id', editingId)

        if (error) throw error
        setMessage({ text: 'Product updated successfully!', type: 'success' })
      } else {
        // Add Mode
        const { error } = await supabase
          .from('products')
          .insert([productPayload])

        if (error) throw error
        setMessage({ text: 'New product added successfully!', type: 'success' })
      }

      resetForm()
      fetchProducts()
    } catch (err) {
      console.error("Database operation failed:", err.message)
      setMessage({ text: `Failed to save product: ${err.message}`, type: 'error' })
    } finally {
      setSubmitting(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Load product details into Form for Edit
  const handleEditSelect = (product) => {
    setEditingId(product.id)
    setName(product.name)
    setCategory(product.category)
    // Reconstruct original price value from price_val and discount
    const origPrice = product.discount > 0 ? Math.round(product.price_val / (1 - product.discount / 100)) : product.price_val
    setPriceVal(origPrice.toString())
    setDiscount(product.discount ? product.discount.toString() : '0')
    setTag(product.tag || '')
    setTagColor(product.tag_color || '#E07A5F')
    setDescription(product.description || '')
    setSelectedSizes(product.sizes || [])
    setFabric(product.specs?.Fabric || '')
    setWash(product.specs?.Wash || '')
    setSetItem(product.specs?.Set || '')
    setImages(product.gallery || [])
    
    // Smooth scroll to form section
    const formSec = document.getElementById('admin-form-sec')
    if (formSec) {
      formSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product? This will reflect instantly on the public website.")) return
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      setMessage({ text: 'Product deleted from catalog.', type: 'success' })
      fetchProducts()
    } catch (err) {
      console.error("Delete failed:", err.message)
      setMessage({ text: `Failed to delete product: ${err.message}`, type: 'error' })
    }
  }

  // Dashboard calculations
  const dashboardStats = useMemo(() => {
    if (products.length === 0) return { total: 0, avgPrice: 0, discountedCount: 0 }
    
    const total = products.length
    const avgPrice = Math.round(products.reduce((acc, curr) => acc + curr.price_val, 0) / total)
    const discountedCount = products.filter(p => p.discount > 0).length

    return { total, avgPrice, discountedCount }
  }, [products])

  // ── Home Image Handlers ──────────────────────────────────────
  const handleSiteImageChange = async (key, e) => {
    const file = e.target.files[0]
    if (!file) return

    setImageUploading(prev => ({ ...prev, [key]: true }))
    try {
      const webpDataUrl = await convertToWebP(file)
      await upsertSiteImage(key, webpDataUrl)
      setSiteImages(prev => ({ ...prev, [key]: webpDataUrl }))
      setMessage({ text: 'Home page image updated! Changes are live on the website.', type: 'success' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Failed to upload site image:', err.message)
      setMessage({ text: `Failed to update image: ${err.message}`, type: 'error' })
    } finally {
      setImageUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  const handleSiteImageRemove = async (key) => {
    if (!window.confirm('Remove this custom image? The default image will be restored on the website.')) return

    setImageUploading(prev => ({ ...prev, [key]: true }))
    try {
      await deleteSiteImage(key)
      setSiteImages(prev => {
        const updated = { ...prev }
        delete updated[key]
        return updated
      })
      setMessage({ text: 'Custom image removed. Default image restored.', type: 'success' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setMessage({ text: `Failed to remove image: ${err.message}`, type: 'error' })
    } finally {
      setImageUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  // Login Gated View
  if (!isAuthenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h2>CRM Portal Access</h2>
            <p>Enter the administrator passcode to manage inventory and discounts.</p>
          </div>

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="passcode-input">Passcode</label>
              <input
                id="passcode-input"
                type="password"
                placeholder="Enter admin passcode..."
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {loginError && (
              <div className={styles.loginError}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="btn btn-terracotta" style={{ width: '100%' }}>
              Unlock Dashboard
            </button>
          </form>

          <button onClick={onBack} className={styles.loginBack}>
            Return to Store
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.adminPage}>
      {/* Navbar Section */}
      <div className={styles.adminHeader}>
        <div className="container">
          <div className={styles.headerInner}>
            <div>
              <span className="section-label">Inventory Management</span>
              <h1 className={styles.title}>CRM &amp; Product Control</h1>
            </div>
            <div className={styles.headerActions}>
              <button onClick={() => setIsAuthenticated(false)} className={styles.logoutBtn}>
                <LogOut size={16} /> Logout
              </button>
              <button onClick={onBack} className="btn btn-outline-navy">
                Back to Website
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={styles.tabBar}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'products' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('products')}
              id="admin-tab-products"
            >
              <Database size={16} />
              Product Catalog
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'homeImages' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('homeImages')}
              id="admin-tab-home-images"
            >
              <ImageIcon size={16} />
              Home Page Images
            </button>
          </div>
        </div>
      </div>

      <section className={styles.adminSection}>
        <div className="container">
          {/* Status Message Overlay */}
          {message.text && (
            <div className={`${styles.alert} ${message.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
              {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
              <span>{message.text}</span>
            </div>
          )}

          {/* ══════════════════ TAB: PRODUCTS ══════════════════ */}
          {activeTab === 'products' && (
            <>
              {/* Grid Overview Cards */}
              <div className={styles.dashboardGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#E07A5F' }}>
                    <ShoppingBag size={20} color="white" />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Active Products</span>
                    <span className={styles.statValue}>{dashboardStats.total} styles</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#81B29A' }}>
                    <Star size={20} color="white" />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Average Price</span>
                    <span className={styles.statValue}>₹{dashboardStats.avgPrice}</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#F4A261' }}>
                    <Percent size={20} color="white" />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>Discounted Styles</span>
                    <span className={styles.statValue}>{dashboardStats.discountedCount} styles</span>
                  </div>
                </div>
              </div>

              <div className={styles.contentGrid}>
                {/* Left: Product Creator Form */}
                <div id="admin-form-sec" className={styles.formCol}>
                  <div className={styles.formHeader}>
                    <Database size={18} className={styles.dbIcon} />
                    <h2>{editingId ? 'Edit Product Details' : 'Create New Style'}</h2>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputWrap}>
                      <label>Product Name / Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Traditional Banarasi Frock"
                        className="form-input"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputWrap}>
                        <label>Category *</label>
                        <select
                          className="form-input"
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                        >
                          {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.inputWrap}>
                        <label>Base Price (₹) *</label>
                        <input
                          type="number"
                          required
                          placeholder="e.g. 799"
                          className="form-input"
                          value={priceVal}
                          onChange={e => setPriceVal(e.target.value)}
                          min="0"
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputWrap}>
                        <label>Discount Percentage (%)</label>
                        <input
                          type="number"
                          placeholder="e.g. 10"
                          className="form-input"
                          value={discount}
                          onChange={e => setDiscount(e.target.value)}
                          min="0"
                          max="100"
                        />
                      </div>

                      <div className={styles.inputWrap}>
                        <label>Highlight Tag (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. Bestseller, New"
                          className="form-input"
                          value={tag}
                          onChange={e => setTag(e.target.value)}
                        />
                      </div>

                      <div className={styles.inputWrap}>
                        <label>Tag Background Color</label>
                        <input
                          type="color"
                          className="form-input"
                          style={{ height: '50px', padding: '5px' }}
                          value={tagColor}
                          onChange={e => setTagColor(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className={styles.inputWrap}>
                      <label>Product Description</label>
                      <textarea
                        rows="3"
                        placeholder="Describe design features, style accents, fitting..."
                        className="form-input"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{ resize: 'none' }}
                      />
                    </div>

                    {/* Sizing matrix checkboxes */}
                    <div className={styles.inputWrap}>
                      <label style={{ marginBottom: '10px', display: 'block' }}>Available Age Groups / Sizes *</label>
                      <div className={styles.sizesGrid}>
                        {AVAILABLE_SIZES.map(sz => (
                          <button
                            type="button"
                            key={sz}
                            className={`${styles.sizeBtn} ${selectedSizes.includes(sz) ? styles.sizeBtnActive : ''}`}
                            onClick={() => handleSizeToggle(sz)}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>

                      {/* Custom Size Input */}
                      <div className={styles.customSizeRow}>
                        <input
                          type="text"
                          placeholder="Add custom size (e.g. 24, XXL, 6-9m)..."
                          className="form-input"
                          value={customSizeInput}
                          onChange={e => setCustomSizeInput(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              handleAddCustomSize()
                            }
                          }}
                        />
                        <button
                          type="button"
                          className={`btn btn-beige ${styles.addSizeBtn}`}
                          onClick={handleAddCustomSize}
                        >
                          <Plus size={16} /> Add Custom
                        </button>
                      </div>

                      {/* Selected Sizes Tags */}
                      {selectedSizes.length > 0 && (
                        <div className={styles.selectedSizesTags}>
                          <span className={styles.tagsLabel}>Selected ({selectedSizes.length}):</span>
                          <div className={styles.tagsContainer}>
                            {selectedSizes.map(sz => (
                              <span key={sz} className={styles.sizeTag}>
                                {sz}
                                <button
                                  type="button"
                                  className={styles.removeTagBtn}
                                  onClick={() => handleSizeToggle(sz)}
                                  aria-label={`Remove size ${sz}`}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Specs */}
                    <div className={styles.specsBorder}>
                      <span className={styles.specsTag}>Clothing Specifications</span>
                      <div className={styles.formRow} style={{ marginTop: '10px' }}>
                        <div className={styles.inputWrap}>
                          <label>Fabric material</label>
                          <input
                            type="text"
                            placeholder="e.g. Silk blend, cotton"
                            className="form-input"
                            value={fabric}
                            onChange={e => setFabric(e.target.value)}
                          />
                        </div>
                        <div className={styles.inputWrap}>
                          <label>Wash Instruction</label>
                          <input
                            type="text"
                            placeholder="e.g. Dry clean, Hand wash"
                            className="form-input"
                            value={wash}
                            onChange={e => setWash(e.target.value)}
                          />
                        </div>
                        <div className={styles.inputWrap}>
                          <label>Set Contents</label>
                          <input
                            type="text"
                            placeholder="e.g. Kurta & pajama"
                            className="form-input"
                            value={setItem}
                            onChange={e => setSetItem(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ── Product Images ── */}
                    <div className={styles.inputWrap}>
                      <label>Product Image Files *</label>

                      {/* Upload area — always visible */}
                      <div className={styles.dropzone}>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          id="file-uploader"
                          className={styles.fileInput}
                        />
                        <label htmlFor="file-uploader" className={styles.dropLabel}>
                          <Upload size={22} className={styles.uploadIcon} />
                          <span>
                            {images.length > 0 ? '+ Add More Images' : 'Click to Upload Product Images'}
                          </span>
                          <small>
                            {images.length > 0
                              ? 'First image is cover photo'
                              : 'Select one or more images (first will be cover)'}
                          </small>
                        </label>
                      </div>

                      {/* Preview grid — only visible after images are selected */}
                      {images.length > 0 && (
                        <div className={styles.previewSection}>
                          <div className={styles.previewHeader}>
                            <span className={styles.previewCount}>
                              {images.length} image{images.length > 1 ? 's' : ''} · first = cover photo
                            </span>
                            <button
                              type="button"
                              className={styles.clearImagesBtn}
                              onClick={() => setImages([])}
                            >
                              <Trash2 size={13} /> Clear All
                            </button>
                          </div>
                          <div className={styles.previewGrid}>
                            {images.map((img, idx) => (
                              <div
                                key={idx}
                                className={`${styles.previewCard} ${idx === 0 ? styles.previewCover : ''}`}
                              >
                                <img
                                  src={img}
                                  alt={`Preview ${idx + 1}`}
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                    const fb = e.target.nextSibling
                                    if (fb) fb.style.display = 'flex'
                                  }}
                                />
                                <div className={styles.brokenImgFallback}>⚠️ Broken image</div>
                                {idx === 0 && <span className={styles.coverBadge}>Cover</span>}
                                <button
                                  type="button"
                                  className={styles.removePreviewBtn}
                                  onClick={() => removeImage(idx)}
                                  aria-label="Remove image"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>{/* end inputWrap */}

                    <div className={styles.formActions}>
                      <button type="submit" className="btn btn-terracotta" disabled={submitting}>
                        {submitting ? 'Saving to Database...' : editingId ? 'Update Product' : 'Add to Catalog'}
                      </button>
                      {editingId && (
                        <button type="button" className="btn btn-beige" onClick={resetForm}>
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Right: Product Inventory List */}
                <div className={styles.listCol}>
                  <div className={styles.listHeader}>
                    <Database size={18} className={styles.dbIcon} />
                    <h2>E-Commerce Catalog Inventory</h2>
                  </div>

                  {loading ? (
                    <div className={styles.loader}>
                      <div className={styles.spinner} />
                      <p>Loading database catalog...</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className={styles.empty}>
                      <AlertCircle size={28} className={styles.emptyIcon} />
                      <h3>No products found in DB</h3>
                      <p>Create a product on the left. Changes will sync in real-time on the client store.</p>
                    </div>
                  ) : (
                    <div className={styles.inventoryList}>
                      {/* Desktop Table View */}
                      <div className={styles.tableWrap}>
                        <table className={styles.table}>
                          <thead>
                            <tr>
                              <th>Cover</th>
                              <th>Product Info</th>
                              <th>Category</th>
                              <th>Price (Final)</th>
                              <th>Tag</th>
                              <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(p => (
                              <tr key={p.id}>
                                <td>
                                  {p.img ? (
                                    <img src={p.img} alt={p.name} className={styles.tableImg} />
                                  ) : (
                                    <div className={styles.tableImgPlaceholder}>No Img</div>
                                  )}
                                </td>
                                <td>
                                  <div className={styles.tableProductInfo}>
                                    <strong>{p.name}</strong>
                                    <span>Sizes: {p.sizes ? p.sizes.join(', ') : 'None'}</span>
                                  </div>
                                </td>
                                <td><span className={styles.tableCat}>{p.category}</span></td>
                                <td>
                                  <div className={styles.tablePriceRow}>
                                    <strong>{p.price}</strong>
                                    {p.discount > 0 && (
                                      <span className={styles.discountTag}>-{p.discount}%</span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  {p.tag ? (
                                    <span className={styles.tableTag} style={{ background: p.tag_color }}>
                                      {p.tag}
                                    </span>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                  <div className={styles.tableActions}>
                                    <button
                                      className={styles.actionEdit}
                                      onClick={() => handleEditSelect(p)}
                                      aria-label={`Edit ${p.name}`}
                                    >
                                      <Edit2 size={14} />
                                    </button>
                                    <button
                                      className={styles.actionDelete}
                                      onClick={() => handleDelete(p.id)}
                                      aria-label={`Delete ${p.name}`}
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Product Cards View */}
                      <div className={styles.mobileCardsList}>
                        {products.map(p => (
                          <div key={p.id} className={styles.mobileProductCard}>
                            <div className={styles.cardCover}>
                              {p.img ? (
                                <img src={p.img} alt={p.name} />
                              ) : (
                                <div className={styles.imgPlaceholder}>No Img</div>
                              )}
                              {p.discount > 0 && (
                                <span className={styles.cardDiscount}>-{p.discount}%</span>
                              )}
                            </div>
                            <div className={styles.cardDetails}>
                              <span className={styles.cardCategory}>{p.category}</span>
                              <h4 className={styles.cardName}>{p.name}</h4>
                              <div className={styles.cardPriceRow}>
                                <strong className={styles.cardPrice}>{p.price}</strong>
                                {p.tag && (
                                  <span className={styles.cardTag} style={{ background: p.tag_color }}>
                                    {p.tag}
                                  </span>
                                )}
                              </div>
                              <span className={styles.cardSizes}>Sizes: {p.sizes ? p.sizes.join(', ') : 'None'}</span>
                            </div>
                            <div className={styles.cardActions}>
                              <button
                                onClick={() => handleEditSelect(p)}
                                className={styles.actionEdit}
                                aria-label={`Edit ${p.name}`}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                className={styles.actionDelete}
                                aria-label={`Delete ${p.name}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ══════════════════ TAB: HOME PAGE IMAGES ══════════════════ */}
          {activeTab === 'homeImages' && (
            <div className={styles.homeImagesTab}>
              <div className={styles.homeImagesHeader}>
                <div>
                  <h2 className={styles.homeImagesTitle}>Home Page Image Manager</h2>
                  <p className={styles.homeImagesSubtitle}>
                    Upload custom images for each section of your home page. Changes are applied instantly — no deployment needed. If no custom image is set, the default store image is used.
                  </p>
                </div>
                <button
                  className={styles.refreshBtn}
                  onClick={fetchSiteImages}
                  disabled={siteImagesLoading}
                  title="Refresh image data"
                >
                  <RefreshCw size={16} className={siteImagesLoading ? styles.spinning : ''} />
                  Refresh
                </button>
              </div>

              {HOME_IMAGE_SLOTS.map(section => (
                <div key={section.section} className={styles.imageSectionBlock}>
                  <div className={styles.imageSectionHeader}>
                    <ImageIcon size={18} className={styles.dbIcon} />
                    <h3 className={styles.imageSectionTitle}>{section.section}</h3>
                  </div>

                  <div className={styles.imageSlotGrid}>
                    {section.slots.map(slot => {
                      const currentImg = siteImages[slot.key]
                      const isUploading = imageUploading[slot.key]
                      const isCustom = !!currentImg

                      return (
                        <div key={slot.key} className={`${styles.imageSlotCard} ${isCustom ? styles.imageSlotCardActive : ''}`}>
                          {/* Status badge */}
                          <div className={styles.slotStatusBadge}>
                            {isCustom ? (
                              <span className={styles.slotBadgeCustom}>
                                <Check size={11} /> Custom
                              </span>
                            ) : (
                              <span className={styles.slotBadgeDefault}>Default</span>
                            )}
                          </div>

                          {/* Image Preview */}
                          <div className={styles.slotPreviewWrap}>
                            <img
                              src={currentImg || slot.defaultSrc}
                              alt={slot.label}
                              className={styles.slotPreviewImg}
                            />
                            {isUploading && (
                              <div className={styles.slotUploading}>
                                <div className={styles.spinner} />
                              </div>
                            )}
                          </div>

                          {/* Slot Info */}
                          <div className={styles.slotInfo}>
                            <span className={styles.slotLabel}>{slot.label}</span>
                            <span className={styles.slotDesc}>{slot.description}</span>
                          </div>

                          {/* Actions */}
                          <div className={styles.slotActions}>
                            {/* Upload / Change button */}
                            <div className={styles.slotUploadWrap}>
                              <input
                                type="file"
                                accept="image/*"
                                id={`slot-file-${slot.key}`}
                                className={styles.fileInput}
                                onChange={e => handleSiteImageChange(slot.key, e)}
                                disabled={isUploading}
                              />
                              <label
                                htmlFor={`slot-file-${slot.key}`}
                                className={`${styles.slotUploadBtn} ${isUploading ? styles.slotUploadBtnDisabled : ''}`}
                              >
                                <Upload size={14} />
                                {isCustom ? 'Change Image' : 'Upload Image'}
                              </label>
                            </div>

                            {/* Remove custom / restore default */}
                            {isCustom && (
                              <button
                                className={styles.slotRemoveBtn}
                                onClick={() => handleSiteImageRemove(slot.key)}
                                disabled={isUploading}
                                title="Restore default image"
                              >
                                <X size={13} />
                                Restore Default
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
