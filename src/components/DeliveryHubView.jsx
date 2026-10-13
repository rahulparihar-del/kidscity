import { Truck, MapPin, Clock, RotateCcw, MessageSquare, Star, AlertCircle, Phone } from 'lucide-react'
import { storeConfig } from '../config/storeConfig'
import { trackWhatsAppClick } from '../utils/analytics'

export default function DeliveryHubView({ onViewChange }) {
  const handleWhatsApp = () => {
    trackWhatsAppClick('DeliveryHubHero', null, 'https://kidscity.online/kids-clothes-delivery-pune')
    const phone = storeConfig.whatsappRaw
    const text = 'Hi Kids City! I want to check delivery options and charges for my area in Pune. My pincode/area is: '
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
              Pune Delivery Hub
            </li>
          </ol>
        </nav>

        {/* Hero Banner */}
        <header className="bg-gradient-to-br from-[#faf8f5] to-white border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="max-w-[840px]">
            {/* Trust Bar */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border text-[0.8rem] font-bold text-brand-navy mb-4 shadow-2xs">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span>{storeConfig.rating.displayNotice}</span>
            </div>

            <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
              Kids Clothes Home Delivery in Pune &amp; PCMC
            </h1>

            <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7] mb-6">
              Shop children&apos;s clothing from Kids City with direct delivery to your home in Pune. Browse our festive wear, birthday dresses, and cotton night suits, and get in touch on WhatsApp to confirm delivery availability and dispatch times to your address.
            </p>

            {/* Notice block */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3 text-amber-900 text-[0.88rem] leading-[1.6]">
              <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Delivery Policy Notice:</strong> Delivery charges, courier partners, and exact delivery windows vary depending on your location in Pune/PCMC. Please message us on WhatsApp with your locality or pincode for current delivery terms.
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] shadow-sm hover:brightness-105 transition-all min-h-[48px]"
              >
                <MessageSquare size={18} />
                Check Delivery on WhatsApp ({storeConfig.phone})
              </button>
              <a
                href={`tel:${storeConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3.5 rounded-full font-bold text-[0.92rem] hover:bg-brand-navy-dark transition-all min-h-[48px] no-underline"
              >
                <Phone size={18} />
                Call Store
              </a>
            </div>
          </div>
        </header>

        {/* Coverage Overview */}
        <section className="mb-14">
          <h2 className="font-[family-name:var(--font-head)] text-[1.6rem] font-bold text-brand-navy mb-6">
            Delivery Areas Across Pune &amp; PCMC
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Location */}
            <div className="bg-white border-2 border-brand-terracotta/30 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-brand-terracotta font-bold text-[0.88rem] mb-2">
                <MapPin size={18} />
                <span>Physical Store Location (Verified)</span>
              </div>
              <h3 className="text-[1.2rem] font-bold text-brand-navy mb-2">
                Wakad Boutique — Kids City
              </h3>
              <p className="text-[0.9rem] text-text-mid leading-[1.6] mb-4">
                {storeConfig.address.fullFormatted}
              </p>
              <p className="text-[0.85rem] text-text-muted mb-4">
                Open for in-store trials, browsing, and instant takeaway. Open 7 days a week.
              </p>
              <button
                onClick={() => onViewChange('kids-clothes-wakad')}
                className="text-brand-terracotta font-bold text-[0.88rem] hover:underline"
              >
                View Wakad Store Page &rarr;
              </button>
            </div>

            {/* Home Delivery Coverage */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-[0.88rem] mb-2">
                <Truck size={18} />
                <span>Home Delivery Service</span>
              </div>
              <h3 className="text-[1.2rem] font-bold text-brand-navy mb-2">
                Pune &amp; Pimpri-Chinchwad Areas
              </h3>
              <p className="text-[0.9rem] text-text-mid leading-[1.6] mb-4">
                We accept delivery inquiries across Pune including Hinjewadi, Baner, Balewadi, Aundh, Pimple Saudagar, Ravet, Tathawade, Kothrud, and other major Pune residential localities.
              </p>
              <p className="text-[0.85rem] text-text-muted mb-4">
                Delivery schedules and fees depend on order size and destination. Message us on WhatsApp to confirm.
              </p>
              <button
                onClick={handleWhatsApp}
                className="text-emerald-700 font-bold text-[0.88rem] hover:underline"
              >
                Check Your Pincode on WhatsApp &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#FAF8F5] border border-border rounded-3xl p-8 md:p-10 mb-14">
          <h2 className="font-[family-name:var(--font-head)] text-[1.5rem] font-bold text-brand-navy mb-6 text-center">
            How WhatsApp Ordering Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-border">
              <div className="w-10 h-10 rounded-full bg-brand-sand text-brand-navy font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Browse &amp; Select</h3>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                Explore our catalog or message us with your child&apos;s age, gender, and the occasion (festive wear, birthday, night suit).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border">
              <div className="w-10 h-10 rounded-full bg-brand-sand text-brand-navy font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Confirm Size &amp; Photos</h3>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                Our Wakad store team shares live photos and size measurements via WhatsApp to ensure a proper fit.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-border">
              <div className="w-10 h-10 rounded-full bg-brand-sand text-brand-navy font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-brand-navy mb-2">Dispatch &amp; Delivery</h3>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                We pack your order carefully and dispatch it to your Pune address with order tracking updates.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-[family-name:var(--font-head)] text-[1.5rem] font-bold text-brand-navy mb-6">
            Delivery Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="border border-border rounded-xl p-5 bg-white">
              <h3 className="font-bold text-brand-navy text-[0.95rem] mb-2">
                What are the delivery charges in Pune?
              </h3>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                Delivery charges depend on your delivery pincode and total parcel weight. Please contact us on WhatsApp (+91 78916 72762) with your address for current delivery pricing.
              </p>
            </div>

            <div className="border border-border rounded-xl p-5 bg-white">
              <h3 className="font-bold text-brand-navy text-[0.95rem] mb-2">
                How soon will my order arrive?
              </h3>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                Delivery in Wakad and nearby areas. Message us on WhatsApp with your pincode to confirm current delivery schedules.
              </p>
            </div>

            <div className="border border-border rounded-xl p-5 bg-white">
              <h3 className="font-bold text-brand-navy text-[0.95rem] mb-2">
                What if the clothes do not fit my child?
              </h3>
              <p className="text-[0.88rem] text-text-mid leading-[1.6]">
                We support size exchanges for unworn items with original tags and receipt intact. You can visit our Wakad store or coordinate an exchange on WhatsApp.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
