import { useControls } from 'leva'
import React from 'react'

const Experience = () => {
   const {x,y} = useControls("Box Position",{
        x: {value : 0, min:-4,max:4, step: 0.01,label : "X - Position"},
        y: {value : 0, min:-4,max:4, step: 0.01,label : "Y - Position"}
    })
  return (
   <>
   <mesh position={[x,y,0]}>
    <boxGeometry/>
    <meshBasicMaterial color={'blue'}/>
   </mesh>
   </>
  )
}

export default Experience