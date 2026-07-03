import { Canvas, useThree } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import LightingRig from './LightingRig'
import AvatarModel from './AvatarModel'
import { useEffect, useRef, useState, Suspense } from 'react'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-4 border-t-accent border-r-transparent border-b-accent/30 border-l-transparent animate-spin mb-3 shadow-[0_0_15px_rgba(34,197,94,0.3)]"></div>
        <span className="text-xs font-bold text-accent font-mono tracking-widest">{Math.round(progress)}%</span>
      </div>
    </Html>
  )
}

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
          <Suspense fallback={<Loader />}>
            <AvatarContainer />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
