import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, RoundedBox, Box, Float, Trail } from '@react-three/drei'
import * as THREE from 'three'

export default function AvatarModel({ isMobile }: { isMobile?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const eyeLeft = useRef<THREE.Mesh>(null)
  const eyeRight = useRef<THREE.Mesh>(null)
  
  const isTouchDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)
  
  const targetPos = useRef(new THREE.Vector3(2.5, -1.5, -0.5))
  const moveTimer = useRef(0)

  // Safe coordinates to roam (keeps it strictly on the right side to avoid colliding with text)
  const safeSpots = [
    [2.8, -1.5, -0.5],   // Bottom right
    [3.2, -0.5, -0.5],   // Mid right (lower)
    [3.0, 1.2, -0.5],    // Top right (far right)
    [2.6, 0.5, -0.5],    // Mid right (upper)
  ]

  useFrame((state, delta) => {
    if (!group.current) return

    // 1. Wandering Logic
    moveTimer.current -= delta
    if (moveTimer.current <= 0) {
      // Pick a new random spot from the edges
      const spot = safeSpots[Math.floor(Math.random() * safeSpots.length)]
      
      // On mobile, keep it strictly at the bottom or top so it doesn't block vertical scrolling text
      if (isMobile) {
        // Keeping it lower on mobile
        targetPos.current.set(Math.random() > 0.5 ? 1.5 : -1.5, -3.5, -0.5)
      } else {
        targetPos.current.set(spot[0], spot[1], spot[2])
      }
      
      // Wait 4-8 seconds before moving again
      moveTimer.current = 4 + Math.random() * 4
    }

    // Smoothly glide to the target position
    group.current.position.lerp(targetPos.current, 0.02)

    // 2. Cursor Tracking / Look at
    if (!isTouchDevice.current) {
      // Body rotation follows cursor slightly
      const targetX = (state.pointer.x * Math.PI) / 4
      const targetY = (state.pointer.y * Math.PI) / 6
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.08)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.08)
    }

    // Cute blinking logic
    if (eyeLeft.current && eyeRight.current) {
      if (Math.random() > 0.99) { // 1% chance to blink each frame
        eyeLeft.current.scale.y = 0.1
        eyeRight.current.scale.y = 0.1
      } else {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, 1, 0.2)
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, 1, 0.2)
      }
    }
  })

  return (
    <group ref={group} dispose={null} scale={isMobile ? 0.8 : 1}>
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Trail width={0.5} length={4} color={new THREE.Color(0x00E5FF)} attenuation={(t) => t * t}>
          <group position={[0, 0, 0]}>
            {/* Main Body (Cute squishy sphere) */}
            <Sphere args={[0.4, 32, 32]}>
              <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </Sphere>

            {/* Glowing Antenna */}
            <Box args={[0.02, 0.3, 0.02]} position={[0, 0.45, 0]}>
              <meshStandardMaterial color="#cccccc" />
            </Box>
            <Sphere args={[0.08, 16, 16]} position={[0, 0.6, 0]}>
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} toneMapped={false} />
            </Sphere>

            {/* Visor / Face plate */}
            <RoundedBox args={[0.6, 0.25, 0.3]} position={[0, 0.05, 0.3]} radius={0.1}>
              <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
            </RoundedBox>

            {/* Cute Glowing Eyes */}
            <Sphere ref={eyeLeft} args={[0.05, 16, 16]} position={[-0.15, 0.05, 0.46]}>
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </Sphere>
            <Sphere ref={eyeRight} args={[0.05, 16, 16]} position={[0.15, 0.05, 0.46]}>
              <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
            </Sphere>

            {/* Little floating hands */}
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
