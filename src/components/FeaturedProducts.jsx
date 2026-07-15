import { useState, useEffect } from 'react'
import { Star, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function AutoScrollingImage({ img, gallery, alt }) {
  const images = gallery && gallery.length > 0 ? gallery : [img]
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [images])

  if (images.length === 0 || !images[0]) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white text-text-muted text-[0.8rem] font-semibold">
        No Image
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[idx]}
          src={images[idx]}
          alt={alt}
          className="w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
    </div>
  )
}

const TABS = ['All', 'Night Suits', 'Festival Wear', 'Traditional', 'Birthday', 'Casual']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-brand-orange mb-3.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} strokeWidth={0} fill={i < Math.round(rating) ? 'currentColor' : '#E6DFD3'} />
      ))}
      <span className="font-[family-name:var(--font-body)] text-[0.78rem] text-text-muted font-semibold ml-1.5">
        {rating}
      </span>
    </div>
  )
}

const GLOW = {
  Birthday: 'var(--brand-pink-glow)',
  Casual: 'var(--brand-blue-glow)',
  'Festival Wear': 'var(--brand-orange-glow)',
  Traditional: 'var(--brand-orange-glow)',
}
const BORDER = {
  Birthday: 'var(--brand-pink)',
  Casual: 'var(--brand-blue)',
  'Festival Wear': 'var(--brand-orange)',
  Traditional: 'var(--brand-orange)',
}

