import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WhyUsAndFooter from '../components/WhyUsAndFooter'
import './innerPages.css'

const STEPS = [
  {
    num: '01',
    title: 'Ingredients',
    desc: 'Hand-selected pure rice flour, sesame seeds, ghee, unrefined jaggery, and authentic spices.',
    img: '/story-ingredients.png',
  },
  {
    num: '02',
    title: 'Preparation',
    desc: 'Kneaded and rolled by hand using traditional brass presses and wooden shaping ridges.',
    img: '/story-preparation.png',
  },
  {
    num: '03',
    title: 'Frying',
    desc: 'Small-batch frying under carefully monitored temperatures to achieve golden crisp perfection.',
    img: '/story-frying.png',
  },
  {
    num: '04',
    title: 'Packing',
    desc: 'Hygienically sealed in aroma-preserving containers to deliver farm-fresh tradition.',
    img: '/story-packing.png',
  },
]

export default function OurCraft() {
  const [activeStep, setActiveStep] = useState(0)

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
            <span className="inner-eyebrow">OUR CRAFT</span>
            <h1 className="inner-title">Crafted with Care.</h1>
            <p className="inner-subtext">A look at how tradition becomes every bite.</p>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="page-section">
        <div className="page-container">
          <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="inner-eyebrow">FOUR-STEP CRAFT PROCESS</span>
            <h2 className="section-title">The Art of Pindi Vantalu</h2>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {STEPS.map((s, idx) => (
              <div
                key={s.num}
                className="editorial-card"
                onClick={() => setActiveStep(idx)}
                style={{
                  cursor: 'pointer',
                  borderColor: activeStep === idx ? '#A8322D' : 'rgba(199, 154, 59, 0.3)',
                  background: activeStep === idx ? '#FFFDF8' : '#FDF8F0',
                  transform: activeStep === idx ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: activeStep === idx ? '#A8322D' : '#C79A3B' }}>{s.num}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#4A2A1D', margin: '0.4rem 0' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#6E4532', lineHeight: '1.5' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Active Step Feature Display */}
          <div className="editorial-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <span className="inner-eyebrow">STAGE {STEPS[activeStep].num}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#4A2A1D', margin: '0.4rem 0 1rem' }}>
                {STEPS[activeStep].title}
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.65', color: '#5C3928' }}>
                {STEPS[activeStep].desc}
              </p>
            </div>
            <div style={{ height: '280px', borderRadius: '14px', overflow: 'hidden' }}>
              <img src={STEPS[activeStep].img} alt={STEPS[activeStep].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* HANDCRAFTED PHILOSOPHY */}
      <section className="page-section" style={{ background: '#FFFDF8' }}>
        <div className="page-container">
          <div className="editorial-grid">
            <div>
              <span className="inner-eyebrow">HANDCRAFTED PHILOSOPHY</span>
              <h2 className="section-title">Made with Care, Not Just Made.</h2>
              <p style={{ lineHeight: 1.7, color: '#5C3928', marginBottom: '1.2rem' }}>
                We believe machine automation cannot replace the human touch required for authentic Pindi Vantalu. From kneading the rice flour dough to extruding spirals and gauging the exact frying temperature, experienced cooks guide every step.
              </p>
              <Link to="/snacks" className="form-submit-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                View Our Crafted Snacks →
              </Link>
            </div>
            <div className="editorial-card">
              <img src="/story-preparation.png" alt="Handcrafted preparation" style={{ width: '100%', borderRadius: '12px' }} />
            </div>
          </div>
        </div>
      </section>

      <WhyUsAndFooter />
    </motion.div>
  )
}
