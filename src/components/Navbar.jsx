import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Collections', href: '#categories' },
  { label: 'Festival Wear', href: '#featured' },
  { label: 'About Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} aria-label="Kids City Home">
          <img
            src="/images/logo_full.png"
            alt="Kids City — A Clothing Hub for Your Little Sunshine"
            className={styles.logoImg}
          />
        </a>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} className={styles.link}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className={styles.actions}>
          <a href="tel:+917891672762" className={styles.callLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            078916 72762
          </a>
          <a href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20saw%20your%20ad." className={`btn btn-gold ${styles.navCta}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.107 1.514 5.84L0 24l6.343-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.381l-.372-.22-3.765.881.921-3.666-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className={styles.mobileLink} onClick={closeMenu}>{l.label}</a>
          ))}
          <div className={styles.mobileCtas}>
            <a href="tel:+917891672762" className="btn btn-navy" style={{justifyContent:'center'}} onClick={closeMenu}>
              Call: 078916 72762
            </a>
            <a href="https://wa.me/917891672762" className="btn btn-wa" style={{justifyContent:'center'}} onClick={closeMenu}>
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
