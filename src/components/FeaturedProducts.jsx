import { useState } from 'react'
import { Star, Heart } from 'lucide-react'
import styles from './FeaturedProducts.module.css'

const TABS = ['All', 'Festival Wear', 'Traditional', 'Casual', 'Birthday']

const PRODUCTS = [
  {
    id: 1,
    name: 'Navratri Lehenga Set',
    category: 'Festival Wear',
    price: '₹899',
    tag: 'Bestseller',
    tagColor: '#f5a623',
    img: '/images/festival_wear.png',
    rating: 4.9,
    reviews: 42,
  },
  {
    id: 2,
    name: 'Birthday Princess Dress',
    category: 'Birthday',
    price: '₹749',
    tag: 'Trending',
    tagColor: '#FF1493',
    img: '/images/birthday_dress.png',
    rating: 4.8,
    reviews: 36,
  },
  {
    id: 3,
    name: 'Boys Casual Set',
    category: 'Casual',
    price: '₹549',
    tag: 'New',
    tagColor: '#32CD32',
    img: '/images/casual_boys.png',
    rating: 4.9,
    reviews: 28,
  },
  {
    id: 4,
    name: 'Diwali Traditional Kurta',
    category: 'Traditional',
    price: '₹699',
    tag: 'Festival',
    tagColor: '#8B00FF',
    img: '/images/festival_wear.png',
    rating: 4.7,
    reviews: 19,
  },
  {
    id: 5,
    name: 'Girls Fancy Frock',
    category: 'Birthday',
    price: '₹649',
    tag: 'Popular',
    tagColor: '#FF6600',
    img: '/images/hero_girl.png',
    rating: 4.8,
    reviews: 31,
  },
  {
    id: 6,
    name: 'Boys Ethnic Sherwani',
    category: 'Traditional',
    price: '₹899',
    tag: 'Premium',
    tagColor: '#0d2040',
    img: '/images/casual_boys.png',
    rating: 4.9,
    reviews: 24,
  },
]

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={0}
          fill={i < Math.round(rating) ? 'currentColor' : '#dce6f5'}
        />
      ))}
      <span className={styles.ratingNum}>{rating}</span>
    </div>
  )
}

function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={product.img} alt={`${product.name} — ${product.category} for kids at Kids City Wakad, Pune`} className={styles.productImg} loading="lazy" />
        <span className={styles.tag} style={{ background: product.tagColor }}>{product.tag}</span>
        <button
          className={`${styles.wishlistBtn} ${wishlist ? styles.wishlistActive : ''}`}
          onClick={() => setWishlist(w => !w)}
          aria-label="Add to wishlist"
        >
          <Heart size={18} strokeWidth={2} fill={wishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className={styles.info}>
        <p className={styles.cat}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <StarRating rating={product.rating} />
        <div className={styles.priceRow}>
          <span className={styles.price}>{product.price}</span>
          <a
            href={`https://wa.me/917891672762?text=Hi%20Kids%20City!%20I'm%20interested%20in%20${encodeURIComponent(product.name)}.%20Is%20it%20available%3F`}
            className={styles.inquireBtn}
            aria-label={`Inquire about ${product.name}`}
          >
            Inquire
          </a>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = activeTab === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab)

  return (
    <section id="featured" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Featured</span>
          <h2 className="section-heading">Our Best Collections</h2>
          <p className={styles.headerSub}>
            Handpicked styles loved by Pune parents. Visit our store in Wakad to explore the full range.
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
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>Want to see more? Visit our store at Mahalaxmi Complex, Wakad — 500+ styles in store!</p>
          <a
            href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20want%20to%20know%20about%20your%20full%20collection."
            className="btn btn-navy"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.107 1.514 5.84L0 24l6.343-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.381l-.372-.22-3.765.881.921-3.666-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
