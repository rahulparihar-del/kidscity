import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'
import styles from './NotFoundView.module.css'

export default function NotFoundView({ onViewChange }) {
  const handleHome = (e) => {
    e.preventDefault()
    onViewChange('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleShop = (e) => {
    e.preventDefault()
    onViewChange('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Illustration */}
          <div className={styles.illustration}>
            <span className={styles.num}>404</span>
            <div className={styles.emoji}>🧒</div>
          </div>

          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.desc}>
            Oops! It looks like this page went off to play. Don't worry — Kids City Wakad still has 500+ amazing kids outfits waiting for you!
          </p>

          <div className={styles.actions}>
            <a href="/" onClick={handleHome} className="btn btn-terracotta">
              <Home size={16} /> Back to Home
            </a>
            <a href="/collections" onClick={handleShop} className="btn btn-outline-navy">
              <Search size={16} /> Browse Collections
            </a>
          </div>

          <div className={styles.helpText}>
            <p>Looking for something specific?</p>
            <ul className={styles.suggestionList}>
              <li><a href="/collections" onClick={handleShop}>🎉 Festival Wear for Kids in Wakad</a></li>
              <li><a href="/collections" onClick={handleShop}>🎂 Birthday Dresses Pune</a></li>
              <li><a href="/collections" onClick={handleShop}>🛕 Traditional Kids Wear Pune</a></li>
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); onViewChange('contact'); window.scrollTo({ top: 0 }); }}>📞 Contact Kids City Wakad</a></li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
