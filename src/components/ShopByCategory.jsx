import { Sparkles, Shirt, PartyPopper, Cake, Baby, Snowflake } from 'lucide-react'
import styles from './ShopByCategory.module.css'

const CATS = [
  { icon: Sparkles, label: 'Girls', sub: 'Frocks & Dresses' },
  { icon: Shirt, label: 'Boys', sub: 'Casuals & Ethnic' },
  { icon: PartyPopper, label: 'Festival', sub: 'Traditional Wear' },
  { icon: Cake, label: 'Birthday', sub: 'Party Collection' },
  { icon: Baby, label: 'Baby', sub: '0–2 Years' },
  { icon: Snowflake, label: 'Winter', sub: 'Warm & Cozy' },
]

export default function ShopByCategory() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Browse</span>
          <h2 className="section-heading">Shop by Category</h2>
        </div>

        <div className={styles.grid}>
          {CATS.map((c, i) => {
            const Icon = c.icon
            return (
              <a key={i} href="#featured" className={styles.catItem} aria-label={`Shop ${c.label}`}>
                <div className={styles.iconBox}>
                  <Icon className={styles.iconEmoji} size={26} strokeWidth={1.8} />
                </div>
                <h3 className={styles.label}>{c.label}</h3>
                <p className={styles.sub}>{c.sub}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
