import { Star, MessageSquare, MapPin, ThumbsUp, ExternalLink } from 'lucide-react'
import { trackWhatsAppClick } from '../utils/analytics'
import { storeConfig } from '../config/storeConfig'

export default function ReviewsView({ onViewChange }) {
  const reviews = storeConfig.realReviews || []

  const handleWhatsApp = () => {
    trackWhatsAppClick('ReviewsHero', null, 'https://kidscity.online/reviews')
    const phone = storeConfig.whatsappRaw
    const text = 'Hi Kids City! I saw your 4.9 rating on Google and want to browse your latest collections.'
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
            <li className="text-brand-navy font-bold" aria-current="page">
              Customer Reviews
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="bg-gradient-to-br from-[#faf8f5] to-white border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-[0.85rem] font-bold text-brand-navy mb-4 shadow-2xs">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span>{storeConfig.rating.displayNotice}</span>
          </div>

          <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
            Customer Reviews & Ratings
          </h1>

          <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
            Kids City is proud of our <strong>4.9★ rating from 141+ parents</strong> on Google. We strictly showcase genuine feedback from real customers.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline shadow-sm"
            >
              <ExternalLink size={18} />
              Read All 141 Reviews on Google Maps
            </a>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
            >
              <MessageSquare size={18} />
              WhatsApp Us ({storeConfig.phone})
            </button>
          </div>
        </header>

        {/* Reviews Content */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-white border border-border rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    {rev.relativeTime && (
                      <span className="text-[0.75rem] text-text-muted">{rev.relativeTime}</span>
                    )}
                  </div>
                  <p className="text-[0.92rem] text-text-mid leading-[1.65] mb-4 italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[0.82rem]">
                  <div>
                    <strong className="block text-brand-navy font-bold">{rev.author}</strong>
                    {rev.location && (
                      <span className="text-text-muted flex items-center gap-1">
                        <MapPin size={11} className="text-brand-terracotta" />
                        {rev.location}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[0.72rem] font-semibold">
                    <ThumbsUp size={11} /> Google Review
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#FAF8F5] border border-border rounded-2xl p-8 md:p-12 text-center max-w-[700px] mx-auto mb-16">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-border shadow-2xs">
              <Star size={30} className="text-amber-500 fill-amber-500" />
            </div>
            <h2 className="text-[1.35rem] font-bold text-brand-navy mb-3">
              100% Genuine Reviews Direct From Google Maps
            </h2>
            <p className="text-[0.95rem] text-text-mid leading-[1.7] mb-6">
              In accordance with our zero-hallucination policy, we do not write synthetic or promotional testimonials. To verify our 4.9★ rating and read unfiltered experiences from parents across Pune and PCMC, visit our official Google Business Profile.
            </p>
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-terracotta/90 transition-all min-h-[48px] no-underline shadow-sm"
            >
              Open Google Reviews (141 Ratings) &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
