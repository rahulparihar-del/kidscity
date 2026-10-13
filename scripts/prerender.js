import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { storeConfig } from '../src/config/storeConfig.js'
import { parseProductsCsv } from '../src/data/csvParser.js'
import { CATEGORIES_DATA, AREAS_DATA, BLOG_POSTS_DATA } from '../src/data/staticData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')
const publicDir = path.resolve(rootDir, 'public')

const SITE_URL = 'https://kidscity.online'
const TODAY = '2026-10-13'

if (!fs.existsSync(distDir)) {
  console.error('[Prerender] Error: dist/ directory does not exist. Run "vite build" first.')
  process.exit(1)
}

const baseHtmlPath = path.resolve(distDir, 'index.html')
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8')

// Parse products.csv directly from root
const csvPath = path.resolve(rootDir, 'products.csv')
const csvContent = fs.existsSync(csvPath) ? fs.readFileSync(csvPath, 'utf8') : ''
const allProducts = parseProductsCsv(csvContent)
const publishedProducts = allProducts.filter(p => p.isPublished)

console.log(`[Prerender] products.csv parsed: ${allProducts.length} total rows, ${publishedProducts.length} published products.`)

// Verified ClothingStore Schema (strictly ClothingStore, matching Google Business Profile)
const clothingStoreSchema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  '@id': `${SITE_URL}/#store`,
  name: storeConfig.storeName,
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/logo_full.webp`,
    width: 512,
    height: 200
  },
  image: [
    `${SITE_URL}/images/og-kids-city.jpg`,
    `${SITE_URL}/images/founder-kids-city-wakad.jpg`,
    `${SITE_URL}/images/festival_wear.webp`,
    `${SITE_URL}/images/birthday_dress.webp`
  ],
  description: 'Kids City is a children clothing store located in the neighbourhood of Wakad, Pune, established in 2018. We specialize in festive wear including Navratri lehengas and Diwali kurtas, birthday party dresses, cotton night suits, and everyday outfits for boys and girls aged 0 to 15 years.',
  telephone: storeConfig.phone,
  email: storeConfig.email,
  priceRange: '$$',
  currenciesAccepted: 'INR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${storeConfig.address.shopNumber}, ${storeConfig.address.complex}, ${storeConfig.address.street}`,
    addressLocality: storeConfig.address.city,
    addressRegion: storeConfig.address.state,
    postalCode: storeConfig.address.postalCode,
    addressCountry: storeConfig.address.country
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: storeConfig.address.geo.latitude,
    longitude: storeConfig.address.geo.longitude
  },
  hasMap: storeConfig.address.googleMapsUrl,
  sameAs: [
    storeConfig.social.instagramUrl,
    storeConfig.address.googleMapsUrl
  ],
  areaServed: [
    { '@type': 'City', name: 'Pune' },
    { '@type': 'City', name: 'Pimpri-Chinchwad' },
    { '@type': 'AdministrativeArea', name: 'Wakad' }
  ],
  foundingDate: storeConfig.foundedYear,
  slogan: storeConfig.tagline
}

// Add opening hours ONLY if confirmed by owner
if (storeConfig.openingHours.confirmed) {
  clothingStoreSchema.openingHoursSpecification = [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: storeConfig.openingHours.opens,
      closes: storeConfig.openingHours.closes
    }
  ]
}

const routes = []

