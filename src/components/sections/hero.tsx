import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import SectionWrapper from "../ui/section-wrapper";
import { Button } from "../ui/button";

const HeroSection = () => {
  const { isLoading } = usePreloader();
  return (
    <SectionWrapper id="hero" className="relative w-full h-screen">
      <div className="grid md:grid-cols-2">
        <div className="col-span-1 z-[2] flex h-[calc(100dvh-3rem)] flex-col items-center justify-start pt-28 sm:pb-16 md:h-[calc(100dvh-4rem)] md:items-start md:justify-center md:p-20 lg:p-24 xl:p-28">
          {!isLoading && <div className="flex flex-col">
            <div>
              <BlurIn delay={0.7}><p className="mt-4 font-display text-md text-slate-500 dark:text-zinc-400 sm:text-xl">AI / ML / SYSTEMS</p></BlurIn>
              <BlurIn delay={1}><h1 className="-ml-[6px] cursor-default text-left font-display text-7xl font-thin leading-none text-foreground md:text-7xl lg:text-8xl xl:text-9xl">PARANJAY<br />DAS</h1></BlurIn>
              <BlurIn delay={1.2}><p className="mt-4 max-w-[34rem] font-display text-base text-slate-500 dark:text-zinc-300 sm:text-xl">AI/ML researcher and builder working on language-model applications, retrieval, agentic workflows, and systems for structured extraction.</p></BlurIn>
              <p className="mt-4 text-sm text-slate-500 dark:text-zinc-400">BTech Computer Science and Engineering (AI/ML)<br />Netaji Subhash Engineering College · Sep 2025–Present</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BoxReveal delay={1.8} width="100%"><Link href="#projects"><Button className="flex items-center gap-2">Explore projects <ArrowUpRight size={17} /></Button></Link></BoxReveal>
              <Link href={`mailto:${config.email}`} aria-label={`Email ${config.email}`}><Button variant="outline" size="icon"><Mail size={19} /></Button></Link>
              <Link href={config.social.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Button variant="outline" size="icon"><SiGithub size={19} /></Button></Link>
              <Link href={config.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Button variant="outline" size="icon"><SiLinkedin size={19} /></Button></Link>
            </div>
          </div>}
        </div>
        <div className="col-span-1" />
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2"><ScrollDownIcon /></div>
    </SectionWrapper>
  );
};

export default HeroSection;
