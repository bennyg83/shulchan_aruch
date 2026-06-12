#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const h = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-120.json'), 'utf8'));

function strip(s) {
  return String(s)
    .replace(/<small>\s*הגה\s*/gi, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

const slug = process.argv[2] || 'beer-hagolah';
for (const [k, e] of Object.entries(h[slug] || {})) {
  console.log(`---${k}---`);
  console.log(strip(e.heb || e.raw || ''));
  console.log('');
}
