#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const lo = Number(process.argv[2]) || 669;
const hi = Number(process.argv[3]) || lo;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
for (let s = lo; s <= hi; s++) {
  const p = path.join(__dirname, "work", `hand-slot18-siman-${s}.json`);
  if (!fs.existsSync(p)) {
    console.log(s, "NO_HAND");
    continue;
  }
  const h = JSON.parse(fs.readFileSync(p, "utf8"));
  const miss = h.items.filter((x) => !x.en || String(x.en).trim().length < 8);
  console.log(s, "missing", miss.length);
  for (const m of miss) console.log(" ", m.rel, m.key, (m.hePlain || "").slice(0, 80));
}
