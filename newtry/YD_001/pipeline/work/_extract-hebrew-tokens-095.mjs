#!/usr/bin/env node
import { TRANSLATIONS } from './_patch-siman-095-translations.mjs';

const tokens = new Set();
for (const map of Object.values(TRANSLATIONS)) {
  for (const v of Object.values(map)) {
    const m = v.match(/[\u0590-\u05FF]+/g);
    if (m) m.forEach((t) => tokens.add(t));
  }
}
console.log([...tokens].sort((a, b) => b.length - a.length).join('\n'));
