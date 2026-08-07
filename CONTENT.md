# IEEE MACE SB — Site Content Inventory

What every part of the site actually *says* and *holds*. Content only — no layout, styling, or animation notes. Written from the live source (`src/`), not from `CONTENT.md` (which is stale: it still describes the old single-page anchor site).

**Site shape:** 7 routes — `/` (Home), `/about`, `/events`, `/team`, `/gallery`, `/playground`, `/contact`, plus a 404 page.

---

## Global chrome (every page)

### Site metadata
- **Title:** IEEE MACE SB
- **Description:** IEEE Student Branch of Mar Athanasius College of Engineering, Kothamangalam. Bridging the gap between engineering theory and professional impact since 1988.
- **Favicon:** `/logo.svg`

### Navbar
- **Brand:** logo mark + wordmark "IEEE *MACE SB*", links to `/`
- **Nav links:** About Us · Events · Team · Gallery · Playground · Contact
- **CTA:** Join IEEE → https://www.ieee.org
- Mobile burger opens the same links + the same Join IEEE CTA

### Ticker (scrolling strip above footer)
One repeating phrase string:
`ADVANCING TECHNOLOGY FOR HUMANITY · SINCE 1988 · >.HACK(); · SPARC · STEM OUTREACH · HACK-HER · HACK-A-ADDICT · LIGHT THE LIVES · CONNECT THE LIVES ·`

### Footer
- **Giant background wordmark:** IEEE MACE SB
- **Brand:** logo, "IEEE *MACE SB*", tagline "Student Branch"
- **Blurb:** Mar Athanasius College of Engineering Student Branch of IEEE. Promoting excellence and engineering innovation for the benefit of humanity since 1988.
- **Pages column:** the six nav links
- **Useful Links column:** IEEE.org → https://www.ieee.org
- **Connect Online column:** Instagram · LinkedIn — ⚠️ both `href="#"`, no real URLs yet
- **Copyright:** © [current year] IEEE MACE. All rights reserved.
- **Credit:** Designed and Developed by IEEE MACE SB WebTeam
- **Back to top ↑** button

### Preloader
Counter only: `00 / 100`. No words.

### Easter egg (hidden)
Triggered by the Konami sequence (↑↑↓↓←→←→ B A) or 5 fast clicks on the navbar logo.
- **Random toast messages:** "Sparks!" · "Circuit closed." · "Nice find." · "Powered up."
- Konami on desktop instead starts a spark-collect mini-game: "Collect all the sparks!" → on finish, "All sparks collected!"

---

## Home (`/`)

### Hero
- **Margin label:** EST. 1988 · KOTHAMANGALAM · 32041
- **Badge:** IEEE MACE Student Branch
- **Heading:** Empowering Innovation, Shaping Tomorrow.
- **CTAs:** Join Us Today → ieee.org · Explore Branch → `/about`
- **Scroll cue:** "Scroll" → `/about`
- ⚠️ The lead paragraph from `CONTENT.md` ("Bridging the gap between engineering theory and professional impact…") is **not on the page** — it now only survives as the site meta description.

### Foundation — "What is IEEE" primer
- **Eyebrow:** Foundation
- **Heading:** Global Tech Leadership
- **Subtext:** Understand the foundation of the world's largest technical professional organization dedicated to advancing technology.

Three cards:
1. **What is IEEE?** — IEEE is a global organization that develops standards to ensure the consistency, compatibility, and interoperability of technology. Covering electronics, telecommunications, and computing, IEEE enhances product reliability and fosters innovation across industries.
2. **Our Mission** — IEEE's core purpose is to foster technological innovation and excellence for the benefit of humanity. We aim to inspire a global community through IEEE's highly cited publications, conferences, technology standards, and professional and educational activities.
3. **Our Vision** — IEEE is essential to the global technical community and to technical professionals everywhere, and is universally recognized for the contributions of technology and of technical professionals in improving global conditions.

