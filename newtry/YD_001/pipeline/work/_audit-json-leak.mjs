#!/usr/bin/env node
/** Audit block files for JSON-string leakage in Hebrew/English sections. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');

const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function auditFile(fp) {
  const raw = fs.readFileSync(fp, 'utf8');
  const issues = [];
  for (const part of raw.split(BLOCK).slice(1)) {
    const slugM = part.match(/^\s*slug: (.+)$/m);
    const seifM = part.match(/^\s*seif: (.+)$/m);
    const markerM = part.match(/^\s*marker: (.+)$/m);
    const slug = slugM?.[1]?.trim() ?? '?';
    const seif = seifM?.[1]?.trim() ?? '?';
    const marker = markerM?.[1]?.trim() ?? 'main';
    const key = `${seif}#${marker}`;

    for (const [section, next, label] of [
      [HEB, ENG, 'hebrew'],
      [ENG, END, 'english'],
    ]) {
      const a = part.indexOf(section);
      const b = part.indexOf(next);
      if (a < 0 || b < 0) continue;
      const body = part.slice(a + section.length + 1, b);
      for (const line of body.split('\n')) {
        const t = line.trim();
        if (!t) continue;
        if (/\["/.test(t)) {
          issues.push({ key, slug, section: label, code: 'json_array_wrap', preview: t.slice(0, 80) });
        } else if (/\\"/.test(t) && label === 'hebrew') {
          issues.push({ key, slug, section: label, code: 'escaped_quote', preview: t.slice(0, 80) });
        }
      }
    }
  }
  return issues;
}

function walk(dir, files) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, files);
    else if (ent.name.endsWith('.txt')) files.push(p);
  }
}

const files = [];
walk(OUT, files);

const bySiman = new Map();
let total = 0;
for (const fp of files) {
  const issues = auditFile(fp);
  if (!issues.length) continue;
  const rel = path.relative(OUT, fp);
  const siman = rel.split(path.sep)[0];
  if (!bySiman.has(siman)) bySiman.set(siman, []);
  bySiman.get(siman).push({ rel, issues });
  total += issues.length;
}

console.log(`Scanned ${files.length} block files`);
console.log(`Issues: ${total} in ${bySiman.size} simanim\n`);
for (const [siman, entries] of [...bySiman.entries()].sort()) {
  const n = entries.reduce((s, e) => s + e.issues.length, 0);
  console.log(`${siman}: ${n} issue(s) in ${entries.length} file(s)`);
  for (const e of entries.slice(0, 3)) {
    for (const i of e.issues.slice(0, 2)) {
      console.log(`  ${e.rel} ${i.slug} ${i.key} [${i.code}] ${i.preview}`);
    }
  }
  if (entries.length > 3) console.log(`  ...`);
}
