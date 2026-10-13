import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { PRODUCTS, CATEGORIES_DATA, AREAS_DATA, BLOG_POSTS_DATA } from '../src/data/products.js'

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

// Common Organization Schema
const orgSchema = {
  '@type': ['Organization', 'LocalBusiness', 'ClothingStore'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Kids City',
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
  description: 'Kids City is a premier children clothing store in Pune established in 2018. We specialize in skin-safe cotton night suits, festival wear including Navratri lehengas and Diwali kurtas, birthday party dresses, and everyday casual outfits for boys and girls aged 0 to 14 years. Store in Wakad with home delivery across Pune.',
  telephone: '+91-78916-72762',
  email: 'kidscitywakad@gmail.com',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Debit Card, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, beside Annapurna Veg Restaurant, Kaspate Wasti, Wakad',
    addressLocality: 'Wakad, Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411057',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.5980911,
    longitude: 73.7744639
  },
  hasMap: 'https://www.google.com/maps/dir//Kids+City+Wakad',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:30'
    }
  ],
  areaServed: [
    { '@type': 'City', name: 'Pune' },
    { '@type': 'City', name: 'Pimpri-Chinchwad' },
    { '@type': 'AdministrativeArea', name: 'Wakad' },
    { '@type': 'AdministrativeArea', name: 'Hinjewadi' },
    { '@type': 'AdministrativeArea', name: 'Baner' },
    { '@type': 'AdministrativeArea', name: 'Balewadi' },
    { '@type': 'AdministrativeArea', name: 'Pimple Saudagar' },
    { '@type': 'AdministrativeArea', name: 'Aundh' },
    { '@type': 'AdministrativeArea', name: 'Ravet' },
    { '@type': 'AdministrativeArea', name: 'Tathawade' },
    { '@type': 'AdministrativeArea', name: 'Kothrud' }
  ],
  sameAs: [
    'https://instagram.com/kidscity____',
    'https://www.google.com/maps/dir//Kids+City+Wakad'
  ],
  foundingDate: '2018',
  slogan: 'Clothes for Little Explorers'
}

// Generate routes table
const routes = []

// 1. Homepage
routes.push({
  url: '/',
  title: 'Kids City | Best Kids Clothes Shop in Pune — From ₹299',
  description: 'Kids City is Pune trusted children clothing store. Shop skin-safe cotton night suits, birthday dresses & ethnic wear from ₹299. 4.9★ rated. Pune delivery.',
  canonical: `${SITE_URL}/`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '1.0',
  changefreq: 'weekly',
  schema: [
    {
      '@context': 'https://schema.org',
      '@graph': [
        orgSchema,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: 'Kids City',
          description: 'Best kids clothes shop in Wakad, Pune — festival wear, birthday dresses, traditional outfits, and casual wear for boys & girls aged 0–14 years.',
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: 'en-IN',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SITE_URL}/collections?s={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        }
      ]
    }
  ],
  rootHtml: `
    <header style="padding: 20px; text-align: center;">
      <h1>Kids City — Best Kids Clothes Shop in Pune</h1>
      <p>Premium Festive Wear, Birthday Dresses & Cotton Night Suits (Ages 0–14) from ₹299. Store in Wakad with fast delivery across Pune & PCMC.</p>
      <p><strong>4.9★ on Google (141 reviews) | Since 2018 | Open Daily 10:00 AM – 9:30 PM</strong></p>
      <p><a href="https://wa.me/917891672762?text=Hello%20Kids%20City!%20I%20am%20interested%20in%20your%20collection.">Order on WhatsApp: +91 78916 72762</a> | <a href="/collections">Browse Collections</a></p>
    </header>
  `
})

