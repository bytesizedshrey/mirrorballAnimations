import gsap from 'gsap'
import './style.css'

// gsap.set('.box',{
//   x : -300,
// })

// gsap.to('.box',{
//   x : 1500,
//   duration : 1.5,
//   delay : 0.6,
//   ease: "sine.in",
//   repeat: -1,
//   // yoyo: true
// })

//callback functions

gsap.to('.box',{
  x : 500,
  duration : 1.4,
  delay : 1,
  ease : 'power2.inOut',

  onStart : () =>{
    console.log('animation has started...')
  },

  onComplete : () => {
    console.log('animation has been completed...')
  },

  onUpdate : ()=>{
    console.log('animation has been updated...')
  }
})



