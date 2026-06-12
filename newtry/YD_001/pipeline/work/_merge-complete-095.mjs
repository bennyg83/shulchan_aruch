#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COMPLETE_095_STUBS } from './_complete-095-stubs.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const patchPath = path.join(WORK, '_patch-siman-095-translations.mjs');
let src = fs.readFileSync(patchPath, 'utf8');

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let merged = 0;
for (const [slug, keys] of Object.entries(COMPLETE_095_STUBS)) {
  for (const [key, val] of Object.entries(keys)) {
    const re = new RegExp(
      `('${slug}':\\s*\\{[\\s\\S]*?'${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}': \`)[\\s\\S]*?(\`,)`,
      'm',
    );
    const next = src.replace(re, `$1${esc(val)}$2`);
    if (next === src) {
      console.warn(`WARN: no replace ${slug}|${key}`);
    } else {
      src = next;
      merged++;
    }
  }
}

fs.writeFileSync(patchPath, src);
console.log(`Merged ${merged} stub translations into patch`);
