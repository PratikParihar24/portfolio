import { Canvas, useThree } from '@react-three/fiber'
import LightingRig from './LightingRig'
import AvatarModel from './AvatarModel'
import { useEffect, useRef, useState } from 'react'

function AvatarContainer() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 6
  const xPos = isMobile ? 0 : 2.5
  const yPos = isMobile ? -2 : 0

  return (
    <group position={[xPos, yPos, 0]} scale={isMobile ? 0.8 : 1}>
      <AvatarModel />
    </group>
  )
}

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Small delay to ensure DOM is settled before creating WebGL context
    const timer = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {ready && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          shadows
          gl={{ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
          }}
          style={{ background: 'transparent' }}
        >
          <LightingRig />
          <AvatarContainer />
        </Canvas>
      )}
    </div>
  )
}
