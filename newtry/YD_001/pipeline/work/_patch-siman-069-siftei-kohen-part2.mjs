#!/usr/bin/env node
/** Patch missed file: siman_069/siftei-kohen/part-002.txt (19 blocks, seifim 18–20) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const TRANSLATIONS = {
  '18#ה': `["<b>And even if it did not remain the measure of melicha, etc.</b> And if a piece fell into tzir in a vessel that is not perforated and there is doubt whether it fell there before it remained the measure of melicha — what is outside the tzir is permitted, and all the more so if it is certain it fell there after it remained the measure of melicha; but if it is certain to us that it fell there before it remained the measure of melicha — forbidden even what is outside the tzir, for since it had not yet expelled all its blood it is literally like salting in a vessel that is not perforated — likewise in responsum Masat Binyamin siman 39, and he proved thus from the words of Or Zaru'a general rule 6 law 14, see there; and so is implied explicitly from the words of the poskim I brought in the previous s.k. that whenever it was not salted as required and did not expel all its blood it is forbidden when placed in a vessel that is not perforated, see there, and examine; and in my books I proved that the Rav in Torat Chatat also admits to this, not like Masat Binyamin who challenged him on this — and see in the end of seif 70 and in what is written there in s.k. 40 and s.k. 46:"]`,
  '18#ו': `["<b>And so they practice, etc.</b> Maharshal wrote chapter 25 siman 97 that even though we practice thus, nevertheless if one mixed into two, even in cooking, sixty is not needed but it is nullified in a majority, since from the Torah one in two is nullified, only d'rabbanan forbidden until sixty in cooking — as those poskim who permit what is outside the tzir may rely on them in such a case — requires further study for practical halacha; and perhaps one may rely on it since in any case blood that was salted or cooked is only d'rabbanan; however it implies there in his words that even if it was salted the measure of melicha for a pot and also remained the measure of melicha, there is permission in such a case, see there:"]`,
  '18#ז': `["<b>But the other pieces.</b> That do not touch the tzir but rest on the pieces that touch the tzir — Torat Chatat general rule 12 law 11, and see in siman 70 s.k. 47:"]`,
  '19#_': `And there are those who require placing it in boiling water. In order to solidify and congeal the blood remaining within; and therefore the Mechaber brought this reasoning, that where possible one should be concerned to do so — and as written in Beit Yosef; and Rambam's view is one need not be concerned for this at all, as explained in his words in Torat Chatat end of general rule 15; and the reason: since it already remained the measure of melicha, all its blood already exited, and what exits afterward, even though it is red, is only mere gravy:`,
  '20#א': `["<b>And it became full of tzir — permitted.</b> The reason: tzir exiting from flesh after it remained the measure of melicha is only mere gravy; and even though the salt on the flesh is forbidden because blood is mixed in it — nevertheless the salt is nullified in the tzir, so many poskim:"]`,
  '20#ב': `["<b>And some forbid.</b> For they hold this tzir is like other tzir and it is boiling and is absorbed in the flesh, and nevertheless is not absorbed more than k'dei klipah; and it is written in Torat Chatat beginning of general rule 14 that if he rinsed before placing in a vessel that is not perforated — permitted according to all; and it implies there that even if afterward it became full of tzir he speaks; and it was already explained above s.s. 68 that b'dieved one rinsing in the last time suffices; and it appears to me the same applies here, and it implies those who forbid forbid immediately even if it did not remain in the vessel, since there is tzir in the vessel — and so Or Zaru'a general rule 10 law 16 explicitly, see there, and see s.k. 31:"]`,
  '20#ג': `["<b>K'dei klipah.</b> And even though here there is no reason of spread from place to place, since it already remained the measure of melicha — nevertheless we do not say iydei d'falit tzir lo bala, as below siman 70, since it is in a vessel that is not perforated — and it is simple; and Maharshal disagreed in his book chapter 25 siman 76 and forbade everything in the tzir and a little above it k'dei klipah; and according to the Rav, sixty does not help to nullify, for wherever peeling is required we do not nullify in sixty, as below siman 105; and according to Maharshal, if there is sixty in what is within the tzir against the tzir it is permitted, but what is outside the tzir does not combine to nullify, for blood does not seep upward — and so Or Zaru'a general rule 10 law 19, and this is his wording: however what is within the tzir is forbidden even if there is sixty in the whole piece against it, for what is outside the tzir does not combine to nullify since blood does not seep upward, end of his words; and it is clear, and the Rav in Torat Chatat there law 2 wrote against Or Zaru'a, and it does not appear that if there were sixty in the flesh within the tzir against the tzir it would be permitted according to his words who forbids everything when there is not sixty, end of his words; and I wonder, for even Or Zaru'a only said that what is outside the tzir does not combine, as is clear in his words explicitly:"]`,
  '20#ד': `["<b>And the vessel, etc. — forbidden.</b> It was already explained above regarding a bowl in which flesh was salted in seif 16 and s.k. 60; and here where he wrote simply 'and the vessel into which that tzir fell is forbidden' — it deals with a case where it is impossible to peel, such as much tzir fell into it or it is an earthenware vessel, as the Rav wrote below siman 91 s.s. 5, see there — and so it is in Torat Chatat general rule 13, see there:"]`,
  '20#ה': `["<b>And likewise if the vessel was a non-Jewish vessel and has residue, etc.</b> It implies from the Rav's words that when the vessel is not soiled, even if it is a ben yomo it is permitted; and so is implied from his words above end of seif 8; and so Torat Chatat end of general rule 14 explicitly, see there; and even though in Hagahot Shadal (end of gate 7, and Beit Yosef brings it in the end of this seif) from which Rambam drew the source of this law — it is clear that if the vessel is a ben yomo, sixty is required against the whole vessel — nevertheless it would appear to the Rav to rule not like this, since we hold there is no melicha for vessels; and so siman 105 seif 12 in hagahah: if permitted meat was salted in a forbidden vessel — permitted, for melicha is not like hot to expel what was absorbed in the vessel — and so explicitly is the view of Maharshal chapter 25 siman 83, and it is simple not like HaEtz Chaim who copied Hagahot Shadal's hagahah as halachic ruling; and I wonder at him, for he himself wrote siman 105 seif 13 that if one salted flesh in a forbidden vessel it is permitted, for salt does not expel the prohibition from the vessel — perforce; and what Rambam wrote 'the flesh is forbidden' — it implies he forbids all of it when there is not sixty against the filth; and so is written in Torat Chatat there, and the reason see there:"]`,
  '20#ו': `["<b>But if it is great loss, etc.</b> Meaning in such a case, even regarding filth of milk we say the tzir is not considered boiling; and so is explained in siman 91 seif 5 in hagahah 1; and so is proven in Torat HaBayit siman 159 explicitly, see there:"]`,
  '20#ז': `["<b>And according to his words, even though the flesh remained, etc. until he rinses it very well.</b> Requires explanation how this law depends on this — behold all poskim admit here that the flesh must be rinsed very well, as stated in the Gemara explicitly: flesh does not leave its blood except if they salted it very well and rinsed it very well; and the Mechaber also wrote above in seif 7 simply that it must be rinsed very well; and it appears the Mechaber's intent is to say: since according to the view of those who forbid, they hold tzir exiting from salted flesh after its measure of melicha is boiling and is considered blood and not gravy, and is absorbed in the flesh — if so, forbidden to eat from it until he rinses it very well immediately before all its tzir finishes expelling, as written below siman 70 seif 5 from this reason, and as will be explained there; and so is proven in Beit Yosef in this seif in the section 'and what R' Yonah wrote,' etc. — see there and examine; and see in siman 70 s.k. 24 — it appears to me certainly the reason for rinsing after melicha is because of moisture and salt on it; and accordingly, when he cut it on all sides it is permitted to eat without rinsing; but according to this view that tzir before rinsing is considered blood — if so, always rinsing is needed to seal the expulsion holes — examine:"]`,
  '20#ח': `["<b>And if he cut — he must kasher it.</b> Meaning specifically according to the last view above; but according to what the Mechaber ruled, that l'chatchila one should be concerned for his words and b'dieved permitted — if so, forbidden only to cut l'chatchila, but if he cut he need not hag'alah — and it is simple:"]`,
  '20#ט': `["<b>And some permit.</b> Even if there are indentations in the knife, for through moving the knife back and forth in the flesh this filth is wiped from the indentations — so Maharai in Torat HaBayit there, and in Hagahot Shadal gate 9, and the Rav brings it in Torat Chatat end of general rule 17; and Maharshal in his Or Zaru'a gate 9 ruled that l'chatchila one should hag'alah, and b'dieved permitted if he wiped with something hard; and one who is stringent to forbid without hag'alah — let him examine himself; and this is specifically for himself, but for others one should rule to permit b'dieved even if he did not wipe and cut hot with it, end of his words; and likewise if he cut in roasting that was not roasted completely he also ruled thus; see there, and see in siman 76 seif 4:"]`,
  '20#י': `["<b>For there is no melicha for vessels.</b> Meaning blood m'sharek sharek and is not absorbed in the knife; and so Torat Chatat end of general rule 17; but certainly there is melicha for vessels regarding that it absorbs well through melicha where there is no reason of m'sharek sharek — and for that reason a vessel that is not perforated in which melicha was done is forbidden — and it is simple:"]`,
  '20#כ': `["<b>And so is primary, etc.</b> It implies that even l'chatchila permitted to cut; and so Torat Chatat there explicitly; and I wonder: since the knife requires rinsing afterward, as he concludes — if so, why are we not concerned lest he forget to rinse, as below siman 91, that it is forbidden to place cold permitted in a cold forbidden bowl lest he eat without rinsing; and a knife is something whose way is not rinsing, as below siman 95 s.k. 1 — strained to say this case is different since the food itself does not need rinsing, only there is concern lest he cut afterward without rinsing; but that case below siman 91 is from the words of Rashba, and Rashba wrote that even in a permitted vessel the law is the same, as written there in s.k. 2; and one may say that specifically regarding a vessel we are concerned lest he forget to rinse what is in it, unlike on a knife where the prohibition visible on it he will see the blood on it and rinse; or if he wishes to use it he will see the blood on it with his eyes and rinse; or this case is different since by law there is no prohibition after it remained the measure of melicha according to most poskim; however with a forbidden knife it implies in Torat Chatat there that forbidden l'chatchila to cut flesh with it and b'dieved permitted — and compare to below siman 105 seif 12 in hagahah, see there:"]`,
  '20#ל': `["<b>But the knife requires rinsing.</b> Even though the tzir on it has not yet dried; and so in Darkei Moshe and in Torat Chatat there:"]`,
  '20#מ': `["<b>Or sticking in the ground.</b> The law of sticking — above s.s. 121:"]`,
  '20#נ': `["<b>They rinse it very well.</b> This too follows the last view above; and according to what the Mechaber ruled, that l'chatchila one should be concerned for it — and it is simple:"]`,
  '20#ס': `["<b>If he wishes to salt and eat it roasted, etc.</b> Until the end of the siman it is explained properly in siman 76, see there:"]`,
};

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
  return applied.size;
}

const rel = 'siman_069/siftei-kohen/part-002.txt';
const n = patchFile(rel, 'siftei-kohen', TRANSLATIONS);

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(
  path.join(ROOT, 'progress.log'),
  `${ts} siman_069/siftei-kohen-part2 ${n} blocks DONE\n`,
);

console.log(`[COMPLETE] ${rel} — ${n} blocks patched`);
