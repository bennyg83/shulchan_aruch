#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_216/beer-hagolah/part-001.txt': {
    '11#_': 'Rivash in responsum siman 356.',
  },
  'siman_216/beur-hagra/part-001.txt': {
    '1#ב':
      'And likewise forbidden in the growths of their growths, and if he did not say "these" etc. — Ran on the mishnah there s.v. "on a matter" etc., see there.',
    '6#_':
      'He said konam etc. — it is a question in the Yerushalmi mentioned, and the Rosh explained they are two questions; the Yerushalmi resolves the second that without saying only "this," if it fell — permitted; the first question is unresolved and depends on the dispute in chapter HaShoel and chapter Beit Kor — we hold there it is a doubt, and here stringently, as stated 53a "doubt" etc.; and he said "whether" etc. But Ran explains it is all one question, resolved that this is permitted if fallen, only asked regarding "your house" this — practical difference for fallen, and resolves due to this; his explanation is uncertain how it is resolved; and Beit Yosef wrote from the Rambam\'s words brought in Shulchan Aruch seif 5 wrote "this loaf" etc. — implies the question is resolved due to "your house" this etc.; and some say the second, some the first; and per his girsa in the Gemara "this loaf" — if so in our Gemara it should resolve due to "your house"; but the Rambam wrote there is no proof from the Rambam that only in havarah we say so, as Ran distinguished 42b, daf 57a s.v. "asked" etc.; end quote.',
    '8#_':
      'This loaf of mine — language of the Rambam and per his girsa in the Gemara; and see in seif 7; but the Rosh and Rashba 33 — "this"; and the Rosh wrote in his Peirush there s.v. "my loaf" — since he did not say "this" etc.',
  },
  'siman_216/baer-heitev/part-001.txt': {
    '8#_':
      'Permitted. The Shach wrote: one should wonder why he wrote stam that it is permitted — for above seif 6 we doubt whether the first or last formulation; if he said "this" it should be forbidden forever — examine. The Taz wrote that in old Turim manuscripts they wrote only "my loaf," not "this"; and so explicitly in the Rosh; so the primary view is — if he said "this loaf," the law is like "this house" in seif 5 — end quote.',
  },
  'siman_216/pitchei-teshuva/part-001.txt': {
    '2#_':
      'It implies even one of them. Baer Heitev in the name of Ra\'em; and see responsum Rabbeinu Akiva Eiger zt"l siman 46 — he wrote that where one is lenient, e.g. one swore not to do this and that, or not to eat this and that — one should not rely on Ra\'em to be lenient; it is forbidden even in one of them; see there further.',
    '4#_':
      'In a dish that has taste. See responsum Teshuvat Chen siman 57 — he wrote it is forbidden also in a dish cooked in a meat pot, Beit Yosef, if cooked after the vow; however if cooked before the vow it is permitted, as below siman 217 seif 12, even if he said konam taste of meat upon me — then also the taste that came from meat before the vow is included in this; nevertheless permitted to eat the dish cooked in a meat pot before the vow, because it is not bar nat bar nat of permitted, unlike Ginat Veradim kelal 65 — see there. And see responsum Brit Avraham part 4 siman 17 — he wrote regarding a community decree that meat be tereifah: no concern to forbid the utensils, though wherever a forbidden piece makes the taste forbidden one should forbid utensils too; nevertheless when they decreed the meat shall be tereifah, it is not the matter of making a forbidden piece by law of vow, for it cannot become tereifah through release as above siman 205; only the matter of community enactment, that they have power to forbid the permitted; and Ranach part 2 siman 71 already wrote that in community enactment we follow people\'s language, and we hold in people\'s language taste is not included in meat — see there.',
  },
  'siman_216/siftei-kohen/part-001.txt': {
    '5#ב':
      'And if it fell etc. Bach challenged Beit Yosef that although Ran\'s view is so (and likewise Rivash in responsum siman 356), nevertheless what Beit Yosef wrote as the view of the Rosh and Tur is not so — rather their view is forbidden even if it fell and was rebuilt — end quote his words; I did not reach the end of his view. Also difficult on his words: what does the Yerushalmi resolve — there it does not say "this house" only; also the Rosh and Tur hold so; also one can say the Rosh explains the question on "your house" whether forbidden if it fell, and resolves to prohibition; but "this house" is permitted — so is explicit in Rav Yerucham Yoreh De\'ah part 5; and it appears a clear proof for this — for in the Yerushalmi it resolves from one who says "give a house" etc., if it fell he is obligated to rebuild it etc.; in chapter HaShoel, one who rents a house to his fellow, we hold if he said "this" he is not obligated to rebuild it — agreed by all poskim, as explained in Choshen Mishpat siman 312; also from what the Gemara says there, if he said "this" and it fell — she remains his — implies wherever he said "this" and it fell, she remains his; one can conclude per the mishnah the Yerushalmi brings, which Ran brought.',
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
