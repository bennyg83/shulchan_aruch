#!/usr/bin/env node
/** Build _fixes-simanNNN-slot12.mjs from hand-slot12 JSON en fields */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot12-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
if (!fs.existsSync(handPath)) {
  console.error("missing", handPath);
  process.exit(1);
}
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const fixes = {};
const fails = [];
for (const it of hand.items) {
  if (!it.en) continue;
  if (!fixes[it.rel]) fixes[it.rel] = {};
  const en = autoFix(it.en, it.marker, it.he || "");
  const pf = preflightFail(en);
  if (pf) fails.push(`${it.rel} ${it.key}: ${pf}`);
  fixes[it.rel][it.key] = en;
}
const out = path.join(__dirname, `_fixes-siman${siman}-slot12.mjs`);
fs.writeFileSync(
  out,
  `/** worker-slot-12 — siman ${siman} (${Object.values(fixes).reduce((n, o) => n + Object.keys(o).length, 0)} blocks) */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
  "utf8"
);
console.log("wrote", out);
if (fails.length) {
  console.error("preflight fails:", fails.slice(0, 10).join("\n"));
  process.exit(1);
}
