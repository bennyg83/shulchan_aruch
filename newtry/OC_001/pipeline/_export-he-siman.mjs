#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const siman = Number(process.argv[2]);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(ROOT, `output/siman_${siman}`);

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

const out = {};
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    const raw = fs.readFileSync(path.join(d, f), "utf8");
    for (const b of parseBlocksInFile(raw)) {
      out[`${slug}/${keyFor(b)}`] = {
        he: b.he,
        en: b.en,
        file: `output/siman_${siman}/${slug}/${f}`,
      };
    }
  }
}
const p = path.join(path.dirname(fileURLToPath(import.meta.url)), `he${siman}-export.json`);
fs.writeFileSync(p, JSON.stringify(out, null, 2) + "\n");
console.log("keys", Object.keys(out).length, "->", p);
