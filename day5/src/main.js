import './style.css'
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const split = new SplitText('.title h1',{
  type : "chars,words,lines"
})

gsap.from(split.lines,{
  yPercent : 100,
  opacity : 0,
  duration : 1.2,
  ease : 'expo.out',
  stagger: {
    each : 1,
    from : 'start'
  }
})