import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scrubs through a numbered sequence of images on a <canvas>, tied to
 * scroll position — the same technique Apple uses on product pages.
 * No 3D engine involved: it's just drawing the right image per scroll %.
 *
 * Usage:
 *   <ScrollFrameSequence
 *     folder="/frames/hero"
 *     frameCount={120}
 *     fileNamePattern={(i) => `frame_${String(i).padStart(3, '0')}.jpg`}
 *     pinDuration="+=200%"
 *   />
 *
 * Drop your exported, numbered frames (frame_001.jpg, frame_002.jpg, ...)
 * into /public/frames/hero/ and this will preload and scrub them.
 */
export default function ScrollFrameSequence({
  folder,
  frameCount,
  fileNamePattern = (i) => `frame_${String(i).padStart(3, '0')}.jpg`,
  pinDuration = '+=200%',
  className = '',
}) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const imagesRef = useRef([])
  const [loaded, setLoaded] = useState(false)

  // Preload every frame up front so scrubbing never shows a blank frame.
  useEffect(() => {
    let cancelled = false
    const images = []
    let loadedCount = 0

    const handleItemDone = () => {
      loadedCount += 1
      if (loadedCount === frameCount && !cancelled) setLoaded(true)
    }

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      img.src = `${folder}/${fileNamePattern(i)}`
      img.onload = handleItemDone
      img.onerror = handleItemDone
      images.push(img)
    }
    imagesRef.current = images

    return () => {
      cancelled = true
    }
  }, [folder, frameCount, fileNamePattern])

  // Draw a given frame index to the canvas, fitted to cover.
  const drawFrame = (index) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const scale = Math.max(width / img.width, height / img.height)
    const w = img.width * scale
    const h = img.height * scale
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h)
  }

  // Size the canvas to its wrapper (handles resize + retina).
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.getContext('2d').scale(dpr, dpr)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      drawFrame(0)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [loaded])

  // Tie frame index to scroll progress once frames are ready.
  useEffect(() => {
    if (!loaded) return
    const obj = { frame: 0 }

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        frame: frameCount - 1,
        ease: 'none',
        snap: 'frame',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: pinDuration,
          scrub: 0.4,
          pin: true,
        },
        onUpdate: () => drawFrame(Math.round(obj.frame)),
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [loaded, frameCount, pinDuration])

  return (
    <div className={`frame-sequence-wrap ${className}`} ref={wrapRef}>
      <canvas ref={canvasRef} className="frame-sequence-canvas" />
      {!loaded && (
        <div className="frame-sequence-loading">Loading…</div>
      )}
    </div>
  )
}
