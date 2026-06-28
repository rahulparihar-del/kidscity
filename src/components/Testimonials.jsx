import { useEffect, useState } from 'react'
import { Star, ArrowRight } from 'lucide-react'
import styles from './Testimonials.module.css'

// Fallback reviews. Shown while loading, or if the live Google API is
// unavailable (e.g. during local dev without the serverless function,
// or if the env vars are not configured yet).
const SEED_REVIEWS = [
  {
    author: 'CA Deepak Solanki',
    location: 'Wakad, Pune (Google Review)',
    rating: 5,
    text: '"Kids City is a haven for little fashionistas and their parents! With a delightful selection of clothing for kids of all ages, this store is a must-visit for those seeking adorable and comfortable outfits."',
    relativeTime: 'Google Review',
  },
  {
    author: 'Nalin Tripathi',
    location: 'Wakad, Pune (Google Review)',
    rating: 5,
    text: '"Budget friendly and trending fashion! Also the shop owner is very polite, you can try as many clothes you like. Highly recommended!"',
    relativeTime: 'Google Review',
  },
  {
    author: 'Akhil Oza',
    location: 'Wakad, Pune (Google Review)',
    rating: 5,
    text: '"All types of kids wear were available in nice quality and the shopkeeper himself handled us with selections. Overall, totally satisfied!"',
    relativeTime: 'Google Review',
  },
  {
    author: 'Shishir Agnihotri',
    location: 'Wakad, Pune (Google Review)',
    rating: 5,
    text: '"Wide range of variety of kids clothes available here, very good experience. Clothes are durable and very soft on kids skin."',
    relativeTime: 'Google Review',
  },
  {
    author: 'Yogesh Mishra',
    location: 'Wakad, Pune (Google Review)',
    rating: 5,
    text: '"Very nice collection with super friendly people. Bought clothes for the first time and will definitely come again!"',
    relativeTime: 'Google Review',
  },
  {
    author: 'Blogogy',
    location: 'Wakad, Pune (Google Review)',
    rating: 5,
    text: '"Great find for kids clothes! KIDS CITY has a fantastic range, from trendy to classic styles, all at good prices. The shop is welcoming, and the staff are super helpful."',
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
