import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import styles from './WhatsAppFAB.module.css'

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const btnRef = useRef(null)

  useEffect(() => {
    let timer
    function wiggle() {
      if (!isOpen) {
        btnRef.current?.classList.add(styles.wiggle)
        timer = setTimeout(() => {
          btnRef.current?.classList.remove(styles.wiggle)
        }, 700)
      }
    }

    const interval = setInterval(wiggle, 7000)
    const init = setTimeout(wiggle, 3500)
    return () => {
      clearInterval(interval)
      clearTimeout(init)
      clearTimeout(timer)
    }
  }, [isOpen])

  const handleSend = (e) => {
    e.preventDefault()
    const cleanedMsg = msg.trim()
    const phoneNum = '917891672762'
    const defaultText = "Hi Kids City! I want to inquire about kids clothing collections."
    const finalMsg = cleanedMsg ? cleanedMsg : defaultText
    const url = `https://wa.me/${phoneNum}?text=${encodeURIComponent(finalMsg)}`
    
    window.open(url, '_blank')
    setMsg('')
    setIsOpen(false)
  }

  return (
    <div className={styles.fabContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.widget}
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.88 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
          >
            {/* Widget Header */}
            <div className={styles.header}>
              <div className={styles.profile}>
                <div className={styles.avatarWrap}>
                  <img
                    src="/images/logo.webp"
                    alt="Kids City Store Avatar"
                    className={styles.avatarImg}
                  />
                  <span className={styles.onlineDot} />
                </div>
                <div className={styles.headerText}>
                  <h4 className={styles.bizName}>Kids City Wakad</h4>
                  <span className={styles.bizStatus}>Typically replies in minutes</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeBtn}
                aria-label="Close WhatsApp chat widget"
              >
                <X size={18} />
              </button>
            </div>

            {/* Widget Chat Area */}
            <div className={styles.chatArea}>
              <div className={styles.bubble}>
                <span className={styles.bubbleName}>Kids City</span>
                <p className={styles.bubbleText}>
                  Namaste! 🙏 Welcome to Kids City Wakad.
                </p>
                <span className={styles.bubbleTime}>Just now</span>
              </div>
              <div className={styles.bubble}>
                <span className={styles.bubbleName}>Kids City</span>
                <p className={styles.bubbleText}>
                  Tell us what size or kids wear style you are looking for, and we will send you photos directly on WhatsApp!
                </p>
                <span className={styles.bubbleTime}>Just now</span>
              </div>
            </div>

            {/* Widget Form Input */}
            <form onSubmit={handleSend} className={styles.inputArea} aria-label="WhatsApp message form">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your query..."
                className={styles.inputField}
                aria-label="WhatsApp query message"
              />
              <button
                type="submit"
                className={styles.sendBtn}
                aria-label="Send query via WhatsApp"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        ref={btnRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.btn} ${isOpen ? styles.btnOpen : ''}`}
        aria-label="Open WhatsApp chat window"
        aria-expanded={isOpen}
      >
        <span className={styles.ring} />
        <span className={styles.ring2} />
        
        {isOpen ? (
          <X size={26} color="white" />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.107 1.514 5.84L0 24l6.343-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.381l-.372-.22-3.765.881.921-3.666-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
