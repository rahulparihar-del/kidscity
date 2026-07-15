import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'

export default function NotFoundView({ onViewChange }) {
  const handleHome = (e) => {
    e.preventDefault()
    onViewChange('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleShop = (e) => {
    e.preventDefault()
    onViewChange('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-20">
      <div className="container">
        <motion.div
          className="text-center max-w-[560px] mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Illustration */}
          <div className="relative inline-block mb-6">
            <span className="font-[family-name:var(--font-head)] text-[9rem] font-black text-border leading-none block tracking-[-4px]">
              404
            </span>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem]">
              🧒
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.8rem,3.5vw,2.4rem)] font-extrabold text-brand-navy-dark mb-4">
            Page Not Found
          </h1>
          <p className="font-[family-name:var(--font-body)] text-base text-text-mid leading-[1.7] mb-7">
            Oops! It looks like this page went off to play. Don't worry — Kids City Wakad still has 500+ amazing kids outfits waiting for you!
          </p>

          {/* Actions */}
          <div className="flex gap-3.5 justify-center flex-wrap mb-10">
            <a href="/" onClick={handleHome} className="btn btn-terracotta">
              <Home size={16} /> Back to Home
            </a>
            <a href="/collections" onClick={handleShop} className="btn btn-outline-navy">
              <Search size={16} /> Browse Collections
            </a>
          </div>

          {/* Help text */}
          <div>
            <p className="font-[family-name:var(--font-head)] text-[0.9rem] font-semibold text-text-muted uppercase tracking-[0.06em] mb-3">
              Looking for something specific?
            </p>
            <ul className="list-none p-0 flex flex-col gap-2">
              {[
                { href: '/collections', label: '🎉 Festival Wear for Kids in Wakad', handler: handleShop },
                { href: '/collections', label: '🎂 Birthday Dresses Pune', handler: handleShop },
                { href: '/collections', label: '🛕 Traditional Kids Wear Pune', handler: handleShop },
                {
                  href: '/contact',
                  label: '📞 Contact Kids City Wakad',
                  handler: (e) => { e.preventDefault(); onViewChange('contact'); window.scrollTo({ top: 0 }) }
                },
              ].map(({ href, label, handler }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={handler}
                    className="block py-2.5 px-5 bg-white border border-border rounded-[10px] font-[family-name:var(--font-body)] text-[0.92rem] text-brand-navy no-underline transition-all duration-200 hover:bg-brand-terracotta hover:text-white hover:border-brand-terracotta hover:-translate-y-px"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
