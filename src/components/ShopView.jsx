import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, Star, Heart, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ShopView.module.css'

export const PRODUCTS = [
  {
    id: 1,
    name: 'Navratri Lehenga Set',
    category: 'Festival Wear',
    priceVal: 899,
    price: '₹899',
    tag: 'Bestseller',
    tagColor: '#E07A5F',
    img: '/images/festival_wear.webp',
    rating: 4.9,
    reviews: 42,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y'],
    desc: 'Traditional high-quality Chaniya Choli with heavy mirror work and vibrant threads, perfect for Garba nights. Soft inner lining for maximum comfort while dancing.',
    specs: { Fabric: 'Premium Cotton Silk', Wash: 'Dry Clean Only', Set: 'Lehenga, Choli & Dupatta' },
    gallery: ['/images/festival_wear.webp', '/images/hero_girl.webp', '/images/birthday_dress.webp']
  },
  {
    id: 2,
    name: 'Birthday Princess Dress',
    category: 'Birthday',
    priceVal: 749,
    price: '₹749',
    tag: 'Trending',
    tagColor: '#F28482',
    img: '/images/birthday_dress.webp',
    rating: 4.8,
    reviews: 36,
    sizes: ['0-2y', '2-4y', '4-6y', '6-8y'],
    desc: 'Gorgeous layered tulle gown with soft satin lining and butterfly embellishments. Makes your little girl feel like a real princess on her special day.',
    specs: { Fabric: 'Tulle & Satin', Wash: 'Gentle Hand Wash', Set: 'Single Dress with Bow Headband' },
    gallery: ['/images/birthday_dress.webp', '/images/hero_girl.webp', '/images/festival_wear.webp']
  },
  {
    id: 3,
    name: 'Boys Casual Denim Set',
    category: 'Casual',
    priceVal: 549,
    price: '₹549',
    tag: 'New',
    tagColor: '#81B29A',
    img: '/images/casual_boys.webp',
    rating: 4.9,
    reviews: 28,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y', '10-12y'],
    desc: 'Trendy dynamic casual set featuring a breathable cotton t-shirt and premium stretchable denim shorts. Durable stitch detailing for active play.',
    specs: { Fabric: '100% Breathable Cotton & Denim', Wash: 'Machine Washable', Set: 'T-Shirt & Shorts' },
    gallery: ['/images/casual_boys.webp', '/images/festival_wear.webp']
  },
  {
    id: 4,
    name: 'Diwali Traditional Kurta',
    category: 'Traditional',
    priceVal: 699,
    price: '₹699',
    tag: 'Festival',
    tagColor: '#F4A261',
    img: '/images/festival_wear.webp',
    rating: 4.7,
    reviews: 19,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y', '10-12y', '12-14y'],
    desc: 'Classy ethnic silk-blend kurta with gold embroidery around the collar. Paired with a comfortable elasticized pajama for hassle-free styling.',
    specs: { Fabric: 'Banarasi Art Silk', Wash: 'Dry Clean Recommended', Set: 'Kurta & Pajama' },
    gallery: ['/images/festival_wear.webp', '/images/casual_boys.webp']
  },
  {
    id: 5,
    name: 'Girls Fancy Peach Frock',
    category: 'Birthday',
    priceVal: 649,
    price: '₹649',
    tag: 'Popular',
    tagColor: '#F28482',
    img: '/images/hero_girl.webp',
    rating: 4.8,
    reviews: 31,
    sizes: ['0-2y', '2-4y', '4-6y', '6-8y'],
    desc: 'Delightful tiered designer frock in peach, accented with elegant floral lace details. Highly breathable fabric structure perfect for summer celebrations.',
    specs: { Fabric: 'Organza & Soft Voile', Wash: 'Hand Wash', Set: 'Frock Only' },
    gallery: ['/images/hero_girl.webp', '/images/birthday_dress.webp']
  },
  {
    id: 6,
    name: 'Boys Ethnic Sherwani',
    category: 'Traditional',
    priceVal: 899,
    price: '₹899',
    tag: 'Premium',
    tagColor: '#3D405B',
    img: '/images/casual_boys.webp',
    rating: 4.9,
    reviews: 24,
    sizes: ['4-6y', '6-8y', '8-10y', '10-12y'],
    desc: 'Luxurious jacquard sherwani set styled with premium gold piping and brocade work. Ideal for weddings and high-profile festive family occasions.',
    specs: { Fabric: 'Jacquard Silk', Wash: 'Dry Clean Only', Set: 'Sherwani jacket & churidar pajama' },
    gallery: ['/images/casual_boys.webp', '/images/festival_wear.webp']
  },
  {
    id: 7,
    name: 'Floral Cotton Summer Dress',
    category: 'Casual',
    priceVal: 499,
    price: '₹499',
    tag: 'Cotton',
    tagColor: '#81B29A',
    img: '/images/hero_girl.webp',
    rating: 4.6,
    reviews: 14,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y'],
    desc: 'Lightweight flowy summer dress in a gorgeous wildflower print. Breathable and gentle on children\'s sensitive skin.',
    specs: { Fabric: '100% Organic Cotton', Wash: 'Machine Wash cold', Set: 'Dress Only' },
    gallery: ['/images/hero_girl.webp', '/images/birthday_dress.webp']
  },
  {
    id: 8,
    name: 'Boys Polo T-Shirt & Cargo',
    category: 'Casual',
    priceVal: 599,
    price: '₹599',
    tag: 'Practical',
    tagColor: '#3D405B',
    img: '/images/casual_boys.webp',
    rating: 4.7,
    reviews: 22,
    sizes: ['4-6y', '6-8y', '8-10y', '10-12y', '12-14y'],
    desc: 'Classic smart-casual outfit including a pique cotton polo shirt and multi-pocket cargo pants. Designed for rugged use and comfort.',
    specs: { Fabric: 'Pique Cotton & Twill', Wash: 'Machine Wash', Set: 'Polo Shirt & Cargo Pants' },
    gallery: ['/images/casual_boys.webp']
  },
  {
    id: 9,
    name: 'Organic Cotton Baby Rompers',
    category: 'Baby',
    priceVal: 399,
    price: '₹399',
    tag: 'Organic',
    tagColor: '#81B29A',
    img: '/images/birthday_dress.webp',
    rating: 4.9,
    reviews: 35,
    sizes: ['0-2y'],
    desc: 'Super soft, chemical-free organic cotton sleep-n-play romper with dual security snaps for quick diaper checks.',
    specs: { Fabric: '100% Organic Cotton (GOTS Certified)', Wash: 'Machine Wash Warm', Set: '2-Pack Romper Set' },
    gallery: ['/images/birthday_dress.webp', '/images/hero_girl.webp']
  },
  {
    id: 10,
    name: 'Royal Velvet Kids Sherwani',
    category: 'Traditional',
    priceVal: 1299,
    price: '₹1299',
    tag: 'Luxury',
    tagColor: '#3D405B',
    img: '/images/casual_boys.webp',
    rating: 5.0,
    reviews: 12,
    sizes: ['4-6y', '6-8y', '8-10y', '10-12y', '12-14y'],
    desc: 'Stunning premium deep navy velvet sherwani jacket with zardozi hand embroidery. Complemented by designer dhoti pants.',
    specs: { Fabric: 'Micro-Velvet & Silk Blend', Wash: 'Dry Clean Only', Set: 'Sherwani & Dhoti Pants' },
    gallery: ['/images/casual_boys.webp', '/images/festival_wear.webp']
  },
  {
    id: 11,
    name: 'Vibrant Starry Party Gown',
    category: 'Birthday',
    priceVal: 999,
    price: '₹999',
    tag: 'Star Pick',
    tagColor: '#F4A261',
    img: '/images/birthday_dress.webp',
    rating: 4.8,
    reviews: 18,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y'],
    desc: 'Make her feel like a star! Sparkly tulle ball gown embedded with shiny gold constellations, layered beautifully.',
    specs: { Fabric: 'Sequined Tulle & Silk Ribbon', Wash: 'Hand Wash Only', Set: 'Gown & Matching Tiara' },
    gallery: ['/images/birthday_dress.webp', '/images/hero_girl.webp']
  },
  {
    id: 12,
    name: 'Cosy Sherpa Fleece Hoody',
    category: 'Casual',
    priceVal: 799,
    price: '₹799',
    tag: 'Winter',
    tagColor: '#81B29A',
    img: '/images/casual_boys.webp',
    rating: 4.8,
    reviews: 15,
    sizes: ['2-4y', '4-6y', '6-8y', '8-10y', '10-12y'],
    desc: 'Plush high-loft sherpa fleece hoody with soft cotton lining. Features cute bear ears on the hood for adorable style.',
    specs: { Fabric: 'Sherpa Fleece & Jersey Lining', Wash: 'Gentle Machine Wash', Set: 'Hoodie Jacket' },
    gallery: ['/images/casual_boys.webp']
  },
  // -- Night Suits (Best-Selling Category) -----------------------------------
  {
    id: 13,
    name: 'Hosiery Cotton Night Suit - Cartoon Print',
    category: 'Night Suits',
    priceVal: 399,
    price: '\u20b9399',
    tag: 'Bestseller',
    tagColor: '#E07A5F',
    img: '/images/nightsuit-hosiery-1-1.webp',
    rating: 4.9,
    reviews: 68,
    sizes: ['1-2y', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y'],
    desc: 'The night suit every Pune mom recommends! Premium hosiery cotton, gentle on sensitive skin, easy to wash, keeps kids cozy all night.\n\nWhy Parents Love It:\n100% pure hosiery combed cotton - ultra-soft & non-irritating\nBreathable & lightweight - perfect for India\'s climate\nFun cartoon prints kids adore\nElastic waistband - easy on, easy off\nMachine washable - stays soft after 100+ washes\nFull sleeve + full length for complete comfort\n\nVery popular - limited stock! Order via WhatsApp.\n\nCOD Available | Free Delivery in Wakad | Easy 7-Day Exchange',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Top + Pyjama Set', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-1-1.webp', '/images/nightsuit-hosiery-1-2.webp', '/images/nightsuit-hosiery-1-3.webp', '/images/nightsuit-hosiery-1-4.webp', '/images/nightsuit-hosiery-1-5.webp']
  },
  {
    id: 14,
    name: 'Hosiery Night Suit - Animal Friends Print',
    category: 'Night Suits',
    priceVal: 399,
    price: '\u20b9399',
    tag: 'Trending',
    tagColor: '#81B29A',
    img: '/images/nightsuit-hosiery-2-1.webp',
    rating: 4.8,
    reviews: 44,
    sizes: ['1-2y', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y'],
    desc: 'Super soft hosiery night suit with adorable animal prints - kids absolutely love it!\n\nFeatures:\n100% pure hosiery cotton - skin-safe & breathable\nMachine washable, retains softness\nElastic waist for easy bedtime dressing\nSizes 1-8 years\n\nCOD Available | Free Delivery within Wakad',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Top + Pyjama Set', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-2-1.webp', '/images/nightsuit-hosiery-2-2.webp', '/images/nightsuit-hosiery-2-4.webp', '/images/nightsuit-hosiery-2-5.webp']
  },
  {
    id: 15,
    name: 'Kids Premium Night Suit - Stripes & Checks',
    category: 'Night Suits',
    priceVal: 449,
    price: '\u20b9449',
    tag: 'Popular',
    tagColor: '#F4A261',
    img: '/images/nightsuit-hosiery-3-1.webp',
    rating: 4.9,
    reviews: 31,
    sizes: ['2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y', '8-9y', '9-10y'],
    desc: 'Classic stripe and check patterns in premium hosiery cotton. Smart, neat and incredibly comfortable for kids 2-10 years.\n\nFeatures:\nPremium hosiery combed cotton\nClassic patterns loved by parents & kids\nMachine washable, colour-fast\nElastic waistband for all-night comfort\n\nCOD Available | Easy 7-Day Exchange',
    specs: { Fabric: '100% Combed Hosiery Cotton', Wash: 'Machine Washable', Set: 'Full Sleeve Top + Pyjama', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-3-1.webp', '/images/nightsuit-hosiery-3-2.webp', '/images/nightsuit-hosiery-3-4.webp', '/images/nightsuit-hosiery-3-5.webp']
  },
  {
    id: 16,
    name: 'Kids Soft Cotton Night Suit - Floral Print',
    category: 'Night Suits',
    priceVal: 399,
    price: '\u20b9399',
    tag: 'New',
    tagColor: '#F28482',
    img: '/images/nightsuit-hosiery-4-1.webp',
    rating: 4.8,
    reviews: 19,
    sizes: ['1-2y', '2-3y', '3-4y', '4-5y', '5-6y', '6-7y'],
    desc: 'Beautiful floral print hosiery night suit - perfect for your little girl! Adorable pastel patterns on premium soft cotton.\n\nFeatures:\n100% hosiery cotton - skin-safe & cozy\nSweet floral patterns girls adore\nMachine washable\nElastic waist - comfortable all night\n\nCOD Available | Free Delivery in Wakad',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Top + Pyjama Set', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-4-1.webp', '/images/nightsuit-hosiery-4-2.webp', '/images/nightsuit-hosiery-4-4.webp', '/images/nightsuit-hosiery-4-5.webp']
  },
  {
    id: 17,
    name: 'Premium Kids Night Suit - Solid Colors',
    category: 'Night Suits',
    priceVal: 449,
    price: '\u20b9449',
    tag: 'Classic',
    tagColor: '#3D405B',
    img: '/images/nightsuit-hosiery-5-1.webp',
    rating: 4.7,
    reviews: 22,
    sizes: ['2-3y', '3-4y', '4-5y', '5-6y', '6-7y', '7-8y', '8-9y', '9-10y', '10-11y', '11-12y'],
    desc: 'Clean, classic solid-color night suit in premium hosiery cotton. Timeless design for everyday bedtime comfort.\n\nFeatures:\nPremium quality hosiery cotton\nSolid rich colours - easy to mix & match\nAvailable up to 12 years (biggest size range!)\nMachine washable, colour-fast\n\nCOD Available | Easy 7-Day Exchange',
    specs: { Fabric: '100% Hosiery Cotton', Wash: 'Machine Washable', Set: 'Full Sleeve Top + Pyjama', Origin: 'Made in India' },
    gallery: ['/images/nightsuit-hosiery-5-1.webp', '/images/nightsuit-hosiery-5-2.webp', '/images/nightsuit-hosiery-5-4.webp', '/images/nightsuit-hosiery-5-5.webp']
  }
]

