import './heroFallback.css'

// A static, illustrated stand-in for the spinning 3D spiral — pure
// CSS (conic-gradient rings + a slow rotation), no WebGL, so it's
// cheap to paint and battery-friendly on lower-end phones.
export default function HeroFallbackVisual() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="hero-fallback-ring" />
      <div className="hero-fallback-ring hero-fallback-ring--inner" />
    </div>
  )
}
