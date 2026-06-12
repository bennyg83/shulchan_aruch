#!/usr/bin/env node
/** Translate one block: node _claude-one-block.mjs mateh-yehonatan 1#_ */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const [slug, key] = process.argv.slice(2);
const hebAll = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-087.json'), 'utf8'));
let h = hebAll[slug][key].heb;
h = h.replace(/<small>\s*הגה\s*/g, '{Rama: ').replace(/<\/small>/g, '}').replace(/<[^>]+>/g, '').replace(/&quot;/g, '"');

const prompt = `Translate this Yoreh Deah siman 087 ${slug} block to English. Complete translation, halachic terms transliterated, expand abbreviations, Arabic numerals for citations, no Hebrew in output. Output ONLY the English text.\n\n${h}`;

const claudeExe =
  'C:\\Users\\binya\\AppData\\Roaming\\npm\\node_modules\\@anthropic-ai\\claude-code\\bin\\claude.exe';
const r = spawnSync(claudeExe, ['-p', prompt, '--output-format', 'text'], {
  encoding: 'utf8',
  maxBuffer: 32 * 1024 * 1024,
  timeout: 180000,
});
if (r.status !== 0) {
  console.error(r.stderr || r.stdout);
  process.exit(1);
}
const out = r.stdout.trim();
const outFile = path.join(WORK, `_claude-out-${slug}-${key.replace(/#/g, '-')}.txt`);
fs.writeFileSync(outFile, out);
console.log('wrote', outFile, 'len', out.length, 'hebrew', /[\u0590-\u05FF]/.test(out));
