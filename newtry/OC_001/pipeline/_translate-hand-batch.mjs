#!/usr/bin/env node
/** Translate hand-slot11-siman-NNN.json via claude --print, write en fields */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const slot = process.env.SLOT || "slot12";
const handPath = path.join(__dirname, "work", `hand-${slot}-siman-${siman}.json`);

if (!fs.existsSync(handPath)) {
  console.error("missing", handPath);
  process.exit(1);
}

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = hand.items.filter((it) => !it.en || !String(it.en).trim());
if (!need.length) {
  console.log("siman", siman, "all translated");
  process.exit(0);
}

const BATCH = 8;
const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman ${siman} (Pesach Seder, Haggadah, matzah, wine cups, blessings) from Hebrew to English.

MANDATORY RULES:
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: matzah, chametz, l'chatchila, b'dieved, d'oraisa, d'rabbanan, mil, kezayit, karet, eruv, bein hashemashot, muktzeh, melacha, kli rishon, psik reisha, yad soledes bo, akum, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Chok Yaakov, Eliyah Rabbah, Kaf HaChayyim, Peri Megadim, Machatzit HaShekel, etc.
- Expand ALL Hebrew abbreviations: מ״א=Magen Avraham, ט״ז=Taz, ב״י=Beit Yosef, מ״ב=Mishna Berurah, ת״ה=Terumat HaDeshen, מהרי״ל=Maharil, etc.
- Rama glosses: {Rama: ...} with curly braces only.
- Note markers from Hebrew letters: convert to (1)(2)(3) etc. at correct positions.
- Arabic numerals for siman/seif citations: סי׳ תרנ״ט = siman 459.
- Translate Aramaic fully into English.
- Logical connectives: however, nevertheless, since, therefore, meaning, etc.

FORBIDDEN: Lord, God (use Hashem), Hametz/leaven (use chametz), Shield of Abraham, Golden Rows, hand recoils, first dish, allocated, Saturday, According to the, there in the, Bible, IDF, &quot;, html tags.

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

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
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || "claude failed").slice(0, 1200));
  let t = (r.stdout || "").trim();
  t = t.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(t);
}

let done = 0;
for (let i = 0; i < need.length; i += BATCH) {
  const batch = need.slice(i, i + BATCH);
  const payload = {};
  for (const it of batch) payload[it.key] = it.hePlain || it.he;
  process.stdout.write(
    `siman ${siman} batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(need.length / BATCH)} (${batch.length}) … `
  );
  const out = claudeJson(
    `Translate these ${batch.length} blocks. Keys are seif:marker.\n${JSON.stringify(payload, null, 2)}`
  );
  for (const it of batch) {
    if (!out[it.key]) throw new Error(`missing key: ${it.key}`);
    it.en = String(out[it.key]).trim();
    done++;
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok");
}
console.log("translated", done, "blocks for siman", siman);
