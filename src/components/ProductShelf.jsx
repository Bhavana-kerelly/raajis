import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './productShelf.css'

const PRODUCTS = [
  {
    id: 'sakinalu',
    name: 'SakinAlu',
    region: 'TELANGANA',
    type: 'Traditional • Crispy',
    customJar: '/jar-sakinalu.png',
    fallbackImage: '/story-ingredients.png',
    desc: 'Traditional handcrafted Telugu snack with a crisp texture, made with rice flour, sesame seeds, and ajwain.',
  },
  {
    id: 'murukulu',
    name: 'Murukulu / Jantikalu',
    region: 'ANDHRA',
    type: 'Traditional • Crunchy',
    customJar: '/jar-murukulu.png',
    fallbackImage: '/story-preparation.png',
    desc: 'Golden twisted savory spirals seasoned with carom seeds and cumin, deep fried to a delightful crunch.',
  },
  {
    id: 'chekkalu',
    name: 'Chekkalu',
    region: 'ANDHRA',
    type: 'Traditional • Crispy',
    customJar: '/jar-chekkalu.png',
    fallbackImage: '/story-frying.png',
    desc: 'Thin, crisp rice discs spiced with red chilli flakes, soaked chana dal, and fresh aromatic curry leaves.',
  },
  {
    id: 'chekodi',
    name: 'Chekodi',
    region: 'TELANGANA',
    type: 'Traditional • Crunchy',
    customJar: '/jar-chekodi.png',
    fallbackImage: '/story-frying.png',
    desc: 'Golden ring-shaped crunchy rice flour bites seasoned with sesame seeds and red chilli flakes.',
  },
  {
    id: 'gavvalu',
    name: 'Gavvalu',
    region: 'RAYALASEEMA',
    type: 'Traditional • Crunchy',
    customJar: '/jar-gavvalu.png',
    fallbackImage: '/story-ingredients.png',
    desc: 'Shell-shaped crunchy bites made from hand-kneaded dough, rolled over wooden ridges and fried golden.',
  },
  {
    id: 'ariselu',
    name: 'Ariselu',
    region: 'ANDHRA',
    type: 'Traditional • Sweet',
    customJar: '/jar-ariselu.png',
    fallbackImage: '/story-packing.png',
    desc: 'Classic festive sweet delicacy made with pure organic jaggery and rice flour, topped with toasted sesame seeds.',
  },
]

