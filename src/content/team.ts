/**
 * The 2026 ExeCom, transcribed from `docs/IEEE MACE SB ExeCom 2026.pdf` and
 * `docs/core_team_details.txt`.
 *
 * WHAT IS DELIBERATELY NOT HERE: phone numbers, IEEE membership IDs, and
 * personal email addresses. The source PDF carries all three for all 36
 * members — about twenty of the emails are personal Gmail rather than an
 * institutional address — and none of it belongs on an indexable page. Holding
 * office is public; a student's mobile number is not. Only the five office
 * bearers publish an address, and only their `@ieee.org` one.
 *
 * If someone asks to add contact details back, that is a decision for the
 * people whose details they are, not for this file.
 *
 * Class codes carry the PDF's branch letters verbatim but the semester is
 * advanced one term, because the roster was compiled a semester before this
 * page ships — `S4 LA` in the source is `S5 LA` here. The letters are never
 * expanded: guessing what `LA` and `MB` stand for and getting it wrong is
 * worse than printing the raw code.
 *
 * This is the one field that goes stale on its own. It needs bumping again
 * each new term, or dropping.
 */

export interface Photo {
  src: string;
  /** Real pixel size, read off the file. Wrong numbers here shift the layout. */
  width: number;
  height: number;
}

export interface Member {
  name: string;
  /** Exact designation from the source. */
  role: string;
  /** Verbatim class code. Absent for faculty. */
  klass?: string;
  /** Office bearers only, `@ieee.org` only. */
  email?: string;
  photo?: Photo;
}

export interface ExecomGroup {
  id: string;
  /** Band heading. The role is dropped from member plates when every member
      in the band shares it, so this carries it instead. */
  title: string;
  members: Member[];
  /** Open on load. One band only — the roster should read as closed by
      default, with a single example already showing what opening does. */
  defaultOpen?: boolean;
}

export const teamPage = {
  /** The phrase the home page links with, so the click and the landing agree. */
  heading: { lead: "Who runs", tail: "it" },
  execomHeading: { lead: "Executive", tail: "committee" },
};

export const counsellor: Member = {
  name: "Prof. Neethu Salim",
  role: "Student Branch Counsellor",
  photo: { src: "/team/neethu-salim.webp", width: 618, height: 800 },
};

/**
 * Ordered by office, not by the PDF's row order: chair, deputy, the two
 * secretaries, then the treasurer. That is the order the branch itself would
 * read them in.
 */
export const core: Member[] = [
  {
    name: "Jes Gigo",
    role: "Student Branch Chair",
    klass: "S7 EB",
    email: "jesgigo10@ieee.org",
    photo: { src: "/team/jes-gigo.webp", width: 533, height: 800 },
  },
  {
    name: "Jassim Mohammed Salim",
    role: "Student Branch Vice Chair",
    klass: "S5 LA",
    email: "jassimmohdsalim@ieee.org",
    // The one landscape original. Cropped to the shared portrait frame.
    photo: { src: "/team/jassim-mohammed-salim.webp", width: 800, height: 533 },
  },
  {
    name: "Ryan Nelson",
    role: "Student Branch Secretary",
    klass: "S5 LA",
    email: "ryannelson@ieee.org",
    photo: { src: "/team/ryan-nelson.webp", width: 600, height: 800 },
  },
  {
    name: "Navya Maria Vincent",
    role: "Student Branch Joint Secretary",
    klass: "S7 EB",
    email: "navyamariavincent@ieee.org",
    photo: { src: "/team/navya-maria-vincent.webp", width: 600, height: 800 },
  },
  {
    name: "Joseph Hamlin",
    role: "Student Branch Treasurer",
    klass: "S7 EA",
    // The two sources disagree: `jhamlim@ieee.org` in core_team_details.txt,
    // `jhamlin@ieee.org` in the ExeCom PDF. The PDF's spelling matches his
    // surname, so it wins — but this is a live mailto and needs confirming.
    email: "jhamlin@ieee.org",
    photo: { src: "/team/joseph-hamlin.webp", width: 533, height: 800 },
  },
];

/**
 * Seventeen bands: the seven branch-wide roles first, then the ten societies
 * and chapters in the order the PDF lists them.
 */
