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
    title: 'Kids City Wakad | Kids Clothes Shop in Pune',
    description:
      'Shop premium kids clothing in Wakad, Pune. Festival wear, ethnic, birthday & casual clothes for boys & girls (0–14 yrs). 4.9★ rated. Visit or shop online!',
  },
  shop: {
    title: 'Shop Kids Clothing | Festival, Ethnic & Party Wear — Kids City Wakad',
    description:
      'Browse 500+ kids outfits at Kids City Wakad. Boys & girls festival wear, ethnic dresses, night suits, birthday & casual clothes. Ages 0–14 yrs. Shop now!',
  },
  contact: {
    title: 'Contact Kids City Wakad | Kids Clothes Shop, Pune',
    description:
      'Visit Kids City at Mahalaxmi Complex, Wakad, Pune. Open 10 AM–9:30 PM daily. Call +91 78916 72762 or WhatsApp us. Get directions on Google Maps.',
  },
  admin: {
    title: 'Admin — Kids City',
    description: 'Kids City store administration panel.',
  },
}

/** Product page SEO */
export function getProductSEO(product) {
  if (!product) return PAGE_SEO.shop
  const price = product.price || ''
  const category = product.category || 'Kids Clothing'
  return {
    title: `${product.name} | ${category} — Kids City Wakad${price ? ' ' + price : ''}`,
    description: `Buy ${product.name} at Kids City Wakad, Pune. ${
      product.desc
        ? product.desc.slice(0, 100).replace(/\n/g, ' ') + '...'
        : `Premium ${category} for kids. Available in multiple sizes. Visit us or WhatsApp to order.`
    }`,
  }
}
