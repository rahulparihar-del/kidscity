/**
 * useSEO — updates document <title> and meta description dynamically
 * as users navigate between views without a full page reload.
 *
 * Usage:  useSEO({ title, description })
 */
export function useSEO({ title, description }) {
  if (typeof document === 'undefined') return

  // Title
  if (title) {
    document.title = title
  }

  // Meta description
  if (description) {
    let meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }
}

/** Page-level SEO configs — one per view */
export const PAGE_SEO = {
  home: {
    title: 'Kids City | Night Suits, Festival & Baby Wear Online — From ₹399',
    description:
      'Shop soft, skin-safe kids wear from ₹399! Night suits, baby clothes, Navratri lehengas & birthday dresses for ages 0–12 yrs. 4.9★ rated · 500+ happy parents · COD available · Easy exchanges. Order via WhatsApp or visit Wakad, Pune.',
  },
  shop: {
    title: 'Buy Kids Clothes Online India | Night Suits, Baby Wear & Festival Dresses — Kids City',
    description:
      'Browse 500+ kids outfits online — cotton night suits from ₹399, Navratri lehengas, birthday frocks, baby rompers & casual sets (0–12 yrs). COD available. Free delivery in Wakad. Fast shipping across India.',
  },
  contact: {
    title: 'Contact Kids City | Kids Clothes Shop Wakad, Pune — Visit or WhatsApp Us',
    description:
      'Contact Kids City, Wakad\'s best children\'s clothing store. Visit us at Mahalaxmi Complex, Chatrapati Chowk Road, Wakad, Pune 411057. Open daily 10 AM\u20139:30 PM. Call or WhatsApp +91 78916 72762. Serving Wakad, Hinjewadi, Baner & all of Pune.',
  },
  about: {
    title: 'About Kids City Wakad | Best Kids Clothes Shop in Pune Since 2018',
    description:
      'Learn about Kids City — Wakad\'s most trusted children\'s clothing store since 2018. We offer 500+ premium kids outfits for boys & girls aged 0\u201314 years. 4.9\u2605 Google rating. Located at Mahalaxmi Complex, Wakad.',
  },
  faq: {
    title: 'FAQ — Kids City Wakad | Kids Clothes Shop Pune Questions Answered',
    description:
      'Frequently asked questions about Kids City, Wakad\'s best kids fashion store. Find answers about store location, timings, size exchanges, delivery, birthday dresses, festival wear, and more. Open daily in Wakad, Pune.',
  },
  'privacy-policy': {
    title: 'Privacy Policy | Kids City Wakad, Pune',
    description:
      'Read the Privacy Policy of Kids City, Wakad\'s trusted children\'s clothing store. Learn how we protect your information at Shop No 12, Mahalaxmi Complex, Wakad, Pune.',
  },
  'terms': {
    title: 'Terms & Conditions | Kids City Wakad, Pune',
    description:
      'Terms and Conditions for shopping at Kids City, Wakad\'s best kids clothes store. Review our purchase, exchange, and website use policies at our Pune store.',
  },
  'shipping-policy': {
    title: 'Shipping & Delivery Policy | Kids City Wakad, Pune',
    description:
      'Kids City Wakad delivery policy — local delivery in Wakad, Hinjewadi, and Baner, plus pan-India shipping. Kids clothes delivered across Pune and all of India.',
  },
  'return-policy': {
    title: 'Return & Exchange Policy | Kids City Wakad, Pune',
    description:
      'Kids City Wakad return and exchange policy. Size exchanges within 7 days. Learn how to exchange kids clothing purchased at our store in Wakad, Pune, Maharashtra.',
  },
  '404': {
    title: '404 — Page Not Found | Kids City Wakad, Pune',
    description:
      'The page you are looking for was not found. Visit Kids City, Wakad\'s best kids clothes shop, to explore 500+ styles for boys and girls aged 0\u201314 years.',
  },
}

/** Product page SEO */
export function getProductSEO(product) {
  if (!product) return PAGE_SEO.shop
  const price = product.price || ''
  const category = product.category || 'Kids Clothing'
  const sizesStr = product.sizes ? product.sizes.slice(0, 3).join(', ') : ''
  return {
    title: `Buy ${product.name} Online | ${category} for Kids — Kids City${price ? ' | ' + price : ''}`,
    description: `Shop ${product.name} at Kids City, Wakad — ${price}. Soft, skin-safe ${category} for children.${sizesStr ? ' Sizes: ' + sizesStr + '.' : ''} COD available. WhatsApp +91 78916 72762 to order or check stock. Free delivery in Wakad, Pune.`,
  }
}
