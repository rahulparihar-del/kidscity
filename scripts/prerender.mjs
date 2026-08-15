/**
 * Build-time prerender (browser-free).
 *
 * After `vite build`, this bakes per-route <title>/description/canonical/OG/
 * Twitter AND the per-route JSON-LD @graph into static HTML files under dist/,
 * one per route (home, collections, content/policy pages, and every product at
 * /products/<slug>). Meta tags and JSON-LD are produced from the SAME modules
 * the client uses (src/lib/seo.js, src/lib/seoGraph.js, src/hooks/useSEO.js),
 * so they can never drift apart or be fixed in separate passes.
 *
 * Loaded via Vite's SSR module loader so JSX/app modules resolve correctly.
 */
import { createServer } from 'vite'
import fs from 'fs'
import path from 'path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const templatePath = path.join(distDir, 'index.html')

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] dist/index.html not found — run `vite build` first.')
  process.exit(1)
}
const template = fs.readFileSync(templatePath, 'utf8')

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let written = 0
try {
  const { PRODUCTS } = await vite.ssrLoadModule('/src/components/ShopView.jsx')
  const { PAGE_SEO, getProductSEO } = await vite.ssrLoadModule('/src/hooks/useSEO.js')
  const { canonicalFor, productSlug } = await vite.ssrLoadModule('/src/lib/seo.js')
  const { buildRouteGraph } = await vite.ssrLoadModule('/src/lib/seoGraph.js')

  let FAQS = null
  try {
    ;({ FAQS } = await vite.ssrLoadModule('/src/components/FAQView.jsx'))
  } catch (e) {
    console.warn('[prerender] FAQS not loadable, skipping FAQPage:', e.message)
  }

  const staticRoutes = [
    { path: '/', view: 'home' },
    { path: '/collections', view: 'shop' },
    { path: '/about', view: 'about' },
    { path: '/contact', view: 'contact' },
    { path: '/faq', view: 'faq' },
    { path: '/privacy-policy', view: 'privacy-policy' },
    { path: '/terms', view: 'terms' },
    { path: '/shipping-policy', view: 'shipping-policy' },
    { path: '/return-policy', view: 'return-policy' },
  ]
  const productRoutes = (PRODUCTS || []).map((p) => ({
    path: `/products/${productSlug(p)}`,
    view: 'product-detail',
    product: p,
  }))
  const routes = [...staticRoutes, ...productRoutes]

  for (const r of routes) {
    const seo = r.view === 'product-detail' ? getProductSEO(r.product) : PAGE_SEO[r.view] || PAGE_SEO.home
    const canonical = canonicalFor(r.view, r.product)
    const graph = buildRouteGraph(r.view, { product: r.product, products: PRODUCTS, seo })

    // Add FAQPage to the /faq graph from the same source the page renders.
    if (r.view === 'faq' && FAQS && graph) {
      graph['@graph'].push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: FAQS.flatMap((cat) =>
          cat.questions.map((q) => ({
            '@type': 'Question',
            name: q.q,
            acceptedAnswer: { '@type': 'Answer', text: q.a },
          }))
        ),
      })
    }

    let html = template
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    html = html.replace(/<meta[^>]*name="description"[^>]*>/, `<meta name="description" content="${esc(seo.description)}" />`)
    html = html.replace(/<link[^>]*rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    html = html.replace(/<meta[^>]*property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    html = html.replace(/<meta[^>]*property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(seo.title)}" />`)
    html = html.replace(/<meta[^>]*property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(seo.description)}" />`)
    html = html.replace(/<meta[^>]*name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`)
    html = html.replace(/<meta[^>]*name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`)

    if (graph) {
      const block = `    <script type="application/ld+json" data-route-jsonld>\n${JSON.stringify(graph, null, 2)}\n    </script>\n  </head>`
      html = html.replace('</head>', block)
    }

    const outDir = r.path === '/' ? distDir : path.join(distDir, r.path)
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, 'index.html'), html)
    written++
  }
  console.log(`[prerender] wrote ${written} route(s): ${staticRoutes.length} static + ${productRoutes.length} product`)
} catch (err) {
  console.error('[prerender] FAILED:', err)
  await vite.close()
  process.exit(1)
} finally {
  await vite.close()
}
