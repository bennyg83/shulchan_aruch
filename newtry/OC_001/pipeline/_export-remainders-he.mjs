#!/usr/bin/env node
/** Export Hebrew for all blocks in remainders-500-697.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "output");
const list = JSON.parse(fs.readFileSync(path.join(__dirname, "remainders-500-697.json"), "utf8"));

const items = [];
for (const { siman, rel, key } of list) {
  const fp = path.join(simanOutputDir(OUT, siman), rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const [seif, marker] = key.split(":");
  const b = blocks.find((x) => String(x.seif) === seif && (x.marker || "_") === marker);
  if (!b) {
    console.error("MISSING", siman, rel, key);
    continue;
  }
  items.push({
    siman,
    rel,
    key,
    slug: b.slug,
    seif: b.seif,
    marker: b.marker || "_",
    he: b.he ?? "",
    hePlain: plainFromHtml(b.he ?? ""),
    enBad: String(b.en ?? "").trim(),
  });
}
const outPath = path.join(__dirname, "work", "remainders-500-697-he.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ count: items.length, items }, null, 2) + "\n", "utf8");
console.log("wrote", outPath, items.length);
