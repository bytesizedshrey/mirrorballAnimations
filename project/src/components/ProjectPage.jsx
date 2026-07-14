"use client";
import gsap, { ScrollTrigger } from "@/libs/gsap";
import { useGSAP } from "@/libs/gsap";
import TextReveal from "./TextReveal";
import { useRef } from "react";

const ProjectPage = ({ project }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  useGSAP(
    () => {
      if (!project) return;
      const sections = gsap.utils.toArray('section')

      gsap.to(imageRef.current, {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        delay: 0.9,
      });
      sections.forEach((section, idx) => {
        const container = section.children[0];

        gsap.to(container, {
          rotate: 0,
          ease : 'none',
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });
        if(idx == sections.length-1) return;

        ScrollTrigger.create({
            trigger : section,
            start : 'bottom bottom',
            end : "bottom top", //nikla paucha
            pin : true,
            pinSpacing: false
        })
      });
    },
    { scope: containerRef },
  );

  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl">Project not found</h1>
      </div>
    );
  }

  return (
    <>
      <main ref={containerRef}>
        <section className="h-screen w-full">
          <div style={{transformOrigin: 'bottom left'}} className="sectionContainer h-full w-full flex  pt-[7rem] pb-[4rem] px-[3rem]">
            <div className="firstSegment h-full w-[10%]">
              <TextReveal>
                <h3 className="text-[2rem]">{project.number}</h3>
              </TextReveal>
            </div>
            <div className="secondSegment h-[85%] w-[30%]">
              <div className="imageDiv overflow-hidden h-full w-full">
                <img
                  ref={imageRef}
                  style={{
                    clipPath: "inset(100% 0 0 0)",
                    transform: "scale(1.4)",
                  }}
                  className="h-full w-full object-cover"
                  src={project.coverImage}
                  alt={project.title}
                />
              </div>
            </div>
            <div className="thirdSegment pl-[8rem] h-[85%] w-[60%] flex flex-col justify-end">
              <div className="heading">
                <TextReveal delay="0.85" ease="power4.out" splitBy="chars">
                  <h1 className="text-[5rem] leading-[1.1]">{project.title}</h1>
                </TextReveal>
              </div>
              <div className="subHeading flex gap-[3rem]">
                <TextReveal delay="0.85" splitBy="words">
                  <h1 className="text-[2rem]">{project.subtitle}</h1>
                </TextReveal>
                <TextReveal delay="0.85" splitBy="chars">
                  <h1 className="text-[2rem]">{project.year}</h1>
                </TextReveal>
              </div>
              <div className="description mt-[2rem] w-[70%] text-balance">
                <TextReveal delay="0.85" splitBy="lines">
                  <p className="text-[1.5rem] leading-[1.2]">
                    {project.description}
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </section>
        {project.gallery.map((elem, idx) => (
          <section key={idx} className="h-screen w-full overflow-hidden">
            <div className="sectionContainer rotate-[30deg] h-full w-full">
              <img
                className="h-full w-full object-cover"
                src={elem}
                alt={`${project.title} gallery ${idx + 1}`}
              />
            </div>
          </section>
        ))}
        <footer></footer>
      </main>
    </>
  );
};

export default ProjectPage;
