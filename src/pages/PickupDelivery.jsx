import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import './innerPages.css'

export default function PickupDelivery() {
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
            <span className="inner-eyebrow">PICKUP & DELIVERY</span>
            <h1 className="inner-title">
              Choose How You'd Like to<br />
              Enjoy Rajji's.
            </h1>
            <p className="inner-subtext">
              Collect fresh small-batch snacks directly or request delivery for doorstep convenience.
            </p>
          </div>
        </div>
      </section>

      {/* OPTIONS SECTION */}
      <section className="page-section">
        <div className="page-container">
          <div className="editorial-grid">
            {/* PICKUP */}
            <div className="editorial-card">
              <span className="inner-eyebrow">OPTION 01</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#4A2A1D', margin: '0.4rem 0 1rem' }}>
                Store Pickup
              </h3>
              <p style={{ color: '#5C3928', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                Visit our production unit in Khammam to pick up freshly packed jars of Shekkinalu, Ariselu, and Chekkalu straight from the kitchen.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#8F3323', fontWeight: '700' }}>
                📍 Khanapuram, Khammam - 507165, Telangana
              </p>
            </div>

            {/* DELIVERY */}
            <div className="editorial-card">
              <span className="inner-eyebrow">OPTION 02</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#4A2A1D', margin: '0.4rem 0 1rem' }}>
                Delivery Request
              </h3>
              <p style={{ color: '#5C3928', lineHeight: '1.65', marginBottom: '1.5rem' }}>
                We carefully package and seal every glass container in protective padding to ensure your snacks arrive crispy and undamaged.
              </p>
              <Link to="/contact" className="card-action-link" style={{ fontSize: '1rem' }}>
                Enquire for Delivery Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhyUsAndFooter />
    </motion.div>
  )
}
