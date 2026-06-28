import { useState, useEffect } from 'react'
import { ShoppingBag, Phone, MessageCircle, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', view: 'home', emoji: '🏠' },
  { label: 'Collections', view: 'shop', emoji: '👗' },
  { label: 'Contact & FAQ', view: 'contact', emoji: '💬' },
]

export default function Navbar({ currentView, onViewChange, bagCount, onOpenBag }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (view, e) => {
    e?.preventDefault()
    onViewChange(view)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <a href="/" className={styles.logo} onClick={(e) => handleNavClick('home', e)} aria-label="Kids City Home">
            <img
              src="/images/logo_full.webp"
              alt="Kids City"
              className={styles.logoImg}
            />
          </a>

          {/* Desktop links */}
          <ul className={styles.links}>
            {NAV_LINKS.map(({ label, view }) => (
              <li key={view}>
                <a
                  href={`#${view}`}
                  className={`${styles.link} ${currentView === view ? styles.linkActive : ''}`}
                  onClick={(e) => handleNavClick(view, e)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className={styles.actions}>
            <a href="tel:+917891672762" className={styles.callLink}>
              <Phone size={14} className={styles.callIcon} />
              078916 72762
            </a>

            <button className={styles.bagBtn} onClick={onOpenBag} aria-label="Open inquiry bag">
              <ShoppingBag size={18} />
              {bagCount > 0 && <span className={styles.badge}>{bagCount}</span>}
            </button>

            <a
              href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20saw%20your%20website%20and%20want%20to%20inquire%20about%20your%20clothes."
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-terracotta ${styles.navCta}`}
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Mobile: bag + hamburger */}
          <div className={styles.mobControls}>
            <button className={styles.bagBtn} onClick={onOpenBag} aria-label="Open inquiry bag">
              <ShoppingBag size={18} />
              {bagCount > 0 && <span className={styles.badge}>{bagCount}</span>}
            </button>

            <button
              className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            {/* Drawer header */}
            <div className={styles.drawerHeader}>
              <img src="/images/logo_full.webp" alt="Kids City" className={styles.drawerLogo} />
              <button className={styles.closeBtn} onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className={styles.drawerNav}>
              <p className={styles.drawerNavLabel}>Navigation</p>
              {NAV_LINKS.map(({ label, view, emoji }, i) => (
                <motion.a
                  key={view}
                  href={`#${view}`}
                  className={`${styles.drawerLink} ${currentView === view ? styles.drawerLinkActive : ''}`}
                  onClick={(e) => handleNavClick(view, e)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.35 }}
                >
                  <span className={styles.drawerLinkEmoji}>{emoji}</span>
                  <span className={styles.drawerLinkText}>{label}</span>
                  <ChevronRight size={16} className={styles.drawerChevron} />
                </motion.a>
              ))}
            </nav>

            {/* Divider */}
            <div className={styles.drawerDivider} />

            {/* Contact actions */}
            <div className={styles.drawerActions}>
              <p className={styles.drawerNavLabel}>Get in touch</p>
              <a href="tel:+917891672762" className={styles.drawerContactBtn}>
                <div className={styles.drawerContactIcon} style={{ background: 'rgba(61, 64, 91, 0.08)' }}>
                  <Phone size={18} color="var(--brand-navy)" />
                </div>
                <div className={styles.drawerContactText}>
                  <span className={styles.drawerContactTitle}>Call Us</span>
                  <span className={styles.drawerContactSub}>078916 72762</span>
                </div>
              </a>
              <a
                href="https://wa.me/917891672762"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.drawerContactBtn}
              >
                <div className={styles.drawerContactIcon} style={{ background: 'rgba(37, 211, 102, 0.12)' }}>
                  <MessageCircle size={18} color="#25D366" />
                </div>
                <div className={styles.drawerContactText}>
                  <span className={styles.drawerContactTitle}>WhatsApp</span>
                  <span className={styles.drawerContactSub}>Chat with us instantly</span>
                </div>
              </a>
            </div>

            {/* Footer tag */}
            <div className={styles.drawerFooter}>
              <span>Kids City — Little Sunshine Clothing Hub ✨</span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
