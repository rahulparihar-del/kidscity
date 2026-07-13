import { useState, useEffect } from 'react'
import { ArrowLeft, MessageSquare, ShoppingBag, Heart, Star, Ruler, HelpCircle, ChevronDown, Check, X, PhoneCall } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabaseClient'
// PRODUCTS fallback loaded from dynamic props
import styles from './ProductDetail.module.css'

export default function ProductDetail({ product, onBack, onAddToBag, onSelectProduct, allProducts }) {
  const [activeImg, setActiveImg] = useState(product.img)
  const [selectedSize, setSelectedSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')
  const [wishlist, setWishlist] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [sizeHelperOpen, setSizeHelperOpen] = useState(false)
  const [childAge, setChildAge] = useState('')
  const [childHeight, setChildHeight] = useState('')
  const [predictedSize, setPredictedSize] = useState('')
  const [addedAnimation, setAddedAnimation] = useState(false)

  // Callback popup states
  const [showCallbackPopup, setShowCallbackPopup] = useState(false)
  const [phoneInput, setPhoneInput] = useState('')
  const [phoneCountry] = useState('+91')
  const [callbackSubmitted, setCallbackSubmitted] = useState(false)

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyRequested = localStorage.getItem('callbackRequested')
      const sessionDismissed = sessionStorage.getItem('callbackDismissed')
      if (!alreadyRequested && !sessionDismissed) {
        setShowCallbackPopup(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [product.id])

  const handleCallbackSubmit = async (e) => {
    e.preventDefault()
    if (!phoneInput || phoneInput.length < 10) return

    setCallbackSubmitted(true)
    localStorage.setItem('callbackRequested', 'true')

    try {
      await supabase.from('callback_requests').insert([{
        phone: `${phoneCountry} ${phoneInput}`,
        product_name: product.name,
        source: 'product_detail_popup',
        created_at: new Date().toISOString()
      }])
    } catch (err) {
      console.warn('Supabase callback save bypassed.', err)
    }
  }

  const getWhatsAppCustomLink = () => {
    const phone = '917891672762'
    const text = `Hi Kids City! I have a custom requirement. I'm looking at "${product.name}" (${product.price}). Can you help me?`
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  // Sizing predictor logic
  const handlePredictSize = (e) => {
    e.preventDefault()
    const age = parseFloat(childAge)
    const height = parseFloat(childHeight)
    
    if (isNaN(age) && isNaN(height)) return
    
    let size = ''
    if (height) {
      if (height <= 90) size = '0-2y'
      else if (height <= 104) size = '2-4y'
      else if (height <= 116) size = '4-6y'
      else if (height <= 128) size = '6-8y'
      else if (height <= 140) size = '8-10y'
      else if (height <= 152) size = '10-12y'
      else size = '12-14y'
    } else if (age) {
      if (age <= 2) size = '0-2y'
      else if (age <= 4) size = '2-4y'
      else if (age <= 6) size = '4-6y'
      else if (age <= 8) size = '6-8y'
      else if (age <= 10) size = '8-10y'
      else if (age <= 12) size = '10-12y'
      else size = '12-14y'
    }
    
    if (product.sizes.includes(size)) {
      setPredictedSize(size)
    } else {
      setPredictedSize(`${size} (Note: This specific size is currently out of stock for this item, consider adjacent sizes)`)
    }
  }

  // Add to inquiry bag action
  const handleAddToBag = () => {
    const sizeToUse = selectedSize || (predictedSize && !predictedSize.includes('Note') ? predictedSize : product.sizes[0])
    
    if (!selectedSize && !predictedSize) {
      // Auto-select first size if nothing selected
      setSelectedSize(product.sizes[0])
    }

    onAddToBag({
      id: product.id,
      name: product.name,
      price: product.price,
      size: sizeToUse,
      img: product.img,
      category: product.category
    })

    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 2000)
  }

  // Get WhatsApp order link
  const getWhatsAppOrderLink = () => {
    const sizeToUse = selectedSize || product.sizes[0]
    const phone = '917891672762'
    let text = `Hi Kids City! I saw the "${product.name}" on your website. I want to buy it in size "${sizeToUse}" (${product.price}). Is it available in store?`
    
    // If the image is a static file, append the full public URL so WhatsApp generates a preview card
    if (product.img && product.img.startsWith('/')) {
      const fullImgUrl = window.location.origin + product.img
      text += `\n\nProduct Photo: ${fullImgUrl}`
    }
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  // Filter related products from live array
  const relatedSource = allProducts && allProducts.length > 0 ? allProducts : []
  const relatedProducts = relatedSource.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  // Handle names with pipes dynamically for clean display
  const nameParts = product.name.split('|').map(s => s.trim())
  const displayName = nameParts[0]
  const displaySubtitle = nameParts.slice(1).join(' | ')

  return (
    <div className={styles.detailPage}>
      <div className="container">
        {/* Breadcrumb / Back button */}
        <div className={styles.navRow}>
          <button onClick={onBack} className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Catalog
          </button>
          <span className={styles.breadcrumbs}>
            Home &gt; Shop &gt; {product.category} &gt; {displayName}
          </span>
        </div>

        {/* Product details grid */}
        <div className={styles.mainGrid}>
          {/* Left Column: Image Gallery */}
          <div className={styles.galleryCol}>
            <div className={styles.mainImageWrap}>
              <motion.img
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={activeImg}
                alt={`${product.name} — ${product.category || 'Kids clothing'} at Kids City Wakad, Pune`}
                className={styles.mainImage}
              />
            </div>
            
            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className={styles.thumbnails}>
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`${styles.thumbBtn} ${activeImg === img ? styles.thumbActive : ''}`}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1} — Kids City Wakad`} className={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Options */}
          <div className={styles.infoCol}>
            <div className={styles.header}>
              <span className="badge badge-terracotta">{product.category}</span>
              <h1 className={styles.name}>{displayName}</h1>
              {displaySubtitle && <p className={styles.subtitle}>{displaySubtitle}</p>}
              
              {/* Rating */}
              <div className={styles.ratingRow}>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      strokeWidth={0}
                      fill={i < Math.round(product.rating) ? 'currentColor' : '#E6DFD3'}
                    />
                  ))}
                </div>
                <span className={styles.ratingText}>
                  <strong>{product.rating}</strong> ({product.reviews} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className={styles.priceWrap}>
                <span className={styles.price}>{product.price}</span>
                <span className={styles.taxLabel}>Inclusive of all taxes</span>
              </div>
            </div>

            <p className={styles.desc}>{product.desc}</p>

            {/* Sizing selector */}
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeader}>
                <span className={styles.label}>Select Size (Age)</span>
                <button className={styles.sizeGuideBtn} onClick={() => setShowSizeGuide(true)}>
                  <Ruler size={14} /> Sizing Chart
                </button>
              </div>

              <div className={styles.sizesGrid}>
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    className={`${styles.sizeBtn} ${selectedSize === sz ? styles.sizeBtnActive : ''}`}
                    onClick={() => {
                      setSelectedSize(sz)
                      setPredictedSize('') // Clear prediction when manually clicking
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Size Predictor Wizard */}
            <div className={styles.wizardCard}>
              <button
                className={styles.wizardToggle}
                onClick={() => setSizeHelperOpen(!sizeHelperOpen)}
              >
                <div className={styles.wizardToggleLabel}>
                  <HelpCircle size={16} className={styles.wizardIcon} />
                  <span>Unsure about size? Try our fit finder</span>
                </div>
                <ChevronDown
                  size={16}
                  style={{ transform: sizeHelperOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>

              <AnimatePresence>
                {sizeHelperOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className={styles.wizardBody}
                  >
                    <form onSubmit={handlePredictSize} className={styles.wizardForm}>
                      <div className={styles.formRow}>
                        <div className={styles.inputWrap}>
                          <label>Child's Age (Years)</label>
                          <input
                            type="number"
                            placeholder="e.g. 5"
                            value={childAge}
                            onChange={e => setChildAge(e.target.value)}
                            min="0"
                            max="16"
                          />
                        </div>
                        <div className={styles.inputWrap}>
                          <label>Height (cm)</label>
                          <input
                            type="number"
                            placeholder="e.g. 110"
                            value={childHeight}
                            onChange={e => setChildHeight(e.target.value)}
                            min="40"
                            max="180"
                          />
                        </div>
                      </div>
                      <button type="submit" className={`btn btn-beige ${styles.calcBtn}`}>
                        Calculate Size
                      </button>
                    </form>

                    {predictedSize && (
                      <div className={`${styles.wizardResult} ${predictedSize.includes('Note') ? styles.outOfStockResult : styles.inStockResult}`}>
                        <div className={styles.resultHeader}>
                          <span className={styles.resultLabel}>Recommended Size</span>
                          <span className={styles.resultBadge}>
                            {predictedSize.includes('Note') ? 'Out of stock' : 'Available'}
                          </span>
                        </div>
                        <div className={styles.resultValueRow}>
                          <strong className={styles.sizeVal}>
                            {predictedSize.includes('Note') ? predictedSize.split('(')[0].trim() : predictedSize}
                          </strong>
                          {!predictedSize.includes('Note') && (
                            <button
                              type="button"
                              className={styles.applySizeBtn}
                              onClick={() => {
                                setSelectedSize(predictedSize)
                                setSizeHelperOpen(false)
                              }}
                            >
                              Apply Size
                            </button>
                          )}
                        </div>
                        {predictedSize.includes('Note') && (
                          <div className={styles.stockWarning}>
                            <span>⚠️ {predictedSize.substring(predictedSize.indexOf('(') + 1, predictedSize.length - 1)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Add & Inquiry Action Buttons */}
            <div className={styles.actionRow}>
              <a
                href={getWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-wa ${styles.primaryCta}`}
              >
                <MessageSquare size={18} fill="currentColor" strokeWidth={0} />
                Order via WhatsApp
              </a>

              <button
                className={`btn ${addedAnimation ? 'btn-sage' : 'btn-navy'} ${styles.secondaryCta}`}
                onClick={handleAddToBag}
              >
                {addedAnimation ? <Check size={18} /> : <ShoppingBag size={18} />}
                {addedAnimation ? 'Added to Bag!' : 'Add to Inquiry Bag'}
              </button>

              <button
                className={`${styles.wishlistBtn} ${wishlist ? styles.wishActive : ''}`}
                onClick={() => setWishlist(!wishlist)}
                aria-label="Add to wishlist"
              >
                <Heart size={20} fill={wishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Tabs for details, reviews */}
            <div className={styles.tabsSection}>
              <div className={styles.tabsHeader}>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'description' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Details & Specs
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === 'care' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('care')}
                >
                  Store & Delivery
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'description' && (
                  <div className={styles.specsTab}>
                    <p>{product.desc}</p>
                    <table className={styles.specsTable}>
                      <tbody>
                        {Object.entries(product.specs).map(([key, val]) => (
                          <tr key={key}>
                            <th>{key}</th>
                            <td>{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className={styles.careTab}>
                    <p>
                      <strong>Local Store Pickup (Wakad, Pune):</strong>
                      <br />
                      You can block items online and pick them up at our store (Shop No 12, Mahalaxmi Complex, Wakad) within 24 hours.
                    </p>
                    <p style={{ marginTop: '12px' }}>
                      <strong>Wakad Home Delivery:</strong>
                      <br />
                      Same-day delivery is available for orders in Wakad, Hinjewadi, and Baner. Delivery charges apply based on location.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>You May Also <span className="serif-accent">Like</span></h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map(rp => (
                <div
                  key={rp.id}
                  className={styles.relatedCard}
                  onClick={() => {
                    onSelectProduct(rp)
                    setActiveImg(rp.img)
                    setSelectedSize('')
                    setPredictedSize('')
                  }}
                >
                  <img src={rp.img} alt={rp.name} className={styles.relatedImg} />
                  <div className={styles.relatedInfo}>
                    <h4>{rp.name}</h4>
                    <span>{rp.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sizing Chart Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <>
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
            />
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className={styles.modalHeader}>
                <h3>Kids Sizing Chart (Standard Fit)</h3>
                <button className={styles.modalClose} onClick={() => setShowSizeGuide(false)}>
                  Close
                </button>
              </div>
              <div className={styles.modalBody}>
                <p style={{ marginBottom: '16px', fontSize: '0.88rem', color: 'var(--text-mid)' }}>
                  Heights are approximate. If your child is between sizes, we recommend ordering one size larger.
                </p>
                <table className={styles.sizeTable}>
                  <thead>
                    <tr>
                      <th>Size Tag</th>
                      <th>Age (Approx)</th>
                      <th>Height Range</th>
                      <th>Chest Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0-2y</td>
                      <td>0 - 2 Years</td>
                      <td>70 - 90 cm</td>
                      <td>52 cm</td>
                    </tr>
                    <tr>
                      <td>2-4y</td>
                      <td>2 - 4 Years</td>
                      <td>90 - 105 cm</td>
                      <td>56 cm</td>
                    </tr>
                    <tr>
                      <td>4-6y</td>
                      <td>4 - 6 Years</td>
                      <td>105 - 118 cm</td>
                      <td>60 cm</td>
                    </tr>
                    <tr>
                      <td>6-8y</td>
                      <td>6 - 8 Years</td>
                      <td>118 - 130 cm</td>
                      <td>64 cm</td>
                    </tr>
                    <tr>
                      <td>8-10y</td>
                      <td>8 - 10 Years</td>
                      <td>130 - 142 cm</td>
                      <td>68 cm</td>
                    </tr>
                    <tr>
                      <td>10-12y</td>
                      <td>10 - 12 Years</td>
                      <td>142 - 152 cm</td>
                      <td>72 cm</td>
                    </tr>
                    <tr>
                      <td>12-14y</td>
                      <td>12 - 14 Years</td>
                      <td>152 - 164 cm</td>
                      <td>76 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sizing & Callback Request Popup */}
      <AnimatePresence>
        {showCallbackPopup && (
          <div className={styles.popupWrapper}>
            <motion.div
              className={styles.popupOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowCallbackPopup(false)
                localStorage.setItem('callbackRequested', 'true')
              }}
            />
            <motion.div
              className={styles.popupCard}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <button
                className={styles.popupCloseBtn}
                onClick={() => {
                  setShowCallbackPopup(false)
                  sessionStorage.setItem('callbackDismissed', 'true')
                }}
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {!callbackSubmitted ? (
                <>
                  <h2 className={styles.popupTitle}>
                    Need help with <span className={styles.popupTitleAccent}>kids wear shop in wakad?</span>
                  </h2>
                  <p className={styles.popupSubtitle}>Share your number to get a call-back.</p>

                  <form onSubmit={handleCallbackSubmit} className={styles.popupForm}>
                    <div className={styles.inputGroup}>
                      <div className={styles.countryCodeSelect}>
                        <span className={styles.flagEmoji}>🇮🇳</span>
                        <span className={styles.countryText}>+91</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="81234 56789"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className={styles.phoneInputField}
                        pattern="[6-9][0-9]{9}"
                        title="Please enter a valid 10-digit Indian mobile number"
                        required
                      />
                      <button type="submit" className={styles.callbackSubmitBtn}>
                        <PhoneCall size={14} />
                        <span>Call me back</span>
                      </button>
                    </div>
                  </form>

                  <p className={styles.popupDisclaimer}>Rest assured, your details are secure with us.</p>

                  <div className={styles.popupFooter}>
                    <div className={styles.footerRow}>
                      <span>Have a custom requirement? </span>
                      <a href={getWhatsAppCustomLink()} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                        Write to us
                      </a>
                    </div>
                    <div className={styles.footerRow} style={{ marginTop: '6px' }}>
                      <span>In a hurry? Call us now </span>
                      <a href="tel:+917891672762" className={styles.footerPhoneLink}>
                        +91 78916 72762
                      </a>
                    </div>
                    <p className={styles.footerSubText}>*Please keep 0 or +91 before the number you dial.</p>
                  </div>
                </>
              ) : (
                <div className={styles.successState}>
                  <div className={styles.successIconCircle}>
                    <Check size={28} className={styles.successCheck} />
                  </div>
                  <h2 className={styles.successTitle}>Request Received!</h2>
                  <p className={styles.successMessage}>
                    We will call you back on <strong>{phoneCountry} {phoneInput}</strong> within 15 minutes to assist you.
                  </p>
                  <button
                    onClick={() => setShowCallbackPopup(false)}
                    className={styles.successCloseBtn}
                  >
                    Got it, thanks!
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
