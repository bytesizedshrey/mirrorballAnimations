"use client"
import gsap from "gsap"
import { ScrollTrigger,SplitText,useGSAP } from "@/libs/gsap"
import { forwardRef, useRef } from "react"


const TextReveal = forwardRef(({
    children,
    className = '',
    trigger = 'mount',
    scrollStart = 'top 75%',
    splitBy = 'lines',
    duration = 0.67,
    stagger = '0.85',
    delay = 0,
    ease = 'power3.out',
},ref) => {
    const wrapperRef = useRef(null)
    const splitRef = useRef(null)
    const tlRef = useRef(null)
    //will get text splitted
    useGSAP(()=>{
        splitRef.current = new SplitText(wrapperRef.current,{
            type : splitBy,
            lineThreshold: 0.3,
        })
        const elements = splitRef.current[splitBy];

        gsap.set(elements,{
            yPercent : 110,
        })
        //initialy it will be paused
        tlRef.current = gsap.timeline({
            defaults: {delay, paused : true},
        })
        //current state to final state of text(aka split text)
        tlRef.current.to(elements,{
            yPercent : 0,
            opacity: 1,
            duration,
            ease,
            stagger: {
                each : stagger,
                from : "start"
            }
        })

        if(trigger === 'mount'){
            tlRef.current.play()
        }

        if(trigger === 'mount'){
            ScrollTrigger.create({
                trigger : wrapperRef.current,
                start : scrollStart,
                once : true,
                onEnter : ()=> tlRef.current?.play()
            })
        }

        return () =>{
            tlRef.current?.kill();
            splitRef.current?.revert();
        }

    },{
        scope : wrapperRef,
        dependencies : [splitBy,trigger,stagger,duration]
    })
    return (
      <div ref={wrapperRef} className={`overflow-hidden ${className}`}>{children}</div>
    )
  })

export default TextReveal