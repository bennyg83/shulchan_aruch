#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const rel = "siman_159/kaf-hachayyim/part-001.txt";
const en = fs.readFileSync(path.join(__dirname, "work/en-159-kh-17.txt"), "utf8").trim();

const fp = path.join(ROOT, "output", rel);
const s = fs.readFileSync(fp, "utf8");
const parts = s.split("**** OC001 SOURCE BLOCK ****");
let found = false;
const out = parts.map((block, i) => {
  if (i === 0) return block;
  const slugM = block.match(/^\s*slug: (.+)$/m);
  const seifM = block.match(/^\s*seif: (.+)$/m);
  const markerM = block.match(/^\s*marker: (.+)$/m);
  const head = "**** OC001 SOURCE BLOCK ****";
  if (
    !slugM ||
    slugM[1].trim() !== "kaf-hachayyim" ||
    !seifM ||
    seifM[1].trim() !== "17" ||
    !markerM ||
    markerM[1].trim() !== "_"
  ) {
    return head + block;
  }
  found = true;
  const enTag = "**** ENGLISH ****";
  const endTag = "**** END BLOCK ****";
  const enStart = block.indexOf(enTag);
  const enEnd = block.indexOf(endTag);
  const before = block.slice(0, enStart + enTag.length + 1);
  const after = block.slice(enEnd);
  const nl = block[enEnd - 1] === "\n" ? "" : "\n";
  return head + before + en + nl + after;
});
if (!found) throw new Error("block not found");
fs.writeFileSync(fp, out.join(""), "utf8");
console.log("OK kaf-hachayyim 17");
