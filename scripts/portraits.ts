/**
 * ExeCom portrait pipeline.
 *
 * Every source is a phone photo at a different size, orientation and aspect.
 * The team page frames portraits at 4:5 (`.portrait-frame`), so each one is
 * cropped to 4:5 HERE rather than left to `object-fit: cover` — a blanket
 * `object-position: center 18%` guesses right on a tight headshot and wrong on
 * a full-body shot, and half this batch is the second kind.
 *
 * EXIF is stripped, not incidentally but on purpose: these are personal phone
 * photos and several carry GPS tags.
 *
 * Run with `node scripts/portraits.ts` from the repo root. Needs ImageMagick 7
 * on PATH, built with the heic and webp delegates — two of the originals are
 * HEIC. It rewrites every file it lists, so it is safe to re-run after
 * retuning one crop.
 */

import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";

const SRC = "images/execom_photos";
const OUT = "public/team";

const TARGET_AR = 4 / 5;
const OUT_W = 640;
const OUT_H = 800;
const QUALITY = 92;

/**
 * Crop box, as fractions of the ORIENTED source.
 * `cw` is the crop width; the height follows from the 4:5 target. `cx`/`cy`
 * are the crop centre. Omitted fields fall back to the default rule: full
 * available width, and the vertical slack split 10/90 so the frame sits high
 * and keeps the face.
 */
interface Crop {
  cx?: number;
  cy?: number;
  cw?: number;
}

interface Job {
  file: string;
  slug: string;
  crop?: Crop;
}

/**
 * Read off the originals. Only the badly framed ones carry numbers — the rest
 * are already head-and-shoulders and the default rule frames them correctly.
 */
const JOBS: Job[] = [
  // Standing under a tree at half-length; pulled in to head-and-shoulders.
  { file: "1000016875 - Abhishek C S.heic", slug: "abhishek-c-s", crop: { cx: 0.53, cy: 0.479, cw: 0.827 } },
  // Studio shot printed inside a white border, subject small and centred.
  { file: "1769101863713~2 - Noel Eldho Nommy.png", slug: "noel-eldho-nommy", crop: { cx: 0.485, cy: 0.325, cw: 0.237 } },
  { file: "1769310741469 - Alphin Philip.png", slug: "alphin-philip", crop: { cx: 0.419, cy: 0.415, cw: 0.81 } },
  { file: "20251026_170411 - Devadathan M R.jpg", slug: "devadathan-mr" },
  // Two were sent; the later one is the plain-background frontal shot.
  { file: "20260130_181932 - Shreya Nair.jpg", slug: "shreya-zubin-nair" },
  { file: "8b14082d-665d-4eb1-ae38-8eef84add518 - Gouri Prakash.jpeg", slug: "gouri-s-prakash" },
  { file: "Alwafaziyad_programtech_page - ALWAFA ZIYAD.jpg", slug: "alwafa-ziyad" },
  { file: "deeya photo - Deeya Saju.jpeg", slug: "deeya-saju" },
  { file: "IMG_0861 - Mohammed Aflah.jpeg", slug: "mohammed-aflah-t" },
  // 4000x6000; face sits low and right of centre.
  { file: "IMG_1783 - ADWAITH T M.JPG", slug: "adwaith-t-m", crop: { cx: 0.56, cy: 0.545, cw: 0.85 } },
  { file: "IMG-20211110-WA0001 - Hridhya Elizabeth.jpg", slug: "hridhya-elizabeth", crop: { cx: 0.507, cy: 0.494, cw: 0.75 } },
  { file: "IMG-20240629-WA0035 - Alna Biju.jpg", slug: "alna-biju-gregory", crop: { cx: 0.5, cy: 0.434, cw: 0.781 } },
  { file: "IMG_20250307_155629_596 - Shifa Usman.jpg", slug: "shifa-usman" },
  { file: "IMG_20251002_191647792 (2) - Kalyani B.jpg", slug: "kalyani-b", crop: { cx: 0.473, cy: 0.421, cw: 0.8 } },
  // Standing mid-path, the smallest subject in the batch.
  { file: "IMG-20251019-WA0101~3 - George.jpg", slug: "george-sunibabu", crop: { cx: 0.487, cy: 0.435, cw: 0.507 } },
  // Seated, whole bench in frame.
  { file: "IMG-20251021-WA0033 - Jinta.jpg", slug: "jinta-maria-joby", crop: { cx: 0.538, cy: 0.468, cw: 0.586 } },
  { file: "IMG_20260123_012205 - Sivapriya PH.jpg", slug: "sivapriya-p-h" },
  { file: "IMG_20260123_185334 - Adithya Krishna.jpg", slug: "adithya-krishna", crop: { cx: 0.533, cy: 0.467, cw: 0.897 } },
  // Low and left of a tall palm; the default rule frames the tree.
  { file: "IMG-20260123-WA0087 (1) - Meritta Elizabeth S.jpg", slug: "meritta-elizabeth-s", crop: { cx: 0.494, cy: 0.622, cw: 0.564 } },
  // Full-length, standing at the far side of a courtyard.
  { file: "IMG_6361 - Navaneetha Sinoj.heic", slug: "navaneetha-sinoj", crop: { cx: 0.473, cy: 0.519, cw: 0.45 } },
  { file: "me - Niranjan VS.jpg", slug: "niranjan-v-s", crop: { cx: 0.53, cy: 0.508, cw: 0.757 } },
  { file: "Screenshot_20260122-223813 - Gauthami C.png", slug: "gauthami-c", crop: { cx: 0.52, cy: 0.485, cw: 0.625 } },
  // 1080x2400 phone screenshot, so the default 10% slack lands the face low.
  { file: "Screenshot_2026-01-23-08-07-09-62_6012fa4d4ddec268fc5c7112cbb265e7 - Josin Jojy.jpg", slug: "josin-jojy", crop: { cx: 0.5, cy: 0.439, cw: 1 } },
  // Face sits right of centre with a palace filling the other half.
  { file: "sooraj ieee photo - SOORAJ N S.jpg", slug: "sooraj-n-s", crop: { cx: 0.59, cy: 0.55, cw: 0.8 } },
];

