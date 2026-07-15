import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSiteImages } from '../hooks/useSiteImages'

const CATEGORY_DEFS = [
  {
    id: 1,
    imageKey: 'category_festival',
    defaultImg: '/images/festival_wear.webp',
    label: 'Festival Season',
    sublabel: 'Navratri · Diwali · Eid',
    badge: 'New Arrivals',
    badgeColor: 'var(--brand-orange)',
    glowColor: 'var(--brand-orange-glow)',
    borderColor: 'var(--brand-orange)',
  },
  {
    id: 2,
    imageKey: 'category_birthday',
    defaultImg: '/images/birthday_dress.webp',
    label: 'Birthday Special',
    sublabel: 'Princess & Party Wear',
    badge: 'Trending',
    badgeColor: 'var(--brand-pink)',
    glowColor: 'var(--brand-pink-glow)',
    borderColor: 'var(--brand-pink)',
  },
  {
    id: 3,
    imageKey: 'category_casual',
    defaultImg: '/images/casual_boys.webp',
    label: 'Boys Casual',
    sublabel: 'Everyday Comfort',
    badge: 'Best Seller',
    badgeColor: 'var(--brand-blue)',
    glowColor: 'var(--brand-blue-glow)',
    borderColor: 'var(--brand-blue)',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 15 } },
}

export default function CategoryGrid({ onViewChange }) {
  const { images } = useSiteImages()

  const CATEGORIES = CATEGORY_DEFS.map(cat => ({
    ...cat,
    img: images[cat.imageKey] || cat.defaultImg,
  }))

  const handleCategoryClick = (e) => {
    e.preventDefault()
    if (onViewChange) {
      onViewChange('shop')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section id="categories" className="py-[120px] max-md:py-20 max-[480px]:py-[60px] bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full top-[-100px] left-[-150px]"
          style={{ background: 'radial-gradient(circle, rgba(0,168,232,0.05) 0%, transparent 70%)' }} />
        <div className="absolute w-[550px] h-[550px] rounded-full bottom-[-150px] right-[-100px]"
          style={{ background: 'radial-gradient(circle, rgba(255,75,114,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-[480px]:mb-10 relative z-[2]"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="section-label">Shop by Collection</span>
          <h2 className="section-heading">Curated for Every <span className="serif-accent">Occasion</span></h2>
          <p className="font-[family-name:var(--font-body)] text-[1.1rem] max-[480px]:text-[0.95rem] text-text-mid max-w-[580px] mx-auto mt-4 leading-[1.7] font-medium">
            Discover handpicked luxury styles. From vibrant festivals to birthday blowouts and casual play, find the perfect fit.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-3 max-md:grid-cols-1 gap-[30px] max-[991px]:gap-5 max-md:max-w-[420px] max-md:mx-auto max-[480px]:max-w-full max-[480px]:gap-6 relative z-[2]"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {CATEGORIES.map(cat => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              className="group relative h-[490px] max-[991px]:h-[440px] max-md:h-[480px] max-[480px]:h-[410px] rounded-[200px_200px_24px_24px] max-[991px]:rounded-[170px_170px_20px_20px] max-md:rounded-[190px_190px_24px_24px] max-[480px]:rounded-[160px_160px_20px_20px] overflow-hidden cursor-pointer flex flex-col justify-end border-[1.5px] border-border bg-white shadow-[0_4px_12px_rgba(61,64,91,0.05)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3"
              style={{
                '--hover-glow-color': cat.glowColor,
                '--hover-border-color': cat.borderColor,
              }}
              onClick={handleCategoryClick}
            >
              {/* Image wrapper */}
              <div className="absolute inset-0 w-full h-full rounded-[200px_200px_0_0] overflow-hidden z-[1]">
                <img
                  src={cat.img}
                  alt={`${cat.label} kids clothing — ${cat.sublabel} at Kids City Wakad, Pune`}
                  className="w-full h-full object-cover object-[center_15%] transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 z-[2] transition-opacity duration-[400ms] group-hover:opacity-[0.85]"
                  style={{ background: 'linear-gradient(to top, rgba(61,64,91,0.45) 0%, rgba(61,64,91,0.1) 40%, transparent 100%)' }}
                />
              </div>

              {/* Glassmorphic footer card */}
              <div className="relative z-[3] px-5 pt-6 pb-6 max-[480px]:px-4 max-[480px]:pt-5 max-[480px]:pb-5 flex flex-col items-center text-center bg-[rgba(253,251,247,0.88)] backdrop-blur-[16px] border-t-[1.5px] border-white/60 mx-4 mb-4 max-[480px]:mx-3 max-[480px]:mb-3 rounded-[16px] shadow-[0_8px_30px_rgba(61,64,91,0.04)] transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-white group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_rgba(61,64,91,0.08)]">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[0.68rem] font-extrabold text-white uppercase tracking-[1.2px] mb-3 shadow-[0_4px_10px_rgba(0,0,0,0.04)]"
                  style={{ background: cat.badgeColor }}
                >
                  {cat.badge}
                </span>
                <div className="mb-3.5">
                  <h3 className="font-[family-name:var(--font-head)] font-extrabold text-[1.45rem] max-[991px]:text-[1.25rem] max-[480px]:text-[1.2rem] text-brand-navy tracking-[-0.02em] mb-1 leading-[1.25]">
                    {cat.label}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-[0.84rem] max-[480px]:text-[0.8rem] text-text-mid font-medium tracking-[0.1px]">
                    {cat.sublabel}
                  </p>
                </div>
                <span className="font-[family-name:var(--font-kids)] text-[0.82rem] font-bold text-brand-terracotta inline-flex items-center gap-1.5 group-hover:text-brand-terracotta-light transition-colors duration-300">
                  Explore Collection
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
