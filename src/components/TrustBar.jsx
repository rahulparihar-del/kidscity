import { Star, Users, Trophy, BadgeCheck, Package, Gem, Wallet } from 'lucide-react'
import styles from './TrustBar.module.css'

const ITEMS = [
  { icon: Star, text: '4.9 Google Rating', color: '#f5a623' },
  { icon: Users, text: '135+ Happy Families', color: '#32CD32' },
  { icon: Trophy, text: "Wakad's #1 Kids Store", color: '#f5a623' },
  { icon: BadgeCheck, text: 'Quality Guaranteed', color: '#00BFFF' },
  { icon: Package, text: 'New Collection Weekly', color: '#FF6600' },
  { icon: Gem, text: 'Premium Kids Wear', color: '#8B00FF' },
  { icon: Wallet, text: 'Affordable Prices', color: '#32CD32' },
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
