/**
 * The 2026 ExeCom, transcribed from `docs/IEEE MACE SB ExeCom 2026.pdf` and
 * `docs/core_team_details.txt`.
 *
 * CONTACT DETAILS ARE PUBLISHED, by decision of the branch. Every ExeCom
 * member carries the email and mobile number the source PDF lists, and about
 * twenty of those emails are personal Gmail rather than an institutional
 * address. This page is indexable, so all of it is scrapable. The earlier
 * revision of this file withheld them on the argument that holding office is
 * public but a student's mobile number is not; that argument was overruled,
 * and the note stays here so the next person knows it was a choice.
 *
 * IEEE membership IDs remain out. They were never asked for and they identify
 * an account, not a person to contact.
 *
 * Numbers are stored E.164 so the `tel:` link is unambiguous, and formatted
 * for display by `formatPhone`.
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
  /** Office bearers publish their `@ieee.org` address; the rest publish
      whatever the roster lists, which is usually a personal Gmail. */
  email?: string;
  /** E.164, no spaces. Rendered through `formatPhone`. Absent for faculty. */
  phone?: string;
  photo?: Photo;
}

/**
 * `+919876543210` reads as `+91 98765 43210`. Indian mobile numbers group
 * 5-5 after the country code, and every number in this file is one — so the
 * split is hardcoded rather than pulling in a formatting library for a single
 * shape. Anything that is not a 13-character +91 number is returned untouched
 * instead of being sliced into nonsense.
 */
