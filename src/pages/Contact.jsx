import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import './innerPages.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const messageText = `Hello Raaji's Crafted Snacks! 👋\nI would like to get in touch.\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n✉️ Email: ${form.email || 'N/A'}\n💬 Message: ${form.message}`
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
            <span className="inner-eyebrow">GET IN TOUCH</span>
            <h1 className="inner-title">Let's Talk Snacks.</h1>
            <p className="inner-subtext">
              Have a question, want to place an order, or need a bulk order? We're happy to help.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT OPTIONS & FORM */}
      <section className="page-section">
        <div className="page-container">
          <div className="editorial-grid">
            {/* Contact Details */}
            <div className="editorial-text">
              <span className="inner-eyebrow">LOCATION & CONTACT</span>
              <h2 className="section-title">Visit or Connect</h2>

              {/* Phone & WhatsApp Card */}
              <div style={{ background: '#FFFDF8', border: '1px solid #C79A3B', borderRadius: '14px', padding: '1.2rem 1.4rem', marginBottom: '1.8rem', boxShadow: '0 4px 14px rgba(74, 42, 29, 0.05)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.12em', color: '#A8322D', display: 'block', marginBottom: '0.4rem' }}>
                  DIRECT CALL / WHATSAPP:
                </span>
                <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#4A2A1D', margin: '0 0 0.8rem 0' }}>
                  +91 93478 80788
                </p>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                  <a
                    href="tel:+919347880788"
                    style={{
                      background: '#4A2A1D',
                      color: '#FFFDF8',
                      padding: '0.45rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    📞 Call Now
                  </a>
                  <a
                    href="https://wa.me/919347880788?text=Hello%20Raaji's%20Crafted%20Snacks!"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#25D366',
                      color: '#FFFFFF',
                      padding: '0.45rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Location Address */}
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.12em', color: '#A8322D', display: 'block', marginBottom: '0.4rem' }}>
                  LOCATION ADDRESS:
                </span>
                <p style={{ fontSize: '1.05rem', fontWeight: '600', color: '#4A2A1D', lineHeight: '1.5' }}>
                  Khanapuram, Khammam - 507165<br />
                  Khammam District, Telangana, India
                </p>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#FFFDF8', border: '1px solid rgba(199, 154, 59, 0.3)', borderRadius: '12px', padding: '1rem 1.2rem' }}>
                  <h4 style={{ margin: 0, color: '#4A2A1D', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>✓ Store Pickup</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#6E4532' }}>Collect fresh small-batch snacks directly from our unit in Khammam.</p>
                </div>
                <div style={{ background: '#FFFDF8', border: '1px solid rgba(199, 154, 59, 0.3)', borderRadius: '12px', padding: '1rem 1.2rem' }}>
                  <h4 style={{ margin: 0, color: '#4A2A1D', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>✓ Local & Outstation Delivery</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#6E4532' }}>Prompt dispatch of securely sealed snack jars to your doorstep.</p>
                </div>
                <div style={{ background: '#FFFDF8', border: '1px solid rgba(199, 154, 59, 0.3)', borderRadius: '12px', padding: '1rem 1.2rem' }}>
                  <h4 style={{ margin: 0, color: '#4A2A1D', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>✓ Bulk & Festive Orders</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.88rem', color: '#6E4532' }}>Custom hamper packing for weddings, functions, and festive gifting.</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="editorial-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>💬</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#4A2A1D' }}>Redirected to WhatsApp!</h3>
                  <p style={{ color: '#6E4532', margin: '0.8rem 0 1.5rem', lineHeight: '1.6' }}>
                    Your prefilled message has been sent to WhatsApp <strong>(+91 93478 80788)</strong>. We will respond to your message shortly.
                  </p>
                  <button type="button" className="form-submit-btn" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="heritage-form">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#4A2A1D', marginBottom: '0.4rem' }}>
                    Send Us a Message
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#6E4532', marginBottom: '1.2rem' }}>
                    Submitting this form opens WhatsApp prefilled with your details.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Your Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="+91 93478 80788"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      rows="4"
                      required
                      className="form-textarea"
                      placeholder="Write your message or order inquiry..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn" style={{ background: '#25D366', color: '#FFFFFF' }}>
                    Send via WhatsApp →
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
