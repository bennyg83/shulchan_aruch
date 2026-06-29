#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SIMAN = path.join(ROOT, "output/siman_464");

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

const out = {};
for (const slug of fs.readdirSync(SIMAN).sort()) {
  const dir = path.join(SIMAN, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt")).sort()) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    for (const b of parseBlocksInFile(raw)) {
      out[`${slug}/${keyFor(b)}`] = { he: b.he, en: b.en, file: `output/siman_464/${slug}/${f}` };
    }
  }
}
const p = path.join(__dirname, "he464-export.json");
fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\n");
console.log("keys", Object.keys(out).length, "->", p);
