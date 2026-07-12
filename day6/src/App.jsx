import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from 'gsap'

const App = () => {
  const boxRef = useRef(null)
  const containerRef = useRef(null)

  const {contextSafe} = useGSAP(()=>{
    gsap.to(boxRef.current,{
      x : 700,
      duration : 2,
      delay : 0.5,
    })
  },{scope : containerRef.current, 
    dependencies: [],
    revertOnUpdate: true
  })

  return (
    <div ref={containerRef}>
    <div ref={boxRef} className='box'></div>
    <button onClick={contextSafe(()=>{
      gsap.to()
    })}>click me</button>
    </div>
  )
}

export default App