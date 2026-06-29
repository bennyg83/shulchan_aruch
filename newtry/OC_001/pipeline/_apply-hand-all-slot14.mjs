#!/usr/bin/env node
/** Apply every hand-slot14 item.en to output (full siman) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail, loadHandJson } from "./_slot14-lib.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _apply-hand-all-slot14.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output", `siman_${siman}`);
const hand = loadHandJson(__dirname, siman);

const byFile = new Map();
for (const it of hand.items || []) {
  if (!it.en || !String(it.en).trim()) {
    const fp = path.join(OUT, it.rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    it.en = autoFix(b?.en ?? it.enBad ?? "", it.marker, it.he || "");
    if (!it.en || preflightFail(it.en)) {
      console.error("missing en", it.rel, it.key);
      process.exit(1);
    }
  }
  if (!byFile.has(it.rel)) byFile.set(it.rel, []);
  byFile.get(it.rel).push(it);
}

let total = 0;
const fails = [];
for (const [rel, items] of byFile) {
  const fp = path.join(OUT, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks.map((b) => {
    const it = items.find(
      (x) =>
        String(x.seif) === String(b.seif) &&
        String(x.marker || "_") === String(b.marker || "_")
    );
    if (!it) return b;
    const en = autoFix(it.en, b.marker, b.he);
    const pf = preflightFail(en);
    if (pf) fails.push(`${rel} ${it.key}: ${pf}`);
    total++;
    return { ...b, en };
  });
  fs.writeFileSync(fp, out.map(serializeBlock).join("\n\n") + "\n", "utf8");
}

console.log("applied", total, "blocks");
if (fails.length) {
  console.error("PREFLIGHT:", fails.slice(0, 10).join("\n"));
  process.exit(1);
}
console.log("preflight ok");
