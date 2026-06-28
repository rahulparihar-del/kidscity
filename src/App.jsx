import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// New modular routing views
import ShopView, { PRODUCTS } from './components/ShopView'
import ProductDetail from './components/ProductDetail'
import ContactView from './components/ContactView'
import InquiryDrawer from './components/InquiryDrawer'
import AdminPanel from './components/AdminPanel'

// Supabase client
import { supabase } from './supabaseClient'

export default function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'shop', 'product-detail', 'contact', 'admin'
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [inquiryBag, setInquiryBag] = useState([])
  const [isBagOpen, setIsBagOpen] = useState(false)
  const [dbProducts, setDbProducts] = useState([])

  // Load products on mount with real-time listeners and database seeding
  useEffect(() => {
    const loadProducts = async () => {
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

  // Load inquiry bag from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kidscity_inquiry_bag')
      if (stored) {
        setInquiryBag(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load inquiry bag", e)
    }
  }, [])

  // Sync inquiry bag to localStorage on change
  const handleAddToBag = (item) => {
    const updated = [...inquiryBag, item]
    setInquiryBag(updated)
    setIsBagOpen(true)
    try {
      localStorage.setItem('kidscity_inquiry_bag', JSON.stringify(updated))
    } catch (e) {
      console.error("Failed to save inquiry bag", e)
    }
  }

  const handleRemoveFromBag = (indexToRemove) => {
    const updated = inquiryBag.filter((_, idx) => idx !== indexToRemove)
    setInquiryBag(updated)
    try {
      localStorage.setItem('kidscity_inquiry_bag', JSON.stringify(updated))
    } catch (e) {
      console.error("Failed to save inquiry bag", e)
    }
  }

  // Router handler to update views and handle details navigation
  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setCurrentView('product-detail')
  }

  return (
    <>
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        bagCount={inquiryBag.length}
        onOpenBag={() => setIsBagOpen(true)}
      />

      <InquiryDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        bagItems={inquiryBag}
        onRemoveFromBag={handleRemoveFromBag}
      />

      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <main>
              <HeroBanner onViewChange={setCurrentView} />
              <TrustBar />
              <CategoryGrid />
              <ShopByCategory />
              <FeaturedProducts
                products={dbProducts}
                onSelectProduct={handleSelectProduct}
                onViewChange={setCurrentView}
              />
              <WhyUs />
              <Testimonials />
              <Newsletter />
            </main>
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
            <main>
              <ShopView
                products={dbProducts}
                onSelectProduct={handleSelectProduct}
              />
            </main>
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
            <main>
              <ProductDetail
                product={selectedProduct}
                onBack={() => setCurrentView('shop')}
                onAddToBag={handleAddToBag}
                onSelectProduct={handleSelectProduct}
                allProducts={dbProducts}
              />
            </main>
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
            <main>
              <ContactView />
            </main>
          </motion.div>
        )}

        {currentView === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <main>
              <AdminPanel onBack={() => setCurrentView('home')} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onViewChange={setCurrentView} />
      <WhatsAppFAB />
    </>
  )
}
