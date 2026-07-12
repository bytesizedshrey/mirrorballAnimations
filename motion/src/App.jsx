import { motion, scale } from 'motion/react'
import React from 'react'

const App = () => {
  return (
    <div>
      <div className="page"></div>
    <motion.div 
    initial={{opacity : 0,scale : 0.7}}
    transition={{duration:1.2, ease: 'easeInOut'}}
    // animate={{x : 500, opacity: 0.3}} 
    // whileHover={{scale: 1.5}} 
    // whileTap={{scale:0.4}}
    viewport={{once:false, amount: 1}}
    whileInView={{opacity:1,scale:1}}
    className='box'>
    </motion.div>
    <div className="page"></div>
    </div>
  )
}

export default App