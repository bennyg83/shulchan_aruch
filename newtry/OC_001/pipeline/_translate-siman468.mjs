#!/usr/bin/env node
/** Translate siman 468 — erev Pesach melacha after midday */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const siman = 468;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = hand.items.filter((it) => !it.en || !String(it.en).trim());
if (!need.length) {
  console.log("siman", siman, "all translated");
  process.exit(0);
}

const BATCH = 8;
const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman 468 (not doing melacha on erev Pesach after midday; customs by locale; tailors/scribes/launderers; chickens/eggs; dung; bloodletting on festivals) from Hebrew to English.

MANDATORY RULES (R1-R10):
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: melacha, erev Pesach, Yom Tov, l'chatchila, b'dieved, d'oraisa, d'rabbanan, akum, cherem/nidui (excommunicate), minhag, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Chok Yaakov, Eliyah Rabbah, Kaf HaChayyim, Peri Megadim, Machatzit HaShekel, Maharil, Mahariv, Rosh, Ran, Rashi, etc.
- Expand ALL Hebrew abbreviations: מ״א=Magen Avraham, ט״ז=Taz, ב״י=Beit Yosef, מ״ב=Mishna Berurah, ע״פ=erev Pesach, עכו״ם=akum, ח״ה=Chol HaMoed, עי״ט=Yom Tov, etc.
- Rama glosses in source: {Rama: ...} with curly braces only.
- Arabic numerals for siman/seif: סי׳ תס״ח = siman 468.
- Translate Aramaic fully into English.
- Logical connectives: however, nevertheless, since, therefore, meaning, etc.
- Preserve <b>...</b> and <small>...</small> HTML when present in Hebrew (mirror in English).

FORBIDDEN: Lord/God (use Hashem if needed), work/craft for melacha, Shield of Abraham, Golden Rows, hand recoils, first dish, allocated, Saturday, Bible, &quot;, paraphrase.

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

function claudeJson(user) {
  const r = spawnSync(
    "claude",
    ["--print", "--permission-mode", "acceptEdits", `${SYSTEM}\n\n${user}`],
    { encoding: "utf8", timeout: 600000, cwd: OC_ROOT }
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
