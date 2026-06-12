#!/usr/bin/env node
/**
 * Translate one slug's blocks via Claude CLI → _manual-087-<short>.json
 * Usage: node _claude-translate-087-slug.mjs pitchei-teshuva
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node _claude-translate-087-slug.mjs <slug>');
  process.exit(1);
}

const SHORT = {
  'mateh-yehonatan': 'mateh',
  'yad-avraham': 'yad',
  'yad-ephraim': 'yad-eph',
  'pitchei-teshuva': 'pitchei',
  'rabbi-akiva-eiger-yd': 'rae',
  peleti: 'peleti',
};

function stripHtml(h) {
  return String(h)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

const hebAll = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-087.json'), 'utf8'));
const blocks = hebAll[slug];
if (!blocks) {
  console.error('Unknown slug:', slug);
  process.exit(1);
}

const payload = {};
for (const [key, entry] of Object.entries(blocks)) {
  payload[key] = stripHtml(entry.heb || entry.raw || '');
}

const header = fs.readFileSync(path.join(WORK, '_claude-prompt-087.txt'), 'utf8');
const prompt = `${header}\n\nSLUG: ${slug}\n\nINPUT:\n${JSON.stringify(payload, null, 2)}`;

const claudeExe =
  process.env.CLAUDE_EXE ||
  'C:\\Users\\binya\\AppData\\Roaming\\npm\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe';

console.log(`Calling Claude for ${slug} (${Object.keys(payload).length} blocks)...`);
const r = spawnSync(claudeExe, ['-p', prompt, '--output-format', 'text'], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
  cwd: WORK,
  timeout: 600000,
});

if (r.error) {
  console.error(r.error);
  process.exit(1);
}
if (r.status !== 0) {
  console.error('claude failed:', r.stderr || r.stdout);
  process.exit(r.status || 1);
}

let text = r.stdout.trim();
const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
if (fence) text = fence[1].trim();
const start = text.indexOf('{');
const end = text.lastIndexOf('}');
if (start < 0 || end < 0) {
  fs.writeFileSync(path.join(WORK, `_claude-raw-${SHORT[slug] || slug}.txt`), r.stdout);
  console.error('No JSON in response; saved raw to _claude-raw-*.txt');
  process.exit(1);
}

const out = JSON.parse(text.slice(start, end + 1));
let hebLeft = 0;
for (const v of Object.values(out)) {
  if (/[\u0590-\u05FF]/.test(v)) hebLeft++;
}

const outPath = path.join(WORK, `_manual-087-${SHORT[slug] || slug}.json`);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${outPath} keys=${Object.keys(out).length} hebrew_left=${hebLeft}`);
