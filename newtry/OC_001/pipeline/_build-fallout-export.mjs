#!/usr/bin/env node
/** Build heNNN-bad-export.json for Heaven/Master fallout + isBadMt447. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const simans = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

function needsRetranslate(en) {
  const t = String(en ?? "");
  if (isBadMt447(t)) return true;
  if ((t.match(/\bHeaven\b/gi) || []).length >= 2) return true;
  if ((t.match(/\bthe Master\b/gi) || []).length >= 2) return true;
  if (/\bHoly Spirit\b/i.test(t)) return true;
  return false;
}

for (const siman of simans) {
  const dir = simanOutputDir(OUT, siman);
  const exp = {};
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      const rel = `${slug}/${f}`;
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        if (!needsRetranslate(b.en)) continue;
        const id = `${slug}/${b.seif}:${b.marker || "_"}`;
        exp[id] = {
          he: plainFromHtml(b.he ?? ""),
          en: String(b.en ?? "").trim(),
          file: rel,
          seif: b.seif,
          marker: b.marker || "_",
        };
      }
    }
  }
  const outPath = path.join(__dirname, `he${siman}-bad-export.json`);
  fs.writeFileSync(outPath, JSON.stringify(exp, null, 2) + "\n", "utf8");
  console.log(`siman_${siman}: ${Object.keys(exp).length} blocks -> ${outPath}`);
}
