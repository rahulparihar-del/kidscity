import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PAGE_SEO, getProductSEO } from './hooks/useSEO'
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

import LocationBar from './components/LocationBar'

// Modular routing views
import ShopView, { PRODUCTS } from './components/ShopView'
import ProductDetail from './components/ProductDetail'
import ContactView from './components/ContactView'
import AboutView from './components/AboutView'
import FAQView from './components/FAQView'
import PolicyView from './components/PolicyView'
import NotFoundView from './components/NotFoundView'
import InquiryDrawer from './components/InquiryDrawer'
import CallbackSheetView from './components/CallbackSheetView'

// Supabase client
import { supabase } from './supabaseClient'

// ── URL path ↔ view mapping ──────────────────────────────────────────────────
const PATH_TO_VIEW = {
  '/':                'home',
  '/collections':     'shop',
  '/shop':            'shop',
  '/contact':         'contact',
  '/about':           'about',
  '/faq':             'faq',
  '/privacy-policy':  'privacy-policy',
  '/terms':           'terms',
  '/shipping-policy': 'shipping-policy',
  '/return-policy':   'return-policy',
  '/callback-sheet':  'callback-sheet',
  '/404':             '404',
}

const VIEW_TO_PATH = {
  home:              '/',
  shop:              '/collections',
  contact:           '/contact',
  about:             '/about',
  faq:               '/faq',
  'privacy-policy':  '/privacy-policy',
  'terms':           '/terms',
  'shipping-policy': '/shipping-policy',
  'return-policy':   '/return-policy',
  'callback-sheet':  '/callback-sheet',
  '404':             '/404',
}

const POLICY_VIEWS = ['privacy-policy', 'terms', 'shipping-policy', 'return-policy']

