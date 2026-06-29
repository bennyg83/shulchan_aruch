#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail, hePlain, blockKey } from "./_slot13-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);
const items = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const need = [];
for (const it of items) {
  const fp = path.join(OUT, it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  if (!b || !String(b.he ?? "").trim()) continue;
  const en = autoFix(String(b.en ?? ""), it.marker, b.he);
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he: b.he,
    en,
  });
  const sev = maxSeverity(issues);
  if (pf || sev >= SEVERITY.warn) {
    need.push({
      rel: it.file.replace(/^siman_\d+\//, ""),
      key: blockKey(it.seif, it.marker),
      slug: it.slug,
      seif: it.seif,
      marker: it.marker || "_",
      he: b.he,
      hePlain: hePlain(b.he),
      enBad: String(b.en ?? "").trim(),
      pf,
      issues: issues.map((i) => i.code),
    });
  }
}
const outPath = path.join(WORK, `slot13-need-siman-${siman}.json`);
fs.writeFileSync(outPath, JSON.stringify({ siman, count: need.length, items: need }, null, 2) + "\n");
console.log("wrote", outPath, need.length);
