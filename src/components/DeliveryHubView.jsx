import { Truck, MapPin, Clock, CreditCard, RotateCcw, MessageSquare, ShieldCheck, Star } from 'lucide-react'
import { AREAS_DATA } from '../data/products'
import { trackWhatsAppClick } from '../utils/analytics'

export default function DeliveryHubView({ onViewChange }) {
  const handleWhatsApp = () => {
    trackWhatsAppClick('DeliveryHubHero', null, 'https://kidscity.online/kids-clothes-delivery-pune')
    const phone = '917891672762'
    const text = 'Hi Kids City! I want to check kids clothing delivery to my area in Pune. Can you share delivery time and options?'
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const AREA_ZONES = [
    {
      title: 'Zone 1: Express Local Zone (30–60 Minutes)',
      desc: 'Same-day instant courier dispatch via local express partners (Dunzo/Porter/Borzo) or store delivery.',
      areas: ['Wakad (411057)', 'Hinjewadi Phase 1, 2, 3 (411057)', 'Baner (411045)', 'Balewadi (411045)', 'Pimple Saudagar (411027)', 'Tathawade (411033)', 'Rahatani (411017)'],
      charges: 'FREE in Wakad or on orders above ₹999 (Flat ₹50 for small orders)',
    },
    {
      title: 'Zone 2: PCMC & Western Pune (Same-Day / 24 Hours)',
      desc: 'Same-day dispatch for all orders placed before 4:00 PM.',
      areas: ['Aundh (411007)', 'Ravet (412101)', 'Pimple Nilakh (411027)', 'Pimpri (411018)', 'Chinchwad (411019)', 'Nigdi (411044)', 'Punawale (411033)', 'Pashan (411008)', 'Bavdhan (411021)'],
      charges: 'FREE on orders above ₹999 (Flat ₹60 for orders under ₹999)',
    },
    {
      title: 'Zone 3: Central, Eastern & Southern Pune (24–48 Hours)',
      desc: 'Dispatched via trusted local courier partners with live tracking.',
      areas: ['Kothrud (411038)', 'Shivajinagar (411005)', 'Viman Nagar (411014)', 'Kharadi (411014)', 'Kalyani Nagar (411006)', 'Hadapsar & Magarpatta (411028)', 'Camp (411001)', 'Wanowrie (411040)', 'Bibwewadi (411037)'],
      charges: 'FREE on orders above ₹999 (Flat ₹70 for orders under ₹999)',
    },
  ]

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
              Kids Clothes Delivery in Pune
            </li>
          </ol>
        </nav>

        {/* Hero Banner */}
        <header className="bg-gradient-to-br from-[#faf8f5] to-white border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="max-w-[840px]">
            {/* Trust Bar */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[0.8rem] font-bold text-brand-navy mb-4 shadow-2xs">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span>4.9 on Google (141 reviews) | Since 2018 | Delivery in Pune</span>
            </div>

            <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
              Kids Clothes Home Delivery in Pune — Same-Day &amp; COD
            </h1>

            <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
              Get premium children clothing delivered straight to your doorstep anywhere across Pune and Pimpri-Chinchwad. From 100% skin-safe cotton night suits to festive lehengas and birthday dresses, shop effortlessly with WhatsApp order support, Cash on Delivery, and hassle-free 7-day size exchanges.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
              >
                <MessageSquare size={18} />
                Order for Delivery on WhatsApp (+91 78916 72762)
              </button>
              <a
                href="tel:+917891672762"
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline"
              >
                Call Delivery Desk
              </a>
            </div>
          </div>
        </header>

        {/* Core Value Props */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Clock size={24} />
            </div>
            <h3 className="font-bold text-[1.05rem] text-brand-navy mb-2">Same-Day Express</h3>
            <p className="text-[0.85rem] text-text-muted leading-[1.6]">
              Express 30–60 min courier dispatch across Wakad, Hinjewadi, Baner, and nearby PCMC localities.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <CreditCard size={24} />
            </div>
            <h3 className="font-bold text-[1.05rem] text-brand-navy mb-2">Cash on Delivery &amp; UPI</h3>
            <p className="text-[0.85rem] text-text-muted leading-[1.6]">
              Pay conveniently with Cash on Delivery (COD) or instant GPay/PhonePe upon receiving your parcel.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <RotateCcw size={24} />
            </div>
            <h3 className="font-bold text-[1.05rem] text-brand-navy mb-2">7-Day Size Exchange</h3>
            <p className="text-[0.85rem] text-text-muted leading-[1.6]">
              If the fit is not 100% right, we coordinate an easy size exchange at your doorstep or in-store.
            </p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-[1.05rem] text-brand-navy mb-2">Video Verification</h3>
            <p className="text-[0.85rem] text-text-muted leading-[1.6]">
              Ask our staff on WhatsApp for live video clips of fabric, stitching, and exact measuring tape checks before dispatch.
            </p>
          </div>
        </section>

        {/* Pune Delivery Zones Table / Cards */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <span className="text-[0.75rem] font-bold text-brand-terracotta uppercase tracking-wider">Coverage Map</span>
            <h2 className="font-[family-name:var(--font-head)] text-[1.6rem] font-extrabold text-brand-navy">
              Pune Delivery Coverage, Charges &amp; Timelines
            </h2>
          </div>

          <div className="space-y-6">
            {AREA_ZONES.map((zone, idx) => (
              <div key={idx} className="bg-white border border-border rounded-2xl p-6 md:p-8 shadow-2xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
                  <div>
                    <h3 className="font-[family-name:var(--font-head)] text-[1.15rem] font-bold text-brand-navy">
                      {zone.title}
                    </h3>
                    <p className="text-[0.88rem] text-text-muted mt-0.5">{zone.desc}</p>
                  </div>
                  <span className="bg-[#faf8f5] px-4 py-2 rounded-full border border-border text-[0.85rem] font-bold text-brand-terracotta shrink-0">
                    {zone.charges}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {zone.areas.map((loc, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f8f9fa] border border-border/80 text-[0.8rem] text-brand-navy font-semibold"
                    >
                      <MapPin size={12} className="text-brand-terracotta" />
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dedicated Area Pages Directory */}
        <section className="bg-[#faf8f5] border border-border rounded-3xl p-8 md:p-10 mb-16">
          <div className="text-center mb-8">
            <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy">
              Explore Dedicated Pune Locality Pages
            </h2>
            <p className="text-[0.88rem] text-text-muted max-w-[550px] mx-auto mt-1">
              Select your neighborhood for local landmarks, travel tips, and express delivery details
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(AREAS_DATA).map(([slug, area]) => (
              <a
                key={slug}
                href={`/${area.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  onViewChange(area.slug)
                }}
                className="bg-white p-3.5 rounded-xl border border-border text-center hover:border-brand-terracotta hover:shadow-sm transition-all group no-underline"
              >
                <strong className="block text-[0.92rem] text-brand-navy group-hover:text-brand-terracotta">
                  Kids Clothes in {area.areaName}
                </strong>
                <span className="text-[0.75rem] text-text-muted mt-1 block">View Area Page →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Ordering Flow Instructions */}
        <section className="bg-white border border-border rounded-3xl p-8 md:p-10 mb-16 shadow-2xs">
          <h2 className="font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy mb-6 text-center">
            How Doorstep Ordering Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <strong className="block text-[0.95rem] text-brand-navy mb-1">Browse Catalog</strong>
              <p className="text-[0.82rem] text-text-muted">
                Explore our website collections or tell us your required style and age group.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <strong className="block text-[0.95rem] text-brand-navy mb-1">WhatsApp Sizing Check</strong>
              <p className="text-[0.82rem] text-text-muted">
                Click &quot;Order on WhatsApp&quot; or message +91 78916 72762. We confirm stock and size.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <strong className="block text-[0.95rem] text-brand-navy mb-1">Express Dispatch</strong>
              <p className="text-[0.82rem] text-text-muted">
                Your parcel is packed safely from our Wakad boutique and dispatched via local courier.
              </p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-black text-sm flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <strong className="block text-[0.95rem] text-brand-navy mb-1">Doorstep Payment &amp; Fit</strong>
              <p className="text-[0.82rem] text-text-muted">
                Pay via COD or UPI. Enjoy 7-day size exchange guarantee if adjustments are needed.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 md:p-12 text-center max-w-[800px] mx-auto">
          <h3 className="font-[family-name:var(--font-head)] text-[1.6rem] font-extrabold mb-3">
            Ready to Order Kids Clothes in Pune?
          </h3>
          <p className="text-[0.95rem] text-white/80 max-w-[500px] mx-auto mb-6">
            WhatsApp our Wakad store team directly. We are active daily from 10:00 AM to 9:30 PM.
          </p>
          <button
            onClick={handleWhatsApp}
            className="bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold text-[0.95rem] inline-flex items-center gap-2 hover:brightness-105 transition-all shadow-md min-h-[48px]"
          >
            <MessageSquare size={18} />
            Message Us on WhatsApp (+91 78916 72762)
          </button>
        </div>
      </div>
    </div>
  )
}
