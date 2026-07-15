import { useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three'

const Experience = () => {
    const cubeRef = useRef(null)
    useFrame((state,delta)=>{
      cubeRef.current.rotation.y += delta
    })
    const {texture,texture2} = useTexture({
        texture : "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         texture2 : "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    })
    
    // const texture = useLoader(THREE.TextureLoader,"https://images.unsplash.com/photo-1587204714992-2c93329aaa3a?q=80&w=969&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
  return (
    <>
    {/* <group position={[0,2,0]}>
    <mesh position={[2,0,0]}>
        <boxGeometry />
        {/* <torusGeometry args={[1, 5, 32 ]} /> */}
        {/* <meshBasicMaterial color={'blue'}/>
      </mesh> */}

      {/* <mesh position={[-2,0,0]}>
        <boxGeometry/> */}
        {/* <torusGeometry args={[1, 5, 32 ]} /> */}
        {/* <meshBasicMaterial color={'red'}/>
      </mesh>
    </group> */} */
    <mesh ref={cubeRef}>
        <boxGeometry />
        {/* <torusGeometry args={[1, 5, 32 ]} /> */}
        <meshBasicMaterial map={texture2}/>
      </mesh>
    </>
  )
}

export default Experience