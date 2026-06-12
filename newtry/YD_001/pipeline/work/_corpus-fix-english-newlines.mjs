#!/usr/bin/env node
/** Ensure English body starts on its own line after **** ENGLISH **** */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..", "output");
const ENG = "**** ENGLISH ****";
let files = 0;
let blocks = 0;

for (const d of fs.readdirSync(ROOT).filter((x) => /^siman_\d+$/.test(x))) {
  for (const slug of fs.readdirSync(path.join(ROOT, d))) {
    const sd = path.join(ROOT, d, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      const fp = path.join(sd, f);
      let text = fs.readFileSync(fp, "utf8");
      const orig = text;
      text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      const re = new RegExp(`(${ENG.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})([^\\n])`, "g");
      text = text.replace(re, (_, hdr, ch) => {
        blocks++;
        return `${hdr}\n${ch}`;
      });
      if (text !== orig) {
        fs.writeFileSync(fp, text, "utf8");
        files++;
      }
    }
  }
}

console.log(`[DONE] english newline fix — ${blocks} blocks in ${files} files`);
