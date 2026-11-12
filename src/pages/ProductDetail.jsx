import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import { PRODUCTS } from '../data/products'
import './innerPages.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0]

  return (
    <motion.div
      className="page-wrapper"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Navbar />

      <section className="page-section" style={{ paddingTop: '5rem', borderTop: 'none' }}>
        <div className="page-container">
          {/* Back to Catalogue */}
          <button
            type="button"
            onClick={() => navigate('/snacks')}
            style={{
              background: 'none',
              border: 'none',
              color: '#A8322D',
              fontSize: '0.9rem',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>←</span>
            <span>Back to All Snacks</span>
          </button>

          <div className="editorial-grid">
            {/* LEFT: Product Jar Visual */}
            <div
              className="editorial-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '380px',
                background: '#FFFDF8',
              }}
            >
              <img
                src={product.img}
                alt={product.name}
                style={{ width: '95%', maxHeight: '420px', objectFit: 'contain' }}
              />
            </div>

            {/* RIGHT: Product Information */}
            <div className="editorial-text">
              <span className="inner-eyebrow">{product.categoryLabel} • {product.region}</span>
              <h1 className="inner-title" style={{ fontSize: '2.8rem', margin: '0.5rem 0 1rem' }}>
                {product.name}
              </h1>

              <p style={{ fontSize: '1.05rem', lineHeight: '1.65', color: '#5C3928', marginBottom: '1.8rem' }}>
                {product.longDesc}
              </p>

              {/* Order Options Info */}
              <div
                style={{
                  background: '#FDF8F0',
                  border: '1px solid rgba(199, 154, 59, 0.3)',
                  borderRadius: '12px',
                  padding: '1.2rem 1.4rem',
                  marginBottom: '2rem',
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.12em', color: '#A8322D', display: 'block', marginBottom: '0.5rem' }}>
                  AVAILABLE ORDER OPTIONS:
                </span>
                <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.9rem', color: '#4A2A1D', fontWeight: '600', flexWrap: 'wrap' }}>
                  <span>✓ Pickup</span>
                  <span>✓ Delivery</span>
                  <span>✓ Bulk Orders</span>
                </div>
              </div>

              {/* Order CTA Button */}
              <a
                href={`https://wa.me/919347880788?text=${encodeURIComponent(`Hello Raaji's Crafted Snacks! 👋\nI am interested in ordering: *${product.name}* (${product.categoryLabel}).\nPlease share available pickup and delivery details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="form-submit-btn"
                style={{ textDecoration: 'none', display: 'inline-block', padding: '1rem 2.5rem', background: '#25D366', color: '#FFFFFF' }}
              >
                Order {product.name} via WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhyUsAndFooter />
    </motion.div>
  )
}
