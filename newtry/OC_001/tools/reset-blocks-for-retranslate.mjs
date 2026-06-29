#!/usr/bin/env node
/**
 * Reset English to placeholder for blocks that fail quality checks (for re-MT or editorial).
 *
 *   node tools/reset-blocks-for-retranslate.mjs --siman 113 --dry-run
 *   node tools/reset-blocks-for-retranslate.mjs --siman 113 --min-severity error
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock, EN_PENDING_DEFAULT } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles, relFromOutRoot } from "../pipeline/lib/blocks.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel, SEVERITY } from "../pipeline/lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");

function parseArgs() {
  let siman = null;
  let root = path.join(OC_ROOT, "output");
  let minSeverity = "error";
  let dry = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = parseInt(a[++i], 10);
    else if (a[i] === "--root" && a[i + 1]) root = path.resolve(a[++i]);
    else if (a[i] === "--min-severity" && a[i + 1]) minSeverity = a[++i];
    else if (a[i] === "--dry-run") dry = true;
  }
  if (!siman) throw new Error("Required: --siman N");
  return { siman, root, minSeverity, dry };
}

function collectFiles(root, siman) {
  const pad = String(siman).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  return [...walkOc001PartFiles(root)].filter((f) => f.includes(needle));
}

function main() {
  const { siman, root, minSeverity, dry } = parseArgs();
  const minLevel = SEVERITY[minSeverity] ?? SEVERITY.error;
  const files = collectFiles(root, siman);
  let resetBlocks = 0;
  let resetFiles = 0;

  for (const fp of files) {
    const raw = fs.readFileSync(fp, "utf8");
    const blocks = parseBlocksInFile(raw);
    let changed = false;
    const out = blocks.map((b) => {
      const issues = runBlockQualityChecks(b);
      const sev = maxSeverity(issues);
      if ((SEVERITY[severityLabel(sev)] ?? 0) < minLevel) return b;
      resetBlocks++;
      changed = true;
      console.log(
        relFromOutRoot(fp, root),
        `seif=${b.seif} marker=${b.marker}`,
        issues.map((i) => i.code).join(", ")
      );
      return { ...b, en: EN_PENDING_DEFAULT };
    });
    if (changed) {
      resetFiles++;
      if (!dry) {
        fs.writeFileSync(fp, out.map((b) => serializeBlock(b)).join("\n\n") + "\n", "utf8");
      }
    }
  }

  console.log(
    `${dry ? "Would reset" : "Reset"} ${resetBlocks} block(s) in ${resetFiles} file(s) for siman ${siman}`
  );
  if (!dry && resetBlocks) {
    console.log("Re-run: npm run translate:placeholders:libre -- --root output/siman_" + String(siman).padStart(3, "0"));
  }
}

main();
