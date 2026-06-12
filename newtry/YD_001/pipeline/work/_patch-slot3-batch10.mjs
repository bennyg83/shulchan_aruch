#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_201/pitchei-teshuva/part-001.txt': {
    '1#_':
      'And its measure is one amah by one amah. See Tashbetz part 2 siman 129; and further from siman 163 through 167 — in a round place or one made in the form of half a sphere to divide in halves, how they measure it according to the methods of engineers.',
    '2#_':
      '44,000. See Shach; and see in responsum Darchei Noam siman 25 what he wrote on this.',
    '3#_':
      'Larger. See in responsum Ma\'il Tzedakah siman 39 — he wrote regarding mikveh water the ditch must be so large that when a person enters to immerse the waters do not spill outside; and even if there were a thousand se\'ah inside it would not help (though from the Mechaber\'s words it does not imply so per his view — he goes below seif 50; and Rama did not emend anything because it is not explicit in the Mechaber\'s words, and we find such in many places) — as written below seif 50 in Hagahah: one should be stringent l\'chatchila even if 40 se\'ah remain until the crack to seal the hole so they are not zochalin; and from Bach\'s language it appears one should be stringent even b\'dieved; and likewise here one should be stringent that the mikveh be so high that waters do not go out during a person\'s immersion — large according to his size and small according to his smallness so they are not zochalin. And one sage disagrees that this is not called zochalin — only if waters go out by themselves and not when they go out through the immerser, as explained in Shach note 30; and he himself returned and answered to uphold his words: only if when the immerser leaves the waters return to their place they are not zochalin, but if they do not return they are certainly zochalin — see there; see Noda B\'Yehudah Tinyana Yoreh De\'ah end of siman 137.',
    '4#_':
      'Mix with the dripping waters. [Shach note 10; and see responsum Chasam Sofer end of siman 211 what he wrote on this.]',
    '5#_':
      'To immerse in rivers. [See responsum Chasam Sofer siman 202 where he expanded on this.]',
    '6#_': 'Invalid by Torah law. See Radbaz Chadashot siman 85.',
    '8#_':
      'That one does not immerse in vessels. See on this matter in responsum Meir Netivim in the pamphlet Mikveh Yamim where he expanded.',
  },
};

function patchFile(rel, T) {
  const fp = path.join(ROOT, 'output', rel);
  let s = fs.readFileSync(fp, 'utf8');
  const applied = [];
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const seif = block.match(/^\s*seif: (\d+)/m)?.[1];
    const marker = block.match(/^\s*marker: (.+)/m)?.[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.push(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.includes(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.length} blocks)`);
  return applied.length;
}

let total = 0;
for (const [rel, T] of Object.entries(PATCHES)) {
  total += patchFile(rel, T);
}
console.log(`[PATCHED] ${total} blocks total`);
