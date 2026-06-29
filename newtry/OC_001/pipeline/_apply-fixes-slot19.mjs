#!/usr/bin/env node
/** Apply slot19 fixes from work/slot19-fixes.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixesPath = path.join(__dirname, "work", "slot19-fixes.json");
if (!siman) {
  console.error("usage: node _apply-fixes-slot19.mjs <siman>");
  process.exit(1);
}
const all = JSON.parse(fs.readFileSync(fixesPath, "utf8"));
const FIXES = all[String(siman)];
if (!FIXES) {
  console.log("no fixes for siman", siman);
  process.exit(0);
}

const base = path.join(__dirname, "..", "output", `siman_${siman}`);
let total = 0;
const fails = [];

for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (!blockFixes[key]) return b;
      let en = blockFixes[key];
      en = autoFix(en, b.marker, b.he);
      const pf = preflightFail(en);
      const issues = runBlockQualityChecks({ ...b, en });
      if (pf || maxSeverity(issues) >= SEVERITY.warn) {
        fails.push({ rel, key, pf, issues: issues.map((i) => i.code) });
        return b;
      }
      total++;
      return { ...b, en };
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
}
console.log("siman", siman, "applied", total);
if (fails.length) {
  console.error("FAILURES", JSON.stringify(fails, null, 2));
  process.exit(1);
}
