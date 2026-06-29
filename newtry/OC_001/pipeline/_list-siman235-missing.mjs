#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocks = JSON.parse(
  fs.readFileSync(path.join(__dirname, "_siman235-blocks.json"), "utf8").replace(/^\uFEFF/, "")
).blocks;
const src = fs.readFileSync(path.join(__dirname, "_build-siman235-slot5.mjs"), "utf8");
const keys = [...src.matchAll(/"([^"]+\|[^"]+)":/g)].map((x) => x[1]);
const missing = blocks.filter((b) => !keys.includes(`${b.rel}|${b.key}`));
console.log("part1 keys", keys.length, "total", blocks.length, "missing", missing.length);
for (const b of missing) console.log(`${b.rel}|${b.key}`);
