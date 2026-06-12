#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { P1 } from './_patch-siman-076-data-p1.mjs';
import { P2 } from './_patch-siman-076-data-p2.mjs';

const out = { ...P1, ...P2 };
const fp = path.join(path.dirname(fileURLToPath(import.meta.url)), '_translations-siman-076.json');
fs.writeFileSync(fp, JSON.stringify(out, null, 2), 'utf8');
let n = 0;
for (const s of Object.values(out)) n += Object.keys(s).length;
console.log(`Wrote ${fp} — ${n} blocks`);
