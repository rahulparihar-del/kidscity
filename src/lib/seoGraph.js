/**
 * Per-route JSON-LD @graph builder.
 *
 * Emits page-specific entities (WebPage / CollectionPage / Product /
 * BreadcrumbList) that cross-reference the sitewide Organization (#organization)
 * and WebSite (#website) defined statically in index.html — so there is never a
 * duplicated/competing entity, only one graph per page.
 *
 * URLs reflect the CURRENT architecture: product pages are query-param deep
 * links (/collections?product=<id>) and there are no per-category routes
 * (a single /collections page with client-side filters). If/when real path
 * routes (/products/:slug, /collections/:category) land, only the URL builders
 * here need to change.
 */
import { SITE_URL, absoluteUrl, canonicalFor } from './seo.js'

const ORG = { '@id': `${SITE_URL}/#organization` }
const WEBSITE = { '@id': `${SITE_URL}/#website` }
const LOGO = { '@id': `${SITE_URL}/#logo` }

// Views that should not emit indexable structured data.
const NO_SCHEMA_VIEWS = new Set(['callback-sheet', 'checkout', '404'])

const priceToNumber = (p) => {
  const n = Number(String(p ?? '').replace(/[^\d.]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : null
}

const CRUMB_LABEL = {
  home: 'Home',
  shop: 'Collections',
  contact: 'Contact',
  about: 'About',
  faq: 'FAQ',
  'privacy-policy': 'Privacy Policy',
  terms: 'Terms & Conditions',
  'shipping-policy': 'Shipping Policy',
  'return-policy': 'Return & Exchange Policy',
}

function breadcrumb(view, product) {
  const canonical = canonicalFor(view, product)
  const items = [{ name: 'Home', item: `${SITE_URL}/` }]

  if (view === 'product-detail' && product) {
    items.push({ name: 'Collections', item: `${SITE_URL}/collections` })
    items.push({ name: product.name }) // current page — no item
  } else if (view === 'home') {
    // Home only — represented by the single Home crumb (current page).
    items[0] = { name: 'Home' }
  } else {
    items.push({ name: CRUMB_LABEL[view] || 'Page' }) // current page — no item
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items.map((it, i) => {
      const li = { '@type': 'ListItem', position: i + 1, name: it.name }
      if (it.item) li.item = it.item
      return li
    }),
  }
}

function productNode(product) {
  const canonical = canonicalFor('product-detail', product)
  const images = [
    ...new Set(
      [product.img, ...(Array.isArray(product.gallery) ? product.gallery : [])]
        .filter(Boolean)
        .map((src) => absoluteUrl(src))
    ),
  ]
  const price = priceToNumber(product.price) ?? priceToNumber(product.priceVal)

  // priceValidUntil: a rolling ~1-year validity horizon (not business data).
  const validUntil = new Date()
  validUntil.setFullYear(validUntil.getFullYear() + 1)

  const offer = {
    '@type': 'Offer',
    url: canonical,
    priceCurrency: 'INR',
    availability: product.in_stock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: ORG,
    // 7-day in-store size exchange is stated on the FAQ page (verified repo copy).
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'IN',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 7,
      returnMethod: 'https://schema.org/ReturnInStore',
    },
  }
  if (price != null) {
    offer.price = String(price)
    offer.priceValidUntil = validUntil.toISOString().split('T')[0]
  }

  const node = {
    '@type': 'Product',
    '@id': `${canonical}#product`,
    name: product.name,
    brand: { '@type': 'Brand', name: 'Kids City' },
    url: canonical,
    offers: offer,
  }
  if (product.desc) node.description = product.desc
  if (product.category) node.category = product.category
  if (images.length) node.image = images
  return node
}

/**
 * Build the per-route graph. Returns a JSON-LD object or null (no block).
 * @param {string} view
 * @param {object} opts { product, products, seo:{title,description} }
 */
export function buildRouteGraph(view, { product, products = [], seo = {} } = {}) {
  if (NO_SCHEMA_VIEWS.has(view)) return null

  const canonical = canonicalFor(view, product)
  const graph = []

  if (view === 'shop') {
    // CollectionPage IS the webpage for /collections.
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: WEBSITE,
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      inLanguage: 'en-IN',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: canonicalFor('product-detail', p),
          name: p.name,
        })),
      },
    })
  } else {
    // Standard WebPage for home, content, policy and product pages.
    const webpage = {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: WEBSITE,
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      inLanguage: 'en-IN',
    }
    if (view === 'home') {
      webpage.about = ORG
      webpage.primaryImageOfPage = LOGO
    }
    graph.push(webpage)

    if (view === 'product-detail' && product) {
      const p = productNode(product)
      // Link the product as the page's primary entity.
      graph[0].mainEntity = { '@id': p['@id'] }
      graph.push(p)
    }
  }

  graph.push(breadcrumb(view, product))

  return { '@context': 'https://schema.org', '@graph': graph }
}
