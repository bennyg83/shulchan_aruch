import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  mhs9,
  ma1,
  ma10,
  ma2,
  ma3,
  ma4,
  ma5,
  ma6,
  ma7,
  ma8,
  ma9,
  mc1,
  mc10,
  mc2,
  mc3,
  mc4,
  mc5,
  mc6,
  mc7,
  mc8,
  mc9,
  mb1a,
  mb1b,
  mb1g,
  mb10a,
  mb10b,
  mb2a,
} from "./pipeline/work/_siman-219-part3of5-en.mjs";

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

const mh = "output/siman_219/machatzit-hashekel/part-001.txt";
const ma = "output/siman_219/magen-avraham/part-001.txt";
const mc = "output/siman_219/mechaber/part-001.txt";
const mb = "output/siman_219/mishnah-berurah/part-001.txt";

patch(mh, "machatzit-hashekel", 9, "_", mhs9);

patch(ma, "magen-avraham", 1, "_", ma1);
patch(ma, "magen-avraham", 2, "_", ma2);
patch(ma, "magen-avraham", 3, "_", ma3);
patch(ma, "magen-avraham", 4, "_", ma4);
patch(ma, "magen-avraham", 5, "_", ma5);
patch(ma, "magen-avraham", 6, "_", ma6);
patch(ma, "magen-avraham", 7, "_", ma7);
patch(ma, "magen-avraham", 8, "_", ma8);
patch(ma, "magen-avraham", 9, "_", ma9);
patch(ma, "magen-avraham", 10, "_", ma10);

patch(mc, "mechaber", 1, "main", mc1);
patch(mc, "mechaber", 2, "main", mc2);
patch(mc, "mechaber", 3, "main", mc3);
patch(mc, "mechaber", 4, "main", mc4);
patch(mc, "mechaber", 5, "main", mc5);
patch(mc, "mechaber", 6, "main", mc6);
patch(mc, "mechaber", 7, "main", mc7);
patch(mc, "mechaber", 8, "main", mc8);
patch(mc, "mechaber", 9, "main", mc9);
patch(mc, "mechaber", 10, "main", mc10);

patch(mb, "mishnah-berurah", 1, "א", mb1a);
patch(mb, "mishnah-berurah", 1, "ב", mb1b);
patch(mb, "mishnah-berurah", 1, "ג", mb1g);
patch(mb, "mishnah-berurah", 2, "א", mb2a);
patch(mb, "mishnah-berurah", 10, "א", mb10a);
patch(mb, "mishnah-berurah", 10, "ב", mb10b);

const PATCH_COUNT = 27;
console.log(`ok siman 219 part3of5 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-219-part3of5.json",
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
  /\bIlan\b/i,
  /\bRach\b/i,
  /\bartist\b/i,
  /\bgarage\b/i,
  /\bBible\b/i,
  /\bKGB\b/i,
  /\bFIFA\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs",
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
