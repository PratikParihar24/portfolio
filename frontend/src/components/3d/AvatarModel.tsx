import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../../store/useAppStore'
// @ts-ignore
import avatarPath from '../../assets/avatar.glb?url'

export default function AvatarModel() {
  const group = useRef<THREE.Group>(null)
  const activeContext = useAppStore(state => state.activeContext)
  
  const isTouchDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches)

  // Load the real glTF model
  const { scene } = useGLTF(avatarPath)

  useFrame((state) => {
    if (!group.current) return

    // 1. Idle animation (breathing/floating)
    const time = state.clock.getElapsedTime()
    // Smooth vertical sine wave for floating
    group.current.position.y = Math.sin(time * 2) * 0.1

    // 2. Mouse tracking (pivoting the entire model as there's no independent head bone)
    if (!isTouchDevice.current) {
      // Clamped rotation to ±45° (PI/4) horizontally and ±30° (PI/6) vertically
      const targetX = (state.pointer.x * Math.PI) / 4
      const targetY = (state.pointer.y * Math.PI) / 6
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.05)
    }
    
    // Optional: add a slight tilt based on the context being active
    if (activeContext) {
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0.1, 0.05)
    } else {
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, 0.05)
    }
  })

  return (
    <group ref={group} dispose={null}>
      {/* 
        Scaling and positioning the model so it sits correctly in the viewport. 
        You may need to tweak scale/position based on the model's native size.
      */}
      <primitive object={scene} scale={1.2} position={[0, -0.5, 0]} />
    </group>
  )
}

// Preload the model so it's ready quickly
useGLTF.preload(avatarPath)