// 2. Collections / Catalog
routes.push({
  url: '/collections',
  title: 'Kids Clothing Collections in Pune | Kids City, Wakad',
  description: 'Explore full catalog of boys and girls clothing in Pune: festival lehengas, kurtas, birthday frocks, cotton night suits & baby sets. Shop from ₹299.',
  canonical: `${SITE_URL}/collections`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.95',
  changefreq: 'daily',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Kids Clothing Collections in Pune',
      url: `${SITE_URL}/collections`,
      description: 'Explore full catalog of boys and girls clothing in Pune: festival lehengas, kurtas, birthday frocks, cotton night suits & baby sets from ₹299.',
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
    <header style="padding: 20px;">
      <h1>Kids Clothing Collections in Pune — Kids City</h1>
      <p>Explore 100+ curated outfits for newborn babies to teenagers (0–14 years). High quality, skin-safe fabrics, and pocket-friendly pricing.</p>
    </header>
  `
})

// 3. Delivery Hub
routes.push({
  url: '/kids-clothes-delivery-pune',
  title: 'Kids Clothes Home Delivery in Pune & PCMC | Kids City',
  description: 'Fast kids clothing home delivery across Pune & PCMC: Same-day delivery in Wakad, Baner, Hinjewadi, Balewadi & 24h across Pune. Order on WhatsApp.',
  canonical: `${SITE_URL}/kids-clothes-delivery-pune`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.9',
  changefreq: 'weekly',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Kids Clothes Home Delivery in Pune & PCMC',
      url: `${SITE_URL}/kids-clothes-delivery-pune`,
      description: 'Fast kids clothing home delivery across Pune & PCMC: Same-day delivery in Wakad, Baner, Hinjewadi, Balewadi & 24h across Pune.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Pune Delivery Hub', item: `${SITE_URL}/kids-clothes-delivery-pune` }
        ]
      }
    }
  ],
  rootHtml: `
    <header style="padding: 20px;">
      <h1>Kids Clothes Home Delivery Across Pune & PCMC</h1>
      <p>Fast doorstep delivery for baby and children clothes directly from Kids City Wakad.</p>
    </header>
  `
})

// 4. Size Guide
routes.push({
  url: '/kids-clothing-size-guide',
  title: 'Indian Kids Clothing Size Chart & Guide | Kids City',
  description: 'Indian kids clothing size chart for ages 0–14 years. Easy measurements for age, height in cm, and chest size. Find the perfect fit at Kids City Pune.',
  canonical: `${SITE_URL}/kids-clothing-size-guide`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.85',
  changefreq: 'monthly',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Indian Kids Clothing Size Chart & Fit Guide',
      url: `${SITE_URL}/kids-clothing-size-guide`,
      description: 'Indian kids clothing size chart for ages 0–14 years. Easy measurements for age, height in cm, and chest size.',
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
    <header style="padding: 20px;">
      <h1>Indian Kids Clothing Size Chart (Ages 0–14)</h1>
      <p>Standard measurements for height, chest, and age to ensure comfortable, tear-free fits.</p>
    </header>
  `
})

// 5. Reviews
routes.push({
  url: '/reviews',
  title: 'Customer Reviews & Ratings (4.9★) | Kids City Wakad Pune',
  description: 'Read real reviews from Pune parents about Kids City Wakad. 4.9★ Google rating from 141+ parents praising our fabric softness, pricing & friendly service.',
  canonical: `${SITE_URL}/reviews`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.85',
  changefreq: 'weekly',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Kids City Wakad Customer Reviews',
      url: `${SITE_URL}/reviews`,
      description: 'Customer reviews and ratings for Kids City Wakad Pune children clothing store.',
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
    <header style="padding: 20px;">
      <h1>What Pune Parents Say About Kids City Wakad</h1>
      <p>4.9★ Google Rating based on 141+ genuine customer reviews since 2018.</p>
    </header>
  `
})

// 6. Blog Hub
routes.push({
  url: '/blog',
  title: 'Kids Fashion & Parenting Blog Pune | Kids City',
  description: 'Expert kids fashion guides, festival dressing tips, Indian size charts & baby care advice for parents in Pune from the Kids City styling team.',
  canonical: `${SITE_URL}/blog`,
  image: `${SITE_URL}/images/og-kids-city.jpg`,
  priority: '0.85',
  changefreq: 'weekly',
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Kids City Pune Fashion & Parenting Blog',
      url: `${SITE_URL}/blog`,
      description: 'Expert kids fashion guides, festival dressing tips, Indian size charts & baby care advice for parents in Pune.',
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
    <header style="padding: 20px;">
      <h1>Kids Fashion & Parenting Blog — Pune Guides</h1>
      <p>Practical styling tips, festival clothing guides, fabric advice, and sizing help for Pune parents.</p>
    </header>
  `
})

