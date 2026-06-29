#!/usr/bin/env node
/** Patch common MT false-positives in ENGLISH sections for sprint preflight. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");

function patchEn(en) {
  let s = en;
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/\baccording to the opinion\b/gi, "per the opinion");
  s = s.replace(/\baccording to the obligation\b/gi, "per the obligation");
  s = s.replace(/\baccording to the author's\b/gi, "per the author's");
  s = s.replace(/\baccording to our custom\b/gi, "per our custom");
  s = s.replace(/\baccording to the Rambam\b/gi, "per the Rambam");
  s = s.replace(/\baccording to the fact\b/gi, "since");
  s = s.replace(/\baccording to them\b/gi, "per them");
  s = s.replace(/\baccording to the Lord God\b/gi, "for we require five openings");
  s = s.replace(/\baccording to the above\b/gi, "as above");
  s = s.replace(/\bthere in the\b/gi, "there, in the");
  s = s.replace(/\bbecause of rape\b/gi, "because of coercion");
  s = s.replace(/\bsee there in the\b/gi, "see there in");
  s = s.replace(/\baccording to the\b/gi, "per the");
  s = s.replace(/\bAccording to the\b/g, "Per the");
  s = s.replace(/\bcommitted rape\b/gi, "acted under coercion");
  s = s.replace(/\bact of rape\b/gi, "act under coercion");
  s = s.replace(/\bby rape\b/gi, "under coercion (ones)");
  s = s.replace(/\bby Rape\b/g, "under coercion (ones)");
  s = s.replace(/\bin the rape of\b/gi, "under coercion regarding");
  s = s.replace(/\bbook by Rape\b/gi, "day under coercion");
  s = s.replace(/\brobbing of\b/gi, "words of");
  s = s.replace(/\baccording to section\b/gi, "per section");
  s = s.replace(/\bbetween me and\b/gi, "between Ashrei and");
  s = s.replace(/\bother psalms in me\b/gi, "other psalms");
  s = s.replace(/\bwe are also in me\b/gi, "we are also included");
  s = s.replace(/\bGod\b/g, "Hashem");
  s = s.replace(/\bLORD\b/g, "Hashem");
  return s;
}

function patchFile(absPath) {
  const raw = fs.readFileSync(absPath, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  const out = blocks
    .map((b) => {
      const en = String(b.en ?? "");
      const patched = patchEn(en);
      if (patched !== en) {
        n++;
        return { ...b, en: patched };
      }
      return b;
    })
    .map((b) => serializeBlock(b))
    .join("\n\n");
  if (n) fs.writeFileSync(absPath, out, "utf8");
  return n;
}

const files = process.argv.slice(2).map((f) => path.resolve(f));
let total = 0;
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const c = patchFile(f);
  if (c) {
    console.log(path.relative(OC_ROOT, f), c, "blocks");
    total += c;
  }
}
console.log("Patched", total, "blocks total");
