#!/usr/bin/env node
/** Extract full Hebrew for error blocks from a quality report. */
import fs from "fs";
import path from "path";
import { BLOCK_START, ENGLISH_HDR } from "../../eh001_block_lib.mjs";

const siman = process.argv[2];
const reportPath = `pipeline/work/reports-siman-${siman}/quality-report.json`;
const root = `output/siman_${siman}`;

const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
for (const b of report.blocks) {
  const fp = path.join(root, b.relPath);
  const s = fs.readFileSync(fp, "utf8");
  for (const block of s.split(BLOCK_START).slice(1)) {
    if (!block.includes(`slug: ${b.slug}`)) continue;
    if (!block.includes(`seif: ${b.seif}`)) continue;
    const m = block.match(/^\s*marker: (.+)$/m);
    const marker = m ? m[1].trim() : "main";
    if (marker !== b.marker) continue;
    const heStart = block.indexOf("**** HEBREW ****");
    const heEnd = block.indexOf(ENGLISH_HDR);
    const he = block.slice(heStart + 16, heEnd).trim().replace(/<[^>]+>/g, "");
    console.log(`\n--- ${b.relPath} ${b.seif}#${b.marker} (${he.length} chars) ---`);
    console.log(he.slice(0, 3000) + (he.length > 3000 ? "\n...[truncated]" : ""));
    break;
  }
}
