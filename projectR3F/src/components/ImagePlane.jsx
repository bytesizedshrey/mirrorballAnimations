import { useTexture } from '@react-three/drei'
import React, { useMemo } from 'react'
import * as THREE from 'three'

const ImagePlane = ({url,position,rotation,planeWidth,planeHeight}) => {
    const texture = useTexture(url)
    //only changes when dependencies does
    const geometry = useMemo(()=>{
        //to change default origin 
        const geo = new THREE.PlaneGeometry(planeWidth, planeHeight)
        //change transform origin
        geo.translate(0,planeHeight / 2,0)
        return geo
    },[planeHeight,planeWidth])
  return (
    <mesh position={position} rotation={rotation} geometry={geometry}>
        <meshStandardMaterial map={texture} side={THREE.DoubleSide}/>
    </mesh>
  )
}

export default ImagePlane