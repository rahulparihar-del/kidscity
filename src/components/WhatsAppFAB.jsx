import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const btnRef = useRef(null)

  useEffect(() => {
    let timer
    function wiggle() {
      if (!isOpen) {
        btnRef.current?.classList.add('fab-wiggle')
        timer = setTimeout(() => {
          btnRef.current?.classList.remove('fab-wiggle')
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
    const defaultText = 'Hi Kids City! I want to inquire about kids clothing collections.'
    const finalMsg = cleanedMsg ? cleanedMsg : defaultText
    const url = `https://wa.me/${phoneNum}?text=${encodeURIComponent(finalMsg)}`
    window.open(url, '_blank')
    setMsg('')
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-7 right-6 max-[560px]:bottom-[18px] max-[560px]:right-4 z-[9999] flex flex-col items-end gap-4 max-[560px]:gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-[350px] max-[400px]:w-[calc(100vw-32px)] bg-white rounded-[24px] overflow-hidden shadow-[0_12px_48px_rgba(61,64,91,0.18),0_2px_12px_rgba(61,64,91,0.08)] border border-border flex flex-col"
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.88 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
          >
            {/* Header */}
            <div className="bg-[#0d1e3d] px-5 py-[18px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-[42px] h-[42px]">
                  <img
                    src="/images/logo.webp"
                    alt="Kids City Store Avatar"
                    className="w-full h-full rounded-full object-cover bg-white border-2 border-white/20"
                  />
                  <span className="absolute bottom-[1px] right-[1px] w-2.5 h-2.5 bg-[#25d366] rounded-full border-2 border-[#0d1e3d]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-[family-name:var(--font-head)] text-[0.95rem] font-bold text-white m-0 leading-[1.2]">
                    Kids City Wakad
                  </h4>
                  <span className="font-[family-name:var(--font-body)] text-[0.72rem] text-white/65">
                    Typically replies in minutes
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/65 cursor-pointer p-1 rounded-full transition-all duration-200 flex items-center justify-center hover:bg-white/10 hover:text-white"
                aria-label="Close WhatsApp chat widget"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat area */}
            <div
              className="p-6 py-[24px] flex flex-col gap-4 max-h-[280px] overflow-y-auto"
              style={{
                background: '#F4EFE6',
                backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            >
              {[
                'Namaste! 🙏 Welcome to Kids City Wakad.',
                'Tell us what size or kids wear style you are looking for, and we will send you photos directly on WhatsApp!',
              ].map((text, i) => (
                <div
                  key={i}
                  className="bg-white px-3.5 py-3 rounded-[0_16px_16px_16px] max-w-[85%] self-start shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
                >
                  <span className="block font-[family-name:var(--font-head)] text-[0.75rem] font-bold text-brand-terracotta mb-[3px]">
                    Kids City
                  </span>
                  <p className="font-[family-name:var(--font-body)] text-[0.85rem] text-text-dark leading-[1.45] m-0">
                    {text}
                  </p>
                  <span className="block text-right font-[family-name:var(--font-body)] text-[0.65rem] text-text-muted mt-1">
                    Just now
                  </span>
                </div>
              ))}
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSend}
              className="px-4 py-3 bg-white flex items-center gap-2.5 border-t border-border"
              aria-label="WhatsApp message form"
            >
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your query..."
                className="flex-1 border border-border rounded-full px-4 py-2 font-[family-name:var(--font-body)] text-[0.85rem] text-text-dark outline-none bg-[#f7fafc] transition-all duration-200 focus:border-[#25d366] focus:bg-white"
                aria-label="WhatsApp query message"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-[#20ba56] active:scale-[0.92]"
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
        className={`relative w-[60px] h-[60px] max-[560px]:w-[54px] max-[560px]:h-[54px] rounded-full flex items-center justify-center cursor-pointer border-none outline-none transition-all duration-[250ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.08] ${
          isOpen
            ? 'bg-brand-terracotta shadow-[0_8px_32px_rgba(224,122,95,0.38)] rotate-90 hover:shadow-[0_10px_40px_rgba(224,122,95,0.5)]'
            : 'bg-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.38)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.5)]'
        }`}
        aria-label="Open WhatsApp chat window"
        aria-expanded={isOpen}
      >
        {/* Pulse rings — only show when closed */}
        {!isOpen && (
          <>
            <span className="fab-ring" />
            <span className="fab-ring-2" />
          </>
        )}

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
