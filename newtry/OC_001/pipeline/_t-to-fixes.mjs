#!/usr/bin/env node
/** Build _fixes-simanNNN-slot11.mjs from _simanNNN-en-data.mjs export T */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, `_siman${siman}-en-data.mjs`);
const { T } = await import(pathToFileURL(dataPath).href);
const fixes = {};
for (const [rk, en] of Object.entries(T)) {
  const m = rk.match(/^(.+\.txt):(.+)$/);
  if (!m) throw new Error("bad key: " + rk);
  const [, rel, key] = m;
  if (!fixes[rel]) fixes[rel] = {};
  fixes[rel][key] = en;
}
const count = Object.values(fixes).reduce((n, m) => n + Object.keys(m).length, 0);
const out = path.join(__dirname, `_fixes-siman${siman}-slot11.mjs`);
fs.writeFileSync(
  out,
  `/** OC siman ${siman} — ${count} blocks R1–R10 */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`,
  "utf8"
);
console.log("wrote", out, count);