// 1. Homepage
routes.push({
  url: '/',
  title: 'Kids City | Kids Clothes Shop in Wakad, Pune',
  description: 'Kids City is Pune trusted children clothing boutique in Wakad. Shop festive lehengas, kurtas, birthday frocks & cotton night suits. 4.9★ on Google. Pune delivery.',
  canonical: `${SITE_URL}/`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '1.0',
  changefreq: 'weekly',
  isIndexed: true,
  schema: [
    clothingStoreSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Kids City',
      description: 'Kids clothing store in Wakad, Pune — festive wear, birthday dresses, and cotton sleepwear for boys & girls aged 0–15 years.',
      publisher: { '@id': `${SITE_URL}/#store` },
      inLanguage: 'en-IN'
    }
  ],
  rootHtml: `
    <header style="padding: 24px; text-align: center; max-width: 900px; mx-auto;">
      <p style="font-size: 0.85rem; font-weight: bold; color: #E07A5F; margin-bottom: 8px;">★ ${storeConfig.rating.displayNotice}</p>
      <h1 style="font-size: 2.5rem; color: #3D405B; margin-bottom: 12px;">Kids Clothes Shop in Pune — Kids City Boutique Wakad</h1>
      <p style="font-size: 1.1rem; color: #4B5563; line-height: 1.7; margin-bottom: 16px;">
        Children's clothing store in Wakad, Pune. Festive wear, birthday dresses, and cotton sleepwear for boys and girls (ages 0–15).
      </p>
      <div style="margin-bottom: 24px;">
        <a href="https://wa.me/${storeConfig.whatsappRaw}?text=Hello%20Kids%20City!%20I%20am%20interested%20in%20your%20collection" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block; margin-right: 8px;">Order on WhatsApp: ${storeConfig.phone}</a>
        <a href="/collections" style="background: #3D405B; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block;">Browse Collections</a>
      </div>
      <section style="text-align: left; background: #FAF8F5; border: 1px solid #E6DFD3; border-radius: 16px; padding: 24px; margin-top: 32px;">
        <h2 style="font-size: 1.4rem; color: #3D405B; margin-bottom: 8px;">About Kids City Wakad</h2>
        <p style="font-size: 0.95rem; color: #4B5563; line-height: 1.6;">
          Established in 2018, Kids City is located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057. We offer in-store shopping with trial facilities and delivery across Pune and Pimpri-Chinchwad upon WhatsApp confirmation.
        </p>
      </section>
    </header>
  `
})

// 2. Collections
routes.push({
  url: '/collections',
  title: 'Kids Clothing Collections in Pune | Kids City, Wakad',
  description: 'Explore boys and girls clothing catalog in Pune: festival lehengas, kurtas, birthday frocks, cotton night suits & baby sets.',
  canonical: `${SITE_URL}/collections`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.95',
  changefreq: 'daily',
  isIndexed: true,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Kids Clothing Collections in Pune',
      url: `${SITE_URL}/collections`,
      description: 'Explore catalog of boys and girls clothing in Pune from Kids City Wakad.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE_URL}/collections` }
        ]
      }
    }
  ],
  rootHtml: `
    <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
      <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;"><a href="/">Home</a> &gt; <span>Collections</span></nav>
      <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">Kids Clothing Collections in Pune — Kids City</h1>
      <p style="font-size: 1rem; color: #4B5563; line-height: 1.7; margin-bottom: 24px;">
        Curated clothing for boys and girls from newborn to 15 years. Festive wear, birthday gowns, everyday cotton sets, and sleepwear.
      </p>
      <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <p style="color: #92400E; margin: 0; font-size: 0.95rem;">
          <strong>Catalog Notice:</strong> We are updating our online catalog with verified in-store stock and prices. Message us on WhatsApp (+91 78916 72762) or visit our Wakad store to view our collection!
        </p>
      </div>
    </article>
  `
})

// 3. Delivery Hub
routes.push({
  url: '/kids-clothes-delivery-pune',
  title: 'Kids Clothes Home Delivery in Pune & PCMC | Kids City',
  description: 'Doorstep kids clothing delivery across Pune & PCMC from Kids City Wakad. Delivery areas, dispatch details & WhatsApp ordering.',
  canonical: `${SITE_URL}/kids-clothes-delivery-pune`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.9',
  changefreq: 'weekly',
  isIndexed: true,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Kids Clothes Home Delivery in Pune & PCMC',
      url: `${SITE_URL}/kids-clothes-delivery-pune`,
      description: 'Kids clothes home delivery information across Pune and PCMC from Kids City Wakad.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Delivery in Pune', item: `${SITE_URL}/kids-clothes-delivery-pune` }
        ]
      }
    }
  ],
  rootHtml: `
    <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
      <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;"><a href="/">Home</a> &gt; <span>Pune Delivery</span></nav>
      <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">Kids Clothes Home Delivery Across Pune &amp; PCMC</h1>
      <p style="font-size: 1.05rem; color: #4B5563; line-height: 1.7; margin-bottom: 20px;">
        Shop children's wear from Kids City Wakad with direct home delivery. Inquire on WhatsApp with your locality or pincode to confirm current delivery options and dispatch times.
      </p>
      <section style="background: #FAF8F5; border: 1px solid #E6DFD3; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
        <h2 style="font-size: 1.3rem; color: #3D405B; margin-bottom: 8px;">Physical Store Location</h2>
        <p style="font-size: 0.95rem; color: #4B5563; line-height: 1.6; margin: 0;">
          <strong>Address:</strong> ${storeConfig.address.fullFormatted}<br/>
          <strong>Phone / WhatsApp:</strong> ${storeConfig.phone}<br/>
          Open 7 days a week. In-store shopping and trials available.
        </p>
      </section>
    </article>
  `
})

