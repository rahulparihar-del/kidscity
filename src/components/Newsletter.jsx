import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react'
import styles from './Newsletter.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

const CONTACT = [
  {
    icon: MapPin,
    label: 'Our Store',
    value: 'Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, Wakad, Pune 411057',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '078916 72762',
    href: 'tel:+917891672762',
  },
  {
    icon: Clock,
    label: 'Store Hours',
    value: 'Open Daily — Come Anytime!',
  },
]

export default function Newsletter() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.bgDeco}>
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>

      <div className={`container ${styles.wrap}`}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className={styles.label}>Visit Us</span>
          <h2 className={styles.heading}>Come Say Hello in <span className="serif-accent">Wakad</span></h2>
          <p className={styles.sub}>
            Drop by the store, message us on WhatsApp, or give us a call. We are
            always happy to help you find the perfect outfit.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left: live map */}
          <div className={styles.mapSide}>
            <iframe
              className={styles.map}
              src="https://maps.google.com/maps?q=18.5980911,73.7744639&z=16&output=embed"
              title="Kids City Wakad location"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.mapBadge}>
              <span className={styles.mapDot} />
              Open Now
            </div>
          </div>

          {/* Right: details */}
          <div className={styles.content}>
            <motion.ul
              className={styles.list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {CONTACT.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={item.label}
                    className={styles.row}
                    custom={i}
                    variants={fadeUp}
                  >
                    <span className={styles.iconBox}>
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <div>
                      <p className={styles.rowLabel}>{item.label}</p>
                      {item.href ? (
                        <a className={styles.rowValue} href={item.href}>
                          {item.value}
                        </a>
                      ) : (
                        <p className={styles.rowValue}>{item.value}</p>
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>

            <div className={styles.ctaGroup}>
              <a
                href="https://www.google.com/maps/dir//Kids+City+-+Best+Kids+Clothes+Shop+In+Wakad+(Pune)+%7C%7C+Best+Festival+Dress+%7C%7C+Traditional+Dress+Collection,+Shop+No+12,+Mahalaxmi+Complex,+Chatrapati+Chowk+Rd,+beside+Annapurna+veg+restaurant,+Kaspate+Wasti,+Wakad,+Pimpri-Chinchwad,+Maharashtra+411057/@18.6040405,73.7830858,15z"
                className="btn btn-gold"
              >
                <Navigation size={16} strokeWidth={2.4} />
                Get Directions
              </a>
              <a
                href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20saw%20your%20ad%20and%20want%20to%20visit%20your%20store.%20Can%20you%20share%20details%3F"
                className="btn btn-wa"
              >
                <MessageCircle size={16} strokeWidth={2.4} />
                WhatsApp Us
              </a>
              <a href="tel:+917891672762" className="btn btn-outline-navy">
                <Phone size={15} strokeWidth={2.4} />
                Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
