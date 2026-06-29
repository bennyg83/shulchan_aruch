#!/usr/bin/env node
/** Translate hand JSON via claude --print using stdin (avoids Windows argv length limit). */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const slot = process.env.SLOT || "slot12";
const handPath = path.join(__dirname, "work", `hand-${slot}-siman-${siman}.json`);
const BATCH = Number(process.env.BATCH || 4);

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

const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman ${siman} from Hebrew to English.

MANDATORY: translate every word; output ONLY valid JSON object mapping keys to English strings; no markdown fences.
Rama glosses in Hebrew (הגה): wrap entire gloss as {Rama: ...} once only.
Expand ALL Hebrew abbreviations (מ״א=Magen Avraham, ב״י=Beit Yosef, עמ״א=see Magen Avraham, etc.).
Arabic numerals for siman/seif. Hebrew note markers א ב ג → prefix (א) (ב) etc. at start when present in source.
Commentator names: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Peri Megadim, etc. Never anglicize.
Halachic terms: Yom Tov, Shabbat (never Saturday), kiddush, Yaaleh VeYavo, Ata Bechartanu, Mekadesh Yisrael vehazmanim, d'oraisa, d'rabbanan, l'chatchila, b'dieved, within kedei dibbur.
Divine names: use "our God" or "the Name" — NEVER Hashem, Lord, G-d, Jehovah, Holy Spirit, Qur'an, Bible.
FORBIDDEN phrases/patterns: Lord, Hashem, Hashem's Word, Hashem's Prayer, Saturday, Shield of Abraham, Golden Rows, allocated, first dish, hand recoils, According to the, there in the, in me, IDF, U.S., PLO, Gloss:, leaven/chametz as English (use matzah/chametz transliteration), pending, &quot;.`;

function claudeJson(user) {
  const prompt = `${SYSTEM}\n\n${user}`;
  const r = spawnSync(process.platform === "win32" ? "claude.cmd" : "claude", ["--print", "--permission-mode", "acceptEdits"], {
    encoding: "utf8",
    timeout: 600000,
    cwd: OC_ROOT,
    input: prompt,
    maxBuffer: 50 * 1024 * 1024,
    shell: process.platform === "win32",
  });
  if (r.status !== 0) {
    const err = (r.stderr || r.stdout || "claude failed").slice(0, 2000);
    throw new Error(err);
  }
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
