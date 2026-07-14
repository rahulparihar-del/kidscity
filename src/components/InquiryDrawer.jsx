import { useState } from 'react'
import { X, Trash2, MessageSquare, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabaseClient'
import styles from './InquiryDrawer.module.css'

export default function InquiryDrawer({ isOpen, onClose, bagItems, onRemoveFromBag, onClearBag }) {
  const totalItems = bagItems.length

  const [showContactForm, setShowContactForm] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getWhatsAppLink = (name, phone, inquiryId) => {
    const shopPhone = '917891672762'
    let text = `Hi Kids City! I saw these outfits on your website and would like to check their availability (Inquiry ID: #${inquiryId}):\n\n`
    
    text += `Customer Name: ${name}\n`
    text += `Customer Phone: +91 ${phone}\n\n`
    
    bagItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} (${item.category})\n   - Size: ${item.size}\n   - Price: ${item.price}`
      
      // If the image is a static file, append the full public URL so WhatsApp displays preview card
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
    
    // Calculate total price string
    const totalSum = bagItems.reduce((acc, item) => {
      const val = parseInt(item.price.replace(/\D/g, ''), 10) || 0
      return acc + val
    }, 0)
    const displayTotal = `₹${totalSum}`

    try {
      // Insert into customer_inquiries in Supabase
      const { error } = await supabase.from('customer_inquiries').insert([{
        inquiry_id: randId,
        name: customerName,
        phone: `+91 ${customerPhone}`,
        items: bagItems,
        total_price: displayTotal,
        created_at: new Date().toISOString()
      }])

      if (error) throw error

      // Open WhatsApp link
      const waUrl = getWhatsAppLink(customerName, customerPhone, randId)
      window.open(waUrl, '_blank')

      // Reset state & close drawer
      setCustomerName('')
      setCustomerPhone('')
      setShowContactForm(false)
      
      if (onClearBag) onClearBag()
      onClose()
    } catch (err) {
      console.error("Failed to save inquiry to Supabase:", err)
      alert("Saving inquiry bypassed. Redirecting to WhatsApp directly...")
      // Fallback redirect
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
          {/* Backdrop overlay */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding panel */}
          <motion.div
            className={styles.panel}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          >
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>Inquiry Bag</h2>
                <p className={styles.subtitle}>{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</p>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close bag">
                <X size={20} />
              </button>
            </div>

            <div className={styles.body}>
              {totalItems === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyCircle}>
                    <MessageSquare size={32} className={styles.emptyIcon} />
                  </div>
                  <h3 className={styles.emptyTitle}>Your Inquiry Bag is Empty</h3>
                  <p className={styles.emptyText}>
                    Browse our premium collections, select sizes, and add them here to inquire about multiple items at once.
                  </p>
                  <button className="btn btn-navy" onClick={onClose}>
                    Start Browsing
                  </button>
                </div>
              ) : showContactForm ? (
                <div className={styles.formContainer}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Contact Details</h3>
                    <p className={styles.formText}>Enter your details to finalize your inquiry and start WhatsApp chat.</p>
                  </div>
                  <form onSubmit={handleCheckoutSubmit} className={styles.checkoutForm}>
                    <div className={styles.field}>
                      <label htmlFor="checkout-name">Your Name</label>
                      <input
                        id="checkout-name"
                        type="text"
                        placeholder="e.g. Rahul Parihar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="checkout-phone">Mobile Number</label>
                      <div className={styles.phoneInputGroup}>
                        <span className={styles.phonePrefix}>+91</span>
                        <input
                          id="checkout-phone"
                          type="tel"
                          placeholder="81234 56789"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className={styles.phoneField}
                          pattern="[6-9][0-9]{9}"
                          title="Please enter a valid 10-digit mobile number"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className={styles.btnRow}>
                      <button
                        type="button"
                        className={styles.cancelBtn}
                        onClick={() => setShowContactForm(false)}
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className={`btn btn-wa ${styles.submitBtn}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send WhatsApp'}
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className={styles.list}>
                  {bagItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.size}-${index}`}
                      className={styles.card}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={item.img} alt={item.name} className={styles.img} />
                      <div className={styles.info}>
                        <span className={styles.category}>{item.category}</span>
                        <h4 className={styles.name}>{item.name}</h4>
                        <div className={styles.meta}>
                          <span className={styles.sizeBadge}>Size: {item.size}</span>
                          <span className={styles.price}>{item.price}</span>
                        </div>
                      </div>
                      <button
                        className={styles.deleteBtn}
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

            {totalItems > 0 && !showContactForm && (
              <div className={styles.footer}>
                <div className={styles.summaryRow}>
                  <span>Total Items</span>
                  <span className={styles.totalCount}>{totalItems}</span>
                </div>
                <p className={styles.disclaimer}>
                  We will pre-format a message for you. Clicking below will open WhatsApp to coordinate sizing and pickup directly.
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  className={`btn btn-wa ${styles.checkoutBtn}`}
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

