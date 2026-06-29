#!/usr/bin/env node
/** Merge export const HAND from chunk .mjs into siman453-partN.json */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chunkFile = process.argv[2];
const part = process.argv[3];
if (!chunkFile || !part) {
  console.error("Usage: node _merge-hand453-chunk.mjs <hand453-pN-x.mjs> <N>");
  process.exit(1);
}
const mod = await import(pathToFileURL(path.resolve(chunkFile)).href);
const HAND = mod.HAND || mod.t || mod.default || {};
const hand = JSON.parse(fs.readFileSync(path.join(__dirname, `siman453-part${part}.json`), "utf8"));
Object.assign(hand, HAND);
fs.writeFileSync(path.join(__dirname, `siman453-part${part}.json`), JSON.stringify(hand, null, 2) + "\n");
console.log("merged", Object.keys(HAND).length, "keys into siman453-part" + part + ".json");
