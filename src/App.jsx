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
import ShopView from './components/ShopView'
import ProductDetail from './components/ProductDetail'
import ContactView from './components/ContactView'
import InquiryDrawer from './components/InquiryDrawer'

export default function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'shop', 'product-detail', 'contact'
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [inquiryBag, setInquiryBag] = useState([])
  const [isBagOpen, setIsBagOpen] = useState(false)

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
              <ShopView onSelectProduct={handleSelectProduct} />
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
      </AnimatePresence>

      <Footer />
      <WhatsAppFAB />
    </>
  )
}