// 4. Size Guide
routes.push({
  url: '/kids-clothing-size-guide',
  title: 'Indian Kids Clothing Size Chart & Guide | Kids City',
  description: 'Indian kids clothing size chart for ages 0–15 years. Easy measurements for age, height in cm, and chest size. Find the proper fit at Kids City Pune.',
  canonical: `${SITE_URL}/kids-clothing-size-guide`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.85',
  changefreq: 'monthly',
  isIndexed: true,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Indian Kids Clothing Size Chart & Fit Guide',
      url: `${SITE_URL}/kids-clothing-size-guide`,
      description: 'Indian kids clothing size chart for ages 0–15 years.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Size Guide', item: `${SITE_URL}/kids-clothing-size-guide` }
        ]
      }
    }
  ],
  rootHtml: `
    <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
      <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;"><a href="/">Home</a> &gt; <span>Size Guide</span></nav>
      <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">Indian Kids Clothing Size Chart (Ages 0–15)</h1>
      <p style="font-size: 1rem; color: #4B5563; line-height: 1.7; margin-bottom: 24px;">
        Use this reference table to find the proper fit for your child. Height in centimeters is the most accurate sizing metric.
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; text-align: left; font-size: 0.9rem;">
        <thead>
          <tr style="background: #3D405B; color: white;">
            <th style="padding: 10px; border: 1px solid #3D405B;">Age Group</th>
            <th style="padding: 10px; border: 1px solid #3D405B;">Height (cm)</th>
            <th style="padding: 10px; border: 1px solid #3D405B;">Chest (inches)</th>
            <th style="padding: 10px; border: 1px solid #3D405B;">Waist (inches)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">0–6 Months</td><td style="padding: 8px; border: 1px solid #E6DFD3;">55–67 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">16–18"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">16–17"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">6–12 Months</td><td style="padding: 8px; border: 1px solid #E6DFD3;">67–75 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">18–19"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">17–18"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">1–2 Years</td><td style="padding: 8px; border: 1px solid #E6DFD3;">75–86 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">19–20"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">18–19"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">2–4 Years</td><td style="padding: 8px; border: 1px solid #E6DFD3;">86–104 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">20–22"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">19–21"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">4–6 Years</td><td style="padding: 8px; border: 1px solid #E6DFD3;">104–116 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">22–24"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">21–22"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">6–8 Years</td><td style="padding: 8px; border: 1px solid #E6DFD3;">116–128 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">24–26"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">22–23"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">8–10 Years</td><td style="padding: 8px; border: 1px solid #E6DFD3;">128–140 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">26–28"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">23–25"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">10–14 Years</td><td style="padding: 8px; border: 1px solid #E6DFD3;">140–162 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">28–32"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">25–28"</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E6DFD3;">14–15 Years</td><td style="padding: 8px; border: 1px solid #E6DFD3;">162–168 cm</td><td style="padding: 8px; border: 1px solid #E6DFD3;">32–34"</td><td style="padding: 8px; border: 1px solid #E6DFD3;">28–30"</td></tr>
        </tbody>
      </table>
      <p style="font-size: 0.95rem; color: #4B5563;">
        Questions about size? Message us on WhatsApp (+91 78916 72762) and our Wakad team will measure the garment directly before dispatch.
      </p>
    </article>
  `
})

// 5. Customer Reviews
routes.push({
  url: '/reviews',
  title: 'Customer Reviews & Ratings (4.9★) | Kids City Wakad Pune',
  description: 'Verified 4.9★ Google rating from 141+ parents for Kids City Wakad. Authentic customer feedback on kids festive wear, birthday dresses & sleepwear.',
  canonical: `${SITE_URL}/reviews`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.85',
  changefreq: 'weekly',
  isIndexed: true,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Kids City Wakad Customer Reviews',
      url: `${SITE_URL}/reviews`,
      description: 'Customer reviews and ratings for Kids City Wakad.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Reviews', item: `${SITE_URL}/reviews` }
        ]
      }
    }
  ],
  rootHtml: `
    <article style="padding: 24px; max-width: 900px; margin: 0 auto; text-align: center;">
      <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px; text-align: left;"><a href="/">Home</a> &gt; <span>Reviews</span></nav>
      <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">Customer Reviews &amp; Ratings</h1>
      <p style="font-size: 1.1rem; color: #E07A5F; font-weight: bold; margin-bottom: 16px;">
        ★ 4.9 on Google Business Profile (141 Verified Reviews) · Established 2018 in Wakad
      </p>
      <p style="font-size: 1rem; color: #4B5563; line-height: 1.7; max-width: 700px; margin: 0 auto 24px auto;">
        We strictly publish genuine customer feedback. You can read all 141+ authentic reviews directly on Google Maps or visit our Wakad boutique.
      </p>
      <div>
        <a href="https://www.google.com/maps/dir//Kids+City+Wakad" target="_blank" rel="noopener noreferrer" style="background: #3D405B; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block;">Read 141 Reviews on Google Maps</a>
      </div>
    </article>
  `
})

