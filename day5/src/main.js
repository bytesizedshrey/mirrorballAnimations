import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";


import './style.css'

gsap.registerPlugin(Draggable,InertiaPlugin,Flip);
gsap.registerPlugin(SplitText);

// const split = new SplitText('.title h1',{
//   type : "chars,words,lines",
//   wordsClass : 'titleWord',
//   charsClass: 'titleChars'
// })

// gsap.from(split.chars,{
//   yPercent : 100,
//   opacity : 0,
//   duration : 1.2,
//   ease : 'expo.out',
//   stagger: {
//     each : 0.06,
//     from : 'random'
//   }
// })

// Draggable.create(".box",{
//   bounds: "#app",
//   inertia: true,
//   dragResistance : 0.2,
// })

const img = document.querySelector('.specialImage')
const img2 = document.querySelector('.specialImage2')

img.addEventListener("click",()=>{
  const state = Flip.getState(img)
  const state2 = Flip.getState(img2)

  document.querySelector('.imageGallery').appendChild(img2)
  document.querySelector('.imageShow').appendChild(img)

  Flip.from(state,{
    duration : 2,
    ease : 'Power3.inOut',
    absolute : true,
    scale : true
  })
  Flip.from(state2,{
    duration : 2,
    ease : 'Power3.inOut',
    absolute : true,
    scale : true
  })
})