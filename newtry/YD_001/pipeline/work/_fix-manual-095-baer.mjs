#!/usr/bin/env node
/** Remove baer-heitev / beer-hagolah from manual-095 so gen uses _manual-095-baer.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const manualPath = path.join(WORK, '_manual-095.json');
const manual = JSON.parse(fs.readFileSync(manualPath, 'utf8'));

const removed = [];
for (const slug of ['baer-heitev', 'beer-hagolah']) {
  if (manual[slug]) {
    removed.push(...Object.keys(manual[slug]).map((k) => `${slug}|${k}`));
    delete manual[slug];
  }
}

fs.writeFileSync(manualPath, JSON.stringify(manual, null, 2) + '\n');
console.log(`Removed ${removed.length} keys:`, removed.join(', '));
