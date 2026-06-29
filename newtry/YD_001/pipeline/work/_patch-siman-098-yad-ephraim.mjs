#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_098/yad-ephraim/part-001.txt';
const SLUG = 'yad-ephraim';

const T = {
  '1#_': `Except that it is spoiled — permitted. Avodat HaTaharah; and he wrote in Noda B'Yehudah Mahadura Tinyana siman 52 regarding what Tzemach Tzedek wrote to permit tasting with spoiled prohibition, and Peri Chadash challenged him — one may reject his proof; nevertheless it deals specifically with spoiled prohibition, but in other rabbinic prohibitions he concedes it is forbidden, and all the more so it is forbidden to taste to distinguish a prohibition absorbed in permitted matter since one must absorb a little; however according to what he brought in Tzemach Tzedek there at the end of the book from the words of Shlah regarding tasting meat on his tongue, it appears that even tasting is forbidden even in rabbinic matters; and likewise forbidden to taste stam yayin even though it is rabbinic — see there; and see what I wrote in my book Beit Efrayim siman 36 regarding tasting the water in a bubble, and there in responsa 105 I brought the words of Or Zarua regarding tasting liver — see there.`,
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
