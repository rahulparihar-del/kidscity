import { motion } from 'framer-motion'
import { MapPin, Phone, MessageSquare, Camera, Clock, Navigation, Heart, ArrowRight, Mail, Star } from 'lucide-react'
import styles from './Footer.module.css'

const COLLECTIONS = [
  { label: 'Festival Wear — Wakad', view: 'shop' },
  { label: 'Traditional Kids Wear', view: 'shop' },
  { label: 'Birthday Dresses Pune', view: 'shop' },
  { label: 'Casual Kids Wear', view: 'shop' },
  { label: 'Girls Collection', view: 'shop' },
  { label: 'Boys Collection', view: 'shop' },
]

const QUICK_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Collections', view: 'shop' },
  { label: 'About Kids City', view: 'about' },
  { label: 'Contact & Visit', view: 'contact' },
  { label: 'FAQ', view: 'faq' },
]

const POLICY_LINKS = [
  { label: 'Privacy Policy', view: 'privacy-policy' },
  { label: 'Terms & Conditions', view: 'terms' },
  { label: 'Shipping Policy', view: 'shipping-policy' },
  { label: 'Return & Exchange', view: 'return-policy' },
]

const SERVICE_AREAS = ['Wakad', 'Hinjewadi', 'Baner', 'Balewadi', 'Pimple Saudagar', 'Ravet', 'Tathawade', 'Pimpri', 'Pune']

export default function Footer({ onViewChange }) {
  const handleNavClick = (view, e) => {
    e.preventDefault()
    onViewChange(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className={styles.footer} aria-label="Kids City footer">
      <div className="container">
        {/* Top CTA Conversion Band */}
        <div className={styles.ctaBand}>
          <div className={styles.ctaText}>
            <span className={styles.ctaLabel}>Visit Store Daily</span>
            <h3 className={styles.ctaTitle}>
              Bring your little stars to our <span className="serif-accent" style={{ color: 'var(--brand-terracotta-light)' }}>Wakad boutique</span>
            </h3>
            <p className={styles.ctaSub}>
              Explore 500+ premium kids clothing styles — festival wear, birthday dresses, traditional outfits, and everyday casuals for boys & girls aged 0–14 years in Wakad, Pune.
            </p>
          </div>
          <div className={styles.ctaBtns}>
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-terracotta"
              aria-label="Get directions to Kids City Wakad on Google Maps"
            >
              <Navigation size={16} fill="currentColor" strokeWidth={0} /> Get Directions
            </a>
            <a
              href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I'd%20like%20to%20visit%20your%20store%20today."
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-wa ${styles.waCta}`}
              aria-label="Chat with Kids City Wakad on WhatsApp"
            >
              <MessageSquare size={16} fill="currentColor" strokeWidth={0} /> WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className={styles.grid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <a href="/" onClick={(e) => handleNavClick('home', e)} className={styles.logo} aria-label="Kids City Home">
              <img
                src="/images/logo_full.webp"
                alt="Kids City — Best Kids Clothes Shop in Wakad, Pune"
                className={styles.logoImg}
                loading="lazy"
                width="140"
                height="56"
              />
            </a>
            <p className={styles.brandText}>
              Wakad's most loved children's clothing store since 2018. We handpick high-quality, skin-safe, comfortable, and stylish outfits for boys & girls aged 0–14 years across Pune and Pimpri-Chinchwad.
            </p>

            {/* Google Reviews badge */}
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reviewBadge}
              aria-label="Kids City has 4.9 star Google rating from 135 reviews"
            >
              <Star size={14} fill="#FBBF24" strokeWidth={0} />
              <span className={styles.reviewScore}>4.9</span>
              <span className={styles.reviewCount}>· 135+ Google Reviews</span>
            </a>
            
            {/* Social media links */}
            <div className={styles.socials}>
              <a
                href="https://instagram.com/kidscity____"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Kids City Instagram — kids clothing Wakad"
              >
                <Camera size={16} />
              </a>
              <a
                href="https://wa.me/917891672762"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="Kids City WhatsApp"
              >
                <MessageSquare size={16} />
              </a>
              <a
                href="tel:+917891672762"
                className={styles.socialBtn}
                aria-label="Call Kids City Wakad"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Collections list */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Collections</h4>
            <ul className={styles.linkList}>
              {COLLECTIONS.map((c, i) => (
                <li key={i}>
                  <a href="/collections" onClick={(e) => handleNavClick(c.view, e)} className={styles.footLink}>
                    <ArrowRight size={12} className={styles.arrowIcon} />
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {QUICK_LINKS.map((l, i) => (
                <li key={i}>
                  <a href={`/${l.view}`} onClick={(e) => handleNavClick(l.view, e)} className={styles.footLink}>
                    <ArrowRight size={12} className={styles.arrowIcon} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className={styles.colTitle} style={{ marginTop: 20 }}>Policies</h4>
            <ul className={styles.linkList}>
              {POLICY_LINKS.map((l, i) => (
                <li key={i}>
                  <a href={`/${l.view}`} onClick={(e) => handleNavClick(l.view, e)} className={styles.footLink}>
                    <ArrowRight size={12} className={styles.arrowIcon} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Visit Us</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin size={16} className={styles.contactIcon} style={{ flexShrink: 0, marginTop: '2px' }} />
                <address
                  style={{ fontStyle: 'normal', margin: 0, padding: 0 }}
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, beside Annapurna Veg Restaurant, Wakad</span>,{' '}
                  <span itemProp="addressLocality">Pimpri-Chinchwad</span>,{' '}
                  <span itemProp="addressRegion">Maharashtra</span>{' '}
                  <span itemProp="postalCode">411057</span>
                </address>
              </div>
              <a href="tel:+917891672762" className={styles.contactItemLink} aria-label="Call Kids City Wakad">
                <Phone size={16} className={styles.contactIcon} />
                <span>+91 78916 72762</span>
              </a>
              <a href="mailto:kidscitywakad@gmail.com" className={styles.contactItemLink} aria-label="Email Kids City Wakad">
                <Mail size={16} className={styles.contactIcon} />
                <span>kidscitywakad@gmail.com</span>
              </a>
              <div className={styles.contactItem}>
                <Clock size={16} className={styles.contactIcon} />
                <span>Open Daily: 10:00 AM – 9:30 PM</span>
              </div>
            </div>

            <div className={styles.serviceAreaBlock}>
              <h5 className={styles.serviceAreaTitle}>Service Areas</h5>
              <p className={styles.serviceAreaText}>
                {SERVICE_AREAS.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; 2026 Kids City Wakad, Pune. All rights reserved. &middot;{' '}
            <a href="/admin" onClick={(e) => handleNavClick('admin', e)} style={{ textDecoration: 'underline' }}>
              CRM Portal
            </a>
          </p>
          <div className={styles.heartTag}>
            Made with <Heart size={12} fill="currentColor" strokeWidth={0} className={styles.heartIcon} /> in Wakad, Pune
          </div>
          <a
            href="https://www.google.com/maps/dir//Kids+City+Wakad"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapsLink}
            aria-label="Find Kids City on Google Maps"
          >
            Locate on Google Maps
          </a>
        </div>
      </div>
    </footer>
  )
}
