#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../eh001_block_lib.mjs";
import { plainFromHtml } from "../lib/quality-checks.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SIMANIM = Array.from({ length: 15 }, (_, i) => String(141 + i).padStart(3, "0"));
const work = path.dirname(fileURLToPath(import.meta.url));

const dump = {};
const mechaber = {};
const pitchei = {};

for (const sim of SIMANIM) {
  const simanDir = path.join(ROOT, "output", `siman_${sim}`);
  dump[sim] = {};
  mechaber[sim] = {};
  pitchei[sim] = {};
  for (const slug of fs.readdirSync(simanDir).filter((d) => fs.statSync(path.join(simanDir, d)).isDirectory()).sort()) {
    const parts = fs.readdirSync(path.join(simanDir, slug)).filter((f) => f.endsWith(".txt"));
    dump[sim][slug] = [];
    for (const part of parts.sort()) {
      const raw = fs.readFileSync(path.join(simanDir, slug, part), "utf8");
      for (const b of parseBlocksInFile(raw)) {
        const marker = b.marker === "_" || !b.marker ? "main" : b.marker;
        const key = `${b.seif}#${marker}`;
        const he = plainFromHtml(b.he);
        dump[sim][slug].push({ key, part, he, en: b.en?.trim() ?? "" });
        if (slug === "mechaber") mechaber[sim][key] = he;
        if (slug === "pitchei-teshuva") pitchei[sim][key] = he;
      }
    }
  }
}

fs.writeFileSync(path.join(work, "_siman-141-155-hebrew-dump.json"), JSON.stringify(dump, null, 2), "utf8");
fs.writeFileSync(path.join(work, "_mechaber-141-155-he.json"), JSON.stringify(mechaber, null, 2), "utf8");
fs.writeFileSync(path.join(work, "_pt-141-155-he.json"), JSON.stringify(pitchei, null, 2), "utf8");

let n = 0, m = 0, p = 0;
for (const sim of SIMANIM) {
  let sn = 0;
  for (const arr of Object.values(dump[sim])) sn += arr.length;
  const mc = Object.keys(mechaber[sim]).length;
  const pc = Object.keys(pitchei[sim]).length;
  console.log(`siman_${sim}: ${sn} blocks (mechaber=${mc} pitchei=${pc})`);
  n += sn; m += mc; p += pc;
}
console.log(`TOTAL: ${n} mechaber=${m} pitchei=${p}`);
