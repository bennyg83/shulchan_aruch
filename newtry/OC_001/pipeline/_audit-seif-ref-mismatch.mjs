#!/usr/bin/env node
/** Report blocks where Hebrew cites סעיף N but block metadata seif differs. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const GEMATRIA = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9, י: 10,
  כ: 20, ל: 30, מ: 40, נ: 50, ס: 60, ע: 70, פ: 80, צ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
};

function heNum(s) {
  const t = String(s).replace(/["']/g, "").trim();
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  let n = 0;
  for (const c of t) {
    if (GEMATRIA[c]) n += GEMATRIA[c];
    else if (c === "׳" || c === '"') continue;
    else return null;
  }
  return n || null;
}

export function parseMechaberSeifRef(he) {
  const plain = plainFromHtml(he);
  const m = plain.match(/סעי[ף']?\s*([א-ת"'\d]+)/);
  if (!m) return null;
  return heNum(m[1]);
}

function auditSiman(siman) {
  const dir = simanOutputDir(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output"), siman);
  const mismatches = [];
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        const ref = parseMechaberSeifRef(b.he);
        if (ref && String(ref) !== String(b.seif)) {
          mismatches.push({
            slug: b.slug,
            blockSeif: b.seif,
            refSeif: ref,
            marker: b.marker,
            file: `siman_${String(siman).padStart(3, "0")}/${slug}/${f}`,
          });
        }
      }
    }
  }
  return mismatches;
}

function main() {
  const from = parseInt(process.argv[2], 10) || 1;
  const to = parseInt(process.argv[3], 10) || from;
  for (let s = from; s <= to; s++) {
    const m = auditSiman(s);
    console.log(`siman_${s}: ${m.length} seif-ref mismatches`);
    if (process.argv.includes("--list") && m.length) {
      for (const x of m.slice(0, 50)) {
        console.log(`  ${x.slug} bundle-seif=${x.blockSeif} → cites seif ${x.refSeif} (${x.file})`);
      }
      if (m.length > 50) console.log(`  ... +${m.length - 50} more`);
    }
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
