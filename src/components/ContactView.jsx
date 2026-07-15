import { useState } from 'react'
import { MapPin, Phone, Clock, Send, ChevronDown, CheckCircle2, MessageSquare, Navigation, Car } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: "Where is Kids City store located in Wakad?",
    a: "We are located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, beside Annapurna Veg Restaurant, Kaspate Wasti, Wakad, Pune 411057. Search 'Kids City Wakad' on Google Maps for directions."
  },
  {
    q: "What are the store hours for Kids City Wakad?",
    a: "We are open every single day from 10:00 AM to 9:30 PM, including Saturdays, Sundays, and all public holidays and festival seasons."
  },
  {
    q: "Do you have birthday dresses for girls in Pune?",
    a: "Yes! Our Birthday Collection is one of our bestsellers. We carry princess gowns, layered tulle dresses, and party wear for girls aged 0–12 years. WhatsApp us to check current stock."
  },
  {
    q: "Do you carry traditional kids wear for Navratri and Diwali?",
    a: "Absolutely! We specialize in festival wear including Navratri lehengas, Diwali kurta-pajama sets, Chaniya Choli, and ethnic dresses for boys and girls aged 0–14 years."
  },
  {
    q: "Do you offer sizing exchanges?",
    a: "Yes! If you purchase a dress and the size doesn't fit, we offer hassle-free size exchanges within 7 days in store. Please keep the tags intact and bring the original bill."
  },
  {
    q: "Can I check stock before visiting the store?",
    a: "Absolutely! You can WhatsApp us at +91 78916 72762, or add multiple items to your Inquiry Bag and message us. Our staff will check sizing and stock for you within minutes."
  },
  {
    q: "Do you deliver in Pune?",
    a: "Yes! We offer local home delivery in Wakad, Hinjewadi, and Baner. For other areas in Pune and Pimpri-Chinchwad, we coordinate shipping via local courier services."
  },
  {
    q: "Is there parking available near Kids City Wakad?",
    a: "Yes, Mahalaxmi Complex has available parking near the store. The store is also accessible by auto-rickshaw from Wakad Chowk and nearby areas."
  },
]

const SERVICE_AREAS = [
  'Wakad', 'Hinjewadi', 'Baner', 'Balewadi', 'Pimple Saudagar',
  'Ravet', 'Tathawade', 'Aundh', 'Pimpri', 'Chinchwad', 'Pune'
]

