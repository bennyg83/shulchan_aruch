#!/usr/bin/env node
/** Export all error blocks corpus-wide to _corpus-error-blocks.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks, plainFromHtml } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");
const codes = process.argv[2] ? process.argv[2].split(",") : null;

const rows = [];
for (const d of fs.readdirSync(OUT).filter((x) => /^siman_\d+$/.test(x)).sort()) {
  const n = +d.replace("siman_", "");
  for (const slug of fs.readdirSync(path.join(OUT, d))) {
    const sd = path.join(OUT, d, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      const rel = `${d}/${slug}/${f}`;
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(sd, f), "utf8"))) {
        const errs = runBlockQualityChecks(b).filter((e) => e.severity === "error");
        if (!errs.length) continue;
        if (codes && !errs.some((e) => codes.includes(e.code))) continue;
        rows.push({
          key: `${rel}|${b.seif}|${b.marker || "main"}`,
          siman: n,
          slug,
          seif: b.seif,
          marker: b.marker || "main",
          codes: errs.map((e) => e.code),
          he: plainFromHtml(b.he),
          en: plainFromHtml(b.en),
        });
      }
    }
  }
}

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_corpus-error-blocks.json");
fs.writeFileSync(outPath, JSON.stringify({ count: rows.length, rows }, null, 2));
console.log(`[EXPORT] ${rows.length} error blocks`);
