#!/usr/bin/env node
import fs from 'fs';
const f = process.argv[2];
let s = fs.readFileSync(f, 'utf8');
// Replace typographic/abbrev inch marks that break JSON string literals
const fixes = [
  [/Mahari"t/g, 'Mahari\\"t'],
  [/Hagahot Sh"D/g, 'Hagahot Sh\\"D'],
  [/Hagahat Sh"D/g, 'Hagahat Sh\\"D'],
  [/Hagahat Sh\\"D/g, 'Hagahat Sh\\"D'],
];
for (const [re, to] of fixes) s = s.replace(re, to);
JSON.parse(s);
fs.writeFileSync(f, s);
console.log('fixed', f);
