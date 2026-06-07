import './index.css'
import AnnouncementBar from './components/AnnouncementBar'
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

export default function App() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroBanner />
        <TrustBar />
        <CategoryGrid />
        <ShopByCategory />
        <FeaturedProducts />
        <WhyUs />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
