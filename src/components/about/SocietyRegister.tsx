import { Reveal } from "@/components/motion/Reveal";
import { societies } from "@/content/about";

/**
 * The ten societies, laid out as an open two-column register.
 *
 * Nothing collapses. `/team` renders the same ten as collapsible strata, and
 * ten one-line entries have nothing worth hiding — repeating the disclosure
 * device on the adjacent route would make the two pages read as one page
 * twice. Everything here is visible on arrival.
 *
 * Names use `.t-item`, not `.t-subject`. `.t-subject` is sized against a
 * full-width row and says so; `Robotics and Automation Society` in a half-width
 * column is exactly the case `.t-item` was added for.
 *
 * A server component — this is static content and should ship as HTML. Only
 * `Reveal` crosses into the client.
 */
export function SocietyRegister() {
  return (
    <ul className="mt-12 grid border-b border-on-plate/12 sm:mt-16 sm:grid-cols-2">
      {societies.map((society, i) => (
        <Reveal
          as="li"
          key={society.id}
          // Capped so ten entries do not stagger past the point where the first
          // has already been read.
          delay={Math.min(i, 6) * 0.05}
          // Padding and the dividing rule live on the grid item, not on a child:
          // `odd`/`even` resolve against siblings, and the child is an only child.
          // The left column keeps its edge flush with the page gutter.
          className="flex flex-col border-t border-on-plate/12 py-6 sm:py-8 sm:odd:pr-8 sm:even:border-l sm:even:border-l-on-plate/12 sm:even:pl-8"
        >
          <h3 className="t-item text-on-plate">{society.name}</h3>

          {/* flex-1 so the portal link sits on the baseline of the row whatever
              length the line above it wraps to. */}
          <p className="t-body mt-2 flex-1">{society.line}</p>

          <a
            href={society.href}
            target="_blank"
            rel="noreferrer"
            className="group mt-5 inline-flex w-fit items-center gap-2 text-plate-olive transition-colors duration-150 hover:text-on-plate"
          >
            <span className="t-action break-all">{society.portal}</span>
            <span
              aria-hidden
              className="ease-signature h-px w-5 shrink-0 bg-current transition-all duration-300 group-hover:w-9"
            />
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
