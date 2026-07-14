import React from 'react'
import TextReveal from './TextReveal'

const Navbar = () => {
  return (
    <div className='fixed z-[30] top-0 left-0 h-[8vh] flex items-center justify-between w-full px-[3rem]'>
        <div className="leftNameSide">
            <TextReveal>
                <h3 className='text-[1.2rem]'>Shreyash Gajbhiye</h3>
            </TextReveal>
        </div>
        <div className="rightLinkSide flex gap-[1.45rem]">
            <TextReveal>
                <h3 className='text-[1.1rem]'>Home</h3>
            </TextReveal>
            <TextReveal>
                <h3 className='text-[1.01rem]'>About</h3>
            </TextReveal>
            <TextReveal>
                <h3 className='text-[1.1rem]'>Contact</h3>
            </TextReveal>
        </div>
    </div>
  )
}

export default Navbar