function AccordionItem({ faq, idx }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="bg-white border border-border rounded-2xl px-6 py-5 cursor-pointer transition-all duration-150 shadow-sm hover:border-brand-terracotta"
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      id={`faq-contact-${idx}`}
    >
      <div className="flex items-center gap-4">
        <span className="text-[0.95rem] font-black text-brand-terracotta opacity-85">0{idx + 1}</span>
        <h3 className="font-[family-name:var(--font-head)] text-[0.98rem] font-extrabold text-brand-navy flex-1 leading-[1.35]">{faq.q}</h3>
        <ChevronDown
          size={18}
          className="text-text-muted transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
        />
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-[0.9rem] text-text-mid leading-[1.6] pt-3.5 pl-[34px] border-t border-dashed border-border mt-3.5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactView() {
  const [formData, setFormData] = useState({ name: '', phone: '', msg: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return
    
    const phoneNum = '917891672762'
    const text = `Hi Kids City! My name is ${formData.name} (${formData.phone}). I have a query:\n\n"${formData.msg || 'Hello! I want to inquire about kids clothes.'}"`
    const url = `https://wa.me/${phoneNum}?text=${encodeURIComponent(text)}`
    
    setSubmitted(true)
    setTimeout(() => {
      window.open(url, '_blank')
      setSubmitted(false)
      setFormData({ name: '', phone: '', msg: '' })
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-white border-b border-border pt-[120px] pb-14 text-center relative overflow-hidden">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.7rem,3.5vw,2.4rem)] font-extrabold text-brand-navy-dark mt-1.5 mb-3 tracking-tight max-w-[720px] mx-auto">
            Contact <span className="serif-accent">Kids City</span> — Best Kids Clothes Store in Wakad, Pune
          </h1>
          <p className="text-base text-text-mid max-w-[600px] mx-auto leading-[1.65] relative">
            Visit us at Mahalaxmi Complex, Wakad or reach us on WhatsApp. We serve families across Wakad, Hinjewadi, Baner, and all of Pune.
          </p>
        </div>
      </div>

      <section className="py-[60px]">
        <div className="container">
          {/* Top info cards */}
          <div className="grid grid-cols-3 max-[991px]:grid-cols-1 gap-[30px] max-[991px]:gap-5 mb-[70px]">
            <div className="bg-white border border-border rounded-2xl p-[30px] text-center shadow-sm flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ background: '#E07A5F' }}>
                <MapPin size={22} color="white" />
              </div>
              <h3 className="font-[family-name:var(--font-head)] text-[1.15rem] font-extrabold text-brand-navy">Visit Our Store</h3>
              <address style={{ fontStyle: 'normal', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-mid)', marginBottom: 12 }}>
                Shop No 12, Mahalaxmi Complex,<br />
                Chatrapati Chowk Road,<br />
                Beside Annapurna Veg Restaurant,<br />
                Wakad, Pune, MH 411057
              </address>
              <a
                href="https://www.google.com/maps/dir//Kids+City+Wakad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.88rem] font-bold text-brand-terracotta mt-auto inline-flex items-center gap-1 hover:underline"
              >
                <Navigation size={14} /> Get Directions →
              </a>
            </div>

            <div className="bg-white border border-border rounded-2xl p-[30px] text-center shadow-sm flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ background: '#25D366' }}>
                <MessageSquare size={22} color="white" />
              </div>
              <h3 className="font-[family-name:var(--font-head)] text-[1.15rem] font-extrabold text-brand-navy">Call &amp; WhatsApp</h3>
              <p className="text-sm text-text-mid leading-relaxed">Chat with us instantly to check stock, sizes, or new arrivals before your visit.</p>
              <a href="tel:+917891672762" className="text-[0.88rem] font-bold text-brand-terracotta mt-auto inline-flex items-center gap-1 hover:underline mb-2">
                <Phone size={14} /> +91 78916 72762
              </a>
              <a
                href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20want%20to%20know%20about%20your%20kids%20clothing."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa mt-2 text-[0.85rem] px-4 py-2"
              >
                <MessageSquare size={14} fill="white" strokeWidth={0} /> Open WhatsApp
              </a>
            </div>

            <div className="bg-white border border-border rounded-2xl p-[30px] text-center shadow-sm flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ background: '#F4A261' }}>
                <Clock size={22} color="white" />
              </div>
              <h3 className="font-[family-name:var(--font-head)] text-[1.15rem] font-extrabold text-brand-navy">Store Hours</h3>
              <p className="text-sm text-text-mid leading-relaxed">Open every single day for you and your family — no appointment needed.</p>
              <span className="bg-white border border-border text-brand-navy px-4 py-1.5 rounded-[50px] text-[0.88rem] font-bold mt-auto">10:00 AM – 9:30 PM · Daily</span>
              <div className="flex items-center gap-1.5 font-[family-name:var(--font-body)] text-[0.8rem] text-text-muted mt-2">
                <Car size={13} />
                <span>Parking available at Mahalaxmi Complex</span>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="mb-[60px]">
            <h2 className="font-[family-name:var(--font-head)] text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold text-brand-navy-dark mb-2 text-center">
              Find <span className="serif-accent">Kids City</span> on the Map — Wakad, Pune
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[0.95rem] text-text-mid text-center max-w-[640px] mx-auto mb-6 leading-[1.65]">
              Located at Mahalaxmi Complex, Chatrapati Chowk Road, Wakad — beside Annapurna Veg Restaurant. Easily reachable from Hinjewadi, Baner, Balewadi, and Pimple Saudagar.
            </p>
            <div className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(61,64,91,0.12)] border border-border mb-5">
              <iframe
                title="Kids City Wakad Location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.2755406882654!2d73.77186817501563!3d18.598091268380885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb5d42d2c6a7%3A0x0!2sKids+City!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: 16 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Maps showing Kids City location in Wakad, Pune"
              />
            </div>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <a
                href="https://www.google.com/maps/dir//Kids+City+Wakad"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-terracotta"
              >
                <Navigation size={16} /> Get Directions
              </a>
              <a href="tel:+917891672762" className="btn btn-outline-navy">
                <Phone size={16} /> Call: +91 78916 72762
              </a>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_1.2fr] max-[991px]:grid-cols-1 gap-[60px] max-[991px]:gap-[50px] items-start">
            {/* Form Column */}
            <div className="bg-white border border-border p-10 max-[600px]:p-6 rounded-2xl shadow-sm">
              <h2 className="font-[family-name:var(--font-head)] text-[1.6rem] font-extrabold text-brand-navy mb-1.5">Send a <span className="serif-accent">Direct</span> Query</h2>
              <p className="text-[0.92rem] text-text-muted mb-[30px]">
                Fill out the form below. Submitting will pre-fill a WhatsApp message to chat directly with our store manager.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5" aria-label="Contact form for Kids City Wakad">
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-[0.82rem] font-extrabold text-brand-navy uppercase tracking-[0.5px]">Your Name *</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    className="form-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    autoComplete="name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form-phone" className="text-[0.82rem] font-extrabold text-brand-navy uppercase tracking-[0.5px]">WhatsApp Number *</label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    className="form-input"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    autoComplete="tel"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form-msg" className="text-[0.82rem] font-extrabold text-brand-navy uppercase tracking-[0.5px]">Query / Message</label>
                  <textarea
                    id="form-msg"
                    rows="4"
                    placeholder="Tell us what size or clothing style you are looking for..."
                    className="form-input"
                    style={{ resize: 'none' }}
                    value={formData.msg}
                    onChange={e => setFormData({ ...formData, msg: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="btn btn-terracotta w-full mt-2.5"
                  aria-label="Send inquiry via WhatsApp"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 size={18} /> Directing to WhatsApp...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send via WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQs Column */}
            <div>
              <h2 className="font-[family-name:var(--font-head)] text-[1.6rem] font-extrabold text-brand-navy mb-1.5">Frequently Asked <span className="serif-accent">Questions</span></h2>
              <p className="text-[0.92rem] text-text-muted mb-[30px]">Common questions about shopping at Kids City Wakad, Pune.</p>
              
              <div className="flex flex-col gap-4">
                {FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} faq={faq} idx={idx} />
                ))}
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="mt-[72px] text-center pt-12 border-t border-border">
            <h2 className="font-[family-name:var(--font-head)] text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold text-brand-navy-dark mb-2.5">
              We Serve Families Across <span className="serif-accent">Pune &amp; Pimpri-Chinchwad</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[0.95rem] text-text-mid max-w-[560px] mx-auto mb-6 leading-[1.65]">
              Kids City Wakad is conveniently located for families from all these areas. Kids wear delivery also available in Wakad, Hinjewadi, and Baner.
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {SERVICE_AREAS.map((area, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-border rounded-full font-[family-name:var(--font-body)] text-[0.85rem] font-medium text-brand-navy">
                  <MapPin size={12} className="text-brand-terracotta" /> {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
