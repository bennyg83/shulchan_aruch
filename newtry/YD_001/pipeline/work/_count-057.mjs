import fs from 'fs';
import { PART1 } from './_patch-siman-057-translations-part1.mjs';
const dump = fs.readFileSync('_siman-057-hebrew-dump.txt', 'utf8');
const blocks = [...dump.matchAll(/^=== (\S+) (\S+) ===\n([\s\S]*?)(?=\n\n=== |\n*$)/gm)];
const need = blocks.filter(([, slug]) => !PART1[slug]);
console.log('remaining', need.length);
