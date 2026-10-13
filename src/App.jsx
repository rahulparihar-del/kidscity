import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getSEOForView, useSEO } from './hooks/useSEO'
import { PRODUCTS, CATEGORIES_DATA, AREAS_DATA, BLOG_POSTS_DATA, slugify } from './data/products'

// Critical components loaded eagerly for instant homepage paint
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import TrustBar from './components/TrustBar'
import CategoryGrid from './components/CategoryGrid'
import ShopByCategory from './components/ShopByCategory'
import FeaturedProducts from './components/FeaturedProducts'
import WhyUs from './components/WhyUs'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import StickyBottomBar from './components/StickyBottomBar'
import InquiryDrawer from './components/InquiryDrawer'

// Lazy-loaded routes for optimal bundle code-splitting and sub-second mobile loads
const ShopView = lazy(() => import('./components/ShopView'))
const ProductDetail = lazy(() => import('./components/ProductDetail'))
const ContactView = lazy(() => import('./components/ContactView'))
const AboutView = lazy(() => import('./components/AboutView'))
const FAQView = lazy(() => import('./components/FAQView'))
const PolicyView = lazy(() => import('./components/PolicyView'))
const NotFoundView = lazy(() => import('./components/NotFoundView'))
const CallbackSheetView = lazy(() => import('./components/CallbackSheetView'))
const CategoryView = lazy(() => import('./components/CategoryView'))
const AreaView = lazy(() => import('./components/AreaView'))
const DeliveryHubView = lazy(() => import('./components/DeliveryHubView'))
const SizeGuideView = lazy(() => import('./components/SizeGuideView'))
const BlogHubView = lazy(() => import('./components/BlogHubView'))
const BlogPostView = lazy(() => import('./components/BlogPostView'))
const ReviewsView = lazy(() => import('./components/ReviewsView'))

// Supabase client
import { supabase } from './supabaseClient'

// Loading spinner fallback for Suspense
function ViewFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24 pb-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-brand-navy/20 border-t-brand-terracotta rounded-full animate-spin" />
        <span className="text-[0.85rem] font-bold text-brand-navy tracking-wide">Loading Kids City...</span>
      </div>
    </div>
  )
}

// ── URL path ↔ view mapping ──────────────────────────────────────────────────
const PATH_TO_VIEW = {
  '/':                          'home',
  '/collections':               'shop',
  '/shop':                      'shop',
  '/kids-clothes-delivery-pune': 'kids-clothes-delivery-pune',
  '/delivery-in-pune':          'kids-clothes-delivery-pune',
  '/kids-clothing-size-guide':  'kids-clothing-size-guide',
  '/size-guide':                'kids-clothing-size-guide',
  '/reviews':                   'reviews',
  '/customer-reviews':          'reviews',
  '/blog':                      'blog',
  '/contact':                   'contact',
  '/about':                     'about',
  '/faq':                       'faq',
  '/privacy-policy':            'privacy-policy',
  '/terms':                     'terms',
  '/shipping-policy':           'shipping-policy',
  '/return-policy':             'return-policy',
  '/callback-sheet':            'callback-sheet',
  '/404':                       '404',
}

const VIEW_TO_PATH = {
  home:                         '/',
  shop:                         '/collections',
  'kids-clothes-delivery-pune':  '/kids-clothes-delivery-pune',
  'kids-clothing-size-guide':   '/kids-clothing-size-guide',
  reviews:                      '/reviews',
  blog:                         '/blog',
  contact:                      '/contact',
  about:                        '/about',
  faq:                          '/faq',
  'privacy-policy':             '/privacy-policy',
  terms:                        '/terms',
  'shipping-policy':            '/shipping-policy',
  'return-policy':              '/return-policy',
  'callback-sheet':             '/callback-sheet',
  '404':                        '/404',
}

const POLICY_VIEWS = ['privacy-policy', 'terms', 'shipping-policy', 'return-policy']

