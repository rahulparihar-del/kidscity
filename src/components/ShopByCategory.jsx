import { Sparkles, Shirt, PartyPopper, Cake, Baby, Snowflake } from 'lucide-react'

const CATS = [
  { icon: Sparkles,    label: 'Girls',    sub: 'Frocks & Dresses' },
  { icon: Shirt,       label: 'Boys',     sub: 'Casuals & Ethnic' },
  { icon: PartyPopper, label: 'Festival', sub: 'Traditional Wear' },
  { icon: Cake,        label: 'Birthday', sub: 'Party Collection' },
  { icon: Baby,        label: 'Baby',     sub: '0–2 Years' },
  { icon: Snowflake,   label: 'Winter',   sub: 'Warm & Cozy' },
]

export default function ShopByCategory() {
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
                href="#featured"
                className="group flex flex-col items-center gap-2.5 no-underline cursor-pointer p-5 px-2.5 rounded-[24px] border-[1.5px] border-border transition-all duration-[220ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(61,64,91,0.12)] hover:border-brand-green-light"
                aria-label={`Shop ${c.label}`}
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