export function formatPhone(e164: string): string {
  if (!/^\+91\d{10}$/.test(e164)) return e164;
  return `+91 ${e164.slice(3, 8)} ${e164.slice(8)}`;
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
    phone: "+918848668497",
    photo: { src: "/team/jes-gigo.webp", width: 533, height: 800 },
  },
  {
    name: "Jassim Mohammed Salim",
    role: "Student Branch Vice Chair",
    klass: "S5 LA",
    email: "jassimmohdsalim@ieee.org",
    phone: "+917034147924",
    // The one landscape original. Cropped to the shared portrait frame.
    photo: { src: "/team/jassim-mohammed-salim.webp", width: 800, height: 533 },
  },
  {
    name: "Ryan Nelson",
    role: "Student Branch Secretary",
    klass: "S5 LA",
    email: "ryannelson@ieee.org",
    phone: "+919446108674",
    photo: { src: "/team/ryan-nelson.webp", width: 600, height: 800 },
  },
  {
    name: "Navya Maria Vincent",
    role: "Student Branch Joint Secretary",
    klass: "S7 EB",
    email: "navyamariavincent@ieee.org",
    phone: "+916238285215",
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
    phone: "+918590146947",
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
      {
        name: "Devadathan MR",
        role: "Webmaster",
        klass: "S5 DS",
        email: "devadathanappu69@gmail.com",
        phone: "+916238463653",
      },
      {
        name: "Niranjan V S",
        role: "Webmaster",
        klass: "S3 DSA",
        email: "mail.niranjanvs@gmail.com",
        phone: "+919448130521",
      },
      {
        name: "Josin Jojy",
        role: "Webmaster",
        klass: "S3 AI",
        email: "josinjojy1@gmail.com",
        phone: "+917012542699",
      },
    ],
  },
  {
    id: "electronic-communications",
    title: "Electronic Communications",
    members: [
      {
        name: "Noel Eldho Nommy",
        role: "Electronic Communications Coordinator",
        klass: "S3 CS",
        email: "noelnommy@gmail.com",
        phone: "+917561099955",
      },
      {
        name: "Shyamjith CP",
        role: "Electronic Communications Coordinator",
        klass: "S5 CA",
        email: "shyamjithjr@gmail.com",
        phone: "+919995407850",
      },
    ],
  },
  {
    id: "social-media",
    title: "Social Media",
    // The source PDF lists BOTH managers against 9961511871. Gouri's is
    // corrected here from a direct confirmation; Alphin keeps the roster
    // number, which the duplicate suggests was the one copied down twice.
    members: [
      {
        name: "Alphin Philip",
        role: "Social Media Manager",
        klass: "S5 LA",
        email: "4221alphin@gmail.com",
        phone: "+919961511871",
      },
      {
        name: "Gouri S Prakash",
        role: "Social Media Manager",
        klass: "S5 LB",
        email: "gouriprakash42@gmail.com",
        phone: "+916238581463",
      },
    ],
  },
  {
    id: "membership-development",
    title: "Membership Development",
    members: [
      {
        name: "Navaneetha Sinoj",
        role: "Membership Development Coordinator",
        klass: "S5 LA",
        email: "navaneethasinoj@gmail.com",
        phone: "+919061060543",
      },
    ],
  },
  {
    id: "program",
    title: "Program",
    members: [
      {
        name: "Mohammed Aflah T",
        role: "Program Coordinator",
        klass: "S5 CS",
        email: "mohammedaflaht99@ieee.org",
        phone: "+919142644807",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical",
    members: [
      {
        name: "Sreehari Jayan",
        role: "Technical Coordinator",
        klass: "S7 EB",
        email: "sriharijayan32@gmail.com",
        phone: "+919746236296",
      },
    ],
  },
  {
    id: "projects-lab",
    title: "Projects & Lab",
    members: [
      {
        name: "Madhav K Anil",
        role: "Projects and Lab Coordinator",
        klass: "S5 LA",
        email: "madhavkanil@ieee.org",
        phone: "+919074644473",
      },
    ],
  },
  {
    id: "computer-society",
    title: "Computer Society",
    members: [
      {
        name: "Ameena R",
        role: "Chair",
        klass: "S7 DS",
        email: "ameenarapheeque@ieee.org",
        phone: "+918138997096",
      },
      {
        name: "Adithya Krishna",
        role: "Secretary",
        klass: "S5 EB",
        email: "adithyakrishna027@gmail.com",
        phone: "+919656984266",
      },
    ],
  },
  {
    id: "communications-society",
    title: "Communications Society",
    members: [
      {
        name: "Sooraj N S",
        role: "Chair",
        klass: "S5 EB",
        email: "nssooraj77@gmail.com",
        phone: "+918304811633",
      },
      {
        name: "Meritta Elizabeth S",
        role: "Secretary",
        klass: "S5 LA",
        email: "merittaelizabeth02@gmail.com",
        phone: "+919544869455",
      },
    ],
  },
  {
    id: "robotics-automation",
    title: "Robotics and Automation Society",
    members: [
      {
        name: "Kalyani B",
        role: "Chair",
        klass: "S5 LB",
        email: "kalyanib@ieee.org",
        phone: "+917025592234",
      },
      {
        name: "Sivapriya P H",
        role: "Secretary",
        klass: "S5 LB",
        // The one college address on the roster. Left as listed.
        email: "b24ec105@mace.ac.in",
        phone: "+918848783282",
      },
    ],
  },
  {
    id: "power-energy",
    title: "Power and Energy Society",
    members: [
      {
        name: "Adwaith T M",
        role: "Chair",
        klass: "S5 AI",
        email: "adwaithtm06@gmail.com",
        phone: "+919447534755",
      },
      {
        name: "Hridhya Elizabeth",
        role: "Secretary",
        klass: "S3 LB",
        email: "elizabethhridhya@gmail.com",
        phone: "+916282398770",
      },
    ],
  },
  {
    id: "industry-applications",
    title: "Industry Applications Society",
    members: [
      {
        name: "Deeya Saju",
        role: "Chair",
        klass: "S5 DS",
        email: "deeyasaju28@gmail.com",
        phone: "+919496177329",
      },
      {
        name: "Abhishek C S",
        role: "Secretary",
        klass: "S5 LA",
        email: "abhishekcs892@gmail.com",
        phone: "+916238354892",
      },
    ],
  },
  {
    id: "ie-pels",
    title: "IE/PELS Jt. Chapter",
    members: [
      {
        name: "Gauthami C",
        role: "Chair",
        klass: "S5 LB",
        email: "gaumichandra2006@gmail.com",
        phone: "+919037591127",
      },
      {
        name: "Jinta Maria Joby",
        role: "Secretary",
        klass: "S3 DSB",
        email: "jintamariyajoby@gmail.com",
        phone: "+917902978504",
      },
    ],
  },
  {
    id: "signal-processing",
    title: "Signal Processing Society",
    members: [
      {
        name: "Alwafa Ziyad",
        role: "Chair",
        klass: "S5 LB",
        email: "alwafaziyad@gmail.com",
        phone: "+919207458276",
      },
      {
        name: "Shreya Zubin Nair",
        role: "Secretary",
        // Was `S3 CS` here; the PDF says `S2 DS`, so the branch letters were a
        // transcription slip, not a term the semester bump touched.
        klass: "S3 DS",
        email: "shreyazubin7@gmail.com",
        phone: "+917902271818",
      },
    ],
  },
  {
    id: "wie",
    title: "WiE Affinity Group",
    members: [
      {
        name: "Shifa Usman",
        role: "Chair",
        klass: "S5 DS",
        email: "shifausman198961@ieee.org",
        phone: "+919074331981",
      },
      {
        name: "Alna Biju Gregory",
        role: "Secretary",
        klass: "S5 CS",
        email: "alnabiju0@gmail.com",
        phone: "+917907654173",
      },
    ],
  },
  {
    id: "sight",
    title: "SIGHT",
    members: [
      {
        name: "Abhishek K M",
        role: "Chair",
        klass: "S7 EA",
        email: "abhishekkm.email@gmail.com",
        phone: "+918714157001",
      },
      {
        name: "George Sunibabu",
        role: "Secretary",
        klass: "S5 LB",
        email: "georgeoffacts6@gmail.com",
        phone: "+917306556875",
      },
    ],
  },
  {
    id: "vehicular-technology",
    title: "Vehicular Technology Society",
    members: [
      {
        name: "Leethiya Francis",
        role: "Chair",
        klass: "S5 EB",
        email: "leethiyacf@gmail.com",
        phone: "+918547795641",
      },
      {
        name: "Akash I",
        role: "Secretary",
        klass: "S7 MB",
        email: "iamakash142@gmail.com",
        phone: "+917736941605",
      },
    ],
  },
];
