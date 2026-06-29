#!/usr/bin/env node
/** Merge export const HAND from chunk .mjs into siman447-partN.json */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const part = process.argv[2];
const chunk = process.argv[3];
if (!part || !chunk) {
  console.error("Usage: node _merge-hand447-chunk.mjs <part> <chunk.mjs>");
  process.exit(1);
}
const mod = await import(pathToFileURL(path.join(__dirname, chunk)).href);
const hand = JSON.parse(fs.readFileSync(path.join(__dirname, `siman447-part${part}.json`), "utf8"));
Object.assign(hand, mod.HAND || mod.t || mod.default || {});
fs.writeFileSync(path.join(__dirname, `siman447-part${part}.json`), JSON.stringify(hand, null, 2) + "\n");
console.log("merged", Object.keys(mod.HAND || mod.t || {}).length, "into part", part);
