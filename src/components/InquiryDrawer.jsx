import { X, Trash2, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './InquiryDrawer.module.css'

export default function InquiryDrawer({ isOpen, onClose, bagItems, onRemoveFromBag }) {
  const totalItems = bagItems.length

  const getWhatsAppLink = () => {
    const phone = '917891672762'
    let text = "Hi Kids City! I saw these outfits on your website and would like to check their availability:\n\n"
    
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
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
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

            {totalItems > 0 && (
              <div className={styles.footer}>
                <div className={styles.summaryRow}>
                  <span>Total Items</span>
                  <span className={styles.totalCount}>{totalItems}</span>
                </div>
                <p className={styles.disclaimer}>
                  We will pre-format a message for you. Clicking below will open WhatsApp to coordinate sizing and pickup directly.
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-wa ${styles.checkoutBtn}`}
                >
                  <MessageSquare size={18} fill="currentColor" strokeWidth={0} />
                  Inquire All via WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
