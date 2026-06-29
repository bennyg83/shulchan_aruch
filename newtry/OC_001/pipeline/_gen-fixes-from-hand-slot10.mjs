#!/usr/bin/env node
/** Generate _fixes-simanNNN-slot10.mjs skeleton from hand JSON for manual fill */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix, preflightFail } from "./_slot10-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot10-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const fixes = {};
for (const it of hand.items) {
  if (!fixes[it.rel]) fixes[it.rel] = {};
  let en = autoFix(it.enBad || "", it.marker, it.he || "");
  const pf = preflightFail(en);
  if (pf || en.length < 20) en = `TRANSLATE:${it.hePlain.slice(0, 80)}`;
  fixes[it.rel][it.key] = en;
}
const out = path.join(__dirname, `_fixes-siman${siman}-slot10.mjs`);
const body = `/** worker-slot-10 — siman ${siman} — NEEDS MANUAL TRANSLATION */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`;
fs.writeFileSync(out, body, "utf8");
console.log("wrote", out, hand.items.length, "blocks");
