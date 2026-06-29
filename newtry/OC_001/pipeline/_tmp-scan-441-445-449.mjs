#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const BAD = /pending|Lord'?s Prayer|Hashem'?s Word|strike in|&quot;|there in the|According to the|\bin me\b/i;

function scan(s) {
  const dir = `output/siman_${s}`;
  const need = [];
  const ok = [];
  for (const slug of fs.readdirSync(dir).sort()) {
    const p = `${dir}/${slug}/part-001.txt`;
    if (!fs.existsSync(p)) continue;
    for (const b of parseBlocksInFile(fs.readFileSync(p, "utf8"))) {
      const k = `${b.seif}:${b.marker || "_"}`;
      const hk = `${slug}/${k}`;
      const en = (b.en || "").trim();
      if (!en || BAD.test(en) || (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en))) {
        need.push({ hk, he: b.he.slice(0, 120) });
      } else ok.push(hk);
    }
  }
  console.log(`SIMAN ${s}: ok=${ok.length} need=${need.length}`);
  need.forEach((x) => console.log(" NEED", x.hk, "|", x.he.replace(/\s+/g, " ")));
}

for (const s of [441, 445, 449]) scan(s);
