import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "./oc001_block_lib.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./pipeline/lib/editorial-queue.mjs";
import { TRANSLATIONS } from "./_siman501-697-stragglers-translations.mjs";
import { polishMtStragglers } from "./_lib-polish-mt-stragglers.mjs";

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
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(OC_ROOT, "pipeline/work");
const done = loadEditorialDoneIds(WORK);

/** Discover pending blocks 501–697 */
const queueBySiman = new Map();
for (let s = 501; s <= 697; s++) {
  const items = collectEditorialBlocks(OUT, s, "all", "warn", done);
  if (items.length) queueBySiman.set(s, items);
}

const SIMANIM = [...queueBySiman.keys()].sort((a, b) => a - b);
console.log(
  `[SIMAN 501-697] ${SIMANIM.length} simanim, ${[...queueBySiman.values()].reduce((n, a) => n + a.length, 0)} blocks`,
);

let patchCount = 0;
for (const siman of SIMANIM) {
  for (const it of queueBySiman.get(siman)) {
    const k = tKey(siman, it.slug, it.seif, it.marker);
    let en = TRANSLATIONS[k];
    if (!en) throw new Error(`Missing translation: ${k}`);
    en = polishMtStragglers(en, { seif: it.seif, marker: it.marker });
    const abs = path.join(OC_ROOT, "output", it.file);
    patch(abs, it.slug, it.seif, it.marker, en);
    patchCount++;
    console.log(`patched ${k}`);
  }
}
console.log(`ok siman 501-697 stragglers — ${patchCount} blocks patched`);

for (const siman of SIMANIM) {
  const pad = String(siman).padStart(3, "0");
  const queuePath = path.join(WORK, `editorial-queue-siman-${pad}.json`);
  const items = queueBySiman.get(siman);
  const queue = fs.existsSync(queuePath)
    ? JSON.parse(fs.readFileSync(queuePath, "utf8"))
    : {
        generatedAt: new Date().toISOString(),
        siman,
        part: 1,
        parts: 1,
        scope: "all",
        outRoot: path.join(OC_ROOT, "output"),
        totalInSiman: 0,
        itemCount: 0,
        items: [],
      };
  queue.items = items;
  queue.itemCount = items.length;
  for (const it of queue.items) {
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
  /\bGDPR\b/i,
  /\bOmnipresent\b/i,
  /\bthe Omnipresent's Prayer\b/i,
];
const { runBlockQualityChecks, maxSeverity, severityLabel } = await import(
  "./pipeline/lib/quality-checks.mjs"
);

let fail = 0;
let total = 0;
for (const siman of SIMANIM) {
  for (const it of queueBySiman.get(siman)) {
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
