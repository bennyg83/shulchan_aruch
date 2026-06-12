#!/usr/bin/env node
/** Export deepTr blocks from _data-siman-087.mjs to manual JSON stubs for editing */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as D from './_data-siman-087.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const map = {
  MATEH_087: '_manual-087-mateh.json',
  YAD_087: '_manual-087-yad.json',
  YAD_EPH_087: '_manual-087-yad-eph.json',
  PELETI_087: '_manual-087-peleti-deep.json',
};

for (const [exportName, file] of Object.entries(map)) {
  const blocks = D[exportName];
  if (!blocks) continue;
  let heb = 0;
  for (const v of Object.values(blocks)) {
    if (/[\u0590-\u05FF]/.test(v)) heb++;
  }
  fs.writeFileSync(path.join(WORK, file), JSON.stringify(blocks, null, 2) + '\n');
  console.log(file, Object.keys(blocks).length, 'hebrew', heb);
}
