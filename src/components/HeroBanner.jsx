import { motion } from 'framer-motion'
import heroImage from '../assets/herosection/removebg_image/desktop_hero.webp'
import mobileHeroImage from '../assets/herosection/mobile_hero/mobile_hero.webp'
import tabletHeroImage from '../assets/herosection/tablet_hero/tablet_hero.webp'

export default function HeroBanner({ onViewChange }) {
  const handleBrowseClick = () => {
    onViewChange('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-white"
      style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}
    >
      {/* Gradient overlay — fades into white at top so text stays readable */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none z-[2]"
        style={{
          height: '70%',
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.97) 30%, rgba(255,255,255,0.85) 55%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* Centred text content */}
      <div className="relative z-[3] flex flex-col items-center text-center px-6 pt-4 max-w-[1200px] mx-auto w-full">
        {/* Trust badge */}
        <motion.div
          className="font-[family-name:var(--font-body)] text-[0.82rem] font-semibold text-brand-navy tracking-[0.01em] mb-3 px-[18px] py-2 bg-white/80 border-[1.5px] border-[rgba(61,64,91,0.12)] rounded-full backdrop-blur-sm inline-flex items-center gap-1.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-brand-terracotta text-[0.9rem]">✦</span>
          Wakad's Loved Kids Wear Store • 4.9★ Rated
        </motion.div>

        {/* H1 */}
        <motion.h1
          className="font-[family-name:var(--font-head)] font-extrabold text-brand-navy-dark tracking-[-0.02em] text-center leading-[1.15] mb-2"
          style={{ fontSize: 'clamp(2rem, 5.2vw, 3.2rem)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Best Kids Clothes Shop in Wakad<br />
          <span className="font-[family-name:var(--font-serif)] italic font-bold text-brand-terracotta">Premium Outfits in Pune</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-[family-name:var(--font-body)] text-[#6b7280] leading-[1.55] mb-3.5 font-normal text-center max-w-[480px]"
          style={{ fontSize: 'clamp(0.88rem, 1.4vw, 1rem)' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Wakad's trusted boutique for skin-safe cotton night suits, baby wear, &amp; traditional festival outfits in Pune.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex gap-3 justify-center flex-wrap max-md:flex-col max-md:w-full max-md:gap-2.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={handleBrowseClick}
            className="bg-brand-navy-dark text-white border-none rounded-full px-[30px] py-3 font-[family-name:var(--font-body)] text-[0.9rem] font-semibold cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-[#1a1c2e] hover:-translate-y-px hover:shadow-[0_4px_18px_rgba(44,46,67,0.25)] max-md:w-full max-md:text-center max-md:min-h-[46px]"
          >
            Shop Collections →
          </button>
          <button
            onClick={() => { onViewChange('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="bg-white/85 text-brand-navy-dark border-[1.5px] border-[rgba(44,46,67,0.2)] rounded-full px-[30px] py-3 font-[family-name:var(--font-body)] text-[0.9rem] font-semibold cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-sm hover:border-brand-navy-dark hover:bg-white hover:-translate-y-px max-md:w-full max-md:text-center max-md:min-h-[46px]"
          >
            Visit Store
          </button>
        </motion.div>
      </div>

      {/* Desktop hero image */}
      <img
        src={heroImage}
        alt="Kids City Boutique Wakad Pune — Premium children clothing store"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-auto max-h-[76%] object-contain object-bottom z-[1] block max-md:hidden min-[768px]:max-[1024px]:hidden"
        loading="eager"
        fetchPriority="high"
      />
      {/* Mobile hero image */}
      <img
        src={mobileHeroImage}
        alt="Kids City Boutique Wakad Pune"
        className="hidden max-md:block relative w-full h-auto aspect-square object-contain z-[1] -mt-4"
        loading="eager"
      />
      {/* Tablet hero image */}
      <img
        src={tabletHeroImage}
        alt="Kids City Boutique Wakad Pune"
        className="hidden min-[768px]:max-[1024px]:block absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-auto max-h-[64%] object-contain object-bottom z-[1]"
        loading="eager"
      />
    </section>
  )
}
