/**
 * Site-wide chrome content. Shared by the navbar, the mobile menu and the
 * footer, so the four routes can never drift apart between them.
 *
 * Playground is deliberately absent: that route was cut with the games.
 * Gallery is gone too — the event posters live on the home page as the reel,
 * and a second route showing the same 22 plates was a page with nothing of
 * its own to say.
 */

export const nav = {
  brand: { mark: "/logo.svg", name: "IEEE MACE SB" },
  links: [
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
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

/**
 * Where the branch can be reached. Single source — the footer's social column
 * reads `contact.socials`, so the two can never drift.
 *
 * No form. A form needs somewhere to post, and this project has no backend,
 * no API keys and no account that survives a committee handover. A `mailto:`
 * opens the sender's own client, which cannot silently swallow a message.
 *
 * No map either. The site is a dark topographic survey and a Google embed
 * would ship a bright light-mode panel, third-party cookies and ~800KB into
 * the route to show an address that people copy as text anyway.
 */
export const contact = {
  heading: { lead: "Where to find", tail: "us" },

  address: {
    label: "Student Branch Headquarters",
    institution: "Mar Athanasius College of Engineering",
    locality: "Kothamangalam, Kerala 686666, India",
  },

  channels: [
    {
      label: "Email",
      value: "ieeemacesbofficial@gmail.com",
      href: "mailto:ieeemacesbofficial@gmail.com",
    },
    {
      // This is the sitting Chair's mobile, not a branch line — it changes
      // with every handover, and whoever holds it inherits the page's calls.
      label: "Phone",
      value: "+91 88486 68497",
      href: "tel:+918848668497",
    },
  ],

  socials: [
    { label: "Instagram", href: "https://www.instagram.com/ieeemace" },
    { label: "X", href: "https://x.com/ieeemace" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ieeemace/" },
    { label: "YouTube", href: "https://youtube.com/@ieeemacesb" },
  ],

  /** Officers publish their own addresses, so send people there rather than
      repeating five mailtos here. */
  cta: { label: "Reach a specific officer", href: "/team" },
};

export const footer = {
  wordmark: "IEEE MACE SB",
  tagline: "Student Branch",
  columns: [
    {
      title: "Pages",
      // A subset of nav.links — three per column keeps the footer's headings on
      // one row. Team is the one dropped: Contact stays because a footer is
      // where people go looking for it, and Team is one click away from both
      // the navbar and the close section above.
      links: nav.links.filter((l) => l.href !== "/team"),
    },
    { title: "Useful links", links: [{ label: "IEEE.org", href: "https://www.ieee.org" }] },
    // Reads the single source above, so the footer and the contact page can
    // never disagree about where the branch is online.
    { title: "Connect online", links: contact.socials },
  ],
  credit: "Designed and developed by IEEE MACE SB WebTeam",
  rightsHolder: "IEEE MACE",
};
