#!/usr/bin/env node
/** Rebuild fail fixes from need list + inline translations map */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot15-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";
import { FIXES as FAIL_RAW } from "./_fixes-need-fail-manual-slot15.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "need-slot15-577-588.json"), "utf8")
);

// Flatten duplicate rel keys from broken FAIL_RAW (last key wins) — rebuild from need + translations T
const T = {
  "581|machatzit-hashekel/part-001.txt|2:א": FAIL_RAW["machatzit-hashekel/part-001.txt"]?.["3:ד"] ? null : null,
};

// Load full translations from separate JSON if exists
const transPath = path.join(__dirname, "work", "fail-translations-slot15.json");
let TALL = {};
if (fs.existsSync(transPath)) {
  TALL = JSON.parse(fs.readFileSync(transPath, "utf8"));
}

const FIXES = {};
function set(siman, rel, key, en) {
  const k = `${siman}|${rel}|${key}`;
  if (TALL[k]) en = TALL[k];
  if (!FIXES[rel]) FIXES[rel] = {};
  FIXES[rel][key] = en;
}

// Re-import broken file by scanning need and using FAIL where unique
for (const it of need) {
  if (it.siman === 577) continue;
  const en = FAIL_RAW[it.rel]?.[it.key];
  if (en) {
    if (!FIXES[it.rel]) FIXES[it.rel] = {};
    FIXES[it.rel][it.key] = en;
  }
}

// Report still missing
let miss = 0;
for (const it of need) {
  if (it.siman === 577) continue;
  if (!FIXES[it.rel]?.[it.key]) {
    miss++;
    console.log("MISSING", it.siman, it.rel, it.key);
  }
}
fs.writeFileSync(
  path.join(__dirname, "work", "fail-fixes-flat-slot15.json"),
  JSON.stringify(FIXES, null, 2)
);
console.log("flat fixes", Object.values(FIXES).reduce((a, o) => a + Object.keys(o).length, 0), "missing", miss);
