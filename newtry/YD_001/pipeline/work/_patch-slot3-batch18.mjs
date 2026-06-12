#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const PATCHES = {
  'siman_239/pitchei-teshuva/part-001.txt': {
    '6#_':
      'Two nezirut periods. Be\'er Heitev in Shach\'s name — see his laws of standard nezirut and Samson nezirut; see these laws in responsum Maharit part 1 simanim 19, 21, 53, 89, 135; Choshen Mishpat simanim 20–27; responsum Mahari of Lvov kelal 4 siman 24; R\' L. ben Chabiv 56; Radbaz Chadashot 42, 133, 136, 161, 406; Rosh Yosef to Mahari Eskapa end responsum 5 13b; Chavot Yair 15 p. 23. Know: what is written in our galut release-of-vows formula "in error... all types of nezirut I accepted including Samson nezirut" is mistaken — Samson nezirut has no release at all as Be\'er Heitev and Shulchan Aruch and Shach state. Gemara Eruvin 43: one who says "I am a nazir on the day Ben David comes" is forbidden wine all weekdays — Rambam Hilchot Nezirut 4:11; difficult — Rosh Hashanah 11 says redemption in Tishrei per R\' Eliezer, in Nisan per R\' Yehoshua — so only those months? Found in Teshuvah MeAhavah 1:211 from Tur HaEven on Rosh Hashanah — he asked and answered per "if worthy in its time" etc.; Rambam Hilchot Melachim 11 — on day Ben David comes redemption will not be — see there.',
  },
  'siman_239/rabbi-akiva-eiger-yd/part-001.txt': {
    '10#_':
      '(Shulchan Aruch seif 16) If he eats this and forgot. Possibly only when he tied his vow to something standing and doing; but a virgin to something sitting and not doing — e.g. "if I do not eat this I will not eat this," was compelled and did not eat — the condition triggers the oath — Maharit part 1 siman 1.',
  },
  'siman_239/siftei-kohen/part-001.txt': {
    '2#א': 'She has no oath law at all. As written Choshen Mishpat 241.',
    '2#ב': 'And he tied it to his intent etc. See above siman 228 seif 37 and siman 231 and what is written there.',
    '6#א': 'And likewise for a matter that is etc. See above siman 236 note 3.',
    '14#א':
      'And specifically etc., but if he said two times etc. Rav deduced in Darchei Moshe from gemara Nedarim 17 — we hold like Shmuel: "I am a nazir today, I am a nazir today" requires two nezirut periods; likewise vows and oaths; Mordechai end laws of mourning and Tosafot chapter Hareini Nazir — nezirut does not apply to nezirut except when vowing both same day — certainly his intent is for two; if not, why vow twice; implies but nazir thirty days then forty — first thirty count etc.; if added in second vow they count for first; only second vow same day; if he counted part of first then second vow does not count — Tosafot and Mordechai — end Darchei Moshe. But appears no proof only nezirut is like Shmuel — mishnah "there is a vow within a vow" gives nazir example not plain vow (opened with vow ended with nezirut because nazir is also called vow — Tosafot); only nezirut law so — Ran from verse nazir to nazir; second nezirut applies within time of first but cannot count until first counted — if not effective at vow time how apply later; certainly applies now — end. But vows cannot say so; or as Tosafot — why leave plain vow opening — in vows no vow-within-vow; nazirut different because fixed term etc.; Beit Yosef challenged Tur — seems two days suffice for "I am nazir, I am nazir" only because minimum forty days; generally no vow within vow; Darchei Moshe wonder why not one day counts for two — perhaps nezirut only stack when adding days like today and tomorrow — Rav Huna, Shmuel disputes, halachah like Shmuel — Beit Yosef intent not so; Taz omitted Rav\'s "if said twenty twice forbidden meat forty" — Tur also only when adding days on first; verse nazir to nazir only nazirut not oath — end; even "I vow from meat twenty" twice — intent extra days or same twenty — Rashba 426 — not like vows — Rav not compelled.',
    '14#ב':
      'Only if he vowed two vows in one day etc. Bach wrote unclear — here like "I am nazir today, I am nazir today" Shmuel counts two nezirut — concern forbidden forty days even two vows one day — end his words. Wonder — Mordechai and Tosafot there imply like Rav and Darchei Moshe; what seems one law for vows and nazir follows Rav — but I wrote nearby not so.',
  },
  'siman_239/beur-hagra/part-001.txt': {
    '1#ג':
      'And some say etc. Mistakes in vows 25b; bringers 24b; Ran\'s version; Rosh — 25 in Tosefta and Yerushalmi; as below; coercion in Yerushalmi Ran 25b s.v. keshem; coercion as Shevuot 26a except coercion — Nedarim 25a R\' Hoshaya taught in Beit Shammai not so.',
    '3#א':
      'Excommunication etc. As in first chapter 91 — cherem is oath and oath is cherem etc.; brought in Yalkut Yehoshua 18; end of Judges 76 — know power of cherem — "for the great oath" and Israel swore — cherem is oath.',
    '6#א':
      'One who swore etc. Be\'er Hagoleh (see Rashba 294 — Rish Nazir not proven from "Torah comes to include rabbinic"; Rosh from gemara "and one under oath" — applies even after rabbinic enactment) — gemara arranged Yoma 74a etc. (Shevuot 24a per R\' Elazar).',
    '14#ב':
      'And it does not appear to me etc. Beit Yosef: wonder — only for nazirut where default is thirty days, not this case — like oath not to eat nine then ten — if ate nine and one more violates two oaths — his words wondrous; "only for nazirut" per his view; Shmuel even "I am nazir, I am nazir" needs two periods; Darchei Moshe wondered; see note 12; nine and ten in 238:12 unlike here; his words very wondrous; Tur ruled correctly.',
    '16#א': 'Since etc. 25b inadvertent vows etc.; Tosafot there s.v. keshem.',
    '16#ג':
      'And it is possible etc. but etc. Nedarim 14b; see 15b; Ran s.v. uleinyan; as 213.',
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
