#!/usr/bin/env node
/** worker slot 3 — siman 435 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { fixes } from "./_fixes-siman435.mjs";

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
  /\bstrike in\b/i,
  /\bCapernaum\b/i,
  /&quot;/,
  /\bthere in the\b/i,
  /\bAccording to the\b/i,
  /\bin me\b/i,
];

let total = 0;
const risks = [];
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  let n = 0;
  const out = parseBlocksInFile(raw)
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (!blockFixes[key]) return b;
      n++;
      const en = blockFixes[key];
      for (const re of PREFLIGHT) if (re.test(en)) risks.push({ file, key, pattern: re.source });
      if (en.length < 8) risks.push({ file, key, pattern: "short_en" });
      return { ...b, en };
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n);
  total += n;
}
console.log("TOTAL", total);
console.log(risks.length ? "PREFLIGHT_RISKS " + JSON.stringify(risks) : "PREFLIGHT_RISKS none");
