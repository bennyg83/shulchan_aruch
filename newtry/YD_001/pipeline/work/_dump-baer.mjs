#!/usr/bin/env node
import fs from 'fs';
function strip(h) {
  return h.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').trim();
}
for (const sim of ['086', '087']) {
  const h = JSON.parse(fs.readFileSync(`_hebrew-${sim}.json`, 'utf8'));
  const b = h['baer-heitev'];
  console.log(`=== ${sim} baer ${Object.keys(b).length}`);
  for (const [k, v] of Object.entries(b)) console.log(`${k}: ${strip(v.heb)}`);
}
