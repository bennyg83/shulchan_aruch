#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function keyFor(b) {
  return `${b.seif}:${b.marker || "_"}`;
}

function loadHand(s) {
  const p = path.join(__dirname, `_hand-en-${s}.json`);
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

for (const s of [686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697]) {
  const pad = String(s).padStart(3, "0");
  const dir = path.join(ROOT, "output", `siman_${pad}`);
  const hand = loadHand(s);
  let total = 0,
    bad = 0,
    badNoHand = 0;
  const missing = [];
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        total++;
        const hk = `${slug}/${keyFor(b)}`;
        if (isBadMt447(b.en)) {
          bad++;
          if (!hand[hk]) {
            badNoHand++;
            missing.push(hk);
          }
        }
      }
    }
  }
  console.log(
    `siman_${pad}: total=${total} bad_mt=${bad} bad_without_hand=${badNoHand} hand_keys=${Object.keys(hand).length}`
  );
  if (missing.length && missing.length <= 15) console.log("  ", missing.join(", "));
}
