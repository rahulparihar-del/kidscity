import { useState } from 'react'
import { MapPin, Phone, Clock, Send, ChevronDown, CheckCircle2, MessageSquare, Navigation, Car } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ContactView.module.css'

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
      className={styles.faqCard}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      id={`faq-contact-${idx}`}
    >
      <div className={styles.faqHeader}>
        <span className={styles.faqNum}>0{idx + 1}</span>
        <h3 className={styles.faqQuestion}>{faq.q}</h3>
        <ChevronDown
          size={18}
          className={styles.faqChevron}
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={styles.faqBody}
          >
            <p className={styles.faqAnswer}>{faq.a}</p>
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
    <div className={styles.contactPage}>
      {/* Banner */}
      <div className={styles.banner}>
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1 className={styles.title}>
            Contact <span className="serif-accent">Kids City</span> — Best Kids Clothes Store in Wakad, Pune
          </h1>
          <p className={styles.subtitle}>
            Visit us at Mahalaxmi Complex, Wakad or reach us on WhatsApp. We serve families across Wakad, Hinjewadi, Baner, and all of Pune.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          {/* Top info cards */}
          <div className={styles.cardsRow}>
            <div className={styles.infoCard}>
              <div className={styles.iconCircle} style={{ background: '#E07A5F' }}>
                <MapPin size={22} color="white" />
              </div>
              <h3>Visit Our Store</h3>
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
                className={styles.cardLink}
              >
                <Navigation size={14} /> Get Directions →
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconCircle} style={{ background: '#25D366' }}>
                <MessageSquare size={22} color="white" />
              </div>
              <h3>Call &amp; WhatsApp</h3>
              <p>Chat with us instantly to check stock, sizes, or new arrivals before your visit.</p>
              <a href="tel:+917891672762" className={styles.cardLink} style={{ display: 'block', marginBottom: 8 }}>
                <Phone size={14} /> +91 78916 72762
              </a>
              <a
                href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20want%20to%20know%20about%20your%20kids%20clothing."
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-wa ${styles.waCardBtn}`}
              >
                <MessageSquare size={14} fill="white" strokeWidth={0} /> Open WhatsApp
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconCircle} style={{ background: '#F4A261' }}>
                <Clock size={22} color="white" />
              </div>
              <h3>Store Hours</h3>
              <p>Open every single day for you and your family — no appointment needed.</p>
              <span className={styles.hoursTag}>10:00 AM – 9:30 PM · Daily</span>
              <div className={styles.parkingNote}>
                <Car size={13} />
                <span>Parking available at Mahalaxmi Complex</span>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className={styles.mapSection}>
            <h2 className={styles.mapHeading}>
              Find <span className="serif-accent">Kids City</span> on the Map — Wakad, Pune
            </h2>
            <p className={styles.mapSub}>
              Located at Mahalaxmi Complex, Chatrapati Chowk Road, Wakad — beside Annapurna Veg Restaurant. Easily reachable from Hinjewadi, Baner, Balewadi, and Pimple Saudagar.
            </p>
            <div className={styles.mapContainer}>
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
            <div className={styles.mapActions}>
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

          <div className={styles.grid}>
            {/* Form Column */}
            <div className={styles.formCol}>
              <h2 className={styles.heading}>Send a <span className="serif-accent">Direct</span> Query</h2>
              <p className={styles.formSub}>
                Fill out the form below. Submitting will pre-fill a WhatsApp message to chat directly with our store manager.
              </p>

              <form onSubmit={handleSubmit} className={styles.form} aria-label="Contact form for Kids City Wakad">
                <div className={styles.inputWrap}>
                  <label htmlFor="form-name">Your Name *</label>
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

                <div className={styles.inputWrap}>
                  <label htmlFor="form-phone">WhatsApp Number *</label>
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

                <div className={styles.inputWrap}>
                  <label htmlFor="form-msg">Query / Message</label>
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
                  className={`btn btn-terracotta ${styles.submitBtn}`}
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
            <div className={styles.faqCol}>
              <h2 className={styles.heading}>Frequently Asked <span className="serif-accent">Questions</span></h2>
              <p className={styles.formSub}>Common questions about shopping at Kids City Wakad, Pune.</p>
              
              <div className={styles.faqList}>
                {FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} faq={faq} idx={idx} />
                ))}
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className={styles.serviceArea}>
            <h2 className={styles.serviceHeading}>
              We Serve Families Across <span className="serif-accent">Pune &amp; Pimpri-Chinchwad</span>
            </h2>
            <p className={styles.serviceSub}>
              Kids City Wakad is conveniently located for families from all these areas. Kids wear delivery also available in Wakad, Hinjewadi, and Baner.
            </p>
            <div className={styles.areaTags}>
              {SERVICE_AREAS.map((area, i) => (
                <span key={i} className={styles.areaTag}>
                  <MapPin size={12} /> {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
