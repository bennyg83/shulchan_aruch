#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
}

/** Beur HaGra — siman 39 lung sircha examination (38 blocks) */
export const T = {
  '1#א': `One need not examine, etc. See Rashi Chullin 12a s.v. Pesach, etc., and so too there 51a, 56b that in a case of falling and the like it requires examination — if not, no; and there in that statement that examination of the slaughterer's cord is not required:`,
  '1#ב': `Except, etc. As written in chapter 3 of Yoreh De'ah (25b) "a planting cut off at their feet by butchers," etc., and in the Yerushalmi there R' Yudan asked: what proof of treifah from their words? As one who says we see the treifah on Yom Tov, etc., and therefore in such a case if certainly treifah this is not from their words. And in Tanhuma R' Yudan ben Pedayah: who will uncover dust from your eyes, Adam, that you, etc., a man of Israel takes a sheep or lamb and slaughters and skins, examines the lung, etc., and the reason is because it is uncommon and as stated above siman 1 seif 1:`,
  '1#ג': `And it was. For the essence of treifot is written "and it was," as written Chullin 31a, animal is included in chayah — from where do we know, etc., and from this verse we derive treifot in chapter 37 and above siman 28 seif 20:`,
  '1#ד': `(Likut) And in some places, etc. Like the law of the gemara that examination is not required — unlike one who says it is required — and proof from what is written Chullin 48b regarding a needle found in the cut, etc., lest if the lung were before us from the puncture we would not inflate it; clearly we did not inflate. Mordechai siman 495 (end).`,
  '1#ה': `And so is the essence. And so is implied there Chullin 47b: sealed, etc., lung that hisses, etc. — if not, we do not inflate.`,
  '2#א': `One who tore, etc. As written (Devarim 9:1 and chapter 3 of Yoreh De'ah) animal, etc., was slaughtered, etc., and as written there (Chullin 11a) from where do we know that we follow the majority from eglah arufah and parah adumah and se'ir hamishtaleach; and in Yerushalmi chapter 3 of Yoreh De'ah wolves came and took the intestines and ate them — kosher; and he was concerned perhaps the lung was punctured (25 — the early authorities' version in Yerushalmi) presumption of intestines is kosher, and so in chapter 9 of Berakhot as stated above in siman 39 (s.k. 4) and in chapter 3 of Yoreh De'ah (25a) skinning and cutting, etc., and we did not learn thus, etc., and in Chullin 39a for we rely on the wolf — apparently even for lung we rely [and it is worse than lost] and Rashba there at length; and Rashi z"l wondered: yesterday we ate from its milk, now we are concerned for treifah: <br>(Likut) Who, etc. As stated above from eglah arufah and parah adumah and se'ir hamishtaleach that even lung is not examined; and in Pesachim (95b) go take the permitted, for it is common, etc., and we are not concerned for lung treifah; and in chapter "One need not" (Beitzah 25a) the Torah taught, another matter, etc. Mordechai ch. 1 (end):`,
  '2#ב': `And some are stringent, etc. As they conclude there Chullin 12a: where it is possible, etc., therefore for other 18 treifot where it is not possible — not possible; but for lung where it is possible to examine we do not rely on majority. Ra'avan:`,
  '4#א': `Or to the uma. Rashi agreed since the reason is on account of rabbeiteihu — it has no relevance on the back; and Rava said "one lobe to include" — the essence of the matter is the prohibition, it comes to teach us:`,
  '4#ב': `Between, etc. Ran: not like those who distinguish on the back:`,
  '4#ג': `Even, etc. R' Hai Gaon from what is written "this is rabbeiteihu": <br>(Likut) Even without examination. See Ra'osh there at length and all this length according to his approach that he explains there like Rashi that every sircha is on account of puncture; but according to Tosafot there and certainly examination is not required, and so Mordechai and so in Tosafot there s.v. this is, etc., and from the laws of treifot of Rabbenu Gershom, etc., and this is what is written in the hagahah "and one says," etc., that it is the geonim's view; but Ra'osh and Semag agreed with R' Hai Gaon and Ramban that examination is not required (end):`,
  '4#ד': `And it is not called, etc. So wrote the geonim and this is what "this is rabbeiteihu" — from cut to cut; and Ran and Ra'osh:`,
  '4#ה': `And one says even, etc. Since it says "why examination" — implies in the latter part examination is in any case required. And the first reasoning holds therefore it says "why examination" — to teach that sircha treifot is not on account of itself but on account of puncture in the lung: <br>(Likut) Even without examination. And one says even in k'sederan, etc. Their dispute depends on the dispute of Rashi and Tosafot: according to Rashi's reason that there is no sircha without puncture except here [covering] requires examination if it was sealed well; and so Rabbenu Gershom Maharam and so in the geonim's responsum; but according to Tosafot that it is without puncture but its end will cease — not so in such a case examination is not required. Sefer HaTerumah and Tosafot Chullin 46b s.v. this is rabbeiteihu, etc. (end):`,
  '4#ו': `Even from a clear tear. Tosafot there s.v. but k'sederan, etc.:`,
  '5#_': `If there was doubt, etc. For it was slaughtered in presumption, etc., and we follow majority of animals that are kosher. There:`,
  '6#_': `Ayinunita, etc. For all of them relative to it are not in order. Darkei Moshe. And this is the reason for "and the rest" and what is written "however," etc.:`,
  '7#א': `If adhesion occurred, etc. As stated above in the previous seif:`,
  '7#ב': `And some are lenient, etc. That is, rabbeiteihu as above:`,
  '8#א': `Sircha that emerges, etc. According to Tosafot that the prohibition of sircha is that its end will detach not in order — not so in hanging; and even according to Rashi wrote that in such a case it is without puncture — accordingly:`,
  '8#ב': `(Likut) And examination is not required. Rambam and Ramban and Beit HaLevi and sages of Lunil wrote that examination is required; and Terumat HaDeshen 35:1 wrote and in our places they practiced permissively even without examination — and so it appears to me, like the view of one who holds there is sircha without puncture as stated above; and since so, why are we concerned for it since there is no flaw at all, and as stated all have doubt upon, etc., it itself, etc., and all the more so in such a case; and see Yoreh De'ah 34:1-2 that agreed with Tosafot Chullin 47a s.v. this is, etc., and wrote that in old versions it says there Chullin 48a "if from puncture this," etc., and not "if not punctured" (end):`,
  '9#א': `Sircha that is, etc. Also according to Tosafot that its end will detach — not so in such a case; and accordingly it applies also according to Rashi; but the essence of these two seifim is according to Tosafot:`,
  '9#ב': `And specifically, etc., but, etc. That its end will detach — in a living inflated [lung] it is:`,
  '9#ג': `And all, etc. That it is on account of puncture arises:`,
  '9#ד': `Or, etc. For certainly detached from there:`,
  '12#_': `Good, etc. As written at end of Chullin 19: why liquids, etc., and according to Rif's explanation there that if there is sircha it slips away; and so Rambam there in his explanation: and if there is weak sircha it slips off:`,
  '13#א': `There is one who, etc. From what is stated if, etc., it slips; and so in the hagahah to suck and explains what is written in gemara on account of sircha that draws — meaning secretions that draw; and these are detached by inserting the hand or constricting:`,
  '13#ב': `(Likut) And some permit to feel, etc. But Rashba in responsum siman 304 wrote on this that every butcher who does so is removed [and wrote there: for we did not find this matter anywhere in the Talmud and we do not know its basis; and there is no sircha unless it is like the thickness of the cart they draw with and it cannot be detached, or some measure was fixed in the matter — feeling with fingers that even lung and kanunkanot are wiped away thus; final word: do not heed to be lenient in this matter in any way at all] and see siman 31 (end):`,
  '14#_': `Examines, etc. According to Taz:`,
  '15#_': `Butcher, etc. Even though one person is believed in prohibitions, nevertheless since it was in error his words are nothing; for even a sage who ruled to forbid if he erred it is nothing, as written chapter 4 of Sanhedrin 33a: since if these were your cows, etc.; and Tosafot Niddah 2b s.v. who taught him; and Chullin 44b s.v. how, etc.; and chapter 2 of Kesubos (22a): she said "I am impossible" and returned and said "I am available" — believed if she gave an excuse for her words; and so she said "I am impure," etc.; and all the more here where the excuse is revealed:`,
  '16#_': `The examiner said, etc. As written in Yevamos 30b: Rabbah said "a woman," etc., and there 31a and the mishnah here in one writing, etc., and the same here for it was slaughtered in presumption, etc.; and Tosafot there s.v. woman:`,
  '17#א': `Since they came, etc. To exclude if the buyer came first, as written there Chullin 117b as Rashi wrote "he believed her," etc.:`,
  '17#ב': `For lung examination, etc. As written in Yerushalmi chapter 3 of Yoreh De'ah as above (s.k. 2):`,
  '18#א': `On the back of the lobes. To exclude punctured from inside — that is not rabbeiteihu, as written s.k. 20:`,
  '18#ב': `In sircha. As Rashi explained what is written: dsavikh — this is sircha; and do not wonder except specifically in flesh — to exclude in bone; and see there s.v. there and s.v. dsavikh, etc.:`,
  '18#ג': `And for us, etc., also, etc. Tosafot there s.v. Rav Nechemyah, etc.:`,
  '20#א': `Behold, etc. For it is not rabbeiteihu, as above:`,
  '20#ב': `And if, etc. The rule in this until end of siman: whatever majority is sealed will not detach:`,
  '22#_': `If adhesion occurred to the uma, etc. As Ran explained what is written there "how do we act" — refers to all that was stated: we are concerned for R' Nachman regarding raised vegetation and for Avimi regarding both; and Rav Nechemyah refers leniently to a blow on the wall and regarding the dispute of R' Nachman and Avimi he ruled like Avimi to be stringent in Torah law; and likewise the dispute of Rava and Rav Nechemyah like Rava; and what is written at beginning: examination is not required according to all; and at end treifah and it does not help, etc., not like R' Nechemyah; and they did not distinguish between raised vegetation or not as above. <br>(Likut) If, etc. — but according to Tosafot there s.v. we bring, etc. and s.v. R' Nachman, etc. — kosher only without raised vegetation and there is a flaw on the wall and by examination; and Terumat HaDeshen according to Rashi's view explains what is written "how do we act" — refers to both, and even raised vegetation; and what is written "and if not on account of," etc. — this means examination is required; and one version: and even though wind does not exit and R' Nachman examined, etc. — stringent even if there is a flaw on the wall; and regarding halakhah in Shulchan Aruch followed the stringent and we rule like R' Nechemyah; and therefore no distinction whether there is a flaw or not between raised vegetation or not — always by examination kosher and if not treifah. And Razah and Rambam and Rabbeinu Tam explain what is written "and if not," etc. and treifah — this means doubt of treifah, as stated Chullin 44b; and Rav Nechemyah does not dispute Rava but comes to explain; and therefore where there is a flaw — kosher without examination; and if not — kosher with examination; and in both no distinction between raised vegetation or not. And Rif's version: and even though wind does not exit and did not bring R' Nechemyah's words who holds it refers leniently to blow on wall and argues leniently and ruled stringently like Rava; and according to his view where there is a flaw — kosher by examination and if no flaw examination does not help and no distinction between raised vegetation or not; and so for all views not like those Tosafot s.v. we bring, etc.; and now Chullin 38:1-2: but if adhesion, etc. Terumat HaDeshen there in name of Ramban and wrote there that Razah and Ra'avad hold the same in all places but he agreed with Ramban's view wrote and so they practiced, etc. (end):`,
  '25#_': `Lung that was found, etc. As written: lung that stands lobe by lobe — there Chullin 46b:`,
};
