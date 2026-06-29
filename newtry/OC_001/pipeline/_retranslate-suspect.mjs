#!/usr/bin/env node
/**
 * Retranslate suspect OC001 blocks (479-485) via claude --print, apply to output.
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { autoFix, preflightFail } from "./_slot12-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const DICT = path.join(OC_ROOT, "full_dictionary.md");

const BAD = new RegExp(
  [
    "impeached",
    "High Court",
    "Hmm:",
    "USSR",
    "Hashem's Word",
    "Holy One to say",
    "kites",
    "Reporter, India",
    "fed up",
    "my knees",
    "post-consumption",
    "pre-consumption",
    "epicoman",
    "ovary",
    "IDF ",
    "charcoal",
    "Attorney",
    "drunken household",
    "TJ:",
    "She drinks for the reason",
    "Changes to the KJ",
    "A\\.D\\. is another",
    "Rema:.*Rema:",
    "\\(א\\)\\s*\\(a\\)",
    "Great Hall",
    "psalmist who happened",
    "not for us . without",
    "Grace After Meals",
    "Daltham",
    "in poverty after him",
    "not a curse",
    "flotillas",
    "And if you drink without",
    "And you won't cry",
    "Who is a third cup",
    "denier of the wineries",
    "Dalai Zemin",
    "not permitted, and so on, much",
    "Until ever before",
    "To the rivers of Babylon, and does not say",
    "And his wife is in the pocket",
    "Both of them will say thanks R\\.L",
  ].join("|"),
  "i"
);

/** Files to retranslate entirely (known bad slot12 batch) */
const FULL_RETRANSLATE = {
  475: new Set([
    "chok-yaakov/part-001.txt",
    "machatzit-hashekel/part-001.txt",
    "magen-avraham/part-001.txt",
    "baer-heitev/part-001.txt",
    "beer-hagolah/part-001.txt",
    "beur-hagra/part-001.txt",
    "eliyah-rabbah/part-001.txt",
    "kaf-hachayyim/part-001.txt",
    "mishnah-berurah/part-001.txt",
    "peri-megadim/part-001.txt",
    "rabbi-akiva-eiger/part-001.txt",
    "turei-zahav/part-001.txt",
  ]),
  476: new Set(["machatzit-hashekel/part-001.txt", "magen-avraham/part-001.txt"]),
  477: new Set([
    "magen-avraham/part-001.txt",
    "dagul-merevavah/part-001.txt",
    "beur-hagra/part-001.txt",
    "mishnah-berurah/part-001.txt",
  ]),
  479: new Set([
    "mishnah-berurah/part-001.txt",
    "biur-halacha/part-001.txt",
    "beur-hagra/part-001.txt",
    "chok-yaakov/part-001.txt",
    "kaf-hachayyim/part-001.txt",
    "peri-megadim/part-001.txt",
    "turei-zahav/part-001.txt",
    "yad-ephraim/part-001.txt",
  ]),
  480: new Set([
    "mishnah-berurah/part-001.txt",
    "baer-heitev/part-001.txt",
    "beur-hagra/part-001.txt",
    "chok-yaakov/part-001.txt",
    "eliyah-rabbah/part-001.txt",
    "magen-avraham/part-001.txt",
    "turei-zahav/part-001.txt",
    "chatam-sofer/part-001.txt",
  ]),
  481: new Set([
    "mishnah-berurah/part-001.txt",
    "beur-hagra/part-001.txt",
    "baer-heitev/part-001.txt",
    "biur-halacha/part-001.txt",
    "chok-yaakov/part-001.txt",
    "eliyah-rabbah/part-001.txt",
    "machatzit-hashekel/part-001.txt",
    "magen-avraham/part-001.txt",
    "turei-zahav/part-001.txt",
    "yad-ephraim/part-001.txt",
    "peri-megadim/part-001.txt",
  ]),
  482: new Set([
    "mishnah-berurah/part-001.txt",
    "beur-hagra/part-001.txt",
    "biur-halacha/part-001.txt",
    "beer-hagolah/part-001.txt",
    "chok-yaakov/part-001.txt",
    "kaf-hachayyim/part-001.txt",
    "machatzit-hashekel/part-001.txt",
    "peri-megadim/part-001.txt",
    "netiv-chayim/part-001.txt",
    "shaarei-teshuvah/part-001.txt",
  ]),
  483: new Set([
    "mishnah-berurah/part-001.txt",
    "baer-heitev/part-001.txt",
    "beur-hagra/part-001.txt",
    "chok-yaakov/part-001.txt",
    "kaf-hachayyim/part-001.txt",
    "machatzit-hashekel/part-001.txt",
    "magen-avraham/part-001.txt",
    "yad-ephraim/part-001.txt",
  ]),
  484: new Set([
    "mishnah-berurah/part-001.txt",
    "beur-hagra/part-001.txt",
    "chok-yaakov/part-001.txt",
    "kaf-hachayyim/part-001.txt",
    "magen-avraham/part-001.txt",
    "rabbi-akiva-eiger/part-001.txt",
  ]),
};

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) {
  console.error("Usage: _retranslate-suspect.mjs 479 480 ...");
  process.exit(1);
}

