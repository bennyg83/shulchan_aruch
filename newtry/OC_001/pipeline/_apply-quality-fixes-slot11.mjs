#!/usr/bin/env node
/** Apply _fixes-simanNNN-slot11-quality.mjs to flagged blocks */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot11-lib.mjs";

const siman = Number(process.env.SLOT11_SIMAN || process.argv[2]);
if (!siman) {
  console.error("usage: SLOT11_SIMAN=446 node _apply-quality-fixes-slot11.mjs");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const fixesPath = path.join(__dirname, `_fixes-siman${siman}-slot11-quality.mjs`);
if (!fs.existsSync(fixesPath)) {
  console.error("missing", fixesPath);
  process.exit(1);
}

const { FIXES } = await import(pathToFileURL(fixesPath).href + "?v=" + Date.now());
let applied = 0;
const fails = [];
const base = path.join(OC_ROOT, "output", `siman_${String(siman).padStart(3, "0")}`);

for (const [rel, blockFixes] of Object.entries(FIXES)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (!blockFixes[key]) return b;
      const en = autoFix(blockFixes[key], b.marker, "");
      const pf = preflightFail(en);
      if (pf) {
        fails.push(`${rel} ${key}: ${pf}`);
        return b;
      }
      applied++;
      return { ...b, en };
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
}

console.log("siman", siman, "applied", applied);
if (fails.length) {
  console.error("FAILURES:\n" + fails.join("\n"));
  process.exit(1);
}
