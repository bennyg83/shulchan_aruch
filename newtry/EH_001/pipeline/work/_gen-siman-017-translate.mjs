#!/usr/bin/env node
/**
 * Generates translation patch data from Hebrew dump + inline translations.
 * Run: node pipeline/work/_gen-siman-017-translate.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { patchFile } from './_patch-siman-utils.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dump = JSON.parse(fs.readFileSync(path.join(ROOT, 'pipeline/work/_siman-017-hebrew-dump.json'), 'utf8'));

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

// Import completed data modules
const modules = {
  'beur-hagra': (await import('./_patch-siman-017-data-beur-hagra.mjs')).default,
  'rabbi-akiva-eiger': (await import('./_patch-siman-017-data-rabbi-akiva-eiger.mjs')).default,
};

const files = {
  'beur-hagra': ['siman_017/beur-hagra/part-001.txt'],
  'rabbi-akiva-eiger': ['siman_017/rabbi-akiva-eiger/part-001.txt'],
};

let total = 0;
for (const [slug, rels] of Object.entries(files)) {
  const T = modules[slug];
  for (const rel of rels) {
    total += patchFile(rel, slug, T);
  }
}
console.log('Applied', total, 'blocks from completed modules');
