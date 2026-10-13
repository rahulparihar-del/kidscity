import { MapPin, Phone, MessageSquare, Camera, Clock, Navigation, Heart, ArrowRight, Mail, Star, FileSpreadsheet } from 'lucide-react'

const COLLECTIONS = [
  { label: 'Girls Party Wear Pune', view: 'girls-party-wear-pune', path: '/girls-party-wear-pune' },
  { label: 'Boys Party Wear Pune', view: 'boys-party-wear-pune', path: '/boys-party-wear-pune' },
  { label: 'Kids Ethnic & Festival Wear', view: 'kids-ethnic-wear-pune', path: '/kids-ethnic-wear-pune' },
  { label: 'Boys Kurta & Sherwani', view: 'boys-ethnic-wear-pune', path: '/boys-ethnic-wear-pune' },
  { label: 'Kids Birthday Dresses', view: 'birthday-dresses-pune', path: '/birthday-dresses-pune' },
  { label: '100% Cotton Night Suits', view: 'kids-night-suits-pune', path: '/kids-night-suits-pune' },
  { label: 'Baby Clothes 0–2 Years', view: 'baby-clothes-pune', path: '/baby-clothes-pune' },
  { label: 'Kids Daily Cotton Playwear', view: 'kids-daily-wear-pune', path: '/kids-daily-wear-pune' },
]

const QUICK_LINKS = [
  { label: 'Home', view: 'home', path: '/' },
  { label: 'All Collections', view: 'shop', path: '/collections' },
  { label: 'Delivery Across Pune', view: 'kids-clothes-delivery-pune', path: '/kids-clothes-delivery-pune' },
  { label: 'Indian Kids Size Guide', view: 'kids-clothing-size-guide', path: '/kids-clothing-size-guide' },
  { label: 'Customer Reviews (4.9★)', view: 'reviews', path: '/reviews' },
  { label: 'Fashion & Sizing Blog', view: 'blog', path: '/blog' },
  { label: 'About Kids City Wakad', view: 'about', path: '/about' },
  { label: 'Contact & Store Visit', view: 'contact', path: '/contact' },
  { label: 'FAQ', view: 'faq', path: '/faq' },
]

const POLICY_LINKS = [
  { label: 'Privacy Policy', view: 'privacy-policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', view: 'terms', path: '/terms' },
  { label: 'Shipping & Delivery', view: 'shipping-policy', path: '/shipping-policy' },
  { label: 'Return & Exchange', view: 'return-policy', path: '/return-policy' },
]

const SERVICE_AREAS = [
  { name: 'Wakad', view: 'kids-clothes-wakad', path: '/kids-clothes-wakad' },
  { name: 'Hinjewadi', view: 'kids-clothes-hinjewadi', path: '/kids-clothes-hinjewadi' },
  { name: 'Baner', view: 'kids-clothes-baner', path: '/kids-clothes-baner' },
  { name: 'Balewadi', view: 'kids-clothes-balewadi', path: '/kids-clothes-balewadi' },
  { name: 'Aundh', view: 'kids-clothes-aundh', path: '/kids-clothes-aundh' },
  { name: 'Pimple Saudagar', view: 'kids-clothes-pimple-saudagar', path: '/kids-clothes-pimple-saudagar' },
  { name: 'Ravet', view: 'kids-clothes-ravet', path: '/kids-clothes-ravet' },
  { name: 'Tathawade', view: 'kids-clothes-tathawade', path: '/kids-clothes-tathawade' },
]

// Reusable footer link with hover arrow effect
function FootLink({ href, onClick, children }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-1 text-[0.92rem] text-[#B8B2A6] transition-all duration-150 hover:text-white hover:translate-x-1.5"
    >
      <ArrowRight
        size={12}
        className="text-brand-sage opacity-0 -translate-x-2 transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0"
      />
      {children}
    </a>
  )
}

