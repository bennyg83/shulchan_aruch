#!/usr/bin/env node
/** Translate missing hand-slot15 items via claude --print */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot15-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", `hand-slot15-siman-${siman}.json`);

if (!fs.existsSync(handPath)) {
  console.error("missing", handPath);
  process.exit(1);
}

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = hand.items.filter((it) => {
  if (!it.en || !String(it.en).trim()) return true;
  const en = autoFix(it.en, it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  return pf || maxSeverity(issues) >= SEVERITY.warn;
});

if (!need.length) {
  console.log("siman", siman, "all translated");
  process.exit(0);
}

const BATCH = 4;
const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman ${siman} (Rosh Hashanah: shofar, tekios, blessings, fasting, Yom Tov) from Hebrew to English.

MANDATORY RULES:
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: shofar, tekiah, teruah, shevarim, l'chatchila, b'dieved, d'oraisa, d'rabbanan, muktzeh, melacha, positive time-bound mitzva, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Ran, Rosh, Rashba, Eliyah Rabbah, Kaf HaChayyim, Peri Megadim, Chokhmat Shlomo, Levush, Maharil, etc.
- Expand ALL Hebrew abbreviations in English (מ״א=Magen Avraham, ט״ז=Taz, ב״י=Beit Yosef, מ״ב=Mishna Berurah, נ״ב=it appears to me, ע״ש=see there, etc.).
- Rama glosses: {Rama: ...} with curly braces only once.
- Note markers: Hebrew letter markers → (א) (ב) etc. at start when present in source.
- Arabic numerals for siman/seif: סי׳ תקפ״ה = siman 585.
- Translate Aramaic fully into English.
- Logical connectives: however, nevertheless, since, therefore, meaning, etc.

FORBIDDEN: Lord, God (use Hashem), Shield of Abraham, Golden Rows, hand recoils, first dish, allocated, Saturday, According to the, there in the, Bible, IDF, Capernaum, USSR, &quot;, duplicate repeated phrases.

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

function claudeJson(user) {
  const r = spawnSync("claude", ["--print"], {
    encoding: "utf8",
    input: `${SYSTEM}\n\n${user}`,
    timeout: 600000,
    cwd: OC_ROOT,
    shell: process.platform === "win32",
    maxBuffer: 80 * 1024 * 1024,
  });
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
