#!/usr/bin/env node
/** Rebuild hand153-garbled.mjs from existing FIXES + overrides (no JSON needed) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FIXES as EXISTING } from "./hand153-garbled.mjs";
import { OVERRIDES } from "./hand153-garbled-overrides.mjs";

const out = structuredClone(EXISTING);
for (const [rel, blockFixes] of Object.entries(OVERRIDES)) {
  if (!out[rel]) out[rel] = {};
  Object.assign(out[rel], blockFixes);
}
const body = `/** siman 153 garbled-block hand fixes */\nexport const FIXES = ${JSON.stringify(out, null, 2)};\n`;
fs.writeFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "hand153-garbled.mjs"), body);
let n = 0;
for (const f of Object.values(out)) n += Object.keys(f).length;
console.log(`rebuilt hand153-garbled.mjs: ${Object.keys(out).length} files, ${n} blocks`);
