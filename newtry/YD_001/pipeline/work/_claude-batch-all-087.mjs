#!/usr/bin/env node
/**
 * Batch-translate stub slugs for siman 087 via Claude CLI.
 * Usage: node _claude-batch-all-087.mjs
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const CLAUDE =
  'C:\\Users\\binya\\AppData\\Roaming\\npm\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe';

const SLUG_FILE = {
  'mateh-yehonatan': '_manual-087-mateh.json',
  'yad-avraham': '_manual-087-yad.json',
  'yad-ephraim': '_manual-087-yad-eph.json',
  peleti: '_manual-087-peleti.json',
};

const HEADER = `Translate Yoreh Deah siman 087 commentary to English.
Rules: complete translation of every clause; halachic terms (basar b'chalav, l'chatchila, d'oraisa, etc.); expand abbreviations; {Rama: ...} for hagahah; Arabic numerals; no Hebrew letters.
Output ONLY the English translation text.\n\n`;

function strip(h) {
  return String(h)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function translate(text) {
  const r = spawnSync(CLAUDE, ['-p', HEADER + text, '--output-format', 'text'], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    timeout: 300000,
  });
  if (r.status !== 0) throw new Error(r.stderr || r.stdout || 'claude failed');
  return r.stdout.trim();
}

function isStub(s) {
  if (!s || s.length < 200) return true;
  if (/see Mechaber|see Peleti|see Shach\.|Tur and poskim|Basar b'chalav cooking/i.test(s))
    return true;
  if (/[\u0590-\u05FF]/.test(s)) return true;
  return false;
}

const hebAll = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-087.json'), 'utf8'));
let done = 0;
let skip = 0;
let fail = 0;

for (const [slug, file] of Object.entries(SLUG_FILE)) {
  const fp = path.join(WORK, file);
  const manual = fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, 'utf8')) : {};
  const blocks = hebAll[slug];
  for (const [key, entry] of Object.entries(blocks)) {
    if (manual[key] && !isStub(manual[key])) {
      skip++;
      continue;
    }
    const heb = strip(entry.heb);
    console.log(`[${slug}] ${key} (${heb.length} chars)...`);
    try {
      manual[key] = translate(heb);
      fs.writeFileSync(fp, JSON.stringify(manual, null, 2) + '\n');
      done++;
      console.log(`  OK len=${manual[key].length}`);
    } catch (e) {
      fail++;
      console.error(`  FAIL`, e.message);
    }
  }
}

console.log(`DONE translate: ${done} skip: ${skip} fail: ${fail}`);
