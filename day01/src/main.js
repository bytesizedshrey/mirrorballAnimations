import gsap from 'gsap'
import './style.css'

const box = document.querySelector('.box')


// gsap.from('.box',{
//   delay : 0.3,
//   x : 450,
//   duration : 2
// })

// gsap.to('.box',{
//   delay : 3,
//   x : 600,
//   y : 800,
//   duration : 3,
// })

//fromTo
gsap.fromTo(".box",{
  x : 0,
},{
  delay : 0.9,
  duration : 1,
  x : 550,
  y : 550
})
 

