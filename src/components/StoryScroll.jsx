import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './story.css'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  {
    num: '01',
    title: 'INGREDIENTS',
    image: '/story-ingredients.png',
    desc: 'Traditional ingredients, carefully selected.',
  },
  {
    num: '02',
    title: 'PREPARATION',
    image: '/story-preparation.png',
    desc: 'Dough kneaded by hand, following recipes passed down through generations.',
  },
  {
    num: '03',
    title: 'FRYING',
    image: '/story-frying.png',
    desc: 'Each snack is carefully fried until it reaches its signature golden crunch.',
  },
  {
    num: '04',
    title: 'PACKING',
    image: '/story-packing.png',
    desc: 'Freshly prepared, thoughtfully packed, and ready to travel from our kitchen to your table.',
  },
]

export default function StoryScroll() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const stagesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header elements on scroll into view
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      tlHeader
        .from(headingRef.current, { opacity: 0, y: 25, duration: 0.7, ease: 'power2.out' })
        .from(subRef.current, { opacity: 0, y: 15, duration: 0.5, ease: 'power2.out' }, '-=0.4')

      // Sequentially animate the four story stages
      stagesRef.current.forEach((el, index) => {
        if (!el) return
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.7,
          delay: index * 0.12,
          ease: 'power3.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="story-section" id="story" ref={sectionRef}>
      {/* Subtle paper background texture overlay */}
      <div className="story-bg-texture" />

      <div className="story-container">
        {/* Top Header Section */}
        <div className="story-header">
          <h2 className="story-heading" ref={headingRef}>
            From Our <span className="highlight-red">Kitchen</span> to Your{' '}
            <span className="highlight-red">Home</span>
          </h2>

          <p className="story-subtitle" ref={subRef}>
            Every Raaji’s Crafted Snack is a journey of tradition, made with love and
            time-honoured recipes.
          </p>
        </div>

        {/* 4-Stage Horizontal Storytelling Grid */}
        <div className="story-grid">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.title}
              className="story-stage-card"
              ref={(el) => (stagesRef.current[idx] = el)}
            >
              {/* Header with Badge & Title */}
              <div className="story-stage-header">
                <span className="story-num-badge">{stage.num}</span>
                <h3 className="story-stage-title">{stage.title}</h3>
              </div>

              {/* Hand-drawn Stage Illustration */}
              <div className="story-stage-img-wrap">
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="story-stage-img"
                />
              </div>

              {/* Description */}
              <p className="story-stage-desc">{stage.desc}</p>

              {/* Decorative Underline Flourish */}
              <div className="story-stage-flourish">
                <svg viewBox="0 0 40 8" fill="none" className="flourish-svg">
                  <path
                    d="M2,4 Q20,1 38,4"
                    stroke="#B94630"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="4" r="1.5" fill="#C9973B" />
                </svg>
              </div>

              {/* Hand-drawn Arrow Connector between stages on desktop */}
              {idx < STAGES.length - 1 && (
                <div className="story-connector-arrow">
                  <svg viewBox="0 0 48 16" fill="none" className="arrow-svg">
                    <path
                      d="M2,8 C14,4 28,12 42,8"
                      stroke="#B94630"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      fill="none"
                    />
                    <path
                      d="M38,4 L45,8 L38,12"
                      stroke="#B94630"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
