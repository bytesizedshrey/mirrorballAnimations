import { motion, scale } from 'motion/react'
import React from 'react'

const App = () => {
  const boxVarient = {
    hidden : {
      opacity : 0
    },
    visible:{
      opacity : 1,
      x : 500
    }
  }
  return (
    <div>
    <motion.div 
    variants={boxVarient}
    initial="hidden"
    transition={{duration:1.2, ease: 'easeInOut'}}
    animate="visible"
    // whileHover={{scale: 1.5}} 
    // whileTap={{scale:0.4}}
    // viewport={{once:false, amount: 1}}
    // whileInView={{opacity:1,scale:1}}
    className='box'>
    </motion.div>
    </div>
  )
}

export default App