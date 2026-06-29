#!/usr/bin/env node
/** Unwrap JSON-array English in all blocks under a siman folder. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseBlocksInFile } from '../../yd001_block_lib.mjs';

const siman = Number(process.argv.find((a, i) => process.argv[i - 1] === '--siman') || 0);
if (!siman) {
  console.error('Usage: node _unwrap-json-english-siman.mjs --siman N');
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const simDir = path.join(ROOT, 'output', `siman_${String(siman).padStart(3, '0')}`);
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function unwrap(en) {
  let t = (en || '').trim();
  if (!/^\s*\["/.test(t)) return null;
  if (t.endsWith('"]')) return t.slice(2, -2);
  if (t.startsWith('["')) return t.slice(2);
  return null;
}

let total = 0;
for (const slug of fs.readdirSync(simDir).sort()) {
  const sd = path.join(simDir, slug);
  if (!fs.statSync(sd).isDirectory()) continue;
  for (const f of fs.readdirSync(sd).filter((x) => x.endsWith('.txt'))) {
    const fp = path.join(sd, f);
    const s = fs.readFileSync(fp, 'utf8');
    const T = {};
    for (const b of parseBlocksInFile(s)) {
      const u = unwrap(b.en);
      if (u !== null) T[`${b.seif}#${b.marker}`] = u;
    }
    if (!Object.keys(T).length) continue;
    const parts = s.split(BLOCK);
    const out = parts.map((block, i) => {
      if (i === 0) return block;
      const slugM = block.match(/^\s*slug: (.+)$/m);
      const seifM = block.match(/^\s*seif: (.+)$/m);
      const markerM = block.match(/^\s*marker: (.+)$/m);
      if (!slugM) return BLOCK + block;
      const seif = seifM[1].trim();
      const marker = markerM ? markerM[1].trim() : 'main';
      const key = `${seif}#${marker}`;
      if (!(key in T)) return BLOCK + block;
      const enStart = block.indexOf(ENG);
      const enEnd = block.indexOf(END);
      const before = block.slice(0, enStart + ENG.length + 1);
      const after = block.slice(enEnd);
      total++;
      return BLOCK + before + T[key] + '\n' + after;
    });
    fs.writeFileSync(fp, out.join(''), 'utf8');
    console.log(`OK ${slug}/${f} (${Object.keys(T).length} unwrapped)`);
  }
}
console.log(`[DONE] siman ${siman} — ${total} blocks unwrapped`);
