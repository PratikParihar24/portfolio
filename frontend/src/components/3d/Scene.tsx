import { Canvas } from '@react-three/fiber'
import { Html, useProgress } from '@react-three/drei'
import LightingRig from './LightingRig'
import AvatarModel from './AvatarModel'
import { useEffect, useRef, useState, Suspense } from 'react'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 rounded-full border-3 border-t-accent border-r-transparent border-b-accent/30 border-l-transparent animate-spin mb-2"></div>
        <span className="text-[10px] font-bold text-accent font-mono tracking-widest">{Math.round(progress)}%</span>
      </div>
    </Html>
  )
}

function AvatarContainer() {
  return (
    <group scale={1}>
      <AvatarModel />
    </group>
  )
}

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [isMobileScreen, setIsMobileScreen] = useState(false)

  useEffect(() => {
    // Check if on a mobile/narrow screen (< 768px)
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    const timer = setTimeout(() => setReady(true), 150)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Do not render Three.js canvas on mobile devices to save battery, memory, and avoid cluttering screen
  if (isMobileScreen) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 15 }}
    >
      {ready && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
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
