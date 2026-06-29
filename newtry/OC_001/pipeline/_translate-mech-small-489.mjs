#!/usr/bin/env node
/** Siman 489: translate mechaber first, then remaining slugs in batches of 8. */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", "hand-slot12-siman-489.json");
const BATCH = 8;

const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman 489 (Sefirat HaOmer, counting the Omer, new grain) from Hebrew to English.

MANDATORY RULES (R1-R10):
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: matzah, chametz, l'chatchila, b'dieved, d'oraisa, d'rabbanan, bein hashemashot, muktzeh, melacha, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Chok Yaakov, Eliyah Rabbah, Kaf HaChayyim, Peri Megadim, Machatzit HaShekel, etc.
- Expand ALL Hebrew abbreviations in English.
- Rama glosses: {Rama: ...} with curly braces only — never "Gloss:".
- Note markers: Hebrew letter markers become (1)(2) etc. at start when applicable.
- Arabic numerals for siman/seif citations.
- Translate Aramaic fully into English.
- Use Hashem not Lord/God. Use Motzei Shabbat not Saturday evening.

FORBIDDEN: Lord, God, Gloss:, Saturday, Shield of Abraham, Hashem's Word, Hashem's promise, Bible (use Torah/Talmud), IDF, According to the, allocated, first dish, hand recoils.

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

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = hand.items.filter((it) => !it.en || !String(it.en).trim());

const mech = need.filter((it) => it.slug === "mechaber");
const rest = need.filter((it) => it.slug !== "mechaber");

async function translateBatch(batch, label) {
  const payload = {};
  for (const it of batch) payload[it.key] = it.hePlain || it.he;
  process.stdout.write(`${label} (${batch.length}) … `);
  const out = claudeJson(
    `Translate these ${batch.length} blocks. Keys are seif:marker.\n${JSON.stringify(payload, null, 2)}`
  );
  for (const it of batch) {
    if (!out[it.key]) throw new Error(`missing key: ${it.key}`);
    it.en = String(out[it.key]).trim();
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok");
}

console.log("siman 489 need", need.length, "mechaber", mech.length, "other", rest.length);
if (mech.length) translateBatch(mech, "mechaber");
const bySlug = {};
for (const it of rest) {
  if (!bySlug[it.slug]) bySlug[it.slug] = [];
  bySlug[it.slug].push(it);
}
for (const [slug, items] of Object.entries(bySlug).sort((a, b) => a[0].localeCompare(b[0]))) {
  for (let i = 0; i < items.length; i += BATCH) {
    translateBatch(items.slice(i, i + BATCH), slug + ` batch ${Math.floor(i / BATCH) + 1}`);
  }
}
const still = hand.items.filter((it) => !it.en).length;
console.log("done, missing", still);
if (still) process.exit(1);