function ProductCard({ product, onSelectProduct, isWakad }) {
  const [wishlist, setWishlist] = useState(false)

  const handleWishlist = (e) => {
    e.stopPropagation()
    setWishlist(!wishlist)
  }

  const handleInquire = (e) => {
    e.stopPropagation()
    const phone = '917891672762'
    const text = `Hi Kids City! I saw "${product.name}" on your website. Is it available in store?`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <motion.div
      className="group bg-white rounded-[20px] max-[560px]:rounded-[16px] overflow-hidden border-[1.5px] border-border shadow-[0_4px_12px_rgba(61,64,91,0.05)] cursor-pointer flex flex-col transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2"
      style={{
        '--hover-glow-color': GLOW[product.category] || 'var(--brand-green-glow)',
        '--hover-border-color': BORDER[product.category] || 'var(--brand-green)',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={() => onSelectProduct(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-white flex items-center justify-center p-2">
        <AutoScrollingImage
          img={product.img}
          gallery={product.gallery}
          alt={`${product.name} — ${product.category} at Kids City Wakad`}
        />
        {product.tag && (
          <span
            className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full font-[family-name:var(--font-kids)] text-[0.68rem] font-bold text-white uppercase tracking-[0.8px] shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
            style={{ background: product.tagColor }}
          >
            {product.tag}
          </span>
        )}
        <button
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/88 backdrop-blur-sm flex items-center justify-center cursor-pointer border-none transition-all duration-300 shadow-[0_4px_10px_rgba(61,64,91,0.08)] hover:bg-white hover:scale-[1.08] ${
            wishlist ? 'text-brand-pink' : 'text-text-muted'
          }`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart size={18} strokeWidth={2} fill={wishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="px-5 py-[22px] max-[560px]:px-3 max-[560px]:py-3.5 flex flex-col flex-grow">
        <span className="font-[family-name:var(--font-kids)] text-[0.68rem] max-[560px]:text-[0.6rem] font-semibold uppercase tracking-[1.2px] max-[560px]:tracking-[0.8px] text-brand-sage mb-1.5 max-[560px]:mb-1">
          {product.category}
        </span>
        <h3 className="font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-[1.1rem] max-[560px]:text-[0.88rem] text-brand-navy mb-2 max-[560px]:mb-1.5 leading-[1.35] max-[560px]:leading-[1.3]">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="flex items-center justify-between mt-auto pt-2.5">
          <span className="font-[family-name:var(--font-head)] font-black tracking-[-0.02em] text-[1.3rem] max-[560px]:text-[1.05rem] text-brand-terracotta">
            {product.price}
          </span>
          {isWakad && (
            <button
              onClick={handleInquire}
              className="inline-flex items-center justify-center px-4 py-2 max-[560px]:px-3 max-[560px]:py-1.5 rounded-full bg-brand-navy text-white font-[family-name:var(--font-kids)] text-[0.78rem] max-[560px]:text-[0.72rem] font-bold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[34px] max-[560px]:min-h-[30px] shadow-[0_4px_10px_rgba(61,64,91,0.1)] hover:bg-brand-terracotta hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(224,122,95,0.2)]"
              aria-label={`Inquire about ${product.name}`}
            >
              Inquire
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedProducts({ products, onSelectProduct, onViewChange, isWakad }) {
  const [activeTab, setActiveTab] = useState('All')

  const displayProducts = (products && products.length > 0 ? products : []).slice(0, 6)
  const filtered = activeTab === 'All'
    ? displayProducts
    : displayProducts.filter(p => p.category === activeTab)

  return (
    <section id="featured" className="py-[100px] max-md:py-20 max-[560px]:py-[60px] bg-white relative overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 max-[560px]:mb-9 relative z-[2]">
          <span className="font-[family-name:var(--font-kids)] text-[0.72rem] max-[560px]:text-[0.65rem] font-bold tracking-[1.8px] max-[560px]:tracking-[1.4px] uppercase text-brand-terracotta inline-block mb-2">
            Featured
          </span>
          <h2 className="font-[family-name:var(--font-head)] text-[2.25rem] max-[991px]:text-[1.95rem] max-md:text-[1.7rem] max-[560px]:text-[1.4rem] font-[850] text-brand-navy leading-[1.2] tracking-[-0.03em]">
            Our Best <span className="font-[family-name:var(--font-serif)] italic font-semibold text-brand-terracotta">Collections</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[1.05rem] max-md:text-[0.96rem] max-[560px]:text-[0.88rem] text-text-mid max-w-[520px] mx-auto mt-3.5 max-[560px]:mt-2.5 leading-[1.65] max-[560px]:leading-[1.5] font-medium">
            Soft, skin-safe night suits from ₹399, festive lehengas, birthday dresses & more. Loved by 500+ Pune parents!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2.5 max-[560px]:gap-1.5 flex-wrap justify-center mb-10 max-[560px]:mb-7 relative z-[2]" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`font-[family-name:var(--font-kids)] px-5 max-[560px]:px-[15px] py-2 max-[560px]:py-[7px] rounded-full text-[0.84rem] max-[560px]:text-[0.78rem] font-bold border-[1.5px] cursor-pointer min-h-[38px] max-[560px]:min-h-[34px] transition-all duration-150 shadow-[0_2px_8px_rgba(61,64,91,0.02)] ${
                activeTab === tab
                  ? 'bg-brand-terracotta text-white border-brand-terracotta shadow-[0_4px_12px_rgba(224,122,95,0.18)]'
                  : 'bg-white text-text-mid border-border hover:border-brand-terracotta hover:text-brand-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 max-[991px]:grid-cols-2 gap-7 max-[991px]:gap-5 max-[560px]:gap-3.5 max-[380px]:grid-cols-1 max-[380px]:max-w-[300px] max-[380px]:mx-auto mb-14 max-[560px]:mb-9 relative z-[2]">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} isWakad={isWakad} />
          ))}
        </div>

        {/* CTA block */}
        <div className="text-center px-8 max-[560px]:px-5 py-11 max-[560px]:py-[30px] bg-white border-[1.5px] border-border rounded-[28px] max-[560px]:rounded-[20px] flex flex-col items-center gap-[22px] max-[560px]:gap-4 relative z-[2] shadow-[0_4px_12px_rgba(61,64,91,0.05)]">
          <p className="font-[family-name:var(--font-serif)] italic text-[1.15rem] max-[560px]:text-[0.95rem] text-brand-navy font-medium max-w-[480px] leading-[1.65] max-[560px]:leading-[1.5]">
            Want to see more styles? Browse our full collections catalog online.
          </p>
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
