import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './regionalMap.css'

const REGIONS = [
  {
    id: 'telangana',
    name: 'TELANGANA',
    titleName: 'Telangana',
    snacks: [
      { name: 'SakinAlu', desc: 'Handcrafted rice-flour spirals fried to a golden crunch.', img: '/story-ingredients.png' },
      { name: 'Chekodi', desc: 'Golden ring-shaped crunchy rice flour bites seasoned with sesame.', img: '/story-frying.png' },
    ],
  },
  {
    id: 'coastal-andhra',
    name: 'COASTAL ANDHRA',
    titleName: 'Coastal Andhra',
    snacks: [
      { name: 'Murukulu / Jantikalu', desc: 'Golden twisted savory spirals seasoned with carom seeds.', img: '/story-preparation.png' },
      { name: 'Ariselu', desc: 'Classic festive jaggery & rice sweet topped with sesame.', img: '/story-packing.png' },
      { name: 'Chekkalu', desc: 'Thin crisp rice discs spiced with red chilli & curry leaves.', img: '/story-frying.png' },
    ],
  },
  {
    id: 'rayalaseema',
    name: 'RAYALASEEMA',
    titleName: 'Rayalaseema',
    snacks: [
      { name: 'Gavvalu', desc: 'Shell-shaped crunchy sweet & savory bites shaped over wooden ridges.', img: '/story-ingredients.png' },
    ],
  },
]

export default function RegionalMap() {
  const [activeId, setActiveId] = useState('telangana')
  const activeRegion = REGIONS.find((r) => r.id === activeId) || REGIONS[0]

  const handleSelect = (id) => {
    setActiveId(id)
  }

  return (
    <section className="regional-section" id="regions" aria-label="Telugu Regional Heritage">
      <div className="regional-container">
        {/* Section Header */}
        <header className="regional-header">
          <p className="regional-eyebrow">INSPIRED BY TELUGU REGIONS</p>
          <h2 className="regional-heading">
            Flavours rooted in Telangana,<br />
            Andhra, and Rayalaseema.
          </h2>
        </header>

        <div className="regional-content-grid">
          {/* LEFT: Clean Custom Telugu Map Image */}
          <div className="map-wrapper">
            <div className="map-image-container">
              <img
                src="/telugu-map.png"
                alt="Telugu Regions Map - Telangana, Coastal Andhra, and Rayalaseema"
                className="custom-telugu-map-img"
              />
            </div>

            {/* Interaction Pill Buttons below map */}
            <div className="map-region-buttons">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`region-tab-btn ${activeId === r.id ? 'is-active' : ''}`}
                  onClick={() => handleSelect(r.id)}
                >
                  {r.titleName}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Selected Region Editorial Content Panel */}
          <div className="regional-panel-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="regional-info-card"
              >
                <div className="card-header">
                  <span className="card-region-tag">{activeRegion.name}</span>
                </div>

                <h3 className="card-region-title">{activeRegion.titleName}</h3>

                {/* Snack List */}
                <div className="card-snack-list">
                  <span className="snack-list-label">TRADITIONAL SNACKS</span>
                  <div className="snack-items-grid">
                    {activeRegion.snacks.map((snack) => (
                      <div key={snack.name} className="snack-item-chip">
                        <div className="snack-thumb-wrap">
                          <img src={snack.img} alt={snack.name} className="snack-thumb-img" />
                        </div>
                        <div className="snack-item-info">
                          <span className="snack-item-name">{snack.name}</span>
                          <span className="snack-item-desc">{snack.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="explore-flavours-btn"
                  onClick={() => {
                    const shelf = document.getElementById('shelf')
                    if (shelf) shelf.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span>Explore the flavours</span>
                  <span className="btn-arrow">→</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
