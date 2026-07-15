import { useEffect, useState } from 'react'
import { Star, ArrowRight } from 'lucide-react'

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
  {
    author: 'Priya Sharma',
    location: 'Wakad, Pune (Google Review)',
    rating: 5,
    text: '"Bought 3 night suits for my 2-year-old — the hosiery cotton is SO soft, he sleeps so peacefully now! Will definitely buy more sets. Best kids store in Wakad!"',
    relativeTime: 'Google Review',
  },
  {
    author: 'Anita Kulkarni',
    location: 'Hinjewadi, Pune (Google Review)',
    rating: 5,
    text: '"Ordered a Navratri lehenga for my 4-year-old daughter — it was absolutely stunning! Perfect fit and the mirror work is gorgeous. Kids City is our go-to store now!"',
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

const TOP_COLORS = ['#FF4B72', '#00A8E8', '#FF9F1C']

function colorFor(name) {
  let sum = 0
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i)
  return AVATAR_COLORS[sum % AVATAR_COLORS.length]
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(SEED_REVIEWS)
  const [rating, setRating] = useState(4.9)
  const [total, setTotal] = useState(500)
  const [mapsUri, setMapsUri] = useState(null)

  useEffect(() => {
    let active = true
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (!active) return
        if (Array.isArray(data.reviews) && data.reviews.length > 0) setReviews(data.reviews)
        if (data.rating) setRating(data.rating)
        if (data.total) setTotal(data.total)
        if (data.mapsUri) setMapsUri(data.mapsUri)
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  return (
    <section className="py-[88px] max-[560px]:py-14 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-[52px] max-[560px]:mb-9">
          <span className="section-label">Reviews</span>
          <h2 className="section-heading">What Parents Are <span className="serif-accent">Saying</span></h2>
          <div className="inline-flex items-center gap-2.5 bg-white border-[1.5px] border-border rounded-full px-6 py-2.5 mt-4">
            <Star size={20} fill="currentColor" strokeWidth={0} className="text-brand-orange" />
            <span className="font-[family-name:var(--font-head)] text-[1.4rem] text-brand-navy">
              {Number(rating).toFixed(1)}
            </span>
            <span className="text-[0.82rem] text-text-muted font-bold">
              Average Rating · {total} Google Reviews
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="bg-white rounded-[24px] p-7 max-[560px]:p-5 border-[1.5px] border-t-[5px] border-border transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(61,64,91,0.12)]"
              style={{ borderTopColor: TOP_COLORS[i % 3] }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-brand-orange mb-3.5">
                {Array.from({ length: r.rating }).map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[0.95rem] text-text-mid leading-[1.75] italic mb-5 font-medium">
                {r.text.startsWith('"') ? r.text : `"${r.text}"`}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {r.photo ? (
                  <img
                    className="w-[42px] h-[42px] rounded-full object-cover shrink-0"
                    src={r.photo}
                    alt={r.author}
                  />
                ) : (
                  <div
                    className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-[family-name:var(--font-head)] font-extrabold text-[1.2rem] text-white shrink-0"
                    style={{ background: colorFor(r.author) }}
                  >
                    {r.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-extrabold text-[0.9rem] text-brand-navy">{r.author}</p>
                  <p className="text-[0.75rem] text-text-muted font-semibold">
                    {r.location ? `${r.location} · ` : ''}{r.relativeTime || 'Google Review'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA link */}
        {mapsUri && (
          <div className="text-center mt-10">
            <a
              href={mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-extrabold text-[0.95rem] text-brand-navy no-underline border-[1.5px] border-border rounded-full px-7 py-3 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(61,64,91,0.12)]"
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
