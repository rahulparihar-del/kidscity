import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageSquare, MapPin, Navigation, Clock, Truck, Star, Phone } from 'lucide-react'
import { AREAS_DATA, PRODUCTS } from '../data/products'
import { trackWhatsAppClick, trackDirectionsClick, trackCallClick } from '../utils/analytics'

export default function AreaView({ areaSlug, onViewChange, onSelectProduct }) {
  const area = AREAS_DATA[areaSlug] || AREAS_DATA['kids-clothes-wakad']
  const [openFaq, setOpenFaq] = useState(null)

  const handleWhatsApp = () => {
    trackWhatsAppClick('AreaHeroCTA', null, `https://kidscity.online/${area.slug}`)
    const phone = '917891672762'
    const text = `Hi Kids City! I am looking for kids clothes delivery to ${area.areaName}, Pune. Can you share available designs and sizing?`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleProductWhatsApp = (e, product) => {
    e.stopPropagation()
    trackWhatsAppClick('AreaProductCard', product, `https://kidscity.online/product/${product.slug || product.id}`)
    const phone = '917891672762'
    const url = `https://kidscity.online/product/${product.slug || product.id}`
    const text = `Hi Kids City! I live in ${area.areaName}, Pune and want to order "${product.name}" (${product.price}): ${url}. Can you deliver today?`
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
                href="/kids-clothes-delivery-pune"
                onClick={(e) => { e.preventDefault(); onViewChange('kids-clothes-delivery-pune') }}
                className="hover:text-brand-terracotta transition-colors"
              >
                Pune Delivery Areas
              </a>
            </li>
            <li>&gt;</li>
            <li className="text-brand-navy font-bold" aria-current="page">
              {area.areaName}
            </li>
          </ol>
        </nav>

        {/* Local Area Header */}
        <header className="bg-gradient-to-br from-[#faf8f5] to-white border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="max-w-[840px]">
            {/* Trust Bar */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[0.8rem] font-bold text-brand-navy mb-4 shadow-2xs">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span>4.9 on Google (141 reviews) | Since 2018 | Delivery in Pune</span>
            </div>

            <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
              {area.h1}
            </h1>

            <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
              Shop premium kids clothing in {area.areaName}, Pune. From skin-safe 100% cotton night suits to birthday party gowns and festive ethnic wear, Kids City provides fast doorstep delivery and in-store boutique shopping at nearby Wakad.
            </p>

            {/* Local delivery & location info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-[0.88rem]">
              <div className="bg-white p-4 rounded-xl border border-border flex items-start gap-3">
                <Truck className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <strong className="block text-brand-navy">Delivery Timeline to {area.areaName}:</strong>
                  <span className="text-text-mid">{area.deliveryTime}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-border flex items-start gap-3">
                <MapPin className="text-brand-terracotta shrink-0 mt-0.5" size={20} />
                <div>
                  <strong className="block text-brand-navy">Store Proximity &amp; Landmarks:</strong>
                  <span className="text-text-mid">{area.landmarks}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
              >
                <MessageSquare size={18} />
                Order for {area.areaName} Delivery on WhatsApp
              </button>
              <a
                href="https://www.google.com/maps/dir//Kids+City+Wakad"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDirectionsClick(`AreaPage-${area.areaName}`)}
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline"
              >
                <Navigation size={18} />
                Visit Wakad Store (Directions)
              </a>
            </div>
          </div>
        </header>

        {/* Popular items for this neighborhood */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8 pb-3 border-b border-border">
            <div>
              <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy">
                Trending Kids Clothes for {area.areaName} Families
              </h2>
              <p className="text-[0.85rem] text-text-muted mt-0.5">
                Popular selections: {area.popularItems}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.slice(0, 8).map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group bg-white rounded-2xl border border-border p-3 flex flex-col hover:shadow-lg hover:border-brand-terracotta transition-all cursor-pointer"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f9f9f9] mb-3">
                  <img
                    src={p.img}
                    alt={`${p.name} — Kids City ${area.areaName}`}
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

        {/* Local Community Information & Travel Tips */}
        <section className="bg-white border border-border rounded-3xl p-8 md:p-10 mb-16 shadow-2xs">
          <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy mb-4">
            Shopping Kids Clothes from {area.areaName}: Store Visit &amp; Home Delivery
          </h2>
          <div className="space-y-4 font-[family-name:var(--font-body)] text-[0.95rem] text-text-mid leading-[1.75]">
            <p>
              For families residing in {area.areaName}, finding high-quality children clothing with skin-safe fabrics and reasonable pricing is now simple. Kids City boutique is conveniently located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad—just a short commute from {area.areaName}.
            </p>
            <p>
              <strong>Travel Tips:</strong> {area.travelTip} We are open 7 days a week, Monday through Sunday, from 10:00 AM to 9:30 PM, making it easy for working parents to visit on weekday evenings or relaxed weekends.
            </p>
            <p>
              <strong>Doorstep Delivery &amp; WhatsApp Sizing:</strong> Prefer ordering from home? We dispatch orders daily to {area.areaName}. You can browse our collection, WhatsApp us at +91 78916 72762 for exact fabric videos or size recommendations, and receive your parcel with Cash on Delivery (COD) or UPI payment options.
            </p>
          </div>
        </section>

        {/* Local Area FAQs */}
        <section className="max-w-[800px] mx-auto mb-16">
          <div className="text-center mb-8">
            <span className="text-[0.75rem] font-bold text-brand-terracotta uppercase tracking-wider">Local Guide</span>
            <h2 className="font-[family-name:var(--font-head)] text-[1.5rem] font-extrabold text-brand-navy">
              Frequently Asked Questions for {area.areaName} Parents
            </h2>
          </div>

          <div className="space-y-3">
            {area.faqs.map((faq, idx) => (
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
            Serving Families in {area.areaName} &amp; All of Pune
          </h3>
          <p className="text-[0.95rem] text-white/80 max-w-[500px] mx-auto mb-6">
            Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057. Open 10:00 AM – 9:30 PM every day.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-[0.9rem] flex items-center gap-2 hover:brightness-105 min-h-[48px]"
            >
              <MessageSquare size={17} />
              WhatsApp Us (+91 78916 72762)
            </button>
            <a
              href="tel:+917891672762"
              onClick={() => trackCallClick(`AreaPage-${area.areaName}`)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold text-[0.9rem] flex items-center gap-2 min-h-[48px] no-underline"
            >
              <Phone size={17} />
              Call Store
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
