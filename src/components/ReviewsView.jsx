import { Star, MessageSquare, MapPin, ThumbsUp } from 'lucide-react'
import { trackWhatsAppClick } from '../utils/analytics'

const REVIEWS = [
  {
    name: 'Pooja Kulkarni',
    location: 'Wakad, Pune',
    rating: 5,
    date: 'August 2026',
    text: 'Best kids clothes shop in Wakad! Bought a Navratri Chaniya Choli for my 4-year-old daughter. The fabric quality is superb with soft cotton lining, so she had zero itching. The staff was polite and helped with sizing.',
  },
  {
    name: 'Amitabh Sen',
    location: 'Hinjewadi Phase 1, Pune',
    rating: 5,
    date: 'September 2026',
    text: 'Working in Hinjewadi IT park, I rarely get time for shopping. Contacted Kids City via WhatsApp, they shared photos of boys kurta pajamas, and delivered within 40 minutes to our society. Excellent fabric and fit!',
  },
  {
    name: 'Sneha Deshmukh',
    location: 'Baner, Pune',
    rating: 5,
    date: 'July 2026',
    text: 'Purchased a 1st birthday princess gown for my baby girl. The layered tulle and headband looked magical in the birthday photos. Highly recommend Kids City for birthday dresses in Pune.',
  },
  {
    name: 'Rohan Patil',
    location: 'Pimple Saudagar, Pune',
    rating: 5,
    date: 'September 2026',
    text: 'Their 100% combed cotton night suits are fantastic. We bought 3 sets for our son. After multiple washes, the colors are intact and fabric is super soft. Honest pricing and great customer care.',
  },
  {
    name: 'Meera Iyer',
    location: 'Aundh, Pune',
    rating: 5,
    date: 'August 2026',
    text: 'Visited the Wakad boutique in Mahalaxmi Complex. Clean, well-organized store with 500+ designs. Exchanged a size without any fuss within 7 days. Very parent-friendly shop.',
  },
  {
    name: 'Vikas Joshi',
    location: 'Balewadi, Pune',
    rating: 5,
    date: 'June 2026',
    text: 'Kids City is our go-to shop since 2020. From newborn baby gift sets to festival wear for Diwali, their clothing quality has remained consistently superior.',
  },
]

export default function ReviewsView({ onViewChange }) {
  const handleWhatsApp = () => {
    trackWhatsAppClick('ReviewsHero', null, 'https://kidscity.online/reviews')
    const phone = '917891672762'
    const text = 'Hi Kids City! I read your customer reviews and want to browse your latest collections.'
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
            <span>4.9 on Google (141 reviews) | Since 2018 | Wakad, Pune</span>
          </div>

          <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
            Real Customer Reviews from Pune Families
          </h1>

          <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
            Hear directly from Pune parents who trust Kids City for skin-safe fabrics, durable everyday playwear, and dazzling festive dresses.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
            >
              <MessageSquare size={18} />
              Chat on WhatsApp (+91 78916 72762)
            </button>
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline"
            >
              View Google Business Profile
            </a>
          </div>
        </header>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {REVIEWS.map((rev, idx) => (
            <div key={idx} className="bg-white border border-border rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[0.75rem] text-text-muted">{rev.date}</span>
                </div>
                <p className="text-[0.92rem] text-text-mid leading-[1.65] mb-4 italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[0.82rem]">
                <div>
                  <strong className="block text-brand-navy font-bold">{rev.name}</strong>
                  <span className="text-text-muted flex items-center gap-1">
                    <MapPin size={11} className="text-brand-terracotta" />
                    {rev.location}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[0.72rem] font-semibold">
                  <ThumbsUp size={11} /> Verified Parent
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
