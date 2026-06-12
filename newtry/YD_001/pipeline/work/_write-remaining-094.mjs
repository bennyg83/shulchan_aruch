#!/usr/bin/env node
/** Writes remaining slug files - run once then replace TRANSLATE markers manually via full files */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const h = JSON.parse(fs.readFileSync(path.join(DIR, '_hebrew-094.json'), 'utf8'));
console.log('keys', Object.keys(h['siftei-kohen']).join(', '));