export default function Footer({ onViewChange }) {
  const handleNavClick = (view, e) => {
    e.preventDefault()
    onViewChange(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      className="bg-[#0d1e3d] text-[#E6DFD3] pt-20 pb-10 border-t border-border"
      aria-label="Kids City footer"
    >
      <div className="container">
        {/* Top CTA band */}
        <div className="flex max-[991px]:flex-col justify-between items-center max-[991px]:items-start gap-10 max-[991px]:gap-[30px] border-b border-[rgba(230,223,211,0.12)] pb-12 mb-12">
          <div className="max-w-[600px]">
            <span className="block text-[0.72rem] font-extrabold tracking-[2px] uppercase text-brand-terracotta-light mb-2">
              Visit Store Daily
            </span>
            <h3 className="font-[family-name:var(--font-head)] text-[2rem] font-black text-white leading-[1.25] tracking-[-0.02em] mb-3">
              Bring your little stars to our{' '}
              <span className="font-[family-name:var(--font-serif)] italic font-semibold text-brand-terracotta-light">
                Wakad boutique
              </span>
            </h3>
            <p className="text-[0.95rem] text-[#B8B2A6] leading-[1.6]">
              Explore 500+ premium kids clothing styles — festival wear, birthday dresses, traditional outfits, and everyday casuals for boys &amp; girls aged 0–14 years in Wakad, Pune.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap max-[991px]:w-full">
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
              className="btn btn-wa"
              aria-label="Chat with Kids City Wakad on WhatsApp"
            >
              <MessageSquare size={16} fill="currentColor" strokeWidth={0} /> WhatsApp Chat
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] max-[991px]:grid-cols-2 max-[560px]:grid-cols-1 gap-[50px] max-[991px]:gap-10 max-[560px]:gap-8">
          {/* Brand col */}
          <div className="flex flex-col">
            <a
              href="/"
              onClick={(e) => handleNavClick('home', e)}
              className="inline-flex items-center no-underline"
              aria-label="Kids City Home"
            >
              <img
                src="/images/logo_full.webp"
                alt="Kids City — Best Kids Clothes Shop in Wakad, Pune"
                className="h-[52px] w-auto object-contain block brightness-105"
                loading="lazy"
                width="140"
                height="56"
              />
            </a>
            <p className="text-[0.9rem] text-[#B8B2A6] leading-[1.65] my-4 max-w-[320px]">
              Wakad's most loved children's clothing store since 2018. We handpick high-quality, skin-safe, comfortable, and stylish outfits for boys &amp; girls aged 0–14 years across Pune and Pimpri-Chinchwad.
            </p>

            {/* Google reviews badge */}
            <a
              href="https://www.google.com/maps/dir//Kids+City+Wakad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 mb-5 no-underline transition-colors duration-200 hover:bg-white/[0.09] w-fit"
              aria-label="Kids City has 4.9 star Google rating from 141 reviews"
            >
              <Star size={14} fill="#FBBF24" strokeWidth={0} />
              <span className="font-[family-name:var(--font-head)] text-[0.92rem] font-bold text-[#FBBF24]">4.9</span>
              <span className="font-[family-name:var(--font-body)] text-[0.82rem] text-[#B8B2A6]">· 141+ Google Reviews</span>
            </a>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { href: 'https://instagram.com/kidscity____', icon: Camera, label: 'Kids City Instagram — kids clothing Wakad' },
                { href: 'https://wa.me/917891672762', icon: MessageSquare, label: 'Kids City WhatsApp' },
                { href: 'tel:+917891672762', icon: Phone, label: 'Call Kids City Wakad' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-full bg-white/[0.04] border border-[rgba(230,223,211,0.12)] flex items-center justify-center text-[#E6DFD3] transition-all duration-150 hover:bg-brand-terracotta hover:border-brand-terracotta hover:text-white hover:-translate-y-[3px]"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-[family-name:var(--font-head)] text-[0.88rem] font-extrabold tracking-[1.5px] uppercase text-white mb-6">
              Collections
            </h4>
            <ul className="flex flex-col gap-3">
              {COLLECTIONS.map((c, i) => (
                <li key={i}>
                  <FootLink href={c.path} onClick={(e) => handleNavClick(c.view, e)}>
                    {c.label}
                  </FootLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links + Policies */}
          <div>
            <h4 className="font-[family-name:var(--font-head)] text-[0.88rem] font-extrabold tracking-[1.5px] uppercase text-white mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 mb-5">
              {QUICK_LINKS.map((l, i) => (
                <li key={i}>
                  <FootLink href={l.path} onClick={(e) => handleNavClick(l.view, e)}>
                    {l.label}
                  </FootLink>
                </li>
              ))}
            </ul>
            <h4 className="font-[family-name:var(--font-head)] text-[0.88rem] font-extrabold tracking-[1.5px] uppercase text-white mt-5 mb-6">
              Policies
            </h4>
            <ul className="flex flex-col gap-3">
              {POLICY_LINKS.map((l, i) => (
                <li key={i}>
                  <FootLink href={l.path} onClick={(e) => handleNavClick(l.view, e)}>
                    {l.label}
                  </FootLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="flex flex-col">
            <h4 className="font-[family-name:var(--font-head)] text-[0.88rem] font-extrabold tracking-[1.5px] uppercase text-white mb-6">
              Visit Us
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-start text-[0.9rem] text-[#B8B2A6] leading-[1.5]">
                <MapPin size={16} className="text-brand-terracotta-light shrink-0 mt-0.5" />
                <address
                  style={{ fontStyle: 'normal', margin: 0, padding: 0 }}
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, beside Annapurna Veg Restaurant, Wakad</span>,{' '}
                  <span itemProp="addressLocality">Pune</span>,{' '}
                  <span itemProp="addressRegion">Maharashtra</span>{' '}
                  <span itemProp="postalCode">411057</span>
                </address>
              </div>
              <a href="tel:+917891672762" className="flex gap-3 items-start text-[0.9rem] text-[#B8B2A6] leading-[1.5] no-underline transition-colors duration-150 hover:text-white" aria-label="Call Kids City Wakad">
                <Phone size={16} className="text-brand-terracotta-light shrink-0 mt-0.5" />
                <span>+91 78916 72762</span>
              </a>
              <a href="mailto:kidscitywakad@gmail.com" className="flex gap-3 items-start text-[0.9rem] text-[#B8B2A6] leading-[1.5] no-underline transition-colors duration-150 hover:text-white" aria-label="Email Kids City Wakad">
                <Mail size={16} className="text-brand-terracotta-light shrink-0 mt-0.5" />
                <span>kidscitywakad@gmail.com</span>
              </a>
              <div className="flex gap-3 items-start text-[0.9rem] text-[#B8B2A6] leading-[1.5]">
                <Clock size={16} className="text-brand-terracotta-light shrink-0 mt-0.5" />
                <span>Open Daily: 10:00 AM – 9:30 PM</span>
              </div>
            </div>

            {/* Service areas */}
            <div className="mt-6 p-4 bg-white/[0.04] rounded-[10px] border border-white/[0.06]">
              <h5 className="font-[family-name:var(--font-head)] text-[0.72rem] font-extrabold tracking-[1.5px] uppercase text-brand-terracotta-light mb-2">
                Pune Delivery Areas
              </h5>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[0.82rem]">
                {SERVICE_AREAS.map((a, i) => (
                  <span key={a.name}>
                    <a
                      href={a.path}
                      onClick={(e) => handleNavClick(a.view, e)}
                      className="text-[#B8B2A6] hover:text-white transition-colors"
                    >
                      {a.name}
                    </a>
                    {i < SERVICE_AREAS.length - 1 && <span className="text-[#8E887E]/60 ml-2">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-[rgba(230,223,211,0.08)] mt-[60px] pt-[30px] flex max-md:flex-col max-md:text-center justify-between items-center gap-4 text-[0.8rem] text-[#8E887E] flex-wrap">
          <p>© 2026 Kids City Wakad, Pune. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <Heart size={12} fill="currentColor" strokeWidth={0} className="text-brand-terracotta-light" /> in Wakad, Pune
          </div>
          <a
            href="https://www.google.com/maps/dir//Kids+City+Wakad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline font-semibold transition-colors duration-150 hover:text-brand-terracotta-light"
            aria-label="Find Kids City on Google Maps"
          >
            Locate on Google Maps
          </a>
          <a
            href="/callback-sheet"
            onClick={(e) => handleNavClick('callback-sheet', e)}
            className="text-[#8E887E] opacity-[0.35] transition-all duration-200 inline-flex items-center ml-1.5 cursor-pointer hover:opacity-100 hover:text-white"
            aria-label="Console Dashboard"
            title="Console Dashboard"
          >
            <FileSpreadsheet size={13} className="align-middle" />
          </a>
        </div>
      </div>
    </footer>
  )
}
