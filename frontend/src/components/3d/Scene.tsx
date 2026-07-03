import { Canvas, useThree } from '@react-three/fiber'
import LightingRig from './LightingRig'
import AvatarModel from './AvatarModel'
import { useEffect, useRef, useState } from 'react'

function AvatarContainer() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 6

  return (
    <group scale={isMobile ? 0.8 : 1}>
      <AvatarModel isMobile={isMobile} />
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
      style={{ zIndex: 20 }}
    >
      {ready && (
        <Canvas
          eventSource={typeof document !== 'undefined' ? document.body : undefined}
          camera={{ position: [0, 0, 5], fov: 45 }}
          shadows
          gl={{ 
            alpha: true, 
            antialias: true,
            powerPreference: 'high-performance'
          }}
          style={{ background: 'transparent', pointerEvents: 'none' }}
        >
          <LightingRig />
          <AvatarContainer />
        </Canvas>
      )}
    </div>
  )
}
