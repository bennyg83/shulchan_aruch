#!/usr/bin/env node
/** Translate missing hand-slot16 items via claude --print */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot16-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", `hand-slot16-siman-${siman}.json`);

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

const TOPIC =
  siman <= 602
    ? "Rosh Hashanah second day, shehecheyanu, new fruit, eggs on Yom Tov"
    : siman <= 606
      ? "Ten Days of Repentance, Erev Yom Kippur meals, appeasement, kapparot"
      : siman <= 609
        ? "Erev Yom Kippur, insulating food, adding from chol to kodesh"
        : siman <= 611
          ? "Yom Kippur prohibitions, candles, melacha"
          : "Yom Kippur eating/drinking prohibitions, shiurim, combining";

const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman ${siman} (${TOPIC}) from Hebrew to English.

MANDATORY RULES:
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: shofar, tekiah, Yom Kippur, vidui, kapparot, tefilla, musaf, l'chatchila, b'dieved, d'oraisa, d'rabbanan, muktzeh, melacha, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Ran, Rosh, Rashba, Eliyah Rabbah, Kaf HaChayyim, Peri Megadim, Chokhmat Shlomo, Levush, Maharil, etc.
- Expand ALL Hebrew abbreviations in English.
- Rama glosses: {Rama: ...} with curly braces only once.
- Note markers: Hebrew letter markers → (א) (ב) etc. at start when present in source.
- Arabic numerals for siman/seif.
- Translate Aramaic fully into English.

FORBIDDEN: Lord, God (use Hashem), Shield of Abraham, Golden Rows, hand recoils, first dish, allocated, Saturday, According to the, there in the, Bible, IDF, Capernaum, &quot;, lines of dots, duplicate repeated phrases.

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

function claudeJson(user) {
  const cmd = process.platform === "win32" ? "claude" : "claude";
  const r = spawnSync(cmd, ["--print"], {
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

function batchSize(it) {
  const n = (it.hePlain || it.he || "").length;
  if (n > 3500) return 1;
  if (n > 1200) return 1;
  return 3;
}

let done = 0;
for (let i = 0; i < need.length; ) {
  const sz = batchSize(need[i]);
  const batch = need.slice(i, i + sz);
  const payload = {};
  for (const row of batch) payload[row.key] = row.hePlain || row.he;
  process.stdout.write(
    `siman ${siman} batch ${Math.floor(i / 3) + 1} (${batch.length}) … `
  );
  const out = claudeJson(
    `Translate these ${batch.length} block(s). Keys are seif:marker.\n${JSON.stringify(payload, null, 2)}`
  );
  for (const row of batch) {
    if (!out[row.key]) throw new Error(`missing key: ${row.key}`);
    row.en = String(out[row.key]).trim();
    done++;
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok");
  i += batch.length;
}
console.log("translated", done, "blocks for siman", siman);
