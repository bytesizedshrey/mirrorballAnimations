import { motion } from 'motion/react'
import React from 'react'

const App = () => {
  return (
    <motion.div transition={{duration:2, delay:1}} animate={{x : 500}} className='box'></motion.div>
  )
}

export default App