#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) simanim.push(559, 560, 561, 562, 563);

for (const s of simanim) {
  const raw = fs.readFileSync(path.join(__dirname, "work", `audit-need-${s}.json`), "utf8");
  const arr = JSON.parse(raw.slice(raw.indexOf("[")));
  const items = [];
  for (const a of arr) {
    const fp = path.join(OUT, `siman_${s}`, a.rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const [seif, marker] = a.key.split(":");
    const b = blocks.find(
      (x) =>
        String(x.seif) === seif &&
        String(x.marker || "_") === (marker === "main" ? "main" : marker || "_")
    );
    if (!b) {
      console.error("missing", s, a.rel, a.key);
      continue;
    }
    items.push({
      rel: a.rel,
      key: a.key,
      slug: b.slug,
      seif: b.seif,
      marker: b.marker || "_",
      he: b.he,
      issues: a.issues,
    });
  }
  const outPath = path.join(__dirname, "work", `need-he-${s}.json`);
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2) + "\n", "utf8");
  console.log("siman", s, "wrote", items.length);
}
