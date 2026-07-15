import React from 'react'

const Experience = () => {
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
    <mesh>
        <boxGeometry />
        {/* <torusGeometry args={[1, 5, 32 ]} /> */}
        <meshBasicMaterial color={'blue'}/>
      </mesh>
    </>
  )
}

export default Experience