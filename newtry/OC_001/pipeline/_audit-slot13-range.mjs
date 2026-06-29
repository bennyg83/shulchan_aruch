#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot13-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);
const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const exp = {
  504: 87, 505: 48, 506: 185, 507: 192, 508: 32, 509: 144, 510: 191,
  511: 108, 512: 100, 513: 192, 514: 238, 515: 300,
};

for (const s of simanim) {
  const items = collectEditorialBlocks(OUT, s, "all", "warn", done);
  let totalHe = 0, seedOk = 0, need = 0;
  for (const it of items) {
    const fp = path.join(OUT, it.file);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    if (!b || !String(b.he ?? "").trim()) continue;
    totalHe++;
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
    if (!pf && sev < SEVERITY.warn) seedOk++;
    else need++;
  }
  console.log(
    JSON.stringify({ siman: s, queue: items.length, he: totalHe, seedOk, need, exp: exp[s] })
  );
}
