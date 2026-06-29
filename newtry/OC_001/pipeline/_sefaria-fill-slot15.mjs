#!/usr/bin/env node
/** Fill hand-slot15 from Sefaria Pulls where quality passes */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot15-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

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
const OUT = path.join(__dirname, "..", "output");

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

function findSefariaEn(siman, slug, seif) {
  const simDir = path.join(SEF, String(siman).padStart(3, "0"));
  if (!fs.existsSync(simDir)) return null;
  const seifDir = `seif-${String(seif).padStart(3, "0")}`;
  for (const trySlug of [slug, slug.replace(/-/g, "_")]) {
    const fp = path.join(simDir, seifDir, trySlug, "en.html");
    if (fs.existsSync(fp)) return stripHtml(fs.readFileSync(fp, "utf8"));
  }
  for (const d of fs.readdirSync(simDir)) {
    if (!d.startsWith("seif-")) continue;
    for (const trySlug of [slug, slug.replace(/-/g, "_")]) {
      const fp = path.join(simDir, d, trySlug, "en.html");
      if (fs.existsSync(fp)) return stripHtml(fs.readFileSync(fp, "utf8"));
    }
  }
  return null;
}

const siman = parseInt(process.argv[2], 10);
const handPath = path.join(__dirname, "work", `hand-slot15-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
let filled = 0;
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
  it.en = en;
  filled++;
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
const miss = hand.items.filter((x) => !x.en).length;
console.log("siman", siman, "sefaria filled", filled, "still missing", miss);
