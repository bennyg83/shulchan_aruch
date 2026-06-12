#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-053-translations.mjs';

const sim = process.argv[2] || '053';
const slug = process.argv[3] || 'kereti';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const fp = path.join(ROOT, 'output', `siman_${sim}`, slug, 'part-001.txt');
const T = TRANSLATIONS[slug];
const parts = fs.readFileSync(fp, 'utf8').split(BLOCK);
const fileKeys = [];
for (let i = 1; i < parts.length; i++) {
  const b = parts[i];
  const seifM = b.match(/^\s*seif: (.+)$/m);
  const markerM = b.match(/^\s*marker: (.+)$/m);
  const seif = seifM[1].trim();
  const marker = markerM ? markerM[1].trim() : 'main';
  fileKeys.push(`${seif}#${marker}`);
}
console.log('file', fileKeys);
console.log('T', Object.keys(T));
console.log('in file not T', fileKeys.filter((k) => !(k in T)));
console.log('in T not file', Object.keys(T).filter((k) => !fileKeys.includes(k)));
