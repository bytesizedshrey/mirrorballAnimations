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
          // Adjust materials to make the car look hyper-realistic, metallic, and polished
          if (child.isMesh) {
            const material = child.material
            if (material) {
              const name = material.name.toLowerCase()

              if (name.includes('body_color') || name.includes('dodgerblue') || name.includes('yellow')) {
                // Highly reflective metallic car paint
                material.metalness = 0.95
                material.roughness = 0.08
                if (material.clearcoat !== undefined) {
                  material.clearcoat = 1.0
                  material.clearcoatRoughness = 0.03
                }
              } else if (name.includes('chrome')) {
                // Polished mirror-like chrome
                material.metalness = 1.0
                material.roughness = 0.03
              } else if (name.includes('metal')) {
                // Standard structural metals (brakes, rims, etc.)
                material.metalness = 0.9
                material.roughness = 0.15
              } else if (name.includes('tires')) {
                // Matte rubber tires
                material.metalness = 0.0
                material.roughness = 0.8
              } else if (name.includes('leather')) {
                // Soft leather interior
                material.metalness = 0.0
                material.roughness = 0.65
              } else if (name.includes('glass')) {
                // Transparent, reflective glass
                material.metalness = 0.1
                material.roughness = 0.01
                material.transparent = true
                material.opacity = 0.3
              } else if (name.includes('plastic')) {
                // Satin trim plastics
                material.metalness = 0.1
                material.roughness = 0.5
              }
            }
          }

          // Find the 4 main wheel groups (wheel_rr, wheel_rl, wheel_fl, wheel_fr)
          if (child.name.startsWith('wheel_')) {
            // Gather all components of the wheel (rim, tire, nuts, etc.) except the stationary brake caliper
            child.children.forEach((subChild) => {
              if (subChild.name !== 'brake') {
                wheels.push(subChild)
              }
            })
          }
          // Find steering wheel node
          if (child.name === 'steering_wheel') {
            steeringRef.current = child
          }
        })
        wheelsRef.current = wheels
        console.log("Experience loaded - Wheels found:", wheels.map(w => `${w.parent.name} -> ${w.name}`))
        if (steeringRef.current) {
          console.log("Experience loaded - Steering wheel found:", steeringRef.current.name)
        }
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

      // Rotate wheels to simulate driving (spinning only the tire/rim components, leaving brake calipers stationary)
      wheelsRef.current.forEach((wheelComponent) => {
        wheelComponent.rotation.x += delta * 6
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