import { Close } from "@/components/home/Close";
import { FieldWork } from "@/components/home/FieldWork";
import { Hero } from "@/components/home/Hero";
import { WhatIeeeIs } from "@/components/home/WhatIeeeIs";
import { WhyJoin } from "@/components/home/WhyJoin";
import { SectionReveal } from "@/components/motion/SectionReveal";

export default function Home() {
  return (
    <main>
      <SectionReveal on="load">
        <Hero />
      </SectionReveal>
      <SectionReveal>
        <FieldWork />
      </SectionReveal>
      {/* Not wrapped in SectionReveal: this section pins, and a transformed
          ancestor makes `position: sticky` resolve against the transform
          instead of the viewport, which breaks the pin outright. */}
      <WhatIeeeIs />
      <SectionReveal>
        <WhyJoin />
      </SectionReveal>
      <SectionReveal>
        <Close />
      </SectionReveal>
    </main>
  );
}