function resolveRouteFromPath(pathname, productsList = PRODUCTS) {
  const clean = pathname.replace(/\/+$/, '') || '/'

  // 1. Direct core views
  if (PATH_TO_VIEW[clean]) {
    return { view: PATH_TO_VIEW[clean], param: null, product: null }
  }

  // 2. Product detail route: /product/:slug
  if (clean.startsWith('/product/')) {
    const slug = clean.replace('/product/', '')
    const product = productsList.find((p) => p.slug === slug || p.id.toString() === slug)
    return { view: 'product-detail', param: slug, product: product || null }
  }

  // 3. Blog article route: /blog/:slug
  if (clean.startsWith('/blog/')) {
    const slug = clean.replace('/blog/', '')
    if (BLOG_POSTS_DATA[slug]) {
      return { view: 'blog-post', param: slug, product: null }
    }
  }

  // 4. Category routes
  const cleanSlug = clean.replace(/^\//, '')
  if (CATEGORIES_DATA[cleanSlug]) {
    return { view: 'category', param: cleanSlug, product: null }
  }

  // 5. Area routes
  if (AREAS_DATA[cleanSlug]) {
    return { view: 'area', param: cleanSlug, product: null }
  }

  return { view: '404', param: null, product: null }
}

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return resolveRouteFromPath(window.location.pathname, PRODUCTS).view
  })
  const [currentParam, setCurrentParam] = useState(() => {
    return resolveRouteFromPath(window.location.pathname, PRODUCTS).param
  })
  const [selectedProduct, setSelectedProduct] = useState(() => {
    return resolveRouteFromPath(window.location.pathname, PRODUCTS).product
  })

  const [inquiryBag, setInquiryBag] = useState([])
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [dbProducts, setDbProducts] = useState(PRODUCTS)
  const [deliveryPincode, setDeliveryPincode] = useState('')

  // Load products from Supabase on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          const transformed = data.map((p) => ({
            ...p,
            slug: p.slug || slugify(p.name),
            priceVal: p.price_val,
            tagColor: p.tag_color,
            desc: p.description,
          }))
          setDbProducts(transformed)
        }
      } catch (err) {
        console.debug('Loaded static fallback catalog for Kids City:', err.message)
      }
    }

    loadProducts()
  }, [])

  // Handle URL history routing & popstate
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname
      const params = new URLSearchParams(window.location.search)
      const queryProductId = params.get('product')

      const activeList = dbProducts.length > 0 ? dbProducts : PRODUCTS

      if (queryProductId) {
        const match = activeList.find(
          (p) => p.id.toString() === queryProductId || p.slug === queryProductId
        )
        if (match) {
          setSelectedProduct(match)
          setCurrentView('product-detail')
          setCurrentParam(match.slug || match.id)
          return
        }
      }

      const resolved = resolveRouteFromPath(path, activeList)
      setCurrentView(resolved.view)
      setCurrentParam(resolved.param)
      if (resolved.product) {
        setSelectedProduct(resolved.product)
      }
    }

    handleUrlRoute()
    window.addEventListener('popstate', handleUrlRoute)
    return () => window.removeEventListener('popstate', handleUrlRoute)
  }, [dbProducts])

  // Dynamic SEO on route change
  useEffect(() => {
    const seo = getSEOForView(currentView, currentParam, selectedProduct)
    useSEO(seo)
  }, [currentView, currentParam, selectedProduct])

  // Bag handlers
  const handleAddToBag = (item) => {
    setInquiryBag([...inquiryBag, item])
    setIsBagOpen(true)
  }

  const handleRemoveFromBag = (indexToRemove) => {
    setInquiryBag(inquiryBag.filter((_, idx) => idx !== indexToRemove))
  }

  // Unified view navigation handler
  const handleViewChange = (view, param = null) => {
    // 1. Category view
    if (CATEGORIES_DATA[view]) {
      setCurrentView('category')
      setCurrentParam(view)
      window.history.pushState({ view: 'category', param: view }, '', `/${view}`)
    }
    // 2. Area view
    else if (AREAS_DATA[view]) {
      setCurrentView('area')
      setCurrentParam(view)
      window.history.pushState({ view: 'area', param: view }, '', `/${view}`)
    }
    // 3. Blog article view
    else if (view === 'blog-post' && param) {
      setCurrentView('blog-post')
      setCurrentParam(param)
      window.history.pushState({ view: 'blog-post', param }, '', `/blog/${param}`)
    }
    // 4. Core views
    else {
      setCurrentView(view)
      setCurrentParam(param)
      const path = VIEW_TO_PATH[view] || `/${view}`
      window.history.pushState({ view, param }, '', path)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Product selection handler
  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setCurrentView('product-detail')
    setCurrentParam(product.slug || product.id)
    const newPath = `/product/${product.slug || product.id}`
    window.history.pushState({ view: 'product-detail', param: product.slug || product.id }, '', newPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Blog post selection handler
  const handleSelectPost = (postSlug) => {
    setCurrentView('blog-post')
    setCurrentParam(postSlug)
    window.history.pushState({ view: 'blog-post', param: postSlug }, '', `/blog/${postSlug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <Navbar
        currentView={currentView}
        onViewChange={handleViewChange}
        bagCount={inquiryBag.length}
        onOpenBag={() => setIsBagOpen(true)}
        deliveryPincode={deliveryPincode}
      />

      <InquiryDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        bagItems={inquiryBag}
        onRemoveFromBag={handleRemoveFromBag}
        onClearBag={() => setInquiryBag([])}
      />

      <main id="main-content">
        <AnimatePresence mode="wait">
          {/* 1. Home View */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroBanner onViewChange={handleViewChange} />
              <TrustBar />
              <CategoryGrid onViewChange={handleViewChange} />
              <ShopByCategory onViewChange={handleViewChange} />
              <FeaturedProducts
                products={dbProducts}
                onSelectProduct={handleSelectProduct}
                onViewChange={handleViewChange}
              />
              <WhyUs />
              <Testimonials />
              <Newsletter />
            </motion.div>
          )}

          {/* 2. Collections / Shop View */}
          {currentView === 'shop' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="shop"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ShopView
                  products={dbProducts}
                  onSelectProduct={handleSelectProduct}
                />
              </motion.div>
            </Suspense>
          )}

          {/* 3. Product Detail View */}
          {currentView === 'product-detail' && selectedProduct && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key={`detail-${selectedProduct.id}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <ProductDetail
                  product={selectedProduct}
                  onBack={() => handleViewChange('shop')}
                  onAddToBag={handleAddToBag}
                  onSelectProduct={handleSelectProduct}
                  allProducts={dbProducts}
                  deliveryPincode={deliveryPincode}
                  setDeliveryPincode={setDeliveryPincode}
                />
              </motion.div>
            </Suspense>
          )}

          {/* 4. Dedicated Category View */}
          {currentView === 'category' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key={`category-${currentParam}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <CategoryView
                  categorySlug={currentParam}
                  onViewChange={handleViewChange}
                  onSelectProduct={handleSelectProduct}
                />
              </motion.div>
            </Suspense>
          )}

          {/* 5. Dedicated Local Area View */}
          {currentView === 'area' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key={`area-${currentParam}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <AreaView
                  areaSlug={currentParam}
                  onViewChange={handleViewChange}
                  onSelectProduct={handleSelectProduct}
                />
              </motion.div>
            </Suspense>
          )}

          {/* 6. Delivery Across Pune Hub View */}
          {currentView === 'kids-clothes-delivery-pune' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="delivery-hub"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <DeliveryHubView onViewChange={handleViewChange} />
              </motion.div>
            </Suspense>
          )}

          {/* 7. Indian Kids Size Guide View */}
          {currentView === 'kids-clothing-size-guide' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="size-guide"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <SizeGuideView onViewChange={handleViewChange} />
              </motion.div>
            </Suspense>
          )}

          {/* 8. Customer Reviews View */}
          {currentView === 'reviews' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ReviewsView onViewChange={handleViewChange} />
              </motion.div>
            </Suspense>
          )}

          {/* 9. Blog Hub View */}
          {currentView === 'blog' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <BlogHubView
                  onViewChange={handleViewChange}
                  onSelectPost={handleSelectPost}
                />
              </motion.div>
            </Suspense>
          )}

          {/* 10. Blog Article View */}
          {currentView === 'blog-post' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key={`post-${currentParam}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <BlogPostView
                  postSlug={currentParam}
                  onViewChange={handleViewChange}
                />
              </motion.div>
            </Suspense>
          )}

          {/* 11. Contact View */}
          {currentView === 'contact' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ContactView />
              </motion.div>
            </Suspense>
          )}

          {/* 12. About View */}
          {currentView === 'about' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <AboutView onViewChange={handleViewChange} />
              </motion.div>
            </Suspense>
          )}

          {/* 13. FAQ View */}
          {currentView === 'faq' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <FAQView onViewChange={handleViewChange} />
              </motion.div>
            </Suspense>
          )}

          {/* 14. Policy Views */}
          {POLICY_VIEWS.includes(currentView) && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PolicyView policyKey={currentView} onViewChange={handleViewChange} />
              </motion.div>
            </Suspense>
          )}

          {/* 15. 404 View */}
          {currentView === '404' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="404"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <NotFoundView onViewChange={handleViewChange} />
              </motion.div>
            </Suspense>
          )}

          {/* 16. Callback Sheet Console View */}
          {currentView === 'callback-sheet' && (
            <Suspense fallback={<ViewFallback />}>
              <motion.div
                key="callback-sheet"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <CallbackSheetView onBack={() => handleViewChange('home')} />
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>
      </main>

      <Footer onViewChange={handleViewChange} />
      <WhatsAppFAB />
      <StickyBottomBar currentProduct={selectedProduct} />
    </>
  )
}
