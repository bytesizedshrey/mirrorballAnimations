import { useGLTF, Environment, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useEffect } from 'react'

const Experience = () => {
    const carRef = useRef()
    const wheelsRef = useRef([])
    const steeringRef = useRef()

    const { scene } = useGLTF('./ferrari.glb')

    useEffect(() => {
      if (scene) {
        const wheels = []
        scene.traverse((child) => {
          if (child.isMesh || child.isGroup) {
            // Find all wheel nodes
            if (child.name.startsWith('wheel_')) {
              wheels.push(child)
            }
            // Find steering wheel node
            if (child.name === 'steering_wheel') {
              steeringRef.current = child
            }
          }
        })
        wheelsRef.current = wheels
      }
    }, [scene])

    useFrame((state, delta) => {
      const time = state.clock.getElapsedTime()
      
      // Rotate the entire car slowly for a showcase effect
      if (carRef.current) {
        carRef.current.rotation.y += delta * 0.15
        
        // Subtle floating animation to simulate active suspension
        carRef.current.position.y = Math.sin(time * 1.5) * 0.05
      }

      // Rotate wheels to simulate driving
      wheelsRef.current.forEach((wheel) => {
        wheel.rotation.x += delta * 4
      })

      // Turn the steering wheel left and right
      if (steeringRef.current) {
        // Adjust the rotation axis depending on model setup, local y is common
        steeringRef.current.rotation.y = Math.sin(time * 2) * 0.5
      }
    })
    
  return (
    <>
      {/* Premium studio environment lighting & reflections */}
      <Environment preset="city" />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 15, 5]} intensity={1.5} />
      <directionalLight position={[-5, 15, -5]} intensity={0.5} />

      <group ref={carRef}>
        <primitive object={scene} />
      </group>

      {/* Realistic floor shadow beneath the car */}
      <ContactShadows 
        position={[0, -0.01, 0]} 
        opacity={0.8} 
        scale={12} 
        blur={2.5} 
        far={2} 
      />
    </>
  )
}

export default Experience