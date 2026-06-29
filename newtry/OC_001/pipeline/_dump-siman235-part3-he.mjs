#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blocks = JSON.parse(fs.readFileSync(path.join(__dirname, "_siman235-blocks.json"), "utf8")).blocks;
const src = fs.readFileSync(path.join(__dirname, "_build-siman235-slot5.mjs"), "utf8");
const part2 = fs.readFileSync(path.join(__dirname, "_siman235-translations-part2.mjs"), "utf8");
const keys = [
  ...src.matchAll(/"([^"]+\|[^"]+)":/g),
  ...part2.matchAll(/"([^"]+\|[^"]+)":/g),
].map((x) => x[1]);
const missing = blocks.filter((b) => !keys.includes(`${b.rel}|${b.key}`));
fs.writeFileSync(
  path.join(__dirname, "_siman235-part3-he.json"),
  JSON.stringify(missing, null, 2) + "\n",
  "utf8"
);
console.log("wrote", missing.length, "blocks to _siman235-part3-he.json");
