import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './navbar.css'

const NAV_ITEMS = [
  { label: 'Home', href: '/', sectionId: 'hero' },
  { label: 'Our Story', href: '/our-story', sectionId: 'story' },
  { label: 'Snacks', href: '/snacks', sectionId: 'shelf' },
  { label: 'Our Craft', href: '/our-craft', sectionId: 'regions' },
  { label: 'Corporate Gifting', href: '/gifting' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact', sectionId: 'footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomepage = location.pathname === '/'

  // Track scroll position when on homepage
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (isHomepage) {
        const sections = ['hero', 'story', 'shelf', 'regions', 'why-us', 'packaging', 'footer']
        const scrollPosition = window.scrollY + 120

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId)
          if (el) {
            const top = el.offsetTop
            const height = el.offsetHeight
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomepage])

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false)

    if (isHomepage && item.href === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('hero')
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* LOGO ALIGNED LEFT */}
        <Link to="/" className="navbar-brand">
          <img
            src="/logo.png"
            alt="Raaji's Crafted Snacks Logo"
            className="navbar-logo"
            onError={(e) => {
              e.target.style.display = 'none'
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'block'
              }
            }}
          />
          <span className="navbar-logo-text" style={{ display: 'none' }}>
            Raaji's Snacks
          </span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isItemActive = isHomepage
              ? (item.href === '/' && (activeSection === 'hero' || !activeSection)) ||
                (item.href !== '/' && location.pathname === item.href)
              : location.pathname === item.href

            return (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${isItemActive ? 'is-active' : ''}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* ORDER NOW CTA BUTTON ALIGNED RIGHT */}
        <div className="navbar-actions">
          <Link
            to="/snacks"
            className="navbar-cta-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            Order Now
          </Link>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN NAVIGATION MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-dropdown"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="mobile-nav-inner">
              {NAV_ITEMS.map((item, idx) => {
                const isItemActive = location.pathname === item.href

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.2 }}
                  >
                    <Link
                      to={item.href}
                      className={`mobile-nav-link ${isItemActive ? 'is-active' : ''}`}
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}

              <div className="mobile-cta-wrap">
                <Link
                  to="/snacks"
                  className="mobile-cta-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
