#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_249/beer-hagolah/part-001.txt': {
    '10#_': 'From the statement of R\' Eliezer — great is the deed etc. — there in Bava Batra.',
    '13#_': 'From the statement of R\' Abba — R\' Levi said, great is lending etc. — Shabbat daf 63a.',
    '14#_': 'From the statement of R\' Chiya bar Abba and R\' Yochanan who expounded etc. [Bava Batra daf 10].',
  },
  'siman_249/beur-hagra/part-001.txt': {
    '3#א':
      'One must etc. — as stated at the end of Ketubot, good is whitening etc.; and as stated (Proverbs 15:17), "Better a meal of vegetables" etc.; and as stated in Shachar Tov there.',
    '16#א':
      'There is one who etc. — from what is stated in Yerushalmi end of Peah and chapter 8 of Shekalim: R\' Chama son of R\' Chanina and R\' Hoshaiah the Elder were walking in the synagogues of Lod; R\' Chama bar Chanina said to R\' Hoshaiah the Elder, how much money did my ancestors sink here? He said to him, how many souls did your ancestors lose here? Were they not children who cleave to Torah? R\' Avun made a door for the study hall; Rava went down, R\' Mani came to them — he said, see what you have done. He said (Hosea 8:14), "And Israel forgot his Maker and built palaces" — were they not children who cleave to Torah? And the girsa of Tashbatz: "or sick people cast into the hospital"; and Maharik was precise — learn from this that for other charity, synagogue is preferable, and it is not necessary; and all the more so for our girsa; and Tosafot Bava Batra 9a s.v. "for it is stated" etc.; and all the more so for synagogue.',
  },
  'siman_249/baer-heitev/part-001.txt': {
    '16#_':
      'For their souls. In Orach Chaim siman 621 he brought in the name of Rokeach the reason — because He examines hearts and knows that if that deceased had been alive he would have given charity if he had money etc.; but if one gives on behalf of a wicked person it does not help — end quote (and it is written in Sefer Nishmat Adam: if some individuals wish to take matzah money that they buy themselves to give to poor people they choose, the law is not with them; rather they must give to the gabbaim).',
  },
  'siman_249/rabbi-akiva-eiger-yd/part-001.txt': {
    '1#_':
      '(siman 249 seif 1 in Hagahah) Whatever he wishes. And in She\'eilot (parashat Terumah) and Tosafot that three and not more — see there; and they brought it in Mishnat Hasidim Orach Chaim (siman 456).',
  },
  'siman_249/siftei-kohen/part-001.txt': {
    '2#_':
      'A third of a shekel. And it is a sixth of an ounce of silver — Tur. And this is per what is stated below siman 331, that five shekalim are two and a half ounces per Rashi; and per what the Rav stated there that it is approximately two gold reinish (and it is written in Hagahot Derishah that this means five gold in our time); or the shekel is a third of a gold reinish thaler, meaning a Polish gold — and then the obligation of charity is ten large ones etc.; and therefore in these lands the charity gabbai goes in the synagogue on Monday and Thursday to collect charity money from each person; and even if he gives from the smallest coins he gives more than a third of a shekel per year — and this is a proper custom. And although in Orach Chaim of the Rosh printed at the end of the siddurim he wrote one should give at each year\'s end a gold and a half — that is a measure of piety; but by law one is obligated only a third of a shekel for the entire year, as implied in the Gemara and poskim.',
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
