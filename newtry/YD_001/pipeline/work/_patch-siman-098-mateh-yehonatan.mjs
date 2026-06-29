#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_098/mateh-yehonatan/part-001.txt';
const SLUG = 'mateh-yehonatan';

const T = {
  '1#_': `(Siman 98 seif 1 in the hagahah) [And we are not accustomed nowadays, etc.] It is written in Chiddushei Ra'ak"a z"l: I did not know a correct reason for this, and perhaps one may say, etc., and that is we are concerned lest it is not a kafila, etc. — end of his words; and it appears a scribal error fell in his words and one must say we are concerned that the heter of kafila is in maslata as it should read; and on the essence of his answer it is astounding, for if so one may still rely nowadays on tasting by a non-Jew — that is, one tastes for two gentiles with kafila so it should not be maslata, and also for a gentile another kafila in maslata, and then all views are satisfied — requires study. Until here hagahah of the great Rav Maharar Shlomo Cohen n"y m"tz in the first chapter Vilna:`,
};

function patchFile() {
  const fp = path.join(OUT, REL);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== SLUG) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) throw new Error(`No translation for ${key}`);
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    applied.add(key);
    return BLOCK + before + T[key] + '\n' + after;
  });
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${REL} (${applied.size} blocks)`);
}

patchFile();
