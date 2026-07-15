import { Star } from 'lucide-react'

const MESSAGE = "🎉 MONSOON SALE — Upto 40% OFF on Night Suits & Festival Wear \u00A0·\u00A0 FREE Delivery in Wakad & Hinjewadi \u00A0·\u00A0 Cash on Delivery Available \u00A0·\u00A0 4.9★ Rated by 500+ Happy Parents \u00A0·\u00A0 New Stock Every Week \u00A0·\u00A0 WhatsApp: 78916 72762 \u00A0·\u00A0"

export default function AnnouncementBar() {
  return (
    <div className="bg-white overflow-hidden h-9 flex items-center border-b border-border">
      <div className="overflow-hidden whitespace-nowrap w-full">
        <div
          className="inline-flex whitespace-nowrap"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          <span className="inline-flex items-center text-[0.78rem] font-bold text-brand-navy px-2 tracking-[0.3px]">
            <Star size={13} fill="currentColor" strokeWidth={0} className="text-brand-orange mr-1.5 shrink-0" />
            {MESSAGE}
          </span>
          <span className="inline-flex items-center text-[0.78rem] font-bold text-brand-navy px-2 tracking-[0.3px]">
            <Star size={13} fill="currentColor" strokeWidth={0} className="text-brand-orange mr-1.5 shrink-0" />
            {MESSAGE}
          </span>
        </div>
      </div>
    </div>
  )
}
