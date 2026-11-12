import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollFrameSequence from './ScrollFrameSequence'
import './packaging.css'

gsap.registerPlugin(ScrollTrigger)

// Number of frames in /public/frames/packaging/
const PACKAGING_FRAME_COUNT = 24

export default function Packaging() {
  const sectionRef = useRef(null)
  const copyRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gradually fade & slide in copy as the user scrubs through the frame sequence
      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'top -40%',
            scrub: 0.6,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="packaging" id="packaging" ref={sectionRef}>
      <ScrollFrameSequence
        folder="/frames/packaging"
        frameCount={PACKAGING_FRAME_COUNT}
        fileNamePattern={(i) => `ezgif-frame-${String(i).padStart(3, '0')}.jpg`}
        pinDuration="+=200%"
      />

      <div className="packaging-copy" ref={copyRef}>
        <p className="eyebrow">Thoughtfully Packed</p>
        <h2>Designed to preserve freshness and tradition.</h2>
      </div>
    </section>
  )
}
