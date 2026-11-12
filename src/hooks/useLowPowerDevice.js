import { useEffect, useState } from 'react'

// Returns true when the device is a small screen, a coarse-pointer
// (touch) device, or has explicitly asked for reduced motion — in
// any of those cases we skip the WebGL canvas and show a lighter
// CSS-based hero instead, so low-end phones stay fast.
export default function useLowPowerDevice() {
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    const smallScreen = window.matchMedia('(max-width: 760px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowMemory = 'deviceMemory' in navigator && navigator.deviceMemory <= 4

    setIsLowPower((coarsePointer && smallScreen) || reducedMotion || lowMemory)
  }, [])

  return isLowPower
}
