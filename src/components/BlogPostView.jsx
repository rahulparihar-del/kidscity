import { Calendar, Clock, User, ArrowLeft, MessageSquare, Share2, Star } from 'lucide-react'
import { BLOG_POSTS_DATA } from '../data/products'
import { trackWhatsAppClick } from '../utils/analytics'

const POST_CONTENTS = {
  'best-diwali-dresses-kids-pune': {
    intro: 'With Diwali 2026 approaching in early November, Pune parents are already preparing for Dhanteras, Laxmi Puja, and Bhai Dooj celebrations. Selecting the right Diwali outfits for energetic children means striking the delicate balance between royal festive charm and breathable comfort in Pune pleasant post-monsoon climate.',
    sections: [
      {
        heading: 'Top Diwali Outfit Trends for Girls in Pune (2026)',
        paragraphs: [
          'For girls aged 1 to 15, vibrant traditional silhouettes remain evergreen. This Diwali, mirror-work Chaniya Cholis and tiered organza lehengas in jewel tones—such as marigold yellow, rani pink, emerald green, and royal blue—are dominating Pune festive markets.',
          'At Kids City Wakad, our Navratri & Diwali Lehenga Sets are crafted with comfortable cotton-silk and lightweight dupattas that do not restrict movement. Look for elasticized waistbands with drawstring tassels so the skirt stays securely in place while children participate in family rituals and fireworks.',
          'For toddlers and younger girls, pre-stitched peplum top lehengas or lightweight Anarkali frocks avoid heavy dupattas while providing festive flair for Diwali family photo sessions.'
        ]
      },
      {
        heading: 'Top Diwali Outfits for Boys in Pune: Kurtas & Sherwanis',
        paragraphs: [
          'Boys festive fashion has evolved beyond plain kurtas. For Laxmi Puja and festive gatherings, Banarasi silk-blend kurta pajama sets with mandarin collar embroidery are popular choices across Wakad, Hinjewadi, and Baner.',
          'For Diwali parties and family dinners, paired waistcoat sets and Indo-western jacket sets allow boys to look smartly styled without feeling stifled. Look for kurtas lined with breathable lining so comfort is maintained during festive poojas.',
          'If your son dislikes churidar pajamas, opt for elasticated cotton dhoti pants or straight-leg trousers that allow complete running comfort.'
        ]
      },
      {
        heading: 'Diwali Kids Clothing Collections at Kids City Wakad',
        paragraphs: [
          'Here is what parents can find when shopping festive wear at Kids City Wakad or inquiring on WhatsApp:\n• Girls Chaniya Cholis & Festive Lehengas (complete 3-piece sets)\n• Boys Banarasi Kurta Pajama Sets (sizes up to 15 years)\n• Royal Velvet & Jacquard Sherwanis (festive & celebration wear)\n• Baby Festive Rompers & Dhoti Sets (0–2 years)\n• Festive Accessories (hairbands, tiaras & brooches)\nMessage us on WhatsApp (+91 78916 72762) for current collection details.'
        ]
      },
      {
        heading: 'Safety Tips for Kids Wearing Festive Outfits Around Fireworks',
        paragraphs: [
          'Safety is paramount during Diwali. Avoid long flowing nylon scarves or excessive flammable polyester flares when children are near sparklers and diyas. Opt for natural cotton-silk blends that stay close to the body, and ensure dupatta ends are neatly pinned before outdoor celebrations.',
          'Have a pair of soft cotton night suits ready at home so children can change into cozy sleepwear immediately after pooja ceremonies.'
        ]
      }
    ],
    ctaText: 'Explore Diwali Festival Wear at Kids City Wakad'
  },
  'choose-1st-birthday-dress-baby-girl-boy': {
    intro: 'Your baby first birthday is a once-in-a-lifetime milestone. Between welcoming guests, cutting the cake, and capturing hundreds of photos, the key challenge is ensuring your one-year-old remains comfortable and happy rather than overwhelmed by scratchy or restrictive clothing.',
    sections: [
      {
        heading: '1. Fabric Comfort: What Touches Sensitive Baby Skin',
        paragraphs: [
          'A one-year-old baby skin is delicate and sensitive. Many party dresses use stiff tulle and exposed plastic zip backs that cause neck chafing and red irritation within minutes of wear.',
          'At Kids City, our birthday princess dresses feature a multi-layer design with soft inner lining against the skin and concealed zippers to prevent pinching.'
        ]
      },
      {
        heading: '2. Choosing the Right Fit & Sizing for 1-Year-Olds',
        paragraphs: [
          'One-year-old babies are either beginning to crawl vigorously, pull themselves up, or take their first steps. Avoid dresses that fall below the ankle, as excess length poses a tripping hazard.',
          'For baby girls, knee-length or tea-length flared frocks allow free movement and look charming in walking photos. For baby boys, a soft cotton-rich bow-tie shirt with elasticized suspender shorts offers mobility and easy diaper changes.'
        ]
      },
      {
        heading: '3. Photo-Ready Color Themes Popular in Pune Banquets',
        paragraphs: [
          'In Pune birthday venues, pastel and soft royal tones are trending. For baby girls: blush peach, lavender, powder blue, and soft champagne gold sparkle wonderfully under banquet chandeliers. For baby boys: mint green, sage, royal navy, and classic beige polo sets create timeless family portraits.'
        ]
      },
      {
        heading: '4. The Two-Outfit Strategy Recommended by Pune Moms',
        paragraphs: [
          'Experienced parents always have a backup outfit. Dress your baby in their showstopper gown or prince suit for the cake cutting and formal photos (first 60 minutes). Afterwards, change them into a lightweight cotton co-ord set so they can crawl, play with balloons, and enjoy their party without fussing.'
        ]
      }
    ],
    ctaText: 'Browse Birthday Dresses at Kids City Wakad'
  },
  'kids-clothing-size-chart-india': {
    intro: 'Online shopping for kids clothes in India can be frustrating when standard sizing tags like "Age 4-5" fit differently across various brands. Because Indian children grow at unique rates, age alone should never be your sole guide.',
    sections: [
      {
        heading: 'Why Height in Centimeters is the Most Reliable Sizing Metric',
        paragraphs: [
          'In pediatric fashion design, height in centimeters correlates far more accurately with garment fit than chronological age. A tall 3-year-old may require a size 4–6y, while a petite 5-year-old might fit comfortably in size 3–4y.',
          'When checking our Kids City catalog, always compare your child height against our standard measurement table. For party wear, check chest measurements; for trousers and pajamas, measure outer leg length.'
        ]
      },
      {
        heading: 'Indian Sizing Breakdown for Ages 0 to 15 Years',
        paragraphs: [
          '• 0–6 Months: Height 55–67 cm | Chest 16–18" | Best for newborn rompers & sleep suits\n• 6–12 Months: Height 67–75 cm | Chest 18–19" | Crawling playwear & first birthday sets\n• 1–2 Years: Height 75–86 cm | Chest 19–20" | Toddler frocks & short sets\n• 2–4 Years: Height 86–104 cm | Chest 20–22" | Early preschool sets & festival wear\n• 4–6 Years: Height 104–116 cm | Chest 22–24" | Party wear gowns & kurta pajama\n• 6–8 Years: Height 116–128 cm | Chest 24–26" | Festive lehengas & boys denim co-ords\n• 8–10 Years: Height 128–140 cm | Chest 26–28" | Pre-teen ethnic & western outfits\n• 10–15 Years: Height 140–165 cm | Chest 28–34" | Teen party wear & designer sherwanis'
        ]
      },
      {
        heading: 'How to Account for Different Garment Styles',
        paragraphs: [
          'Different clothing styles require different fitting allowances:\n• Cotton Night Suits: Choose a relaxed fit with 1–2 inches of extra chest room for comfortable sleep.\n• Festive Lehengas: The blouse should fit snugly across the chest, while the skirt waistband can be adjusted via drawstrings.\n• Princess Gowns: Ensure the armhole does not pinch under the armpits. If in doubt, size up—a slightly roomier gown can be tied neatly with the back sash.'
        ]
      },
      {
        heading: 'Live Size Verification Service at Kids City Wakad',
        paragraphs: [
          'To assist parents with fitting, Kids City offers live WhatsApp sizing checks. WhatsApp us your child height and age at +91 78916 72762. Our store assistants will place a measuring tape against the actual garment in our Wakad boutique and send you a photo before dispatching.'
        ]
      }
    ],
    ctaText: 'View Full Interactive Size Chart'
  },
  'kids-christmas-new-year-outfit-ideas': {
    intro: 'December and January bring crisp winter breezes to Pune, along with festive school concerts, Christmas parties, and New Year gatherings. Dressing your children for winter festivities requires warm, cozy layering that looks vibrant and celebratory.',
    sections: [
      {
        heading: '1. Christmas Party Outfits: Scarlet Velvet & Festive Tartan',
        paragraphs: [
          'Red, burgundy, and forest green are the signature hues of the Christmas season. For girls, deep crimson velvet dresses paired with warm fleece stockings and patent shoes create a classic holiday look.',
          'Layered tulle party frocks with delicate gold or silver star accents are also trending for Pune Christmas dinners and school concerts. Pair with soft fur shrugs or knitted cardigans for outdoor evening events.'
        ]
      },
      {
        heading: '2. Boys Winter Party Wear: Sherpa Hoodies & Tailored Jackets',
        paragraphs: [
          'Boys stay warmest when layers are easy to take on and off. Our cosy sherpa fleece hoodies with playful bear ears offer warmth without stiffness, making them ideal for winter evening walks and celebrations.',
          'For formal Christmas and New Year dinners, a cotton corduroy shirt layered over a warm thermal inner, paired with comfortable twill cargos, strikes the right balance between smart style and active comfort.'
        ]
      },
      {
        heading: '3. New Year Eve Outfits for Kids: Glitz & Glamour',
        paragraphs: [
          'Welcome the New Year with starry sequined ball gowns, glitter waistbands, and metallic accents. Unlike adult sequins that scratch, our children party wear features smooth satin under-layers so decorative sequins never make contact with sensitive skin.'
        ]
      },
      {
        heading: '4. Pune Winter Fabric Essentials',
        paragraphs: [
          'Pune winter temperatures typically hover between 12°C and 18°C in December and January. Heavy down coats are unnecessary; instead, breathable fleece, brushed cotton jersey, and layered knitwear keep children warm without overheating indoors.'
        ]
      }
    ],
    ctaText: 'Shop Winter & Holiday Party Wear at Kids City'
  },
  'kids-wedding-season-outfits-pune': {
    intro: 'The winter wedding season in Maharashtra runs from November through February. As wedding invitations arrive for venues across Pune—from Baner and Balewadi banquet halls to luxury resorts along Mumbai-Pune Expressway—finding royal yet manageable wedding attire for kids is every parent top priority.',
    sections: [
      {
        heading: '1. Sangeet & Mehendi: Lightweight Movement for Dancing Kids',
        paragraphs: [
          'Sangeet nights involve music, dancing, and non-stop running. Heavy zari lehengas or stiff brocade jackets quickly become uncomfortable for children.',
          'For girls, opt for lightweight georgette or cotton-silk Chaniya Cholis with mirror-work accents that shimmer beautifully on the dance floor. For boys, a breathable silk-blend kurta pajama with a printed Nehru jacket allows dancing without sweat.'
        ]
      },
      {
        heading: '2. Wedding Ceremony: Royal Sherwanis & Regal Lehengas',
        paragraphs: [
          'For the main wedding ceremony, royal tones like deep navy, wine red, emerald green, and antique gold make kids look festive.',
          'At Kids City Wakad, our Boys Royal Velvet Sherwanis feature detailed embroidery and matching dhoti pants. The inner lining is made with comfortable cotton so boys remain comfortable throughout lengthy rituals.'
        ]
      },
      {
        heading: '3. Reception Glamour: Evening Gowns & Tuxedo Styles',
        paragraphs: [
          'For evening wedding receptions, princess ball gowns with delicate sequin stars and matching tiaras make little girls feel like stars. For boys, smart waistcoat suits and polo blazer sets deliver formal elegance.'
        ]
      },
      {
        heading: '4. Hassle-Free Wedding Shopping with Delivery Support',
        paragraphs: [
          'Wedding schedules are hectic. If you cannot visit our Wakad boutique in person, WhatsApp our team at +91 78916 72762. We assist with outfit curation and delivery in Wakad and nearby areas. Message us on WhatsApp with your pincode to confirm.'
        ]
      }
    ],
    ctaText: 'Explore Kids Wedding Outfits at Kids City'
  }
}

