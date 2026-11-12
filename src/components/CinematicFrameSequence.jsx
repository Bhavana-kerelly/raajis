import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/**
 * Plays a numbered frame sequence once, automatically, on mount —
 * a cinematic load-in rather than a scroll-scrubbed one. Calls
 * onComplete when the sweep finishes, so text/UI can land after it.
 *
 * Usage:
 *   <CinematicFrameSequence
 *     folder="/frames/hero-spread"
 *     frameCount={100}
 *     durationSeconds={4.5}
 *     onComplete={() => setRevealed(true)}
 *   />
 */
export default function CinematicFrameSequence({
  folder,
  frameCount,
  fileNamePattern = (i) => `frame_${String(i).padStart(3, '0')}.jpg`,
  durationSeconds = 4,
  onComplete,
  className = '',
}) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const imagesRef = useRef([])
  const [loaded, setLoaded] = useState(false)

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
      drawFrame(0)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [loaded])

  useEffect(() => {
    if (!loaded) return
    const obj = { frame: 0 }

    gsap.to(obj, {
      frame: frameCount - 1,
      duration: durationSeconds,
      ease: 'power1.inOut',
      onUpdate: () => drawFrame(Math.round(obj.frame)),
      onComplete: () => onComplete && onComplete(),
    })
  }, [loaded, frameCount, durationSeconds])

  return (
    <div className={`frame-sequence-wrap ${className}`} ref={wrapRef}>
      <canvas ref={canvasRef} className="frame-sequence-canvas" />
    </div>
  )
}
