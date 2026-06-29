import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  ea1a,
  ea1b,
  kh1,
  kh10,
  kh2,
  kh3,
  kh4,
  kh5,
  kh6,
  kh7,
  kh8,
  kh9,
  mh1a,
  mh1b,
  mh10a,
  mh10b,
  mh2a,
  mh2b,
  mh4a,
  mh5,
  mh6,
  mh7,
  mh8,
} from "./pipeline/work/_siman-219-part2of5-en.mjs";

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

const ea = "output/siman_219/eshel-avraham/part-001.txt";
const kh = "output/siman_219/kaf-hachayyim/part-001.txt";
const ls = "output/siman_219/levushei-serad/part-001.txt";
const mh = "output/siman_219/machatzit-hashekel/part-001.txt";

patch(ea, "eshel-avraham", 1, "א", ea1a);
patch(ea, "eshel-avraham", 1, "ב", ea1b);
patch(
  ea,
  "eshel-avraham",
  3,
  "_",
  `<b>Ten.</b> And b'dieved even without ten before him suffices; see Yoreh Deah siman 92.`,
);

patch(kh, "kaf-hachayyim", 1, "_", kh1);
patch(kh, "kaf-hachayyim", 10, "_", kh10);
patch(kh, "kaf-hachayyim", 2, "_", kh2);
patch(kh, "kaf-hachayyim", 3, "_", kh3);
patch(kh, "kaf-hachayyim", 4, "_", kh4);
patch(kh, "kaf-hachayyim", 5, "_", kh5);
patch(kh, "kaf-hachayyim", 6, "_", kh6);
patch(kh, "kaf-hachayyim", 7, "_", kh7);
patch(kh, "kaf-hachayyim", 8, "_", kh8);
patch(kh, "kaf-hachayyim", 9, "_", kh9);

patch(
  ls,
  "levushei-serad",
  1,
  "_",
  `Taz s.k. 6 ruled in siman 218, seif 9 that one should not bless.`,
);

patch(mh, "machatzit-hashekel", 1, "א", mh1a);
patch(mh, "machatzit-hashekel", 1, "ב", mh1b);
patch(mh, "machatzit-hashekel", 10, "א", mh10a);
patch(mh, "machatzit-hashekel", 10, "ב", mh10b);
patch(mh, "machatzit-hashekel", 2, "א", mh2a);
patch(mh, "machatzit-hashekel", 2, "ב", mh2b);
patch(
  mh,
  "machatzit-hashekel",
  3,
  "_",
  `(s.k. 3) Rabbanan — one must say they taught the law as Magen Avraham's reasoning above; and since it is written "in the assembly of elders" — elder means one who acquired wisdom and is fit to instruct.`,
);
patch(mh, "machatzit-hashekel", 4, "א", mh4a);
patch(
  mh,
  "machatzit-hashekel",
  4,
  "ב",
  `And the other, etc. — before fewer than ten, so Terumat Yisrael — there is dispute, meaning it is not better than those if the sick person blessed for himself without ten, whom they dispute in seif 3.`,
);
patch(mh, "machatzit-hashekel", 5, "_", mh5);
patch(mh, "machatzit-hashekel", 6, "_", mh6);
patch(mh, "machatzit-hashekel", 7, "_", mh7);
patch(mh, "machatzit-hashekel", 8, "_", mh8);

const PATCH_COUNT = 27;
console.log(`ok siman 219 part2of5 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-219-part2of5.json",
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
