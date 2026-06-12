#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_232/beur-hagra/part-001.txt': {
    '9#_': 'And even if he said etc., but etc. — Nedarim 26b, and Ran in his explanation there.',
  },
  'siman_232/nekudot-hakesef/part-001.txt': {
    '4#_':
      '(There note 34) He challenged Atzei Chayim, who wrote that the Gemara escaped him; in my humble opinion it appears Atzei Chayim saw this Gemara — Beit Yosef brings it as halachah as usual — only he was troubled like Ran\'s difficulty: if so, why doesn\'t R\' Eliezer, who holds neder ziruzin, say he intended a full vow so they break it — say to him "did you vow at all?" rather "to honor me" — as if I accepted; he answers there one cannot say so — end; examine; on the contrary it appears he did not examine the Gemara Rosh cites — Gemara 63a challenges etc., Rosh brings it from mishnah 62b — in truth it is not there but on 24a — perhaps a wording error in his language; also what he said we need specifically that he is accustomed to benefit from him — requires study whether we hold so for halachah, since Rambam, Tur, and Shulchan Aruch wrote in general "he said to him" as explained — presumably etc.; for there is relevance if known clearly he is not accustomed, and his words do not imply so — examine.',
  },
  'siman_232/pitchei-teshuva/part-001.txt': {
    '14#_':
      'From his residence. (Baer Heitev; see Chasam Sofer responsum 288 in the name of Rashdam, explained there — Rosh not because neder shegagot exempts, since the mistake was not in the body of the vow; also not neder onessin, since poverty is common and he did not stipulate — only exempt because anan sahadei, as if he stipulated explicitly that if this occurs he is exempt from his oath; this is not devarim shebalev, for it is clear to everyone he did not stipulate — see there.)',
  },
  'siman_232/rabbi-akiva-eiger-yd/part-001.txt': {
    '2#_':
      '(There seif 3) And he refused and forbade him with a vow — Ran (23) — in such a case a friend\'s eating is not a grievance, so he should not forbid him for that; the matter proves it is only ordinary stimulation; not so in the case above (siman 228) where he forbade where the other would do him a favor and it was a grievance to him — we say only when he actually forbade and requires release through an opening: if he had known his friend would not do so he would not have forbidden him.',
    '9#_':
      '(There Shach note 10) For even in such a case it is a vain vow — it appears simple that specifically in such a case where the prohibition itself cannot be fulfilled, therefore even with his condition Rabbenu Tam holds it is vain; but in the reverse — if he says "if I do not sleep three days" or "if I do not taste one fruit of all fruits in the world, I am forbidden to go to such-and-such a place" — the vow applies: what of it that the condition cannot be fulfilled — nevertheless the prohibition can be fulfilled; Tummim (siman 26) is not so, and he wrote plainly that here too it is vain; in my humble opinion it is not so.',
    '20#_':
      '(In the alternative wording) And see above siman 234 note 54; and responsum Rama (siman 49); and responsum Bach (note 23); and responsum Maharam Galanti (simanim 74, 152); and Maharshadam (parashat Vayeichi); and Mahari Adri (simanim 67, 144); and Mahari"t (note 21) in Mahachot printed in Beit Aharon (1).',
  },
  'siman_232/siftei-kohen/part-001.txt': {
    '14#ז':
      'However, if they informed him etc. In Mahariv\'s responsum there it appears that even in such a case it is forbidden, since he did not permit in such a case; the rav so understood in Darkei Moshe\'s words, but he wrote: it appears to me it requires study, for we explicitly say in the last chapter of Yoma (daf 84a) that if they informed him it was in his heart to deceive in the matter, there is no profanation of Hashem\'s name; therefore it seems to me everything depends on the need and the oness — until here his words. In my humble opinion there is no proof from there, for we say R\' Yochanan swore to a matrona by the God of Israel "I will not reveal" — he went out and taught in the sermon: I swore to the God of Israel I will not reveal — to the people of Israel I reveal — there is profanation of the name, for he revealed to her from the outset — end; that case is different, since the language itself can be interpreted thus — clear.',
  },
  'siman_232/turei-zahav/part-001.txt': {
    '4#ב':
      'Like a beam of an olive press. Gemara challenges — was there not a snake in the days of King Shapur — they placed thirteen loads of straw on it and it swallowed them; Shmuel said: in "toref" on its back we speak, like a beam of an olive press; there are many explanations what "toref" means; why didn\'t Tur also write it deals with toref — so Rosh in his rulings did not bring this toref; it appears the commentators in Gemara mean the vower did not explicitly say he saw a snake toref on its back, but Shmuel means the vower\'s intent in saying "snake like a beam of an olive press" was regarding toref — proven from Gemara\'s words "toref on its back we speak," not "what are we dealing with that he said snake toref on its back"; certainly as I wrote; therefore Tur ruled leniently that stating "snake like a beam of an olive press" alone suffices, for he already included "like beam of olive press" for size; what the tanna taught in the mishnah teaches incidentally regarding sale, as concluded in Gemara — so it appears to me per Tur; for halachah we hold like Ran: even if he attributed the loaf to something that is not exaggeration but an absolute lie in everyone\'s eyes, the loaf is permitted, for he did not intend prohibition — we do not find anyone who explicitly disagrees with Ran; accordingly even if he saw no snake it is permitted; Ran also concedes: if he did not see a multitude with the generalization it is forbidden — specifically regarding snake toref on its back that is known to have no multitude per Ran; therefore at the time of the vow his words have no place at all; it is known no person is careful in his words and does not seek that they believe him — not so with a multitude, where he wants them to believe he saw a multitude and that he distinguishes in calling them "like those who left Egypt" when he did not really see at all — therefore the loaf is forbidden to him; in Darkei Moshe I saw he wondered why he needed "what he saw" at least with a multitude, and regarding snake even if he did not see — as I wrote, so it appears correct to me.',
    '12#ב':
      'To do a matter on a certain day etc. — it appears difficult from what I explained above siman 228 seif 41, that there is a distinction between "for a day" and "on a day" — that "for a day" has no prohibition afterward from the oath; this is no difficulty, for Beit Yosef copied this law here in the name of Rashba, and there it is written truly "for a day"; Rama does not hold this distinction — therefore he did not precision to write here "on a day."',
    '12#ד':
      'A person is believed etc. Beit Yosef end of siman 228 wrote so in the name of Rashba — his words: even though he uttered the vow unspecified, and even if he afterward attributed it to matters where the listeners\' intent was the opposite of what he says, and even if the listeners thought and recognized he vowed knowingly and willingly without any oness etc.; proof from one who vowed cherem and afterward says "by the cherem of the sea I vowed," as above siman 208 — end.',
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