// 6. Blog Hub
routes.push({
  url: '/blog',
  title: 'Kids Fashion & Parenting Blog Pune | Kids City',
  description: 'Kids clothing guides, festival dressing tips, Indian size charts & advice for Pune parents from the Kids City team.',
  canonical: `${SITE_URL}/blog`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.85',
  changefreq: 'weekly',
  isIndexed: true,
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Kids City Pune Fashion & Parenting Blog',
      url: `${SITE_URL}/blog`,
      description: 'Kids fashion guides and tips for Pune parents.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` }
        ]
      }
    }
  ],
  rootHtml: `
    <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
      <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;"><a href="/">Home</a> &gt; <span>Blog</span></nav>
      <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">Kids Fashion &amp; Parenting Blog — Pune Guides</h1>
      <p style="font-size: 1rem; color: #4B5563; line-height: 1.7; margin-bottom: 24px;">
        Helpful guides on festive dressing, sizing, and kids clothing tips from our Wakad team.
      </p>
      <div style="display: grid; gap: 16px;">
        <div style="border: 1px solid #E6DFD3; border-radius: 12px; padding: 16px; background: white;">
          <h2 style="font-size: 1.2rem; color: #3D405B; margin-bottom: 8px;"><a href="/blog/best-diwali-dresses-kids-pune" style="color: inherit; text-decoration: none;">Best Diwali Dresses for Kids in Pune (2026 Festive Guide)</a></h2>
          <p style="color: #6B7280; font-size: 0.9rem;">Diwali traditional outfits for boys and girls in Pune with styling advice.</p>
        </div>
        <div style="border: 1px solid #E6DFD3; border-radius: 12px; padding: 16px; background: white;">
          <h2 style="font-size: 1.2rem; color: #3D405B; margin-bottom: 8px;"><a href="/blog/how-to-choose-1st-birthday-dress" style="color: inherit; text-decoration: none;">How to Choose the Perfect 1st Birthday Dress for Baby Girl or Boy</a></h2>
          <p style="color: #6B7280; font-size: 0.9rem;">Fabric safety and sizing advice for your baby's 1st birthday celebration.</p>
        </div>
        <div style="border: 1px solid #E6DFD3; border-radius: 12px; padding: 16px; background: white;">
          <h2 style="font-size: 1.2rem; color: #3D405B; margin-bottom: 8px;"><a href="/blog/kids-clothing-size-chart-india" style="color: inherit; text-decoration: none;">Indian Kids Clothing Size Chart: Age, Height &amp; Chest Guide</a></h2>
          <p style="color: #6B7280; font-size: 0.9rem;">Comprehensive sizing measurements for children from newborn to 15 years.</p>
        </div>
      </div>
    </article>
  `
})

// 7. Core Static Info Pages
const staticPages = [
  {
    url: '/about',
    title: 'About Us | Kids City — Children Clothing Store Pune',
    description: 'Learn about Kids City Wakad, established in 2018. Pune neighborhood store for comfortable and affordable kids fashion aged 0–15.',
    priority: '0.75'
  },
  {
    url: '/contact',
    title: 'Contact Kids City Wakad Pune | Phone, Map & Location',
    description: 'Visit Kids City in Mahalaxmi Complex, Wakad, Pune or message +91 78916 72762 on WhatsApp. Open daily. Delivery in Wakad and nearby areas.',
    priority: '0.8'
  },
  {
    url: '/faq',
    title: 'Frequently Asked Questions | Kids City Wakad Pune',
    description: 'Find answers on delivery, size exchanges, store location, and WhatsApp ordering at Kids City Wakad Pune.',
    priority: '0.75'
  },
  {
    url: '/privacy-policy',
    title: 'Privacy Policy | Kids City Wakad Pune',
    description: 'Privacy policy for Kids City Wakad Pune. Information handling and customer data security.',
    priority: '0.4'
  },
  {
    url: '/terms',
    title: 'Terms & Conditions | Kids City Wakad Pune',
    description: 'Terms and conditions for Kids City children clothing store in Wakad, Pune.',
    priority: '0.4'
  },
  {
    url: '/shipping-policy',
    title: 'Shipping & Delivery Policy | Kids City Pune',
    description: 'Shipping and delivery terms for Kids City across Pune and Pimpri-Chinchwad.',
    priority: '0.4'
  },
  {
    url: '/return-policy',
    title: 'Return & Exchange Policy | Kids City Wakad Pune',
    description: 'Size exchange policy for Kids City clothing. Easy size exchanges with original bill and tags intact.',
    priority: '0.4'
  }
]

