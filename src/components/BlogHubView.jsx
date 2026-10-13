import { Calendar, Clock, ArrowRight, User } from 'lucide-react'
import { BLOG_POSTS_DATA } from '../data/products'

export default function BlogHubView({ onViewChange, onSelectPost }) {
  const posts = Object.values(BLOG_POSTS_DATA)

  return (
    <div className="bg-white min-h-screen pt-[90px] pb-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 py-2 border-b border-border/70">
          <ol className="flex items-center gap-2 text-[0.82rem] text-text-muted list-none m-0 p-0 flex-wrap">
            <li>
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); onViewChange('home') }}
                className="hover:text-brand-terracotta transition-colors"
              >
                Home
              </a>
            </li>
            <li>&gt;</li>
            <li className="text-brand-navy font-bold" aria-current="page">
              Kids Fashion &amp; Parenting Guides
            </li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header className="bg-gradient-to-br from-[#faf8f5] to-white border border-border rounded-3xl p-8 md:p-12 mb-12 shadow-sm text-center max-w-[800px] mx-auto">
          <span className="text-[0.75rem] font-bold text-brand-terracotta uppercase tracking-wider block mb-2">
            Kids Fashion Guides &amp; Tips
          </span>
          <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold text-brand-navy leading-[1.2] mb-4">
            Pune Parenting &amp; Kids Clothing Guides
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[1.05rem] text-text-mid leading-[1.7]">
            Practical advice from our Wakad boutique team on choosing skin-safe fabrics, festive dresses, sizing, and seasonal outfit trends for Pune weather.
          </p>
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              onClick={() => onSelectPost(post.slug)}
              className="bg-white border border-border rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg hover:border-brand-terracotta transition-all cursor-pointer flex flex-col group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#faf8f5]">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  width="400"
                  height="250"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[0.7rem] font-bold">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[0.75rem] text-text-muted mb-2.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.publishDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-head)] text-[1.15rem] font-extrabold text-brand-navy mb-3 line-clamp-2 leading-[1.3] group-hover:text-brand-terracotta transition-colors">
                  {post.title}
                </h2>

                <p className="font-[family-name:var(--font-body)] text-[0.88rem] text-text-mid leading-[1.6] line-clamp-3 mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[0.85rem] font-bold text-brand-terracotta mt-auto">
                  <span>Read Guide</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
