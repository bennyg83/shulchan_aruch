#!/usr/bin/env node
/** Export siman 153 blocks with placeholder English → work/hand153-ph.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const PLACEHOLDER = /English translation outstanding/;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const base = path.join(ROOT, "output", "siman_153");
const outPath = path.join(__dirname, "work", "hand153-ph.json");

const items = [];
for (const slug of fs.readdirSync(base).sort()) {
  const d = path.join(base, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    const rel = `${slug}/${f}`;
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
      if (!PLACEHOLDER.test(b.en || "")) continue;
      const key = `${b.seif}:${b.marker || "_"}`;
      items.push({
        rel,
        key,
        slug: b.slug,
        seif: b.seif,
        marker: b.marker || "_",
        he: b.he,
        hePlain: plainFromHtml(b.he),
      });
    }
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ siman: 153, count: items.length, items }, null, 2) + "\n");
console.log(`extracted ${items.length} placeholders -> ${outPath}`);
