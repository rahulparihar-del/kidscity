import { useState, useEffect } from 'react'
import { ShoppingBag, Phone, MessageCircle, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Collections', view: 'shop' },
  { label: 'About Us', view: 'about' },
  { label: 'Contact & FAQ', view: 'contact' },
]

const DRAWER_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Collections', view: 'shop' },
  { label: 'About Us', view: 'about' },
  { label: 'FAQ', view: 'faq' },
  { label: 'Contact & FAQ', view: 'contact' },
]

function WaIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.002 2C8.28 2 2 8.28 2 16a13.93 13.93 0 0 0 1.92 7.07L2 30l7.13-1.87A13.95 13.95 0 0 0 16.002 30C23.72 30 30 23.72 30 16S23.72 2 16.002 2zm7.3 19.9c-.3.85-1.75 1.62-2.4 1.72-.62.09-1.4.13-2.25-.14a20.6 20.6 0 0 1-2.04-.75c-3.58-1.55-5.92-5.13-6.1-5.37-.18-.24-1.45-1.93-1.45-3.68 0-1.75.92-2.61 1.25-2.97.32-.36.7-.45.93-.45l.67.01c.21 0 .5-.08.78.6l1.07 2.6c.09.22.15.47.01.73l-.4.6-.6.63c-.2.2-.4.42-.18.82.23.4 1 1.65 2.15 2.68 1.48 1.32 2.73 1.73 3.12 1.92.4.2.63.17.87-.1l1.25-1.48c.27-.35.54-.28.9-.17l2.82 1.33c.4.2.67.3.77.47.1.17.1.97-.2 1.82z"/>
    </svg>
  )
}

