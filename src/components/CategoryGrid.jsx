import { ArrowRight } from 'lucide-react'
import styles from './CategoryGrid.module.css'

const CATEGORIES = [
  {
    id: 1,
    label: 'Festival Season',
    sublabel: 'Navratri · Diwali · Eid',
    img: '/images/festival_wear.png',
    span: 'large',
    badge: 'New Arrivals',
    badgeColor: 'var(--brand-orange)',
    overlay: 'linear-gradient(to top, rgba(40, 15, 10, 0.9) 0%, rgba(224, 122, 95, 0.45) 50%, transparent 100%)',
  },
  {
    id: 2,
    label: 'Birthday Special',
    sublabel: 'Princess & Party Wear',
    img: '/images/birthday_dress.png',
    span: 'normal',
    badge: 'Trending',
    badgeColor: 'var(--brand-pink)',
    overlay: 'linear-gradient(to top, rgba(50, 10, 25, 0.9) 0%, rgba(255, 75, 114, 0.45) 50%, transparent 100%)',
  },
  {
    id: 3,
    label: 'Boys Casual',
    sublabel: 'Everyday Comfort',
    img: '/images/casual_boys.png',
    span: 'normal',
    badge: 'Best Seller',
    badgeColor: 'var(--brand-blue)',
    overlay: 'linear-gradient(to top, rgba(10, 25, 50, 0.9) 0%, rgba(0, 168, 232, 0.45) 50%, transparent 100%)',
  },
]

export default function CategoryGrid() {
  return (
    <section id="categories" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Shop by Collection</span>
          <h2 className="section-heading">Curated for Every <span className="serif-accent">Occasion</span></h2>
          <p className={styles.headerSub}>From everyday casual to festive grandeur — we dress your little stars for every moment.</p>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map(cat => (
            <a
              key={cat.id}
              href="#featured"
              className={`${styles.card} ${cat.span === 'large' ? styles.cardLarge : ''}`}
              aria-label={`Shop ${cat.label}`}
            >
              <img
                src={cat.img}
                alt={`${cat.label} kids clothing collection at Kids City Wakad — ${cat.sublabel}`}
                className={styles.img}
                loading="lazy"
              />
              <div className={styles.overlay} style={{ background: cat.overlay }} />

              <div className={styles.cardContent}>
                <span className={styles.cardBadge} style={{ background: cat.badgeColor }}>
                  {cat.badge}
                </span>
                <div>
                  <h3 className={styles.cardLabel}>{cat.label}</h3>
                  <p className={styles.cardSub}>{cat.sublabel}</p>
                </div>
                <span className={styles.shopBtn}>Shop Now <ArrowRight size={15} strokeWidth={2.4} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
