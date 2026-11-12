import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Builds a tube geometry along a flattened spiral curve — a stylized
// low-poly stand-in for a Sakinalu (rice-flour spiral snack), so the
// hero doesn't depend on an external 3D asset.
function buildSpiralCurve(turns = 3, radiusStart = 0.15, radiusEnd = 1.6, points = 220) {
  const pts = []
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1)
    const angle = t * Math.PI * 2 * turns
    const r = THREE.MathUtils.lerp(radiusStart, radiusEnd, t)
    const x = Math.cos(angle) * r
    const z = Math.sin(angle) * r
    const y = Math.sin(t * Math.PI) * 0.12 // gentle organic bow, not perfectly flat
    pts.push(new THREE.Vector3(x, y, z))
  }
  return new THREE.CatmullRomCurve3(pts)
}

export default function SpiralSnack({ mouse, scrollProgress = 0 }) {
  const group = useRef()
  const curve = useMemo(() => buildSpiralCurve(), [])
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 260, 0.14, 12, false),
    [curve]
  )

  useFrame((state, delta) => {
    if (!group.current) return
    // idle rotation
    group.current.rotation.z += delta * 0.15
    // subtle tilt toward cursor
    const targetX = mouse.current.y * 0.35
    const targetY = mouse.current.x * 0.35
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04
    // scroll-driven lift/scale as the hero exits
    const s = 1 - scrollProgress * 0.25
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.08))
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scrollProgress * -0.8, 0.08)
  })

  return (
    <group ref={group} rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#C9973B"
          roughness={0.45}
          metalness={0.12}
          emissive="#7A4A1E"
          emissiveIntensity={0.08}
        />
      </mesh>
    </group>
  )
}