function orientedSize(file: string): { w: number; h: number } {
  const out = execFileSync("magick", [`${file}[0]`, "-auto-orient", "-format", "%w %h", "info:"], {
    encoding: "utf8",
  });
  const [w, h] = out.trim().split(/\s+/).map(Number);
  return { w, h };
}

/** Largest 4:5 box that fits, then the override applied and clamped inside. */
function cropRect(W: number, H: number, crop?: Crop) {
  const maxW = Math.min(W, H * TARGET_AR);
  let w = crop?.cw === undefined ? Math.round(maxW) : Math.round(crop.cw * W);
  let h = Math.round(w / TARGET_AR);

  // An override wide enough to overflow the source is shrunk to fit, never
  // padded — a letterboxed portrait would break the frame's flush edge.
  if (w > W) {
    w = W;
    h = Math.round(w / TARGET_AR);
  }
  if (h > H) {
    h = H;
    w = Math.round(h * TARGET_AR);
  }

  const cx = crop?.cx ?? 0.5;
  // Default: 10% of the vertical slack above the crop, so the frame rides high.
  const cy = crop?.cy ?? (0.1 * (H - h) + h / 2) / H;

  const x = Math.max(0, Math.min(W - w, Math.round(cx * W - w / 2)));
  const y = Math.max(0, Math.min(H - h, Math.round(cy * H - h / 2)));
  return { x, y, w, h };
}

/**
 * Four originals are deliberately absent from JOBS: Shreya's earlier take, and
 * the three core officers whose portraits already shipped from this same drop
 * at their own aspect ratios. They are listed rather than silently skipped, so
 * a genuinely forgotten file is visible on the next run.
 */
const known = new Set(JOBS.map((j) => j.file));
const stray = readdirSync(SRC).filter((f) => !f.startsWith(".") && !known.has(f));
if (stray.length) console.log(`skipped: ${stray.join(", ")}`);

for (const job of JOBS) {
  const src = path.join(SRC, job.file);
  const dst = path.join(OUT, `${job.slug}.webp`);
  const { w: W, h: H } = orientedSize(src);
  const r = cropRect(W, H, job.crop);

  execFileSync("magick", [
    `${src}[0]`,
    "-auto-orient",
    "-crop", `${r.w}x${r.h}+${r.x}+${r.y}`,
    "+repage",
    "-filter", "Lanczos",
    "-resize", `${OUT_W}x${OUT_H}!`,
    // Downscaling softens; a light pass puts the edges back without haloing.
    "-unsharp", "0x0.75+0.75+0.008",
    "-strip",
    "-define", "webp:method=6",
    "-quality", String(QUALITY),
    dst,
  ]);

  console.log(`${job.slug.padEnd(22)} ${W}x${H} -> ${r.w}x${r.h}+${r.x}+${r.y}`);
}
