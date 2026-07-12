import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from 'gsap'


const AnimateOnX = ({children}) => {
    const containerRef = useRef(null)
    useGSAP(() => {
        gsap.to(containerRef.current,{
            x : 700,
            duration : 1,
            delay : 0.5,
        })
    })
  return (
    <div ref={containerRef}>
        {children}
    </div>
  )
}

export default AnimateOnX