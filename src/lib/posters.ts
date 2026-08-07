export interface Poster {
  /** Public URL of the optimized image. */
  src: string;
  /** Real pixel size of that file. Drives --poster-ar and intrinsic size. */
  width: number;
  height: number;
  title: string;
  /** Short kicker under the title. */
  tag: string;
}

/**
 * Ordered as CONTENT.md lists them, which already alternates portrait and
 * square — the strip never settles into a uniform grid.
 *
 * Every width/height was read off the generated WebP with `magick identify`,
 * never guessed. Wrong numbers here are the one bug that silently crops every
 * poster, because the frame's aspect-ratio stops matching the image.
 */
export const posters: Poster[] = [
  { src: "/gallery/akiassc-2026.webp", width: 720, height: 900, title: "AKIASSC 2026 — Industry & Entrepreneurship", tag: "IAS · Student Conclave" },
  { src: "/gallery/error-404-debugging.webp", width: 720, height: 720, title: "Error 404 — Debugging Competition", tag: "Computer Society · Contest" },
  { src: "/gallery/connect-the-lives.webp", width: 720, height: 900, title: "Connect the Lives — Uriyampetty", tag: "SIGHT · Humanitarian Project" },
  { src: "/gallery/morse-code-contest.webp", width: 720, height: 720, title: "Morse Code Contest", tag: "IE/PELS · Technical Contest" },
  { src: "/gallery/ai-robotics-space-sustainability.webp", width: 720, height: 960, title: "AI Robotics for Space Sustainability", tag: "RAS · Distinguished Lecture" },
  { src: "/gallery/women-in-tech-beyond-stereotypes.webp", width: 720, height: 720, title: "Women in Tech — Beyond the Stereotypes", tag: "ComSoc · Talk Session" },
  { src: "/gallery/environment-day.webp", width: 720, height: 1082, title: "Environment Day", tag: "SIGHT · Community Outreach" },
  { src: "/gallery/pes-day-2026.webp", width: 720, height: 720, title: "IEEE PES Day 2026", tag: "PES · Online Session" },
  { src: "/gallery/sps-world-of-opportunities.webp", width: 720, height: 900, title: "IEEE SPS World of Opportunities", tag: "SPS · Interactive Talk" },
  { src: "/gallery/a-robo-roadmap.webp", width: 720, height: 721, title: "A Robo Roadmap — Passion to Profession", tag: "RAS · Talk Session" },
  { src: "/gallery/women-leading-innovation.webp", width: 720, height: 900, title: "Women Leading Innovation for Sustainable Development", tag: "WIE · Panel Discussion" },
  { src: "/gallery/linkedin-industry-success.webp", width: 720, height: 720, title: "Engineering Your Professional Identity", tag: "IAS · Career Session" },
  { src: "/gallery/power-electronics-talk.webp", width: 720, height: 901, title: "The Technology Behind Modern Grid Systems", tag: "IE/PELS · Talk Session" },
  { src: "/gallery/farewell-2026.webp", width: 720, height: 720, title: "Farewell — >.hack()_; Team", tag: "Student Branch · Community" },
  { src: "/gallery/informatyka-agentic-ai.webp", width: 720, height: 900, title: "Beginner's Guide to Agentic AI & n8n", tag: "Informatyka 6.0 · Talk Session" },
  { src: "/gallery/understanding-gender-reality.webp", width: 720, height: 720, title: "Understanding Gender Reality", tag: "WIE · Awareness Session" },
  { src: "/gallery/distinguished-lecture-deep-learning.webp", width: 720, height: 900, title: "From Pixels to Decisions — Deep Learning", tag: "SPS · Distinguished Lecture" },
  { src: "/gallery/sps-scholarship-guidance.webp", width: 720, height: 720, title: "Unlocking Opportunities — SPS Scholarships", tag: "SPS · Guidance Session" },
  { src: "/gallery/ethical-ai-session-1.webp", width: 720, height: 900, title: "Session 1 — Ethical AI", tag: "WIE Profept · Session Series" },
  { src: "/gallery/the-power-quest.webp", width: 720, height: 720, title: "The Power Quest", tag: "PES Day · Quiz" },
  // CONTENT.md flags this and "Engineering Your Professional Identity" above as
  // the same session listed twice, original and rescheduled. Both ship for now;
  // in a looping strip the repeat is noticeable and probably wants cutting.
  { src: "/gallery/linkedin-industry-success-rescheduled.webp", width: 720, height: 720, title: "Engineering Your Professional Identity — Rescheduled", tag: "IAS · Career Session" },
  { src: "/gallery/ev-career-pathways.webp", width: 720, height: 720, title: "Career Pathways in EV & Automotive Industry", tag: "VTS · Talk Session" },
];