const dictSnippet = fs.readFileSync(DICT, "utf8").slice(0, 12000);

const SYSTEM = `You translate Shulchan Aruch Orach Chayim from Hebrew to English.

MANDATORY (R1-R10):
- Translate EVERY word. No omissions, summarizing, or paraphrasing.
- Output ONLY the translation. No labels like "Translation:".
- Halachic terms: Birkas Hamazon (not Grace After Meals), berachah achronah (not post-consumption blessing), afikoman, l'chatchila, b'dieved, d'oraisa, d'rabbanan, hidur mitzvah, etc.
- Commentator names: Magen Avraham, Taz, Mishna Berurah, Chok Yaakov, Maharil, Rosh, Tur, etc. Never anglicize.
- Expand ALL Hebrew abbreviations (מ"א = Magen Avraham, ח"י = Chok Yaakov, בהמ"ז = Birkas Hamazon, עח"י = see Chok Yaakov).
- Rama glosses in Hebrew (הגה): separate each as {Rama: ...} — never nest "Rema:" inside.
- Strip HTML from Hebrew mentally; preserve note markers like (א) at start when Hebrew has (א).
- Arabic numerals for siman/seif references.
- Translate Aramaic fully.
- FORBIDDEN: Lord/God (use Hashem only if needed), impeached, High Court for בהמ"ז, Hmm, TJ, fed up, epicoman, USSR, IDF, adding "afikoman" if Hebrew only says אחר כך.

Dictionary excerpt:
${dictSnippet}

Return ONLY valid JSON: keys are "rel|seif:marker" → English string. No markdown fences.`;

function isSuspect(b, siman, rel) {
  const full = FULL_RETRANSLATE[siman];
  if (full?.has(rel)) return true;
  const en = String(b.en || "");
  const enP = plainFromHtml(en);
  const heP = plainFromHtml(b.he);
  const ratioThresh = [475, 476, 477, 478].includes(siman) ? 0.45 : 0.35;
  return (
    BAD.test(en) ||
    (enP.length < heP.length * ratioThresh && heP.length > 50)
  );
}

function claudeJson(user) {
  const r = spawnSync(
    "claude",
    ["--print"],
    {
      encoding: "utf8",
      input: `${SYSTEM}\n\n${user}`,
      timeout: 600000,
      cwd: OC_ROOT,
      shell: process.platform === "win32",
      maxBuffer: 80 * 1024 * 1024,
    }
  );
  if (r.status !== 0)
    throw new Error((r.stderr || r.stdout || "claude failed").slice(0, 2000));
  let t = (r.stdout || "").trim();
  t = t.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(t);
}

const items = [];
for (const s of simanim) {
  const dir = path.join(OUT, `siman_${s}`);
  for (const slug of fs.readdirSync(dir)) {
    if (slug === "manifest.json") continue;
    for (const f of fs.readdirSync(path.join(dir, slug))) {
      if (!f.endsWith(".txt")) continue;
      const rel = `${slug}/${f}`;
      const fp = path.join(dir, slug, f);
      for (const b of parseBlocksInFile(fs.readFileSync(fp, "utf8"))) {
        if (!isSuspect(b, s, rel)) continue;
        const key = `${b.seif}:${b.marker || "_"}`;
        items.push({
          siman: s,
          rel,
          key,
          id: `siman_${s}/${rel}|${key}`,
          he: plainFromHtml(b.he),
          marker: b.marker,
        });
      }
    }
  }
}

console.log("suspect blocks:", items.length);
if (!items.length) process.exit(0);

const BATCH = 4;
const fixesBySiman = {};

for (let i = 0; i < items.length; i += BATCH) {
  const batch = items.slice(i, i + BATCH);
  const payload = {};
  for (const it of batch) payload[it.id] = it.he;
  process.stdout.write(
    `batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(items.length / BATCH)} (${batch.length}) … `
  );
  const out = claudeJson(
    `Translate these ${batch.length} blocks. Keys are siman_NNN/file|seif:marker.\n${JSON.stringify(payload, null, 2)}`
  );
  for (const it of batch) {
    if (!out[it.id]) throw new Error(`missing: ${it.id}`);
    let en = String(out[it.id]).trim();
    en = autoFix(en, it.marker, it.he);
    const pf = preflightFail(en);
    if (pf) console.warn("  preflight warn", it.id, pf);
    if (!fixesBySiman[it.siman]) fixesBySiman[it.siman] = {};
    if (!fixesBySiman[it.siman][it.rel]) fixesBySiman[it.siman][it.rel] = {};
    fixesBySiman[it.siman][it.rel][it.key] = en;
  }
  console.log("ok");
}

let applied = 0;
for (const [siman, relMap] of Object.entries(fixesBySiman)) {
  const base = path.join(OUT, `siman_${siman}`);
  for (const [rel, blockFixes] of Object.entries(relMap)) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[key]) return { ...b, en: blockFixes[key] };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    applied += Object.keys(blockFixes).length;
  }
}
console.log("applied", applied, "blocks");
