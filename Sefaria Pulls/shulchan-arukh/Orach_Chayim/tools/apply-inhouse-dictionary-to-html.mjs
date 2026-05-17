/**
 * Apply the in-house glossary (`full_dictionary (1).md`) to an English HTML file.
 *
 * NOTE: This is a simple whole-file pass; it does not parse HTML.
 * For our current use (English text + inline <i ...></i> hooks), it is sufficient.
 *
 * Usage:
 *   node tools/apply-inhouse-dictionary-to-html.mjs --in "<path-to-en.html>"
 */
import fs from "fs";
import path from "path";

const DEFAULT_DICT = path.resolve(
  "C:/Users/binya/Downloads/Shulchan Aruch/full_dictionary (1).md"
);

function parseArgs(argv) {
  let inPath = null;
  let dictPath = DEFAULT_DICT;
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--in" && argv[i + 1]) inPath = argv[++i];
    else if (a === "--dict" && argv[i + 1]) dictPath = argv[++i];
  }
  if (!inPath) {
    console.error('Missing required "--in <file>"');
    process.exit(1);
  }
  return { inPath: path.resolve(inPath), dictPath: path.resolve(dictPath) };
}

const ROW_RE = /^\|([^|\r\n]+)\|([^|\r\n]*)\|([^|\r\n]*)\|\s*$/;

function shouldSkipHeaderRow(a, b, c) {
  const ta = a.trim();
  const tb = b.trim();
  const tc = c.trim();
  if (/^[-:|\s]+$/.test(a)) return true;
  if (/^abbreviation$/i.test(ta)) return true;
  if (/^hebrew\s*\/\s*transliteration$/i.test(ta)) return true;
  if (/^hebrew$/i.test(ta) && /^number$/i.test(tb)) return true;
  if (/^(abbreviation|hebrew|number|permutations|correct english|tractate name)$/i.test(ta))
    return true;
  if (/^correct english$/i.test(tc)) return true;
  if (/^correct english rendering$/i.test(tc)) return true;
  if (/^tractate name$/i.test(tc)) return true;
  return false;
}

function parseDictionaryMarkdown(md) {
  const entries = [];
  for (const line of md.split(/\r?\n/)) {
    const m = line.match(ROW_RE);
    if (!m) continue;
    const a = m[1].trim();
    const c = m[3].trim();
    if (!c || !/[a-zA-Z]/.test(c)) continue;
    if (shouldSkipHeaderRow(a, m[2].trim(), c)) continue;

    const keys = a
      .split(/\s*\/\s*/)
      .map((k) => k.trim())
      .filter(Boolean);
    for (let key of keys) {
      key = key.replace(/\s*\([^)]*\)\s*$/, "").trim();
      if (key.length < 2) continue;
      entries.push({ key, en: c });
    }
  }

  const seen = new Map();
  for (const { key, en } of entries) {
    if (!seen.has(key)) seen.set(key, en);
  }
  const out = [...seen.entries()].map(([key, en]) => ({ key, en }));
  out.sort((x, y) => y.key.length - x.key.length);
  return out;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function applyGlossary(text, entries) {
  if (!text || !entries.length) return text;
  let out = text;
  for (const { key, en } of entries) {
    if (!key || key.length < 2) continue;
    const e = escapeRegExp(key);
    const re = new RegExp(
      `(^|[\\s\\(\\[\\{\"'׳״«»—–-])(${e})(?=[\\s\\)\\]\\}'\"׳״.,;:!?…—–-]|$)`,
      "gmu"
    );
    out = out.replace(re, (_, before) => `${before}${en}`);
  }
  return out;
}

function main() {
  const { inPath, dictPath } = parseArgs(process.argv);
  if (!fs.existsSync(inPath)) {
    console.error("Missing input:", inPath);
    process.exit(1);
  }
  if (!fs.existsSync(dictPath)) {
    console.error("Missing dictionary:", dictPath);
    process.exit(1);
  }

  const dictRaw = fs.readFileSync(dictPath, "utf8");
  const entries = parseDictionaryMarkdown(dictRaw);
  const before = fs.readFileSync(inPath, "utf8");
  const after = applyGlossary(before, entries);
  if (after !== before) fs.writeFileSync(inPath, after, "utf8");

  console.log("Dictionary entries:", entries.length);
  console.log(after === before ? "No changes." : "Updated:", inPath);
}

main();

