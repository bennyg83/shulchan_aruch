#!/usr/bin/env node
/** MT garbage scan across all simanim (non-mechaber/rama) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..", "output");
const FAIL =
  /Lord['\u2019]s Prayer|Hashem['\u2019]s Word|Capernaum|Holy Qur['\u2019]an|psalmist|her age|the craft|Saturday|cold spot|hand recoils|first dish|allocated|Darbanan|Burburn|Gomma|Phosician|LibreTranslate|English translation pending/i;
const SKIP = new Set(["mechaber", "rama"]);

const from = +process.argv[2] || 1;
const to = +process.argv[3] || 999;

let total = 0;
const bySiman = {};
const keys = [];

for (let n = from; n <= to; n++) {
  const dir = path.join(ROOT, `siman_${String(n).padStart(3, "0")}`);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    if (SKIP.has(slug)) continue;
    const sdir = path.join(dir, slug);
    if (!fs.statSync(sdir).isDirectory()) continue;
    for (const f of fs.readdirSync(sdir).filter((x) => x.endsWith(".txt"))) {
      const text = fs.readFileSync(path.join(sdir, f), "utf8");
      for (const ch of text.split("**** END BLOCK ****")) {
        if (!ch.includes("**** ENGLISH ****")) continue;
        const eng = ch.split("**** ENGLISH ****")[1].trim();
        if (!FAIL.test(eng)) continue;
        const seif = ch.match(/seif: (\S+)/)?.[1] ?? "?";
        const marker = ch.match(/marker: (\S+)/)?.[1] ?? "?";
        const rel = `siman_${String(n).padStart(3, "0")}/${slug}/${f}`;
        keys.push(`${rel}|${seif}|${marker}`);
        bySiman[n] = (bySiman[n] || 0) + 1;
        total++;
      }
    }
  }
}

if (process.argv.includes("--write")) {
  const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "_corpus-mt-keys.json");
  fs.writeFileSync(outPath, JSON.stringify({ total, bySiman, keys }, null, 2));
  console.log("Wrote", outPath);
}

console.log(`[TOTAL] ${total} MT blocks in simanim ${from}-${to}`);
const top = Object.entries(bySiman)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 25);
console.log("[TOP]", top.map(([s, c]) => `${s}:${c}`).join(", "));
if (total <= 60) keys.forEach((k) => console.log(k));
