#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../output');
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function checkSim(sim) {
  const dir = path.join(ROOT, `siman_${sim}`);
  let blocks = 0;
  let heb = 0;
  for (const slug of fs.readdirSync(dir)) {
    const sd = path.join(dir, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith('.txt'))) {
      const s = fs.readFileSync(path.join(sd, f), 'utf8');
      for (const block of s.split('**** YD001 SOURCE BLOCK ****').slice(1)) {
        const a = block.indexOf(ENG);
        const b = block.indexOf(END);
        if (a < 0 || b < 0) continue;
        const en = block.slice(a + ENG.length + 1, b);
        blocks++;
        if (/[\u0590-\u05FF]/.test(en)) heb++;
      }
    }
  }
  return { blocks, heb };
}

for (const sim of ['086', '087']) {
  const r = checkSim(sim);
  console.log(`siman ${sim}: ${r.heb} / ${r.blocks} English blocks with Hebrew`);
}
