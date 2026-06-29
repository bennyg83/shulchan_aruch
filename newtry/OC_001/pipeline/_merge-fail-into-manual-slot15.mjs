#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { FIXES: failFixes } = await import(
  pathToFileURL(path.join(__dirname, "_fixes-need-fail-manual-slot15.mjs")).href
);
const need = JSON.parse(
  fs.readFileSync(path.join(__dirname, "work", "need-slot15-577-588.json"), "utf8")
);
const bySiman = {};
for (const it of need) {
  if (it.siman === 577) continue;
  const en = failFixes[it.rel]?.[it.key];
  if (!en) continue;
  if (!bySiman[it.siman]) bySiman[it.siman] = {};
  if (!bySiman[it.siman][it.rel]) bySiman[it.siman][it.rel] = {};
  bySiman[it.siman][it.rel][it.key] = en;
}
for (const siman of Object.keys(bySiman).sort()) {
  const fp = path.join(__dirname, `_fixes-siman${siman}-manual-slot15.mjs`);
  let existing = {};
  if (fs.existsSync(fp)) {
    const m = await import(pathToFileURL(fp).href + "?v=" + Date.now());
    existing = m.FIXES || {};
  }
  for (const [rel, blockFixes] of Object.entries(bySiman[siman])) {
    if (!existing[rel]) existing[rel] = {};
    Object.assign(existing[rel], blockFixes);
  }
  const n = Object.values(existing).reduce((a, o) => a + Object.keys(o).length, 0);
  fs.writeFileSync(
    fp,
    `/** worker-slot-15 — siman ${siman} manual fixes */\nexport const FIXES = ${JSON.stringify(existing, null, 2)};\n`,
    "utf8"
  );
  console.log("merged", path.basename(fp), n, "blocks");
}
