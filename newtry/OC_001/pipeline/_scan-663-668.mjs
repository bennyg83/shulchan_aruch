#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";
import { preflightFail } from "./_slot17-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const FAIL = [
  /her age|the craft|Saturday|hand recoils|first dish|allocated|Spike Duma|time sand|optimistic|Capernaum|Quran|Audience\.|from her age|Madger|Rem"a:/i,
  /\bLord\b/i,
  /\bHol Hamoed\b/i,
];
const simanim = [663, 664, 665, 666, 667, 668];
const all = [];
for (const s of simanim) {
  const dir = path.join(OUT, `siman_${String(s).padStart(3, "0")}`);
  for (const slug of fs.readdirSync(dir)) {
    const sd = path.join(dir, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(sd, f), "utf8"))) {
        const en = String(b.en ?? "").trim();
        const issues = runBlockQualityChecks({
          slug: b.slug,
          seif: b.seif,
          marker: b.marker,
          he: b.he,
          en,
        });
        const sev = maxSeverity(issues);
        const pf = preflightFail(en);
        const failPat = FAIL.find((r) => r.test(en));
        if (pf || sev >= SEVERITY.warn || failPat) {
          all.push({
            s,
            rel: `${slug}/${f}`,
            key: `${b.seif}:${b.marker || "_"}`,
            codes: issues.map((i) => i.code),
            pf,
            failPat: failPat?.source,
            en: en.slice(0, 100),
          });
        }
      }
    }
  }
}
console.log("total flagged", all.length);
for (const x of all) console.log(JSON.stringify(x));
