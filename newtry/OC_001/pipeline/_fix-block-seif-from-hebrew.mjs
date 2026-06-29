#!/usr/bin/env node
/**
 * Remap block `seif` when Hebrew explicitly opens with (סעיף N) / סעיף N (commentary on Mechaber seif N).
 * Usage: node pipeline/_fix-block-seif-from-hebrew.mjs --from 1 --to 20 [--dry-run]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";
import { parseMechaberSeifRef } from "./_audit-seif-ref-mismatch.mjs";
import { strictSeifRef } from "./_list-seif-header-simanim.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function readSeifCount(siman) {
  const meta = path.join(
    ROOT,
    "..",
    "Sefaria Pulls",
    "shulchan-arukh",
    "Orach_Chayim",
    "simanim",
    String(siman).padStart(3, "0"),
    "meta.json"
  );
  if (!fs.existsSync(meta)) return 99;
  return Number(JSON.parse(fs.readFileSync(meta, "utf8")).seif_count) || 99;
}

function parseArgs() {
  let from = 1;
  let to = 1;
  let dry = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--dry-run") dry = true;
  }
  return { from, to, dry };
}

const { from, to, dry } = parseArgs();
let total = 0;
const simanimTouched = new Set();

for (let siman = from; siman <= to; siman++) {
  const maxSeif = readSeifCount(siman);
  const dir = simanOutputDir(path.join(ROOT, "output"), siman);
  let simanFixed = 0;

  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      const fp = path.join(d, f);
      const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
      let ch = false;
      for (const b of blocks) {
        const ref = strictSeifRef(b.he);
        if (!ref || ref < 1 || ref > maxSeif) continue;
        if (String(ref) === String(b.seif)) continue;
        const oldSeif = b.seif;
        if (!dry) b.seif = String(ref);
        console.log(
          `${dry ? "[dry] " : ""}siman_${siman}/${slug} seif ${oldSeif} → ${ref} (${f})`
        );
        simanFixed++;
        simanimTouched.add(siman);
        ch = true;
      }
      if (ch && !dry) {
        const out = blocks.map((x) => serializeBlock(x)).join("\n\n");
        fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
      }
    }
  }
  console.log(`siman_${siman}: ${simanFixed} block(s) remapped`);
  total += simanFixed;
}

console.log(`Total: ${total}${dry ? " (dry-run)" : ""}`);
if (!dry && simanimTouched.size) {
  const outPath = path.join(ROOT, "pipeline", "work", "seif-fix-touched-simanim.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const list = [...simanimTouched].sort((a, b) => a - b);
  fs.writeFileSync(outPath, JSON.stringify({ from, to, count: list.length, simanim: list }, null, 2) + "\n", "utf8");
  console.log(`Wrote ${list.length} touched simanim → ${outPath}`);
}
