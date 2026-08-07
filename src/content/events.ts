/**
 * `/events` — the eight flagship events and initiatives the branch runs.
 *
 * CONTENT.md lists nine. `Enhance their Lives` is dropped: it is a planned
 * programme that has not happened, and an events page reads as a record of
 * work delivered.
 *
 * THE THREE HUMANITARIAN ENTRIES ARE DELIBERATELY NOT THE SAME TEXT AS HOME.
 * `fieldWork` in `home.ts` carries Light the Lives, Connect the Lives and
 * Fauna Flash using CONTENT.md's original paragraphs. Both pages stay
 * self-contained, so these are rewritten — same facts, different prose, so a
 * reader who scrolled home and then clicked through is not served the same
 * three paragraphs twice.
 *
 * The cost of that decision: three stories now exist in two versions and can
 * drift. If they ever disagree on a fact, THIS FILE IS CANONICAL.
 *
 * Naming is settled here and must match `ticker` in `site.ts`:
 * `>.hack()_;` · SPARC · STEM Initiative · Hack-Her · Hack-a-addict ·
 * Light the Lives · Connect the Lives · Fauna Flash.
 */

export interface EventEntry {
  id: string;
  name: string;
  /** Category, not a second name. `STEM Initiative` is tagged School Outreach. */
  tag: string;
  body: string;
}

export const eventsPage = {
  /** "What we run" is the label home links here with. */
  heading: { lead: "What we", tail: "run" },
};

export const events: EventEntry[] = [
  {
    id: "hack",
    name: ">.hack()_;",
    tag: "Flagship Hackathon",
    // "Seven years" and SPARC's "five years" below are hardcoded on request.
    // They are wrong within a year unless someone edits them — the same
    // failure that produced the stale "38 years" on home, which was fixed by
    // deriving from the founding year. Deliberate, not an oversight.
    body: "The branch's flagship, seven years running. Each edition gives college students a platform to turn an idea into something that works by the end of it, and every year the crop of entries has been larger than the last.",
  },
  {
    id: "sparc",
    name: "SPARC",
    tag: "Speaker Series",
    body: "Five years of speakers brought in for first-years. People who have built careers across very different fields, talking about how they got there — personal growth, career planning, and what the next four years can be made to hold.",
  },
  {
    id: "stem",
    name: "STEM Initiative",
    tag: "School Outreach",
    body: "Workshops, demonstrations and hands-on sessions taking STEM into schools — IoT and embedded systems, mechatronics, software development, cybersecurity and data analytics. Reaches close to 500 students across five schools each year.",
  },
  {
    id: "hack-her",
    name: "Hack-Her",
    tag: "Women in Tech",
    body: "A 24-hour ideation and implementation challenge open only to women, answering how few of them the field keeps. Technical work is the frame; what it actually builds is confidence, leadership, a network, and the habit of learning from peers.",
  },
  {
    id: "hack-a-addict",
    name: "Hack-a-addict",
    tag: "Social Impact Hackathon",
    body: "Run with the Lions Club on drug abuse and its effects. Participants worked up technically feasible, socially relevant ideas for prevention, awareness and rehabilitation, and came away understanding what substance abuse actually does to the people around it.",
  },
  {
    id: "light-the-lives",
    name: "Light the Lives",
    tag: "Humanitarian Project",
    body: "Kuttampuzha Grama Panchayat had no dependable power. Volunteers cleared it with the local authorities, then moved into the locality for a week and built two solar systems there. The panchayat has had a reliable supply since.",
  },
  {
    id: "connect-the-lives",
    name: "Connect the Lives",
    tag: "Humanitarian Project",
    body: "The tribal colony at Uriyampetty came to the branch after Light the Lives: their children could not reliably get to school. A survey settled what was needed, and a communication module went into the local school for online classes. A resident was trained to run it, and a year later it is still running.",
  },
  {
    id: "fauna-flash",
    name: "Fauna Flash",
    tag: "Humanitarian Technology",
    body: "An early warning system for the forest fringe, built under Madhav K. Anil. It picks up elephant movement and alerts the settlements nearby while there is still time to act, so encounters that used to be dangerous mostly stop happening.",
  },
];
