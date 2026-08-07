import type { Metadata } from "next";
import { SocietyRegister } from "@/components/about/SocietyRegister";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { Reveal } from "@/components/motion/Reveal";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { aboutPage, heritage } from "@/content/about";

export const metadata: Metadata = {
  title: "About — IEEE MACE SB",
  description:
    "The ten IEEE societies and chapters run by the Student Branch at Mar Athanasius College of Engineering, Kothamangalam, and where the branch came from.",
};

/**
 * Societies first, founding history second — the conventional about-page order
 * inverted on purpose. Home already carries what IEEE is, why to join, the
 * years since 1988 and what the branch builds; the ten societies are the only
 * material on this route that home does not touch, so they lead.
 *
 * Top padding clears the fixed navbar, which the home page gets for free from
 * a full-height hero.
 */
export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[88rem] px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <SectionReveal on="load">
        <h1 className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
          <MaskedLine className="block">{aboutPage.heading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {aboutPage.heading.tail}
          </MaskedLine>
        </h1>
      </SectionReveal>

      <SectionReveal>
        <section aria-labelledby="societies-heading" className="mt-16 sm:mt-24">
          <h2
            id="societies-heading"
            className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate"
          >
            <MaskedLine className="block">{aboutPage.societiesHeading.lead}</MaskedLine>
            <MaskedLine className="word-outline block" delay={0.08}>
              {aboutPage.societiesHeading.tail}
            </MaskedLine>
          </h2>

          <SocietyRegister />
        </section>
      </SectionReveal>

      <SectionReveal>
        <section aria-labelledby="heritage-heading" className="mt-24 sm:mt-32">
          <h2
            id="heritage-heading"
            className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate"
          >
            <MaskedLine className="block">{aboutPage.heritageHeading.lead}</MaskedLine>
            <MaskedLine className="word-outline block" delay={0.08}>
              {aboutPage.heritageHeading.tail}
            </MaskedLine>
          </h2>

          {/* Two panels rather than CONTENT.md's drafting-sheet title blocks.
              The metaphor fits the site, but it means a new component carrying
              three fields of chrome around thirty words — `.panel` with a label
              and a leader line already does the job, and `/contact` uses it for
              the address. */}
          <ul className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-2">
            {heritage.map((block, i) => (
              <Reveal as="li" key={block.id} delay={i * 0.08} className="panel p-6 sm:p-9">
                <span className="t-label block">{block.meta}</span>
                <h3 className="t-subject mt-3 max-w-[18ch] text-on-plate">{block.name}</h3>
                <span aria-hidden className="mt-5 block h-px w-14 bg-plate-bronze" />
                <p className="t-body mt-4">{block.body}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      </SectionReveal>
    </main>
  );
}
