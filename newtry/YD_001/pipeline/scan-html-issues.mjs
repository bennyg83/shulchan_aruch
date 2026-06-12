#!/usr/bin/env node
/** Scan simanim for HTML / presentation issues in English. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../yd001_block_lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const outRoot = path.join(OC_ROOT, "output");

function parseArgs() {
  let from = 1;
  let to = 20;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
  }
  return { from, to };
}

const HTML_CODES = new Set([
  "html_entity_leak",
  "broken_html",
  "hebrew_in_english",
  "mt_garbage",
]);

function main() {
  const { from, to } = parseArgs();
  const bySiman = {};
  let total = 0;
  let flagged = 0;

  for (let s = from; s <= to; s++) {
    const dir = path.join(outRoot, `siman_${String(s).padStart(3, "0")}`);
    if (!fs.existsSync(dir)) continue;
    bySiman[s] = { blocks: 0, issues: 0, codes: {} };
    for (const sub of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!sub.isDirectory()) continue;
      for (const pf of fs.readdirSync(path.join(dir, sub.name)).filter((x) =>
        x.endsWith(".txt")
      )) {
        const raw = fs.readFileSync(path.join(dir, sub.name, pf), "utf8");
        const blocks = parseBlocksInFile(raw);
        for (const b of blocks) {
          total++;
          bySiman[s].blocks++;
          const en = String(b.en ?? "").trim();
          const he = String(b.he ?? "").trim();
          if (!en) continue;
          const issues = runBlockQualityChecks({
            slug: b.slug,
            seif: b.seif,
            marker: b.marker,
            he,
            en,
          });
          const htmlRelated = issues.filter((i) => HTML_CODES.has(i.code));
          if (htmlRelated.length) {
            flagged++;
            bySiman[s].issues++;
            for (const i of htmlRelated) {
              bySiman[s].codes[i.code] = (bySiman[s].codes[i.code] || 0) + 1;
            }
          }
        }
      }
    }
  }

  console.log(JSON.stringify({ from, to, total, flagged, bySiman }, null, 2));
}

main();
