import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { TRANSLATIONS } from "./_siman401-500-stragglers-translations.mjs";

const SIMANIM = [
  404, 405, 409, 414, 429, 433, 442, 444, 447, 450, 451, 454, 455, 457, 459,
  460, 463, 465, 466, 467, 470, 472, 473, 475, 478, 489, 493, 497, 498, 499,
  500,
];

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

function tKey(siman, slug, seif, marker) {
  return `${siman}|${slug}|${seif}|${marker}`;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = __dirname;

let patchCount = 0;
for (const siman of SIMANIM) {
  const pad = String(siman).padStart(3, "0");
  const queuePath = path.join(
    OC_ROOT,
    `pipeline/work/editorial-queue-siman-${pad}.json`,
  );
  if (!fs.existsSync(queuePath)) {
    throw new Error(`Missing queue: ${queuePath}`);
  }
  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  for (const it of queue.items || []) {
    const k = tKey(siman, it.slug, it.seif, it.marker);
    const en = TRANSLATIONS[k];
    if (!en) throw new Error(`Missing translation: ${k}`);
    const abs = path.join(OC_ROOT, "output", it.file);
    patch(abs, it.slug, it.seif, it.marker, en);
    patchCount++;
    console.log(`patched ${k}`);
  }
}
console.log(`ok siman 401-500 stragglers — ${patchCount} blocks patched`);

for (const siman of SIMANIM) {
  const pad = String(siman).padStart(3, "0");
  const queuePath = path.join(
    OC_ROOT,
    `pipeline/work/editorial-queue-siman-${pad}.json`,
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
  console.log(`Refreshed queue: siman ${pad} (${queue.items.length} items)`);
}

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
  /\bIDF\b/i,
  /\bHeaven's Word\b/i,
  /\bHeaven's promise\b/i,
  /\bHeaven's Prayer\b/i,
  /\bHeaven's judgment\b/i,
  /\bHeaven's wrath\b/i,
  /\bHeaven's people\b/i,
  /\bHeaven's mercy\b/i,
  /\bthe Heaven\b/i,
  /\bSection Heaven\b/i,
  /\bArticle [A-Z]\b/i,
  /\bHoly Spirit\b/i,
  /\bthe Gemara says\b/i,
  /outstanding — replace/i,
  /\bDurbanan\b/i,
  /\bSection \d+ We had areas\b/i,
  /\bSection \d+ is a partaking\b/i,
  /\bSection [A-Z]\b/i,
  /\bMaga\b/i,
  /\bHajha\b/i,
  /\bParakh\b/i,
  /\bDamhazi\b/i,
  /\bDok:/i,
  /\bVedoc:/i,
  /\bAmash\b/i,
  /\bWelsh\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
let total = 0;
for (const siman of SIMANIM) {
  const pad = String(siman).padStart(3, "0");
  const queuePath = path.join(
    OC_ROOT,
    `pipeline/work/editorial-queue-siman-${pad}.json`,
  );
  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  for (const it of queue.items || []) {
    total++;
    const raw = it.rawBlock || "";
    const enM = raw.match(
      /\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/,
    );
    const en = (enM ? enM[1] : "").trim();
    const heM = raw.match(
      /\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/,
    );
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
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${total}`);
  process.exit(1);
}
console.log(`Preflight OK — ${total - fail}/${total} blocks`);
