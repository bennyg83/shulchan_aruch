#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_237/siftei-kohen/part-001.txt': {
    '6#ב':
      'Or in other holy writings. But one who swears on the Torah in any matter requires release, as the Rav wrote above siman 212.',
    '6#ג': 'Or on a table, etc. — see above siman 204 seif 2 in Hagahah.',
    '9#_':
      'Like the vow of wicked people, etc. — since wicked people are accustomed to swear it is as bringing an oath from his mouth — see above siman 206 seif 4.',
  },
  'siman_237/rabbi-akiva-eiger-yd/part-001.txt': {
    '1#_':
      '(Siman 237, seif 9.) Like the vow of wicked people that I will not eat this loaf — explained that if he says like the vow of righteous people that I will not eat this loaf it does not help, since righteous people do not swear — and this is the mishnah\'s law (daf 9 side a); requires study: as we say above (siman 206) one who says like the vow of righteous people "this loaf is upon me" is a neder — meaning he says this loaf is upon me like a korban and calls the korban by the name "vow of righteous people"; if so, "like vow of righteous people I will not eat" means like saying "like a korban I will not eat this loaf" — a neder in language of oath that helps per law of yad, per Ramban brought by Ran beginning of Nedarim (2b), though "like korban I will not eat for you" does not help — see Bach (siman 204) and Kesef Mishneh — without "I will eat," without shin, attached as "I will not eat korban"; but "I will not eat" — helps; must say this loaf upon me is clear he came to vow and proven in his words, but "like vow of righteous people I will not eat" more clearly an oath since he says in (neder) [oath] language; if so even if in his mind as neder, since his words do not imply so it is only devarim shebalev — similar to "korban I will not eat for you" which does not help as in daf 16 — like swearing by life of the korban, and unattributed even if he intended it as korban therefore he does not eat; thus because it does not imply so in speech; likewise here. Therefore one should judge "like vow of righteous people I will not eat for you" — more implies he speaks of korban, for "I will not" is neder language — see Tosafot Nedarim in sugya of yadim — see there; for practical law — requires study.',
  },
  'siman_237/pitchei-teshuva/part-001.txt': {
    '1#_':
      'In heaven and on earth. See Chochmat Adam general rule 79 — he wrote this deals when he did not say "I hereby swear" but said "by heaven," etc.; but if he said "I hereby swear by heaven" — why omit oath language here since his intent is for Him who created them — see there.',
    '2#_':
      'He wrote in Assyrian script. See Chavot Yair siman 106 — all this deals when written in Jewish script with intent, etc.; but dipping quill and writing alef-beit in Assyrian, and likewise medical books Euclid and Mount Sinai remedies, etc., printed in Assyrian without sanctity of material, and no effect in his thought, no purpose for soul — though one should refrain from treating them disrespectfully, nevertheless they lack sanctity of books to save from fire on Shabbat, and one who swears on them — no oath.',
  },
  'siman_245/beur-hagra/part-001.txt': {
    '3#ג':
      '(Likut) Rather a mitzvah, etc. — Baer Heitev; and they said (Temurah 16 side a) rich and poor met, etc.; and they said (Sanhedrin 91 side b) whoever withholds Torah, etc.; and in Tanchuma parashat 27:4 "Is it not to break bread to the hungry" — hunger is only hunger for words of Torah, and they have only words of Torah, as it says "behold days are coming… I will send famine… not hunger for bread," etc.; from here they said if one understands Torah he is sustained from his Torah so his wisdom increases and they add to him; whoever does so is not withheld from good, etc. — see there at length; there in that parashah "when you see the naked" — how? If you see one without Torah, bring him into your house and teach him Shema, prayer, one verse daily or one halacha, and urge him in mitzvot — for you have no naked one in Israel except one without Torah and mitzvot, etc., as written "and you are naked and bare," etc.; and in Avot D\'Rabbi Natan and gemara in many places (see there).',
    '22#ה':
      'Even his son, etc. — as written in Sifrei parashat Shoftim: he and his sons — if he dies his son stands in his place; I have only this — whence for all providers of Israel that their sons stand under them? Teach: "among Israel" — whoever is among Israel, his son stands under him; and in Tosefta Shekalim: whoever preceded in inheritance precedes in rank provided he follows his fathers\' place; and in chapter 12 of Ketubot (103 side b) Shimon my son, Gamaliel the elder, etc. — must say, etc.; and this is what is written "all," etc.',
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
