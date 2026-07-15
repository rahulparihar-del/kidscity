import { motion } from 'framer-motion'
import { MapPin, Star, Heart, Users, Award } from 'lucide-react'

const MILESTONES = [
  { year: '2018', title: 'Store Founded', desc: "Kids City opened its doors at Mahalaxmi Complex, Wakad, Pune — starting with a small but curated collection of kids wear." },
  { year: '2020', title: 'Growing Family', desc: "Expanded our collection to 300+ styles, becoming Wakad's go-to destination for festival and traditional kids clothing." },
  { year: '2022', title: 'Loved by 100+ Families', desc: "Crossed 100 Google reviews with a 4.9★ rating — proof that Pune parents trust Kids City for quality and variety." },
  { year: '2024', title: '500+ Styles', desc: "Curated over 500 premium styles spanning festival wear, casual, birthday, traditional, and western kids clothing." },
]

const VALUES = [
  {
    icon: <Star size={22} fill="white" strokeWidth={0} />,
    title: 'Premium Quality',
    desc: "Every garment is hand-selected for fabric safety, durability, and comfort — because your child's skin deserves the best.",
    gradient: 'linear-gradient(135deg, #FF9F1C, #e8820a)',
  },
  {
    icon: <Heart size={22} fill="white" strokeWidth={0} />,
    title: 'Loved by Pune Parents',
    desc: 'Serving over 135 happy families from Wakad, Hinjewadi, Baner, Balewadi and across Pune with a 4.9★ Google rating.',
    gradient: 'linear-gradient(135deg, #E07A5F, #c04a2f)',
  },
  {
    icon: <Users size={22} fill="white" strokeWidth={0} />,
    title: 'Friendly Personal Service',
    desc: "Our staff knows children's fashion — we help every parent find the perfect outfit for every occasion, in store, every day.",
    gradient: 'linear-gradient(135deg, #3D405B, #2C2E43)',
  },
  {
    icon: <Award size={22} fill="white" strokeWidth={0} />,
    title: "Wakad's #1 Kids Store",
    desc: "Consistently ranked as the best children's clothing store in Wakad, Pimpri-Chinchwad and Hinjewadi area.",
    gradient: 'linear-gradient(135deg, #2EC4B6, #1a8f87)',
  },
]

