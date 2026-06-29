import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { TRANSLATIONS } from "./_siman105-199-stragglers-translations.mjs";

const SIMANIM = [
  108, 110, 111, 113, 114, 117, 124, 126, 128, 131, 132, 135, 137, 139, 141,
  143, 147, 150, 151, 153, 154, 158, 159, 168, 170, 171, 178, 179, 183, 184,
  188, 190, 193, 194,
];

function normHe(s) {
  return String(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function heFromRaw(raw) {
  const m = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  return m ? m[1] : "";
}

function lookupTranslation(siman, it) {
  const k = `${siman}|${it.slug}|${it.seif}|${it.marker}`;
  if (
    siman === 153 &&
    it.slug === "chokhmat-shlomo" &&
    String(it.seif) === "20"
  ) {
    const he = normHe(heFromRaw(it.rawBlock || ""));
    if (/סעיף יו|יו"ד/.test(he)) return TRANSLATIONS["153|chokhmat-shlomo|20|a"];
    if (/סעיף כ|\(סעיף כ/.test(he))
      return TRANSLATIONS["153|chokhmat-shlomo|20|b"];
    throw new Error(`153 seif 20: cannot distinguish blocks: ${it.id}`);
  }
  const en = TRANSLATIONS[k];
  if (!en) throw new Error(`Missing translation: ${k}`);
  return en;
}

function applyBlock(filePath, slug, seif, marker, heKey, newEnglish) {
  const blocks = parseBlocksInFile(fs.readFileSync(filePath, "utf8"));
  const matches = blocks.filter(
    (b) =>
      b.slug === slug &&
      String(b.seif) === String(seif) &&
      String(b.marker) === String(marker),
  );
  let b;
  if (matches.length === 1) b = matches[0];
  else if (matches.length > 1) {
    b = matches.find((x) => normHe(x.he) === normHe(heKey));
    if (!b) throw new Error(`dup block no he match: ${filePath} ${slug} ${seif}`);
  } else throw new Error(`block not found: ${filePath} ${slug} ${seif} ${marker}`);
  b.en = newEnglish;
  const out = blocks.map((x) => serializeBlock(x)).join("\n\n");
  fs.writeFileSync(filePath, out.endsWith("\n") ? out : out + "\n", "utf8");
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
  const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  for (const it of queue.items || []) {
    const en = lookupTranslation(siman, it);
    const abs = path.join(OC_ROOT, "output", it.file);
    const heKey = heFromRaw(it.rawBlock || "");
    applyBlock(abs, it.slug, it.seif, it.marker, heKey, en);
    patchCount++;
    console.log(`patched ${siman}|${it.slug}|${it.seif}|${it.marker}`);
  }
}
console.log(`ok siman 105-199 stragglers — ${patchCount} blocks patched`);

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
    const heKey = normHe(heFromRaw(it.rawBlock || ""));
    const b = blocks.find(
      (x) =>
        x.slug === it.slug &&
        String(x.seif) === String(it.seif) &&
        String(x.marker) === String(it.marker) &&
        (blocks.filter(
          (y) =>
            y.slug === it.slug &&
            String(y.seif) === String(it.seif) &&
            String(y.marker) === String(it.marker),
        ).length === 1 ||
          normHe(x.he) === heKey),
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
