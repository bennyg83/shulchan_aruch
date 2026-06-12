/**
 * Normalize English in YD 001 block files using `full_dictionary (1).md`.
 *
 *   node apply_dictionary_eh001.mjs
 *   node apply_dictionary_eh001.mjs --dry-run
 *   node apply_dictionary_eh001.mjs --root output/siman_001
 *   node apply_dictionary_eh001.mjs --simanim 1,87,115
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  applyGlossary,
  getInhouseDictionaryPath,
  loadDictionaryFromPath,
} from "../OC_253/halacha_dictionary_lib.mjs";
import { parseBlocksInFile, serializeBlock } from "./eh001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs() {
  const argv = process.argv.slice(2);
  let dry = false;
  let onlyDirs = null;
  let rootRel = "output";
  let simanim = null;
  let report = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dry-run") dry = true;
    else if (argv[i] === "--only" && argv[i + 1]) {
      onlyDirs = argv[++i]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (argv[i] === "--root" && argv[i + 1]) {
      rootRel = argv[++i];
    } else if (argv[i] === "--simanim" && argv[i + 1]) {
      simanim = argv[++i]
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => Number.isFinite(n) && n > 0);
      if (!simanim.length) simanim = null;
    } else if (argv[i] === "--report" && argv[i + 1]) {
      report = argv[++i];
    }
  }
  return { dry, onlyDirs, rootRel, simanim, report };
}

function resolveParentRoot(rootRel) {
  let p = path.isAbsolute(rootRel) ? rootRel : path.join(__dirname, rootRel);
  const base = path.basename(p);
  if (/^siman_\d{3}$/i.test(base)) return path.dirname(p);
  return p;
}

function resolveScanRoots(rootRel, simanim) {
  if (!simanim || !simanim.length) {
    const single = path.isAbsolute(rootRel) ? rootRel : path.join(__dirname, rootRel);
    return [single];
  }
  const parent = resolveParentRoot(rootRel);
  return simanim.map((n) => path.join(parent, `siman_${String(n).padStart(3, "0")}`));
}

function walkTxtRecursive(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkTxtRecursive(p, acc);
    else if (ent.isFile() && ent.name.endsWith(".txt")) acc.push(p);
  }
  return acc;
}

function collectTxtFiles(outputRoot, onlyDirs) {
  if (!onlyDirs || !onlyDirs.length) return walkTxtRecursive(outputRoot);
  const acc = [];
  for (const name of onlyDirs) {
    const sub = path.join(outputRoot, name);
    if (!fs.existsSync(sub)) {
      console.warn("Skipping missing folder:", path.relative(outputRoot, sub) || name);
      continue;
    }
    walkTxtRecursive(sub, acc);
  }
  return acc;
}

function processBlocksFile(raw, glossary) {
  const blocks = parseBlocksInFile(raw);
  if (!blocks.length) return raw;
  let changed = false;
  const rebuilt = blocks.map((b) => {
    const en2 = applyGlossary(b.en, glossary);
    if (en2 !== b.en) changed = true;
    return serializeBlock({ ...b, en: en2 });
  });
  if (!changed) return raw;
  const out = rebuilt.join("\n\n").trimEnd();
  return raw.endsWith("\n") ? out + "\n" : out;
}

function run() {
  const { dry, onlyDirs, rootRel, simanim, report } = parseArgs();
  const dictResolved = getInhouseDictionaryPath();
  if (!fs.existsSync(dictResolved)) {
    console.error("In-house dictionary not found:", dictResolved);
    process.exit(1);
  }

  const glossary = loadDictionaryFromPath(dictResolved);
  console.log(
    "Loaded",
    glossary.length,
    "glossary entries from",
    dictResolved,
    dry ? "[dry-run]" : ""
  );

  const rootsExisting = resolveScanRoots(rootRel, simanim).filter((r) => fs.existsSync(r));
  if (!rootsExisting.length) {
    console.error("No existing scan roots");
    process.exit(1);
  }

  const touched = [];
  let scanned = 0;

  for (const root of rootsExisting) {
    console.log("Scan root:", root);
    for (const fp of collectTxtFiles(root, onlyDirs)) {
      scanned++;
      const before = fs.readFileSync(fp, "utf8");
      const after = processBlocksFile(before, glossary);
      if (before !== after) {
        touched.push(fp);
        if (!dry) fs.writeFileSync(fp, after, "utf8");
      }
    }
  }

  console.log(`Scanned ${scanned} .txt file(s).`);
  console.log(
    dry ? `Would update ${touched.length} file(s)` : `Updated ${touched.length} file(s)`
  );

  if (report) {
    const reportPath = path.isAbsolute(report) ? report : path.join(__dirname, report);
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    const body = touched.map((p) => path.relative(__dirname, p).split(path.sep).join("/")).join("\n");
    fs.writeFileSync(reportPath, body ? `${body}\n` : "", "utf8");
    console.log(`Report written: ${reportPath}`);
  }
}

run();