for (const p of staticPages) {
  routes.push({
    url: p.url,
    title: p.title,
    description: p.description,
    canonical: `${SITE_URL}${p.url}`,
    image: `${SITE_URL}/images/og-kids-city.jpg`,
    priority: p.priority,
    changefreq: 'monthly',
    isIndexed: true,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: p.title,
        url: `${SITE_URL}${p.url}`,
        description: p.description,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: p.title.split('|')[0].trim(), item: `${SITE_URL}${p.url}` }
          ]
        }
      }
    ],
    rootHtml: `
      <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
        <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;"><a href="/">Home</a> &gt; <span>${p.title.split('|')[0].trim()}</span></nav>
        <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">${p.title.split('|')[0].trim()}</h1>
        <p style="font-size: 1rem; color: #4B5563; line-height: 1.7; margin-bottom: 24px;">${p.description}</p>
        <div style="background: #FAF8F5; border: 1px solid #E6DFD3; border-radius: 12px; padding: 20px;">
          <p style="margin: 0; color: #4B5563; font-size: 0.95rem;">
            <strong>Store Address:</strong> ${storeConfig.address.fullFormatted}<br/>
            <strong>Phone / WhatsApp:</strong> ${storeConfig.phone}<br/>
            Open 7 days a week.
          </p>
        </div>
      </article>
    `
  })
}

