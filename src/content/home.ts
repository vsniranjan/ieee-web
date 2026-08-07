export const hero = {
  /** Accessible headline. Set visually as two rows, one accent word. */
  headline: "Empowering Innovation, Shaping Tomorrow.",
  /**
   * Two separate compositions, not one that shrinks.
   *
   * A phone is tall and narrow: four short rows let the type run far larger
   * than two long rows ever could at that width. Wide screens get the two-row
   * version, where the long rows have room to breathe.
   */
  rowsMobile: [
    { text: "EMPOWERING", outline: false },
    { text: "INNOVATION", outline: false },
    { text: "SHAPING", outline: true },
    { text: "TOMORROW.", outline: true },
  ],
  rowsWide: [
    { text: "EMPOWERING INNOVATION", outline: false },
    { text: "SHAPING TOMORROW.", outline: true },
  ],
  cta: { label: "Join Us Today", href: "https://www.ieee.org" },
};

export type FieldProject = {
  id: string;
  name: string;
  place: string;
  /** Which survey diagram to draw. */
  figure: "solar" | "link" | "watch";
  /** 12-15 words. What shows before anything is expanded. */
  lede: string;
  /** Verbatim from CONTENT.md. Stays in the DOM when collapsed. */
  full: string;
};

export const fieldWork = {
  /** Split so the title can repeat the hero's solid-against-outline pairing. */
  heading: { lead: "What we", tail: "actually did" },

  projects: [
    {
      id: "light-the-lives",
      name: "Light the Lives",
      place: "Kuttampuzha",
      figure: "solar",
      lede: "A week living in the panchayat. Two solar systems installed, and the power stayed on.",
      full: "Kuttampuzha Grama Panchayat lacked access to reliable energy resources. With approval from the local authorities, a team of volunteers stayed in the locality for a week and installed two solar power systems, giving the community a dependable and sustainable source of electricity.",
    },
    {
      id: "connect-the-lives",
      name: "Connect the Lives",
      place: "Uriyampetty",
      figure: "link",
      lede: "A survey, then a communication module at the school. Still running a year later.",
      full: "After LTL, the tribal colony at Uriyampetty raised the problem of children with limited access to schooling. A detailed survey led to a communication module at the local school for online classes, run by a trained resident teacher. A year on, it still serves the community.",
    },
    {
      id: "fauna-flash",
      name: "Fauna Flash",
      place: "Forest fringe",
      figure: "watch",
      lede: "Detects elephants moving at the forest fringe and warns the village before they arrive.",
      full: "An early warning system developed under the leadership of Madhav K. Anil that detects elephant movement in forest fringe areas and alerts nearby communities in real time, cutting the risk of human–elephant encounters and supporting coexistence.",
    },
  ] satisfies FieldProject[],
};

/**
 * Band 3. One sentence, three clauses — 135 words of CONTENT.md boilerplate
 * cut to 35. The lengths are load-bearing: the clauses are set at display size
 * and swap in the same slot, so one that runs long breaks the composition.
 */
export const whatIeeeIs = {
  stem: "IEEE is",
  clauses: [
    "the body that writes the standards technology runs on.",
    "a working commitment to advance technology for humanity.",
    "why an engineer in Kothamangalam and one in Kyoto build to the same spec.",
  ],
};

/** Band 4. The figure, then three benefits at one line each. */
export const whyJoin = {
  heading: { lead: "Why", tail: "join" },
  /** Verify against ieee.org before launch — flagged in the plan. */
  stat: {
    value: 500000,
    suffix: "+",
    label: "members",
    sub: "across 160 countries",
  },
  benefits: [
    "Grants that put students on stage at international conferences.",
    "A library of peer-reviewed courses, open to every member.",
    "A seat at the table where global technical standards get written.",
  ],
  cta: {
    label: "Become a member",
    href: "https://www.ieee.org/membership/join",
  },
};

/**
 * Band 5. The span since the charter is drawn as a scale rather than written
 * out — see Timeline. The year count is derived there from 1988, not stored,
 * so it cannot go stale the way CONTENT.md's hardcoded "38 years" did.
 */
export const close = {
  links: [
    { label: "The branch", href: "/about" },
    { label: "What we run", href: "/events" },
    { label: "Who runs it", href: "/team" },
  ],
};
