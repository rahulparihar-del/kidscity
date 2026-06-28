import { useState, useEffect } from 'react'
import { ShoppingBag, Phone, Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar({ currentView, onViewChange, bagCount, onOpenBag }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (view, e) => {
    e.preventDefault()
    onViewChange(view)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="/" className={styles.logo} onClick={(e) => handleNavClick('home', e)} aria-label="Kids City Home">
          <img
            src="/images/logo_full.webp"
            alt="Kids City — A Clothing Hub for Your Little Sunshine"
            className={styles.logoImg}
          />
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          <li>
            <a
              href="#home"
              className={`${styles.link} ${currentView === 'home' ? styles.linkActive : ''}`}
              onClick={(e) => handleNavClick('home', e)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#shop"
              className={`${styles.link} ${currentView === 'shop' ? styles.linkActive : ''}`}
              onClick={(e) => handleNavClick('shop', e)}
            >
              Collections
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`${styles.link} ${currentView === 'contact' ? styles.linkActive : ''}`}
              onClick={(e) => handleNavClick('contact', e)}
            >
              Contact &amp; FAQ
            </a>
          </li>
        </ul>

        {/* Desktop actions */}
        <div className={styles.actions}>
          <a href="tel:+917891672762" className={styles.callLink}>
            <Phone size={14} className={styles.callIcon} />
            078916 72762
          </a>

          {/* Bag button */}
          <button className={styles.bagBtn} onClick={onOpenBag} aria-label="Open inquiry bag">
            <ShoppingBag size={20} />
            {bagCount > 0 && (
              <span className={styles.badge}>{bagCount}</span>
            )}
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

        {/* Hamburger and Mob Bag */}
        <div className={styles.mobControls}>
          <button className={styles.bagBtn} onClick={onOpenBag} aria-label="Open inquiry bag">
            <ShoppingBag size={20} />
            {bagCount > 0 && (
              <span className={styles.badge}>{bagCount}</span>
            )}
          </button>
          
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a
            href="#home"
            className={`${styles.mobileLink} ${currentView === 'home' ? styles.mobileLinkActive : ''}`}
            onClick={(e) => handleNavClick('home', e)}
          >
            Home
          </a>
          <a
            href="#shop"
            className={`${styles.mobileLink} ${currentView === 'shop' ? styles.mobileLinkActive : ''}`}
            onClick={(e) => handleNavClick('shop', e)}
          >
            Collections
          </a>
          <a
            href="#contact"
            className={`${styles.mobileLink} ${currentView === 'contact' ? styles.mobileLinkActive : ''}`}
            onClick={(e) => handleNavClick('contact', e)}
          >
            Contact &amp; FAQ
          </a>
          
          <div className={styles.mobileCtas}>
            <a href="tel:+917891672762" className="btn btn-navy" style={{ justifyContent: 'center' }}>
              Call: 078916 72762
            </a>
            <a
              href="https://wa.me/917891672762"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa"
              style={{ justifyContent: 'center' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
