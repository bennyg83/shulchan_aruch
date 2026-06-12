#!/usr/bin/env node
/**
 * Translate one slug via Claude CLI → _chunks-SIM/_slug.json
 * Usage: node _claude-translate-yd-siman.mjs 101 beer-hagolah
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const [sim, slug] = process.argv.slice(2);
if (!sim || !slug || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _claude-translate-yd-siman.mjs SIMAN SLUG');
  process.exit(1);
}

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

const hebAll = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const blocks = hebAll[slug];
if (!blocks) {
  console.error('Unknown slug:', slug);
  process.exit(1);
}

const chunkDir = path.join(WORK, `_chunks-${sim}`);
fs.mkdirSync(chunkDir, { recursive: true });
const outPath = path.join(chunkDir, `${slug}.json`);

if (fs.existsSync(outPath)) {
  const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  if (Object.keys(existing).length === Object.keys(blocks).length) {
    const bad = Object.values(existing).filter((v) => /[\u0590-\u05FF]{3,}/.test(v));
    if (!bad.length) {
      console.log(`Skip ${slug} — ${outPath} complete (${Object.keys(existing).length} keys)`);
      process.exit(0);
    }
  }
}

const payload = {};
for (const [key, entry] of Object.entries(blocks)) {
  payload[key] = stripHtml(entry.heb || entry.raw || '');
}

const header = fs.readFileSync(path.join(WORK, '_claude-prompt-yd.txt'), 'utf8');
const prompt = `${header}\n\nSIMAN: ${sim}\nSLUG: ${slug}\n\nINPUT:\n${JSON.stringify(payload, null, 2)}`;

const claudeExe =
  process.env.CLAUDE_EXE ||
  'C:\\Users\\binya\\AppData\\Roaming\\npm\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe';

console.log(`Claude translate siman ${sim} / ${slug} (${Object.keys(payload).length} blocks)...`);
const r = spawnSync(claudeExe, ['-p', prompt, '--output-format', 'text'], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
  cwd: WORK,
  timeout: 900000,
});

if (r.error) {
  console.error(r.error);
  process.exit(1);
}
if (r.status !== 0) {
  console.error('claude failed:', r.stderr || r.stdout);
  process.exit(r.status || 1);
}

let text = (r.stdout || '').trim();
const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
if (fence) text = fence[1].trim();
const start = text.indexOf('{');
const end = text.lastIndexOf('}');
if (start < 0 || end < 0) {
  console.error('No JSON in output:', text.slice(0, 500));
  process.exit(1);
}
const parsed = JSON.parse(text.slice(start, end + 1));
const hebLeft = Object.values(parsed).filter((v) => /[\u0590-\u05FF]{3,}/.test(v)).length;
fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2) + '\n');
console.log(`Wrote ${outPath} (${Object.keys(parsed).length} keys, ${hebLeft} with Hebrew)`);
