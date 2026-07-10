import { motion } from 'framer-motion'
import { MapPin, Star, Heart, Users, Award, Clock } from 'lucide-react'
import styles from './AboutView.module.css'

const MILESTONES = [
  { year: '2018', title: 'Store Founded', desc: 'Kids City opened its doors at Mahalaxmi Complex, Wakad, Pune — starting with a small but curated collection of kids wear.' },
  { year: '2020', title: 'Growing Family', desc: 'Expanded our collection to 300+ styles, becoming Wakad\'s go-to destination for festival and traditional kids clothing.' },
  { year: '2022', title: 'Loved by 100+ Families', desc: 'Crossed 100 Google reviews with a 4.9★ rating — proof that Pune parents trust Kids City for quality and variety.' },
  { year: '2024', title: '500+ Styles', desc: 'Curated over 500 premium styles spanning festival wear, casual, birthday, traditional, and western kids clothing.' },
]

const VALUES = [
  {
    icon: <Star size={22} fill="white" strokeWidth={0} />,
    title: 'Premium Quality',
    desc: 'Every garment is hand-selected for fabric safety, durability, and comfort — because your child\'s skin deserves the best.',
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
    desc: 'Our staff knows children\'s fashion — we help every parent find the perfect outfit for every occasion, in store, every day.',
    gradient: 'linear-gradient(135deg, #3D405B, #2C2E43)',
  },
  {
    icon: <Award size={22} fill="white" strokeWidth={0} />,
    title: 'Wakad\'s #1 Kids Store',
    desc: 'Consistently ranked as the best children\'s clothing store in Wakad, Pimpri-Chinchwad and Hinjewadi area.',
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
    <div className={styles.aboutPage}>
      {/* Hero Banner */}
      <div className={styles.banner}>
        <div className="container">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          >
            Our Story
          </motion.span>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            About <span className="serif-accent">Kids City</span> — Wakad's Most Loved Kids Clothes Shop
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium children's clothing for boys and girls aged 0–14 years. Serving families across Wakad, Pune, and Hinjewadi since 2018.
          </motion.p>
        </div>
      </div>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className="container">
          {/* ── Founder Hero ── */}
          <motion.div
            className={styles.founderHero}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            {/* Left: full-bleed founder photo */}
            <div className={styles.founderImgWrap}>
              <img
                src="/images/founder-kids-city-wakad.jpg"
                alt="Founder of Kids City Wakad — the person behind Pune's best kids clothes shop"
                className={styles.founderImg}
                loading="lazy"
                width="560"
                height="700"
              />
              {/* Floating badge on photo */}
              <div className={styles.founderBadge}>
                <span className={styles.founderBadgeNum}>2018</span>
                <span className={styles.founderBadgeLabel}>Founded in Wakad</span>
              </div>
            </div>

            {/* Right: story text */}
            <div className={styles.founderText}>
              <span className="section-label" style={{ color: 'var(--brand-terracotta)' }}>The Person Behind Kids City</span>
              <h2 className={styles.sectionHeading}>
                Wakad's Premier <span className="serif-accent">Children's Clothing</span> Store — Built with Passion
              </h2>
              <p className={styles.storyPara}>
                Kids City was born in 2018 from a simple belief: every child in Pune deserves to wear clothing that is comfortable, skin-safe, and beautifully styled — without compromise. What started as a small boutique in Mahalaxmi Complex, Wakad has grown into the area's most trusted and loved children's fashion destination.
              </p>
              <p className={styles.storyPara}>
                Located at <strong>Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad</strong> (beside Annapurna Veg Restaurant), Kids City is easily accessible to families across Hinjewadi, Baner, Balewadi, Pimple Saudagar, and all of Pimpri-Chinchwad.
              </p>
              <p className={styles.storyPara}>
                Our store carries <strong>500+ carefully curated styles</strong> — from vibrant Navratri lehengas and Diwali kurtas to birthday princess dresses, casual denim sets, and everyday wear. Every garment is hand-selected for fabric safety, durability, and child-friendly design.
              </p>
              <p className={styles.storyPara}>
                With a <strong>4.9★ Google rating from 135+ Pune families</strong>, Kids City isn't just a shop — it's a trusted partner for every milestone in your child's life, from first birthdays to school functions and festival seasons.
              </p>

              {/* Inline stats row */}
              <div className={styles.founderStats}>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatNum}>4.9<Star size={15} fill="var(--brand-orange)" strokeWidth={0} style={{ verticalAlign: 'middle', marginLeft: 3 }} /></span>
                  <span className={styles.founderStatLabel}>Google Rating</span>
                </div>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatNum}>135+</span>
                  <span className={styles.founderStatLabel}>Happy Families</span>
                </div>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatNum}>500+</span>
                  <span className={styles.founderStatLabel}>Styles</span>
                </div>
                <div className={styles.founderStat}>
                  <span className={styles.founderStatNum}>8yrs</span>
                  <span className={styles.founderStatLabel}>In Wakad</span>
                </div>
              </div>

              <div className={styles.storyActions}>
                <a
                  href="https://www.google.com/maps/dir//Kids+City+Wakad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-terracotta"
                >
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
      <section className={styles.valuesSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="section-label">Our Values</span>
            <h2 className={styles.sectionHeading}>
              Why <span className="serif-accent">Wakad &amp; Pune Parents</span> Choose Kids City
            </h2>
          </motion.div>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5} viewport={{ once: true }}
              >
                <div className={styles.valueIcon} style={{ background: v.gradient }}>
                  {v.icon}
                </div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timelineSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="section-label">Our Journey</span>
            <h2 className={styles.sectionHeading}>
              <span className="serif-accent">Growing</span> with Wakad's Families
            </h2>
          </motion.div>
          <div className={styles.timeline}>
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                className={styles.timelineItem}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.5} viewport={{ once: true }}
              >
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className={styles.serviceSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHead}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <span className="section-label">Service Area</span>
            <h2 className={styles.sectionHeading}>
              Serving Families Across <span className="serif-accent">Pune &amp; Pimpri-Chinchwad</span>
            </h2>
            <p className={styles.serviceDesc}>
              Kids City is your neighborhood kids wear store — easily reachable from all these areas in Pune and Pimpri-Chinchwad:
            </p>
          </motion.div>
          <div className={styles.areaTags}>
            {SERVICE_AREAS.map((area, i) => (
              <motion.span
                key={i}
                className={styles.areaTag}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i * 0.2} viewport={{ once: true }}
              >
                <MapPin size={12} /> {area}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            className={styles.ctaBox}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>
              Visit Kids City in <span className="serif-accent">Wakad</span> Today
            </h2>
            <p className={styles.ctaDesc}>
              Come see 500+ kids clothing styles for boys and girls aged 0–14 years. Open every day at Mahalaxmi Complex, Wakad, Pune.
            </p>
            <div className={styles.ctaBtns}>
              <a
                href="https://www.google.com/maps/dir//Kids+City+Wakad"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-terracotta"
              >
                Get Directions
              </a>
              <a
                href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20want%20to%20know%20more%20about%20your%20store."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
