import { MessageSquare, Phone, Navigation } from 'lucide-react'
import { trackWhatsAppClick, trackCallClick, trackDirectionsClick } from '../utils/analytics'

export default function StickyBottomBar({ currentProduct = null }) {
  const handleWhatsApp = () => {
    trackWhatsAppClick('StickyBottomBar', currentProduct)
    const phone = '917891672762'
    let msg = "Hi Kids City! I'm browsing your website and have a query about kids clothing."
    if (currentProduct) {
      const url = `https://kidscity.online/product/${currentProduct.slug || currentProduct.id}`
      msg = `Hi Kids City! I want to order "${currentProduct.name}" (${currentProduct.price}): ${url}. Is it available?`
    }
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const handleCall = () => {
    trackCallClick('StickyBottomBar')
  }

  const handleDirections = () => {
    trackDirectionsClick('StickyBottomBar')
  }

  return (
    <aside
      className="fixed bottom-0 left-0 w-full z-[9990] bg-white/98 backdrop-blur-md border-t border-border/80 shadow-[0_-4px_24px_rgba(61,64,91,0.12)] md:hidden px-3 py-2"
      aria-label="Quick contact mobile bar"
    >
      <div className="grid grid-cols-3 gap-2 max-w-[500px] mx-auto">
        {/* WhatsApp Order */}
        <button
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center gap-1 bg-[#25D366] text-white py-2 px-1 rounded-xl font-[family-name:var(--font-body)] text-[0.76rem] font-bold min-h-[48px] shadow-sm transition-transform active:scale-95"
          aria-label="Order on WhatsApp"
        >
          <MessageSquare size={18} strokeWidth={2.4} />
          <span>WhatsApp</span>
        </button>

        {/* Call Store */}
        <a
          href="tel:+917891672762"
          onClick={handleCall}
          className="flex flex-col items-center justify-center gap-1 bg-brand-navy-dark text-white py-2 px-1 rounded-xl font-[family-name:var(--font-body)] text-[0.76rem] font-bold min-h-[48px] shadow-sm transition-transform active:scale-95 no-underline"
          aria-label="Call Kids City store"
        >
          <Phone size={18} strokeWidth={2.2} />
          <span>Call Store</span>
        </a>

        {/* Directions */}
        <a
          href="https://www.google.com/maps/dir//Kids+City+Wakad"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDirections}
          className="flex flex-col items-center justify-center gap-1 bg-brand-terracotta text-white py-2 px-1 rounded-xl font-[family-name:var(--font-body)] text-[0.76rem] font-bold min-h-[48px] shadow-sm transition-transform active:scale-95 no-underline"
          aria-label="Get directions to Kids City Wakad on Google Maps"
        >
          <Navigation size={18} strokeWidth={2.2} />
          <span>Directions</span>
        </a>
      </div>
    </aside>
  )
}
