import React from "react";
import MarqueeDemo from "./MarqueDemo";
import { BorderBeam } from "../widgets/landingPage/border-beam";
import { MoveDown } from "lucide-react";
import RevealFromBottom from "../widgets/landingPage/TextReveal";
import AnimatedImage from "../widgets/landingPage/AnimatedImage";
import ShinyBtn from "../widgets/landingPage/Shiny-Btn";


function FirstSection() {
  return (
    <section className="z-10 w-full h-[95vh] mx-auto my-auto relative rounded-3xl overflow-hidden">
      <div className="z-[-1] backdrop-blur-[2px] absolute top-0 bg-gradient-to-b from-transparent h-full to-indigo-900 w-full mx-auto rounded-3xl"></div>

      <ShinyBtn
        delay={0.2}
        link="/explore"
        text="✨ Explore Caviar UI"
        className="z-10 cursor-pointer absolute top-[15%] sm:right-10 right-5 group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      />

      <div className="sm:px-10 px-5 xl:max-w-[80%] opacity-80 w-full font-Monument font-bold z-10 text-[5.5vw] sm:text-[5.3vw] md:text-[4.5vw] 2xl:text-[5rem] short h-full flex flex-col justify-center gap-3">
        <RevealFromBottom text={"Web & Mobile Dev"} delay={0.1} />
        <RevealFromBottom text={"Snippets, Templates"} delay={0.3} />
        <RevealFromBottom text={"and Designs"} delay={0.5} />
        <RevealFromBottom text={"All in one Place"} delay={0.7} />
      </div>

      <div className="z-[-2] absolute w-full top-1/2 -translate-y-1/2 left-0">
        <MarqueeDemo />
      </div>

      <div>
        <AnimatedImage
          src="https://ucarecdn.com/700e87c9-09b5-46ee-83c0-d891ec3f0b62/"
          alt="logo"
          width={200}
          height={200}
          className="absolute right-0 bottom-0 z-[-2]"
          start={100}
          end={0}
          delay={0.2}
        />

        <AnimatedImage
          src="https://ucarecdn.com/36e4474c-c0de-4189-a658-e550ca3ef8e3/        "
          alt="logo"
          width={50}
          height={50}
          className="absolute sm:left-10 left-5 top-32 z-[-2]"
          start={-100}
          end={0}
          delay={0.4}
        />
      </div>

      <BorderBeam size={250} duration={10} delay={0} />

      <div className="absolute z-20 right-7 bottom-5 max-[1800px]:grid animate-bounce w-12 h-12 hidden place-content-center border border-white/30 rounded-full">
        <MoveDown size={20} className="text-white/75" />
      </div>
    </section>
  );
}

export default FirstSection;
