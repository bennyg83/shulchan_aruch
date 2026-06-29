#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { autoFix, preflightFail } from "./_slot18-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);
const pending = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const items = [];
for (const it of pending) {
  const fp = path.join(OUT, it.file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  const en = autoFix(b?.en ?? "", b?.marker, b?.he ?? "");
  const pf = preflightFail(en);
  const issues = runBlockQualityChecks({ ...b, en });
  const sev = maxSeverity(issues);
  if (pf || sev >= SEVERITY.warn) {
    items.push({
      rel: it.file.replace(/^siman_\d+\//, ""),
      key: `${it.seif}:${it.marker || "_"}`,
      seif: it.seif,
      marker: it.marker || "_",
      slug: it.slug,
      pf,
      issues: issues.map((i) => i.code),
      he: b?.he ?? "",
      en: b?.en ?? "",
      enFixed: en,
    });
  }
}
const outPath = path.join(WORK, `still-bad-slot19-siman-${siman}.json`);
fs.writeFileSync(outPath, JSON.stringify({ siman, count: items.length, items }, null, 2) + "\n", "utf8");
console.log("wrote", outPath, items.length);
