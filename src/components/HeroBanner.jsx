import { Star, Camera } from 'lucide-react'
import styles from './HeroBanner.module.css'

export default function HeroBanner() {
  return (
    <section id="hero" className={styles.hero}>
      {/* Subtle background decorations */}
      <div className={styles.bgDeco}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
        <div className={styles.gridLines} />
      </div>

      <div className={`container ${styles.inner}`}>

        {/* Top badge */}
        <div className={styles.badgeWrap}>
          <span className={styles.dot} />
          Wakad's Most Loved Kids Clothing Store · Open Daily
        </div>

        {/* Main heading */}
        <h1 className={styles.title}>
          <span className={styles.titleMain}>Kids Clothing in Wakad</span>
          <span className={styles.titleAccent}>For Your Little Sunshine</span>
        </h1>

        {/* Tagline */}
        <p className={styles.subtitle}>
          Festival wear, traditional dresses, birthday outfits &amp; everyday casuals for
          boys &amp; girls (0–14 yrs). 500+ premium styles, loved by 135+ Pune families —
          right here in Wakad.
        </p>

        {/* Stats row */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNum}>
              4.9<Star size={18} fill="currentColor" strokeWidth={0} className={styles.statStar} />
            </span>
            <span className={styles.statLabel}>Google Rating</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum}>135+</span>
            <span className={styles.statLabel}>Happy Families</span>
          </div>
          <div className={styles.statDiv} />
          <div className={styles.stat}>
            <span className={styles.statNum}>500+</span>
            <span className={styles.statLabel}>Styles in Store</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className={styles.ctas}>
          <a
            href="https://www.google.com/maps/dir//Kids+City+-+Best+Kids+Clothes+Shop+In+Wakad+(Pune)+%7C%7C+Best+Festival+Dress+%7C%7C+Traditional+Dress+Collection,+Shop+No+12,+Mahalaxmi+Complex,+Chatrapati+Chowk+Rd,+beside+Annapurna+veg+restaurant,+Kaspate+Wasti,+Wakad,+Pimpri-Chinchwad,+Maharashtra+411057/@18.6040405,73.7830858,15z"
            className={`btn btn-navy ${styles.ctaBtn}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Visit Our Store
          </a>
          <a
            href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20saw%20your%20ad%20and%20want%20to%20visit%20your%20store.%20Can%20you%20share%20details%3F"
            className={`btn btn-wa ${styles.ctaBtn}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.107 1.514 5.84L0 24l6.343-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.651-.502-5.178-1.381l-.372-.22-3.765.881.921-3.666-.242-.384A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <a href="tel:+917891672762" className={`btn ${styles.ctaBtnOutline}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            078916 72762
          </a>
        </div>

        {/* Hero image — full width, centered */}
        <div className={styles.imageWrap}>
          {/* Floating badge top-left */}
          <div className={`${styles.floatCard} ${styles.floatLeft}`}>
            <span className={styles.floatIcon} style={{ background: 'linear-gradient(135deg,#f5a623,#e8820a)' }}>
              <Star size={16} color="#fff" fill="#fff" strokeWidth={0} />
            </span>
            <div>
              <p className={styles.floatTitle}>Top Rated Store</p>
              <p className={styles.floatSub}>4.9 · 135 Reviews</p>
            </div>
          </div>

          <div className={styles.imgFrame}>
            <img
              src="/images/hero_girl.png"
              alt="Kids City — stylish kids fashion, Wakad Pune"
              className={styles.heroImg}
            />
          </div>

          {/* Floating badge bottom-right */}
          <div className={`${styles.floatCard} ${styles.floatRight}`}>
            <span className={styles.floatIcon} style={{ background: 'linear-gradient(135deg,#32CD32,#228B22)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
              </svg>
            </span>
            <div>
              <p className={styles.floatTitle}>New Collection</p>
              <p className={styles.floatSub}>Fresh arrivals weekly</p>
            </div>
          </div>
        </div>

        {/* Address strip */}
        <div className={styles.addressStrip}>
          <span className={styles.addressItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Shop No 12, Mahalaxmi Complex, Wakad, Pune 411057
          </span>
          <span className={styles.addressDot} />
          <span className={styles.addressItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            078916 72762
          </span>
          <span className={styles.addressDot} />
          <span className={styles.addressItem}>
            <Camera size={13} strokeWidth={2} />
            @kidscity____
          </span>
        </div>

      </div>
    </section>
  )
}
