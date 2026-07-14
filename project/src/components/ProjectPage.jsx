import TextReveal from "./TextReveal"

const ProjectPage = ({project}) => {
  return (
    <>
    <main>
        <section className="h-screen flex w-full pt-[7rem] pb-[4rem] px-[3rem]">
            <div className="firstSegment h-full w-[10%]">
                <TextReveal>
                    <h3 className="text-[2rem]">{project.number}</h3>
                </TextReveal>
                </div>
                <div className="secondSegment h-[85%] w-[30%]">
                    <div className="imageDiv h-full w-full">
                        <img 
                        className="h-full w-full object-cover"
                        src={project.coverImage} 
                        alt=""
                        />
                </div>
            </div>
            <div className="thirdSegment pl-[8rem] h-[85%] w-[60%] flex flex-col justify-end">
                <div className="heading">
                    <TextReveal delay='0.85' ease='power4.out' splitBy='chars'>
                        <h1 className="text-[5rem] leading-[1.1]">{project.title}</h1>
                    </TextReveal>
                </div>
                <div className="subHeading flex gap-[3rem]">
                    <TextReveal delay='0.85' splitBy='words'>
                        <h1 className="text-[2rem]">{project.subtitle}</h1>
                    </TextReveal>
                    <TextReveal delay='0.85' splitBy='chars'>
                        <h1 className="text-[2rem]">{project.year}</h1>
                    </TextReveal>
                </div>
                <div className="description mt-[2rem] w-[70%] text-balance">
                    <TextReveal delay='0.85' splitBy='lines'>
                        <p className="text-[1.5rem] leading-[1.2]">{project.description}</p>
                    </TextReveal>
                </div>
            </div>
        </section>
        <section></section>
        <section></section>
        <section></section>
        <section></section>
        <footer></footer>
    </main>
    </>
  )
}

export default ProjectPage