import { MapPin, Phone, MessageCircle, Camera, Clock } from 'lucide-react'
import styles from './Footer.module.css'

const COLLECTIONS = ['Festival Wear', 'Traditional Dress', 'Casual Everyday', 'Birthday Special', 'Girls Collection', 'Boys Collection']
const LINKS       = [
  { label: 'Home', href: '#hero' },
  { label: 'Collections', href: '#categories' },
  { label: 'About Us', href: '#why' },
  { label: 'Reviews', href: '#' },
  { label: 'Visit Store', href: '#contact' },
  { label: 'Instagram', href: 'https://instagram.com/kidscity____', external: true },
]

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <a href="#hero" className={styles.logo} aria-label="Kids City">
              <img
                src="/images/logo_full.png"
                alt="Kids City — A Clothing Hub for Your Little Sunshine"
                className={styles.logoImg}
              />
            </a>
            <p className={styles.brandText}>
              A Clothing Hub for Your Little Sunshine. Wakad's most loved children's clothing store — premium kids wear for every occasion.
            </p>
            <div className={styles.socials}>
              <a href="https://instagram.com/kidscity____" className={styles.social} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://wa.me/917891672762" className={styles.social} aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.107 1.514 5.84L0 24l6.343-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.381l-.372-.22-3.765.881.921-3.666-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
              <a href="tel:+917891672762" className={styles.social} aria-label="Phone">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className={styles.colHeading}>Collections</h4>
            <ul className={styles.linkList}>
              {COLLECTIONS.map(c => (
                <li key={c}><a href="#categories" className={styles.footLink}>{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className={styles.colHeading}>Quick Links</h4>
            <ul className={styles.linkList}>
              {LINKS.map(l => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={styles.footLink}
                    {...(l.external ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={styles.colHeading}>Contact Us</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><MapPin size={16} strokeWidth={2} /></span>
                <p>Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, Wakad, Pimpri-Chinchwad 411057</p>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Phone size={16} strokeWidth={2} /></span>
                <a href="tel:+917891672762">078916 72762</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><MessageCircle size={16} strokeWidth={2} /></span>
                <a href="https://wa.me/917891672762">+91 78916 72762 (WhatsApp)</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Camera size={16} strokeWidth={2} /></span>
                <a href="https://instagram.com/kidscity____" target="_blank" rel="noopener noreferrer">@kidscity____</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}><Clock size={16} strokeWidth={2} /></span>
                <p>Open Daily — Come Anytime!</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© 2025 Kids City. All rights reserved. Made with care in Wakad, Pune.</p>
          <p className={styles.copy2}>
            <a href="https://www.google.com/maps/dir//Kids+City" className={styles.mapsLink}>View on Google Maps</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