export default function ProductShelf() {
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [dragConstraint, setDragConstraint] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [trackX, setTrackX] = useState(0)

  const selectedProduct = PRODUCTS[selectedIndex]

  // Calculate drag boundaries and auto-scroll to selected jar
  const updateConstraints = () => {
    if (!trackRef.current || !viewportRef.current) return
    const trackWidth = trackRef.current.scrollWidth
    const viewportWidth = viewportRef.current.offsetWidth
    const maxScroll = trackWidth - viewportWidth
    setDragConstraint(maxScroll > 0 ? -maxScroll : 0)
  }

  const scrollToJar = (index) => {
    if (!trackRef.current || !viewportRef.current) return
    const track = trackRef.current
    const viewport = viewportRef.current
    const jarElements = track.children
    if (!jarElements || !jarElements[index]) return

    const jarEl = jarElements[index]
    const jarLeft = jarEl.offsetLeft
    const jarWidth = jarEl.offsetWidth
    const viewportWidth = viewport.offsetWidth
    const maxScroll = track.scrollWidth - viewportWidth

    if (maxScroll <= 0) {
      setTrackX(0)
      return
    }

    // Center the target jar in the viewport
    let targetX = -(jarLeft - viewportWidth / 2 + jarWidth / 2)

    // Clamp within bounds
    if (targetX > 0) targetX = 0
    if (targetX < -maxScroll) targetX = -maxScroll

    setTrackX(targetX)
  }

  useEffect(() => {
    updateConstraints()
    scrollToJar(selectedIndex)
    window.addEventListener('resize', updateConstraints)
    return () => window.removeEventListener('resize', updateConstraints)
  }, [selectedIndex])

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : PRODUCTS.length - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < PRODUCTS.length - 1 ? prev + 1 : 0))
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelectedIndex(index)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    }
  }

  return (
    <section className="product-shelf-section" id="shelf" aria-label="Product Showcase">
      {/* Background paper texture & ambient glow */}
      <div className="shelf-bg-glow" />

      {/* Decorative top-right Indian line motif */}
      <div className="shelf-decorative-motif" aria-hidden="true">
        <svg viewBox="0 0 160 160" fill="none" className="motif-svg">
          <circle cx="80" cy="80" r="70" stroke="#C79A3B" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
          <circle cx="80" cy="80" r="50" stroke="#A8322D" strokeWidth="1" opacity="0.25" />
          <path d="M80 10 L80 150 M10 80 L150 80 M30 30 L130 130 M30 130 L130 30" stroke="#C79A3B" strokeWidth="0.75" opacity="0.2" />
          <circle cx="80" cy="80" r="12" fill="#A8322D" opacity="0.15" />
        </svg>
      </div>

      <div className="shelf-container">
        {/* Section Header */}
        <header className="shelf-header">
          <p className="shelf-eyebrow">PRODUCT SHELF</p>
          <h2 className="shelf-heading">
            Pick a jar.<br />
            Drag to browse.
          </h2>
          <p className="shelf-subtext">
            Handcrafted Telugu snacks made with authentic recipes &amp; quality ingredients.
          </p>
        </header>

        {/* Interactive Shelf Viewport & Draggable Jars */}
        <div className="shelf-viewport" ref={viewportRef}>
          <motion.div
            className="shelf-track"
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: dragConstraint, right: 0 }}
            dragElastic={0.1}
            animate={{ x: trackX }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => {
              setTimeout(() => setIsDragging(false), 50)
              if (info.point) {
                setTrackX(info.point.x)
              }
            }}
          >
            {PRODUCTS.map((product, idx) => {
              const isSelected = selectedIndex === idx

              return (
                <button
                  key={product.id}
                  type="button"
                  tabIndex={0}
                  className={`jar-wrapper ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => {
                    if (!isDragging) setSelectedIndex(idx)
                  }}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-label={`${product.name} from ${product.region}. Click to view details.`}
                  aria-pressed={isSelected}
                >
                  {/* Clean Single Jar Container */}
                  <div className="clean-jar-container">
                    <img
                      src={product.customJar}
                      alt={product.name}
                      className="clean-jar-img"
                      onError={(e) => {
                        e.target.src = product.fallbackImage
                      }}
                    />
                    {/* Base Shadow underneath jar */}
                    <div className="jar-base-shadow" />
                  </div>

                  {/* Selected Indicator Glow & Marker */}
                  {isSelected && <div className="jar-selected-glow" />}
                </button>
              )
            })}
          </motion.div>

          {/* Wooden Pantry Shelf Board */}
          <div className="wooden-shelf-board">
            <div className="wood-top-surface" />
            <div className="wood-front-bevel" />
            <div className="wood-bottom-shadow" />
          </div>
        </div>

        {/* Shelf Navigation & Drag Cue */}
        <div className="shelf-controls-bar">
          <button
            type="button"
            className="shelf-nav-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous Product Jar"
          >
            ←
          </button>

          <span className="drag-cue-text">
            ← Drag to explore →
          </span>

          <button
            type="button"
            className="shelf-nav-btn next-btn"
            onClick={handleNext}
            aria-label="Next Product Jar"
          >
            →
          </button>
        </div>

        {/* Selected Product Information Area */}
        <div className="selected-product-info-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProduct.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="info-card-content"
            >
              <div className="info-header">
                <span className="info-region-badge">{selectedProduct.region}</span>
                <span className="info-type-tag">{selectedProduct.type}</span>
              </div>

              <h3 className="info-product-title">{selectedProduct.name}</h3>

              <p className="info-product-desc">{selectedProduct.desc}</p>

              <Link
                to={`/snacks/${selectedProduct.id}`}
                className="discover-snack-btn"
                style={{ textDecoration: 'none' }}
              >
                <span>Discover {selectedProduct.name}</span>
                <span className="btn-arrow">→</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