### Membership benefits
- **Eyebrow:** Membership Benefits
- **Heading:** Unlock a World of Technical Opportunity
- **Subtext:** Joining IEEE is not just about a membership card — it is an investment in your career, your network, and your future. Student members gain immediate access to global resources, funding, and leadership roles.
- **Headline stat:** 500,000+ — "Members in Over 160 Countries" — "Join the largest technical professional network in the world."
  - ⚠️ Inconsistent: the counter animates to **500,000** but the label says "Over 160 Countries" and `CONTENT.md` says 400,000+. Pick one figure.

Three benefits:
1. **Travel Grants, Scholarships & Fellowships** — IEEE offers generous travel grants for student members to attend premium international conferences and present research papers, alongside academic scholarships and research fellowships.
2. **IEEE eLearning Library Access** — Unlock online access to a massive repository of peer-reviewed instructional courses, tutorials, and materials spanning core engineering disciplines, robotics, and emerging technologies.
3. **Global Standards Exposure** — Access globally recognized standards that shape interoperability and product reliability. Learn standard development practices and collaborate on consensus processes that guide global technology.

### A Little Detour (fun section)
- **Eyebrow:** Just For Fun
- **Heading:** A Little Detour
- Three blocks, labelled *Fun fact wheel*, *Reaction test*, *Signal runner* — the same three toys as `/playground` (see below).
- A subtext line exists but is commented out: "No grades, no deadlines — spin for a fact, add a spark, jump a few obstacles."

---

## About (`/about`)

**Page description:** The legacy of Mar Athanasius College of Engineering and IEEE Student Branch MACE, plus the IEEE Societies and Affinity Groups we cover.

### Institutional heritage
- **Eyebrow:** Institutional Heritage
- **Heading:** About MACE & IEEE MACE SB
- **Subtext:** Discover the legacy of engineering leadership and professional development that defines our institution.
- **Timeline markers:** 1961 · 1988 · TODAY

**Sheet A-01 — tag "MACE Legacy" — "Mar Athanasius College of Engineering"**
- Mar Athanasius College of Engineering pioneered engineering education in central Kerala in 1961. Managed by the Mar Athanasius College Association and aided by the Government of Kerala, the college was the first in Asia under Christian management.
- Affiliated to APJ Abdul Kalam Technological University, MACE has grown to host six full-fledged departments alongside auxiliary departments of Mathematics, and Science and Humanities.
- Title block: ESTD 1961 · LOC KOTHAMANGALAM, KERALA · SHEET A-01

**Sheet A-02 — tag "IEEE MACE SB" — "Pioneering Professional Excellence"**
- Established on November 17th, 1988, the IEEE Student Branch MACE (Code: 32041) has served the student community for the past 38 years, consistently aligning its initiatives with the vision and mission of IEEE — advancing technology for the benefit of humanity.
- Driven by a team of passionate engineering students committed to learning and excellence, we ensure that every initiative helps members develop their technical and professional skills while empowering them to contribute meaningfully to an ever-evolving world of technology. From hackathons and technical workshops to community outreach and social initiatives, every event is designed to create opportunities for learning, innovation, and collaboration.
- We offer a dedicated Hardware Laboratory for technical project development and regularly conduct training programs, talks, professional awareness sessions, hackathons, debates, and workshops.
- Title block: ESTD 1988 · CODE 32041 · SHEET A-02

**Counter stats:** 300+ Members · 38 Years legacy · 1988 Established
- ⚠️ "300+ Members" is a placeholder — no verified figure in `docs/site-info.txt`.
- ⚠️ "38 years" and "past 38 years" are hardcoded, not derived from 1988. Both go stale annually.

### Societies & Affinity Groups
- **Eyebrow:** Subdivisions
- **Heading:** Societies & Affinity Groups
- **Subtext:** Our Student Branch consists of multiple IEEE Societies and Affinity Groups, providing specialized training and networking opportunities in various tech domains.
- **Per-card link:** Visit Society Portal

