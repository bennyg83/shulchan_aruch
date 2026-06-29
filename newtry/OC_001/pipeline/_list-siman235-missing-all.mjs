#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocks = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_siman235-blocks.json"), "utf8").replace(/^\uFEFF/, "").replace(/^\uFEFF/, "")
).blocks;

const { TRANSLATIONS: p1 } = await import("./_build-siman235-slot5.mjs").catch(() => ({ TRANSLATIONS: {} }));
// build file doesn't export - use dynamic merge
const buildSrc = fs.readFileSync(path.join(__dirname, "_build-siman235-slot5.mjs"), "utf8");
const part1Keys = [...buildSrc.matchAll(/"([^"]+\|[^"]+)":/g)].map((x) => x[1]);
const part2 = await import("./_siman235-translations-part2.mjs");
const part3 = await import("./_siman235-translations-part3.mjs");
const all = new Set([...part1Keys, ...Object.keys(part2.TRANSLATIONS || part2), ...Object.keys(part3.TRANSLATIONS)]);
const keys = [...part1Keys, ...Object.keys(part2.TRANSLATIONS), ...Object.keys(part3.TRANSLATIONS)];
const keySet = new Set(keys);
const missing = blocks.filter((b) => !keySet.has(`${b.rel}|${b.key}`));
console.log("keys", keySet.size, "total", blocks.length, "missing", missing.length);
for (const b of missing) console.log(`${b.rel}|${b.key}`);
