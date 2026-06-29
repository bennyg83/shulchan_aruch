#!/usr/bin/env node
/** Retranslate hand-slot14 items that fail audit (preflight or quality warn+) */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const handPath = path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`);

if (!fs.existsSync(handPath)) {
  console.error("missing", handPath);
  process.exit(1);
}

const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const need = [];
for (const it of hand.items) {
  const en = it.en || autoFix(it.enBad ?? "", it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  if (pf || maxSeverity(issues) >= SEVERITY.warn) need.push(it);
}

if (!need.length) {
  console.log("siman", siman, "audit ok");
  process.exit(0);
}

const BATCH = 6;
const SYSTEM = `You translate Shulchan Aruch Orach Chayim siman ${siman} from Hebrew to English.

MANDATORY RULES:
- Translate EVERY word. No omissions, no summarizing, no paraphrasing.
- Output ONLY the translation. No labels, headers, notes.
- Halachic terms: melacha, muktzeh, chametz, l'chatchila, b'dieved, d'oraisa, d'rabbanan, eruv, bein hashemashot, kli rishon, psik reisha, yad soledes bo, etc.
- Commentator names exactly: Magen Avraham, Taz, Beit Yosef, Rambam, Mishna Berurah, Bach, Gra, Rashi, Ramban, etc.
- Expand ALL Hebrew abbreviations in English.
- Rama glosses: {Rama: ...} with curly braces only.
- Note markers: (1)(2) etc. at correct positions; seif markers like (א) when present in source.
- Arabic numerals for siman/seif references.
- Translate Aramaic fully into English.

FORBIDDEN: Lord/God (use Hashem if needed), Capernaum, Shield of Abraham, hand recoils, first dish, allocated, Saturday, &quot;, chunk duplication, paraphrase, "Hashem's Prayer/Word/promise".

Return ONLY valid JSON object: keys → English strings. No markdown fences.`;

function claudeJson(user) {
  const cmd = process.platform === "win32" ? "claude.cmd" : "claude";
  const r = spawnSync(cmd, ["--print"], {
    encoding: "utf8",
    timeout: 600000,
    cwd: OC_ROOT,
    input: `${SYSTEM}\n\n${user}`,
    maxBuffer: 30 * 1024 * 1024,
    shell: process.platform === "win32",
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
    it.en = autoFix(String(out[it.key]).trim(), it.marker, it.he || "");
    done++;
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("ok");
}
console.log("retranslated", done, "blocks for siman", siman);
