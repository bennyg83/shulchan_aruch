#!/usr/bin/env node
/** Dump full need-list for slot16 audit (UTF-8 safe) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot16-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) simanim.push(623, 624, 625, 626, 627, 628, 629, 630, 631);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");

function auditNeed(siman) {
  const hand = JSON.parse(
    fs.readFileSync(path.join(WORK, `hand-slot16-siman-${siman}.json`), "utf8")
  );
  const list = [];
  let ok = 0;
  for (const it of hand.items) {
    const fp = path.join(OUT, `siman_${siman}`, it.rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    let en = it.en || autoFix(b?.en ?? it.enBad ?? "", it.marker, it.he || "");
    const pf = preflightFail(en);
    const issues = runBlockQualityChecks({
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      he: it.he,
      en,
    });
    const sev = maxSeverity(issues);
    if (pf || sev >= SEVERITY.warn) {
      list.push({
        rel: it.rel,
        key: it.key,
        slug: it.slug,
        seif: it.seif,
        marker: it.marker,
        pf,
        issues: issues.map((i) => i.code),
        he: it.he,
        hePlain: it.hePlain,
        enBad: it.enBad,
      });
    } else ok++;
  }
  return { summary: { siman, total: hand.items.length, ok, need: list.length }, items: list };
}

for (const siman of simanim) {
  const { summary, items } = auditNeed(siman);
  const outPath = path.join(WORK, `need-full-slot16-siman-${siman}.json`);
  fs.writeFileSync(outPath, JSON.stringify({ summary, items }, null, 2) + "\n", "utf8");
  console.log(siman, items.length, "->", outPath);
}
