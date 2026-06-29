#!/usr/bin/env node
/** Dump stripped Hebrew for translation: node _dump-hebrew.mjs 463 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "output", `siman_${siman}`);

function stripHtml(h) {
  return String(h)
    .replace(/<small>הגה[\s\S]*?<\/small>/gi, (m) => " {RAMA:" + m.replace(/<[^>]+>/g, "").replace(/^הגה\s*/, "") + "}")
    .replace(/<i[^>]*data-label="([^"]*)"[^>]*>/gi, (_, l) => {
      const n = { א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10, יא: 11, יב: 12 }[l] || l;
      return `(${n})`;
    })
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const items = [];
for (const slug of fs.readdirSync(ROOT).sort()) {
  const dir = path.join(ROOT, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".txt")).sort()) {
    const rel = `${slug}/${f}`;
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(dir, f), "utf8"))) {
      const key = `${b.seif}:${b.marker || "_"}`;
      items.push({ rel, key, slug: b.slug, he: stripHtml(b.he) });
    }
  }
}
const out = path.join(__dirname, `he${siman}-dump.json`);
fs.writeFileSync(out, JSON.stringify(items, null, 2) + "\n");
console.log(items.length, "->", out);
