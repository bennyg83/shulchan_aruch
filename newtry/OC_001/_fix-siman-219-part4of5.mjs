import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import {
  mb2b,
  mb3a,
  mb3b,
  mb3g,
  mb3d,
  mb4a,
  mb4b,
  mb4g,
  mb4d,
  mb4h,
  mb4v,
  mb4z,
  mb4ch,
  mb4t,
  mb6a,
  mb6b,
  mb7a,
  mb7b,
  mb7g,
  mb8a,
  mb8b,
  mb8g,
  mb8d,
  mb8h,
  mb9a,
  mb9b,
  nc1,
} from "./pipeline/work/_siman-219-part4of5-en.mjs";

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

const mb = "output/siman_219/mishnah-berurah/part-001.txt";
const nc = "output/siman_219/netiv-chayim/part-001.txt";

patch(mb, "mishnah-berurah", 2, "ב", mb2b);
patch(mb, "mishnah-berurah", 3, "א", mb3a);
patch(mb, "mishnah-berurah", 3, "ב", mb3b);
patch(mb, "mishnah-berurah", 3, "ג", mb3g);
patch(mb, "mishnah-berurah", 3, "ד", mb3d);
patch(mb, "mishnah-berurah", 4, "א", mb4a);
patch(mb, "mishnah-berurah", 4, "ב", mb4b);
patch(mb, "mishnah-berurah", 4, "ג", mb4g);
patch(mb, "mishnah-berurah", 4, "ד", mb4d);
patch(mb, "mishnah-berurah", 4, "ה", mb4h);
patch(mb, "mishnah-berurah", 4, "ו", mb4v);
patch(mb, "mishnah-berurah", 4, "ז", mb4z);
patch(mb, "mishnah-berurah", 4, "ח", mb4ch);
patch(mb, "mishnah-berurah", 4, "ט", mb4t);
patch(mb, "mishnah-berurah", 6, "א", mb6a);
patch(mb, "mishnah-berurah", 6, "ב", mb6b);
patch(mb, "mishnah-berurah", 7, "א", mb7a);
patch(mb, "mishnah-berurah", 7, "ב", mb7b);
patch(mb, "mishnah-berurah", 7, "ג", mb7g);
patch(mb, "mishnah-berurah", 8, "א", mb8a);
patch(mb, "mishnah-berurah", 8, "ב", mb8b);
patch(mb, "mishnah-berurah", 8, "ג", mb8g);
patch(mb, "mishnah-berurah", 8, "ד", mb8d);
patch(mb, "mishnah-berurah", 8, "ה", mb8h);
patch(mb, "mishnah-berurah", 9, "א", mb9a);
patch(mb, "mishnah-berurah", 9, "ב", mb9b);
patch(nc, "netiv-chayim", 1, "_", nc1);

const PATCH_COUNT = 27;
console.log(`ok siman 219 part4of5 — ${PATCH_COUNT} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const queuePath = path.join(
  OC_ROOT,
  "pipeline/work/editorial-queue-siman-219-part4of5.json",
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
  /\bQur'an\b/i,
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
