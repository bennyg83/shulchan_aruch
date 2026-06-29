import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  bh1a,
  bh1b,
  bh1d,
  bh1g,
  bh2a,
  bh2b,
  bh3,
  bh5a,
  bh5b,
  bh5g,
  cs1,
  ea3,
  er1,
  er2,
  er3,
  er4,
  er5,
  er6,
  gra1b,
  gra1g,
  gra2,
  gra3,
  gra4,
  gra5a,
  gra5b,
  gra6a,
  gra6b,
  gra6g,
  kh1,
  kh2,
  kh3,
} from "./pipeline/work/_siman223-part2of4-en.mjs";

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const gra = "output/siman_223/beur-hagra/part-001.txt";
const bhc = "output/siman_223/biur-halacha/part-001.txt";
const csf = "output/siman_223/chatam-sofer/part-001.txt";
const er = "output/siman_223/eliyah-rabbah/part-001.txt";
const ea = "output/siman_223/eshel-avraham/part-001.txt";
const kh = "output/siman_223/kaf-hachayyim/part-001.txt";

patch(gra, "beur-hagra", 1, "ב", gra1b);
patch(gra, "beur-hagra", 1, "ג", gra1g);
patch(gra, "beur-hagra", 2, "_", gra2);
patch(gra, "beur-hagra", 3, "_", gra3);
patch(gra, "beur-hagra", 4, "_", gra4);
patch(gra, "beur-hagra", 5, "א", gra5a);
patch(gra, "beur-hagra", 5, "ב", gra5b);
patch(gra, "beur-hagra", 6, "א", gra6a);
patch(gra, "beur-hagra", 6, "ב", gra6b);
patch(gra, "beur-hagra", 6, "ג", gra6g);

patch(bhc, "biur-halacha", 1, "א", bh1a);
patch(bhc, "biur-halacha", 1, "ב", bh1b);
patch(bhc, "biur-halacha", 1, "ג", bh1g);
patch(bhc, "biur-halacha", 1, "ד", bh1d);
patch(bhc, "biur-halacha", 2, "א", bh2a);
patch(bhc, "biur-halacha", 2, "ב", bh2b);
patch(bhc, "biur-halacha", 3, "_", bh3);
patch(bhc, "biur-halacha", 5, "א", bh5a);
patch(bhc, "biur-halacha", 5, "ב", bh5b);
patch(bhc, "biur-halacha", 5, "ג", bh5g);

patch(csf, "chatam-sofer", 1, "_", cs1);
patch(er, "eliyah-rabbah", 1, "_", er1);
patch(er, "eliyah-rabbah", 2, "_", er2);
patch(er, "eliyah-rabbah", 3, "_", er3);
patch(er, "eliyah-rabbah", 4, "_", er4);
patch(er, "eliyah-rabbah", 5, "_", er5);
patch(er, "eliyah-rabbah", 6, "_", er6);
patch(ea, "eshel-avraham", 3, "_", ea3);
patch(kh, "kaf-hachayyim", 1, "_", kh1);
patch(kh, "kaf-hachayyim", 2, "_", kh2);
patch(kh, "kaf-hachayyim", 3, "_", kh3);

const PATCH_COUNT = 31;
console.log(`ok siman 223 part 2/4 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-223-part2of4.json",
);
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
for (const it of queue.items || []) {
  const abs = path.join(OC_ROOT, "output", it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(abs, "utf8"));
  const b = blocks.find(
    (x) =>
      x.slug === it.slug &&
      String(x.seif) === String(it.seif) &&
      String(x.marker) === String(it.marker),
  );
  if (!b) throw new Error(`Block missing in file: ${it.id}`);
  it.rawBlock = serializeBlock(b);
}
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${queuePath}`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bDr\.\b/i,
  /\bartist\b/i,
  /\bgarage\b/i,
  /\bBible\b/i,
  /\bKGB\b/i,
  /\bDaaaaaaaa+\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
for (const it of queue.items || []) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${queue.items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${queue.items.length - fail}/${queue.items.length} blocks`);
