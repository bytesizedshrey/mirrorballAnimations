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


//timeline

const tl = gsap.timeline( )

tl.to('.box1',{
  // yPercent : 100,
  x : 121,
  // opacity: 0, 
  duration : 2,
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
}).to('.box3', {
  x : 120,
  duration : 2,
  ease : "power4.out",
  // delay : 1.9
}).to('.box4', {
  x : 120,
  duration : 2,
  ease : "power4.out",
  // delay : 1.9
}).to('.box5', {
  x : 120,
  duration : 2,
  ease : "power4.out",
  // delay : 1.9
})
