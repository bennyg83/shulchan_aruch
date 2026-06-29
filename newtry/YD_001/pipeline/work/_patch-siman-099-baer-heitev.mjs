#!/usr/bin/env node
/** Editorial cleanup — siman 099 baer-heitev */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const REL = 'siman_099/baer-heitev/part-001.txt';
const SLUG = 'baer-heitev';

const T = {
  '1#א': `Bones. Taz wrote: since they are not edible they are not in the category of prohibition; nevertheless they absorb through cooking — therefore they combine to nullify the prohibition. Maharach challenged Rama from what Turei Chayim wrote, that even pottery in a vessel needs sixty against it — if so, here too one should say the bones are nevelah. I say: Moses is true and his Torah is true — a bone is truly like a metal vessel, for we do not say chein nafsho in it because it has a remedy through hag'alah; likewise a bone, as explained in Orach Chaim siman 451, that bone vessels are permitted through hag'alah — therefore chein nafsho does not apply here — end of his words. Ran in chapter 98 wrote that soft bones combine with the prohibition because of marrow in them and because of their softness moisture emerges; but dry bones or eggshells and the like — even those of prohibition combine to nullify the prohibition; and so is the view of Issur VeHeter and Bach.`,
  '1#ב': `The pot. Explanation: that same pot in which one is now cooking prohibition and permitted food.`,
  '1#ג': `They are stringent. Nevertheless, for the prohibition too they do not combine; but the bones of permitted food combine with permitted food. Shach.`,
  '2#_': `That it absorbed. And sixty against the nevelah meat does not suffice, for perhaps the meat diminished in cooking and entered the bones — so is stated in Tur.`,
  '3#_': `The absorbed piece. Explanation: a piece that absorbed from prohibition that fell into permitted food, and there is not sixty in the permitted food to nullify the prohibition except through combining the piece — they also combine the piece to nullify; however the piece itself is forbidden, as Mechaber wrote at the beginning of siman 106; but we are not accustomed to practice thus — rather one needs sixty against the entire piece; and even so the piece itself is forbidden.`,
  '4#א': `And it diminished. Maharshal wrote: it appears even where we saw the prohibition fell and did not diminish by one measure together with the permitted food — nevertheless one may not estimate what the pot absorbed, for one cannot stand on the root of the matter and does not know how much the pot absorbed and how many times spoilage will come from this; rather one always estimates as it comes before us. Taz wrote: according to this one may not rule permissibly regarding what Shulchan Aruch wrote in this seif — one estimates with a good estimate, etc.`,
  '4#ב': `That it absorbed. Taz wrote: one should not say perhaps at the fall of the prohibition the prohibition was very large and now contracted — we do not establish prohibition presumptively; however I already wrote above that one may not be lenient in this even in min b'mino.`,
  '5#א': `L'chatchila. Shach wrote: some say it is forbidden to nullify it d'oraisa; however b'dieved all agree its law is as Mechaber wrote afterward — end of his words. Taz wrote: in siman 84 seif 13 it is explained that if his intent is only for another matter, such as to fix honey, it is permitted; and in siman 137 seif 2 I wrote this is specifically when it cannot be done otherwise.`,
  '5#ב': `He transgressed. Explanation: he threw a small amount of prohibition into abundant permitted food where there is sixty against it, or it fell by itself when there was not sixty in the permitted food but he increased afterward.`,
  '5#ג': `For his sake. For if one permits for one for whom it was nullified for his sake, we are concerned lest he come to say to a non-Jew or a servant to nullify it — therefore we penalize him; but if it was not his and he also did not intend to nullify for himself, it is permitted for him, for his bad act does not help for a Jew. Rashal wrote: specifically when this one knew it was nullified for him it is pleasing to him even if he did not command him to nullify it; but if he did not know from him, it is permitted for him, for he is like one who acted b'shogeg; and where it is forbidden for him, it is forbidden also for his household members. Taz wrote: if he erred in law and thought it is permitted to nullify the prohibition, he is called b'shogeg; proof from Shabbat chapter Kol HaGadol in the mishnah — if he forgot there is a prohibition of melachah in this, even though he knows today is Shabbat, he is called b'shogeg — likewise here; and so is stated explicitly in Tosafot Bekhorot daf 23 s.v. svar, etc.`,
  '5#ד': `To sell it. Shach wrote: it appears specifically when a Jew buys at high price from a non-Jew it is forbidden — otherwise there is no reason to forbid selling to a Jew, for his bad act does not help.`,
  '5#ה': `Nevelah. Shach wrote: at first glance this is difficult — what connection does this have to chein nafsho? For even according to those who do not say chein nafsho in other prohibitions, nevertheless a piece that absorbed prohibition and permitted food was added afterward — the piece itself remains in its prohibition, as all poskim wrote at the beginning of siman 110, that the prohibition in it is not entirely emitted; rather the Rav comes to teach us that a piece that absorbed prohibition and permitted food was added afterward — even the addition is forbidden because there is not sixty against the entire piece; but if one increased b'shogeg sixty against all that is nevelah, even in basar b'chalav wet in wet all is permitted; but in a piece that absorbed prohibition, even if one increased sixty against the entire piece, the piece itself remains in its prohibition. He also wrote: from the Rav's words it appears that even in basar b'chalav we do not say chein nafsho wet in wet, and he disagrees with him — see there; he left Rama's words requiring study.`,
  '5#ו': `They practiced. Taz wrote: the reason is we need not be concerned lest more was added after it became nevelah — we do not establish prohibition presumptively; however if the teacher knows more was added but it is not known when — in such a case certainly one must investigate when it was added, as I wrote for halachah — end of his words. Shach wrote: even according to those who hold wet in wet is nevelah, and likewise a piece that absorbed prohibition — for all of them we are not accustomed to investigate, for we do not establish prohibition presumptively; however what the Rav wrote to distinguish between whether the mixture is known or not — and even in chein nafsho there is this distinction — Shach disagrees, for according to those who hold chein nafsho, immediately when there was not sixty it gave taste — what difference if it is known or not; and so is proven from siman 92 regarding inserting a dairy spoon into a meat pot twice without knowing in between — one needs sixty both times, because the first time the entire spoon became nevelah; and so several other proofs — see there.`,
  '6#א': `One increases. Shach challenged: in Orach Chaim siman 477 Mechaber wrote that the oil in a Chanukah lamp that became mixed with other oil and there is not sixty to nullify it — some say one may not add to it to nullify it — end of his words; behold Chanukah lamp oil is only rabbinic — he forced to distinguish that there, since it was designated for its mitzvah, it is stricter — requires study — end of his words. (Magen Avraham wants to resolve there that Chanukah is a matter that has a permitted use for the coming year, and I cannot understand his words — for if so, even in a thousand it would not be nullified; why did Mechaber write there "and there is not sixty to nullify it")`,
  '6#ב': `To change. Taz wrote: one may say regarding wood that fell from the palm on Yom Tov into the oven — one increases upon them prepared wood and nullifies them, for there it is lightening the prohibition and one does not benefit from them until the time of their destruction from the world, and then there is no substance in the prohibition. Maharshal wrote: that which we say there the reason is lightening — specifically because it is davar sheyeish lo matirin; but in davar she'ein lo matirin, in all rabbinic prohibitions one increases and nullifies — therefore he ruled b'dieved even if he intended to nullify them and did not know it is forbidden to do so, it is permitted — end of his words; and I proved above that if he did not know there is prohibition in the matter, it is permitted in all nullifications — end of his words.`,
  '6#ג': `Dry. Shach wrote: it appears to me to permit in great loss if it is dry in dry and min b'mino and it became known in between — see there, for he brings several proofs for his words; and all this if they have one taste; but two prohibitions that differ in taste — then each nullifies its fellow — see above siman 98. Taz wrote: one may say regarding inserting a spoon twice in siman 94 — here there is a new prohibition.`,
  '6#ד': `In meat. Shach wrote: one should not say it is plain, for every prohibition is nullified in sixty — one may explain because in siman 259 it will be explained that regarding heter b'heter nullification does not apply — it teaches us here we do not say thus; see there. Turei Chayim wrote that even l'chatchila it is permitted to put the water in a meat pot since it was already nullified.`,
  '7#_': `To use. Taz disagrees with this law and brings several proofs that we say this only where it also spoils; Bach and Levush ruled thus — see there; and see siman 122 seif 5.`,
};

function patchFile() {
  const fp = path.join(OUT, REL);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const keysInFile = new Set();
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
    keysInFile.add(key);
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
