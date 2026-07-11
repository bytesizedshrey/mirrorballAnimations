import gsap from 'gsap'
import './style.css'

gsap.to('.box',{
  x : 500,
  duration : 1.3,
  ease : 'power4.out',
  delay : 1.6,
  stagger : -0.2,
  yoyo : true,
  repeat : -1
})

