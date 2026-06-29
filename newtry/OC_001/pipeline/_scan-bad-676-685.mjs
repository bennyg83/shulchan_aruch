#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const s of [676, 677, 678, 679, 680, 681, 682, 683, 684, 685]) {
  const pad = String(s).padStart(3, "0");
  const dir = path.join(ROOT, "output", `siman_${pad}`);
  let total = 0,
    bad = 0;
  const badKeys = [];
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        total++;
        if (isBad(b.en)) {
          bad++;
          badKeys.push(`${slug}/${b.seif}:${b.marker || "_"}`);
        }
      }
    }
  }
  console.log(`siman_${pad}: total=${total} bad_mt=${bad}`);
  if (bad) console.log("  ", badKeys.slice(0, 5).join(", "), bad > 5 ? "..." : "");
}
