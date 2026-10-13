import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, ArrowUpDown, Star, Heart, X, MessageSquare, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCTS } from '../data/products'
import { storeConfig } from '../config/storeConfig'

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
    }, 3500)

    return () => clearInterval(timer)
  }, [images])

  if (images.length === 0 || !images[0]) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#fafaf6] text-text-muted text-[0.82rem] font-semibold">
        <span>No Image</span>
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

  const SIZES = ['All', '0-6m', '6-12m', '12-18m', '0-2y', '2-4y', '4-6y', '6-8y', '8-10y', '10-12y', '12-14y']

  const filteredProducts = useMemo(() => {
    return catalogSource.filter(p => {
      const matchesSearch = search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.desc && p.desc.toLowerCase().includes(search.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(search.toLowerCase()))

      const matchesCat = selectedCat === 'All' || p.category === selectedCat
      const matchesSize = selectedSize === 'All' || (p.sizes && p.sizes.includes(selectedSize))
      const matchesPrice = !p.priceVal || (p.priceVal >= selectedPrice.min && p.priceVal <= selectedPrice.max)

      return matchesSearch && matchesCat && matchesSize && matchesPrice
    }).sort((a, b) => {
      if (sortBy === 'price-low') return (a.priceVal || 0) - (b.priceVal || 0)
      if (sortBy === 'price-high') return (b.priceVal || 0) - (a.priceVal || 0)
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      return (b.id || 0) - (a.id || 0)
    })
  }, [catalogSource, search, selectedCat, selectedSize, selectedPrice, sortBy])

  const toggleWishlist = (id, e) => {
    e.stopPropagation()
    setWishlisted(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleInquire = (e, product) => {
    e.stopPropagation()
    const phone = storeConfig.whatsappRaw
    const productUrl = `https://kidscity.online/product/${product.slug || product.id}`
    const text = `Hi Kids City! I want to order "${product.name}" (${product.price}): ${productUrl}. Is this available for delivery in Pune?`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-[100px] pb-24">
      <div className="container">
        {/* Header */}
        <header className="mb-10 text-center max-w-[700px] mx-auto">
          <span className="font-[family-name:var(--font-kids)] text-[0.75rem] font-bold tracking-[2px] uppercase text-brand-terracotta inline-block mb-2">
            Kids City Catalog
          </span>
          <h1 className="font-[family-name:var(--font-head)] text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-brand-navy leading-tight mb-3">
            Kids Clothing Collections in Pune
          </h1>
          <p className="font-[family-name:var(--font-body)] text-text-mid text-[0.98rem] leading-relaxed">
            Festive wear, birthday dresses &amp; cotton sleepwear from our Wakad boutique. Order on WhatsApp or visit our store.
          </p>
        </header>

        {/* Empty Catalog Notice */}
        {catalogSource.length === 0 ? (
          <div className="bg-white border border-border rounded-3xl p-8 md:p-14 text-center max-w-[720px] mx-auto shadow-xs">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <MessageSquare size={28} className="text-amber-700" />
            </div>
            <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-bold text-brand-navy mb-3">
              Catalog Update in Progress
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[0.95rem] text-text-mid leading-[1.7] mb-6">
              In accordance with our strict factual policy, we only publish items with verified in-store stock, sizes, and pricing. To view our full collection of 500+ designs, visit our Wakad store or message us on WhatsApp for live photo selection.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${storeConfig.whatsappRaw}?text=${encodeURIComponent('Hi Kids City! Please share current catalog photos and designs for my child.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
              >
                <MessageSquare size={18} />
                Message Store on WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/dir//Kids+City+Wakad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline"
              >
                <MapPin size={18} />
                Visit Store in Wakad
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter sidebar */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-border">
                <h3 className="font-bold text-brand-navy mb-4">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg text-[0.88rem] ${
                        selectedCat === cat
                          ? 'bg-brand-terracotta text-white font-bold'
                          : 'text-text-mid hover:bg-black/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products grid */}
            <main className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="bg-white rounded-2xl border border-border p-4 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col"
                  >
                    <div className="aspect-square bg-[#FAF8F5] rounded-xl overflow-hidden mb-3 relative">
                      <AutoScrollingImage
                        img={p.img}
                        gallery={p.photos}
                        alt={p.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[0.72rem] font-bold text-brand-terracotta uppercase">{p.category}</span>
                    <h3 className="font-bold text-brand-navy text-[1rem] mb-1">{p.name}</h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/60">
                      <span className="font-bold text-brand-navy">{p.price}</span>
                      <button
                        onClick={(e) => handleInquire(e, p)}
                        className="bg-[#25D366] text-white text-[0.78rem] font-bold px-3 py-1.5 rounded-full"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  )
}
