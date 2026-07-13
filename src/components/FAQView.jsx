import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MapPin, MessageSquare, Phone } from 'lucide-react'
import styles from './FAQView.module.css'

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
        q: 'Do you offer size exchanges for kids clothing?',
        a: 'Yes, we offer hassle-free size exchanges within 7 days of purchase if the size does not fit. Please keep the original tags intact and bring your original bill. Exchange is subject to stock availability.'
      },
      {
        q: 'Do you deliver kids clothes in Pune?',
        a: 'Yes! We offer local home delivery in Wakad, Hinjewadi, and Baner. For other areas in Pune and Pimpri-Chinchwad, we coordinate shipping via local courier. Contact us on WhatsApp to arrange delivery.'
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
      className={styles.faqCard}
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
      aria-expanded={open}
      id={`faq-${catIdx}-${idx}`}
    >
      <div className={styles.faqHeader}>
        <span className={styles.faqNum}>Q{catIdx * 4 + idx + 1}</span>
        <h3 className={styles.faqQ}>{item.q}</h3>
        <ChevronDown
          size={18}
          className={styles.chevron}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
        />
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={styles.faqBody}
          >
            <p className={styles.faqA}>{item.a}</p>
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
    <div className={styles.faqPage}>
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
      <div className={styles.banner}>
        <div className="container">
          <span className="section-label">Help Center</span>
          <h1 className={styles.title}>
            Frequently Asked <span className="serif-accent">Questions</span>
          </h1>
          <p className={styles.subtitle}>
            Everything you need to know about Kids City — Wakad's best kids clothes shop in Pune.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqLayout}>
            <div className={styles.faqMain}>
              {FAQS.map((cat, catIdx) => (
                <div key={catIdx} className={styles.faqCategory}>
                  <h2 className={styles.catHeading}>{cat.category}</h2>
                  {cat.questions.map((item, idx) => (
                    <AccordionItem key={idx} item={item} idx={idx} catIdx={catIdx} />
                  ))}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>Still Have Questions?</h3>
                <p className={styles.sideSub}>
                  Our friendly team at Kids City Wakad is happy to help you find the perfect kids outfit.
                </p>
                <a
                  href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20have%20a%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
                >
                  <MessageSquare size={16} /> WhatsApp Us
                </a>
                <a href="tel:+917891672762" className="btn btn-outline-navy" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}>
                  <Phone size={16} /> Call: +91 78916 72762
                </a>
                <a href="#contact" onClick={handleContact} className="btn btn-terracotta" style={{ width: '100%', justifyContent: 'center' }}>
                  Contact Page
                </a>
              </div>

              <div className={styles.sideCard} style={{ marginTop: 20 }}>
                <h3 className={styles.sideTitle}>Kids City Store</h3>
                <div className={styles.storeDetail}>
                  <MapPin size={15} className={styles.detailIcon} />
                  <span>Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, Wakad, Pune 411057</span>
                </div>
                <div className={styles.storeDetail}>
                  <span className={styles.clockIcon}>🕙</span>
                  <span>Open Daily: 10 AM – 9:30 PM</span>
                </div>
                <a
                  href="https://www.google.com/maps/dir//Kids+City+Wakad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapsLink}
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
