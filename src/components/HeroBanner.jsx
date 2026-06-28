import { Star, ArrowRight, Heart, Sparkles, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './HeroBanner.module.css'
import { useSiteImages } from '../hooks/useSiteImages'

export default function HeroBanner({ onViewChange }) {
  const { images, loading } = useSiteImages()

  const handleBrowseClick = () => {
    onViewChange('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Resolve image: use Supabase override if present, else fall back to static file
  const imgLeft   = images['hero_left']   || '/images/festival_wear.png'
  const imgRight  = images['hero_right']  || '/images/birthday_dress.png'
  const imgCenter = images['hero_center'] || '/images/hero_girl.png'

  return (
    <section id="hero" className={styles.hero}>
      {/* Soft glowing organic blobs in the background */}
      <div className={styles.bgDeco}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      <div className={`container ${styles.inner}`}>
        {/* Left Column: Premium copy */}
        <div className={styles.contentCol}>
          {/* Top Tagline Badge */}
          <motion.div
            className={styles.badgeWrap}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} className={styles.sparkleIcon} />
            <span>Wakad's #1 Kids Fashion Destination</span>
          </motion.div>

          {/* Headline - Mix of Outfit and Playfair Display */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Dressing your <span className={styles.serifAccent}>little sunshine</span> in pure comfort
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore 500+ premium styles of festival wear, traditional dresses, and casual everyday clothes for boys &amp; girls (0–14 years). Handpicked comfort for Pune's families.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button onClick={handleBrowseClick} className={`btn btn-terracotta ${styles.primaryCta}`}>
              Browse Collections <ArrowRight size={16} />
            </button>
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline-navy ${styles.secondaryCta}`}
            >
              Visit Wakad Store
            </a>
          </motion.div>

          {/* Trust stats in clean horizontal capsules */}
          <motion.div
            className={styles.trustStrip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.trustItem}>
              <div className={styles.ratingBox}>
                <span>4.9</span>
                <Star size={14} fill="currentColor" strokeWidth={0} className={styles.starIcon} />
              </div>
              <span className={styles.trustText}>135+ Reviews</span>
            </div>
            <div className={styles.trustDiv} />
            <div className={styles.trustItem}>
              <ShieldCheck size={18} className={styles.sageIcon} />
              <span className={styles.trustText}>100% Skin-Safe Fabrics</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Layered Boutique Collage */}
        <div className={styles.collageCol} style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s ease' }}>
          <div className={styles.collageContainer}>
            {/* Background Blob Frame */}
            <div className={styles.collageBlob} />

            {/* Overlapping Card 1: Left (Festival Wear) */}
            <motion.div
              className={`${styles.collageCard} ${styles.cardLeft}`}
              initial={{ opacity: 0, x: -30, rotate: -8 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              whileHover={{ rotate: -2, zIndex: 10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img
                src={imgLeft}
                alt="Festive kids collection"
                className={styles.collageImg}
              />
              <div className={styles.cardLabel}>Festive Joy</div>
            </motion.div>

            {/* Overlapping Card 2: Right (Birthday Dress) */}
            <motion.div
              className={`${styles.collageCard} ${styles.cardRight}`}
              initial={{ opacity: 0, x: 30, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 8 }}
              whileHover={{ rotate: 2, zIndex: 10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img
                src={imgRight}
                alt="Birthday kids dress"
                className={styles.collageImg}
              />
              <div className={styles.cardLabel}>Party Wear</div>
            </motion.div>

            {/* Main Center Image Card (Hero Girl) */}
            <motion.div
              className={`${styles.collageCard} ${styles.cardCenter}`}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03, zIndex: 9 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <img
                src={imgCenter}
                alt="Kids Clothing model"
                className={styles.collageImg}
              />
              <div className={styles.cardLabelMain}>New Arrivals</div>
            </motion.div>

            {/* Floating Badge: Hearts */}
            <motion.div
              className={`${styles.floatBadge} ${styles.badgeLove}`}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={14} fill="currentColor" strokeWidth={0} className={styles.heartIcon} />
              <span>Loved by Moms</span>
            </motion.div>

            {/* Floating Badge: Quality Tag */}
            <motion.div
              className={`${styles.floatBadge} ${styles.badgeQuality}`}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <span className={styles.goldDot} />
              <span>0–14 Years</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
