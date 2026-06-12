#!/usr/bin/env node
import { TRANSLATIONS } from './_patch-siman-086-translations.mjs';

let total = 0;
for (const [slug, blocks] of Object.entries(TRANSLATIONS)) {
  const heb = Object.entries(blocks).filter(([, v]) => /[\u0590-\u05FF]/.test(v));
  if (heb.length) {
    console.log(slug, heb.length, heb.map(([k]) => k).join(', '));
    total += heb.length;
  }
}
console.log('total hebrew blocks:', total);
