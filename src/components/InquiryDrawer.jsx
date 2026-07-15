import { useState } from 'react'
import { X, Trash2, MessageSquare, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabaseClient'

export default function InquiryDrawer({ isOpen, onClose, bagItems, onRemoveFromBag, onClearBag }) {
  const totalItems = bagItems.length
  const [showContactForm, setShowContactForm] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getWhatsAppLink = (name, phone, inquiryId) => {
    const shopPhone = '917891672762'
    let text = `Hi Kids City! I saw these outfits on your website and would like to check their availability (Inquiry ID: #${inquiryId}):\n\n`
    text += `Customer Name: ${name}\nCustomer Phone: +91 ${phone}\n\n`
    bagItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (${item.category})\n   - Size: ${item.size}\n   - Price: ${item.price}`
      if (item.img && item.img.startsWith('/')) {
        const fullImgUrl = window.location.origin + item.img
        text += `\n   - Photo: ${fullImgUrl}`
      }
      text += `\n\n`
    })
    text += `Total items: ${totalItems}\nIs this collection currently in stock at your Wakad store?`
    return `https://wa.me/${shopPhone}?text=${encodeURIComponent(text)}`
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault()
    if (!customerName || !customerPhone || customerPhone.length < 10) return
    setIsSubmitting(true)

    const randId = 'KC-' + Math.floor(10000 + Math.random() * 90000)
    const totalSum = bagItems.reduce((acc, item) => {
      const val = parseInt(item.price.replace(/\D/g, ''), 10) || 0
      return acc + val
    }, 0)
    const displayTotal = `₹${totalSum}`

    try {
      const { error } = await supabase.from('customer_inquiries').insert([{
        inquiry_id: randId,
        name: customerName,
        phone: `+91 ${customerPhone}`,
        items: bagItems,
        total_price: displayTotal,
        created_at: new Date().toISOString()
      }])
      if (error) throw error
      const waUrl = getWhatsAppLink(customerName, customerPhone, randId)
      window.open(waUrl, '_blank')
      setCustomerName('')
      setCustomerPhone('')
      setShowContactForm(false)
      if (onClearBag) onClearBag()
      onClose()
    } catch (err) {
      console.error('Failed to save inquiry to Supabase:', err)
      alert('Saving inquiry bypassed. Redirecting to WhatsApp directly...')
      const waUrl = getWhatsAppLink(customerName, customerPhone, randId)
      window.open(waUrl, '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-[rgba(44,46,67,0.4)] backdrop-blur-[4px] z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 w-full max-w-[440px] h-full bg-white shadow-[0_20px_60px_rgba(61,64,91,0.2)] flex flex-col z-[1001] border-l border-border"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-[family-name:var(--font-head)] text-[1.35rem] font-extrabold text-brand-navy">
                  Inquiry Bag
                </h2>
                <p className="text-[0.8rem] text-text-muted mt-0.5">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </p>
              </div>
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center text-brand-navy bg-white border border-border transition-all duration-150 hover:bg-brand-terracotta hover:text-white hover:border-brand-terracotta hover:rotate-90"
                onClick={onClose}
                aria-label="Close bag"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {totalItems === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-[72px] h-[72px] rounded-full bg-white border border-border flex items-center justify-center mb-5">
                    <MessageSquare size={32} className="text-brand-terracotta" />
                  </div>
                  <h3 className="font-[family-name:var(--font-head)] text-[1.15rem] font-bold text-brand-navy mb-2">
                    Your Inquiry Bag is Empty
                  </h3>
                  <p className="text-[0.9rem] text-text-mid mb-6 leading-[1.5]">
                    Browse our premium collections, select sizes, and add them here to inquire about multiple items at once.
                  </p>
                  <button className="btn btn-navy" onClick={onClose}>
                    Start Browsing
                  </button>
                </div>
              ) : showContactForm ? (
                <div>
                  <div className="mb-5">
                    <h3 className="font-[family-name:var(--font-head)] text-[1.15rem] font-bold text-brand-navy">
                      Contact Details
                    </h3>
                    <p className="text-[0.85rem] text-text-mid mt-1">
                      Enter your details to finalize your inquiry and start WhatsApp chat.
                    </p>
                  </div>
                  <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="checkout-name" className="text-[0.8rem] font-semibold text-brand-navy">
                        Your Name
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        placeholder="e.g. Rahul Parihar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="px-3 py-2.5 border-[1.5px] border-[#e0dbd3] rounded-[8px] text-[0.9rem] font-medium outline-none transition-colors duration-150 focus:border-brand-navy"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="checkout-phone" className="text-[0.8rem] font-semibold text-brand-navy">
                        Mobile Number
                      </label>
                      <div className="flex items-center border-[1.5px] border-[#e0dbd3] rounded-[8px] bg-white overflow-hidden transition-colors duration-150 focus-within:border-brand-navy">
                        <span className="px-3 py-2.5 bg-[#fbfaf8] text-[0.9rem] font-semibold text-text-mid border-r-[1.5px] border-[#e0dbd3]">
                          +91
                        </span>
                        <input
                          id="checkout-phone"
                          type="tel"
                          placeholder="81234 56789"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className="border-none flex-1 px-3 py-2.5 outline-none text-[0.9rem] font-medium bg-transparent"
                          pattern="[6-9][0-9]{9}"
                          title="Please enter a valid 10-digit mobile number"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        type="button"
                        className="flex-1 border-[1.5px] border-[#e0dbd3] px-3 py-3 rounded-[8px] font-semibold text-[0.9rem] text-text-mid text-center transition-all duration-150 hover:bg-[#fbfaf8] hover:text-brand-navy hover:border-brand-navy"
                        onClick={() => setShowContactForm(false)}
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn btn-wa flex-[2] flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send WhatsApp'}
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {bagItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${index}`}
                      className="flex gap-3.5 p-3.5 bg-white border border-border rounded-[16px] relative transition-colors duration-150 hover:border-brand-terracotta"
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-[70px] h-[70px] object-cover rounded-[8px] bg-white"
                      />
                      <div className="flex-1 flex flex-col justify-between pr-5">
                        <span className="text-[0.7rem] font-bold uppercase text-brand-sage tracking-[0.5px]">
                          {item.category}
                        </span>
                        <h4 className="font-[family-name:var(--font-head)] text-[0.92rem] font-bold text-brand-navy mt-[3px] mb-1.5 line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2.5">
                          <span className="text-[0.72rem] font-semibold bg-white border border-border px-2 py-[2px] rounded-[4px] text-brand-navy">
                            Size: {item.size}
                          </span>
                          <span className="text-[0.92rem] font-extrabold text-brand-terracotta">{item.price}</span>
                        </div>
                      </div>
                      <button
                        className="absolute top-3.5 right-3.5 text-text-muted transition-colors duration-150 hover:text-[#ea5455]"
                        onClick={() => onRemoveFromBag(index)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {totalItems > 0 && !showContactForm && (
              <div className="px-6 py-6 border-t border-border bg-white">
                <div className="flex justify-between items-center font-bold text-brand-navy text-base mb-3">
                  <span>Total Items</span>
                  <span className="text-[1.15rem] text-brand-terracotta">{totalItems}</span>
                </div>
                <p className="text-[0.75rem] text-text-muted leading-[1.4] mb-5">
                  We will pre-format a message for you. Clicking below will open WhatsApp to coordinate sizing and pickup directly.
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="btn btn-wa w-full"
                >
                  <MessageSquare size={18} fill="currentColor" strokeWidth={0} />
                  Inquire All via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
