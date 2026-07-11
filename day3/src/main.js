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

gsap.from('h1 span',{
  yPercent : 100,
  opacity: 0, 
  duration : 5,
  ease: 'expo.out',
  stagger : {
    each : 0.08,
    from : 'random'
  }
})

