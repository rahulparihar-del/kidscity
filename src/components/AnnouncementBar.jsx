import { Star } from 'lucide-react'

const MESSAGE = "✨ Kids City Wakad — Kids Clothing Boutique (Ages 0–15) \u00A0·\u00A0 4.9★ on Google (141 Reviews) \u00A0·\u00A0 Festive & Birthday Wear \u00A0·\u00A0 Since 2018 \u00A0·\u00A0 WhatsApp: +91 78916 72762 \u00A0·\u00A0 Delivery in Wakad & Nearby Areas \u00A0·\u00A0"

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
