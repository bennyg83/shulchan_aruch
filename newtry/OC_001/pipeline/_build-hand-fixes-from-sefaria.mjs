#!/usr/bin/env node
/** Build _handNNN-need-en.mjs from Sefaria + hand items still missing */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot15-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEF = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "Sefaria Pulls",
  "shulchan-arukh",
  "Orach_Chayim",
  "simanim"
);

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function findSefariaEn(s, slug, seif) {
  const simDir = path.join(SEF, String(s).padStart(3, "0"));
  if (!fs.existsSync(simDir)) return null;
  const seifDir = `seif-${String(seif).padStart(3, "0")}`;
  for (const trySlug of [slug, slug.replace(/-/g, "_")]) {
    const fp = path.join(simDir, seifDir, trySlug, "en.html");
    if (fs.existsSync(fp)) return stripHtml(fs.readFileSync(fp, "utf8"));
  }
  return null;
}

const handPath = path.join(__dirname, "work", `hand-slot15-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const FIXES = {};
let n = 0;
for (const it of hand.items) {
  if (it.en) continue;
  const sef = findSefariaEn(siman, it.slug, it.seif);
  if (!sef || sef.length < 12) continue;
  const en = autoFix(sef, it.marker, it.he || "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: it.he,
    en,
  });
  if (pf || maxSeverity(issues) >= SEVERITY.warn) continue;
  if (!FIXES[it.rel]) FIXES[it.rel] = {};
  FIXES[it.rel][it.key] = en;
  it.en = en;
  n++;
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const out = path.join(__dirname, `_hand${siman}-need-en.mjs`);
const body = `/** worker-slot-15 — siman ${siman} hand fixes from Sefaria */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`;
fs.writeFileSync(out, body, "utf8");
const miss = hand.items.filter((x) => !x.en).length;
console.log("siman", siman, "sefaria fixes", n, "still missing", miss, "->", out);
