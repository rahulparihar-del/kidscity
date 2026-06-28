import { useState } from 'react'
import { Star, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
// Fallback items defined dynamically
import styles from './FeaturedProducts.module.css'

const TABS = ['All', 'Festival Wear', 'Traditional', 'Casual', 'Birthday']

// Featured products sliced from dynamic db array

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={0}
          fill={i < Math.round(rating) ? 'currentColor' : '#E6DFD3'}
        />
      ))}
      <span className={styles.ratingNum}>{rating}</span>
    </div>
  )
}

function ProductCard({ product, onSelectProduct }) {
  const [wishlist, setWishlist] = useState(false)

  const handleWishlist = (e) => {
    e.stopPropagation()
    setWishlist(!wishlist)
  }

  const getGlowColor = (cat) => {
    switch (cat) {
      case 'Birthday': return 'var(--brand-pink-glow)'
      case 'Casual': return 'var(--brand-blue-glow)'
      case 'Festival Wear':
      case 'Traditional': return 'var(--brand-orange-glow)'
      default: return 'var(--brand-green-glow)'
    }
  }

  const getHoverBorderColor = (cat) => {
    switch (cat) {
      case 'Birthday': return 'var(--brand-pink)'
      case 'Casual': return 'var(--brand-blue)'
      case 'Festival Wear':
      case 'Traditional': return 'var(--brand-orange)'
      default: return 'var(--brand-green)'
    }
  }

  return (
    <motion.div
      className={styles.card}
      style={{
        '--hover-glow-color': getGlowColor(product.category),
        '--hover-border-color': getHoverBorderColor(product.category)
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onSelectProduct(product)}
    >
      <div className={styles.imgWrap}>
        <img
          src={product.img}
          alt={`${product.name} — ${product.category} at Kids City Wakad`}
          className={styles.productImg}
          loading="lazy"
        />
        {product.tag && (
          <span className={styles.tag} style={{ background: product.tagColor }}>
            {product.tag}
          </span>
        )}
        <button
          className={`${styles.wishlistBtn} ${wishlist ? styles.wishlistActive : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart size={18} strokeWidth={2} fill={wishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className={styles.info}>
        <span className={styles.cat}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <StarRating rating={product.rating} />
        <div className={styles.priceRow}>
          <span className={styles.price}>{product.price}</span>
          <button
            onClick={handleInquire}
            className={styles.inquireBtn}
            aria-label={`Inquire about ${product.name}`}
          >
            Inquire
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProducts({ products, onSelectProduct, onViewChange }) {
  const [activeTab, setActiveTab] = useState('All')

  // Top 6 products for home view
  const displayProducts = (products && products.length > 0 ? products : []).slice(0, 6)

  const filtered = activeTab === 'All'
    ? displayProducts
    : displayProducts.filter(p => p.category === activeTab)

  return (
    <section id="featured" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Featured</span>
          <h2 className="section-heading">Our Best <span className="serif-accent">Collections</span></h2>
          <p className={styles.headerSub}>
            Handpicked styles loved by Pune parents. Click on a dress to see sizes and detailed guide.
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {TABS.map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>Want to see more styles? Browse our full collections catalog online.</p>
          <button
            onClick={() => {
              onViewChange('shop')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="btn btn-terracotta"
          >
            View Full Collections
          </button>
        </div>
      </div>
    </section>
  )
}
