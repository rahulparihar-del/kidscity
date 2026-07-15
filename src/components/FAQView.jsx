import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, MessageSquare, Phone } from 'lucide-react'

const FAQS = [
  {
    category: 'Store & Location',
    questions: [
      {
        q: 'Where is Kids City located in Wakad, Pune?',
        a: 'Kids City is located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, beside Annapurna Veg Restaurant, Kaspate Wasti, Wakad, Pune, Maharashtra 411057. You can find us easily on Google Maps by searching "Kids City Wakad".'
      },
      {
        q: 'What are the store timings for Kids City Wakad?',
        a: 'We are open every day — Monday through Sunday — from 10:00 AM to 9:30 PM, including all public holidays, festivals, and weekends. You can visit us any day at your convenience.'
      },
      {
        q: 'Which areas near Wakad does Kids City serve?',
        a: 'Kids City serves families from Wakad, Hinjewadi, Baner, Balewadi, Pimple Saudagar, Ravet, Tathawade, Aundh, Pimpri, Chinchwad, and across Pune. We are centrally located for all these neighbourhoods.'
      },
      {
        q: 'Is there parking available near Kids City Wakad?',
        a: 'Yes! Mahalaxmi Complex has available parking space near the store. Wakad is also well-connected by autos and the Pune bus network, making it easy to visit us.'
      },
    ]
  },
  {
    category: 'Collections & Products',
    questions: [
      {
        q: 'What type of kids clothing does Kids City stock?',
        a: 'Kids City carries over 500 styles including festival wear (Navratri lehengas, Diwali kurtas), birthday party dresses, traditional Indian outfits, casual daily wear, western wear, night suits, and seasonal collections for boys and girls aged 0 to 14 years.'
      },
      {
        q: 'Do you have birthday dresses for girls in Pune?',
        a: 'Yes! Our Birthday Collection is one of our bestsellers. We carry princess gowns, frilly frocks, tulle dresses, and embellished party wear for girls aged 0–12 years. New styles arrive regularly for birthdays and parties.'
      },
      {
        q: 'Do you have traditional kids wear for festivals like Navratri and Diwali?',
        a: 'Absolutely! We specialize in traditional and festival kids wear — Navratri lehengas, Diwali kurta-pajama sets, Chaniya Choli sets, ethnic dresses, and more. Our festival collection is one of the most popular in Wakad and Pune.'
      },
      {
        q: 'What age range do you cover for kids clothing?',
        a: 'Kids City stocks clothing for children from 0 to 14 years old — including newborns, toddlers, infants, and older kids. Most styles come in sizes from 0–2 years up to 12–14 years.'
      },
    ]
  },
  {
    category: 'Shopping & Orders',
    questions: [
      {
        q: 'Can I check stock availability before visiting the store?',
        a: 'Yes! You can WhatsApp us at +91 78916 72762 to check stock, available sizes, and current collections before your visit. Our team responds quickly and can even send you photos of available styles.'
      },
      {
        q: 'Do you offer returns or size exchanges?',
        a: 'We have a strict no-return policy and all sales are final. However, we offer size exchanges within 7 days of purchase. The item must be unused, unwashed, with tags intact, and exchanged in person at our physical store in Wakad, Pune.'
      },
      {
        q: 'Do you deliver kids clothes outside Wakad, Pune?',
        a: 'No. We offer local home delivery exclusively to locations within Wakad, Pune (Pincode: 411057) only. We do not deliver to Hinjewadi, Baner, or other parts of Pune. Out-of-area ordering is disabled.'
      },
      {
        q: 'What payment methods are accepted at Kids City?',
        a: 'We accept Cash, UPI (Google Pay, PhonePe, Paytm), Debit Cards, and Credit Cards. All major UPI payment apps are accepted at our Wakad store.'
      },
    ]
  },
]

