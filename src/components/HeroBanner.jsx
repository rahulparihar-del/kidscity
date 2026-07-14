import { motion } from 'framer-motion'
import styles from './HeroBanner.module.css'
import heroImage from '../assets/herosection/removebg_image/ChatGPT Image Jul 15, 2026, 12_29_08 AM (1).png'

export default function HeroBanner({ onViewChange }) {
  const handleBrowseClick = () => {
    onViewChange('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero}>
      <img
        src={heroImage}
        alt="Kids City Boutique Wakad Pune — Premium children clothing store"
        className={styles.heroImage}
        loading="eager"
        fetchPriority="high"
      />
      <div className={styles.gradientOverlay} />

      <div className={styles.contentOverlay}>
        <motion.div
          className={styles.tagBadge}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.tagIcon}>✦</span>
          500+ Happy Parents • 4.9 Rating
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Adorable Clothes for Little Ones<br />
          <span className={styles.serifAccent}>Your Kids Will Love</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Skin-safe cotton wear for ages 1–12 · Night suits, festive & casuals
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
    </section>
  )
}
