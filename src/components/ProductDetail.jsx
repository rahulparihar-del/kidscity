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
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-4 border-b border-border/60 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3">
          <button onClick={onBack} className="flex items-center gap-2 font-extrabold text-[0.88rem] text-brand-navy bg-white border border-border px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-brand-navy hover:text-white hover:-translate-x-1 shadow-sm hover:shadow-md">
            <ArrowLeft size={16} /> Back to Catalog
          </button>
          <span className="text-[0.82rem] text-text-muted font-bold tracking-wide">
            Home &gt; Shop &gt; {product.category} &gt; <span className="text-brand-navy">{breadcrumbName}</span>
          </span>
        </div>

        {/* Product details grid */}
        <div className="grid grid-cols-[1.1fr_1fr] max-[991px]:grid-cols-1 gap-[60px] max-[991px]:gap-10 max-[768px]:mb-[50px] items-start">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-4 min-w-0">
            <div className="bg-gradient-to-br from-white to-[#fafaf6] border border-border rounded-3xl overflow-hidden aspect-square flex items-center justify-center shadow-md relative group">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                src={activeImg}
                alt={`${product.name} — ${product.category || 'Kids clothing'} at Kids City Wakad, Pune`}
                className="w-[92%] h-[92%] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />
              {product.discount > 0 && (
                <div className="absolute top-5 left-5 bg-brand-pink text-white font-black text-[0.72rem] px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    className={`w-[78px] h-[78px] rounded-2xl overflow-hidden border-2 bg-[#fafaf6] p-1.5 shrink-0 transition-all duration-200 hover:scale-105 ${activeImg === img ? 'border-brand-navy shadow-md scale-102 bg-white' : 'border-border/60 opacity-80 hover:opacity-100'}`}
                    onClick={() => setActiveImg(img)}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1} — Kids City Wakad`} className="w-full h-full object-contain rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Options */}
          <div className="flex flex-col min-w-0">
            <div className="border-b border-border/80 pb-6 mb-6">
              <span className="inline-block px-3.5 py-1.5 text-[0.72rem] font-[900] tracking-wider uppercase rounded-full bg-brand-terracotta/10 text-brand-terracotta mb-3">
                {product.category}
              </span>
              <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.45rem,3vw,2.25rem)] font-[900] text-brand-navy leading-[1.2] mt-1 tracking-tight max-[600px]:text-[1.3rem]">
                {displayName}
              </h1>
              {displaySubtitle && (
                <p className="font-[family-name:var(--font-body)] text-[0.98rem] text-text-mid mt-3 leading-relaxed font-semibold border-l-[3px] border-brand-terracotta pl-3 max-[600px]:text-[0.88rem]">
                  {displaySubtitle}
                </p>
              )}
              
              {/* Rating */}
              <div className="flex items-center gap-3 mt-4 bg-brand-orange/5 border border-brand-orange/15 px-3 py-1.5 rounded-full w-fit">
                <div className="flex gap-0.5 text-brand-orange">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      strokeWidth={0}
                      fill={i < Math.round(product.rating) ? 'currentColor' : '#E6DFD3'}
                    />
                  ))}
                </div>
                <span className="text-[0.8rem] text-brand-navy font-black">{product.rating} ★</span>
                <span className="text-[0.8rem] text-text-muted">({product.reviews} customer reviews)</span>
              </div>

              {/* Price Section */}
              <div className="mt-6 flex items-baseline gap-4 flex-wrap">
                <span className="text-[2.2rem] font-[900] text-brand-navy tracking-tight max-[600px]:text-[1.8rem] leading-none">
                  ₹{product.priceVal}
                </span>
                {product.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[1.2rem] line-through text-text-muted font-medium">
                      ₹{Math.round(product.priceVal / (1 - product.discount / 100))}
                    </span>
                    <span className="bg-brand-pink/10 text-brand-pink text-[0.72rem] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Save {product.discount}%
                    </span>
                  </div>
                )}
                <span className="text-[0.78rem] text-text-muted font-bold ml-auto max-[600px]:w-full max-[600px]:ml-0 max-[600px]:mt-2">Inclusive of all taxes</span>
              </div>
            </div>

            <p className="text-[0.98rem] text-text-mid leading-relaxed mb-6 font-medium whitespace-pre-wrap">{product.desc}</p>

            {/* Sizing selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4.5">
                <span className="font-[900] text-[0.85rem] text-brand-navy uppercase tracking-[0.8px]">Select Size (Age)</span>
                <button className="inline-flex items-center gap-1.5 text-[0.82rem] font-[800] text-brand-terracotta hover:underline" onClick={() => setShowSizeGuide(true)}>
                  <Ruler size={14} /> View Sizing Chart
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    className={`min-w-[56px] h-[56px] rounded-full border-2 font-[900] text-[0.88rem] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${selectedSize === sz ? 'bg-brand-navy border-brand-navy text-white shadow-md' : 'bg-white border-border text-brand-navy hover:border-brand-navy hover:bg-[#fafaf6]'}`}
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

            {/* Fit Finder Sizing Assistant */}
            <div className="bg-[#fafaf6]/80 border border-border rounded-2xl mb-8 overflow-hidden shadow-xs">
              <button
                type="button"
                className="w-full px-5 py-4 flex items-center justify-between font-[family-name:var(--font-head)] font-[800] text-[0.88rem] text-brand-navy text-left bg-transparent transition-colors duration-150 hover:bg-[#fafaf6]"
                onClick={() => setSizeHelperOpen(!sizeHelperOpen)}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle size={16} className="text-brand-terracotta" />
                  <span>Unsure about size? Use our Size Predictor</span>
                </div>
                <ChevronDown
                  size={16}
                  className="text-text-muted transition-transform duration-200"
                  style={{ transform: sizeHelperOpen ? 'rotate(180deg)' : 'none' }}
                />
              </button>

              <AnimatePresence>
                {sizeHelperOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 border-t border-border/50 pt-4"
                  >
                    <form onSubmit={handlePredictSize} className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.7rem] font-[800] text-brand-navy-light uppercase tracking-[0.8px]">Child's Age (Years)</label>
                          <input
                            type="number"
                            placeholder="e.g. 5"
                            value={childAge}
                            onChange={e => setChildAge(e.target.value)}
                            min="0"
                            max="16"
                            className="px-4 py-3 rounded-xl border-2 border-border bg-white outline-none text-[0.92rem] font-bold text-brand-navy transition-all duration-150 focus:border-brand-navy"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[0.7rem] font-[800] text-brand-navy-light uppercase tracking-[0.8px]">Height (cm)</label>
                          <input
                            type="number"
                            placeholder="e.g. 110"
                            value={childHeight}
                            onChange={e => setChildHeight(e.target.value)}
                            min="40"
                            max="180"
                            className="px-4 py-3 rounded-xl border-2 border-border bg-white outline-none text-[0.92rem] font-bold text-brand-navy transition-all duration-150 focus:border-brand-navy"
                          />
                        </div>
                      </div>
                      <button type="submit" className="bg-brand-navy hover:bg-brand-navy-light text-white font-[800] text-[0.85rem] px-5 py-3 rounded-full shadow-sm hover:shadow transition-all duration-150 max-[480px]:w-full">
                        Calculate Perfect Fit
                      </button>
                    </form>

                    {predictedSize && (
                      <div className={`mt-5 p-4.5 rounded-2xl flex flex-col gap-2.5 shadow-xs border ${predictedSize.includes('Note') ? 'bg-brand-terracotta/5 border-brand-terracotta/25' : 'bg-brand-sage/10 border-brand-sage/25'}`}>
                        <div className="flex justify-between items-center">
                          <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.8px] text-text-mid">Recommended Size</span>
                          <span className={`text-[0.65rem] font-[900] px-2.5 py-1 rounded-[50px] uppercase tracking-[0.5px] ${predictedSize.includes('Note') ? 'bg-brand-terracotta/10 text-brand-terracotta' : 'bg-brand-sage text-white'}`}>
                            {predictedSize.includes('Note') ? 'Out of stock' : 'In Stock'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <strong className="text-[1.8rem] font-[900] text-brand-navy font-[family-name:var(--font-head)] leading-none">
                            {predictedSize.includes('Note') ? predictedSize.split('(')[0].trim() : predictedSize}
                          </strong>
                          {!predictedSize.includes('Note') && (
                            <button
                              type="button"
                              className="bg-brand-navy text-white font-[800] text-[0.8rem] px-4.5 py-2 rounded-full shadow-sm hover:bg-brand-terracotta transition-all duration-200"
                              onClick={() => {
                                setSelectedSize(predictedSize)
                                setSizeHelperOpen(false)
                              }}
                            >
                              Apply Recommended Size
                            </button>
                          )}
                        </div>
                        {predictedSize.includes('Note') && (
                          <div className="text-[0.82rem] leading-relaxed text-brand-terracotta font-semibold pt-2 border-t border-dashed border-brand-terracotta/20">
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
            <div className="bg-[#fafaf6] border border-border/80 p-5 rounded-2xl mb-8">
              <h3 className="font-bold text-[0.88rem] text-brand-navy mb-2 uppercase tracking-[0.8px] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-terracotta"></span>
                Delivery & Shipping
              </h3>
              {!deliveryPincode ? (
                <div>
                  <p className="text-[0.88rem] text-text-mid mb-3.5 font-medium">Enter delivery pincode to check availability and place orders:</p>
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
                      className="border-2 border-border rounded-xl px-4 py-2.5 text-[0.92rem] font-bold outline-none w-[150px] transition-all duration-150 bg-white focus:border-brand-navy"
                    />
                    <button type="submit" className="bg-brand-navy hover:bg-brand-navy-light text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-200">
                      Check Pincode
                    </button>
                  </form>
                  {pincodeError && <p className="text-brand-pink text-[0.8rem] font-bold mt-2">{pincodeError}</p>}
                </div>
              ) : isWakad ? (
                <div className="flex items-center gap-3 bg-brand-green/8 border border-brand-green/20 text-brand-navy p-4 rounded-xl text-[0.88rem] font-semibold">
                  <Check size={18} className="text-brand-green shrink-0" />
                  <span>Delivering to <strong>Wakad, Pune (411057)</strong>. Local delivery options unlocked.</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-brand-pink/5 border border-brand-pink/15 text-brand-navy p-4 rounded-xl text-[0.88rem] font-semibold">
                  <X size={18} className="text-brand-pink shrink-0" />
                  <span>We do not deliver to <strong>{deliveryPincode}</strong>. We only deliver to <strong>Wakad, Pune (411057)</strong>. Ordering is disabled.</span>
                </div>
              )}
            </div>

            {/* Add & Inquiry Action Buttons */}
            {isWakad && (
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button
                  onClick={handleDirectOrder}
                  className="btn btn-wa bg-[#25D366] hover:bg-[#20BA56] text-white flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-black shadow-[0_6px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 min-h-[52px] grow"
                >
                  <MessageSquare size={18} fill="currentColor" strokeWidth={0} />
                  Order via WhatsApp
                </button>
                <button
                  className={`btn px-7 py-4 rounded-full font-black transition-all duration-300 transform hover:-translate-y-0.5 min-h-[52px] grow ${addedAnimation ? 'bg-brand-sage text-white shadow-[0_6px_20px_rgba(129,178,154,0.25)]' : 'bg-brand-navy hover:bg-brand-navy-light text-white shadow-[0_6px_20px_rgba(61,64,91,0.2)]'}`}
                  onClick={handleAddToBag}
                >
                  {addedAnimation ? <Check size={18} /> : <ShoppingBag size={18} />}
                  {addedAnimation ? 'Added to Bag!' : 'Add to Inquiry Bag'}
                </button>

                <button
                  className={`w-[52px] h-[52px] rounded-full border-2 border-border flex items-center justify-center text-text-muted transition-all duration-200 bg-white hover:border-brand-pink hover:text-brand-pink hover:scale-105 shrink-0 ${wishlist ? 'bg-brand-pink border-brand-pink text-white!' : ''}`}
                  onClick={() => setWishlist(!wishlist)}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} fill={wishlist ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}

            {/* Tabs for details, reviews */}
            <div className="border-t border-border pt-8 mt-4">
              <div className="flex gap-8 border-b border-border mb-6 relative">
                <button
                  className={`pb-4 font-bold text-[0.92rem] relative transition-colors duration-150 ${activeTab === 'description' ? 'text-brand-navy' : 'text-text-muted hover:text-brand-navy'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Details & Specs
                  {activeTab === 'description' && (
                    <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-terracotta rounded-full" />
                  )}
                </button>
                <button
                  className={`pb-4 font-bold text-[0.92rem] relative transition-colors duration-150 ${activeTab === 'care' ? 'text-brand-navy' : 'text-text-muted hover:text-brand-navy'}`}
                  onClick={() => setActiveTab('care')}
                >
                  Store & Delivery Info
                  {activeTab === 'care' && (
                    <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-terracotta rounded-full" />
                  )}
                </button>
              </div>

              <div className="text-[0.92rem] text-text-mid leading-relaxed">
                {activeTab === 'description' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                    <p className="whitespace-pre-wrap text-[0.92rem] text-text-mid leading-relaxed">{product.desc}</p>
                    <table className="w-full border-collapse mt-4 bg-white rounded-xl overflow-hidden border border-border">
                      <tbody>
                        {Object.entries(product.specs).map(([key, val]) => (
                          <tr key={key} className="border-b border-border last:border-0 hover:bg-[#fafaf6]/40 transition-colors">
                            <td className="bg-[#fafaf6] font-bold text-brand-navy w-[35%] text-[0.82rem] uppercase tracking-wider px-5 py-3.5 text-left border-r border-border">{key}</td>
                            <td className="px-5 py-3.5 text-[0.9rem] text-text-mid font-medium">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {activeTab === 'care' && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 bg-[#fafaf6]/40 p-5 rounded-2xl border border-border/80">
                    <div>
                      <h4 className="font-bold text-brand-navy text-[0.95rem] mb-1">🏪 Local Store Pickup (Wakad, Pune)</h4>
                      <p className="text-[0.88rem] text-text-mid">Block items online for free and pick them up at our store (Shop No 12, Mahalaxmi Complex, Wakad) within 24 hours.</p>
                    </div>
                    <div className="border-t border-border/60 pt-3">
                      <h4 className="font-bold text-brand-navy text-[0.95rem] mb-1">🚚 Wakad Home Delivery</h4>
                      <p className="text-[0.88rem] text-text-mid">Same-day local home delivery is available for addresses in Wakad, Hinjewadi, and Baner. Minimal shipping fees calculated at checkout.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <h2 className="font-[family-name:var(--font-head)] text-2xl font-[900] text-brand-navy mb-8 tracking-tight">
              You May Also <span className="serif-accent">Like</span>
            </h2>
            <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[550px]:grid-cols-1 gap-8">
              {relatedProducts.map(rp => (
                <motion.div
                  key={rp.id}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-border rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:border-brand-terracotta/40 transition-all duration-300 flex flex-col"
                  onClick={() => {
                    onSelectProduct(rp)
                    setActiveImg(rp.img)
                    setSelectedSize('')
                    setPredictedSize('')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-white to-[#fafaf6] flex items-center justify-center p-4">
                    <img src={rp.img} alt={rp.name} className="w-[88%] h-[88%] object-contain transition-transform duration-300 hover:scale-102" />
                  </div>
                  <div className="p-5 flex flex-col gap-2 items-start border-t border-border/40 grow bg-white">
                    <span className="text-[0.68rem] font-[800] tracking-wider text-text-muted uppercase">{rp.category}</span>
                    <h4 className="font-[family-name:var(--font-head)] text-[0.92rem] font-[800] text-brand-navy leading-snug m-0 line-clamp-2">{rp.name}</h4>
                    <div className="flex items-center gap-2 mt-1 w-full justify-between">
                      <span className="font-extrabold text-brand-terracotta text-[1.05rem]">{rp.price}</span>
                      {rp.rating && <span className="text-[0.75rem] font-bold text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded-md">★ {rp.rating}</span>}
                    </div>
                  </div>
                </motion.div>
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[620px] bg-white border border-border rounded-3xl shadow-2xl z-[1011] p-8 max-h-[85vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <div className="flex justify-between items-center border-b border-border pb-4 mb-5">
                <h3 className="font-[family-name:var(--font-head)] text-[1.25rem] font-[850] text-brand-navy">Kids Sizing Chart (Standard Fit)</h3>
                <button className="font-bold text-[0.85rem] text-white bg-brand-navy px-4 py-2 rounded-full hover:bg-brand-terracotta transition-colors" onClick={() => setShowSizeGuide(false)}>
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

                  <form onSubmit={handleCallbackSubmit} className="w-full flex flex-col gap-4 box-border">
                    {/* Unified Phone Input Box */}
                    <div className="flex items-stretch border border-[#dcdcdc] rounded-[16px] overflow-hidden bg-white box-border focus-within:border-brand-navy focus-within:ring-2 focus-within:ring-brand-navy/10">
                      <div className="flex items-center gap-1.5 px-3.5 bg-[#f8f9fa] border-r border-[#e9ecef] text-[0.92rem] font-bold text-brand-navy-light user-select-none shrink-0">
                        <span className="text-[1.15rem]">🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="81234 56789"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="flex-1 border-none px-3.5 py-3.5 text-[1.05rem] font-bold text-brand-navy outline-none min-w-0 tracking-wider placeholder:text-[#c0c0c0] placeholder:font-medium"
                        pattern="[6-9][0-9]{9}"
                        title="Please enter a valid 10-digit Indian mobile number"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-brand-terracotta hover:bg-[#c9664b] text-white font-[family-name:var(--font-head)] font-[900] text-[0.95rem] py-3.5 rounded-[16px] cursor-pointer transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(224,122,95,0.25)] hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <PhoneCall size={14} />
                      <span>Call me back</span>
                    </button>
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
