import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageSquare, ArrowRight, ShieldCheck, Star, Truck, RotateCcw } from 'lucide-react'
import { CATEGORIES_DATA, PRODUCTS } from '../data/products'
import { trackWhatsAppClick } from '../utils/analytics'

export default function CategoryView({ categorySlug, onViewChange, onSelectProduct }) {
  const category = CATEGORIES_DATA[categorySlug] || CATEGORIES_DATA['girls-party-wear-pune']
  const [openFaq, setOpenFaq] = useState(null)

  // Find matching products
  const matchingProducts = PRODUCTS.filter(
    (p) => p.categorySlug === category.slug || p.category === category.filterCategory
  )

  const handleWhatsAppCategory = () => {
    trackWhatsAppClick('CategoryHeroCTA', null, `https://kidscity.online/${category.slug}`)
    const phone = '917891672762'
    const text = `Hi Kids City! I am looking for ${category.h1}. Can you share latest designs and available sizes for Pune delivery?`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleProductWhatsApp = (e, product) => {
    e.stopPropagation()
    trackWhatsAppClick('CategoryProductCard', product, `https://kidscity.online/product/${product.slug || product.id}`)
    const phone = '917891672762'
    const url = `https://kidscity.online/product/${product.slug || product.id}`
    const text = `Hi Kids City! I want to order "${product.name}" (${product.price}) from ${url}. Is it available for delivery in Pune?`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="bg-white min-h-screen pt-[90px] pb-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 py-2 border-b border-border/70">
          <ol className="flex items-center gap-2 text-[0.82rem] text-text-muted list-none m-0 p-0 flex-wrap">
            <li>
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); onViewChange('home') }}
                className="hover:text-brand-terracotta transition-colors"
              >
                Home
              </a>
            </li>
            <li>&gt;</li>
            <li>
              <a
                href="/collections"
                onClick={(e) => { e.preventDefault(); onViewChange('shop') }}
                className="hover:text-brand-terracotta transition-colors"
              >
                Collections
              </a>
            </li>
            <li>&gt;</li>
            <li className="text-brand-navy font-bold" aria-current="page">
              {category.title.split('|')[0].trim()}
            </li>
          </ol>
        </nav>

        {/* Header Hero */}
        <header className="bg-gradient-to-br from-[#faf8f5] to-white border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="max-w-[840px]">
            {/* Trust Bar */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[0.8rem] font-bold text-brand-navy mb-4 shadow-2xs">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span>4.9 on Google (141 reviews) | Since 2018 | Delivery in Pune</span>
            </div>

            <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
              {category.h1}
            </h1>

            <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
              {category.intro}
            </p>

            {/* Highlights pill grid */}
            <div className="flex flex-wrap items-center gap-4 text-[0.85rem] font-semibold text-brand-navy mb-8">
              <span className="bg-white px-3.5 py-1.5 rounded-full border border-border">
                Price: <strong className="text-brand-terracotta">{category.priceRange}</strong>
              </span>
              <a
                href="/kids-clothing-size-guide"
                onClick={(e) => { e.preventDefault(); onViewChange('kids-clothing-size-guide') }}
                className="bg-white px-3.5 py-1.5 rounded-full border border-border hover:border-brand-terracotta text-brand-terracotta underline"
              >
                View Kids Size Chart (0-14y)
              </a>
              <span className="bg-white px-3.5 py-1.5 rounded-full border border-border flex items-center gap-1.5">
                <Truck size={14} className="text-emerald-600" />
                Same-Day Delivery in Wakad &amp; PCMC
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsAppCategory}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
              >
                <MessageSquare size={18} />
                WhatsApp Us for Designs &amp; Sizing
              </button>
              <a
                href="tel:+917891672762"
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline"
              >
                Call Boutique (+91 78916 72762)
              </a>
            </div>
          </div>
        </header>

        {/* Product Grid */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8 pb-3 border-b border-border">
            <div>
              <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy">
                Featured {category.h1.split(' in ')[0]}
              </h2>
              <p className="text-[0.85rem] text-text-muted mt-0.5">
                Showing authentic boutique pieces available for in-store pickup &amp; Pune home delivery
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {matchingProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group bg-white rounded-2xl border border-border p-3 flex flex-col hover:shadow-lg hover:border-brand-terracotta transition-all cursor-pointer"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f9f9f9] mb-3">
                  <img
                    src={p.img}
                    alt={`${p.name} — ${category.h1}`}
                    width="300"
                    height="300"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {p.tag && (
                    <span
                      className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white uppercase"
                      style={{ background: p.tagColor || '#E07A5F' }}
                    >
                      {p.tag}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-[0.92rem] text-brand-navy mb-1 line-clamp-2 leading-[1.3]">
                  {p.name}
                </h3>
                <p className="text-[0.75rem] text-text-muted mb-2">Sizes: {p.sizes.join(', ')}</p>
                <div className="mt-auto pt-2 flex items-center justify-between border-t border-border/60">
                  <span className="font-extrabold text-[1.1rem] text-brand-terracotta">{p.price}</span>
                  <button
                    onClick={(e) => handleProductWhatsApp(e, p)}
                    className="px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[0.72rem] font-bold hover:bg-[#1ebe5b] transition-colors"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Parent Guide / Content (400-800 words) */}
        <section className="bg-white border border-border rounded-3xl p-8 md:p-10 mb-16 shadow-2xs">
          <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy mb-4">
            How to Choose {category.h1.split(' in ')[0]} in Pune
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-[0.95rem] text-text-mid leading-[1.75]">
            <p>
              When shopping for children outfits in Pune weather, comfort and breathability come first. Pune temperate climate means kids need fabrics that look regal for celebratory events yet feel soft, breathable, and gentle against active skin. At Kids City Wakad, every collection is tailored with child-safe linings, non-scratchy seams, and flexible fits so your little one can dance, play, and celebrate without irritation.
            </p>
            <p>
              Whether you are preparing for a grand 1st birthday at a Pune banquet hall, a family wedding in Baner or Kothrud, or school celebrations in Hinjewadi, our store stocks handpicked pieces ranging from {category.priceRange}. Each design is selected for durable stitching, colorfast dyes, and ease of maintenance.
            </p>
            <p>
              Not sure about sizing? Children grow fast, and Indian festive cuts vary. We provide a comprehensive <a href="/kids-clothing-size-guide" onClick={(e) => { e.preventDefault(); onViewChange('kids-clothing-size-guide') }} className="text-brand-terracotta underline font-semibold">Indian Kids Size Chart</a> and offer personalized WhatsApp sizing assistance. Share your child age and height, and our Wakad store staff will send live photos, measurement tape readings, and video clips so you get the exact fit on your doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-terracotta shrink-0" size={24} />
              <div className="text-[0.85rem]">
                <strong className="block text-brand-navy">100% Skin-Safe Lining</strong>
                <span className="text-text-muted">Zero scratching or synthetic irritation</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="text-brand-terracotta shrink-0" size={24} />
              <div className="text-[0.85rem]">
                <strong className="block text-brand-navy">Pune Express Delivery</strong>
                <span className="text-text-muted">Same-day across Wakad &amp; PCMC</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="text-brand-terracotta shrink-0" size={24} />
              <div className="text-[0.85rem]">
                <strong className="block text-brand-navy">7-Day Size Exchange</strong>
                <span className="text-text-muted">Hassle-free size replacement</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="max-w-[800px] mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="text-[0.75rem] font-bold text-brand-terracotta uppercase tracking-wider">Parent Queries</span>
            <h2 className="font-[family-name:var(--font-head)] text-[1.5rem] font-extrabold text-brand-navy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {category.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-border rounded-xl bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-4 text-left font-bold text-[0.95rem] text-brand-navy hover:text-brand-terracotta"
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 shrink-0 ml-3 ${
                      openFaq === idx ? 'rotate-180 text-brand-terracotta' : 'text-text-muted'
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 text-[0.9rem] text-text-mid leading-[1.6] border-t border-border/50 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 md:p-12 text-center max-w-[800px] mx-auto">
          <h3 className="font-[family-name:var(--font-head)] text-[1.6rem] font-extrabold mb-3">
            Visit Kids City Wakad or Order on WhatsApp
          </h3>
          <p className="text-[0.95rem] text-white/80 max-w-[500px] mx-auto mb-6">
            Open every day 10:00 AM – 9:30 PM at Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune. Same-day delivery across Pune.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleWhatsAppCategory}
              className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-[0.9rem] flex items-center gap-2 hover:brightness-105 min-h-[48px]"
            >
              <MessageSquare size={17} />
              Chat on WhatsApp (+91 78916 72762)
            </button>
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold text-[0.9rem] flex items-center gap-2 min-h-[48px] no-underline"
            >
              Get Store Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
