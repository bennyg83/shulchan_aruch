#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const h = JSON.parse(fs.readFileSync(path.join(__dirname, "_he433-export.json"), "utf8"));
const outDir = path.join(__dirname, "_he433-keys");
fs.mkdirSync(outDir, { recursive: true });
for (const k of Object.keys(h).sort()) {
  const strip = h[k]
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"');
  const safe = k
    .replace(/\//g, "__")
    .replace(/:/g, "-")
    .replace(/[^\x20-\x7E]/g, (ch) => `u${ch.codePointAt(0).toString(16)}`);
  fs.writeFileSync(path.join(outDir, `${safe}.txt`), strip, "utf8");
}
console.log("wrote", Object.keys(h).length, "files to", outDir);
