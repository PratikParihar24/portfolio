import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, RoundedBox, Box, Float, Trail } from '@react-three/drei'
import * as THREE from 'three'

export default function AvatarModel({ isMobile }: { isMobile?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const eyeLeft = useRef<THREE.Mesh>(null)
  const eyeRight = useRef<THREE.Mesh>(null)
  
  const isTouchDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)
  
  // Starting position in safe right periphery
  const targetPos = useRef(new THREE.Vector3(2.5, -1.0, -0.3))
  const moveTimer = useRef(0)

  // Safe wandering zones: roams around the margins/edges without blocking center cards or action buttons
  const safeSpots = [
    [2.4, -0.9, -0.2],   // Mid-lower right margin
    [2.7, 0.4, -0.3],    // Upper right margin
    [2.3, 1.3, -0.2],    // Top right header corner
    [2.6, -1.5, -0.3],   // Bottom right above buttons
    [-2.6, 1.2, -0.4],   // Top left margin (away from content)
    [2.8, -0.2, -0.2],   // Mid right outer
  ]

  useFrame((state, delta) => {
    if (!group.current) return

    // 1. Lively wandering logic
    moveTimer.current -= delta
    if (moveTimer.current <= 0) {
      const spot = safeSpots[Math.floor(Math.random() * safeSpots.length)]
      
      if (isMobile) {
        targetPos.current.set(Math.random() > 0.5 ? 1.4 : -1.4, -3.2, -0.5)
      } else {
        targetPos.current.set(spot[0], spot[1], spot[2])
      }
      
      // Wander to a new spot every 3 to 6 seconds
      moveTimer.current = 3.5 + Math.random() * 2.5
    }

    // Smooth active glide
    group.current.position.lerp(targetPos.current, 0.035)

    // 2. Cursor tracking: eyes and body follow cursor actively
    if (!isTouchDevice.current) {
      const targetX = (state.pointer.x * Math.PI) / 4.5
      const targetY = (state.pointer.y * Math.PI) / 6
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.08)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.08)
    }

    // Blinking animation
    if (eyeLeft.current && eyeRight.current) {
      if (Math.random() > 0.985) {
        eyeLeft.current.scale.y = 0.1
        eyeRight.current.scale.y = 0.1
      } else {
        eyeLeft.current.scale.y = THREE.MathUtils.lerp(eyeLeft.current.scale.y, 1, 0.25)
        eyeRight.current.scale.y = THREE.MathUtils.lerp(eyeRight.current.scale.y, 1, 0.25)
      }
    }
  })

  return (
    <group ref={group} dispose={null} scale={isMobile ? 0.75 : 0.95}>
      <Float speed={2.5} rotationIntensity={0.25} floatIntensity={0.6}>
        <Trail width={0.45} length={4} color={new THREE.Color(0x22C55E)} attenuation={(t) => t * t}>
          <group position={[0, 0, 0]}>
            {/* Main Body */}
            <Sphere args={[0.4, 28, 28]}>
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
