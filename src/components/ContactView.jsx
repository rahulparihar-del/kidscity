import { useState } from 'react'
import { MapPin, Phone, Clock, Send, ChevronDown, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ContactView.module.css'

const FAQS = [
  {
    q: "Where is Kids City store located in Wakad?",
    a: "We are located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, beside Annapurna Veg Restaurant, Kaspate Wasti, Wakad, Pune. You can easily find us on Google Maps by searching for 'Kids City Wakad'."
  },
  {
    q: "What are your store hours?",
    a: "We are open daily from 10:00 AM to 9:30 PM, including Saturdays, Sundays, and major holidays, so you can shop at your convenience."
  },
  {
    q: "Do you offer sizing exchanges?",
    a: "Yes! If you purchase a dress and the size doesn't fit, we offer hassle-free size exchanges within 7 days in store. Please keep the tags intact and bring the original bill."
  },
  {
    q: "Can I check stock before visiting the store?",
    a: "Absolutely! You can click the 'Order via WhatsApp' button on any product detail page, or add multiple items to your Inquiry Bag and message us. Our helpful staff will check sizing stock for you within minutes."
  },
  {
    q: "Do you deliver in Pune?",
    a: "Yes, we offer local home delivery in Wakad, Hinjewadi, and Baner. For other areas in Pune and Pimpri-Chinchwad, we can coordinate shipping via local courier services."
  }
]

function AccordionItem({ faq, idx }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.faqCard} onClick={() => setIsOpen(!isOpen)}>
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
    
    // In real project we would send to backend. Here we format a WhatsApp link to make it immediately functional!
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
          <h1 className={styles.title}>Visit or Message Us</h1>
          <p className={styles.subtitle}>
            Have questions about sizes, collections, or custom outfits? We are here to help you.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          {/* Top blocks: Location, Phone, Hours */}
          <div className={styles.cardsRow}>
            <div className={styles.infoCard}>
              <div className={styles.iconCircle} style={{ background: '#E07A5F' }}>
                <MapPin size={22} color="white" />
              </div>
              <h3>Visit Store</h3>
              <p>Shop No 12, Mahalaxmi Complex, Wakad, Pune, MH 411057</p>
              <a
                href="https://www.google.com/maps/dir//Kids+City"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                Get Directions &rarr;
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconCircle} style={{ background: '#81B29A' }}>
                <Phone size={22} color="white" />
              </div>
              <h3>Call & WhatsApp</h3>
              <p>Contact us directly to reserve sizes or check catalogs.</p>
              <a href="tel:+917891672762" className={styles.cardLink}>
                +91 78916 72762
              </a>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconCircle} style={{ background: '#F4A261' }}>
                <Clock size={22} color="white" />
              </div>
              <h3>Store Hours</h3>
              <p>Open every single day for you and your family.</p>
              <span className={styles.hoursTag}>10:00 AM – 9:30 PM</span>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Form Column */}
            <div className={styles.formCol}>
              <h2 className={styles.heading}>Send a Direct Query</h2>
              <p className={styles.formSub}>
                Fill out the form below. Submitting will pre-fill a WhatsApp message to chat directly with our store manager.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
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
              <h2 className={styles.heading}>Frequently Asked Questions</h2>
              <p className={styles.formSub}>Quick help answers on shopping with Kids City Wakad.</p>
              
              <div className={styles.faqList}>
                {FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} faq={faq} idx={idx} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
