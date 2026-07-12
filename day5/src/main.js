import './style.css'
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const split = new SplitText('.title h1',{
  type : "chars,words,lines",
  wordsClass : 'titleWord',
  charsClass: 'titleChars'
})

gsap.from(split.chars,{
  yPercent : 100,
  opacity : 0,
  duration : 1.2,
  ease : 'expo.out',
  stagger: {
    each : 0.06,
    from : 'random'
  }
})