// 8. 9 Category Pages (Fully detailed visible text)
for (const [slug, cat] of Object.entries(CATEGORIES_DATA)) {
  const faqsHtml = cat.faqs && cat.faqs.length > 0
    ? `<section style="margin-top: 32px; border-top: 1px solid #E6DFD3; pt-6;">
        <h2 style="font-size: 1.4rem; color: #3D405B; margin-bottom: 16px;">Frequently Asked Questions — ${cat.h1}</h2>
        ${cat.faqs.map(f => `
          <div style="margin-bottom: 16px; background: #FAF8F5; padding: 16px; border-radius: 8px;">
            <h3 style="font-size: 1rem; color: #3D405B; margin-bottom: 6px;">${f.q}</h3>
            <p style="font-size: 0.9rem; color: #4B5563; margin: 0; line-height: 1.6;">${f.a}</p>
          </div>
        `).join('')}
       </section>`
    : ''

  routes.push({
    url: `/${slug}`,
    title: cat.metaTitle || cat.title,
    description: cat.metaDescription,
    canonical: `${SITE_URL}/${slug}`,
    image: `${SITE_URL}/images/og-kids-city.jpg`,
    priority: '0.9',
    changefreq: 'weekly',
    isIndexed: true,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: cat.h1,
        url: `${SITE_URL}/${slug}`,
        description: cat.metaDescription,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE_URL}/collections` },
            { '@type': 'ListItem', position: 3, name: cat.h1, item: `${SITE_URL}/${slug}` }
          ]
        }
      }
    ],
    rootHtml: `
      <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
        <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;">
          <a href="/">Home</a> &gt; <a href="/collections">Collections</a> &gt; <span>${cat.h1}</span>
        </nav>
        <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">${cat.h1}</h1>
        <p style="font-size: 1.05rem; color: #4B5563; line-height: 1.7; margin-bottom: 20px;">${cat.intro}</p>
        <div style="background: #FAF8F5; border: 1px solid #E6DFD3; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 0.95rem; color: #3D405B;">
            <strong>Pricing:</strong> ${cat.priceRange} | <strong>Store:</strong> ${storeConfig.address.fullFormatted}
          </p>
        </div>
        <p style="margin-bottom: 24px;">
          <a href="https://wa.me/${storeConfig.whatsappRaw}?text=Hi%20Kids%20City!%20Looking%20for%20${encodeURIComponent(cat.h1)}" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block;">
            Inquire on WhatsApp: ${storeConfig.phone}
          </a>
        </p>
        ${faqsHtml}
      </article>
    `
  })
}

// 9. Area Pages (Only Wakad is confirmed & indexed; other 7 are marked noindex and excluded from sitemap)
for (const [slug, area] of Object.entries(AREAS_DATA)) {
  const isConfirmed = area.confirmed === true

  const faqsHtml = area.faqs && area.faqs.length > 0
    ? `<section style="margin-top: 32px; border-top: 1px solid #E6DFD3; pt-6;">
        <h2 style="font-size: 1.4rem; color: #3D405B; margin-bottom: 16px;">Frequently Asked Questions — ${area.areaName}</h2>
        ${area.faqs.map(f => `
          <div style="margin-bottom: 16px; background: #FAF8F5; padding: 16px; border-radius: 8px;">
            <h3 style="font-size: 1rem; color: #3D405B; margin-bottom: 6px;">${f.q}</h3>
            <p style="font-size: 0.9rem; color: #4B5563; margin: 0; line-height: 1.6;">${f.a}</p>
          </div>
        `).join('')}
       </section>`
    : ''

  routes.push({
    url: `/${slug}`,
    title: area.metaTitle,
    description: area.metaDescription,
    canonical: `${SITE_URL}/${slug}`,
    image: `${SITE_URL}/images/og-kids-city.jpg`,
    priority: isConfirmed ? '0.85' : '0.1',
    changefreq: 'weekly',
    isIndexed: isConfirmed, // ONLY indexed if confirmed by owner!
    schema: isConfirmed ? [
      {
        '@context': 'https://schema.org',
        '@type': 'ClothingStore',
        name: `Kids City — ${area.areaName}`,
        url: `${SITE_URL}/${slug}`,
        description: area.metaDescription,
        telephone: storeConfig.phone,
        address: clothingStoreSchema.address,
        geo: clothingStoreSchema.geo,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: area.areaName
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Pune Delivery', item: `${SITE_URL}/kids-clothes-delivery-pune` },
            { '@type': 'ListItem', position: 3, name: area.areaName, item: `${SITE_URL}/${slug}` }
          ]
        }
      }
    ] : [],
    rootHtml: `
      <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
        <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;">
          <a href="/">Home</a> &gt; <a href="/kids-clothes-delivery-pune">Pune Delivery</a> &gt; <span>${area.areaName}</span>
        </nav>
        <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">${area.h1}</h1>
        ${!isConfirmed ? `
          <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
            <p style="color: #92400E; margin: 0; font-size: 0.9rem;">
              <strong>Notice:</strong> Direct home delivery to ${area.areaName} is currently pending owner confirmation. Please WhatsApp us at ${storeConfig.phone} to check current service availability.
            </p>
          </div>
        ` : ''}
        <p style="font-size: 1.05rem; color: #4B5563; line-height: 1.7; margin-bottom: 20px;">${area.introText}</p>
        <div style="background: #FAF8F5; border: 1px solid #E6DFD3; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 0.95rem; color: #3D405B;">
            <strong>Service Status:</strong> ${area.deliveryStatusText}<br/>
            <strong>Landmarks:</strong> ${area.landmarks}
          </p>
        </div>
        <div style="font-size: 0.95rem; color: #4B5563; line-height: 1.8; margin-bottom: 24px;">
          <p>${area.detailsParagraph1}</p>
          <p>${area.detailsParagraph2}</p>
        </div>
        <p>
          <a href="https://wa.me/${storeConfig.whatsappRaw}?text=Hi%20Kids%20City!%20Looking%20for%20kids%20clothes%20in%20${encodeURIComponent(area.areaName)}" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block;">
            Inquire on WhatsApp: ${storeConfig.phone}
          </a>
        </p>
        ${faqsHtml}
      </article>
    `
  })
}

// 10. Published Product Pages (ONLY for products with isPublished === true in products.csv!)
for (const prod of publishedProducts) {
  const prodUrl = `/product/${prod.slug}`
  routes.push({
    url: prodUrl,
    title: `${prod.name} in Pune | Kids City, Wakad`,
    description: `Buy ${prod.name} at Kids City Pune. Available sizes: ${prod.sizes.join(', ')}. Price: ${prod.price}. Inquire on WhatsApp or visit Wakad store.`,
    canonical: `${SITE_URL}${prodUrl}`,
    image: `${SITE_URL}${prod.img}`,
    priority: '0.85',
    changefreq: 'daily',
    isIndexed: true,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: prod.name,
        image: prod.photos.map(p => `${SITE_URL}${p}`),
        description: `${prod.name} for children in Pune at Kids City Wakad.`,
        sku: `KC-${prod.id}`,
        brand: { '@type': 'Brand', name: 'Kids City' },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}${prodUrl}`,
          priceCurrency: 'INR',
          price: prod.priceVal || 0,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Kids City' }
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE_URL}/collections` },
          { '@type': 'ListItem', position: 3, name: prod.category, item: `${SITE_URL}/collections` },
          { '@type': 'ListItem', position: 4, name: prod.name, item: `${SITE_URL}${prodUrl}` }
        ]
      }
    ],
    rootHtml: `
      <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
        <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;">
          <a href="/">Home</a> &gt; <a href="/collections">Collections</a> &gt; <span>${prod.name}</span>
        </nav>
        <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 12px;">${prod.name}</h1>
        <p style="font-size: 1.2rem; color: #E07A5F; font-weight: bold; margin-bottom: 12px;">Price: ${prod.price}</p>
        <p style="font-size: 0.95rem; color: #4B5563; margin-bottom: 16px;">
          <strong>Category:</strong> ${prod.category} | <strong>Available Sizes:</strong> ${prod.sizes.join(', ')}
        </p>
        <p style="font-size: 0.95rem; color: #4B5563; margin-bottom: 24px;">
          <strong>Fabric:</strong> ${prod.fabric || 'Soft cotton blend (contact store for specifics)'}
        </p>
        <p>
          <a href="https://wa.me/${storeConfig.whatsappRaw}?text=Hi%20Kids%20City!%20I%20am%20interested%20in%20${encodeURIComponent(prod.name)}%20(${encodeURIComponent(SITE_URL + prodUrl)})" style="background: #25D366; color: white; padding: 12px 24px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block;">
            Order on WhatsApp: ${storeConfig.phone}
          </a>
        </p>
      </article>
    `
  })
}

// 11. 5 Blog Posts (Full article visible text)
for (const [slug, post] of Object.entries(BLOG_POSTS_DATA)) {
  const blogUrl = `/blog/${slug}`
  routes.push({
    url: blogUrl,
    title: post.metaTitle,
    description: post.metaDescription,
    canonical: `${SITE_URL}${blogUrl}`,
    image: `${SITE_URL}${post.featuredImage}`,
    priority: '0.8',
    changefreq: 'monthly',
    isIndexed: true,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        image: `${SITE_URL}${post.featuredImage}`,
        datePublished: post.publishDate,
        dateModified: post.modifiedDate || TODAY,
        author: {
          '@type': 'Organization',
          name: 'Kids City Pune Team',
          url: `${SITE_URL}/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Kids City',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/logo_full.webp`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}${blogUrl}`
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}${blogUrl}` }
        ]
      }
    ],
    rootHtml: `
      <article style="padding: 24px; max-width: 900px; margin: 0 auto;">
        <nav style="font-size: 0.85rem; color: #6B7280; margin-bottom: 16px;">
          <a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt; <span>${post.title}</span>
        </nav>
        <h1 style="font-size: 2.2rem; color: #3D405B; margin-bottom: 8px;">${post.h1}</h1>
        <p style="font-size: 0.85rem; color: #6B7280; margin-bottom: 20px;">
          Published on ${post.publishDate} by ${post.author} · ${post.category}
        </p>
        <p style="font-size: 1.05rem; color: #4B5563; line-height: 1.7; margin-bottom: 24px;">
          ${post.excerpt}
        </p>
        <div style="background: #FAF8F5; border: 1px solid #E6DFD3; border-radius: 12px; padding: 20px; margin-top: 32px;">
          <h2 style="font-size: 1.2rem; color: #3D405B; margin-bottom: 8px;">Visit Kids City Wakad or Order on WhatsApp</h2>
          <p style="font-size: 0.95rem; color: #4B5563; line-height: 1.6; margin-bottom: 16px;">
            Located at Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune. We deliver across Pune and PCMC upon inquiry.
          </p>
          <a href="https://wa.me/${storeConfig.whatsappRaw}?text=Hi%20Kids%20City!%20I%20read%20your%20article%20'${encodeURIComponent(post.title)}'%20and%20want%20to%20see%20outfits" style="background: #25D366; color: white; padding: 10px 20px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block;">
            WhatsApp Us: ${storeConfig.phone}
          </a>
        </div>
      </article>
    `
  })
}

// Function to render Route HTML
function renderRouteHtml(base, r) {
  let html = base

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${r.title}</title>`)

  // Replace <meta name="description" ...>
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/s, `<meta name="description" content="${r.description}" />`)

  // Replace <link rel="canonical" ...>
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s, `<link rel="canonical" href="${r.canonical}" />`)

  // Replace Robots tag if unindexed
  if (!r.isIndexed) {
    html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/s, `<meta name="robots" content="noindex, nofollow" />`)
  } else {
    html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/s, `<meta name="robots" content="index, follow, max-image-preview:large" />`)
  }

  // Replace Open Graph tags
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s, `<meta property="og:title" content="${r.title}" />`)
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s, `<meta property="og:description" content="${r.description}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s, `<meta property="og:url" content="${r.canonical}" />`)
  if (r.image) {
    html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/s, `<meta property="og:image" content="${r.image}" />`)
    html = html.replace(/<meta\s+property="og:image:secure_url"\s+content=".*?"\s*\/?>/s, `<meta property="og:image:secure_url" content="${r.image}" />`)
  }

  // Replace Twitter tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s, `<meta name="twitter:title" content="${r.title}" />`)
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s, `<meta name="twitter:description" content="${r.description}" />`)
  if (r.image) {
    html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/s, `<meta name="twitter:image" content="${r.image}" />`)
  }

  // Inject Schemas before Vite assets / </head>
  if (r.schema && r.schema.length > 0) {
    const schemasHtml = r.schema.map(s => `\n    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`).join('')
    if (html.includes('<!-- STRUCTURED_DATA_START -->') && html.includes('<!-- STRUCTURED_DATA_END -->')) {
      html = html.replace(
        /<!-- STRUCTURED_DATA_START -->[\s\S]*?<!-- STRUCTURED_DATA_END -->/,
        `<!-- Route Specific Structured Data -->${schemasHtml}\n    <!-- STRUCTURED_DATA_END -->`
      )
    } else {
      const matchHead = /<!-- ================================================================\s+Structured Data Block 1[\s\S]*?<\/script>\s*(?=<script type="module"|<link rel="stylesheet"|<\/head>)/
      if (matchHead.test(html)) {
        html = html.replace(matchHead, `<!-- Route Specific Structured Data -->${schemasHtml}\n    `)
      } else {
        html = html.replace('</head>', `${schemasHtml}\n  </head>`)
      }
    }
  }

  // Inject FULL visible page text inside <div id="root"></div>
  if (r.rootHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${r.rootHtml}</div>`)
  }

  return html
}

