import React from 'react'
import Experience from './components/Experience'
import { Canvas } from '@react-three/fiber'

const App = () => {
  return (
    <div className='parent'>
      <Canvas>
        <Experience/>
      </Canvas>
    </div>
  )
}

export default App