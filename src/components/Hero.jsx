import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './hero.css'

export default function Hero() {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const eyebrowRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [eyebrowRef.current, headingRef.current, subRef.current, buttonsRef.current].filter(Boolean),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-video-container">
        <video
          className="hero-background-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="hero-copy is-revealed">
        <p className="eyebrow" ref={eyebrowRef}>Handcrafted Telugu Snacks</p>
        <h1 className="hero-heading" ref={headingRef}>
          <span className="hero-heading-line">Taste the Tradition.</span>
          <br />
          <span className="hero-heading-line">Celebrate the Crunch.</span>
        </h1>
        <p className="hero-sub" ref={subRef}>
          Authentic vegetarian snacks inspired by the traditional flavours of Telangana, Andhra and Rayalaseema — handcrafted in small batches with care.
        </p>

        <div className="hero-buttons" ref={buttonsRef}>
          <Link to="/snacks" className="hero-btn primary-btn">
            Explore Our Snacks
          </Link>
          <Link to="/our-story" className="hero-btn secondary-btn">
            Our Story
          </Link>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
