#!/usr/bin/env node
import fs from 'fs';
const h = JSON.parse(fs.readFileSync('_hebrew-087.json', 'utf8'));
for (const [slug, blocks] of Object.entries(h)) {
  console.log(slug, Object.keys(blocks).length, Object.keys(blocks).join(' '));
}
