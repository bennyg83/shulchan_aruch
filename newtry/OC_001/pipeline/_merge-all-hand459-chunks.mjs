#!/usr/bin/env node
/** Merge hand459-p{N}-*.mjs chunks into siman459-part{N}.json */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2] || "all";

async function mergePart(p) {
  const hand = JSON.parse(fs.readFileSync(path.join(__dirname, `siman459-part${p}.json`), "utf8"));
  const files = fs.readdirSync(__dirname).filter((f) => f.match(new RegExp(`^hand459-p${p}-.+\\.mjs$`)));
  let n = 0;
  for (const f of files.sort()) {
    const mod = await import(pathToFileURL(path.join(__dirname, f)).href);
    const h = mod.HAND || mod.t || mod.default || {};
    Object.assign(hand, h);
    n += Object.keys(h).length;
  }
  fs.writeFileSync(path.join(__dirname, `siman459-part${p}.json`), JSON.stringify(hand, null, 2) + "\n");
  console.log(`part${p}: merged ${files.length} chunks, ${Object.keys(hand).length} total keys`);
}

if (part === "all") {
  for (const p of [1, 2, 3]) await mergePart(p);
} else {
  await mergePart(part);
}
