import gsap from 'gsap'
import './style.css'

// gsap.to('.box',{
//   x : 500,
//   duration : 1.3,
//   ease : 'power4.out',
//   delay : 1.6,
//   stagger : {
//     each : 0.1,
//     from: 'random'
//   },
//   yoyo : true,
//   repeat : -1
// })

const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const restart = document.querySelector('.restart')
const reverse = document.querySelector('.reverse')
const seek = document.querySelector('.seek')

//timeline

const tl = gsap.timeline( {paused : true} )

tl.to('.box1',{
  // yPercent : 100,
  x : 121,
  // opacity: 0, 
  duration : 1,
  ease: 'power4.out',
  // stagger : {
  //   each : 0.08,
  //   from : 'random'
  // }
}).to('.box2', {
  x : 120,
  duration : 2,
  ease : "power4.out",
  // delay : 1.9
},"ferrari").to('.box3', {
  x : 120,
  duration : 2,
  ease : "power4.out",
  // delay : 1.9
}).to('.box4', {
  x : 120,
  duration : 2,
  ease : "power4.out",
  // delay : 1.9
},"ferrari+=0.2",).to('.box5', {
  x : 120,
  duration : 2,
  ease : "power4.out",
  // delay : 1.9
})


play.addEventListener('click',()=>{
  tl.play()
})
pause.addEventListener('click',()=>{
  tl.pause()
})
restart.addEventListener('click',()=>{
  tl.restart()
})
reverse.addEventListener('click',()=>{
  tl.reverse() 
})
seek.addEventListener('click',()=>{
  tl.seek(1.75)
})