import { FieldWork } from "@/components/home/FieldWork";
import { Hero } from "@/components/home/Hero";
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
      {/* Bands 3-5 (what IEEE is, why join, close) still to come. */}
    </main>
  );
}
