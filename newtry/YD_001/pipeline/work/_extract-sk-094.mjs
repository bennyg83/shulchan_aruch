#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const h = JSON.parse(fs.readFileSync(path.join(DIR, '_remaining-094-hebrew.json'), 'utf8'));
const sk = h['siftei-kohen'];
for (const [k, heb] of Object.entries(sk)) {
  const plain = heb.replace(/<[^>]+>/g, '').replace(/^\[\"|\"\]$/g, '').replace(/\\"/g, '"');
  console.log('\n###', k, 'len', plain.length);
  console.log(plain.slice(0, 500) + (plain.length > 500 ? '...' : ''));
}
