import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const a = await import(pathToFileURL(path.join(__dirname, "_fixes-siman554-slot14.mjs")).href);
const b = await import(pathToFileURL(path.join(__dirname, "_hand554-batch2-en.mjs")).href);
const FIXES = { ...a.FIXES };
for (const [rel, blocks] of Object.entries(b.FIXES)) {
  FIXES[rel] = { ...(FIXES[rel] || {}), ...blocks };
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
fs.writeFileSync(path.join(__dirname, "_hand554-b1-en.mjs"), lines.join("\n"), "utf8");
console.log("wrote _hand554-b1-en.mjs");