const SERVICE_AREAS = [
  'Wakad', 'Hinjewadi', 'Baner', 'Balewadi', 'Pimple Saudagar',
  'Ravet', 'Tathawade', 'Pimpri', 'Chinchwad', 'Aundh', 'Pune'
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function AboutView({ onViewChange }) {
  const handleContact = (e) => {
    e.preventDefault()
    onViewChange('contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="bg-white border-b border-border pt-[120px] pb-[60px] text-center relative overflow-hidden">
        <div className="container">
          <motion.span className="section-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            Our Story
          </motion.span>
          <motion.h1
            className="font-[family-name:var(--font-head)] text-[clamp(2rem,4vw,2.8rem)] font-extrabold text-brand-navy-dark my-3 max-w-[760px] mx-auto leading-[1.2] relative"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            About <span className="serif-accent">Kids City</span> — Wakad's Most Loved Kids Clothes Shop
          </motion.h1>
          <motion.p
            className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid max-w-[560px] mt-3 mx-auto leading-[1.7] relative"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium children's clothing for boys and girls aged 0–14 years. Serving families across Wakad, Pune, and Hinjewadi since 2018.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="grid grid-cols-[480px_1fr] max-[1024px]:grid-cols-[400px_1fr] max-[860px]:grid-cols-1 gap-16 max-[1024px]:gap-12 max-[860px]:gap-10 items-center"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {/* Founder image */}
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_24px_64px_rgba(61,64,91,0.18),0_4px_16px_rgba(61,64,91,0.1)] aspect-[4/5] shrink-0 group">
              <img
                src="/images/founder-kids-city-wakad.jpg"
                alt="Founder of Kids City Wakad — the person behind Pune's best kids clothes shop"
                className="w-full h-full object-cover object-top block transition-transform duration-[600ms] group-hover:scale-[1.03]"
                loading="lazy"
                width="560"
                height="700"
              />
              {/* Gradient overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: '45%', background: 'linear-gradient(to top, rgba(61,64,91,0.65) 0%, transparent 100%)' }}
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-[16px] px-5 py-3.5 flex flex-col gap-0.5 z-[2] shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                <span className="font-[family-name:var(--font-head)] text-[2rem] font-black text-brand-terracotta leading-none">2018</span>
                <span className="font-[family-name:var(--font-body)] text-[0.78rem] font-semibold text-brand-navy uppercase tracking-[0.06em]">
                  Founded in Wakad
                </span>
              </div>
            </div>

            {/* Story text */}
            <div className="flex flex-col">
              <span className="section-label" style={{ color: 'var(--brand-terracotta)' }}>The Person Behind Kids City</span>
              <h2 className="font-[family-name:var(--font-head)] text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold text-brand-navy-dark mt-2.5 mb-5 leading-[1.2]">
                Wakad's Premier <span className="serif-accent">Children's Clothing</span> Store — Built with Passion
              </h2>
              {[
                "Kids City was born in 2018 from a simple belief: every child in Pune deserves to wear clothing that is comfortable, skin-safe, and beautifully styled — without compromise. What started as a small boutique in Mahalaxmi Complex, Wakad has grown into the area's most trusted and loved children's fashion destination.",
                "Located at <strong>Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad</strong> (beside Annapurna Veg Restaurant), Kids City is easily accessible to families across Hinjewadi, Baner, Balewadi, Pimple Saudagar, and all of Pimpri-Chinchwad.",
                "Our store carries <strong>500+ carefully curated styles</strong> — from vibrant Navratri lehengas and Diwali kurtas to birthday princess dresses, casual denim sets, and everyday wear. Every garment is hand-selected for fabric safety, durability, and child-friendly design.",
                "With a <strong>4.9★ Google rating from 135+ Pune families</strong>, Kids City isn't just a shop — it's a trusted partner for every milestone in your child's life, from first birthdays to school functions and festival seasons.",
              ].map((para, i) => (
                <p key={i} className="font-[family-name:var(--font-body)] text-base text-text-mid leading-[1.75] mb-3.5" dangerouslySetInnerHTML={{ __html: para }} />
              ))}

              {/* Stats */}
              <div className="grid grid-cols-4 max-[600px]:grid-cols-2 gap-3 my-6 p-5 bg-white border border-border rounded-[16px]">
                {[
                  { num: '4.9', label: 'Google Rating', star: true },
                  { num: '135+', label: 'Happy Families' },
                  { num: '500+', label: 'Styles' },
                  { num: '8yrs', label: 'In Wakad' },
                ].map(({ num, label, star }) => (
                  <div key={label} className="text-center">
                    <span className="block font-[family-name:var(--font-head)] text-[1.4rem] font-extrabold text-brand-navy-dark leading-[1.1] mb-1">
                      {num}{star && <Star size={15} fill="var(--brand-orange)" strokeWidth={0} className="inline align-middle ml-[3px]" />}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[0.72rem] text-text-muted font-medium uppercase tracking-[0.05em]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3.5 flex-wrap mt-1">
                <a href="https://www.google.com/maps/dir//Kids+City+Wakad" target="_blank" rel="noopener noreferrer" className="btn btn-terracotta">
                  <MapPin size={16} /> Visit Us in Wakad
                </a>
                <a href="#contact" onClick={handleContact} className="btn btn-outline-navy">
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container">
          <motion.div className="text-center max-w-[640px] mx-auto mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-label">Our Values</span>
            <h2 className="font-[family-name:var(--font-head)] text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold text-brand-navy-dark mt-2.5 mb-0 leading-[1.2]">
              Why <span className="serif-accent">Wakad &amp; Pune Parents</span> Choose Kids City
            </h2>
          </motion.div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-[18px] p-7 shadow-[0_2px_16px_rgba(61,64,91,0.07)] border border-border"
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5} viewport={{ once: true }}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                  style={{ background: v.gradient }}
                >
                  {v.icon}
                </div>
                <h3 className="font-[family-name:var(--font-head)] text-base font-bold text-brand-navy-dark mb-2">{v.title}</h3>
                <p className="font-[family-name:var(--font-body)] text-[0.9rem] text-text-mid leading-[1.65]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container">
          <motion.div className="text-center max-w-[640px] mx-auto mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-label">Our Journey</span>
            <h2 className="font-[family-name:var(--font-head)] text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold text-brand-navy-dark mt-2.5 leading-[1.2]">
              <span className="serif-accent">Growing</span> with Wakad's Families
            </h2>
          </motion.div>
          <div className="flex flex-col max-w-[720px] mx-auto relative before:content-[''] before:absolute before:left-[72px] before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-brand-terracotta before:to-brand-navy before:opacity-25">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                className="flex gap-7 items-start py-6"
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5} viewport={{ once: true }}
              >
                <div className="font-[family-name:var(--font-head)] text-[0.95rem] font-extrabold text-brand-terracotta min-w-[56px] text-right pt-1 shrink-0">
                  {m.year}
                </div>
                <div className="bg-white rounded-[14px] px-6 py-5 shadow-[0_2px_12px_rgba(61,64,91,0.07)] border border-border flex-1">
                  <h3 className="font-[family-name:var(--font-head)] text-base font-bold text-brand-navy-dark mb-1.5">{m.title}</h3>
                  <p className="font-[family-name:var(--font-body)] text-[0.9rem] text-text-mid leading-[1.65]">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container">
          <motion.div className="text-center max-w-[640px] mx-auto mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="section-label">Service Area</span>
            <h2 className="font-[family-name:var(--font-head)] text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold text-brand-navy-dark mt-2.5 leading-[1.2]">
              Serving Families Across <span className="serif-accent">Pune &amp; Pimpri-Chinchwad</span>
            </h2>
            <p className="font-[family-name:var(--font-body)] text-base text-text-mid max-w-[580px] mt-3 mx-auto leading-[1.7]">
              Kids City is your neighborhood kids wear store — easily reachable from all these areas in Pune and Pimpri-Chinchwad:
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {SERVICE_AREAS.map((area, i) => (
              <motion.span
                key={i}
                className="group inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-border rounded-full font-[family-name:var(--font-body)] text-[0.88rem] font-medium text-brand-navy shadow-[0_1px_6px_rgba(61,64,91,0.06)] transition-all duration-200 cursor-default hover:bg-brand-terracotta hover:text-white hover:border-brand-terracotta hover:-translate-y-px"
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.2} viewport={{ once: true }}
              >
                <MapPin size={12} className="text-brand-terracotta group-hover:text-white transition-colors" /> {area}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="bg-gradient-to-br from-brand-navy-dark to-brand-navy rounded-[24px] px-12 max-[600px]:px-6 py-14 text-center"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-head)] text-[clamp(1.6rem,3.5vw,2.2rem)] font-extrabold text-white mb-3.5">
              Visit Kids City in <span className="serif-accent">Wakad</span> Today
            </h2>
            <p className="font-[family-name:var(--font-body)] text-base text-white/75 max-w-[500px] mx-auto mb-7 leading-[1.7]">
              Come see 500+ kids clothing styles for boys and girls aged 0–14 years. Open every day at Mahalaxmi Complex, Wakad, Pune.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <a href="https://www.google.com/maps/dir//Kids+City+Wakad" target="_blank" rel="noopener noreferrer" className="btn btn-terracotta">
                Get Directions
              </a>
              <a href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20want%20to%20know%20more%20about%20your%20store." target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
