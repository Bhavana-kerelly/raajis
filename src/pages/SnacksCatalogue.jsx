import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import { PRODUCTS } from '../data/products'
import './innerPages.css'

const CATEGORIES = [
  { id: 'all', label: 'All Snacks' },
  { id: 'savoury', label: 'Savoury Snacks' },
  { id: 'sweets', label: 'Sweets' },
  { id: 'pickles', label: 'Pickles & Kaaram' },
  { id: 'powders', label: 'Mixes & Powders' },
]

export default function SnacksCatalogue() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Navbar />

      {/* HERO */}
      <section className="inner-hero">
        <div className="page-container">
          <div className="inner-hero-content">
            <span className="inner-eyebrow">OUR SNACKS</span>
            <h1 className="inner-title">
              Traditional Telugu Snacks,<br />
              Made the Way They Should Be.
            </h1>
            <p className="inner-subtext">
              Explore Raaji’s handcrafted savouries, sweets, pickles, and kaaram powders inspired by authentic Telugu culinary traditions.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER & CATALOGUE GRID */}
      <section className="page-section" style={{ borderTop: 'none' }}>
        <div className="page-container">
          {/* Filter Bar */}
          <div className="category-filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Catalogue Grid */}
          <div className="products-catalogue-grid">
            {filteredProducts.map((p) => (
              <Link key={p.id} to={`/snacks/${p.slug}`} className="snack-catalogue-card">
                <div className="card-jar-wrap">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="card-jar-img"
                    onError={(e) => {
                      e.target.src = p.fallbackImage
                    }}
                  />
                </div>
                <span className="card-badge">{p.categoryLabel}</span>
                <h3 className="card-snack-title">{p.name}</h3>
                <p className="card-snack-desc">{p.shortDesc}</p>
                <span className="card-action-link">
                  <span>View Snack</span>
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhyUsAndFooter />
    </motion.div>
  )
}
