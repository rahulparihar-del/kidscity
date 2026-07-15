import { Star } from 'lucide-react'

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Premium Quality',
    desc: "Soft, safe, skin-friendly fabrics carefully selected for your child's comfort and style.",
    color: 'linear-gradient(135deg, #f5a623, #e8820a)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm-1 13H9V8h2v8zm4 0h-2V8h2v8z"/>
        <path d="M7 2h10v2H7zm0 18h10v2H7z"/>
      </svg>
    ),
    title: '500+ Styles',
    desc: 'An unmatched variety — from traditional kurtas to trendy western wear across all age groups.',
    color: 'linear-gradient(135deg, #545778, #00A8E8)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.07 15.93 0 13.36 0c-1.34 0-2.5.56-3.36 1.44L9 3 7.99 1.44C7.14.56 5.98 0 4.64 0 2.07 0 0 2.07 0 4.64c0 .48.1.92.18 1.36H0v2h20V6zM9 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 8v12h20V8H2z"/>
      </svg>
    ),
    title: 'New Every Week',
    desc: "Fresh collections arrive weekly so you'll always find something new and exciting.",
    color: 'linear-gradient(135deg, #32CD32, #228B22)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
    ),
    title: 'Personal Service',
    desc: 'Our friendly staff helps every family find the perfect outfit — in store, every day.',
    color: 'linear-gradient(135deg, #00BFFF, #0080c0)',
  },
]

export default function WhyUs() {
  return (
    <section id="why" className="py-24 max-[900px]:py-[60px] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-white z-0" />

      <div className="container relative z-10 grid grid-cols-2 max-[900px]:grid-cols-1 gap-20 max-[900px]:gap-10 items-center">
        {/* Left */}
        <div>
          <span className="section-label" style={{ color: 'var(--brand-terracotta)' }}>Why Choose Us</span>
          <h2 className="font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-[clamp(1.9rem,3vw,2.8rem)] text-brand-navy leading-[1.2] mb-4">
            Why <span className="serif-accent">Wakad &amp; Pune</span> Parents Choose Kids City
          </h2>
          <p className="text-base text-text-mid leading-[1.75] mb-9 font-medium">
            Kids City has been Wakad's most trusted children's clothing store since 2018 — night suits, festive wear, birthday dresses and more. Serving families from Hinjewadi, Baner, Pimple Saudagar, and across Pune, because every visit feels personal and every outfit feels perfect.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 max-[900px]:gap-6 max-[480px]:flex-wrap max-[480px]:gap-4 mb-9">
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-0.5 font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-[2rem] text-brand-orange leading-none">
                4.9<Star size={16} fill="currentColor" strokeWidth={0} className="inline" />
              </span>
              <span className="text-[0.73rem] font-bold text-text-muted uppercase tracking-[0.5px] mt-1">Google Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-[2rem] text-brand-orange leading-none">500+</span>
              <span className="text-[0.73rem] font-bold text-text-muted uppercase tracking-[0.5px] mt-1">Happy Parents</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-[2rem] text-brand-orange leading-none">#1</span>
              <span className="text-[0.73rem] font-bold text-text-muted uppercase tracking-[0.5px] mt-1">In Wakad</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap max-[480px]:flex-col gap-3.5">
            <a href="https://www.google.com/maps/dir//Kids+City" className="btn btn-gold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Visit Our Store
            </a>
            <a href="tel:+917891672762" className="btn btn-outline-navy max-[480px]:w-full max-[480px]:justify-center">
              Call: +91 78916 72762
            </a>
          </div>
        </div>

        {/* Right — feature cards */}
        <div className="flex flex-col gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex gap-[18px] max-[480px]:gap-3.5 items-start bg-white border border-border rounded-[24px] p-[22px_20px] max-[480px]:p-[18px_16px] shadow-[0_4px_12px_rgba(61,64,91,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(61,64,91,0.12)]"
            >
              <div
                className="w-12 h-12 max-[480px]:w-[42px] max-[480px]:h-[42px] rounded-[14px] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                style={{ background: f.color }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-head)] font-extrabold tracking-[-0.02em] text-[1.05rem] text-brand-navy mb-1.5">
                  {f.title}
                </h3>
                <p className="text-[0.87rem] text-text-mid font-medium leading-[1.55]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
