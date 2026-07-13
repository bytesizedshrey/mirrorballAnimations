import TextReveal from "@/components/TextReveal";

export default function Home() {
  return(
  <main className="bg-black h-[300vh] w-full">
    <div className="h-[50%]"></div>
     <TextReveal splitBy="chars" trigger="scroll" className='text-[6rem] text-white'>
      Hello Monza
     </TextReveal>
    </main>
  );
}
