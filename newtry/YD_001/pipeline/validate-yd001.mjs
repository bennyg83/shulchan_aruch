#!/usr/bin/env node
/**
 * Structural checks on YD001 part files.
 *
 *   node pipeline/validate-yd001.mjs --root output
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  END_MARKER,
  HEB_MARKER,
  ENG_MARKER,
  walkYd001PartFiles,
  parsePartFileBlocks,
  inferDefaultSiman,
} from "./lib/blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YD_ROOT = path.resolve(__dirname, "..");

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    outRoot: path.join(YD_ROOT, "output"),
    files: [],
    strictPending: false,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--root":
      case "--out":
        opts.outRoot = path.resolve(args[++i]);
        break;
      case "--files":
        while (args[i + 1] && !args[i + 1].startsWith("--"))
          opts.files.push(path.resolve(args[++i]));
        break;
      case "--strict-pending":
        opts.strictPending = true;
        break;
    }
  }
  return opts;
}

function validateFile(absPath, outRoot, strictPending) {
  const errors = [];
  let text;
  try {
    text = fs.readFileSync(absPath, "utf8");
  } catch (e) {
    return [`${absPath}: ${e.message}`];
  }

  if (!text.includes(HEB_MARKER)) errors.push("missing HEBREW marker");
  if (!text.includes(ENG_MARKER)) errors.push("missing ENGLISH marker");
  if (!text.includes(END_MARKER)) errors.push("missing END BLOCK marker");

  const defSim = inferDefaultSiman(absPath, outRoot);
  const blocks = parsePartFileBlocks(absPath, defSim);
  for (const b of blocks) {
    if (strictPending && !b.translated)
      errors.push(`pending block seif=${b.seif} marker=${b.marker} slug=${b.slug}`);
    if (!b.slug) errors.push("block missing slug: header");
  }

  return errors.length ? errors.map((e) => `${path.relative(outRoot, absPath)}: ${e}`) : [];
}

function main() {
  const opts = parseArgs();
  const outRoot = opts.outRoot;
  let files = opts.files;

  if (files.length === 0) {
    for (const f of walkYd001PartFiles(outRoot)) files.push(f);
  }

  const all = [];
  for (const f of files) {
    all.push(...validateFile(f, outRoot, opts.strictPending));
  }

  if (all.length) {
    console.error(`Validation failed (${all.length} issue(s)):\n`);
    for (const e of all.slice(0, 200)) console.error(`  ${e}`);
    process.exit(1);
  }
  console.log(`OK — ${files.length} file(s) checked under ${outRoot}`);
}

main();