// 7. Core Static Info Pages
const staticPages = [
  {
    url: '/about',
    title: 'About Us | Kids City — Children Clothing Store Pune',
    description: 'Learn about Kids City Wakad, established in 2018. Pune favorite neighborhood store for premium, comfortable and affordable kids fashion aged 0–14.',
    priority: '0.75'
  },
  {
    url: '/contact',
    title: 'Contact Kids City Wakad Pune | Phone, Map & Hours',
    description: 'Visit Kids City in Mahalaxmi Complex, Wakad, Pune or message +91 78916 72762 on WhatsApp. Open daily 10:00 AM to 9:30 PM. Fast Pune delivery.',
    priority: '0.8'
  },
  {
    url: '/faq',
    title: 'Frequently Asked Questions | Kids City Wakad Pune',
    description: 'Find answers on delivery areas in Pune, exchange policies, clothing sizes, payment options & WhatsApp ordering at Kids City Wakad.',
    priority: '0.75'
  },
  {
    url: '/privacy-policy',
    title: 'Privacy Policy | Kids City Wakad Pune',
    description: 'Kids City privacy policy. How we protect your personal information and maintain strict privacy during online orders and visits.',
    priority: '0.4'
  },
  {
    url: '/terms',
    title: 'Terms & Conditions | Kids City Wakad Pune',
    description: 'Terms and conditions for shopping online and in-store with Kids City children wear Wakad, Pune.',
    priority: '0.4'
  },
  {
    url: '/shipping-policy',
    title: 'Shipping & Delivery Policy | Kids City Pune',
    description: 'Shipping timelines, courier partners, delivery fees, and same-day express delivery terms across Pune and PCMC from Kids City.',
    priority: '0.4'
  },
  {
    url: '/return-policy',
    title: 'Return & Exchange Policy | Kids City Wakad Pune',
    description: 'Kids City 7-day hassle-free exchange policy for kids clothing. Easy size exchanges across Pune with original bill and tags.',
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
      <header style="padding: 20px;">
        <h1>${p.title.split('|')[0].trim()}</h1>
        <p>${p.description}</p>
      </header>
    `
  })
}

// 8. 9 Category Pages
for (const [slug, cat] of Object.entries(CATEGORIES_DATA)) {
  routes.push({
    url: `/${slug}`,
    title: cat.metaTitle || `${cat.title}`,
    description: cat.metaDescription,
    canonical: `${SITE_URL}/${slug}`,
    image: `${SITE_URL}/images/og-kids-city.jpg`,
    priority: '0.9',
    changefreq: 'weekly',
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
      <article style="padding: 20px;">
        <nav><a href="/">Home</a> &gt; <a href="/collections">Collections</a> &gt; <span>${cat.h1}</span></nav>
        <h1>${cat.h1}</h1>
        <p>${cat.intro}</p>
        <p><strong>Price Range:</strong> ${cat.priceRange} | <strong>Store:</strong> Shop No 12, Mahalaxmi Complex, Wakad, Pune</p>
        <p><a href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20Looking%20for%20${encodeURIComponent(cat.h1)}">Order on WhatsApp: +91 78916 72762</a></p>
      </article>
    `
  })
}

// 9. 8 Area Landing Pages
for (const [slug, area] of Object.entries(AREAS_DATA)) {
  routes.push({
    url: `/${slug}`,
    title: area.metaTitle,
    description: area.metaDescription,
    canonical: `${SITE_URL}/${slug}`,
    image: `${SITE_URL}/images/og-kids-city.jpg`,
    priority: '0.85',
    changefreq: 'weekly',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': ['ClothingStore', 'LocalBusiness'],
        name: `Kids City — ${area.areaName}`,
        url: `${SITE_URL}/${slug}`,
        description: area.metaDescription,
        telephone: '+91-78916-72762',
        address: orgSchema.address,
        geo: orgSchema.geo,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: area.areaName
        },
        openingHoursSpecification: orgSchema.openingHoursSpecification,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Pune Delivery', item: `${SITE_URL}/kids-clothes-delivery-pune` },
            { '@type': 'ListItem', position: 3, name: area.areaName, item: `${SITE_URL}/${slug}` }
          ]
        }
      }
    ],
    rootHtml: `
      <article style="padding: 20px;">
        <nav><a href="/">Home</a> &gt; <a href="/kids-clothes-delivery-pune">Pune Delivery</a> &gt; <span>${area.areaName}</span></nav>
        <h1>${area.h1}</h1>
        <p>${area.deliveryTime}</p>
        <p><strong>Landmarks:</strong> ${area.landmarks}</p>
        <p><strong>Popular Items:</strong> ${area.popularItems}</p>
        <p><a href="https://wa.me/917891672762?text=Hi%20Kids%20City!%20I%20am%20from%20${encodeURIComponent(area.areaName)}%20and%20looking%20for%20kids%20clothes">Order on WhatsApp: +91 78916 72762</a></p>
      </article>
    `
  })
}

