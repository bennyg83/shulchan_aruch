#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447, BAD_MT_447 } from "./lib/bad-mt-447.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10) || 386;
const to = parseInt(process.argv[3], 10) || 509;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");

const counts = Object.fromEntries(BAD_MT_447.map((_, i) => [`p${i}`, 0]));

for (let s = from; s <= to; s++) {
  const dir = simanOutputDir(OUT, s);
  if (!fs.existsSync(dir)) continue;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        const en = plainFromHtml(b.en);
        if (!isBadMt447(b.en)) continue;
        BAD_MT_447.forEach((re, i) => {
          if (re.test(en)) counts[`p${i}`]++;
        });
      }
    }
  }
}
const labels = [
  "pending", "Lord's Prayer", "Lord", "Hashem", "strike in", "Capernaum", "&quot;",
  "there in", "According to the", "in me", "Saturday", "hand recoils", "first dish",
  "allocated", "Shield of Abraham", "her age", "the craft", "Darbanan", "Quran",
  "Jehovah", "Pakistan", "Hashem's Word", "Bible says", "the Bible", "Bible",
  "Hametz", "Chametz", "Rema:Rema", "Gloss-", "Reichah", "with Hashem", "chometz",
  "Yom tov", "leaven", "IDF", "U.S.", "C.C.", "N.C.", "S.C.", "A.C.", "D.C.", "U.N.",
  "thrust down to hell", "G-d", "oppressor", "UN except",
  "Nth century", "sign of Nth century", "assigned Nth century",
  "From the Beavers", "D. spirits", "grows and goes", "the beast", "Nichom Lia",
  "history of light", "history of the sun", "ovary", "murder and murder", "cold spot",
  "eastern crack", "glory of barbarism", "holy person", "third dish", "second dish",
  "the cauldron", "butcher", "brewer", "Shabbat nights", "shrinking and good/bad",
  "disgusted hand", "I shoot at a fire", "KNH'G", "PMG", "CHA", "Sach", "Radach",
];
for (let i = 0; i < BAD_MT_447.length; i++) {
  const n = counts[`p${i}`];
  if (n) console.log(`${n}\t${labels[i] || i}`);
}
