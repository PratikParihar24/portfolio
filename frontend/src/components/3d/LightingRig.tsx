import { Environment, ContactShadows } from '@react-three/drei'

export default function LightingRig() {
  return (
    <>
      {/* 
        HDRI Environment for realistic ambient lighting and reflections 
        preset 'city' gives a nice neutral/bright outdoor-studio feel 
      */}
      <Environment preset="city" />
      
      {/* Key light */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={1024} 
      />
      
      {/* Fill light */}
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.5} 
        color="#7AE5D0" 
      />

      {/* Soft shadow catcher on the floor */}
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2} 
        far={4} 
      />
    </>
  )
}
