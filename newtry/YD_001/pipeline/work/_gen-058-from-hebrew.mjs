#!/usr/bin/env node
/** Helper: emit JS object literals for keys missing manual translation — run after manual parts merged */
import fs from 'fs';
import { TRANSLATIONS } from './_patch-siman-058-translations.mjs';
import heb from './_hebrew-siman-058.json' assert { type: 'json' };

const missing = [];
for (const [slug, blocks] of Object.entries(heb)) {
  const T = TRANSLATIONS[slug] || {};
  for (const k of Object.keys(blocks)) {
    if (!(k in T)) missing.push(`${slug} ${k}`);
  }
}
console.log('missing', missing.length);
if (missing.length) console.log(missing.slice(0, 30).join('\n'));
