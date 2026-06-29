import fs from "fs";
import { pathToFileURL } from "url";
const { FIXES } = await import(pathToFileURL("./_fixes-siman464-slot11.mjs").href);
const fixed = {};
for (const [rel, blocks] of Object.entries(FIXES)) {
  fixed[rel] = {};
  for (const [k, v] of Object.entries(blocks)) {
    const nk = k.includes(":") ? k : `1:${k}`;
    fixed[rel][nk] = v;
  }
}
const lines = ["export const FIXES = {"];
for (const [rel, blocks] of Object.entries(fixed)) {
  lines.push(`  "${rel}": {`);
  for (const [k, v] of Object.entries(blocks)) {
    const key = JSON.stringify(k);
    lines.push(`    ${key}: ${JSON.stringify(v)},`);
  }
  lines.push("  },");
}
lines.push("};");
lines.push("");
fs.writeFileSync("_fixes-siman464-slot11.mjs", lines.join("\n"));
console.log("fixed keys");
