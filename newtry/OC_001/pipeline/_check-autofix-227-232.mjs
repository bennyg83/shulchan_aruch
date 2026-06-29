#!/usr/bin/env node
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const work = path.join(__dirname, "work");
const out = path.join(__dirname, "..", "output");
const done = loadEditorialDoneIds(work);

function autoFix(en, marker) {
  let t = String(en ?? "").trim();
  t = t
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/Lord our God/g, "Hashem our God")
    .replace(/\bLord\b/g, "Hashem")
    .replace(/\bGod's\b/g, "Hashem's")
    .replace(/\bGod\b/g, "Hashem");
  const mk = String(marker ?? "_").trim();
  if (/^[א-ת]$/.test(mk)) {
    t = t.replace(/^\(\d+\)\s*/, "");
    if (!t.slice(0, 12).includes(`(${mk})`)) t = `(${mk}) ${t}`;
  }
  return t;
}

for (const s of [227, 228, 229, 230, 231, 232]) {
  const all = collectEditorialBlocks(out, s, "all", "warn", done);
  let warn = 0;
  let err = 0;
  for (const it of all) {
    const fp = path.join(out, it.file);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    const en = autoFix(b?.en, it.marker);
    const issues = runBlockQualityChecks({ ...it, en, he: b?.he });
    if (issues.some((x) => x.severity === "error")) err++;
    else if (issues.some((x) => x.severity === "warn")) warn++;
  }
  console.log("siman", s, "blocks", all.length, "err", err, "warn", warn);
  for (const it of all) {
    const fp = path.join(out, it.file);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    const en = autoFix(b?.en, it.marker);
    const issues = runBlockQualityChecks({ ...it, en, he: b?.he }).filter(
      (x) => x.severity === "error" || x.severity === "warn"
    );
    if (issues.length) {
      console.log(
        " ",
        it.file,
        `${it.seif}:${it.marker || "_"}`,
        issues.map((x) => `${x.code}`).join(",")
      );
    }
  }
}
