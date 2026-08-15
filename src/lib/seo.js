/**
 * Centralised SEO helpers.
 *
 * Interim (P0b stopgap): per-route <title>/description/canonical/OG/Twitter and a
 * single per-route JSON-LD block are applied imperatively on view change, since
 * the app is a client-rendered SPA with custom History-API routing (no SSR yet).
 * This makes the head correct in the live DOM and for JS-executing crawlers.
 * Raw-HTML presence for non-JS crawlers requires the prerender/SSR step (deferred).
 *
 * Sitewide, route-invariant entities (Organization + WebSite) live statically in
 * index.html so they are present in the raw HTML for every crawler.
 */

const ENV = (typeof import.meta !== 'undefined' && import.meta.env) || {}
export const SITE_URL = (ENV.VITE_SITE_URL || 'https://kidscity.online').replace(/\/+$/, '')

// Keep in sync with App.jsx VIEW_TO_PATH.
const VIEW_TO_PATH = {
  home: '/',
  shop: '/collections',
  contact: '/contact',
  about: '/about',
  faq: '/faq',
  'privacy-policy': '/privacy-policy',
  terms: '/terms',
  'shipping-policy': '/shipping-policy',
  'return-policy': '/return-policy',
  'callback-sheet': '/callback-sheet',
  checkout: '/checkout',
  '404': '/404',
}

/** Resolve a path (or pass-through absolute URL) to an absolute https URL. */
export function absoluteUrl(path = '/') {
  if (!path) return `${SITE_URL}/`
  if (/^https?:\/\//i.test(path)) return path
  return SITE_URL + (path.startsWith('/') ? path : `/${path}`)
}

/**
 * Canonical URL for a view. Product pages are query-param deep links
 * (/collections?product=<id>) in the current architecture, so the canonical
 * reflects that real URL rather than an idealised /products/<slug> path.
 */
export function canonicalFor(view, product) {
  if (view === 'product-detail' && product) {
    return `${SITE_URL}/collections?product=${product.id}`
  }
  return SITE_URL + (VIEW_TO_PATH[view] || '/')
}

function upsertMeta(attr, key, content) {
  if (content == null || typeof document === 'undefined') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Apply per-route title/description/canonical + OG/Twitter mirrors.
 * Mutates the single existing element for each tag (no duplicates).
 */
export function applyRouteSeo({ title, description, canonical }) {
  if (typeof document === 'undefined') return
  if (title) document.title = title
  if (description) upsertMeta('name', 'description', description)
  if (canonical) {
    upsertLink('canonical', canonical)
    upsertMeta('property', 'og:url', canonical)
  }
  if (title) {
    upsertMeta('property', 'og:title', title)
    upsertMeta('name', 'twitter:title', title)
  }
  if (description) {
    upsertMeta('property', 'og:description', description)
    upsertMeta('name', 'twitter:description', description)
  }
}

/**
 * Inject (or replace) the single per-route JSON-LD block. Passing a falsy graph
 * removes it. Sitewide Organization/WebSite stay in index.html and are NOT
 * duplicated here — per-route graphs cross-reference them by @id.
 */
export function setRouteJsonLd(graph) {
  if (typeof document === 'undefined') return
  const id = 'route-jsonld'
  let el = document.getElementById(id)
  if (!graph) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(graph)
}
