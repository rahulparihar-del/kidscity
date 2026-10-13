import { CATEGORIES_DATA, AREAS_DATA, BLOG_POSTS_DATA } from '../data/products'

const SITE_URL = 'https://kidscity.online'
const OG_IMAGE = `${SITE_URL}/images/og-kids-city.jpg`

export const CORE_PAGES_SEO = {
  home: {
    title: 'Kids City | Kids Clothes Shop in Wakad, Pune',
    description: 'Kids City is a children clothing boutique in Wakad, Pune. Festive lehengas, kurtas, birthday frocks & cotton night suits. 4.9★ on Google.',
    canonical: `${SITE_URL}/`,
  },
  shop: {
    title: 'Kids Clothing Collections in Pune | Kids City, Wakad',
    description: 'Browse kids outfits in Pune: Cotton night suits, birthday frocks & festive kurtas from Kids City Wakad. WhatsApp ordering & local delivery.',
    canonical: `${SITE_URL}/collections`,
  },
  'kids-clothes-delivery-pune': {
    title: 'Kids Clothes Home Delivery in Pune & PCMC | Kids City',
    description: 'Kids clothing delivery in Wakad and nearby Pune areas from Kids City. Delivery information & WhatsApp ordering support.',
    canonical: `${SITE_URL}/kids-clothes-delivery-pune`,
  },
  'kids-clothing-size-guide': {
    title: 'Kids Size Guide India | Age, Height & Chest — Kids City',
    description: 'Find the proper fit for your child with our Indian kids clothing size chart (0 to 15 years). Easy height and chest guide with WhatsApp sizing support.',
    canonical: `${SITE_URL}/kids-clothing-size-guide`,
  },
  contact: {
    title: 'Contact Kids City | Kids Clothes Store Wakad, Pune',
    description: 'Contact Kids City in Wakad, Pune. Visit our store at Mahalaxmi Complex or WhatsApp +91 78916 72762. Open daily.',
    canonical: `${SITE_URL}/contact`,
  },
  about: {
    title: 'About Kids City Wakad | Trusted Pune Kids Boutique Since 2018',
    description: 'Kids City has dressed Pune children since 2018. Rated 4.9★ by 141 reviews on Google for festive wear, birthday dresses & friendly service in Wakad, Pune.',
    canonical: `${SITE_URL}/about`,
  },
  faq: {
    title: 'Kids Clothing FAQ | Timings, Delivery & Sizing — Kids City',
    description: 'Got questions about kids clothes shopping, store timings, size exchanges, or delivery? Read answers from Kids City Wakad.',
    canonical: `${SITE_URL}/faq`,
  },
  reviews: {
    title: 'Kids City Customer Reviews | 4.9★ Rating — Wakad, Pune',
    description: 'Read real verified parent reviews for Kids City Wakad, Pune. 4.9★ Google rating from 141 Pune families for quality kids wear and customer service.',
    canonical: `${SITE_URL}/reviews`,
  },
  blog: {
    title: 'Kids Fashion & Parenting Blog Pune | Kids City Guides',
    description: 'Helpful Pune parenting guides: Diwali outfits, 1st birthday dresses, Indian kids size chart, winter fashion & wedding wear for boys and girls.',
    canonical: `${SITE_URL}/blog`,
  },
  'privacy-policy': {
    title: 'Privacy Policy | Kids City Wakad, Pune',
    description: 'Kids City privacy policy. How we safeguard customer data when you browse our website or place WhatsApp inquiries.',
    canonical: `${SITE_URL}/privacy-policy`,
  },
  terms: {
    title: 'Terms & Conditions | Kids City Wakad, Pune',
    description: 'Terms and conditions for shopping at Kids City boutique and placing WhatsApp inquiries.',
    canonical: `${SITE_URL}/terms`,
  },
  'shipping-policy': {
    title: 'Delivery Policy Pune | Delivery in Wakad & Nearby — Kids City',
    description: 'Kids City delivery policy. Delivery in Wakad and nearby areas. Message us on WhatsApp with your pincode to confirm.',
    canonical: `${SITE_URL}/shipping-policy`,
  },
  'return-policy': {
    title: 'Return & Exchange Policy | In-Store Size Exchange — Kids City',
    description: 'In-store size exchange policy at Kids City Wakad. Size replacement for unworn garments with original bill and tags intact.',
    canonical: `${SITE_URL}/return-policy`,
  },
  404: {
    title: 'Page Not Found | Kids City Wakad, Pune',
    description: 'The page you requested could not be found. Explore curated kids clothes styles at Kids City, Pune children fashion boutique.',
    canonical: `${SITE_URL}/404`,
  },
}

