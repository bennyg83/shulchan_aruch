/**
 * Halachic glossary markdown → longest-first replacements in English paragraphs.
 *
 * This project always uses the in-house glossary at the workspace root:
 *   full_dictionary (1).md
 * (relative from newtry/OC_253: ../../full_dictionary (1).md)
 *
 * No environment-variable or CLI overrides — edit that file to change terminology.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Canonical in-house dictionary (same table as OC 318 tooling when run from newtry/*). */
export const INHOUSE_DICTIONARY_PATH = path.join(
  __dirname,
  "..",
  "..",
  "full_dictionary (1).md"
);

/** @deprecated Use INHOUSE_DICTIONARY_PATH — identical path. */
export const DEFAULT_DICTIONARY_PATH = INHOUSE_DICTIONARY_PATH;

export function getInhouseDictionaryPath() {
  return INHOUSE_DICTIONARY_PATH;
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

export function parseDictionaryMarkdown(md) {
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

export function loadDictionaryFromPath(p) {
  const raw = fs.readFileSync(p, "utf8");
  return parseDictionaryMarkdown(raw);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function applyGlossary(text, entries) {
  if (!text || !entries.length) return text;
  let out = text;
  for (const { key, en } of entries) {
    if (!key || key.length < 2) continue;
    const e = escapeRegExp(key);
    const re = new RegExp(`(^|[\\s\\(\\[\\{"'׳״«»—–-])(${e})(?=[\\s\\)\\]\\}'"׳״.,;:!?…—–-]|$)`, "gmu");
    out = out.replace(re, (_, before) => `${before}${en}`);
  }
  return out;
}