function resolveViewFromPath(pathname) {
  return PATH_TO_VIEW[pathname] || '404'
}

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    // On first load, resolve from the URL path
    return resolveViewFromPath(window.location.pathname)
  })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [inquiryBag, setInquiryBag] = useState([])
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [dbProducts, setDbProducts] = useState([])
  const [appLoading, setAppLoading] = useState(true)
  const [viewLoading, setViewLoading] = useState(false)

  const [deliveryPincode, setDeliveryPincode] = useState('')
  const isWakad = deliveryPincode === '411057'

  // Load products on mount with real-time listeners and database seeding
  useEffect(() => {
    const loadProducts = async () => {
      const startTime = Date.now()
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false })

        if (error) throw error

        if (data && data.length > 0) {
          const transformed = data.map(p => ({
            ...p,
            priceVal: p.price_val,
            tagColor: p.tag_color,
            desc: p.description
          }))
          setDbProducts(transformed)
        } else {
          // Seeding database with initial products if table has 0 items
          console.log("Products table is empty. Seeding initial e-commerce products...")
          
          const seedData = PRODUCTS.map(p => ({
            name: p.name,
            category: p.category,
            price_val: p.priceVal,
            price: p.price,
            tag: p.tag || null,
            tag_color: p.tagColor || null,
            img: p.img,
            rating: p.rating,
            reviews: p.reviews,
            sizes: p.sizes,
            description: p.desc,
            specs: p.specs,
            gallery: p.gallery,
            discount: 0
          }))

          const { error: seedError } = await supabase
            .from('products')
            .insert(seedData)

          if (seedError) {
            console.error("Failed to seed products:", seedError.message)
          } else {
            console.log("Seeding complete. Fetching updated catalog...")
            const { data: reloaded } = await supabase
              .from('products')
              .select('*')
              .order('id', { ascending: false })
            
            if (reloaded) {
              const transformed = reloaded.map(p => ({
                ...p,
                priceVal: p.price_val,
                tagColor: p.tag_color,
                desc: p.description
              }))
              setDbProducts(transformed)
            }
          }
        }
      } catch (err) {
        console.error("Failed to read products from Supabase:", err.message)
      } finally {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(900 - elapsed, 0)
        setTimeout(() => {
          setAppLoading(false)
        }, remaining)
      }
    }

    loadProducts()

    // Setup Supabase Real-time listener
    const channel = supabase
      .channel('products-realtime-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        console.log("Real-time product change detected:", payload)
        loadProducts() // Reload products dynamically
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Parse URL query parameter for product deep-linking on load and handle history navigation
  useEffect(() => {
    if (dbProducts.length === 0) return

    const handleUrlRoute = () => {
      const path = window.location.pathname
      const params = new URLSearchParams(window.location.search)
      const productId = params.get('product')

      if (productId) {
        const match = dbProducts.find(p => p.id.toString() === productId)
        if (match) {
          setSelectedProduct(match)
          setCurrentView('product-detail')
          return
        }
      }

      // Route from path
      const view = resolveViewFromPath(path)
      setCurrentView(view)
    }

    // Run on initial load/reload of dbProducts
    handleUrlRoute()

    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleUrlRoute)
    return () => window.removeEventListener('popstate', handleUrlRoute)
  }, [dbProducts])

  // ── Dynamic SEO: update <title> + meta description on every view change ──
  useEffect(() => {
    const seo =
      currentView === 'product-detail' && selectedProduct
        ? getProductSEO(selectedProduct)
        : PAGE_SEO[currentView] || PAGE_SEO.home

    document.title = seo.title

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', seo.description)

    // Update OG title + description too
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc  = document.querySelector('meta[property="og:description"]')
    if (ogTitle) ogTitle.setAttribute('content', seo.title)
    if (ogDesc)  ogDesc.setAttribute('content', seo.description)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      const path = VIEW_TO_PATH[currentView] || '/'
      const canonicalUrl = `https://kidscity.online${path}`
      canonical.setAttribute('href', canonicalUrl)
      // Update OG URL
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl)
    }
  }, [currentView, selectedProduct])

  // Track page image loading on view change to prevent flashing of un-loaded content
  useEffect(() => {
    // We don't need to show it on mount since appLoading covers the initial load
    if (appLoading) return

    setViewLoading(true)

    // Give React a small frame to render the new view's DOM elements
    const timer = setTimeout(() => {
      const images = Array.from(document.querySelectorAll('img')).filter(
        img => !img.classList.contains('app-loader-logo')
      )

      if (images.length === 0) {
        setViewLoading(false)
        return
      }

      let loadedCount = 0
      const totalImages = images.length

      const handleImageLoad = () => {
        loadedCount++
        if (loadedCount >= totalImages) {
          setViewLoading(false)
        }
      }

      images.forEach(img => {
        if (img.complete) {
          handleImageLoad()
        } else {
          img.addEventListener('load', handleImageLoad)
          img.addEventListener('error', handleImageLoad) // count errors too so loader doesn't get stuck
        }
      })

      // Safety timeout: hide loader after 1 second max even if some images are slow
      const safetyTimeout = setTimeout(() => {
        setViewLoading(false)
      }, 1000)

      return () => {
        clearTimeout(safetyTimeout)
        images.forEach(img => {
          img.removeEventListener('load', handleImageLoad)
          img.removeEventListener('error', handleImageLoad)
        })
      }
    }, 60) // delay to let DOM render

    return () => clearTimeout(timer)
  }, [currentView, appLoading])

  // Handle adding items to inquiry bag
  const handleAddToBag = (item) => {
    const updated = [...inquiryBag, item]
    setInquiryBag(updated)
    setIsBagOpen(true)
  }

  // Handle removing items from inquiry bag
  const handleRemoveFromBag = (indexToRemove) => {
    const updated = inquiryBag.filter((_, idx) => idx !== indexToRemove)
    setInquiryBag(updated)
  }

  // ── View change handler — also updates URL ──────────────────────────────────
  const handleViewChange = (view) => {
    setCurrentView(view)
    const path = VIEW_TO_PATH[view] || '/'
    // Don't update URL for admin or product-detail (product-detail uses query param)
    if (view !== 'product-detail') {
      window.history.pushState({ view }, '', path)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Router handler to update views and handle details navigation
  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setCurrentView('product-detail')
    // Update URL query parameter without reloading
    const newUrl = `${window.location.pathname}?product=${product.id}`
    window.history.pushState({ productId: product.id }, '', newUrl)
  }

  return (
    <>
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="skip-nav">Skip to main content</a>

      <AnimatePresence>
        {(appLoading || viewLoading) && (
          <motion.div
            className="app-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {/* Logo with shimmer sweep */}
            <div className="loader-logo-wrap">
              <img
                src="/images/logo_full.webp"
                alt="Kids City"
                className="app-loader-logo"
              />
            </div>

            {/* Rainbow progress bar pinned to screen bottom */}
            <div className="loader-progress-line" />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar
        currentView={currentView}
        onViewChange={handleViewChange}
        bagCount={inquiryBag.length}
        onOpenBag={() => setIsBagOpen(true)}
        isWakad={isWakad}
        deliveryPincode={deliveryPincode}
      />

      {currentView !== 'home' && (
        <LocationBar
          deliveryPincode={deliveryPincode}
          setDeliveryPincode={setDeliveryPincode}
          isWakad={isWakad}
        />
      )}

      <InquiryDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        bagItems={inquiryBag}
        onRemoveFromBag={handleRemoveFromBag}
        onClearBag={() => setInquiryBag([])}
      />

      <main id="main-content">
        <AnimatePresence mode="wait">
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
              <ShopByCategory />
              <FeaturedProducts
                products={dbProducts}
                onSelectProduct={handleSelectProduct}
                onViewChange={handleViewChange}
                isWakad={isWakad}
              />
              <WhyUs />
              <Testimonials />
              <Newsletter />
            </motion.div>
          )}

          {currentView === 'shop' && (
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
          )}

          {currentView === 'product-detail' && selectedProduct && (
            <motion.div
              key={`detail-${selectedProduct.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetail
                product={selectedProduct}
                onBack={() => {
                  handleViewChange('shop')
                  window.history.pushState({}, '', '/collections')
                }}
                onAddToBag={handleAddToBag}
                onSelectProduct={handleSelectProduct}
                allProducts={dbProducts}
                isWakad={isWakad}
                deliveryPincode={deliveryPincode}
                setDeliveryPincode={setDeliveryPincode}
              />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ContactView />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AboutView onViewChange={handleViewChange} />
            </motion.div>
          )}

          {currentView === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <FAQView onViewChange={handleViewChange} />
            </motion.div>
          )}

          {POLICY_VIEWS.includes(currentView) && (
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PolicyView policyKey={currentView} onViewChange={handleViewChange} />
            </motion.div>
          )}

          {currentView === '404' && (
            <motion.div
              key="404"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <NotFoundView onViewChange={handleViewChange} />
            </motion.div>
          )}

          {currentView === 'callback-sheet' && (
            <motion.div
              key="callback-sheet"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <CallbackSheetView onBack={() => handleViewChange('home')} />
            </motion.div>
          )}


        </AnimatePresence>
      </main>

      <Footer onViewChange={handleViewChange} />
      <WhatsAppFAB />
    </>
  )
}
