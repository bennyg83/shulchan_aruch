#!/usr/bin/env node
import fs from 'fs';
const m = await import('./_data-siman-087.mjs');
for (const [name, blocks] of Object.entries(m)) {
  if (!name.endsWith('_087')) continue;
  const bad = Object.entries(blocks).filter(([, v]) => /[\u0590-\u05FF]/.test(v));
  if (bad.length) console.log(name, bad.length);
}
