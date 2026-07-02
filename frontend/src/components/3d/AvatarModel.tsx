import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '../../store/useAppStore'

export default function AvatarModel() {
  const group = useRef<THREE.Group>(null)
  const activeContext = useAppStore(state => state.activeContext)
  
  useFrame((state) => {
    if (!group.current) return

    // 1. Idle animation (breathing/floating)
    const time = state.clock.getElapsedTime()
    // Smooth vertical sine wave for floating
    group.current.position.y = Math.sin(time * 2) * 0.1

    // 2. Mouse tracking
    // Map normalized pointer coordinates (-1 to 1) to a target rotation
    const targetX = (state.pointer.x * Math.PI) / 4
    const targetY = (state.pointer.y * Math.PI) / 6

    // Smoothly interpolate current rotation towards target rotation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05)
    
    // Optional: add a slight tilt based on the context being active
    if (activeContext) {
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0.1, 0.05)
    } else {
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, 0.05)
    }
  })

  return (
    <group ref={group}>
      {/* Placeholder geometric bust */}
      
      {/* Head/Body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.5, 1, 4, 16]} />
        <meshStandardMaterial color="#22C55E" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* "Eyes" to make the tracking direction obvious */}
      <mesh position={[0.2, 0.5, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.2, 0.5, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}
