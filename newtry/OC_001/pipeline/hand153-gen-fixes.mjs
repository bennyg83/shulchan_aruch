#!/usr/bin/env node
/** Build hand153-p*.mjs + hand153-fixes.mjs from work/hand153-ph.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "work", "hand153-ph.json");
const CHUNK = 90;

import { OVERRIDES } from "./hand153-overrides.mjs";

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const byFile = {};
let missing = 0;
for (const it of data.items) {
  if (!it.en || !String(it.en).trim()) {
    missing++;
    continue;
  }
  if (!byFile[it.rel]) byFile[it.rel] = {};
  byFile[it.rel][it.key] = String(it.en).trim();
}
for (const [rel, blockFixes] of Object.entries(OVERRIDES)) {
  if (!byFile[rel]) byFile[rel] = {};
  Object.assign(byFile[rel], blockFixes);
}

const entries = Object.entries(byFile);
const parts = [];
for (let i = 0; i < entries.length; i += CHUNK) {
  parts.push(Object.fromEntries(entries.slice(i, i + CHUNK)));
}

const imports = [];
const merges = [];
parts.forEach((obj, i) => {
  const n = i + 1;
  const name = `P${n}`;
  const fp = path.join(__dirname, `hand153-p${n}.mjs`);
  fs.writeFileSync(
    fp,
    `/** worker-slot-3 — siman 153 placeholder fixes part ${n}/${parts.length} */\nexport const ${name} = ${JSON.stringify(obj, null, 2)};\n`,
    "utf8"
  );
  imports.push(`import { ${name} } from "./hand153-p${n}.mjs";`);
  merges.push(`...${name}`);
  console.log(`wrote hand153-p${n}.mjs keys=${Object.keys(obj).length}`);
});

const fixesBody = `${imports.join("\n")}\n\nexport const FIXES = {\n${merges.map((m) => `  ${m},`).join("\n")}\n};\n`;
fs.writeFileSync(path.join(__dirname, "hand153-fixes.mjs"), `/** worker-slot-3 — siman 153 placeholder blocks (merged) */\n${fixesBody}`, "utf8");
console.log(`hand153-fixes.mjs: ${Object.keys(byFile).length} files, ${data.items.length - missing} blocks, missing en=${missing}`);
if (missing) process.exit(1);
