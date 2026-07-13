"use client"
import TextReveal from "@/components/TextReveal";
import { useRef } from "react";

export default function Home() {
  const triggerRef = useRef(null)

  const handleHoverEnter = () => {
    triggerRef.current?.play()
  }
  const handleHoverLeave = () => {
    triggerRef.current?.reverse()
  }

  return(
  <main className="bg-black h-[300vh] w-full">
    <div 
    onPointerEnter={handleHoverEnter} 
    onPointerLeave={handleHoverLeave} 
    className="h-[12rem] w-[12rem] bg-red-950">
    </div>

     <TextReveal ref={triggerRef} splitBy="chars" trigger="scroll" className='text-[6rem] text-white'>
      Hello Monza
     </TextReveal>
    </main>
  );
}
