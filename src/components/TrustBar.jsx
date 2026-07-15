import { Star, Users, ShieldCheck, Package, Gem, Wallet, Truck, RotateCcw, MessageSquare } from 'lucide-react'

const ITEMS = [
  { icon: Truck,         text: 'Free Delivery in Wakad',       color: '#32CD32' },
  { icon: Wallet,        text: 'Cash on Delivery Available',    color: '#f5a623' },
  { icon: RotateCcw,     text: '7-Day Easy Exchange',           color: '#00BFFF' },
  { icon: Star,          text: '4.9★ Google Rating',            color: '#f5a623' },
  { icon: Users,         text: '500+ Happy Parents',            color: '#FF6600' },
  { icon: ShieldCheck,   text: '100% Skin-Safe Cotton',         color: '#32CD32' },
  { icon: MessageSquare, text: 'WhatsApp: 78916 72762',         color: '#25D366' },
  { icon: Package,       text: 'New Collection Weekly',         color: '#FF6600' },
  { icon: Gem,           text: 'Premium Kids Wear',             color: '#8B00FF' },
]

export default function TrustBar() {
  return (
    <div
      className="bg-white overflow-hidden py-3.5 border-t border-b border-border"
      role="region"
      aria-label="Store highlights"
    >
      {/* Marquee track — uses the global .animate-marquee keyframe */}
      <div
        className="flex items-center whitespace-nowrap w-max"
        style={{ animation: 'marquee 30s linear infinite' }}
      >
        {[...ITEMS, ...ITEMS].map((item, i) => {
          const Icon = item.icon
          return (
            <div className="inline-flex items-center gap-2.5 px-5" key={i}>
              <span className="inline-flex items-center shrink-0" style={{ color: item.color }}>
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <span className="text-[0.85rem] font-bold text-brand-navy tracking-[0.2px] whitespace-nowrap">
                {item.text}
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-border ml-5" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
