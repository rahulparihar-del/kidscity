import { useState } from 'react'
import { MapPin, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LocationBar.module.css'

export default function LocationBar({ deliveryPincode, setDeliveryPincode, isWakad }) {
  const [inputPincode, setInputPincode] = useState('')
  const [error, setError] = useState('')

  const handleCheck = (e) => {
    e.preventDefault()
    const cleaned = inputPincode.trim()
    if (!/^\d{6}$/.test(cleaned)) {
      setError('Please enter a valid 6-digit pincode.')
      return
    }
    setError('')
    setDeliveryPincode(cleaned)
  }

  const handleReset = () => {
    setDeliveryPincode('')
    setInputPincode('')
    setError('')
  }

  return (
    <div className={styles.locationBar}>
      <div className={`container ${styles.inner}`}>
        <AnimatePresence mode="wait">
          {!deliveryPincode ? (
            <motion.form
              key="enter-pincode"
              onSubmit={handleCheck}
              className={styles.pincodeForm}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.labelRow}>
                <MapPin size={16} className={styles.pinIcon} />
                <span className={styles.promptText}>
                  We deliver to <strong>Wakad, Pune (411057)</strong> only. Check your area:
                </span>
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Enter 6-digit pincode"
                  value={inputPincode}
                  onChange={(e) => {
                    setInputPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                    setError('')
                  }}
                  className={styles.pincodeInput}
                  required
                />
                <button type="submit" className={styles.checkBtn}>
                  Verify
                </button>
              </div>
              {error && <span className={styles.errorText}>{error}</span>}
            </motion.form>
          ) : isWakad ? (
            <motion.div
              key="wakad-verified"
              className={styles.verifiedContainer}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.statusRow}>
                <CheckCircle2 size={16} className={styles.successIcon} />
                <span className={styles.statusText}>
                  Delivering to <strong>Wakad, Pune 411057</strong>. Same-day delivery & Store pickup available!
                </span>
              </div>
              <button onClick={handleReset} className={styles.changeBtn}>
                <RefreshCw size={12} /> Change Pincode
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="out-of-area"
              className={styles.invalidContainer}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.statusRow}>
                <AlertTriangle size={16} className={styles.warningIcon} />
                <span className={styles.statusText}>
                  Delivery unavailable for <strong>{deliveryPincode}</strong>. We only deliver to <strong>Wakad, Pune 411057</strong>.
                </span>
              </div>
              <button onClick={handleReset} className={styles.changeBtn}>
                <RefreshCw size={12} /> Change Pincode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
