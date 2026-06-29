#!/usr/bin/env node
/** Translate slot13-need-siman-NNN.json blocks via claude -p */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
if (!siman) {
  console.error("Usage: _translate-need-claude.mjs <siman>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const needPath = path.join(__dirname, "work", `slot13-need-siman-${siman}.json`);
const need = JSON.parse(fs.readFileSync(needPath, "utf8"));
const dictPath = path.join(OC_ROOT, "..", "..", "full_dictionary (1).md");
const dictHint = fs.existsSync(dictPath)
  ? fs.readFileSync(dictPath, "utf8").slice(0, 12000)
  : "";

const blocks = need.items.map((it) => ({
  id: `${it.rel}|${it.key}`,
  he: it.hePlain || it.he,
  marker: it.marker,
}));

const prompt = `You are a halachic translator. Output ONLY valid JSON object mapping id -> English translation string.

Rules:
- Translate EVERY Hebrew word; no omissions.
- No additions, headers, or notes.
- Use transliterations: melacha, kli rishon, muktzeh, d'oraisa, d'rabbanan, l'chatchila, b'dieved, psik reisha, yad soledes bo.
- Commentator names: Magen Avraham, Taz, Beit Yosef, Rambam, Rashi, Shulchan Aruch — never anglicize.
- Expand ALL Hebrew abbreviations to English (מ״א = Magen Avraham, שו״ע = Shulchan Aruch, עכ״ל = end of his words, etc.).
- Convert Hebrew numerals to Arabic (סי׳ תצ״ה = siman 495).
- Rama glosses: {Rama: ...}
- Note markers in Hebrew letters: prefix (${blocks[0]?.marker || "א"}) style as (א) when marker is Hebrew letter.
- Plain English only.

Dictionary excerpt:
${dictHint}

Blocks JSON:
${JSON.stringify(blocks, null, 2)}`;

const schema = {
  type: "object",
  additionalProperties: { type: "string" },
};

const r = spawnSync(
  "claude",
  [
    "-p",
    "--output-format",
    "json",
    "--json-schema",
    JSON.stringify(schema),
    prompt,
  ],
  { cwd: OC_ROOT, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
);

if (r.status !== 0) {
  console.error(r.stderr || r.stdout);
  process.exit(1);
}

let parsed;
try {
  const outer = JSON.parse(r.stdout);
  parsed = typeof outer.result === "string" ? JSON.parse(outer.result) : outer.result;
} catch (e) {
  console.error("parse fail", r.stdout?.slice(0, 2000));
  process.exit(1);
}

const fixes = {};
for (const it of need.items) {
  const id = `${it.rel}|${it.key}`;
  const en = parsed[id];
  if (!en) {
    console.error("missing translation for", id);
    process.exit(1);
  }
  if (!fixes[it.rel]) fixes[it.rel] = {};
  fixes[it.rel][it.key] = en;
}

const outPath = path.join(__dirname, "slot13-manual-506-515.json");
let all = {};
if (fs.existsSync(outPath)) all = JSON.parse(fs.readFileSync(outPath, "utf8"));
all[siman] = fixes;
fs.writeFileSync(outPath, JSON.stringify(all, null, 2) + "\n", "utf8");
console.log("siman", siman, "wrote", Object.keys(fixes).length, "files", need.count, "blocks");
