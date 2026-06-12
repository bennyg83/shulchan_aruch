#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const p = path.join(ROOT, 'output/siman_228/beur-hagra/part-001.txt');
let s = fs.readFileSync(p, 'utf8');
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const neu =
  '"And if he did not specify," etc. — Or Zarua in Nedarim 65a, s.v. vehayka dehavi. However, where, etc. — and so too Rosh there and in Gittin there — learn that in such a case, even b\'dieved it is nothing. (And one can reject this because nevertheless the sage will not release l\'chatchila; unlike according to the one who says he need not specify the vow, for the sage did not know at all that the vow was for the benefit of the orphans and he would release l\'chatchila; and regarding her, b\'dieved it is permitted. But Rashba brings proof from what they say in Gittin there: if you say he must, sometimes he would cut, etc. — learn that it prevents b\'dieved.)';

const parts = s.split('**** YD001 SOURCE BLOCK ****');
const out = parts.map((block, i) => {
  if (i === 0) return block;
  if (!/seif: 14\nmarker: ב/.test(block)) return '**** YD001 SOURCE BLOCK ****' + block;
  const enStart = block.indexOf(ENG);
  const enEnd = block.indexOf(END);
  if (enStart < 0 || enEnd < 0) throw new Error('missing ENGLISH');
  const before = block.slice(0, enStart + ENG.length + 1);
  const after = block.slice(enEnd);
  return '**** YD001 SOURCE BLOCK ****' + before + neu + '\n' + after;
});
fs.writeFileSync(p, out.join(''), 'utf8');
console.log('OK patched siman_228/beur-hagra part-001 seif 14 marker ב');
