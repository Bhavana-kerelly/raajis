import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import './innerPages.css'

export default function BulkOrders() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: 'Festive Orders',
    date: '',
    quantity: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const messageText = `Hello Raaji's Crafted Snacks! 👋\nI would like to place a Bulk Order.\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n✉️ Email: ${formData.email || 'N/A'}\n📦 Order Type: ${formData.requirement}\n📅 Preferred Date: ${formData.date || 'Flexible'}\n⚖️ Quantity: ${formData.quantity || 'N/A'}\n💬 Message: ${formData.message || 'N/A'}`
    const waUrl = `https://wa.me/919347880788?text=${encodeURIComponent(messageText)}`
    window.open(waUrl, '_blank')
    setSubmitted(true)
  }

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
            <span className="inner-eyebrow">BULK ORDERS</span>
            <h1 className="inner-title">
              Traditional Flavours,<br />
              Made for Every Gathering.
            </h1>
            <p className="inner-subtext">
              Planning a celebration, family function or large order? Talk to us about your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="page-section">
        <div className="page-container">
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div className="editorial-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>💬</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#4A2A1D' }}>Redirected to WhatsApp!</h3>
                  <p style={{ color: '#6E4532', margin: '0.8rem 0 1.5rem', lineHeight: '1.6' }}>
                    Your prefilled bulk order enquiry has been sent to WhatsApp <strong>(+91 93478 80788)</strong>. We will get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    className="form-submit-btn"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="heritage-form">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#4A2A1D', marginBottom: '0.4rem' }}>
                    Bulk Order Enquiry Form
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#6E4532', marginBottom: '1.2rem' }}>
                    Submitting this form opens WhatsApp (+91 93478 80788) prefilled with your enquiry details.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Phone *</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        placeholder="+91 93478 80788"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Order Type</label>
                    <select
                      className="form-select"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    >
                      <option value="Festive Orders">Festive Orders</option>
                      <option value="Family Functions">Family Functions</option>
                      <option value="Events">Events</option>
                      <option value="Bulk Gifting">Bulk Gifting</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Preferred Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Quantity / Approx Req.</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 50 kg or 100 boxes"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message / Details</label>
                    <textarea
                      rows="4"
                      className="form-textarea"
                      placeholder="Tell us more about your event or snack preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn" style={{ background: '#25D366', color: '#FFFFFF' }}>
                    Send Bulk Enquiry via WhatsApp →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <WhyUsAndFooter />
    </motion.div>
  )
}