// 10. 25 Product Pages
for (const prod of PRODUCTS) {
  const prodUrl = `/product/${prod.slug}`
  routes.push({
    url: prodUrl,
    title: `${prod.name} (Ages ${prod.sizes.join(', ')}) in Pune | Kids City`,
    description: `Buy ${prod.name} at Kids City Pune for ${prod.price}. ${prod.desc.slice(0, 95)}... Same-day Wakad & Pune delivery. Order on WhatsApp!`,
    canonical: `${SITE_URL}${prodUrl}`,
    image: `${SITE_URL}${prod.img}`,
    priority: '0.85',
    changefreq: 'daily',
    images: [
      { loc: `${SITE_URL}${prod.img}`, title: prod.name, caption: prod.desc }
    ],
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: prod.name,
        image: [`${SITE_URL}${prod.img}`, ...(prod.gallery || []).map(g => `${SITE_URL}${g}`)],
        description: prod.desc,
        sku: `KC-${prod.id}`,
        brand: {
          '@type': 'Brand',
          name: 'Kids City'
        },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}${prodUrl}`,
          priceCurrency: 'INR',
          price: prod.priceVal,
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Kids City'
          }
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE_URL}/collections` },
          { '@type': 'ListItem', position: 3, name: prod.category, item: `${SITE_URL}/${prod.categorySlug || 'collections'}` },
          { '@type': 'ListItem', position: 4, name: prod.name, item: `${SITE_URL}${prodUrl}` }
        ]
      }
    ],
    rootHtml: `
      <article style="padding: 20px;">
        <nav><a href="/">Home</a> &gt; <a href="/collections">Collections</a> &gt; <a href="/${prod.categorySlug || 'collections'}">${prod.category}</a> &gt; <span>${prod.name}</span></nav>
        <h1>${prod.name} — Kids Clothes Pune</h1>
        <p><strong>Price:</strong> ${prod.price} (Inclusive of taxes)</p>
        <p><strong>Available Sizes:</strong> ${prod.sizes.join(', ')}</p>
        <p>${prod.desc}</p>
        <p><a href="https://wa.me/917891672762?text=Hello%20Kids%20City!%20I%20am%20interested%20in%20${encodeURIComponent(prod.name)}%20(${encodeURIComponent(SITE_URL + prodUrl)})">Order on WhatsApp: +91 78916 72762</a></p>
      </article>
    `
  })
}

// 11. 5 Blog Posts
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
    images: [
      { loc: `${SITE_URL}${post.featuredImage}`, title: post.title, caption: post.excerpt }
    ],
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
      <article style="padding: 20px;">
        <nav><a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt; <span>${post.title}</span></nav>
        <h1>${post.h1}</h1>
        <p><em>Published: ${post.publishDate} | By ${post.author}</em></p>
        <p>${post.excerpt}</p>
        <p><a href="/collections">Browse Kids Clothing Collection</a> | <a href="https://wa.me/917891672762">WhatsApp Order</a></p>
      </article>
    `
  })
}

console.log(`[Prerender] Prepared ${routes.length} total routes for static HTML generation and sitemap.`)

// Function to replace metadata in base HTML
function renderRouteHtml(base, r) {
  let html = base

  // Replace <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${r.title}</title>`)

  // Replace <meta name="description" ...>
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/s, `<meta name="description" content="${r.description}" />`)

  // Replace <link rel="canonical" ...>
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s, `<link rel="canonical" href="${r.canonical}" />`)

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

  // Inject Schemas before </head>
  if (r.schema && r.schema.length > 0) {
    const schemasHtml = r.schema.map(s => `\n    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`).join('')
    // Remove existing Structured Data blocks if present or append
    // In our base index.html, Structured Data blocks are between <!-- Structured Data Block 1 ... and </head>
    // We can replace from Structured Data Block 1 down to right before </head>
    const matchHead = /<!-- ================================================================\s+Structured Data Block 1[\s\S]*?<\/head>/
    if (matchHead.test(html)) {
      html = html.replace(matchHead, `<!-- Route Specific Structured Data -->${schemasHtml}\n  </head>`)
    } else {
      html = html.replace('</head>', `${schemasHtml}\n  </head>`)
    }
  }

  // Inject root semantic HTML inside <div id="root"></div>
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

// 2. Build XML Sitemap
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

for (const r of routes) {
  sitemapXml += `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq || 'weekly'}</changefreq>
    <priority>${r.priority || '0.8'}</priority>
`
  if (r.images && r.images.length > 0) {
    for (const img of r.images) {
      sitemapXml += `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title><![CDATA[${img.title}]]></image:title>
      <image:caption><![CDATA[${img.caption || img.title}]]></image:caption>
    </image:image>
`
    }
  } else if (r.image) {
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
console.log(`[Prerender] Successfully generated sitemap.xml with ${routes.length} URLs in dist/ and public/`)

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

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: DuckDuckBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf8')
fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf8')
console.log(`[Prerender] Successfully generated robots.txt in dist/ and public/`)
