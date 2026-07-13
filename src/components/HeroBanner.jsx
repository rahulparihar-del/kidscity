import { Star, ArrowRight, Heart, Sparkles, ShieldCheck, ShoppingBag, Tag } from 'lucide-react'
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
  const imgLeft   = images['hero_left']   || '/images/festival_wear.webp'
  const imgRight  = images['hero_right']  || '/images/birthday_dress.webp'
  const imgCenter = images['hero_center'] || '/images/hero_girl.webp'

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
            <span className={styles.badgeText} style={{ margin: 0, fontWeight: 'inherit', fontSize: 'inherit' }}>
              500+ Happy Parents • 4.9 Rating • Trusted Since 2018
            </span>
          </motion.div>

          {/* Headline - Mix of Outfit and Playfair Display */}
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Adorable Clothes for Little Ones <span className={styles.serifAccent}>Your Kids Will Love</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Soft, skin-safe fabrics. Adorable designs. Prices Indian families love.
            Night suits, festive wear, casual sets & more — for babies to big kids (1–12 years).
            <strong> 500+ Pune parents shop with us. Shop online — or visit us in Wakad!</strong>
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button onClick={handleBrowseClick} className={`btn btn-terracotta ${styles.primaryCta}`}>
              <ShoppingBag size={16} className={styles.ctaIcon} />
              <span>Shop Night Suits — From ₹399</span>
              <ArrowRight size={16} className={styles.ctaArrow} />
            </button>
            <button
              onClick={() => { onViewChange('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`btn btn-outline-navy ${styles.secondaryCta}`}
            >
              See All Collections
            </button>
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
              <span className={styles.trustText}>500+ Reviews</span>
            </div>
            <div className={styles.trustDiv} />
            <div className={styles.trustItem}>
              <ShieldCheck size={18} className={styles.sageIcon} />
              <span className={styles.trustText}>COD Available</span>
            </div>
            <div className={styles.trustDiv} />
            <div className={styles.trustItem}>
              <ShieldCheck size={18} className={styles.sageIcon} />
              <span className={styles.trustText}>Free Delivery in Wakad</span>
            </div>
            <div className={styles.trustDiv} />
            <div className={styles.trustItem}>
              <ShieldCheck size={18} className={styles.sageIcon} />
              <span className={styles.trustText}>7-Day Easy Exchange</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Layered Boutique Collage */}
        {/* NOTE: Never hide this column while loading — static fallbacks show instantly.
            Supabase image overrides will silently swap in once the fetch resolves. */}
        <div className={styles.collageCol}>
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
                alt="Kids festival wear Wakad Pune — Navratri lehenga and Diwali kurta outfits for boys and girls at Kids City"
                className={styles.collageImg}
                loading="eager"
                fetchPriority="high"
                width="240"
                height="320"
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
                alt="Birthday dress for kids Pune — princess party wear for girls at Kids City, best kids boutique in Wakad"
                className={styles.collageImg}
                loading="eager"
                fetchPriority="high"
                width="240"
                height="320"
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
                alt="Kids wear Wakad Pune — new arrivals at Kids City, children's clothing store for boys and girls aged 0–14 years"
                className={styles.collageImg}
                loading="eager"
                fetchPriority="high"
                width="280"
                height="380"
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
              <span>Loved by 500+ Moms</span>
            </motion.div>

            {/* Floating Badge: Sale Tag */}
            <motion.div
              className={`${styles.floatBadge} ${styles.badgeQuality}`}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Tag size={13} className={styles.tagIcon} />
              <span>Sale: Up to 40% OFF</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
