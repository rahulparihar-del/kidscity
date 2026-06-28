import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, LayoutDashboard, Database, LogOut, Upload, Check, AlertCircle, ShoppingBag, Percent, Tag, Star } from 'lucide-react'
import { supabase } from '../supabaseClient'
import styles from './AdminPanel.module.css'

const CATEGORIES = ['Festival Wear', 'Birthday', 'Casual', 'Traditional', 'Baby']
const AVAILABLE_SIZES = ['0-2y', '2-4y', '4-6y', '6-8y', '8-10y', '10-12y', '12-14y']

export default function AdminPanel({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [loginError, setLoginError] = useState('')

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

  // Passcode verification
  const handleLogin = (e) => {
    e.preventDefault()
    if (passcode === 'kidscity2026') {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Invalid passcode. Hint: check implementation plan.')
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts()
    }
  }, [isAuthenticated])

  // Handle multiple image uploads and convert to Base64
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
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

                {/* Dropzone base64 uploader */}
                <div className={styles.inputWrap}>
                  <label>Product Image Files *</label>
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
                      <span>Click to Upload Product Images</span>
                      <small>Select multiple images (first will be cover)</small>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className={styles.previewGrid}>
                      {images.map((img, idx) => (
                        <div key={idx} className={styles.previewCard}>
                          <img src={img} alt={`Preview ${idx}`} />
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
                  )}
                </div>

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
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
