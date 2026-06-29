#!/usr/bin/env node
/** Merge FIXES from _bulk-fixes-slot16-data.mjs into per-siman manual files */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const { BY_SIMAN } = await import(pathToFileURL(path.join(path.dirname(fileURLToPath(import.meta.url)), "_bulk-fixes-slot16-data.mjs")).href);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (const [siman, fixes] of Object.entries(BY_SIMAN)) {
  const fp = path.join(__dirname, `_fixes-siman${siman}-manual-slot16.mjs`);
  let existing = {};
  if (fs.existsSync(fp)) {
    const mod = await import(pathToFileURL(fp).href + "?v=" + Date.now());
    existing = mod.FIXES || {};
  }
  for (const [rel, blockFixes] of Object.entries(fixes)) {
    if (!existing[rel]) existing[rel] = {};
    Object.assign(existing[rel], blockFixes);
  }
  fs.writeFileSync(
    fp,
    `/** worker-slot-16 — siman ${siman} manual fixes */\nexport const FIXES = ${JSON.stringify(existing, null, 2)};\n`,
    "utf8"
  );
  const n = Object.values(existing).reduce((a, r) => a + Object.keys(r).length, 0);
  console.log("merged", fp, n, "keys");
}
