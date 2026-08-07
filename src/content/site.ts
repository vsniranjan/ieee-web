/**
 * Site-wide chrome content. Shared by the navbar, the mobile menu and the
 * footer, so the five routes can never drift apart between them.
 *
 * Playground is deliberately absent: that route was cut with the games.
 */

export const nav = {
  brand: { mark: "/logo.svg", name: "IEEE MACE SB" },
  links: [
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Join IEEE", href: "https://www.ieee.org" },
};

/**
 * One repeating phrase, verbatim from CONTENT.md.
 *
 * The event names here disagree with the ones in the field-work copy
 * (HACK-A-ADDICT vs Hack-a-addict, and Fauna Flash is absent). CONTENT.md
 * flags that drift; it needs settling once the events page exists.
 */
export const ticker =
  "ADVANCING TECHNOLOGY FOR HUMANITY · SINCE 1988 · >.HACK(); · SPARC · STEM OUTREACH · HACK-HER · HACK-A-ADDICT · LIGHT THE LIVES · CONNECT THE LIVES · ";

export const footer = {
  wordmark: "IEEE MACE SB",
  tagline: "Student Branch",
  columns: [
    {
      title: "Pages",
      // A subset of nav.links, not all five — three columns of three keeps the
      // footer's headings on one row. Team and Gallery are the two dropped:
      // Contact stays because a footer is where people go looking for it, and
      // both dropped routes are still one click away from the navbar and from
      // the close section above.
      links: nav.links.filter((l) => !["/team", "/gallery"].includes(l.href)),
    },
    { title: "Useful links", links: [{ label: "IEEE.org", href: "https://www.ieee.org" }] },
    {
      title: "Connect online",
      // Placeholders. CONTENT.md flags both as dead — real URLs needed before
      // launch, or the column should be cut rather than shipped inert.
      links: [
        { label: "Instagram", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  ],
  credit: "Designed and developed by IEEE MACE SB WebTeam",
  rightsHolder: "IEEE MACE",
};
