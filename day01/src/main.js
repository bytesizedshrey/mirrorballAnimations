import gsap from 'gsap'
import './style.css'

const box = document.querySelector('.box')


gsap.from('.box',{
  delay : 0.3,
  x : 450,
  duration : 2
})

gsap.to('.box',{
  delay : 3,
  x : 600,
  y : 800,
  duration : 3,
})

