import type { Metadata } from "next";
import Link from "next/link";
import { MaskedLine } from "@/components/motion/MaskedLine";
import { Reveal } from "@/components/motion/Reveal";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact — IEEE MACE SB",
  description:
    "Reach the IEEE Student Branch at Mar Athanasius College of Engineering, Kothamangalam — by email, by phone, or through the officer you need.",
};

/**
 * A short page on purpose. Every extra sentence between someone and the
 * address they came for is a sentence they have to read past.
 *
 * The channels are hairline-ruled rows rather than a grid of contact cards —
 * three identical tiles with an icon, a heading and a line of text is the
 * shape this site exists not to have. Rows also let the value be set at
 * subject size, which is the point: on this page the address IS the content.
 */
export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[88rem] px-5 pt-32 pb-24 sm:px-8 sm:pt-40 sm:pb-32">
      <SectionReveal on="load">
        <h1 className="t-title flex flex-wrap items-baseline gap-x-[0.28em] text-on-plate">
          <MaskedLine className="block">{contact.heading.lead}</MaskedLine>
          <MaskedLine className="word-outline block" delay={0.08}>
            {contact.heading.tail}
          </MaskedLine>
        </h1>
      </SectionReveal>

      <SectionReveal>
        <div className="mt-14 max-w-4xl sm:mt-20">
          {/* The place, held. A bounded surface separates the one thing that is
              a location from the things that are channels. */}
          <Reveal className="panel p-6 sm:p-9">
            <p className="t-label">{contact.address.label}</p>
            <p className="t-subject mt-3 max-w-[18ch] text-on-plate">
              {contact.address.institution}
            </p>
            <span aria-hidden className="mt-5 block h-px w-14 bg-plate-bronze" />
            <p className="t-body mt-4">{contact.address.locality}</p>
          </Reveal>

          <ul className="mt-12 border-b border-on-plate/12 sm:mt-16">
            {contact.channels.map((channel, i) => (
              <Reveal
                as="li"
                key={channel.label}
                delay={i * 0.06}
                className="border-t border-on-plate/12"
              >
                <a
                  href={channel.href}
                  className="group flex items-center gap-4 py-5 sm:gap-6 sm:py-6"
                >
                  <span className="min-w-0 flex-1">
                    <span className="t-label block">{channel.label}</span>
                    {/* Anton uppercases it, which an address survives — mail
                        and tel are both case-insensitive. */}
                    <span className="ease-signature t-subject mt-1 block break-all text-on-plate transition-colors duration-150 group-hover:text-plate-olive">
                      {channel.value}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="ease-signature h-px w-6 shrink-0 bg-plate-olive transition-all duration-300 group-hover:w-12"
                  />
                </a>
              </Reveal>
            ))}

            {/* Same row rhythm, but four destinations rather than one, so it
                carries links instead of being one. */}
            <Reveal
              as="li"
              delay={contact.channels.length * 0.06}
              className="border-t border-on-plate/12"
            >
              <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6 sm:py-6">
                <span className="t-label sm:w-32 sm:shrink-0">Online</span>

                <ul className="flex flex-wrap gap-x-7 gap-y-3">
                  {contact.socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-on-plate transition-colors duration-150 hover:text-plate-olive"
                      >
                        <span className="t-action">{social.label}</span>
                        <span
                          aria-hidden
                          className="ease-signature h-px w-0 bg-current transition-all duration-300 group-hover:w-4"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </ul>

          <Reveal className="mt-12 sm:mt-14">
            <Link
              href={contact.cta.href}
              className="btn-field inline-flex items-center gap-3 px-6 py-4 sm:gap-4 sm:px-7"
            >
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-current" />
              <span className="t-action">{contact.cta.label}</span>
              <span aria-hidden className="btn-tail h-px shrink-0 bg-current" />
            </Link>
          </Reveal>
        </div>
      </SectionReveal>
    </main>
  );
}
