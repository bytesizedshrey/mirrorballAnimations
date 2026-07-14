import gsap from "gsap";
import { useRef } from "react";
import TextReveal from "./TextReveal";

const CARD_WIDTH = 400;
const CARD_HEIGHT = 520;
const SCALE = 1.35;

const CarouselCard = ({ project, onHoverStart, onHoverEnd }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  //enter
  const onEnter = ()=>{
    onHoverStart?.()


    gsap.to(imgRef.current,{
        width : CARD_WIDTH * SCALE, 
        height : CARD_HEIGHT * SCALE,
        duration : 0.45,
        ease : 'power3.out'
    })

    numberRef.current?.play()
    titleRef.current?.play()
  }

  //leave
  const onLeave = ()=>{
    onHoverEnd?.()

    gsap.to(imgRef.current,{
        width : CARD_WIDTH, 
        height : CARD_HEIGHT,
        duration : 0.24,
        ease : 'power3.out'
    })

    numberRef.current?.reverse()
    titleRef.current?.reverse()
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        flexShrink: 0,
        overflow: "visible",
        cursor: "pointer",
      }}

      className="relative"
    >
      <div
        style={{ bottom: "calc(100% + 3rem)" }}
        className="titlePanel absolute left-0 pointer-events-none flex flex-col gap-[1rem]"
      >
        <TextReveal ref={numberRef} trigger="manual" splitBy="chars">
          <h3 className="text-[1rem] text-[#010101]">{project.number}</h3>
        </TextReveal>

        <TextReveal ref={titleRef} trigger="manual" splitBy="words">
          <h3 className="text-[1rem] text-[#010101]">{project.title}</h3>
        </TextReveal>
      </div>

      <div className="imageDiv absolute h-full w-full overflow-hidden">
        <img
          style={{ transformOrigin: "center center", userSelect: "none" }}
          className="h-full w-full object-cover"
          ref={imgRef}
          src={project.coverImage}
          alt={project.title}
        />
      </div>
    </div>
  );
};

export default CarouselCard;
