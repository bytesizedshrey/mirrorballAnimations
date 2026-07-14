"use client"
import gsap from "gsap"
import { ScrollTrigger,SplitText,useGSAP } from "@/libs/gsap"
import { forwardRef, useImperativeHandle, useRef } from "react"


const TextReveal = forwardRef(({
    children,
    className = 'inline-block',
    trigger = 'mount',
    scrollStart = 'top 75%',
    splitBy = 'lines',
    duration = 1,
    stagger = '0.85',
    delay = 0,
    ease = 'power3.out',
},ref) => {
    const wrapperRef = useRef(null)
    const splitRef = useRef(null)
    const tlRef = useRef(null)


    useImperativeHandle(ref, () => ({
        play : () => tlRef.current?.play(),
        reverse: () => tlRef.current?.reverse(),
        reset : () => tlRef.current?.pause(0),
    }))

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
            paused : true,
            defaults: {delay}
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

        if(trigger === 'scroll'){
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
      <div ref={wrapperRef} className={`overflow-hidden inline-block ${className}`}>{children}</div>
    )
  })

export default TextReveal