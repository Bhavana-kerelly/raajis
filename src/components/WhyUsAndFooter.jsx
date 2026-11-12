import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './whyUsAndFooter.css'

const FEATURES = [
  {
    id: '01',
    num: '01',
    title: '100% Vegetarian',
    text: 'All our snacks are pure vegetarian.',
    ariaLabel: 'Show 100% Vegetarian',
    img: '/story-ingredients.png',
    svgIcon: (
      <svg viewBox="0 0 64 64" fill="none" className="feature-svg-icon">
        <path d="M32 8 C18 18 12 34 32 56 C52 34 46 18 32 8 Z" stroke="#A8322D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 20 V44 M32 30 C26 26 20 28 18 32 M32 36 C38 32 44 34 46 38" stroke="#C79A3B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '02',
    num: '02',
    title: 'Handcrafted',
    text: 'Made in small batches with care, just like it’s made at home.',
    ariaLabel: 'Show Handcrafted',
    img: '/story-preparation.png',
    svgIcon: (
      <svg viewBox="0 0 64 64" fill="none" className="feature-svg-icon">
        <path d="M16 40 C14 30 22 22 32 22 C42 22 50 30 48 40" stroke="#A8322D" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 48 H52 M20 54 H44" stroke="#C79A3B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="14" r="4" stroke="#A8322D" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: '03',
    num: '03',
    title: 'Authentic Recipes',
    text: 'Time-honoured recipes passed down through generations.',
    ariaLabel: 'Show Authentic Recipes',
    img: '/story-frying.png',
    svgIcon: (
      <svg viewBox="0 0 64 64" fill="none" className="feature-svg-icon">
        <rect x="16" y="12" width="32" height="42" rx="4" stroke="#A8322D" strokeWidth="2.5" />
        <path d="M24 22 H40 M24 30 H36 M24 38 H38 M24 44 H32" stroke="#C79A3B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '04',
    num: '04',
    title: 'Quality Ingredients',
    text: 'We choose the finest ingredients for wholesome snacks.',
    ariaLabel: 'Show Quality Ingredients',
    img: '/story-packing.png',
    svgIcon: (
      <svg viewBox="0 0 64 64" fill="none" className="feature-svg-icon">
        <circle cx="32" cy="32" r="22" stroke="#A8322D" strokeWidth="2.5" />
        <path d="M32 18 L36 28 L46 30 L38 37 L40 47 L32 42 L24 47 L26 37 L18 30 L28 28 Z" fill="rgba(199, 154, 59, 0.15)" stroke="#C79A3B" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: '05',
    num: '05',
    title: 'Consistent Taste',
    text: 'Every bite delivers the same delicious taste, every time.',
    ariaLabel: 'Show Consistent Taste',
    img: '/story-ingredients.png',
    svgIcon: (
      <svg viewBox="0 0 64 64" fill="none" className="feature-svg-icon">
        <path d="M14 36 C14 24 22 14 32 14 C42 14 50 24 50 36 Z" stroke="#A8322D" strokeWidth="2.5" />
        <path d="M10 44 C20 48 44 48 54 44" stroke="#C79A3B" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="26" r="3" fill="#A8322D" />
      </svg>
    ),
  },
]

export default function WhyUsAndFooter() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomepage = location.pathname === '/'

  // Autoplay progression (5.5s interval)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURES.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
  }

  const handleFooterNav = (path, sectionId) => {
    if (isHomepage && sectionId) {
      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate(path)
  }

  return (
    <>
      {/* WHY RAAJI'S SECTION */}
      <section className="why-raajis-section" id="why-us" aria-label="Why Raaji's Crafted Snacks">
        <div className="why-bg-glow" />

        <div className="why-container">
          {/* Header */}
          <header className="why-header">
            <p className="why-eyebrow">✦ WHY RAJJI'S? ✦</p>
            <h2 className="why-heading">
              Our promise, <span className="highlight-red">in every bite.</span>
            </h2>
            <p className="why-subtext">
              We stay true to traditions in every step,<br />
              so you enjoy snacks that are pure,<br />
              authentic and full of flavour.
            </p>
          </header>

          {/* Centered Interactive Feature Carousel */}
          <div
            className="why-carousel-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Arrow Nav Buttons */}
            <button
              type="button"
              className="carousel-arrow-btn prev-btn"
              onClick={handlePrev}
              aria-label="Previous Rajji's promise"
            >
              ←
            </button>

            <button
              type="button"
              className="carousel-arrow-btn next-btn"
              onClick={handleNext}
              aria-label="Next Rajji's promise"
            >
              →
            </button>

            {/* Carousel Stage Container */}
            <div className="carousel-stage">
              {FEATURES.map((feature, idx) => {
                const diff = (idx - currentIndex + FEATURES.length) % FEATURES.length
                let positionClass = 'card-hidden'

                if (diff === 0) {
                  positionClass = 'card-active'
                } else if (diff === 1 || (currentIndex === FEATURES.length - 1 && idx === 0)) {
                  positionClass = 'card-next'
                } else if (diff === FEATURES.length - 1 || (currentIndex === 0 && idx === FEATURES.length - 1)) {
                  positionClass = 'card-prev'
                }

                return (
                  <div
                    key={feature.id}
                    className={`feature-card ${positionClass}`}
                    onClick={() => {
                      if (positionClass === 'card-next') handleNext()
                      if (positionClass === 'card-prev') handlePrev()
                    }}
                  >
                    <div className="card-paper-inner">
                      {/* Top Circular Number Badge */}
                      <div className="card-num-badge">
                        <span>{feature.num}</span>
                      </div>

                      {/* Feature Title & Text */}
                      <h3 className="card-title">{feature.title}</h3>
                      <p className="card-desc">{feature.text}</p>

                      {/* Monochrome Heritage Illustration */}
                      <div className="card-illustration-wrap">
                        {feature.svgIcon}
                        <img
                          src={feature.img}
                          alt={feature.title}
                          className="card-illustration-img"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination Dots */}
            <div className="why-pagination-bar" role="tablist">
              {FEATURES.map((f, idx) => {
                const isActive = currentIndex === idx
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={f.ariaLabel}
                    className={`pagination-dot ${isActive ? 'is-active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 1. FINAL CTA SECTION — "BRING HOME A TASTE OF TRADITION" */}
      <section className="final-cta-section" aria-label="Final Invitation">
        <div className="cta-bg-glow" />

        <motion.div
          className="final-cta-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="cta-eyebrow">✦ FINAL INVITATION ✦</span>

          <h2 className="cta-title">
            Bring Home a Taste of <span className="cta-gold-accent">Tradition</span>
          </h2>

          <p className="cta-subtext">
            Handcrafted Telugu snacks made with authentic recipes,<br />
            quality ingredients and a whole lot of care.
          </p>

          <div className="cta-actions">
            <Link to="/snacks" className="cta-btn primary-cta" style={{ textDecoration: 'none' }}>
              Explore Our Snacks
            </Link>

            <Link to="/contact" className="cta-btn secondary-cta" style={{ textDecoration: 'none' }}>
              Order Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. HERITAGE FOOTER */}
      <footer className="raaji-footer" id="footer" aria-label="Website Footer">
        <div className="footer-top-container">
          <div className="footer-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-col brand-col">
              <Link to="/" className="footer-brand-link">
                <img src="/logo.png" alt="Raaji's Crafted Snacks Logo" className="footer-logo-img" />
              </Link>
              <p className="footer-brand-desc">
                Traditional Telugu snacks crafted with authentic recipes, quality ingredients and care inspired by Deccan food traditions.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col links-col">
              <h4 className="footer-col-heading">Quick Links</h4>
              <ul className="footer-links-list">
                <li><button type="button" onClick={() => handleFooterNav('/', 'hero')}>Home</button></li>
                <li><button type="button" onClick={() => handleFooterNav('/our-story', 'story')}>Our Story</button></li>
                <li><button type="button" onClick={() => handleFooterNav('/snacks', 'shelf')}>Snacks</button></li>
                <li><button type="button" onClick={() => handleFooterNav('/our-craft', 'regions')}>Our Craft</button></li>
                <li><button type="button" onClick={() => handleFooterNav('/gifting', 'gifting')}>Corporate Gifting</button></li>
                <li><button type="button" onClick={() => handleFooterNav('/blog')}>Blog</button></li>
                <li><button type="button" onClick={() => handleFooterNav('/contact', 'footer')}>Contact</button></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="footer-col contact-col">
              <h4 className="footer-col-heading">Contact</h4>
              <ul className="footer-contact-list">
                <li>
                  <span className="contact-label">Phone / WhatsApp:</span>
                  <span className="contact-val">
                    <a href="tel:+919347880788" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '700' }}>+91 93478 80788</a>
                  </span>
                </li>
                <li>
                  <span className="contact-label">Location:</span>
                  <span className="contact-val">Khanapuram, Khammam - 507165, Telangana</span>
                </li>
                <li>
                  <span className="contact-label">Options:</span>
                  <span className="contact-val">Store Pickup, Delivery, Bulk Orders</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div className="footer-col social-col">
              <h4 className="footer-col-heading">Follow Us</h4>
              <div className="footer-social-links">
                <a href="#instagram" className="social-chip" aria-label="Follow Raaji's on Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="social-icon">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/raajisofficial" target="_blank" rel="noopener noreferrer" className="social-chip" aria-label="Follow Raaji's on Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="social-icon">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Signature Tagline */}
          <div className="footer-tagline-wrap">
            <div className="tagline-divider">
              <span className="divider-line" />
              <span className="divider-motif">✦</span>
              <span className="divider-line" />
            </div>
            <p className="footer-signature-text">
              Taste the Tradition. Celebrate the Crunch.
            </p>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <p>© {new Date().getFullYear()} Raaji's Crafted Snacks. All rights reserved.</p>
            <div className="footer-legal-links">
              <Link to="/pickup-delivery">Pickup & Delivery</Link>
              <span className="legal-dot">•</span>
              <Link to="/bulk-orders">Bulk Orders</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
