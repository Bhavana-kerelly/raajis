import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import './innerPages.css'

const BELIEFS = [
  { title: 'Authenticity', desc: 'Preserving original Telugu culinary methods without shortcuts or artificial flavorings.' },
  { title: 'Tradition', desc: 'Time-honoured Pindi Vantalu recipes passed through generations of home cooks.' },
  { title: 'Quality', desc: 'Hand-picked ingredients, pure ghee, and unrefined jaggery sourced with care.' },
  { title: 'Trust', desc: 'Small-batch preparation ensuring wholesome safety and freshness in every jar.' },
  { title: 'Happiness', desc: 'Bringing nostalgic Telugu warmth and festive cheer to family gatherings.' },
]

export default function OurStory() {
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
            <span className="inner-eyebrow">OUR STORY</span>
            <h1 className="inner-title">
              More Than a Snack.<br />
              It's a Taste of Tradition.
            </h1>
            <p className="inner-subtext">
              Born from a love for authentic Telugu recipes and handcrafted Pindi Vantalu passed down through generations.
            </p>
          </div>
        </div>
      </section>

      {/* WHERE IT BEGAN */}
      <section className="page-section">
        <div className="page-container">
          <div className="editorial-grid">
            <div className="editorial-text">
              <span className="inner-eyebrow">WHERE IT BEGAN</span>
              <h2 className="section-title">A Tradition Worth Preserving</h2>
              <p style={{ lineHeight: 1.7, color: '#5C3928', marginBottom: '1.2rem' }}>
                At Raaji’s, snack-making is not an industrial process — it is an art of love, family, and heritage. In Telugu homes, Pindi Vantalu have always been the heart of festive celebrations and afternoon tea conversations.
              </p>
              <p style={{ lineHeight: 1.7, color: '#5C3928' }}>
                We began with a simple mission: to preserve these time-honoured recipes and share authentic, small-batch Telugu snacks with today’s families, ensuring every bite carries the warmth of home.
              </p>
            </div>

            <div className="editorial-card" style={{ textAlign: 'center' }}>
              <img
                src="/story-preparation.png"
                alt="Hands preparing traditional Telugu snacks"
                style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', borderRadius: '12px' }}
              />
              <p style={{ fontSize: '0.85rem', color: '#6E4532', marginTop: '1rem', fontStyle: 'italic' }}>
                Handcrafted in small batches with care, keeping traditional flavours alive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="page-section" style={{ background: '#FFFDF8' }}>
        <div className="page-container">
          <header style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
            <span className="inner-eyebrow">THE RAJJI'S PROMISE</span>
            <h2 className="section-title">What We Believe</h2>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.title}
                className="editorial-card"
                style={{ padding: '1.8rem 1.4rem', borderTop: '3px solid #A8322D' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#C79A3B' }}>0{i + 1}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#4A2A1D', margin: '0.4rem 0' }}>{b.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#6E4532', lineHeight: '1.55' }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="page-section" style={{ textAlign: 'center' }}>
        <div className="page-container">
          <div className="inner-hero-content">
            <h2 className="section-title">Crafted with Care.<br />Rooted in Tradition.</h2>
            <p className="inner-subtext" style={{ marginBottom: '2rem' }}>
              Explore our full collection of handcrafted Telugu savouries, sweets, and kaaram powders.
            </p>
            <Link to="/snacks" className="form-submit-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Explore Our Snacks →
            </Link>
          </div>
        </div>
      </section>

      <WhyUsAndFooter />
    </motion.div>
  )
}
