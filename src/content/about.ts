/**
 * `/about` — the ten societies the branch runs, and where it came from.
 *
 * Societies lead and the founding history closes. Home already argues what
 * IEEE is, why to join, how long the branch has run and what it builds; the
 * societies are the only material here that home does not touch.
 *
 * The heritage copy is 62 words, down from CONTENT.md's 370. Cut with it: both
 * eyebrows, all three standfirsts, the `300+ Members` counter (invented — no
 * verified figure exists), the hardcoded `38 years`, and the
 * `1961 · 1988 · TODAY` marker strip. Home's Timeline already derives years
 * from the founding year, and a hardcoded copy of that number here is exactly
 * how it goes stale.
 */

export interface Society {
  id: string;
  name: string;
  /** One line, in this site's voice — not IEEE's own 40-word boilerplate. */
  line: string;
  /** Display form of the portal, shown as the link text. */
  portal: string;
  href: string;
}

export interface HeritageBlock {
  id: string;
  /** Meta pair for the label line. */
  meta: string;
  name: string;
  body: string;
}

export const aboutPage = {
  /** "The branch" is the label the home page links here with. */
  heading: { lead: "The", tail: "branch" },
  societiesHeading: { lead: "Ten societies", tail: "and chapters" },
  heritageHeading: { lead: "Where it", tail: "runs" },
};

/**
 * Order follows CONTENT.md, with Vehicular Technology appended.
 *
 * VTS is new here. CONTENT.md describes nine and omits it, yet it has a Chair
 * and a Secretary on /team and a poster in the reel — leaving it out made the
 * two pages contradict each other.
 *
 * Every href was checked with a live request before shipping. Two corrections
 * against CONTENT.md:
 *
 * - `signalprocessingsociety.org` is the canonical host, not a retired one.
 *   `sps.ieee.org` is the alias and redirects to it.
 * - The IE/PELS entry is a JOINT chapter and both parents have live sites:
 *   `ieee-ies.org` (Industrial Electronics) and `ieee-pels.org` (Power
 *   Electronics). PELS ships, as CONTENT.md specifies, rather than inventing a
 *   two-link row that no other entry has.
 *
 * These URLs are IEEE's, not ours, and will outlive this committee. Kept as
 * data so a dead one is a one-line fix.
 */
export const societies: Society[] = [
  {
    id: "computer-society",
    name: "Computer Society",
    line: "Software, systems, and the contests built around them.",
    portal: "computer.org",
    href: "https://www.computer.org/",
  },
  {
    id: "robotics-automation",
    name: "Robotics and Automation Society",
    line: "Machines that move, and the control that makes them useful.",
    portal: "ieee-ras.org",
    href: "https://www.ieee-ras.org/",
  },
  {
    id: "signal-processing",
    name: "Signal Processing Society",
    line: "Turning noisy measurement into a decision.",
    portal: "signalprocessingsociety.org",
    href: "https://signalprocessingsociety.org/",
  },
  {
    id: "communications-society",
    name: "Communications Society",
    line: "Networks, protocols, and the spectrum they run on.",
    portal: "comsoc.org",
    href: "https://www.comsoc.org/",
  },
  {
    id: "industry-applications",
    name: "Industry Applications Society",
    line: "Electrical systems as industry actually deploys them.",
    portal: "ias.ieee.org",
    href: "https://ias.ieee.org/",
  },
  {
    id: "power-energy",
    name: "Power and Energy Society",
    line: "Generation, transmission, and the grid in between.",
    portal: "ieee-pes.org",
    href: "https://ieee-pes.org/",
  },
  {
    id: "ie-pels",
    name: "IE/PELS Joint Chapter",
    line: "Power conversion, and the industrial processes it drives.",
    portal: "ieee-pels.org",
    href: "https://www.ieee-pels.org/",
  },
  {
    id: "wie",
    name: "Women in Engineering",
    line: "Getting more women into engineering, and keeping them there.",
    portal: "wie.ieee.org",
    href: "https://wie.ieee.org/",
  },
  {
    id: "sight",
    name: "SIGHT",
    line: "Engineering worked out with the community that needs it.",
    portal: "sight.ieee.org",
    href: "https://sight.ieee.org/",
  },
  {
    id: "vehicular-technology",
    name: "Vehicular Technology Society",
    line: "Transport electrification and the systems moving with it.",
    portal: "vtsociety.org",
    href: "https://vtsociety.org/",
  },
];

export const heritage: HeritageBlock[] = [
  {
    id: "mace",
    meta: "Estd 1961 · Kothamangalam",
    name: "Mar Athanasius College of Engineering",
    body: "Founded 1961 — the first engineering college in Asia under Christian management. Six departments, affiliated to APJ Abdul Kalam Technological University and aided by the Government of Kerala.",
  },
  {
    id: "branch",
    meta: "Estd 1988 · Branch code 32041",
    name: "IEEE Student Branch",
    body: "Chartered 17 November 1988. Runs a hardware laboratory and everything around it — hackathons, workshops, talks, debates, outreach — under the IEEE mission of advancing technology for humanity.",
  },
];