function AccordionItem({ item, idx, catIdx }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="bg-white border border-border rounded-[14px] px-[22px] py-5 mb-3 cursor-pointer outline-none transition-all duration-200 hover:shadow-[0_4px_20px_rgba(61,64,91,0.1)] hover:border-brand-terracotta focus:shadow-[0_4px_20px_rgba(61,64,91,0.1)] focus:border-brand-terracotta"
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
      aria-expanded={open}
      id={`faq-${catIdx}-${idx}`}
    >
      <div className="flex items-start gap-3.5">
        <span className="font-[family-name:var(--font-head)] text-[0.78rem] font-bold text-brand-terracotta bg-[rgba(224,122,95,0.1)] px-[9px] py-[3px] rounded-full shrink-0 mt-0.5">
          Q{catIdx * 4 + idx + 1}
        </span>
        <h3 className="font-[family-name:var(--font-head)] text-[0.97rem] font-semibold text-brand-navy-dark flex-1 leading-[1.45] m-0">
          {item.q}
        </h3>
        <ChevronDown
          size={18}
          className="text-text-muted shrink-0 transition-transform duration-[250ms]"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="font-[family-name:var(--font-body)] text-[0.92rem] text-text-mid leading-[1.7] pt-3.5 pb-1 pl-[38px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQView({ onViewChange }) {
  const handleContact = (e) => {
    e.preventDefault()
    onViewChange('contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-white min-h-screen">
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.flatMap((cat) =>
              cat.questions.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              }))
            ),
          }),
        }}
      />

      {/* Banner */}
      <div className="bg-white border-b border-border pt-[120px] pb-[60px] text-center relative overflow-hidden">
        <div className="container">
          <span className="section-label">Help Center</span>
          <h1 className="font-[family-name:var(--font-head)] text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-brand-navy-dark my-3 relative">
            Frequently Asked <span className="serif-accent">Questions</span>
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid max-w-[520px] mt-3 mx-auto leading-[1.7] relative">
            Everything you need to know about Kids City — Wakad's best kids clothes shop in Pune.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="py-[72px] pb-20">
        <div className="container">
          <div className="grid grid-cols-[1fr_300px] max-[900px]:grid-cols-1 gap-10 items-start">
            {/* Main */}
            <div>
              {FAQS.map((cat, catIdx) => (
                <div key={catIdx} className="mb-10">
                  <h2 className="font-[family-name:var(--font-head)] text-[1.25rem] font-bold text-brand-navy-dark mb-4 pb-3 border-b-2 border-brand-terracotta inline-block">
                    {cat.category}
                  </h2>
                  {cat.questions.map((item, idx) => (
                    <AccordionItem key={idx} item={item} idx={idx} catIdx={catIdx} />
                  ))}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="max-[900px]:-order-1">
              <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(61,64,91,0.07)] border border-border">
                <h3 className="font-[family-name:var(--font-head)] text-base font-bold text-brand-navy-dark mb-2.5">
                  Still Have Questions?
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[0.88rem] text-text-mid leading-[1.6] mb-4">
                  Our friendly team at Kids City Wakad is happy to help you find the perfect kids outfit.
                </p>
                <a
                  href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20have%20a%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa w-full justify-center mb-3"
                >
                  <MessageSquare size={16} /> WhatsApp Us
                </a>
                <a href="tel:+917891672762" className="btn btn-outline-navy w-full justify-center mb-3">
                  <Phone size={16} /> Call: +91 78916 72762
                </a>
                <a href="#contact" onClick={handleContact} className="btn btn-terracotta w-full justify-center">
                  Contact Page
                </a>
              </div>

              <div className="bg-white rounded-[18px] p-6 shadow-[0_2px_16px_rgba(61,64,91,0.07)] border border-border mt-5">
                <h3 className="font-[family-name:var(--font-head)] text-base font-bold text-brand-navy-dark mb-2.5">
                  Kids City Store
                </h3>
                <div className="flex items-start gap-2.5 font-[family-name:var(--font-body)] text-[0.88rem] text-text-mid mb-2.5 leading-[1.5]">
                  <MapPin size={15} className="text-brand-terracotta shrink-0 mt-0.5" />
                  <span>Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, Wakad, Pune 411057</span>
                </div>
                <div className="flex items-start gap-2.5 font-[family-name:var(--font-body)] text-[0.88rem] text-text-mid mb-2.5 leading-[1.5]">
                  <span className="text-[0.95rem] shrink-0">🕙</span>
                  <span>Open Daily: 10 AM – 9:30 PM</span>
                </div>
                <a
                  href="https://www.google.com/maps/dir//Kids+City+Wakad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 font-[family-name:var(--font-body)] text-[0.9rem] font-semibold text-brand-terracotta no-underline hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
