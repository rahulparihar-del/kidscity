import { useState, useEffect } from 'react'
import { ArrowLeft, MessageSquare, ShoppingBag, Heart, Star, Ruler, HelpCircle, ChevronDown, Check, X, PhoneCall } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabaseClient'

export default function ProductDetail({ product, onBack, onAddToBag, onSelectProduct, allProducts, isWakad, deliveryPincode, setDeliveryPincode }) {
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

  const [detailPincode, setDetailPincode] = useState('')
  const [pincodeError, setPincodeError] = useState('')

  useEffect(() => {
    if (deliveryPincode) {
      setDetailPincode(deliveryPincode)
    } else {
      setDetailPincode('')
    }
  }, [deliveryPincode])

  // Callback popup states
  const [showCallbackPopup, setShowCallbackPopup] = useState(false)
  const [phoneInput, setPhoneInput] = useState('')
  const [phoneCountry] = useState('+91')
  const [callbackSubmitted, setCallbackSubmitted] = useState(false)

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const alreadyRequested = localStorage.getItem('callback_request_submitted')
      if (!alreadyRequested) {
        setShowCallbackPopup(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [product.id])

  const handleCallbackSubmit = async (e) => {
    e.preventDefault()
    if (!phoneInput || phoneInput.length < 10) return

    setCallbackSubmitted(true)
    localStorage.setItem('callback_request_submitted', 'true')

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
  const getWhatsAppOrderLink = (inquiryId) => {
    const sizeToUse = selectedSize || product.sizes[0]
    const phone = '917891672762'
    let text = `Hi Kids City! I want to buy the "${product.name}" in size "${sizeToUse}" (${product.price}) (Inquiry ID: #${inquiryId}). Is it available in store?`
    
    if (product.img && product.img.startsWith('/')) {
      const fullImgUrl = window.location.origin + product.img
      text += `\n\nProduct Photo: ${fullImgUrl}`
    }
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  }

  const handleDirectOrder = async () => {
    const randId = 'KC-' + Math.floor(10000 + Math.random() * 90000)
    const sizeToUse = selectedSize || product.sizes[0]
    const orderItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: sizeToUse,
      img: product.img,
      category: product.category
    }

    try {
      await supabase.from('customer_inquiries').insert([{
        inquiry_id: randId,
        name: 'Direct WhatsApp Order',
        phone: 'N/A (WhatsApp Direct)',
        items: [orderItem],
        total_price: product.price,
        created_at: new Date().toISOString()
      }])
    } catch (err) {
      console.warn("Direct order save bypassed:", err)
    }

    const waUrl = getWhatsAppOrderLink(randId)
    window.open(waUrl, '_blank')
  }

  const relatedSource = allProducts && allProducts.length > 0 ? allProducts : []
  const relatedProducts = relatedSource.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const nameParts = product.name.split('|').map(s => s.trim())
  const displayName = nameParts[0]
  const displaySubtitle = nameParts.slice(1).join(' | ')
  const breadcrumbName = displayName.length > 40 ? displayName.slice(0, 40) + '...' : displayName

  return (
    <div className="bg-white min-h-screen pt-[100px] max-[768px]:pt-20 pb-20">
      <div className="container">
        {/* Breadcrumb / Back button */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-[30px] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3 max-[480px]:mb-5">
          <button onClick={onBack} className="flex items-center gap-2 font-bold text-[0.88rem] text-brand-navy bg-white border border-border px-[18px] py-2 rounded-[50px] transition-all duration-150 hover:bg-brand-navy hover:text-white hover:-translate-x-1">
            <ArrowLeft size={16} /> Back to Catalog
          </button>
          <span className="text-[0.82rem] text-text-muted font-semibold max-[480px]:line-height-[1.45] max-[480px]:text-[0.8rem]">
            Home &gt; Shop &gt; {product.category} &gt; {breadcrumbName}
          </span>
        </div>

        {/* Product details grid */}
        <div className="grid grid-cols-[1.1fr_1fr] max-[991px]:grid-cols-1 gap-[60px] max-[991px]:gap-10 max-[768px]:mb-[50px] items-start">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-5 min-w-0">
            <div className="bg-white border border-border rounded-3xl overflow-hidden aspect-square flex items-center justify-center shadow-sm">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={activeImg}
                alt={`${product.name} — ${product.category || 'Kids clothing'} at Kids City Wakad, Pune`}
                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
            
            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-[76px] h-[76px] rounded-lg overflow-hidden border-2 bg-white p-0 shrink-0 transition-all duration-150 ${activeImg === img ? 'border-brand-terracotta -translate-y-0.5 shadow-sm' : 'border-border'}`}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1} — Kids City Wakad`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Options */}
          <div className="flex flex-col min-w-0">
            <div className="border-b border-border pb-6 mb-6">
              <span className="badge badge-terracotta">{product.category}</span>
              <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.35rem,2.8vw,2.1rem)] font-[900] text-brand-navy leading-[1.25] mt-2.5 tracking-tight max-[600px]:text-[1.15rem] max-[600px]:leading-tight">{displayName}</h1>
              {displaySubtitle && <p className="font-[family-name:var(--font-body)] text-[0.95rem] text-text-mid mt-2 leading-relaxed font-semibold border-l-[3px] border-brand-terracotta pl-2.5 max-[600px]:text-[0.82rem] max-[600px]:leading-normal">{displaySubtitle}</p>}
              
              {/* Rating */}
              <div className="flex items-center gap-2.5 mt-3">
                <div className="flex gap-0.5 text-brand-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      strokeWidth={0}
                      fill={i < Math.round(product.rating) ? 'currentColor' : '#E6DFD3'}
                    />
                  ))}
                </div>
                <span className="text-[0.88rem] text-text-mid">
                  <strong>{product.rating}</strong> ({product.reviews} customer reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-[2rem] font-[900] text-brand-terracotta max-[600px]:text-[1.6rem]">{product.price}</span>
                <span className="text-[0.8rem] text-text-muted font-medium max-[600px]:text-[0.72rem]">Inclusive of all taxes</span>
              </div>
            </div>

            <p className="text-base text-text-mid leading-relaxed mb-[30px] whitespace-pre-wrap">{product.desc}</p>

            {/* Sizing selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-[900] text-[0.9rem] text-brand-navy uppercase tracking-[0.5px]">Select Size (Age)</span>
                <button className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold text-brand-terracotta" onClick={() => setShowSizeGuide(true)}>
                  <Ruler size={14} /> Sizing Chart
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    className={`min-w-[60px] h-11 px-3.5 rounded-lg border-2 font-[800] text-[0.88rem] transition-all duration-150 ${selectedSize === sz ? 'bg-brand-terracotta border-brand-terracotta text-white' : 'bg-white border-border text-brand-navy hover:border-brand-terracotta'}`}
                    onClick={() => {
                      setSelectedSize(sz)
                      setPredictedSize('')
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Size Predictor Wizard */}
            <div className="bg-white border-2 border-border rounded-3xl mb-8 overflow-hidden shadow-sm transition-colors duration-150 hover:border-brand-sage-light">
              <button
                className="w-full px-5 py-4 flex items-center justify-between font-[family-name:var(--font-head)] font-[800] text-[0.9rem] text-brand-navy text-left bg-transparent transition-colors duration-150 hover:bg-[#fafaf6]"
                onClick={() => setSizeHelperOpen(!sizeHelperOpen)}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle size={16} className="text-brand-sage" />
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
                    className="px-5 pb-5"
                  >
                    <form onSubmit={handlePredictSize} className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-4 max-[480px]:gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-extrabold text-brand-navy-light uppercase tracking-[0.6px]">Child's Age (Years)</label>
                          <input
                            type="number"
                            placeholder="e.g. 5"
                            value={childAge}
                            onChange={e => setChildAge(e.target.value)}
                            min="0"
                            max="16"
                            className="px-4 py-3 rounded-lg border-2 border-border bg-[#fafaf6] outline-none text-[0.92rem] font-semibold text-brand-navy transition-all duration-150 focus:border-brand-sage focus:bg-white focus:ring-3 focus:ring-brand-sage/10"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.72rem] font-extrabold text-brand-navy-light uppercase tracking-[0.6px]">Height (cm)</label>
                          <input
                            type="number"
                            placeholder="e.g. 110"
                            value={childHeight}
                            onChange={e => setChildHeight(e.target.value)}
                            min="40"
                            max="180"
                            className="px-4 py-3 rounded-lg border-2 border-border bg-[#fafaf6] outline-none text-[0.92rem] font-semibold text-brand-navy transition-all duration-150 focus:border-brand-sage focus:bg-white focus:ring-3 focus:ring-brand-sage/10"
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-beige min-h-[42px] px-5 py-2.5 font-[family-name:var(--font-head)] font-extrabold text-[0.85rem] shrink-0 rounded-[50px] max-[480px]:w-full max-[480px]:justify-center">
                        Calculate Size
                      </button>
                    </form>

                    {predictedSize && (
                      <div className={`mt-5 p-4.5 rounded-2xl flex flex-col gap-2.5 shadow-sm ${predictedSize.includes('Note') ? 'bg-brand-terracotta/5 border-2 border-brand-terracotta/25' : 'bg-brand-sage/10 border-2 border-brand-sage/35'}`}>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.8px] text-text-mid">Recommended Size</span>
                          <span className={`text-[0.68rem] font-[950] px-2.5 py-1 rounded-[50px] uppercase tracking-[0.5px] ${predictedSize.includes('Note') ? 'bg-brand-terracotta/15 text-brand-terracotta' : 'bg-brand-sage-light text-brand-navy'}`}>
                            {predictedSize.includes('Note') ? 'Out of stock' : 'Available'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-0.5">
                          <strong className="text-[1.8rem] font-[900] text-brand-navy font-[family-name:var(--font-head)] leading-none">
                            {predictedSize.includes('Note') ? predictedSize.split('(')[0].trim() : predictedSize}
                          </strong>
                          {!predictedSize.includes('Note') && (
                            <button
                              type="button"
                              className="bg-brand-sage text-white font-[family-name:var(--font-head)] font-extrabold text-[0.8rem] px-4 py-2 rounded-[50px] shadow-[0_4px_12px_rgba(129,178,154,0.2)] transition-all duration-150 hover:bg-brand-navy hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(61,64,91,0.15)] active:translate-y-0"
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
                          <div className="text-[0.82rem] leading-[1.55] text-brand-terracotta font-semibold pt-2 border-t border-dashed border-brand-terracotta/20">
                            <span>⚠️ {predictedSize.substring(predictedSize.indexOf('(') + 1, predictedSize.length - 1)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Delivery Pincode Checker Section */}
            <div className="bg-[#fafaf6] border border-border p-4 rounded-xl mb-6">
              <h3 className="font-[family-name:var(--font-head)] text-[0.95rem] font-bold text-brand-navy mb-2.5 uppercase tracking-[0.5px]">Delivery Availability</h3>
              {!deliveryPincode ? (
                <div>
                  <p className="text-[0.88rem] text-text-mid mb-3">Enter delivery pincode to see availability and unlock order buttons:</p>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    const cleaned = detailPincode.trim()
                    if (!/^\d{6}$/.test(cleaned)) {
                      setPincodeError('Please enter a valid 6-digit pincode.')
                      return
                    }
                    setPincodeError('')
                    setDeliveryPincode(cleaned)
                  }} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 411057"
                      value={detailPincode}
                      onChange={(e) => {
                        setDetailPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                        setPincodeError('')
                      }}
                      className="border-2 border-border rounded-lg px-3 py-2 text-[0.88rem] font-medium outline-none w-[140px] transition-all duration-150 focus:border-brand-navy"
                    />
                    <button type="submit" className="btn btn-navy">Check</button>
                  </form>
                  {pincodeError && <p className="text-brand-pink text-[0.8rem] font-medium mt-1.5">{pincodeError}</p>}
                </div>
              ) : isWakad ? (
                <div className="flex items-center gap-2 bg-brand-green/8 border border-brand-green/20 text-brand-navy p-3.5 rounded-lg text-[0.88rem] font-medium">
                  <Check size={16} className="text-brand-green shrink-0" />
                  <span>Delivering to <strong>Wakad, Pune (411057)</strong>. Order options unlocked.</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-brand-pink/8 border border-brand-pink/20 text-brand-navy p-3.5 rounded-lg text-[0.88rem] font-medium">
                  <X size={16} className="text-brand-pink shrink-0" />
                  <span>We do not deliver to <strong>{deliveryPincode}</strong>. We only deliver to <strong>Wakad, Pune (411057)</strong>. Ordering is disabled.</span>
                </div>
              )}
            </div>

            {/* Add & Inquiry Action Buttons */}
            {isWakad && (
              <div className="grid grid-cols-[1fr_1fr_auto] max-[600px]:grid-cols-[1fr_auto] gap-4 mb-10">
                <button
                  onClick={handleDirectOrder}
                  className="btn btn-wa w-full max-[600px]:col-span-2"
                >
                  <MessageSquare size={18} fill="currentColor" strokeWidth={0} />
                  Order via WhatsApp
                </button>

                <button
                  className={`btn w-full ${addedAnimation ? 'btn-sage' : 'btn-navy'}`}
                  onClick={handleAddToBag}
                >
                  {addedAnimation ? <Check size={18} /> : <ShoppingBag size={18} />}
                  {addedAnimation ? 'Added to Bag!' : 'Add to Inquiry Bag'}
                </button>

                <button
                  className={`w-[50px] h-[50px] rounded-full border-2 border-border flex items-center justify-center text-text-muted transition-all duration-150 bg-white hover:border-brand-terracotta hover:text-brand-terracotta ${wishlist ? 'bg-brand-terracotta border-brand-terracotta! text-white!' : ''}`}
                  onClick={() => setWishlist(!wishlist)}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} fill={wishlist ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}

            {/* Tabs for details, reviews */}
            <div className="border-t border-border pt-[30px]">
              <div className="flex gap-6 border-b border-border mb-5">
                <button
                  className={`pb-3 font-semibold text-[0.9rem] relative ${activeTab === 'description' ? 'text-brand-navy after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:height-[2px] after:bg-brand-terracotta' : 'text-text-muted'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Details & Specs
                </button>
                <button
                  className={`pb-3 font-semibold text-[0.9rem] relative ${activeTab === 'care' ? 'text-brand-navy after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:height-[2px] after:bg-brand-terracotta' : 'text-text-muted'}`}
                  onClick={() => setActiveTab('care')}
                >
                  Store & Delivery
                </button>
              </div>

              <div className="text-[0.92rem] text-text-mid leading-relaxed">
                {activeTab === 'description' && (
                  <div>
                    <p className="white-space-pre-wrap mb-4">{product.desc}</p>
                    <table className="w-full border-collapse mt-4 bg-white rounded-lg overflow-hidden border border-border">
                      <tbody>
                        {Object.entries(product.specs).map(([key, val]) => (
                          <tr key={key}>
                            <th className="bg-[#fafaf6] font-bold text-brand-navy w-[35%] text-[0.85rem] uppercase px-4 py-3 border-b border-border text-left">{key}</th>
                            <td className="px-4 py-3 border-b border-border">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="flex flex-col gap-3">
                    <p>
                      <strong>Local Store Pickup (Wakad, Pune):</strong>
                      <br />
                      You can block items online and pick them up at our store (Shop No 12, Mahalaxmi Complex, Wakad) within 24 hours.
                    </p>
                    <p>
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
          <section className="mt-20 border-t border-border pt-[50px]">
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-[850] text-brand-navy mb-[30px]">You May Also <span className="serif-accent">Like</span></h2>
            <div className="grid grid-cols-3 max-[768px]:grid-cols-2 max-[480px]:grid-cols-2 gap-[30px] max-[768px]:gap-4 max-[480px]:gap-3">
              {relatedProducts.map(rp => (
                <div
                  key={rp.id}
                  className="bg-white border border-border rounded-2xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-terracotta"
                  onClick={() => {
                    onSelectProduct(rp)
                    setActiveImg(rp.img)
                    setSelectedSize('')
                    setPredictedSize('')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <img src={rp.img} alt={rp.name} className="w-full aspect-square object-cover object-top bg-[#fafaf6]" />
                  <div className="p-4 flex flex-col gap-1.5 items-start max-[480px]:p-3">
                    <h4 className="font-[family-name:var(--font-head)] text-[0.88rem] font-[750] text-brand-navy leading-tight m-0 line-clamp-1 max-[480px]:text-[0.8rem]">{rp.name}</h4>
                    <span className="font-extrabold text-brand-terracotta text-[0.92rem] max-[480px]:text-[0.8rem]">{rp.price}</span>
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
              className="fixed inset-0 bg-[#2c2e43]/40 backdrop-blur-xs z-[1010]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[580px] bg-white border border-border rounded-3xl shadow-2xl z-[1011] p-[30px] max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="flex justify-between items-center border-b border-border pb-4 mb-5">
                <h3 className="font-[family-name:var(--font-head)] text-[1.25rem] font-[850] text-brand-navy">Kids Sizing Chart (Standard Fit)</h3>
                <button className="font-bold text-[0.85rem] text-brand-terracotta bg-[#fafaf6] px-3.5 py-1.5 rounded-[50px] hover:bg-brand-terracotta hover:text-white" onClick={() => setShowSizeGuide(false)}>
                  Close
                </button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                <p className="mb-4 text-sm text-text-mid">
                  Heights are approximate. If your child is between sizes, we recommend ordering one size larger.
                </p>
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden border border-border">
                  <thead>
                    <tr>
                      <th className="bg-[#fafaf6] font-extrabold text-brand-navy px-3.5 py-2.5 text-[0.88rem] text-left">Size Tag</th>
                      <th className="bg-[#fafaf6] font-extrabold text-brand-navy px-3.5 py-2.5 text-[0.88rem] text-left">Age (Approx)</th>
                      <th className="bg-[#fafaf6] font-extrabold text-brand-navy px-3.5 py-2.5 text-[0.88rem] text-left">Height Range</th>
                      <th className="bg-[#fafaf6] font-extrabold text-brand-navy px-3.5 py-2.5 text-[0.88rem] text-left">Chest Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { tag: '0-2y', age: '0 - 2 Years', height: '70 - 90 cm', chest: '52 cm' },
                      { tag: '2-4y', age: '2 - 4 Years', height: '90 - 105 cm', chest: '56 cm' },
                      { tag: '4-6y', age: '4 - 6 Years', height: '105 - 118 cm', chest: '60 cm' },
                      { tag: '6-8y', age: '6 - 8 Years', height: '118 - 130 cm', chest: '64 cm' },
                      { tag: '8-10y', age: '8 - 10 Years', height: '130 - 142 cm', chest: '68 cm' },
                      { tag: '10-12y', age: '10 - 12 Years', height: '142 - 152 cm', chest: '72 cm' },
                      { tag: '12-14y', age: '12 - 14 Years', height: '152 - 164 cm', chest: '76 cm' },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-3.5 py-2.5 border-b border-border text-[0.88rem]">{row.tag}</td>
                        <td className="px-3.5 py-2.5 border-b border-border text-[0.88rem]">{row.age}</td>
                        <td className="px-3.5 py-2.5 border-b border-border text-[0.88rem]">{row.height}</td>
                        <td className="px-3.5 py-2.5 border-b border-border text-[0.88rem]">{row.chest}</td>
                      </tr>
                    ))}
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
          <div className="fixed inset-0 flex items-center justify-center z-[1100] p-5">
            <motion.div
              className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCallbackPopup(false)}
            />
            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[500px] p-[36px_32px] max-[520px]:p-[28px_20px] z-10 border border-border overflow-hidden box-border"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <button
                className="absolute top-[18px] right-[18px] bg-transparent text-text-mid cursor-pointer p-1 rounded-full transition-all duration-150 hover:bg-[#fafaf6] hover:text-brand-navy flex items-center justify-center"
                onClick={() => setShowCallbackPopup(false)}
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {!callbackSubmitted ? (
                <>
                  <h2 className="font-[family-name:var(--font-head)] text-[1.62rem] max-[520px]:text-[1.35rem] font-[900] text-brand-navy leading-[1.25] mb-2 tracking-tight text-left">
                    Need help with <span className="text-brand-terracotta">kids wear shop in wakad?</span>
                  </h2>
                  <p className="text-[0.95rem] font-bold text-text-mid mb-6 text-left">Share your number to get a call-back.</p>

                  <form onSubmit={handleCallbackSubmit} className="w-full mb-3 box-border">
                    <div className="flex items-stretch border border-[#dcdcdc] rounded-[16px] overflow-hidden bg-white box-border focus-within:border-brand-navy focus-within:ring-2 focus-within:ring-brand-navy/10 max-[520px]:flex-col max-[520px]:border-none max-[520px]:bg-transparent max-[520px]:gap-2">
                      <div className="flex items-center gap-1.5 px-3.5 bg-[#f8f9fa] border-r border-[#e9ecef] text-[0.92rem] font-bold text-brand-navy-light user-select-none max-[520px]:border max-[520px]:border-[#dcdcdc] max-[520px]:rounded-[16px] max-[520px]:py-3 max-[520px]:px-3.5 max-[520px]:bg-white">
                        <span className="text-[1.15rem]">🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="81234 56789"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 border-none px-3.5 py-3 text-[1.05rem] font-bold text-brand-navy outline-none min-w-0 tracking-wider placeholder:color-[#c0c0c0] placeholder:font-medium max-[520px]:border max-[520px]:border-[#dcdcdc] max-[520px]:rounded-[16px] max-[520px]:py-3 max-[520px]:px-3.5 max-[520px]:bg-white"
                        pattern="[6-9][0-9]{9}"
                        title="Please enter a valid 10-digit Indian mobile number"
                        required
                      />
                      <button type="submit" className="bg-[#fdf5e6] border-l border-[#f9ebd2] text-brand-terracotta px-5.5 font-[family-name:var(--font-head)] font-[900] text-[0.92rem] cursor-pointer transition-all duration-150 flex items-center gap-2 whitespace-nowrap hover:bg-brand-terracotta hover:text-white max-[520px]:border-none max-[520px]:rounded-[16px] max-[520px]:py-3 max-[520px]:px-5 max-[520px]:justify-center max-[520px]:bg-brand-terracotta max-[520px]:text-white max-[520px]:shadow-[0_4px_12px_rgba(224,122,95,0.25)] max-[520px]:hover:bg-brand-navy">
                        <PhoneCall size={14} />
                        <span>Call me back</span>
                      </button>
                    </div>
                  </form>

                  <p className="text-[0.76rem] italic text-[#888888] mb-6 max-[520px]:mb-4.5 text-left">Rest assured, your details are secure with us.</p>

                  <div className="border-t border-border pt-4.5 text-left">
                    <div className="text-[0.88rem] max-[520px]:text-[0.8rem] font-[650] text-brand-navy-light">
                      <span>Have a custom requirement? </span>
                      <a href={getWhatsAppCustomLink()} target="_blank" rel="noopener noreferrer" className="text-brand-terracotta underline font-extrabold hover:text-brand-navy">
                        Write to us
                      </a>
                    </div>
                    <div className="text-[0.88rem] max-[520px]:text-[0.8rem] font-[650] text-brand-navy-light mt-1.5">
                      <span>In a hurry? Call us now </span>
                      <a href="tel:+917891672762" className="text-brand-terracotta font-extrabold text-[0.92rem] hover:underline">
                        +91 78916 72762
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-2.5">
                  <div className="w-14 h-14 rounded-full bg-[#2db84b]/12 flex items-center justify-center mb-5">
                    <Check size={28} className="text-[#2db84b]" />
                  </div>
                  <h2 className="font-[family-name:var(--font-head)] text-2xl font-[900] text-brand-navy mb-2.5">Request Received!</h2>
                  <p className="text-[0.9rem] leading-relaxed text-text-mid text-center mb-6 max-w-[320px]">
                    We will call you back on <strong>{phoneCountry} {phoneInput}</strong> within 15 minutes to assist you.
                  </p>
                  <button
                    onClick={() => setShowCallbackPopup(false)}
                    className="bg-brand-navy text-white border-none font-[family-name:var(--font-head)] font-[850] text-[0.88rem] px-7 py-3 rounded-[50px] cursor-pointer transition-all duration-150 shadow-[0_4px_12px_rgba(61,64,91,0.2)] hover:bg-brand-terracotta hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(224,122,95,0.25)]"
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