Nine chapters:

| Society | Description | Portal |
|---|---|---|
| Computer Society | The IEEE Computer Society serves as a leading hub for knowledge, innovation, and community among computer science and engineering professionals globally. It supports individuals across all career stages with essential resources. | computer.org |
| Robotics and Automation Society (RAS) | The IEEE Robotics and Automation Society (RAS) dedicates itself to advancing robotics and automation through scientific and technological knowledge exchange, promoting benefits to the profession and society. | ieee-ras.org |
| Signal Processing Society (SPS) | The IEEE Signal Processing Society (SPS) leads advancements in signal processing and machine learning. It promotes global research, education, and collaboration among engineers and scientists. | signalprocessingsociety.org |
| Communications Society (ComSoc) | The IEEE Communications Society facilitates technological innovation and global information exchange among technical professionals. It supports member development through educational resources. | comsoc.org |
| Industry Applications Society (IAS) | The IEEE Industry Applications Society leads in advancing theory and practice for safe, sustainable, reliable, and smart electrical systems worldwide, supporting technology designs and manufacturing. | ias.ieee.org |
| Power & Energy Society (PES) | The IEEE Power & Energy Society (PES) serves as a premier global platform for advancing technological innovations in the electric power industry, setting standards and transmission research. | ieee-pes.org |
| IE/PELS Joint Chapter | The IEEE Power Electronics Society (PELS) and Industry Electronics Society (IES) joint chapter advances electronic power conversion and enhances industrial processes through control systems. | ieee-pels.org |
| Women in Engineering (WIE) | IEEE Women in Engineering (WIE) is a global network committed to promoting women in engineering and science, inspiring girls to pursue technical careers and fostering a diverse community. | wie.ieee.org |
| SIGHT Group | The IEEE Special Interest Group on Humanitarian Technology (SIGHT) is a global network of IEEE volunteers partnering with underserved communities to leverage technology for sustainable development. | sight.ieee.org |

⚠️ **Vehicular Technology Society (VTS)** has a Chair and Secretary on the Team page and a poster in the gallery, but no card here. Ten societies exist in practice; nine are described.

---

## Events (`/events`)

**Page description:** Flagship events and initiatives hosted by IEEE MACE SB — hackathons, speaker series, outreach, and humanitarian projects.

- **Eyebrow:** Annual Calendar
- **Heading:** Major Events & Initiatives
- **Subtext:** Discover the flagship activities hosted by IEEE MACE SB that drive community collaboration, technical skill-building, and professional growth.

Nine entries, each with a category tag:

1. **>.hack();_** — *Flagship Hackathon* — The annual flagship event of IEEE MACE SB, a cornerstone of the branch for the past seven years. Each edition gives college students a platform to turn ideas into impactful projects, and every year has brought a larger crop of innovative solutions from our budding engineers.
2. **SPARC** — *Speaker Series* — Conducted for the past five years and designed primarily for first-year students. Accomplished speakers from diverse fields share their experiences, insights and guidance, giving students perspective on personal growth, career planning and the opportunities ahead.
3. **STEM Initiative** — *School Outreach* — Interactive workshops, demonstrations and hands-on sessions that take STEM to school students across IoT and embedded systems, mechatronics, software development, and cybersecurity and data analytics. Each year the initiative reaches nearly 500 students across five schools.
4. **Hack-Her** — *Women In Tech* — A 24-hour ideation and implementation challenge exclusively for women, answering the under-representation of women in engineering and technology. Beyond technical skill it builds confidence, leadership, networking and peer learning.
5. **Hack-a-addict** — *Social Impact Hackathon* — A hackathon organised with the Lions Club to raise awareness of drug abuse and its effects. Participants proposed technically feasible, socially relevant ideas for prevention, awareness and rehabilitation while learning the real consequences of substance abuse.
6. **Light the Lives (LTL)** — *Humanitarian Project* — Kuttampuzha Grama Panchayat lacked access to reliable energy resources. With approval from the local authorities, a team of volunteers stayed in the locality for a week and installed two solar power systems, giving the community a dependable and sustainable source of electricity.
7. **Connect the Lives (CTL)** — *Humanitarian Project* — After LTL, the tribal colony at Uriyampetty raised the problem of children with limited access to schooling. A detailed survey led to a communication module at the local school for online classes, run by a trained resident teacher. A year on, it still serves the community.
8. **Fauna Flash** — *Humanitarian Technology* — An early warning system developed under the leadership of Madhav K. Anil that detects elephant movement in forest fringe areas and alerts nearby communities in real time, cutting the risk of human–elephant encounters and supporting coexistence.
9. **Enhance their Lives (ETL)** — *Upcoming Initiative* — A planned programme to establish sanitary pad incinerators and proper waste disposal systems in remote schools and underserved localities, offering a safe and environmentally responsible option while promoting menstrual hygiene awareness.

