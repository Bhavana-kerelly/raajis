import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Homepage Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StoryScroll from './components/StoryScroll'
import ProductShelf from './components/ProductShelf'
import RegionalMap from './components/RegionalMap'
import Packaging from './components/Packaging'
import WhyUsAndFooter from './components/WhyUsAndFooter'

// Inner Pages
import OurStory from './pages/OurStory'
import SnacksCatalogue from './pages/SnacksCatalogue'
import ProductDetail from './pages/ProductDetail'
import OurCraft from './pages/OurCraft'
import BulkOrders from './pages/BulkOrders'
import Contact from './pages/Contact'
import PickupDelivery from './pages/PickupDelivery'
import Blog from './pages/Blog'
import Gifting from './pages/Gifting'

gsap.registerPlugin(ScrollTrigger)

// Automatically scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroHeight = useRef(0)

  useEffect(() => {
    heroHeight.current = window.innerHeight

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })

    lenis.on('scroll', ({ scroll }) => {
      ScrollTrigger.update()
      setScrollProgress(Math.min(scroll / heroHeight.current, 1))
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()

    return () => lenis.destroy()
  }, [])

  return (
    <main>
      <Navbar />
      <Hero scrollProgress={scrollProgress} />
      <StoryScroll />
      <ProductShelf />
      <RegionalMap />
      <Packaging />
      <WhyUsAndFooter />
    </main>
  )
}

function AdminRedirect() {
  useEffect(() => {
    const adminUrl = import.meta.env.VITE_API_BASE_URL
      ? `${import.meta.env.VITE_API_BASE_URL}/admin`
      : 'https://raajis.com/raji-backend/public/index.php/admin'
    window.location.href = adminUrl
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8F1E3',
        color: '#4A2A1D',
        fontFamily: 'var(--font-body, sans-serif)',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '2rem', marginBottom: '1rem' }}>
        Opening Raaji's CMS Admin Panel...
      </h2>
      <p style={{ color: '#6E4532', marginBottom: '1.8rem', fontSize: '1.05rem' }}>
        Redirecting you to the backend administration portal.
      </p>
      <a
        href="https://raajis.com/raji-backend/public/index.php/admin"
        style={{
          background: '#A8322D',
          color: '#FFFDF8',
          padding: '0.85rem 2rem',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(168, 50, 45, 0.25)',
        }}
      >
        Go to Admin Portal Directly →
      </a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/snacks" element={<SnacksCatalogue />} />
        <Route path="/snacks/:slug" element={<ProductDetail />} />
        <Route path="/our-craft" element={<OurCraft />} />
        <Route path="/bulk-orders" element={<BulkOrders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pickup-delivery" element={<PickupDelivery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/blogs/:slug" element={<Blog />} />
        <Route path="/gifting" element={<Gifting />} />
        <Route path="/corporate-gifting" element={<Gifting />} />
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/admin/*" element={<AdminRedirect />} />
      </Routes>
    </BrowserRouter>
  )
}
