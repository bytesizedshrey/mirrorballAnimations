import './style.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

gsap.to('.box',{
  x : 1200,
  // duration : 5,
  ease : "power4.out",
  yoyo : true,
  // delay : 1.9,
  scrollTrigger:{
  trigger : '.page2',
  start : "top top",
  end : "top -40%",
  scrub : 4,
  pin : true
  } 
})