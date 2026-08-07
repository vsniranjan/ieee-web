import type { Metadata } from "next";
import { CoreCard } from "@/components/team/CoreCard";
import { CounsellorPlate } from "@/components/team/CounsellorPlate";
import { ExecomStrata } from "@/components/team/ExecomStrata";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { core, teamPage } from "@/content/team";

export const metadata: Metadata = {
  title: "Team — IEEE MACE SB",
  description:
    "The 2026 executive committee of the IEEE Student Branch at Mar Athanasius College of Engineering: office bearers, coordinators, and the chairs and secretaries of ten societies and chapters.",
};

/**
 * Two registers on one page. The six people with photographs are composed as
 * plates; the thirty-one without are a roster, and a roster is a different
 * kind of object — forcing them into one shape would either starve the office
 * bearers of scale or invent thirty-one empty photo slots.
 *
 * Neither the counsellor nor the office bearers gets a heading of its own.
 * Every plate already names the office it holds, so a label above them would
 * be the tracked eyebrow DESIGN.md bans — a kicker sitting above a section
 * rather than data attached to an item.
 *
 * Top padding clears the fixed navbar, which the home page gets for free from
 * a full-height hero.
 */
export default function TeamPage() {
  return (
    <main className="mx-auto w-full max-w-[88rem] px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <SectionReveal on="load">
        <header>
          <h1 className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
            <MaskedLine className="block">{teamPage.heading.lead}</MaskedLine>
            <MaskedLine className="word-outline block" delay={0.08}>
              {teamPage.heading.tail}
            </MaskedLine>
          </h1>
        </header>
      </SectionReveal>

      <SectionReveal>
        <div className="mt-16 sm:mt-24">
          <CounsellorPlate />

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {core.map((member, i) => (
              <li key={member.name}>
                <CoreCard member={member} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal>
        <section aria-labelledby="execom-heading" className="mt-24 sm:mt-32">
          <h2
            id="execom-heading"
            className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate"
          >
            <MaskedLine className="block">{teamPage.execomHeading.lead}</MaskedLine>
            <MaskedLine className="word-outline block" delay={0.08}>
              {teamPage.execomHeading.tail}
            </MaskedLine>
          </h2>

          <ExecomStrata />
        </section>
      </SectionReveal>
    </main>
  );
}
