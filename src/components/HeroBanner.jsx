import { motion } from 'framer-motion'
import styles from './HeroBanner.module.css'
import heroImage from '../assets/herosection/removebg_image/desktop_hero.webp'
import mobileHeroImage from '../assets/herosection/mobile_hero/mobile_hero.webp'
import tabletHeroImage from '../assets/herosection/tablet_hero/tablet_hero.webp'

export default function HeroBanner({ onViewChange }) {
  const handleBrowseClick = () => {
    onViewChange('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.gradientOverlay} />
      <div className={styles.contentOverlay}>
        <motion.div
          className={styles.tagBadge}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.tagIcon}>✦</span>
          Wakad's Loved Kids Wear Store • 4.9★ Rated
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Best Kids Clothes Shop in Wakad<br />
          <span className={styles.serifAccent}>Premium Outfits in Pune</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Wakad's trusted boutique for skin-safe cotton night suits, baby wear, & traditional festival outfits in Pune.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button onClick={handleBrowseClick} className={styles.primaryCta}>
            Shop Collections →
          </button>
          <button
            onClick={() => { onViewChange('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={styles.secondaryCta}
          >
            Visit Store
          </button>
        </motion.div>
      </div>

      {/* Desktop View Image */}
      <img
        src={heroImage}
        alt="Kids City Boutique Wakad Pune — Premium children clothing store"
        className={styles.heroImageDesktop}
        loading="eager"
        fetchPriority="high"
      />
      {/* Mobile View Image */}
      <img
        src={mobileHeroImage}
        alt="Kids City Boutique Wakad Pune"
        className={styles.heroImageMobile}
        loading="eager"
      />
      {/* Tablet View Image */}
      <img
        src={tabletHeroImage}
        alt="Kids City Boutique Wakad Pune"
        className={styles.heroImageTablet}
        loading="eager"
      />
    </section>
  )
}
