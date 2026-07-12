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
  trigger : '.box',
  start : "top 30%",
  end : "top 10%",
  scrub : true
  } 
})