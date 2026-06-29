#!/usr/bin/env node
/** Merge hand*-fix.mjs HAND exports into _hand-en-{siman}.json */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = Number(process.argv[2]);
if (!siman) {
  console.error("usage: node _import-hand-fix-chunks.mjs SIMAN");
  process.exit(1);
}

const files = fs
  .readdirSync(__dirname)
  .filter((f) => f.match(new RegExp(`^hand${siman}(-|p)`)) && f.endsWith(".mjs"));

const hand = fs.existsSync(path.join(__dirname, `_hand-en-${siman}.json`))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, `_hand-en-${siman}.json`), "utf8"))
  : {};

let n = 0;
for (const f of files.sort()) {
  const mod = await import(pathToFileURL(path.join(__dirname, f)).href);
  const h = mod.HAND || mod.default || {};
  Object.assign(hand, h);
  n += Object.keys(h).length;
}

fs.writeFileSync(path.join(__dirname, `_hand-en-${siman}.json`), JSON.stringify(hand, null, 2) + "\n");
console.log(`siman ${siman}: merged ${files.length} files, ${Object.keys(hand).length} keys (+${n} entries)`);
