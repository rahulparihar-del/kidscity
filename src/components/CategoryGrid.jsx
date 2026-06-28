import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './CategoryGrid.module.css'
import { useSiteImages } from '../hooks/useSiteImages'

const CATEGORY_DEFS = [
  {
    id: 1,
    imageKey: 'category_festival',
    defaultImg: '/images/festival_wear.webp',
    label: 'Festival Season',
    sublabel: 'Navratri · Diwali · Eid',
    badge: 'New Arrivals',
    badgeColor: 'var(--brand-orange)',
    glowColor: 'var(--brand-orange-glow)',
    borderColor: 'var(--brand-orange)'
  },
  {
    id: 2,
    imageKey: 'category_birthday',
    defaultImg: '/images/birthday_dress.webp',
    label: 'Birthday Special',
    sublabel: 'Princess & Party Wear',
    badge: 'Trending',
    badgeColor: 'var(--brand-pink)',
    glowColor: 'var(--brand-pink-glow)',
    borderColor: 'var(--brand-pink)'
  },
  {
    id: 3,
    imageKey: 'category_casual',
    defaultImg: '/images/casual_boys.webp',
    label: 'Boys Casual',
    sublabel: 'Everyday Comfort',
    badge: 'Best Seller',
    badgeColor: 'var(--brand-blue)',
    glowColor: 'var(--brand-blue-glow)',
    borderColor: 'var(--brand-blue)'
  },
]

export default function CategoryGrid({ onViewChange }) {
  const { images, loading } = useSiteImages()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    }
  }

  // Merge categories with resolved images from Supabase (fallback to default static file)
  const CATEGORIES = CATEGORY_DEFS.map(cat => ({
    ...cat,
    img: images[cat.imageKey] || cat.defaultImg
  }))

  const handleCategoryClick = (e) => {
    e.preventDefault()
    if (onViewChange) {
      onViewChange('shop')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section id="categories" className={styles.section}>
      {/* Decorative organic background elements */}
      <div className={styles.bgDeco}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="section-label">Shop by Collection</span>
          <h2 className="section-heading">Curated for Every <span className="serif-accent">Occasion</span></h2>
          <p className={styles.headerSub}>
            Discover handpicked luxury styles. From vibrant festivals to birthday blowouts and casual play, find the perfect fit.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease' }}
        >
          {CATEGORIES.map(cat => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className={styles.card}
              style={{
                '--hover-glow-color': cat.glowColor,
                '--hover-border-color': cat.borderColor
              }}
              onClick={handleCategoryClick}
            >
              {/* Arched image container */}
              <div className={styles.imgWrap}>
                <img
                  src={cat.img}
                  alt={`${cat.label} collection`}
                  className={styles.img}
                />
                <div className={styles.gradientOverlay} />
              </div>

              {/* Glassmorphic floating footer card */}
              <div className={styles.cardContent}>
                <span className={styles.cardBadge} style={{ background: cat.badgeColor }}>
                  {cat.badge}
                </span>
                
                <div className={styles.textGroup}>
                  <h3 className={styles.cardLabel}>{cat.label}</h3>
                  <p className={styles.cardSub}>{cat.sublabel}</p>
                </div>

                <span className={styles.shopBtn}>
                  Explore Collection
                  <ArrowRight size={14} className={styles.arrow} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
