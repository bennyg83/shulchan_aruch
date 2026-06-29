#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const BAD = [
  /pending/i,
  /Lord'?s Prayer/i,
  /Hashem/i,
  /strike in/i,
  /&quot;/,
  /there in the/i,
  /According to the/i,
  /\bin me\b/i,
  /Capernaum/i,
  /U\.S\./,
  /PLO|UN in Cologne|IDF|Gaza/i,
  /T-shirt/i,
  /Dr\. D/i,
  /Delave|Delolla/i,
  /Saturday/i,
  /hand recoils/i,
  /first dish/i,
  /allocated/i,
  /Shield of Abraham/i,
  /her age/i,
  /the craft/i,
  /Darbanan/i,
  /Israelite who lent/i, // common MT for ישראל
  /Chametz of the non-Jew/i,
];

function isBad(en) {
  if (!en || !en.trim()) return true;
  if (en.length < 8 && /^[\(\)\d\s\-]+$/.test(en)) return true;
  return BAD.some((re) => re.test(en));
}

function scan(s) {
  const dir = `output/siman_${s}`;
  let need = 0,
    ok = 0;
  for (const slug of fs.readdirSync(dir).sort()) {
    const p = `${dir}/${slug}/part-001.txt`;
    if (!fs.existsSync(p)) continue;
    for (const b of parseBlocksInFile(fs.readFileSync(p, "utf8"))) {
      const k = `${b.seif}:${b.marker || "_"}`;
      if (isBad(b.en)) {
        need++;
        console.log("BAD", s, `${slug}/${k}`);
      } else ok++;
    }
  }
  console.log(`SIMAN ${s}: ok=${ok} bad=${need} total=${ok + need}\n`);
}

for (const s of [441, 445, 449]) scan(s);
