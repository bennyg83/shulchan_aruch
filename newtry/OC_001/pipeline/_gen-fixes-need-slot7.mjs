#!/usr/bin/env node
/** Generate _fixes-simanNNN-slot7.mjs from need-blocks + output (citation shortcuts + cleaned en) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot7-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "need-blocks-292-299.json"), "utf8")
).filter((x) => x.siman === siman);

const OUT = path.join(__dirname, "..", "output", `siman_${siman}`);
const FIXES = {};

function citeFix(hePlain, marker) {
  const h = hePlain.trim();
  const mk = String(marker || "_").trim();
  const pre = /^[א-ת]$/.test(mk) ? `(${mk}) ` : mk !== "_" ? `(${mk}) ` : "";
  if (/^טור\.?$/.test(h)) return pre + "Tur — source.";
  if (/^שם\.?$/.test(h)) return pre + "ibid. (see above).";
  if (/^ר"י\.?:?$/.test(h)) return pre + "R' Yitzchak — source.";
  if (/^סא"ח\.?:?$/.test(h)) return pre + "Sefer Chasidim — source.";
  if (/ברכ/.test(h) && h.length < 40) return pre + h + " — source.";
  return null;
}

for (const n of need) {
  const fp = path.join(OUT, n.rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const [seif, marker] = n.key.includes(":") ? n.key.split(":") : [n.key, "_"];
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(seif) &&
      String(x.marker || "_") === String(marker || "_")
  );
  let en = citeFix(n.hePlain, marker);
  if (!en) {
    en = autoFix(String(b?.en ?? n.enBad ?? ""), marker, b?.he ?? n.he);
    const issues = runBlockQualityChecks({
      slug: b?.slug,
      seif,
      marker,
      he: b?.he,
      en,
    });
    if (preflightFail(en) || maxSeverity(issues) >= SEVERITY.warn) {
      en = autoFix(n.hePlain, marker, b?.he ?? n.he);
    }
  }
  if (!FIXES[n.rel]) FIXES[n.rel] = {};
  FIXES[n.rel][n.key] = en.replace(/\bAccording to the\b/gi, "per the").trim();
}

const outPath = path.join(__dirname, `_fixes-siman${siman}-slot7.mjs`);
const body = `/** worker-slot-7 — siman ${siman} editorial fixes (${need.length} blocks) — auto-generated */\nexport const FIXES = ${JSON.stringify(FIXES, null, 2)};\n`;
fs.writeFileSync(outPath, body, "utf8");
console.log("wrote", outPath, Object.values(FIXES).reduce((a, o) => a + Object.keys(o).length, 0), "keys");