⚠️ Naming drift vs. `CONTENT.md`: "HACK-A-DDIT" → "Hack-a-addict", "Wild Elephant Tracker" → "Fauna Flash". The ticker still says "HACK-A-ADDICT". Settle on one spelling per event.

---

## Team (`/team`)

**Page description:** Meet the executive committee driving the strategy, operations, and vision of IEEE MACE SB.

Two sections.

### Section 1 — core office bearers (6 cards)
- **Eyebrow:** Branch Leadership
- **Heading:** Executive Committee
- **Subtext:** Meet the office bearers and technical advisors driving the strategy, operations, and vision of IEEE MACE SB.
- Each card carries: photo, NAME, ROLE, and either email + phone or the unit "IEEE MACE SB" when contact info isn't published.

| Name | Role | Email | Phone |
|---|---|---|---|
| Prof. Neethu Salim | Student Branch Counsellor | — | — |
| Jes Gigo | Student Branch Chair | jesgigo10@ieee.org | +91 88486 68497 |
| Jassim Mohammed Salim | Vice Chair | jassimmohdsalim@ieee.org | +91 70341 47924 |
| Ryan Nelson | Secretary | ryannelson@ieee.org | +91 94461 08674 |
| Navya Maria Vincent | Joint Secretary | navyamariavincent@ieee.org | +91 62382 85215 |
| Joseph Hamlin | Treasurer | jhamlim@ieee.org | +91 85901 46947 |

- **Hint below the grid:** "↓ 31 more below"

### Section 2 — full 2026 roster (31 members)
- **Eyebrow:** 2026 Roster
- **Heading:** Meet the Full ExeCom
- **Subtext:** Beyond the core office bearers, IEEE MACE SB's Executive Committee brings together student volunteers across every domain, society, and affinity group.
- Each entry shows NAME, ROLE (designation), CLASS. No contact info by design.
- Source: `docs/IEEE MACE SB ExeCom 2026.pdf` (36 total; the 5 officers above are excluded here so nobody appears twice).

**Domain coordinators**
- Webmasters — Devadathan MR (S5 DS) · Niranjan V S (S3 DSA) · Josin Jojy (S3 AI)
- Membership Development Coordinator — Navaneetha Sinoj (S5 LA)
- Electronic Communications Coordinator — Noel Eldho Nommy (S3 CS) · Shyamjth CP (S5 CA)
- Social Media Manager — Alphin Philip (S5 LA) · Gouri S Prakash (S5 LB)
- Program Coordinator — Mohammed Aflah T (S5 CS)
- Technical Coordinator — Sreehari Jayan (S7 EB)
- Projects and Lab Coordinator — Madhav K Anil (S5 LA)

