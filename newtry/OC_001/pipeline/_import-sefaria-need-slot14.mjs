#!/usr/bin/env node
/** Try to fill need blocks from Sefaria Pulls en.html */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const SEF = path.join(ROOT, "Sefaria Pulls", "shulchan-arukh", "Orach_Chayim", "simanim");
const OUT = path.join(__dirname, "..", "output");
const need = JSON.parse(fs.readFileSync(path.join(__dirname, "work", "need-blocks.json"), "utf8"));

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

function findSefariaEn(siman, slug) {
  const simDir = path.join(SEF, String(siman).padStart(3, "0"));
  if (!fs.existsSync(simDir)) return null;
  const slugDir = slug.replace(/-/g, "_");
  for (const seifDir of fs.readdirSync(simDir)) {
    const fp = path.join(simDir, seifDir, slug, "en.html");
    if (fs.existsSync(fp)) return stripHtml(fs.readFileSync(fp, "utf8"));
    const fp2 = path.join(simDir, seifDir, slug.replace(/-/g, "-"), "en.html");
    if (fs.existsSync(fp2)) return stripHtml(fs.readFileSync(fp2, "utf8"));
  }
  return null;
}

const T = {};
let ok = 0;
for (const n of need) {
  const sef = findSefariaEn(n.siman, n.slug.split("/")[0]);
  if (!sef || sef.length < 15) continue;
  const pf = preflightFail(sef);
  const issues = runBlockQualityChecks({
    slug: n.slug.split("/")[0],
    seif: n.key.split(":")[0],
    marker: n.key.split(":")[1] || "_",
    he: n.hePlain,
    en: sef,
  });
  if (pf || maxSeverity(issues) >= SEVERITY.warn) continue;
  const k = `${n.rel}|${n.key}`;
  T[k] = sef;
  ok++;
}
const out = path.join(__dirname, "work", "_sefaria-need-fill.mjs");
fs.writeFileSync(
  out,
  `export const T = ${JSON.stringify(T, null, 2)};\n`,
  "utf8"
);
console.log("sefaria fill", ok, "/", need.length, "->", out);