export const execom: ExecomGroup[] = [
  {
    id: "webmasters",
    title: "Webmasters",
    defaultOpen: true,
    members: [
      { name: "Devadathan MR", role: "Webmaster", klass: "S5 DS" },
      { name: "Niranjan V S", role: "Webmaster", klass: "S3 DSA" },
      { name: "Josin Joiy", role: "Webmaster", klass: "S3 AI" },
    ],
  },
  {
    id: "electronic-communications",
    title: "Electronic Communications",
    members: [
      { name: "Noel Eldho Nommy", role: "Electronic Communications Coordinator", klass: "S3 CS" },
      { name: "Shyamjith CP", role: "Electronic Communications Coordinator", klass: "S5 CA" },
    ],
  },
  {
    id: "social-media",
    title: "Social Media",
    members: [
      { name: "Alphin Philip", role: "Social Media Manager", klass: "S5 LA" },
      { name: "Gouri S Prakash", role: "Social Media Manager", klass: "S5 LB" },
    ],
  },
  {
    id: "membership-development",
    title: "Membership Development",
    members: [
      { name: "Navaneetha Sinoj", role: "Membership Development Coordinator", klass: "S5 LA" },
    ],
  },
  {
    id: "program",
    title: "Program",
    members: [{ name: "Mohammed Aflah T", role: "Program Coordinator", klass: "S5 CS" }],
  },
  {
    id: "technical",
    title: "Technical",
    members: [{ name: "Sreehari Jayan", role: "Technical Coordinator", klass: "S7 EB" }],
  },
  {
    id: "projects-lab",
    title: "Projects & Lab",
    members: [{ name: "Madhav K Anil", role: "Projects and Lab Coordinator", klass: "S5 LA" }],
  },
  {
    id: "computer-society",
    title: "Computer Society",
    members: [
      { name: "Ameena R", role: "Chair", klass: "S7 DS" },
      { name: "Adithya Krishna", role: "Secretary", klass: "S5 EB" },
    ],
  },
  {
    id: "communications-society",
    title: "Communications Society",
    members: [
      { name: "Sooraj N S", role: "Chair", klass: "S5 EB" },
      { name: "Meritta Elizabeth S", role: "Secretary", klass: "S5 LA" },
    ],
  },
  {
    id: "robotics-automation",
    title: "Robotics and Automation Society",
    members: [
      { name: "Kalyani B", role: "Chair", klass: "S5 LB" },
      { name: "Sivapriya P H", role: "Secretary", klass: "S5 LB" },
    ],
  },
  {
    id: "power-energy",
    title: "Power and Energy Society",
    members: [
      { name: "Adwaith T M", role: "Chair", klass: "S5 AI" },
      { name: "Hridhya Elizabeth", role: "Secretary", klass: "S3 LB" },
    ],
  },
  {
    id: "industry-applications",
    title: "Industry Applications Society",
    members: [
      { name: "Deeya Saju", role: "Chair", klass: "S5 DS" },
      { name: "Abhishek C S", role: "Secretary", klass: "S5 LA" },
    ],
  },
  {
    id: "ie-pels",
    title: "IE/PELS Jt. Chapter",
    members: [
      { name: "Gauthami C", role: "Chair", klass: "S5 LB" },
      { name: "Jinta Maria Joby", role: "Secretary", klass: "S3 DSB" },
    ],
  },
  {
    id: "signal-processing",
    title: "Signal Processing Society",
    members: [
      { name: "Alwafa Ziyad", role: "Chair", klass: "S5 LB" },
      { name: "Shreya Zubin Nair", role: "Secretary", klass: "S3 CS" },
    ],
  },
  {
    id: "wie",
    title: "WiE Affinity Group",
    members: [
      { name: "Shifa Usman", role: "Chair", klass: "S5 DS" },
      { name: "Alna Biju Gregory", role: "Secretary", klass: "S5 CS" },
    ],
  },
  {
    id: "sight",
    title: "SIGHT",
    members: [
      { name: "Abhishek K M", role: "Chair", klass: "S7 EA" },
      { name: "George Sunibabu", role: "Secretary", klass: "S5 LB" },
    ],
  },
  {
    id: "vehicular-technology",
    title: "Vehicular Technology Society",
    members: [
      { name: "Leethiya Francis", role: "Chair", klass: "S5 EB" },
      { name: "Akash I", role: "Secretary", klass: "S7 MB" },
    ],
  },
];
