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
    { text: "EMPOWERING INNOVATION,", outline: false },
    { text: "SHAPING TOMORROW.", outline: true },
  ],
  cta: { label: "Join Us Today", href: "https://www.ieee.org" },
};
