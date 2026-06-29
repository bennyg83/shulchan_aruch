#!/usr/bin/env node
/** List simanim that contain (סעיף N) / סעי' N commentary headers (candidates for reimport). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { parseMechaberSeifRef } from "./_audit-seif-ref-mismatch.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function strictSeifRef(he) {
  const plain = plainFromHtml(he).slice(0, 80);
  const m = plain.match(/^\(סעי[ף']\s*([א-ת"'\d]+)/);
  if (m) return parseMechaberSeifRef(`סעיף ${m[1]}`);
  const m2 = plain.match(/^סעי[ף']\s*([א-ת"'\d]+)/);
  if (m2) return parseMechaberSeifRef(`סעיף ${m2[1]}`);
  return null;
}

const from = parseInt(process.argv[2], 10) || 21;
const to = parseInt(process.argv[3], 10) || 697;
const touched = new Set();

for (let siman = from; siman <= to; siman++) {
  const dir = simanOutputDir(path.join(ROOT, "output"), siman);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (strictSeifRef(b.he)) touched.add(siman);
      }
    }
  }
}

const list = [...touched].sort((a, b) => a - b);
const outPath = path.join(ROOT, "pipeline", "work", "seif-fix-touched-simanim.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  JSON.stringify({ from, to, count: list.length, simanim: list }, null, 2) + "\n",
  "utf8"
);
console.log(`Wrote ${list.length} simanim → ${outPath}`);
