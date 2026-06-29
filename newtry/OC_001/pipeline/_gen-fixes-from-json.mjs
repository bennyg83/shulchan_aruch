#!/usr/bin/env node
/** node _gen-fixes-from-json.mjs 463 translations463.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const siman = Number(process.argv[2]);
const jsonPath = path.resolve(process.argv[3]);
const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const FIXES = {};
for (const { rel, key, en } of data) {
  if (!FIXES[rel]) FIXES[rel] = {};
  FIXES[rel][key] = en;
}
const lines = ["export const FIXES = {"];
for (const [rel, blocks] of Object.entries(FIXES)) {
  lines.push(`  ${JSON.stringify(rel)}: {`);
  for (const [k, v] of Object.entries(blocks)) {
    lines.push(`    ${JSON.stringify(k)}: ${JSON.stringify(v)},`);
  }
  lines.push("  },");
}
lines.push("};");
lines.push("");
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), `_fixes-siman${siman}-slot11.mjs`);
fs.writeFileSync(out, lines.join("\n"));
console.log("wrote", out, Object.keys(data).length || data.length, "entries");