export function getProductSEO(product) {
  if (!product) return CORE_PAGES_SEO.shop
  const price = product.price ? ` — ${product.price}` : ''
  const category = product.category || 'Kids Clothes'
  const name = product.name.slice(0, 42)
  return {
    title: `${name} | ${category} Pune${price} — Kids City`,
    description: `Buy ${product.name} at Kids City, Pune${price}. Quality fabric, age ${product.sizes ? product.sizes.join(', ') : '0-15y'}. WhatsApp +91 78916 72762.`,
    canonical: `${SITE_URL}/product/${product.slug || product.id}`,
    ogImage: product.img ? (product.img.startsWith('http') ? product.img : `${SITE_URL}${product.img}`) : OG_IMAGE,
  }
}

export function getSEOForView(viewKey, param = null, extraData = null) {
  // 1. Core pages
  if (CORE_PAGES_SEO[viewKey]) {
    return CORE_PAGES_SEO[viewKey]
  }

  // 2. Category pages
  if (viewKey.startsWith('category-') || CATEGORIES_DATA[viewKey] || CATEGORIES_DATA[param]) {
    const slug = param || (viewKey.startsWith('category-') ? viewKey.replace('category-', '') : viewKey)
    const cat = CATEGORIES_DATA[slug]
    if (cat) {
      return {
        title: cat.metaTitle,
        description: cat.metaDescription,
        canonical: `${SITE_URL}/${cat.slug}`,
        ogImage: OG_IMAGE,
      }
    }
  }

  // 3. Area pages
  if (viewKey.startsWith('area-') || AREAS_DATA[viewKey] || AREAS_DATA[param]) {
    const slug = param || (viewKey.startsWith('area-') ? viewKey.replace('area-', '') : viewKey)
    const area = AREAS_DATA[slug]
    if (area) {
      return {
        title: area.metaTitle,
        description: area.metaDescription,
        canonical: `${SITE_URL}/${area.slug}`,
        ogImage: OG_IMAGE,
      }
    }
  }

  // 4. Blog post pages
  if (viewKey === 'blog-post' || BLOG_POSTS_DATA[param]) {
    const post = BLOG_POSTS_DATA[param]
    if (post) {
      return {
        title: post.metaTitle,
        description: post.metaDescription,
        canonical: `${SITE_URL}/blog/${post.slug}`,
        ogImage: post.featuredImage ? `${SITE_URL}${post.featuredImage}` : OG_IMAGE,
      }
    }
  }

  // 5. Product detail
  if (viewKey === 'product-detail' && extraData) {
    return getProductSEO(extraData)
  }

  return CORE_PAGES_SEO.home
}

/**
 * useSEO hook to update document title, description, canonical link, and Open Graph tags
 */
export function useSEO({ title, description, canonical, ogImage }) {
  if (typeof document === 'undefined') return

  if (title) {
    document.title = title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    const twTitle = document.querySelector('meta[name="twitter:title"]')
    if (twTitle) twTitle.setAttribute('content', title)
  }

  if (description) {
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)
    const twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twDesc) twDesc.setAttribute('content', description)
  }

  if (canonical) {
    const canLink = document.querySelector('link[rel="canonical"]')
    if (canLink) canLink.setAttribute('href', canonical)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', canonical)
  }

  if (ogImage) {
    const ogImg = document.querySelector('meta[property="og:image"]')
    if (ogImg) ogImg.setAttribute('content', ogImage)
    const twImg = document.querySelector('meta[name="twitter:image"]')
    if (twImg) twImg.setAttribute('content', ogImage)
  }
}