export default function Navbar({ currentView, onViewChange, bagCount, onOpenBag, isWakad, deliveryPincode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] flex items-center transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-[12px] ${
          scrolled
            ? 'h-[58px] bg-white/98 border-b border-[rgba(226,232,240,0.9)] shadow-[0_1px_24px_rgba(61,64,91,0.07)]'
            : 'h-16 bg-white/96 border-b border-[rgba(226,232,240,0.8)]'
        } max-[560px]:${scrolled ? 'h-[54px]' : 'h-[58px]'}`}
      >
        <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto px-7 max-[560px]:px-4 gap-6">

          {/* Logo */}
          <a
            href="/"
            className="flex items-center shrink-0 no-underline group"
            onClick={(e) => handleNavClick('home', e)}
            aria-label="Kids City Home"
          >
            <div className="w-[108px] h-10 max-[560px]:w-24 max-[560px]:h-9 overflow-hidden flex items-center justify-start">
              <img
                src="/images/logo_full.webp"
                alt="Kids City — Kids Clothes Shop in Wakad, Pune"
                className="w-[165px] h-[65px] max-[560px]:w-[148px] max-[560px]:h-[58px] object-cover shrink-0 transition-transform duration-[350ms] group-hover:scale-[1.04]"
                style={{ objectPosition: '10% 48%' }}
              />
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="flex items-center gap-0.5 list-none m-0 p-0 max-[991px]:hidden" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, view }) => (
              <li key={view}>
                <a
                  href={`/${view === 'home' ? '' : view}`}
                  className={`font-[family-name:var(--font-head)] font-semibold text-[0.875rem] px-3.5 py-[7px] rounded-full no-underline transition-all duration-[220ms] whitespace-nowrap ${
                    currentView === view
                      ? 'text-brand-navy bg-[rgba(61,64,91,0.08)] font-bold'
                      : 'text-text-mid hover:text-brand-navy hover:bg-[rgba(61,64,91,0.06)]'
                  }`}
                  onClick={(e) => handleNavClick(view, e)}
                  aria-current={currentView === view ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right actions */}
          <div className="flex items-center gap-3.5 shrink-0 max-[991px]:hidden">
            <a
              href="tel:+917891672762"
              className="flex items-center gap-1.5 text-[0.82rem] font-bold text-brand-navy no-underline px-3 py-[7px] rounded-full border-[1.5px] border-border transition-all duration-[220ms] whitespace-nowrap hover:border-brand-navy hover:bg-[rgba(61,64,91,0.04)] hover:text-brand-terracotta"
            >
              <Phone size={13} className="text-brand-sage shrink-0" />
              +91 78916 72762
            </a>

            {isWakad && (
              <button
                className="relative w-[38px] h-[38px] rounded-full border-[1.5px] border-border cursor-pointer flex items-center justify-center text-brand-navy bg-transparent transition-all duration-[220ms] hover:border-brand-terracotta hover:bg-[rgba(224,122,95,0.06)] hover:text-brand-terracotta hover:scale-[1.06]"
                onClick={onOpenBag}
                aria-label="Open inquiry bag"
              >
                <ShoppingBag size={17} />
                {bagCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[0.62rem] font-black w-[17px] h-[17px] rounded-full flex items-center justify-center border-2 border-white">
                    {bagCount}
                  </span>
                )}
              </button>
            )}

            <a
              href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20saw%20your%20website%20and%20want%20to%20inquire%20about%20your%20clothes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[7px] bg-brand-terracotta text-white font-[family-name:var(--font-head)] font-bold text-[0.82rem] px-[18px] py-2 rounded-full no-underline whitespace-nowrap transition-all duration-[220ms] border-2 border-brand-terracotta hover:bg-[#d0694e] hover:border-[#d0694e] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(224,122,95,0.32)]"
            >
              <WaIcon className="w-[15px] h-[15px] fill-white shrink-0" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Mobile: bag + hamburger */}
          <div className="hidden max-[991px]:flex items-center gap-2">
            {isWakad && (
              <button
                className="relative w-[38px] h-[38px] rounded-full border-[1.5px] border-border cursor-pointer flex items-center justify-center text-brand-navy bg-transparent transition-all duration-[220ms] hover:border-brand-terracotta hover:text-brand-terracotta"
                onClick={onOpenBag}
                aria-label="Open inquiry bag"
              >
                <ShoppingBag size={17} />
                {bagCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-terracotta text-white text-[0.62rem] font-black w-[17px] h-[17px] rounded-full flex items-center justify-center border-2 border-white">
                    {bagCount}
                  </span>
                )}
              </button>
            )}

            {/* Hamburger */}
            <button
              className={`flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-[12px] bg-transparent border-[1.5px] cursor-pointer transition-all duration-[250ms] p-0 ${
                menuOpen ? 'bg-[rgba(61,64,91,0.06)] border-brand-navy' : 'border-border hover:bg-[rgba(61,64,91,0.05)] hover:border-brand-navy'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 bg-brand-navy rounded-[4px] origin-center transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-[18px] ${
                  menuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-brand-navy rounded-[4px] origin-center transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-3 self-end mr-[11px] ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-brand-navy rounded-[4px] origin-center transition-all duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-[18px] ${
                  menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-[rgba(20,20,35,0.40)] backdrop-blur-[4px] z-[1001]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Side Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="fixed top-0 right-0 h-full w-[min(320px,88vw)] bg-white z-[1002] flex flex-col shadow-[-12px_0_48px_rgba(20,20,35,0.14)] overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 pt-[18px] pb-4 border-b border-border">
              <div className="w-[100px] h-9 overflow-hidden flex items-center">
                <img
                  src="/images/logo_full.webp"
                  alt="Kids City — Children Clothing Store in Pune"
                  className="w-[154px] h-[60px] object-cover shrink-0"
                  style={{ objectPosition: '10% 48%' }}
                />
              </div>
              <button
                className="w-[34px] h-[34px] rounded-full border-[1.5px] border-border bg-transparent flex items-center justify-center text-brand-navy cursor-pointer transition-all duration-[220ms] hover:bg-brand-navy hover:text-white hover:border-brand-navy"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-3.5 pt-5 pb-2 gap-[3px]" aria-label="Mobile navigation">
              <p className="text-[0.65rem] font-bold text-text-muted tracking-[1.4px] uppercase mb-2.5 ml-2">Navigation</p>
              {DRAWER_LINKS.map(({ label, view }, i) => (
                <motion.a
                  key={view}
                  href={`/${view === 'home' ? '' : view}`}
                  className={`flex items-center px-3.5 py-3 rounded-[12px] no-underline font-[family-name:var(--font-head)] text-[0.95rem] font-semibold transition-all duration-[220ms] ${
                    currentView === view
                      ? 'bg-[rgba(224,122,95,0.08)] text-brand-terracotta font-bold'
                      : 'text-text-mid hover:bg-[rgba(61,64,91,0.06)] hover:text-brand-navy'
                  }`}
                  onClick={(e) => handleNavClick(view, e)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.08, duration: 0.3 }}
                  aria-current={currentView === view ? 'page' : undefined}
                >
                  <span className="flex-1">{label}</span>
                  <ChevronRight
                    size={15}
                    className={`transition-colors duration-[220ms] ${currentView === view ? 'text-brand-terracotta' : 'text-border group-hover:text-text-muted'}`}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px bg-border mx-3.5 my-2.5" />

            {/* Contact cards */}
            <div className="flex flex-col px-3.5 gap-2">
              <p className="text-[0.65rem] font-bold text-text-muted tracking-[1.4px] uppercase mb-2.5 ml-2">Get in touch</p>
              <a
                href="tel:+917891672762"
                className="flex items-center gap-3 px-3.5 py-[13px] rounded-[14px] border-[1.5px] border-border bg-[rgba(61,64,91,0.02)] no-underline transition-all duration-[220ms] hover:border-brand-terracotta hover:bg-[rgba(224,122,95,0.04)] hover:translate-x-[3px]"
              >
                <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(61,64,91,0.08)]">
                  <Phone size={16} color="var(--brand-navy)" />
                </div>
                <div className="flex flex-col gap-px">
                  <span className="font-[family-name:var(--font-head)] text-[0.875rem] font-bold text-brand-navy">Call Us</span>
                  <span className="text-[0.75rem] text-text-muted font-medium">+91 78916 72762</span>
                </div>
              </a>
              <a
                href="https://wa.me/917891672762"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3.5 py-[13px] rounded-[14px] border-[1.5px] border-border bg-[rgba(61,64,91,0.02)] no-underline transition-all duration-[220ms] hover:border-brand-terracotta hover:bg-[rgba(224,122,95,0.04)] hover:translate-x-[3px]"
              >
                <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(37,211,102,0.12)]">
                  <MessageCircle size={16} color="#25D366" />
                </div>
                <div className="flex flex-col gap-px">
                  <span className="font-[family-name:var(--font-head)] text-[0.875rem] font-bold text-brand-navy">WhatsApp</span>
                  <span className="text-[0.75rem] text-text-muted font-medium">Chat with us instantly</span>
                </div>
              </a>
            </div>

            {/* Footer tag */}
            <div className="mt-auto px-5 py-[18px] border-t border-border text-center text-[0.72rem] text-text-muted font-medium tracking-[0.3px]">
              Kids City — Clothes for Little Explorers ✨
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
