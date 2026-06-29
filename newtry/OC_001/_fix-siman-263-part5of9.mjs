import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { collectEditorialBlocks } from "./pipeline/lib/editorial-queue.mjs";
import { TRANSLATIONS } from "./_siman263-part5of9-translations.mjs";

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

const FILE_BY_SLUG = {
  "kaf-hachayyim": "output/siman_263/kaf-hachayyim/part-001.txt",
  "levushei-serad": "output/siman_263/levushei-serad/part-001.txt",
  "machatzit-hashekel": "output/siman_263/machatzit-hashekel/part-001.txt",
};

let patchCount = 0;
for (const [key, en] of Object.entries(TRANSLATIONS)) {
  const [slug, seif, marker] = key.split("|");
  const file = FILE_BY_SLUG[slug];
  if (!file) throw new Error(`No file for slug ${slug}`);
  patch(file, slug, seif, marker, en);
  patchCount++;
}

console.log(`ok siman 263 part5of9 — ${patchCount} blocks`);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;
const PART = 5;
const PARTS = 9;
const queuePath = path.join(
  OC_ROOT,
  `pipeline/work/editorial-queue-siman-263-part${PART}of${PARTS}.json`,
);

let queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
if (!queue.items?.length) {
  const mainQueuePath = path.join(
    OC_ROOT,
    "pipeline/work/editorial-queue-siman-263.json",
  );
  let items;
  let totalInSiman;
  if (fs.existsSync(mainQueuePath)) {
    const main = JSON.parse(fs.readFileSync(mainQueuePath, "utf8"));
    if (main.items?.length >= PARTS * 30) {
      const size = Math.ceil(main.items.length / PARTS);
      items = main.items.slice((PART - 1) * size, PART * size);
      totalInSiman = main.totalInSiman ?? main.itemCount ?? main.items.length;
    }
  }
  if (!items?.length) {
    const all = collectEditorialBlocks(
      path.join(OC_ROOT, "output"),
      263,
      "all",
      "warn",
      new Set(),
    );
    const size = Math.ceil(all.length / PARTS);
    items = all.slice((PART - 1) * size, PART * size);
    totalInSiman = all.length;
  }
  queue = {
    ...queue,
    totalInSiman,
  };
  queue = {
    ...queue,
    siman: 263,
    part: PART,
    parts: PARTS,
    itemCount: items.length,
    items,
  };
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n", "utf8");
  console.log(`Populated queue with ${items.length} items from main queue slice`);
}

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
  /\bexistem\b/i,
  /\bCelui qui\b/i,
  /\bBaroukh\b/i,
  /\bPLO\b/i,
  /\bOkinawa\b/i,
  /\bJehovah\b/i,
  /\bFIFA\b/i,
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