// Sizing filters are calculated dynamically from database items
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 2000 },
  { label: 'Under ₹600', min: 0, max: 600 },
  { label: '₹600 - ₹900', min: 600, max: 900 },
  { label: '₹900+', min: 900, max: 2000 }
]

function AutoScrollingImage({ img, gallery, alt, className }) {
  const images = gallery && gallery.length > 0 ? gallery : [img]
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length)
    }, 3500) // cycle every 3.5s

    return () => clearInterval(timer)
  }, [images])

  if (images.length === 0 || !images[0]) {
    return (
      <div className={styles.imgPlaceholder}>
        <span>No Image</span>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[idx]}
          src={images[idx]}
          alt={alt}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </AnimatePresence>
    </div>
  )
}

export default function ShopView({ products, onSelectProduct }) {
  const catalogSource = products && products.length > 0 ? products : PRODUCTS

  const CATEGORIES = useMemo(() => {
    const cats = new Set(catalogSource.map(p => p.category).filter(Boolean))
    return ['All', ...Array.from(cats)]
  }, [catalogSource])

  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('All')
  const [selectedSize, setSelectedSize] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGES[0])
  const [sortBy, setSortBy] = useState('popular')
  const [wishlisted, setWishlisted] = useState({})
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

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

  const toggleWishlist = (id, e) => {
    e.stopPropagation()
    setWishlisted(prev => ({ ...prev, [id]: !prev[id] }))
  }


  // Dynamic SIZES derived from active database products list
  const derivedSizes = useMemo(() => {
    const unique = new Set()
    catalogSource.forEach(p => {
      if (p.sizes && Array.isArray(p.sizes)) {
        p.sizes.forEach(sz => {
          if (sz) unique.add(sz)
        })
      }
    })
    
    // Sort sizes logically (months, years, letters, numbers)
    const sorted = Array.from(unique).sort((a, b) => {
      const letterOrder = { 'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5, 'XXL': 6 }
      if (letterOrder[a] && letterOrder[b]) return letterOrder[a] - letterOrder[b]
      if (letterOrder[a]) return 1
      if (letterOrder[b]) return -1

      const numA = parseInt(a)
      const numB = parseInt(b)
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB
      if (!isNaN(numA)) return 1
      if (!isNaN(numB)) return -1
      
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    })

    return ['All', ...sorted]
  }, [catalogSource])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let items = [...catalogSource]

    // Search filter
    if (search.trim() !== '') {
      const q = search.toLowerCase()
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    }

    // Category filter
    if (selectedCat !== 'All') {
      items = items.filter(p => p.category === selectedCat)
    }

    // Size filter
    if (selectedSize !== 'All') {
      items = items.filter(p => p.sizes.includes(selectedSize))
    }

    // Price filter
    items = items.filter(p => p.priceVal >= selectedPrice.min && p.priceVal <= selectedPrice.max)

    // Sort
    if (sortBy === 'popular') {
      items.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    } else if (sortBy === 'low-high') {
      items.sort((a, b) => a.priceVal - b.priceVal)
    } else if (sortBy === 'high-low') {
      items.sort((a, b) => b.priceVal - a.priceVal)
    } else if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating)
    }

    return items
  }, [catalogSource, search, selectedCat, selectedSize, selectedPrice, sortBy])

  // Reusable filters renderer for both Sidebar and Mobile Drawer
  const renderFilters = () => (
    <>
      {/* Category Filter */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterLabel}>Category</h4>
        <div className={styles.catChips}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.chip} ${selectedCat === cat ? styles.chipActive : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sizing Filter */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterLabel}>Age / Size</h4>
        <div className={styles.sizeGrid}>
          {derivedSizes.map(sz => (
            <button
              key={sz}
              className={`${styles.sizeBtn} ${selectedSize === sz ? styles.sizeActive : ''}`}
              onClick={() => setSelectedSize(sz)}
            >
              {sz === 'All' ? 'All Sizes' : sz}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className={styles.filterGroup}>
        <h4 className={styles.filterLabel}>Price Range</h4>
        <div className={styles.priceOptions}>
          {PRICE_RANGES.map((pr, idx) => (
            <button
              key={idx}
              className={`${styles.priceBtn} ${selectedPrice.label === pr.label ? styles.priceActive : ''}`}
              onClick={() => setSelectedPrice(pr)}
            >
              <span className={styles.radioDot} />
              {pr.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div className={styles.shopPage}>
      {/* Header Banner */}
      <div className={styles.shopHeader}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.headerContent}
          >
            <span className="section-label" style={{ color: 'var(--brand-terracotta)' }}>Premium Wear</span>
            <h1 className={styles.title}>Explore <span className="serif-accent">Collections</span></h1>
            <p className={styles.subtitle}>
              Filter by size, category, and price to find the perfect outfit for your little star.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className={styles.shopSection}>
        <div className="container">
          <div className={styles.layout}>
            {/* Desktop Filters Sidebar (Hidden on mobile) */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <SlidersHorizontal size={18} className={styles.filterIcon} />
                <h3>Filters</h3>
              </div>
              {renderFilters()}
            </aside>

            {/* Catalog Grid */}
            <main className={styles.catalog}>
              {/* Controls bar */}
              <div className={styles.controlsBar}>
                {/* Search */}
                <div className={styles.searchBox}>
                  <Search size={18} className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search dress, kurta, frocks..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>

                {/* Mobile Filter Trigger Button */}
                <button
                  className={styles.mobileFilterTrigger}
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                {/* Sort */}
                <div className={styles.sortBox}>
                  <ArrowUpDown size={16} className={styles.sortIcon} />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className={styles.sortSelect}
                  >
                    <option value="popular">Most Popular</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Products count */}
              <div className={styles.resultCount}>
                Showing {filteredProducts.length} of {catalogSource.length} styles
              </div>

              {/* Grid with animation */}
              <motion.div className={styles.grid} layout>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length === 0 ? (
                    <motion.div
                      className={styles.noResults}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key="no-results"
                    >
                      <h3>No items matched your filters</h3>
                      <p>Try clearing your search query or selecting a different age size.</p>
                      <button
                        className="btn btn-navy"
                        onClick={() => {
                          setSearch('')
                          setSelectedCat('All')
                          setSelectedSize('All')
                          setSelectedPrice(PRICE_RANGES[0])
                        }}
                      >
                        Reset All Filters
                      </button>
                    </motion.div>
                  ) : (
                    filteredProducts.map((p, idx) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                        className={styles.card}
                        style={{
                          '--hover-glow-color': getGlowColor(p.category),
                          '--hover-border-color': getHoverBorderColor(p.category)
                        }}
                        onClick={() => onSelectProduct(p)}
                      >
                        <div className={styles.imgWrap}>
                          <AutoScrollingImage
                            img={p.img}
                            gallery={p.gallery}
                            alt={`${p.name} — ${p.category || 'Kids clothing'} at Kids City Wakad, Pune`}
                            className={styles.cardImg}
                          />
                          {p.tag && (
                            <span
                              className={styles.tag}
                              style={{ backgroundColor: p.tagColor }}
                            >
                              {p.tag}
                            </span>
                          )}
                          <button
                            className={`${styles.wishlistBtn} ${wishlisted[p.id] ? styles.wishlistActive : ''}`}
                            onClick={e => toggleWishlist(p.id, e)}
                            aria-label="Add to wishlist"
                          >
                            <Heart
                              size={18}
                              strokeWidth={2}
                              fill={wishlisted[p.id] ? 'currentColor' : 'none'}
                            />
                          </button>
                        </div>
                        <div className={styles.info}>
                          <span className={styles.category}>{p.category}</span>
                          <h3 className={styles.name}>{p.name}</h3>
                          <div className={styles.ratingRow}>
                            <div className={styles.stars}>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={13}
                                  strokeWidth={0}
                                  fill={i < Math.round(p.rating) ? 'currentColor' : '#E6DFD3'}
                                />
                              ))}
                            </div>
                            <span className={styles.reviews}>({p.reviews})</span>
                          </div>
                          <div className={styles.priceRow}>
                            <span className={styles.price}>{p.price}</span>
                            <span className={styles.sizesLabel}>{p.sizes.join(', ')}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            </main>
          </div>
        </div>
      </section>

      {/* Sliding Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            <motion.div
              className={styles.mobileDrawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div className={styles.drawerHeader}>
                <div className={styles.drawerHeaderTitle}>
                  <SlidersHorizontal size={18} className={styles.filterIcon} />
                  <h3>Filters</h3>
                </div>
                <button
                  className={styles.drawerClose}
                  onClick={() => setIsMobileFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>

              <div className={styles.drawerBody}>
                {renderFilters()}
              </div>

              <div className={styles.drawerFooter}>
                <button
                  className="btn btn-terracotta"
                  style={{ width: '100%' }}
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  Apply Filters ({filteredProducts.length} Items)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