**Society / affinity group Chair + Secretary pairs**
- Computer Society — Ameena R (S7 DS) · Adithya Krishna (S5 EB)
- Communications Society — Sooraj N S (S5 EB) · Meritta Elizabeth S (S5 LA)
- Robotics and Automation Society — Kalyani B (S5 LB) · Sivapriya P H (S5 LB)
- Power and Energy Society — Adwaith T M (S5 AI) · Hridhya Elizabeth (S3 LB)
- Industry Applications Society — Deeya Saju (S5 DS) · Abhishek C S (S5 LA)
- IE/PELS Joint Chapter — Gauthami C (S5 LB) · Jinta Maria Joby (S3 DSB)
- Signal Processing Society — Alwafa Ziyad (S5 LB) · Shreya Zubin Nair (S3 DS)
- Women in Engineering (WiE) — Shifa Usman (S5 DS) · Alna Biju Gregory (S5 CS)
- SIGHT — Abhishek K M (S7 EA) · George Sunibabu (S5 LB)
- Vehicular Technology Society — Leethiya Francis (S5 EB) · Akash I (S7 MB)

### Closing CTA
"Looking to join our committees or get involved?" → **Contact our team** → `/contact`

⚠️ Only the 6 core members have photos (`/public/team/*.webp`); all 31 roster entries fall back to a monogram.

---

## Gallery (`/gallery`)

**Page description / subtext:** A continuous reel of posters from our hackathons, workshops, conclaves, and outreach.
- **Eyebrow:** Visual Highlights
- **Heading:** Event Gallery

22 real event posters, each with a title and a "society · format" tag. Alt text is `Event poster — {title}`.

| # | Title | Tag |
|---|---|---|
| 01 | AKIASSC 2026 — Industry & Entrepreneurship | IAS · Student Conclave |
| 02 | Error 404 — Debugging Competition | Computer Society · Contest |
| 03 | Connect the Lives — Uriyampetty | SIGHT · Humanitarian Project |
| 04 | Morse Code Contest | IE/PELS · Technical Contest |
| 05 | AI Robotics for Space Sustainability | RAS · Distinguished Lecture |
| 06 | Women in Tech — Beyond the Stereotypes | ComSoc · Talk Session |
| 07 | Environment Day | SIGHT · Community Outreach |
| 08 | IEEE PES Day 2026 | PES · Online Session |
| 09 | IEEE SPS World of Opportunities | SPS · Interactive Talk |
| 10 | A Robo Roadmap — Passion to Profession | RAS · Talk Session |
| 11 | Women Leading Innovation for Sustainable Development | WIE · Panel Discussion |
| 12 | Engineering Your Professional Identity | IAS · Career Session |
| 13 | The Technology Behind Modern Grid Systems | IE/PELS · Talk Session |
| 14 | Farewell — >.hack(); Team | Student Branch · Community |
| 15 | Beginner's Guide to Agentic AI & n8n | Informatyka 6.0 · Talk Session |
| 16 | Understanding Gender Reality | WIE · Awareness Session |
| 17 | From Pixels to Decisions — Deep Learning | SPS · Distinguished Lecture |
| 18 | Unlocking Opportunities — SPS Scholarships | SPS · Guidance Session |
| 19 | Session 1 — Ethical AI | WIE Profept · Session Series |
| 20 | The Power Quest | PES Day · Quiz |
| 21 | Engineering Your Professional Identity — Rescheduled | IAS · Career Session |
| 22 | Career Pathways in EV & Automotive Industry | VTS · Talk Session |

Notes:
- Posters are recent *society-level sessions*, not the flagship events on `/events`. Only "Connect the Lives" overlaps. Nothing here shows >.hack();, SPARC, STEM, Hack-Her, or Light the Lives as events — just a >.hack(); team farewell.
- ⚠️ #12 and #21 are the same session (original + rescheduled) listed twice.
- Images are pre-optimized to 720px WebP via `npm run gallery`; a missing optimized file is a hard build error.

---

## Playground (`/playground`)

**Page description:** A small interactive corner of the IEEE MACE SB site — spin for a fun fact, test your reflexes, jump some obstacles.
- **Eyebrow:** Just For Fun
- **Heading:** The Playground

