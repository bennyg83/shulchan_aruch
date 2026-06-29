#!/usr/bin/env node
/**
 * Remove JSON string leakage from block Hebrew/English:
 *   ["<b>text</b>..."]  →  <b>text</b>...
 *   unescape \" → "
 *
 * Usage:
 *   node pipeline/work/_fix-hebrew-json-leak.mjs --siman 196
 *   node pipeline/work/_fix-hebrew-json-leak.mjs --all
 *   node pipeline/work/_fix-hebrew-json-leak.mjs --root output/siman_196/siftei-kohen
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');

const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const EDITORIAL = [
  [/\(אחר\) \[קודם\]/g, 'קודם'],
  [/\(א\) \[ד\]/g, 'ד'],
  [/\(הראב"ד\) \[הרא"ש\]/g, 'הרא"ש'],
  [/\(או\) \[אז\]/g, 'אז'],
  [/\(ולא בדקה\) \[ובדקה\]/g, 'ובדקה'],
];

function unescapeJsonString(s) {
  return s
    .replace(/\\\\/g, '\u0000')
    .replace(/\\"/g, '"')
    .replace(/\u0000/g, '\\');
}

function applyEditorial(inner) {
  let s = inner;
  for (const [re, rep] of EDITORIAL) s = s.replace(re, rep);
  return s;
}

/** Unwrap JSON string literal: whole-line or leading prefix `["..."] rest`. */
function unwrapJsonLine(line, { english = false } = {}) {
  const trimmed = line.trimStart();
  if (!trimmed.startsWith('["')) return line;

  // English Siftei Kohen citation header: ["phrase" etc.] or ["A" etc. — "B" etc.]
  if (english) {
    const compound = line.match(/^(\s*)\["([^"]+)" etc\.\s*—\s*"([^"]+)" etc\.\]\s*/);
    if (compound) {
      const [, indent, first, second] = compound;
      return `${indent}**${first}** etc. — **${second}** etc.${line.slice(compound[0].length)}`;
    }
    const simple = line.match(/^(\s*)\["([^"]+)" etc\.\]\s*/);
    if (simple) {
      const [, indent, first] = simple;
      return `${indent}**${first}** etc.${line.slice(simple[0].length)}`;
    }
  }

  const t = line.trimEnd();
  // Whole line: ["..."]
  if (t.startsWith('["') && t.endsWith('"]')) {
    let inner = applyEditorial(unescapeJsonString(t.slice(2, -2)));
    if (english && inner && !inner.startsWith('**')) inner = `**${inner}**`;
    return inner;
  }

  // Leading prefix: ["..."] remainder (common in English Siftei Kohen)
  const m = line.match(/^(\s*)\["((?:[^"\\]|\\.)*)"\](.*)$/s);
  if (!m) return line;
  const [, indent, raw, rest] = m;
  let inner = applyEditorial(unescapeJsonString(raw));
  if (english && inner && !inner.startsWith('**')) inner = `**${inner}**`;
  return indent + inner + rest;
}

function fixSection(text, { english = false } = {}) {
  const lines = text.split('\n');
  let changed = 0;
  const out = lines.map((line) => {
    const fixed = unwrapJsonLine(line, { english });
    if (fixed !== line) changed++;
    return fixed;
  });
  return { text: out.join('\n'), changed };
}

function fixFile(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  const parts = raw.split(BLOCK);
  let total = 0;
  const out = parts.map((part, i) => {
    if (i === 0) return part;
    let block = part;
    for (const [marker, nextMarker] of [
      [HEB, ENG],
      [ENG, END],
    ]) {
      const a = block.indexOf(marker);
      const b = block.indexOf(nextMarker);
      if (a < 0 || b < 0) continue;
      const head = block.slice(0, a + marker.length + 1);
      const body = block.slice(a + marker.length + 1, b);
      const tail = block.slice(b);
      const { text, changed } = fixSection(body, { english: marker === ENG });
      total += changed;
      block = head + text + tail;
    }
    return BLOCK + block;
  });
  if (total > 0) fs.writeFileSync(fp, out.join(''), 'utf8');
  return total;
}

function collectFiles({ siman, rootRel, all, slugFilter }) {
  const files = [];
  if (rootRel) {
    const p = path.join(OUT, rootRel);
    if (fs.existsSync(p)) {
      if (fs.statSync(p).isDirectory()) {
        for (const f of fs.readdirSync(p)) {
          if (f.endsWith('.txt')) files.push(path.join(p, f));
        }
      } else files.push(p);
    }
    return files;
  }
  const simanim = all
    ? fs.readdirSync(OUT).filter((d) => /^siman_\d+$/.test(d))
    : [`siman_${String(siman).padStart(3, '0')}`];
  for (const sd of simanim) {
    const base = path.join(OUT, sd);
    if (!fs.existsSync(base)) continue;
    if (slugFilter) {
      const slugDir = path.join(base, slugFilter);
      if (fs.existsSync(slugDir)) {
        for (const f of fs.readdirSync(slugDir)) {
          if (f.endsWith('.txt')) files.push(path.join(slugDir, f));
        }
      }
    } else {
      walk(base, files);
    }
  }
  return files;
}

function walk(dir, files) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (ent.name.endsWith('.txt')) files.push(p);
  }
}

const args = process.argv.slice(2);
const all = args.includes('--all');
const simanIdx = args.indexOf('--siman');
const rootIdx = args.indexOf('--root');
const slugIdx = args.indexOf('--slug');
const siman = simanIdx >= 0 ? Number(args[simanIdx + 1]) : null;
const rootRel = rootIdx >= 0 ? args[rootIdx + 1] : null;
const slugFilter = slugIdx >= 0 ? args[slugIdx + 1] : null;

if (!all && siman == null && !rootRel) {
  console.error('Usage: --siman N | --all [--slug NAME] | --root output/siman_NNN/...');
  process.exit(1);
}

let filesFixed = 0;
let linesFixed = 0;
for (const fp of collectFiles({ siman, rootRel, all, slugFilter })) {
  const n = fixFile(fp);
  if (n > 0) {
    filesFixed++;
    linesFixed += n;
    console.log(`fixed ${path.relative(OUT, fp)}: ${n} line(s)`);
  }
}
console.log(`[DONE] ${filesFixed} file(s), ${linesFixed} wrapped line(s) cleaned`);
