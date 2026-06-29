#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SIMANIM = process.argv.slice(2).map(Number).filter(Boolean);

function stripHtml(h) {
  return h
    .replace(/<small>/gi, " [[RAMA]] ")
    .replace(/<\/small>/gi, " [[/RAMA]] ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

for (const s of SIMANIM) {
  const exp = JSON.parse(fs.readFileSync(path.join(__dirname, `he${s}-export.json`), "utf8"));
  const keys = new Set();
  for (const p of [1, 2, 3]) {
    const fp = path.join(__dirname, `he${s}-bad-p${p}.json`);
    if (fs.existsSync(fp)) JSON.parse(fs.readFileSync(fp, "utf8")).forEach((k) => keys.add(k));
  }
  const dir = path.join(ROOT, "output", `siman_${s}`);
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        const k = `${slug}/${b.seif}:${b.marker || "_"}`;
        if (isBadMt447(b.en)) keys.add(k);
      }
    }
  }
  const out = {};
  for (const k of [...keys].sort()) {
    const v = exp[k];
    if (!v) {
      console.error("missing export", s, k);
      continue;
    }
    out[k] = { he: stripHtml(v.he), en: (v.en || "").slice(0, 200), file: v.file };
  }
  const wp = path.join(__dirname, `bad-work-${s}.json`);
  fs.writeFileSync(wp, JSON.stringify(out, null, 2) + "\n");
  console.log(s, Object.keys(out).length, "->", wp);
}
