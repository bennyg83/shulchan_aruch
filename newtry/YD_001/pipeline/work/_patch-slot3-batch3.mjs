#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_274/beer-hagolah/part-001.txt': {
    '3#ג': 'Rosh in responsum, general rule 47.',
  },
  'siman_274/beur-hagra/part-001.txt': {
    '2#_': 'And he must read, etc. — as written in Orach Chaim siman 491 note 2 in Hagahah.',
  },
  'siman_274/rabbi-akiva-eiger-yd/part-001.txt': {
    '1#_':
      '(Siman 274, Taz note 1) To sanctify the Name in its place. See responsum Devar Shmuel siman 76, and see below (siman 276 note 3).',
  },
  'siman_276/beer-hagolah/part-001.txt': {
    '1#_':
      'Tur wrote from words of his father Rosh in siman 10 of Hilchot Sefer Torah, and so from Rashi on the tannaim\'s dispute regarding wrapping the Name — Menachot 40 side b.',
  },
  'siman_276/turei-zahav/part-001.txt': {
    '2#א':
      'One must say that he writes for sanctity of the Name, etc. — in Tur it is written here to think that he writes for sanctity of the Name; Beit Yosef wrote: even though Rosh and our rabbi wrote "must think," from Rosh\'s words it appears he does not suffice with thought but must utter with his lips — end of his words; therefore he wrote here "must say," etc. I wonder — surely here thought suffices for Rosh and Tur; therefore they did not require utterance except at the beginning of writing a sefer Torah, and afterward sanctity of the Name in thought suffices — this is explicit in Rosh that Beit Yosef brings at the beginning of siman 274: therefore it is good to utter at the beginning of the work, and afterward not; nevertheless when writing the Divine Name he must think for sanctity of the Name — end of his words, Rosh and Tur; but Maharashak ruled in Shulchan Aruch that we require explicit utterance also for the Name, for Mordechai brings the view of R\' Yaakov of Orleans and R\' Elchanan and in the name of Rashi that mouth formation is required even throughout the sefer Torah.',
    '11#_':
      'Only a little. For since the whole world reads it as hei, though it was blemished by touching the roof — it is like erasing the Name; unlike if it was actually cancelled, there is no holiness at all — and it is comparable to ink that fell on the letter.',
  },
  'siman_215/beer-hagolah/part-001.txt': {
    '3#_':
      'Tur in the name of Ramban, and so there Rosh in his name (Ran, chapter 1 of Taanit, and Raavad chapter 8 of Hilchot Nedarim, and Rambam).',
  },
  'siman_215/beur-hagra/part-001.txt': {
    '5#א': 'That which we say, between, etc. — as written: konam sukkah, etc.',
  },
  'siman_220/beer-hagolah/part-001.txt': {
    '7#_': 'Rosh in responsum, general rule 12.',
  },
  'siman_220/beur-hagra/part-001.txt': {
    '16#א': 'Much. Rosh s.v. ad, etc.',
  },
  'siman_245/beer-hagolah/part-001.txt': {
    '9#_': "Rambam's wording there, from that which I noted above in seif 4.",
    '19#_': "Statement of R' Elazar in the name of R' Yehuda Nesiah — Shabbat 119 side b.",
  },
  'siman_245/beur-hagra/part-001.txt': {
    '6#ב': 'Liable, etc. — Kedushin 40 side a, and as written in Shulchan Aruch.',
    '15#ב': 'And even, etc. — as he wrote "and they help," etc.',
  },
  'siman_237/beer-hagolah/part-001.txt': {
    '6#א': "Rambam's wording in chapter 12 of Hilchot Shevuot, law 3, from mishnah there daf 35 side a.",
    '10#ד':
      "From words of Rambam chapter 2 of Hilchot Shevuot and chapter 1 of Hilchot Nedarim and chapter 1 of Hilchot Nezirut, and like R' Yochanan there daf 10 side a who said: the language of the nations — meaning they are not expert in the holy tongue.",
  },
  'siman_237/beur-hagra/part-001.txt': {
    '6#ב': 'Handles, etc. — mishnah and gemara Nedarim 9 side a, and see Rosh and Ran s.v. kenidrei, etc.',
    '9#א': 'Handles, etc. — mishnah and gemara Nedarim 9 side a, and see Rosh and Ran s.v. kenidrei, etc.',
  },
  'siman_300/beer-hagolah/part-001.txt': {
    '1#_': "Rambam's wording in chapter 10 of Hilchot Kilayim.",
    '5#_': 'Tosefta that Rambam brought there, and Rosh in Hilchot Kilayim, and Shulchan Pesak.',
    '7#_':
      "Tur from words of his father Rosh in explanation of the Tosefta in Hilchot Kilayim. (Beit Yosef wrote: Rambam omitted this Yerushalmi; it appears his reason is because he explained it like the latter explanation that Rashba explained, like R' Yosi there that kilayim is only in pressing — two pressings immediately — so now there is no novelty in this law, etc.; also Maharshal wrote on this Hagahah in Semag that it implies permitted.)",
  },
  'siman_300/beur-hagra/part-001.txt': {
    '1#ב':
      'Even if he sewed them, etc. — per explanation of mishnah 9, and from here that it is forbidden, etc.; and even Rosh who disagrees there — nevertheless here he agrees.',
  },
  'siman_252/beur-hagra/part-001.txt': {
    '1#ב':
      'That it is forbidden to sell them, etc. — unlike at the beginning where it is permitted even for another mitzvah — Rambam, and as the gemara at the beginning: lest a mitzvah matter present itself; and at the end — redemption of captives.',
    '7#_': 'A slave, etc. — Gittin 37 side b, like Rashbag; and likewise Rava, even according to the first tanna.',
    '12#ב': 'One who redeems, etc. — Tosafot Bava Kama 58 side a s.v. ein, etc.',
  },
  'siman_252/yad-avraham/part-001.txt': {
    '1#_':
      '(Siman 252 seif 12 in Hagahah) One who redeems his fellow from captivity must pay him, etc. And specifically at their value if not for life-saving — Maharshal in Yesh Sefatayim.',
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
