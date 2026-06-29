#!/usr/bin/env node
/** Apply editorial FULL REDO patches for simanim 326-360 (existing) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { patchFile, ROOT } from './_patch-siman-098-group-c-utils.mjs';

const SIMANIM = [
  326, 327, 328, 329, 331, 332, 333, 334, 335, 336, 337, 339, 340,
  341, 342, 343, 344, 345, 348, 349, 350, 354, 355, 358, 360,
];

const bySiman = {};
let total = 0;

for (const n of SIMANIM) {
  const pad = String(n).padStart(3, '0');
  const modName = `_tr-${n}-siftei-kohen.mjs`;
  const modPath = path.join(path.dirname(fileURLToPath(import.meta.url)), modName);
  if (!fs.existsSync(modPath)) {
    console.error(`[SKIP] missing ${modName}`);
    continue;
  }
  const mod = await import(pathToFileURL(modPath).href);
  let simanBlocks = 0;
  for (const [rel, slug] of mod.FILES) {
    const nBlocks = patchFile(rel, slug, mod.T);
    simanBlocks += nBlocks;
    total += nBlocks;
  }
  bySiman[`siman_${pad}`] = simanBlocks;
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
for (const [siman, n] of Object.entries(bySiman)) {
  fs.appendFileSync(
    path.join(ROOT, 'progress.log'),
    `${ts} ${siman}/siftei-kohen ${n} blocks editorial FULL REDO 326-360\n`,
  );
}
fs.appendFileSync(
  path.join(ROOT, 'progress.log'),
  `${ts} siman_326-360 editorial FULL REDO COMPLETE (${total} blocks)\n`,
);

console.log('[DONE] siman 326-360 —', total, 'blocks');
console.log(JSON.stringify(bySiman, null, 2));
