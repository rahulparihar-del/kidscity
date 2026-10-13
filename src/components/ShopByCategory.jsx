import { Sparkles, Shirt, PartyPopper, Cake, Baby, Snowflake } from 'lucide-react'

const CATS = [
  { icon: Sparkles,    label: 'Girls Party',   sub: 'Frocks & Gowns', slug: 'girls-party-wear-pune' },
  { icon: Shirt,       label: 'Boys Party',    sub: 'Casuals & Shirts', slug: 'boys-party-wear-pune' },
  { icon: PartyPopper, label: 'Festival Wear', sub: 'Lehengas & Kurtas', slug: 'kids-ethnic-wear-pune' },
  { icon: Cake,        label: 'Birthday',      sub: 'Special Gowns', slug: 'birthday-dresses-pune' },
  { icon: Baby,        label: 'Baby 0–2y',     sub: 'Rompers & Co-Ords', slug: 'baby-clothes-pune' },
  { icon: Snowflake,   label: 'Night Suits',   sub: '100% Soft Cotton', slug: 'kids-night-suits-pune' },
]

export default function ShopByCategory({ onViewChange }) {
  return (
    <section className="py-[72px] max-sm:py-[52px] bg-white border-t border-b border-border">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-11 max-sm:mb-7">
          <span className="section-label">Browse</span>
          <h2 className="section-heading">Shop by <span className="serif-accent">Category</span></h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-6 max-[900px]:grid-cols-3 max-[480px]:grid-cols-2 gap-4 max-[480px]:gap-2.5">
          {CATS.map((c, i) => {
            const Icon = c.icon
            return (
              <a
                key={i}
                href={`/${c.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  if (onViewChange) onViewChange(c.slug)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group flex flex-col items-center gap-2.5 no-underline cursor-pointer p-5 px-2.5 rounded-[24px] border-[1.5px] border-border transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(61,64,91,0.12)] hover:border-brand-green-light"
                aria-label={`Shop ${c.label} in Pune`}
              >
                <div className="w-16 h-16 max-[480px]:w-[52px] max-[480px]:h-[52px] rounded-[18px] bg-white flex items-center justify-center transition-colors duration-200 border-[1.5px] border-border group-hover:bg-brand-navy group-hover:border-brand-navy">
                  <Icon
                    className="text-brand-navy group-hover:text-white leading-none transition-colors duration-200"
                    size={26}
                    strokeWidth={1.8}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-base text-brand-navy text-center">
                  {c.label}
                </h3>
                <p className="text-[0.73rem] text-text-muted font-semibold text-center leading-[1.3]">
                  {c.sub}
                </p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