// 1. Output HTML files
for (const r of routes) {
  const rendered = renderRouteHtml(baseHtml, r)
  if (r.url === '/') {
    fs.writeFileSync(path.resolve(distDir, 'index.html'), rendered, 'utf8')
  } else {
    const routeRelative = r.url.startsWith('/') ? r.url.slice(1) : r.url
    const targetDir = path.resolve(distDir, routeRelative)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }
    fs.writeFileSync(path.resolve(targetDir, 'index.html'), rendered, 'utf8')
  }
}

console.log(`[Prerender] Successfully generated static index.html files for all ${routes.length} routes in dist/`)

// 2. Build XML Sitemap (ONLY for indexed & confirmed routes!)
const indexedRoutes = routes.filter(r => r.isIndexed)

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

for (const r of indexedRoutes) {
  sitemapXml += `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq || 'weekly'}</changefreq>
    <priority>${r.priority || '0.8'}</priority>
`
  if (r.image) {
    sitemapXml += `    <image:image>
      <image:loc>${r.image}</image:loc>
      <image:title><![CDATA[${r.title}]]></image:title>
    </image:image>
`
  }
  sitemapXml += `  </url>
`
}

sitemapXml += `</urlset>\n`

fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf8')
fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8')
console.log(`[Prerender] Successfully generated sitemap.xml with ${indexedRoutes.length} confirmed URLs in dist/ and public/`)

// 3. Build robots.txt
const robotsTxt = `# Kids City — kidscity.online
# robots.txt — updated ${TODAY}

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /callback-sheet

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Googlebot-Image
Allow: /images/

User-agent: Bingbot
Allow: /
Crawl-delay: 2

Sitemap: ${SITE_URL}/sitemap.xml
`

fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf8')
fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf8')
console.log(`[Prerender] Successfully generated robots.txt in dist/ and public/`)
