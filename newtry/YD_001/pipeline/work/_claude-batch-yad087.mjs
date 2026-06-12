#!/usr/bin/env node
/** Batch Claude translate yad 087 blocks missing from manual JSON */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const claudeExe =
  'C:\\Users\\binya\\AppData\\Roaming\\npm\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe';
const hebAll = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-087.json'), 'utf8'));

const jobs = [];
for (const slug of ['yad-avraham', 'yad-ephraim']) {
  const manualFile =
    slug === 'yad-avraham' ? '_manual-087-yad.json' : '_manual-087-yad-eph.json';
  const manual = fs.existsSync(path.join(WORK, manualFile))
    ? JSON.parse(fs.readFileSync(path.join(WORK, manualFile), 'utf8'))
    : {};
  for (const key of Object.keys(hebAll[slug])) {
    const existing = manual[key];
    if (existing && !/[\u0590-\u05FF]/.test(existing) && existing.length >= 200) continue;
    jobs.push({ slug, key, manualFile });
  }
}

let ok = 0;
let fail = 0;
for (const { slug, key, manualFile } of jobs) {
  let h = hebAll[slug][key].heb;
  h = h
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"');
  const prompt = `Translate this Yoreh Deah siman 087 ${slug} block to English. Complete translation of every clause. Halachic terms transliterated (basar b'chalav, d'oraisa, l'chatchila). Expand all Hebrew abbreviations. Arabic numerals for siman/seif/daf. {Rama: ...} for Rama glosses. No Hebrew in output. Output ONLY the English text.\n\n${h}`;
  console.log('translating', slug, key, 'heb', h.length);
  const r = spawnSync(claudeExe, ['-p', prompt, '--output-format', 'text'], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    timeout: 300000,
  });
  if (r.status !== 0) {
    console.error('FAIL', slug, key, (r.stderr || r.stdout || '').slice(0, 400));
    fail++;
    if (/limit|rate|quota/i.test(r.stderr || r.stdout || '')) break;
    continue;
  }
  const out = r.stdout.trim();
  if (/[\u0590-\u05FF]/.test(out) || out.length < 80) {
    console.error('bad output', slug, key, out.length);
    fail++;
    continue;
  }
  const manualPath = path.join(WORK, manualFile);
  const manual = fs.existsSync(manualPath)
    ? JSON.parse(fs.readFileSync(manualPath, 'utf8'))
    : {};
  manual[key] = out;
  fs.writeFileSync(manualPath, JSON.stringify(manual, null, 2) + '\n');
  console.log('OK', slug, key, out.length);
  ok++;
}
console.log('done ok', ok, 'fail', fail);
