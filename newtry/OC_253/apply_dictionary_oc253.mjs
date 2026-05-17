/**
 * Normalize English in OC253 block files using the in-house glossary only:
 * workspace root `full_dictionary (1).md` (see halacha_dictionary_lib.mjs).
 *
 * Scans all .txt under output/ and translated/ (recursive).
 *
 * Usage:
 *   node apply_dictionary_oc253.mjs
 *   node apply_dictionary_oc253.mjs --dry-run
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  applyGlossary,
  getInhouseDictionaryPath,
  loadDictionaryFromPath,
} from "./halacha_dictionary_lib.mjs";
import { parseBlocksInFile, serializeBlock } from "./oc253_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs() {
  const argv = process.argv.slice(2);
  let dry = false;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--dry-run") dry = true;
  }
  return { dry };
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
  const { dry } = parseArgs();
  const dictResolved = getInhouseDictionaryPath();
  if (!fs.existsSync(dictResolved)) {
    console.error("In-house dictionary not found:", dictResolved);
    process.exit(1);
  }

  const glossary = loadDictionaryFromPath(dictResolved);
  console.log(
    "Loaded",
    glossary.length,
    "glossary entries from in-house",
    dictResolved,
    dry ? "[dry-run]" : ""
  );

  const touched = [];
  const roots = ["output", "translated"].map((d) => path.join(__dirname, d));

  for (const root of roots) {
    for (const fp of walkTxtRecursive(root)) {
      const before = fs.readFileSync(fp, "utf8");
      const after = processBlocksFile(before, glossary);
      if (before !== after) {
        touched.push(fp);
        if (!dry) fs.writeFileSync(fp, after, "utf8");
      }
    }
  }

  console.log(
    dry ? `Would update ${touched.length} files` : `Updated ${touched.length} files`,
    touched.length ? ":" + touched.map((p) => path.relative(__dirname, p)).join(", ") : ""
  );
}

run();