export default function BlogPostView({ postSlug, onViewChange }) {
  const post = BLOG_POSTS_DATA[postSlug] || BLOG_POSTS_DATA['best-diwali-dresses-kids-pune']
  const content = POST_CONTENTS[post.slug] || POST_CONTENTS['best-diwali-dresses-kids-pune']

  const handleWhatsApp = () => {
    trackWhatsAppClick('BlogPostCTA', null, `https://kidscity.online/blog/${post.slug}`)
    const phone = '917891672762'
    const text = `Hi Kids City! I read your article "${post.title}" and would like to see matching kids outfits.`
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="bg-white min-h-screen pt-[90px] pb-24">
      <div className="container max-w-[860px]">
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
            <li>
              <a
                href="/blog"
                onClick={(e) => { e.preventDefault(); onViewChange('blog') }}
                className="hover:text-brand-terracotta transition-colors"
              >
                Blog
              </a>
            </li>
            <li>&gt;</li>
            <li className="text-brand-navy font-bold truncate max-w-[280px]" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-[0.8rem] font-bold text-brand-terracotta uppercase tracking-wider mb-3">
            <span>{post.category}</span>
            <span>·</span>
            <span className="text-text-muted">{post.readTime}</span>
          </div>

          <h1 className="font-[family-name:var(--font-head)] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold text-brand-navy leading-[1.25] mb-4">
            {post.h1}
          </h1>

          <div className="flex items-center gap-4 text-[0.85rem] text-text-muted pb-6 border-b border-border">
            <span className="flex items-center gap-1.5 font-semibold text-brand-navy">
              <User size={14} className="text-brand-terracotta" />
              {post.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              Published: {post.publishDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Star size={13} fill="currentColor" />
              4.9★ Rated Pune Boutique
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-sm bg-[#faf8f5]">
          <img
            src={post.featuredImage}
            alt={post.title}
            width="860"
            height="480"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none font-[family-name:var(--font-body)] text-[1.02rem] text-text-mid leading-[1.8] space-y-8">
          <p className="text-[1.12rem] font-medium text-brand-navy leading-[1.75] bg-[#faf8f5] p-6 rounded-2xl border-l-4 border-brand-terracotta">
            {content.intro}
          </p>

          {content.sections.map((sec, i) => (
            <section key={i} className="space-y-4 pt-4">
              <h2 className="font-[family-name:var(--font-head)] text-[1.45rem] font-extrabold text-brand-navy tracking-tight">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, j) => (
                <p key={j} className="whitespace-pre-line leading-[1.8]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>

        {/* In-Article Promotion Box */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-[#faf8f5] to-white border border-border shadow-sm">
          <h3 className="font-[family-name:var(--font-head)] text-[1.3rem] font-extrabold text-brand-navy mb-2">
            Looking for Kids Clothes in Pune?
          </h3>
          <p className="text-[0.92rem] text-text-mid mb-5 leading-[1.6]">
            Visit Kids City boutique at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune, or message us on WhatsApp with your pincode to confirm delivery.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleWhatsApp}
              className="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-[0.88rem] flex items-center gap-2 hover:brightness-105 min-h-[48px]"
            >
              <MessageSquare size={16} />
              Chat on WhatsApp (+91 78916 72762)
            </button>
            <button
              onClick={() => { onViewChange('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="bg-brand-navy text-white px-6 py-3 rounded-full font-bold text-[0.88rem] hover:bg-brand-navy-dark min-h-[48px]"
            >
              Browse Collections
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-border mt-10">
          <img
            src="/images/logo.webp"
            alt="Kids City Pune"
            width="56"
            height="56"
            className="w-14 h-14 rounded-full object-cover border border-border shrink-0"
          />
          <div>
            <strong className="block text-[0.95rem] text-brand-navy">Published by Kids City Pune</strong>
            <p className="text-[0.82rem] text-text-muted mt-0.5 leading-[1.5]">
              Kids City is a children clothing boutique in Wakad, Pune, established in 2018. Rated 4.9★ on Google by 141+ Pune families for quality clothing and friendly service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
