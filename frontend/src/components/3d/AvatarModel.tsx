import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, RoundedBox, Box, Float, Trail } from '@react-three/drei'
import * as THREE from 'three'

export default function AvatarModel({ isMobile }: { isMobile?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const eyeLeft = useRef<THREE.Mesh>(null)
  const eyeRight = useRef<THREE.Mesh>(null)
  
  const isTouchDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)
  
  // Safe perimeter far to the right, floating gently out of the way of central reading cards and CTAs
  const targetPos = useRef(new THREE.Vector3(3.6, -1.8, -1.0))
  const moveTimer = useRef(0)

  // Safe coordinates strictly bounded to outer peripheral zones
  const safeSpots = [
    [3.6, -1.8, -1.0],   // Lower right peripheral
    [3.8, -0.6, -1.0],   // Mid right outer
    [3.5, 1.4, -1.0],    // Top right outer corner
    [3.7, 0.4, -1.0],    // Upper right
  ]

  useFrame((state, delta) => {
    if (!group.current) return

    // 1. Slow, subtle perimeter wandering
    moveTimer.current -= delta
    if (moveTimer.current <= 0) {
      const spot = safeSpots[Math.floor(Math.random() * safeSpots.length)]
      
      if (isMobile) {
        // Keep well below view on mobile so it never covers buttons
        targetPos.current.set(1.8, -4.5, -1.5)
      } else {
        targetPos.current.set(spot[0], spot[1], spot[2])
      }
      
      // Wander leisurely every 6-10 seconds
      moveTimer.current = 6 + Math.random() * 4
    }

    // Gentle lerp glide
    group.current.position.lerp(targetPos.current, 0.015)

    // 2. Head follows cursor, but restrained so it doesn't whip around
    if (!isTouchDevice.current) {
      const targetX = (state.pointer.x * Math.PI) / 8
      const targetY = (state.pointer.y * Math.PI) / 10
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05)
    }

    // Gentle blink
    if (eyeLeft.current && eyeRight.current) {
      if (Math.random() > 0.992) {
        eyeLeft.current.scale.y = 0.1
        eyeRight.current.scale.y = 0.1
      } else {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, 1, 0.2)
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, 1, 0.2)
      }
    }
  })

  return (
    <group ref={group} dispose={null} scale={isMobile ? 0.65 : 0.85}>
      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.35}>
        <Trail width={0.35} length={3} color={new THREE.Color(0x22C55E)} attenuation={(t) => t * t}>
          <group position={[0, 0, 0]}>
            {/* Main Body */}
            <Sphere args={[0.4, 24, 24]}>
              <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </Sphere>

            {/* Glowing Antenna */}
            <Box args={[0.02, 0.3, 0.02]} position={[0, 0.45, 0]}>
              <meshStandardMaterial color="#cccccc" />
            </Box>
            <Sphere args={[0.08, 16, 16]} position={[0, 0.6, 0]}>
              <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={2} toneMapped={false} />
            </Sphere>

            {/* Visor / Face plate */}
            <RoundedBox args={[0.6, 0.25, 0.3]} position={[0, 0.05, 0.3]} radius={0.1}>
              <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
            </RoundedBox>

            {/* Glowing Eyes */}
            <Sphere ref={eyeLeft} args={[0.05, 16, 16]} position={[-0.15, 0.05, 0.46]}>
              <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={2} />
            </Sphere>
            <Sphere ref={eyeRight} args={[0.05, 16, 16]} position={[0.15, 0.05, 0.46]}>
              <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={2} />
            </Sphere>

            {/* Floating hands */}
            <Sphere args={[0.1, 16, 16]} position={[-0.5, -0.1, 0]}>
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </Sphere>
            <Sphere args={[0.1, 16, 16]} position={[0.5, -0.1, 0]}>
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </Sphere>
          </group>
        </Trail>
      </Float>
    </group>
  )
}
