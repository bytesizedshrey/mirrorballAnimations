import './style.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

gsap.set('.imageDiv',{
  scale : 0.3
})

gsap.set('.content',{
  gap : '51rem'
})

const t1 = gsap.timeline({
  scrollTrigger:{
    trigger : '.page2',
    start : "top top",
    end : "top -100%",
    scrub : 4,
    pin : true,
    // onEnter : () => {},
    // onLeave : ()=>{},
    // onUpdate : () => {},
    // onEnterBack : () => {},
    // onLeaveBack : () => {}
    } 
})

t1.to('.imageDiv',{
  scale : 1,
  // x : 1200,
  // duration : 5,
  ease : "power4.out",
  // yoyo : true,
  // delay : 1.9,
})
// .to(".content",{
//   gap : "2rem",
// },"<",
// )