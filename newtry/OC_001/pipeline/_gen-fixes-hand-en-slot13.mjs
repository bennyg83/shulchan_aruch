#!/usr/bin/env node
/** Build _fixes-simanNNN-slot13.mjs from hand-slot13 items[].en */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { autoFix } from "./_slot13-lib.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
const fixes = {};
for (const it of hand.items) {
  if (!fixes[it.rel]) fixes[it.rel] = {};
  fixes[it.rel][it.key] = autoFix(it.en || "", it.marker, it.he || "");
}
const out = path.join(__dirname, `_fixes-siman${siman}-slot13.mjs`);
const body = `/** worker-slot-13 — siman ${siman} (${hand.items.length} blocks) */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`;
fs.writeFileSync(out, body, "utf8");
console.log("wrote", out);
