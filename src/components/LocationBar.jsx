import { useState } from 'react'
import { MapPin, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const changeBtn = (
    <button
      onClick={handleReset}
      className="flex items-center gap-1.5 bg-transparent text-text-mid border border-[#dcd7ce] px-3 py-1.5 rounded-[6px] text-[0.8rem] font-semibold transition-all duration-150 hover:bg-white hover:text-brand-navy hover:border-brand-navy"
    >
      <RefreshCw size={12} /> Change Pincode
    </button>
  )

  return (
    <div className="bg-[#fbfaf8] border-b border-[#f0ede9] py-2.5 font-[family-name:var(--font-body)] text-[0.9rem] text-text-dark relative z-[99] shadow-[inset_0_-2px_4px_rgba(61,64,91,0.02)]" style={{ marginTop: '64px' }}>
      <div className="container flex justify-center items-center min-h-[38px] max-md:px-2">
        <AnimatePresence mode="wait">
          {!deliveryPincode ? (
            <motion.form
              key="enter-pincode"
              onSubmit={handleCheck}
              className="flex items-center gap-4 max-md:flex-col max-md:gap-2 flex-wrap justify-center w-full"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-terracotta shrink-0" />
                <span className="text-text-mid">
                  We deliver to <strong className="text-brand-navy font-semibold">Wakad, Pune (411057)</strong> only. Check your area:
                </span>
              </div>
              <div className="flex items-center border-[1.5px] border-[#e0dbd3] rounded-[8px] bg-white overflow-hidden focus-within:border-brand-navy transition-colors duration-150">
                <input
                  type="text"
                  placeholder="Enter 6-digit pincode"
                  value={inputPincode}
                  onChange={(e) => {
                    setInputPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
                    setError('')
                  }}
                  className="border-none bg-transparent px-3 py-1.5 w-[150px] text-[0.88rem] outline-none font-medium tracking-[0.5px]"
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-navy text-white px-4 py-2 font-semibold text-[0.85rem] transition-all duration-150 hover:bg-brand-navy-dark active:scale-95"
                >
                  Verify
                </button>
              </div>
              {error && <span className="text-brand-pink text-[0.8rem] font-medium ml-2">{error}</span>}
            </motion.form>
          ) : isWakad ? (
            <motion.div
              key="wakad-verified"
              className="flex max-md:flex-col max-md:text-center max-md:items-center items-center justify-between w-full max-w-[900px] bg-[rgba(46,196,182,0.08)] border border-[rgba(46,196,182,0.25)] px-4 py-2 rounded-[8px] gap-3 flex-wrap"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex max-md:flex-col max-md:gap-1.5 max-md:text-center items-center gap-2.5">
                <CheckCircle2 size={16} className="text-brand-green shrink-0" />
                <span className="font-medium text-brand-navy">
                  Delivering to <strong className="font-bold text-brand-navy-dark">Wakad, Pune 411057</strong>. Same-day delivery &amp; Store pickup available!
                </span>
              </div>
              {changeBtn}
            </motion.div>
          ) : (
            <motion.div
              key="out-of-area"
              className="flex max-md:flex-col max-md:text-center max-md:items-center items-center justify-between w-full max-w-[900px] bg-[rgba(255,75,114,0.08)] border border-[rgba(255,75,114,0.25)] px-4 py-2 rounded-[8px] gap-3 flex-wrap"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex max-md:flex-col max-md:gap-1.5 max-md:text-center items-center gap-2.5">
                <AlertTriangle size={16} className="text-brand-pink shrink-0" />
                <span className="font-medium text-brand-navy">
                  Delivery unavailable for <strong className="font-bold">{deliveryPincode}</strong>. We only deliver to <strong className="font-bold">Wakad, Pune 411057</strong>.
                </span>
              </div>
              {changeBtn}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
