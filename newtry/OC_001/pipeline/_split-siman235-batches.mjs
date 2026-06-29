#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { blocks } = JSON.parse(fs.readFileSync(path.join(__dirname, "_siman235-blocks.json"), "utf16le").replace(/^\uFEFF/, "") || fs.readFileSync(path.join(__dirname, "_siman235-blocks.json"), "utf8"));
const sizes = [45, 45, 37];
let start = 0;
for (let bi = 0; bi < 3; bi++) {
  const slice = blocks.slice(start, start + sizes[bi]);
  console.log(`batch${bi + 1}: ${slice.length} blocks`);
  slice.forEach((b, i) => console.log(`${start + i + 1}. ${b.rel} ${b.key}`));
  start += sizes[bi];
}
