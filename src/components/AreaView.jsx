import { useState } from 'react'
import { ChevronDown, MessageSquare, MapPin, Navigation, Truck, Star, Phone, AlertCircle } from 'lucide-react'
import { AREAS_DATA } from '../data/products'
import { storeConfig } from '../config/storeConfig'
import { trackWhatsAppClick, trackDirectionsClick, trackCallClick } from '../utils/analytics'

export default function AreaView({ areaSlug, onViewChange }) {
  const area = AREAS_DATA[areaSlug] || AREAS_DATA['kids-clothes-wakad']
  const [openFaq, setOpenFaq] = useState(null)

  const handleWhatsApp = () => {
    trackWhatsAppClick('AreaHeroCTA', null, `https://kidscity.online/${area.slug}`)
    const phone = storeConfig.whatsappRaw
    const text = `Hi Kids City! I am looking for kids clothes delivery or store info for ${area.areaName}, Pune. Can you assist?`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const isConfirmed = area.confirmed !== false

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
              <span>{storeConfig.rating.displayNotice}</span>
            </div>

            {/* Unconfirmed Area Notice */}
            {!isConfirmed && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-4 flex items-center gap-2 text-amber-900 text-[0.85rem]">
                <AlertCircle size={18} className="text-amber-600 shrink-0" />
                <span>
                  <strong>Delivery Pending Confirmation:</strong> Direct home delivery to {area.areaName} is currently unconfirmed. Please message on WhatsApp to check service availability for your pincode.
                </span>
              </div>
            )}

            <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
              {area.h1}
            </h1>

            <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
              {area.introText}
            </p>

            {/* Local info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-[0.88rem]">
              <div className="bg-white p-4 rounded-xl border border-border flex items-start gap-3">
                <Truck className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                <div>
                  <strong className="block text-brand-navy">Service Status</strong>
                  <span className="text-text-mid">{area.deliveryStatusText}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-border flex items-start gap-3">
                <MapPin className="text-brand-terracotta shrink-0 mt-0.5" size={20} />
                <div>
                  <strong className="block text-brand-navy">Location Reference</strong>
                  <span className="text-text-mid">{area.landmarks}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
              >
                <MessageSquare size={18} />
                Inquire on WhatsApp ({storeConfig.phone})
              </button>
              <a
                href={storeConfig.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDirectionsClick(`AreaPage_${area.areaName}`)}
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline"
              >
                <Navigation size={18} />
                Get Directions to Wakad Store
              </a>
            </div>
          </div>
        </header>

        {/* Local Area Content Details */}
        <section className="mb-14">
          <div className="bg-white border border-border rounded-2xl p-8 mb-8">
            <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-bold text-brand-navy mb-4">
              Shopping for Kids Clothes in {area.areaName}
            </h2>
            <div className="text-[0.95rem] text-text-mid leading-[1.8] space-y-4">
              <p>{area.detailsParagraph1}</p>
              <p>{area.detailsParagraph2}</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        {area.faqs && area.faqs.length > 0 && (
          <section className="mb-14">
            <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-bold text-brand-navy mb-6">
              Frequently Asked Questions — {area.areaName}
            </h2>
            <div className="space-y-3">
              {area.faqs.map((faq, idx) => (
                <div key={idx} className="border border-border rounded-xl bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-bold text-brand-navy text-[0.95rem] gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-brand-terracotta shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-[0.9rem] text-text-mid leading-[1.65] border-t border-border/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
