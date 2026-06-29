#!/usr/bin/env node
/** Merge FIXES { rel: { key: en } } into work/hand-slot6-siman-NNN.json items[].en */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const siman = parseInt(process.argv[2], 10);
const fixesPath = process.argv[3];
if (!siman || !fixesPath) {
  console.error("Usage: _inject-hand-slot6.mjs <siman> <fixes.mjs|fixes.json>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const handPath = path.join(__dirname, "work", `hand-slot6-siman-${siman}.json`);
const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));

let FIXES;
const absFixes = path.resolve(fixesPath);
if (fixesPath.endsWith(".mjs")) {
  FIXES = (await import(pathToFileURL(absFixes).href)).FIXES;
} else {
  FIXES = JSON.parse(fs.readFileSync(absFixes, "utf8"));
}

const byKey = {};
for (const it of hand.items) byKey[`${it.rel}\t${it.key}`] = it;

let n = 0;
for (const [rel, blockFixes] of Object.entries(FIXES)) {
  for (const [key, en] of Object.entries(blockFixes)) {
    const it = byKey[`${rel}\t${key}`];
    if (!it) {
      console.error("missing item", rel, key);
      process.exit(1);
    }
    it.en = en;
    n++;
  }
}
fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
console.log("injected", n, "translations into", handPath);