Three toys (the same three embedded on the home page):

**1. Fun fact wheel** — button reads "Spin for a fun fact" / "Spinning…". Ten facts:
- Apollo 11's guidance computer had less memory than it takes to load this page — about 64 kilobytes.
- QWERTY keyboards were designed to stop 1870s typewriters from jamming, not to slow you down.
- The first video game ran on an oscilloscope in 1958. It was tennis.
- The first computer mouse was a carved wooden block — the cord looked like a tail, hence the name.
- There are more mobile phones on Earth than toothbrushes.
- Firefox's mascot isn't a fox. It's a red panda. Nobody ever bothered to rename it.
- The Eiffel Tower grows over six inches taller every summer — heat expands the metal.
- Identical twins don't share fingerprints. The womb roughs them up differently for each twin.
- About 90% of people struck by lightning survive it.
- IEEE MACE SB was chartered on November 17, 1988, and we are still adding new projects.

**2. Reflex test** ("Reaction test" on home) — labelled "Reflex test — close the circuit". States: "Tap to start" → "Wait for it…" → "CLOSE THE CIRCUIT" → "Too soon — tap to retry". Shows result in ms and "Best: {n}ms".

**3. Signal runner** — endless jumper. HUD: "SCORE {n}" / "BEST {n}". States: "Tap or press space to start" → "Tap or press space to jump" → "Signal lost — tap or press space to retry".

---

## Contact (`/contact`)

**Page description:** Get in touch with IEEE MACE SB — Student Branch Headquarters at Mar Athanasius College of Engineering, Kothamangalam.

- **Eyebrow:** Get In Touch
- **Heading:** Connect With Our Team
- **Subtext:** Have questions about membership, events, or collaboration? Reach out to us through any of the channels below.
- **Console header:** TRANSMISSION // IEEE-MACE-SB

Three lines:
- **Student Branch Headquarters** — Mar Athanasius College of Engineering, Kothamangalam, Kerala - 686666, India
- **Call Us** — +91 8921931121
- **Email Us** — ieeemacesbofficial@gmail.com

⚠️ No contact form and **no embedded map** — `CONTENT.md` describes a Google Map that doesn't exist in the build. Phone and email also changed from the old values (+91 485 2822363 / info@ieeemace.org).

---

## 404 page

- **Eyebrow:** Error 404
- **Heading:** Signal Lost
- **Subtext:** That page doesn't exist — but since you're here, jump a few obstacles.
- Embeds the Signal runner game
- **CTA:** Back to safety → `/`

---

## Content gaps worth fixing

1. **Social links are dead** — footer Instagram and LinkedIn both point at `#`. Twitter/X, Facebook, YouTube from `CONTENT.md` were dropped entirely.
2. **`CONTENT.md` is stale** — describes the old single-page site: obsolete execom roster, old contact details, a Google Map, an anchor-based navbar. Either regenerate it from `src/lib/content.ts` or delete it.
3. **Member count "300+" is invented** — flagged as a placeholder in `CONTENT.md`, still shipping.
4. **Member figure contradiction** — home says 500,000+, `CONTENT.md` says 400,000+ (IEEE's public figure is ~400,000+).
5. **Hardcoded "38 years"** — appears in prose and in the stat counter; wrong every November unless derived from 1988.
6. **VTS has no society card** on `/about` despite having officers and a gallery poster.
7. **Event names drift** across `content.ts`, the ticker, and `CONTENT.md` (Hack-a-addict / HACK-A-DDIT / HACK-A-ADDICT; Fauna Flash / Wild Elephant Tracker).
8. **Hero has no lead paragraph** — the elevator pitch only lives in the meta description now.
9. **Duplicate gallery poster** (#12 / #21, same session rescheduled).
10. **Home and Playground share all three toys** verbatim — no reason to visit `/playground` after scrolling the home page.
