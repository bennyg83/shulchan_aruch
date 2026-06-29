#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = path.join(ROOT, "output");

for (let s = 141; s <= 155; s++) {
  const sim = String(s).padStart(3, "0");
  const dir = path.join(OUT, `siman_${sim}`);
  let total = 0, mech = 0, pt = 0;
  const bySlug = {};
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".txt")) {
        const slug = path.basename(path.dirname(p));
        const n = parseBlocksInFile(fs.readFileSync(p, "utf8")).length;
        total += n;
        bySlug[slug] = (bySlug[slug] || 0) + n;
        if (slug === "mechaber") mech += n;
        if (slug === "pitchei-teshuva") pt += n;
      }
    }
  }
  walk(dir);
  console.log(`siman_${sim}: total=${total} mechaber=${mech} pitchei=${pt}`, bySlug);
}
