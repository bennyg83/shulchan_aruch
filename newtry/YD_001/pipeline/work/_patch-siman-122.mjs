#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import { listPartFiles, readUtf8, writeUtf8, replaceEnglishInFileText, appendProgress } from './_yd001-patch-lib.mjs';
import { translateBlock } from './_yd001-translate-siman-121-122.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const SIM = 122;
const simDir = path.join(OUT, `siman_${String(SIM).padStart(3, '0')}`);

const files = listPartFiles(simDir);
if (!files.length) throw new Error(`No part files found under ${simDir}`);

const perSlug = {};
let total = 0;
for (const f of files) {
  const s = readUtf8(f.abs);
  const { text, replaced } = replaceEnglishInFileText(s, translateBlock);
  writeUtf8(f.abs, text);
  perSlug[f.slug] = (perSlug[f.slug] || 0) + replaced;
  total += replaced;
  console.log(`OK ${f.rel} (${replaced} blocks)`);
}

console.log(appendProgress(ROOT, SIM, perSlug, total));

