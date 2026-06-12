#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_240/beer-hagolah/part-001.txt': {
    '2#י': 'It appears to me it must read Rambam, for so it is in the chapters cited.',
  },
  'siman_240/beur-hagra/part-001.txt': {
    '7#ב':
      'And if the son etc. As written in Rif and Tosafot s.v. Rif etc. Likut: and if etc. — Kesef Mishnah on Rif\'s case there and Tosafot there s.v. Rif etc. and Ran there — requires study — end.',
    '25#א':
      '(Likut) A student etc. — for we say in the first chapter of Megillah: greatness of Torah etc.; and we say in chapter 4 of Eruvin (47) — R\' Elazar: even etc., that it is not from everything; and even for any mitzvah that cannot be fulfilled through others, honor of father and mother is set aside, as written in seif 12 — end.',
  },
  'siman_240/pitchei-teshuva/part-001.txt': {
    '21#_':
      'Rather he is obligated. See in Gemara Sotah daf 49b, as brought there, and in Rashi there; see further in Makkot daf 22 regarding a son\'s son becoming a blood redeemer for him, and in Rashi there — examine carefully. See responsum She\'arit Yosef siman 19 (cited below siman 242 note 21 in Netziv there), in the book Imrei Shefer by the Gaon R\' Avraham ben Chaim, Parashat Tolodot, and responsum Teshuvah MeAhavah part 1 siman 178, and responsum Shetei HaLechem on what he wrote in this matter.',
  },
  'siman_240/siftei-kohen/part-001.txt': {
    '5#ג': 'For one who supports his father from charity funds. See above siman 251 note 5.',
  },
  'siman_240/yad-avraham/part-001.txt': {
    '1#_':
      '(Siman 240, note on seif 24) Some say a person is not obligated in honor of his father\'s father — Mahariik root 44. Scribal error — must read root 37.',
    '2#_':
      '(There) And it does not appear to me etc. In Eliyahu Zuta he ruled in Choshen Mishpat that one is not obligated in honor of a father\'s father. From Gemara Sotah (daf 49) — Rav Acha son of Yaakov attended to Rav Yaakov son of his daughter when he grew up; he said to him, give me water to drink; he said, I am not your son etc. There is no proof from there that a son\'s son is exempt from honoring a father\'s father — perhaps specifically a daughter\'s son is exempt, for perhaps Rav Yaakov held like the view brought in Bereishit Rabbah and Vayeshev that a daughter\'s son is not considered like his son, only a son\'s son is considered like his son. Rather there is proof that even a son\'s son is exempt from honoring a father\'s father from what Tosafot wrote in Yevamot (daf 22) and Bava Batra (daf 115) — wherever Scripture writes "sons" it excludes sons of sons; so in Kiddushin (daf 30): "and you shall teach your sons" — not sons of sons; so too regarding honor it is written "a son shall honor his father" — therefore we exclude sons of sons. So too Rashi in Makkot (daf 12) explains a mother is obligated in honor of her father\'s father; this proof I found in Beit Yosef. But one may say in responsum R\' Akiva Eiger siman 68 he cites in the name of Sefer Levit Chen that specifically after his father\'s death he is exempt from a father\'s father, but while his father lives he is obligated since his father himself is obligated. There the case was that the father was killed.',
  },
  'siman_241/baer-heitev/part-001.txt': {
    '4#_':
      'Obligated. In the case of his son — but after he came and struck and cursed him after his judgment was finished, even if he repented he is exempt since he goes to death; if they shamed him, the one who shames is liable for the fine. Tur and Rambam — end of Shach\'s words.',
  },
  'siman_241/beur-hagra/part-001.txt': {
    '4#ב': 'And if etc., and if etc. — Yevamot 22b and Sanhedrin there: learn from this — one going out to be executed etc., except after etc.',
    '7#_':
      'Shetuki etc. (even if etc.) as written in Chullin 11b — perhaps not etc. (see our master in Even haEzer siman 4 note 57).',
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
