import { useEffect, useState } from 'react'
import { Star, ArrowRight } from 'lucide-react'
import styles from './Testimonials.module.css'

// Fallback reviews. Shown while loading, or if the live Google API is
// unavailable (e.g. during local dev without the serverless function,
// or if the env vars are not configured yet).
const SEED_REVIEWS = [
  {
    author: 'Priya Sharma',
    location: 'Wakad, Pune',
    rating: 5,
    text: '"Bahut acchi shop hai! Festival season mein gaye the, itne options the. Meri beti ko sab pasand aaya. Quality bhi bahut aachi thi. Must visit for every parent in Pune!"',
    relativeTime: 'Google Review',
  },
  {
    author: 'Rahul Mhatre',
    location: 'Pimpri-Chinchwad',
    rating: 5,
    text: '"Best kids clothing shop near Wakad. Quality is amazing and prices are very reasonable. Staff was super helpful in finding the right size. Highly recommend to all parents!"',
    relativeTime: 'Google Review',
  },
  {
    author: 'Sneha Kulkarni',
    location: 'Pimpri, Pune',
    rating: 5,
    text: '"My son\'s birthday outfit was absolutely perfect! The collection is so fresh and trendy. The staff helped us pick the best one. We keep coming back every season!"',
    relativeTime: 'Google Review',
  },
]

const AVATAR_COLORS = [
  'linear-gradient(135deg,#FF1493,#8B00FF)',
  'linear-gradient(135deg,#FF6600,#f5a623)',
  'linear-gradient(135deg,#32CD32,#228B22)',
  'linear-gradient(135deg,#00B4D8,#0077B6)',
  'linear-gradient(135deg,#E63946,#9D0208)',
]

// Deterministic color per name so the same person always gets the same avatar.
function colorFor(name) {
  let sum = 0
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(SEED_REVIEWS)
  const [rating, setRating] = useState(4.9)
  const [total, setTotal] = useState(135)
  const [mapsUri, setMapsUri] = useState(null)

  useEffect(() => {
    let active = true

    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (!active) return
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews)
        }
        if (data.rating) setRating(data.rating)
        if (data.total) setTotal(data.total)
        if (data.mapsUri) setMapsUri(data.mapsUri)
      })
      .catch(() => {
        // Keep the seed reviews on any failure. No UI disruption.
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Reviews</span>
          <h2 className="section-heading">What Parents Are <span className="serif-accent">Saying</span></h2>
          <div className={styles.ratingBadge}>
            <Star size={20} fill="currentColor" strokeWidth={0} className={styles.bigStar} />
            <span className={styles.bigNum}>{Number(rating).toFixed(1)}</span>
            <span className={styles.bigLabel}>
              Average Rating · {total} Google Reviews
            </span>
          </div>
        </div>

        <div className={styles.grid}>
          {reviews.map((r, i) => (
            <article key={i} className={styles.card}>
              <div className={styles.stars}>
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className={styles.text}>
                {r.text.startsWith('"') ? r.text : `"${r.text}"`}
              </p>
              <div className={styles.author}>
                {r.photo ? (
                  <img className={styles.avatar} src={r.photo} alt={r.author} />
                ) : (
                  <div
                    className={styles.avatar}
                    style={{ background: colorFor(r.author) }}
                  >
                    {r.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className={styles.name}>{r.author}</p>
                  <p className={styles.loc}>
                    {r.location ? `${r.location} · ` : ''}
                    {r.relativeTime || 'Google Review'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {mapsUri && (
          <div className={styles.cta}>
            <a
              className={styles.ctaLink}
              href={mapsUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read all {total} reviews on Google
              <ArrowRight size={16} strokeWidth={2.4} />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
