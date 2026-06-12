#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const blocks = JSON.parse(fs.readFileSync(path.join(__dir, 'blocks-036.json'), 'utf8'));
const done = new Set([
  ...Object.keys((await import('./_patch-siman-036-translations.mjs')).TRANSLATIONS).flatMap(
    (slug) => []
  ),
]);

const { TRANSLATIONS } = await import('./_patch-siman-036-translations.mjs');
const { TRANSLATIONS_B } = await import('./_patch-siman-036-translations-b.mjs');

const have = new Set();
for (const [slug, map] of Object.entries({ ...TRANSLATIONS, ...TRANSLATIONS_B })) {
  for (const k of Object.keys(map)) have.add(`${slug}|${k}`);
}

const pending = blocks.filter((b) => !have.has(`${b.slug}|${b.key}`));
const bySlug = {};
for (const b of pending) {
  (bySlug[b.slug] ||= []).push(b);
}
for (const [slug, arr] of Object.entries(bySlug).sort()) {
  console.log(slug, arr.length);
}
console.log('pending total', pending.length);
