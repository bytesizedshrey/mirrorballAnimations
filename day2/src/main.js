import gsap from 'gsap'
import './style.css'

gsap.to('.box',{
  x : 900,
  duration : 1.5,
  delay : 0.6,
  ease: "sine.in",
  repeat: 3,
  yoyo: true
})

