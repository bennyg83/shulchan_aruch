#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

const raw = JSON.parse(fs.readFileSync(path.join(dir, "_en366-small-raw.json"), "utf8"));
const lines = ["export const t = {"];
for (const [k, v] of Object.entries(raw)) {
  lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
}
lines.push("};");
fs.writeFileSync(path.join(dir, "small366-en.mjs"), lines.join("\n") + "\n", "utf8");
console.log(`small366-en.mjs: ${Object.keys(raw).length} keys`);
