import { Star, Users, ShieldCheck, Package, Gem, Wallet, Truck, RotateCcw, MessageSquare } from 'lucide-react'
import styles from './TrustBar.module.css'

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
    <div className={styles.bar} role="region" aria-label="Store highlights">
      <div className={styles.track}>
        {[...ITEMS, ...ITEMS].map((item, i) => {
          const Icon = item.icon
          return (
            <div className={styles.item} key={i}>
              <span className={styles.icon} style={{ color: item.color }}>
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <span className={styles.text}>{item.text}</span>
              <span className={styles.sep} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
