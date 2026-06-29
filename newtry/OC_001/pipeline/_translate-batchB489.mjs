#!/usr/bin/env node
/** Translate siman 489 batch B bad blocks from *_489-he.json + output Hebrew */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const BATCH = 6;

const SLUGS = [
  "beer-hagolah",
  "beur-hagra",
  "biur-halacha",
  "chok-yaakov",
  "chokhmat-shlomo",
  "chatam-sofer",
  "mishnah-berurah",
  "peri-megadim",
  "netiv-chayim",
  "rabbi-akiva-eiger",
  "shaarei-teshuvah",
  "yad-ephraim",
  "eshel-avraham",
];

const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman 489 (Sefirat HaOmer) commentary from Hebrew to English.

MANDATORY (R1-R10):
- Translate EVERY word. No omissions, summarizing, or paraphrasing.
- Output ONLY translation text. No labels, headers, notes.
- Halachic terms: omer, l'chatchila, b'dieved, d'oraisa, d'rabbanan, bein hashemashot, Motzei Shabbat, etc.
- Names: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Chok Yaakov, Eliyah Rabbah, Ran, Rosh, Rashba, etc.
- Expand ALL Hebrew abbreviations in English (מ״א = Magen Avraham, שו״ע = Shulchan Aruch, ב״י = Beit Yosef, etc.).
- Rama glosses in source: {Rama: ...} with curly braces only.
- Note markers at start when Hebrew has (א) etc.: use Hebrew letter in parentheses e.g. (א) (ב) or (1)(2) per marker field.
- Arabic numerals for siman/seif: siman 489, seif 1, Menachot 66, Berachot 27b, etc.
- Translate Aramaic fully.

FORBIDDEN in output (instant failure): Hashem, Lord, God, G-d, Bible, Gloss:, Saturday, Shield of Abraham, Hashem's Word, Hashem's promise, Hashem's Prayer, IDF, U.S., C.C., allocated, first dish, hand recoils, leaven (use chametz), According to the, Holy Qur'an, ovary, CCP, UN except.

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

function claudeJson(user) {
  const r = spawnSync(process.platform === "win32" ? "claude.cmd" : "claude", ["--print", "--permission-mode", "acceptEdits"], {
    encoding: "utf8",
    timeout: 600000,
    cwd: OC_ROOT,
    input: `${SYSTEM}\n\n${user}`,
    maxBuffer: 50 * 1024 * 1024,
    shell: process.platform === "win32",
  });
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || "claude failed").slice(0, 2000));
  let t = (r.stdout || "").trim();
  t = t.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
  return JSON.parse(t);
}

function slugToHeFile(slug) {
  const m = slug.replace(/-/g, "_");
  return path.join(__dirname, `_${m}489-he.json`);
}

const bad = JSON.parse(fs.readFileSync(path.join(__dirname, "_batchB489-bad.json"), "utf8"));
const items = [];
for (const [fullKey, meta] of Object.entries(bad)) {
  const [slug, seif, marker] = fullKey.split(":");
  const hePath = slugToHeFile(slug);
  const blockKey = `${seif}:${marker}`;
  let he = meta.he;
  if (fs.existsSync(hePath)) {
    const hj = JSON.parse(fs.readFileSync(hePath, "utf8"));
    if (hj[blockKey] && hj[blockKey].length > he.length) he = hj[blockKey];
  }
  items.push({ fullKey, slug, seif, marker, blockKey, he, rel: meta.rel });
}

const outPath = path.join(__dirname, "_translations489-batchB.json");
let done = {};
if (fs.existsSync(outPath)) done = JSON.parse(fs.readFileSync(outPath, "utf8"));

const need = items.filter((it) => !done[it.fullKey] || !String(done[it.fullKey]).trim());
console.log("batch B:", items.length, "need translate:", need.length);

for (let i = 0; i < need.length; i += BATCH) {
  const batch = need.slice(i, i + BATCH);
  const payload = {};
  for (const it of batch) payload[it.fullKey] = it.he;
  process.stdout.write(`batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(need.length / BATCH)} (${batch.length}) … `);
  const out = claudeJson(`Translate these ${batch.length} blocks. Keys are slug:seif:marker.\n${JSON.stringify(payload, null, 2)}`);
  for (const it of batch) {
    if (!out[it.fullKey]) throw new Error(`missing: ${it.fullKey}`);
    done[it.fullKey] = String(out[it.fullKey]).trim();
  }
  fs.writeFileSync(outPath, JSON.stringify(done, null, 2) + "\n", "utf8");
  console.log("ok");
}

const still = items.filter((it) => !done[it.fullKey]).length;
console.log("done, missing", still);
if (still) process.exit(1);
