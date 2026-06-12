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

// --- mechaber (2) ---
patchFile('siman_026/mechaber/part-001.txt', 'mechaber', {
  '1#main': `The law of a perforation in the esophagus or in the intestines before [completion of] shechitah. In it are 2 seifim. The esophagus was perforated at the time of shechitah opposite the place already slaughtered — treifah.`,
  '2#main': `He slaughtered the trachea and the lung was perforated before he slaughtered the esophagus; or he slaughtered the esophagus and the intestines were perforated before he slaughtered the trachea — treifah.`,
});

// --- siftei-kohen (2) ---
patchFile('siman_026/siftei-kohen/part-001.txt', 'siftei-kohen', {
  '1#_': `<b>The esophagus was perforated, etc.</b> That is, before completing shechitah of the esophagus; but after he slaughtered the majority — kosher, even for us who disqualify all laws of shechitah in the last minority — there it is in the remaining minority itself; but what was already slaughtered is kosher. And further, this case is different, for the disqualification did not occur through shechitah at all; and so it appears from Rashi at the beginning of daf 8 — see there and from other poskim. And even though the trachea was not yet slaughtered — nevertheless treifot do not disqualify an esophagus already slaughtered, as Rashba wrote; and so Maharshal, chapter HaShochet, siman 17; and so Derishah; and all the more if the esophagus was perforated after it was entirely slaughtered before slaughtering the trachea — kosher, not like Bach — examine well.`,
  '2#_': `<b>And the lung was perforated, etc.</b> Even though the lung's life depends on the trachea and the intestines' life depends on the esophagus — nevertheless treifot apply to them until both trachea and esophagus are slaughtered. Tur.`,
});

// --- turei-zahav (2) ---
patchFile('siman_026/turei-zahav/part-001.txt', 'turei-zahav', {
  '1#_': `<b>Opposite the place already slaughtered.</b> Maharshal wrote in chapter HaShochet, siman 17: it appears to me — if the trachea itself was severed after slaughtering the trachea, it is not made treifah by this; and likewise if the esophagus was perforated after it was slaughtered — and the law mentioned here is before completing shechitah of the esophagus; but after he slaughtered the majority, it does not appear at all that it should disqualify — end.`,
  '2#_': `<b>Before he slaughtered the trachea — treifah.</b> For we do not say: since he slaughtered the esophagus, the intestines are as placed in a basket; and likewise the lung after slaughtering the trachea — for we hold there are treifot for half-living creatures. And at first glance one may challenge from what he wrote nearby in the name of Maharshal that there is no prohibition in perforating the esophagus after slaughtering its majority. One may say: this case is different, for there are treifot for intestines by themselves without the esophagus; and therefore here too we forbid the perforation in them after slaughtering the esophagus — unlike the esophagus itself, for since its majority was slaughtered, behold it is as if it does not exist.`,
});

// --- baer-heitev (2) ---
patchFile('siman_026/baer-heitev/part-001.txt', 'baer-heitev', {
  '1#_': `<b>Treifah.</b> And Shach wrote: that is before completing shechitah of the esophagus; but after he slaughtered the majority — kosher, even for us who disqualify all laws of shechitah in the last minority — there it is in the minority that remained by itself; but what was already slaughtered is kosher. And further this case is different, for disqualification through shechitah did not occur at all. And even if he had not yet slaughtered the trachea at all — so ruled Maharshal and all latter authorities, not like Bach who is stringent on this.`,
  '2#_': `<b>Treifah.</b> And Shach wrote: even though the lung's life depends on the trachea and the intestines' life on the esophagus — nevertheless treifot apply to them until both trachea and esophagus are slaughtered. And Taz wrote: it is not comparable to what is written above, that if the esophagus was perforated after slaughtering its majority there is to permit — one may say this case is different, for there are treifot for intestines by themselves without the esophagus; therefore here too we forbid the perforation after slaughtering the esophagus — unlike the esophagus itself, for since its majority was slaughtered, behold it is as if it does not exist.`,
});

// --- beur-hagra (2) ---
patchFile('siman_026/beur-hagra/part-001.txt', 'beur-hagra', {
  '1#_': `<b>(Likkut) Perforated, etc.</b> See Beit HaGadol; and also from what is written (17b): it requires examination of three windpipes. Tur HaDeshen (end).`,
  '2#_': `<b>He slaughtered the trachea, etc.</b> See Tosafot there, 32b, s.v. vehadar bei, etc.: <br><b>(Likkut) That they are, etc.</b> According to Tosafot's explanation there: from what is written "and R' Zeira returned," etc. — meaning from his question that R' Zeira asked, etc., and answers: in any case, etc.; and what is written here "since they were born," etc. — does not challenge except according to Rabbah; and we hold like R' Zeira stringently. And further: it is difficult — R' Levi according to R' Levi, as I wrote; and who is Rashba'l thus, etc., and we do not know what he retracted. And R' Chananel explains like Rashi: from what is written "he returned" from that of here, which challenges "since," etc., and answers according to his words, etc.; what is written here "since," etc. — according to Tosafot's explanation; and he does not hold except in all cases treifah — except for R' Levi, who permits "since," etc.; and we hold like R' Zeira, as explained. But Tur HaDeshen ruled like R' Levi and like Rabbah, that R' Zeira is singular against them; and further, since Rav Acha bar Yaakov said: learn from R' Levi, etc. — learn R' Levi holds thus; and all the more according to Rashi, that for R' Zeira all is permitted — we hold like R' Levi stringently in Torah law, etc. (end).`,
});

// --- beer-hagolah (2) ---
patchFile('siman_026/beer-hagolah/part-001.txt', 'beer-hagolah', {
  '1#_': `Tosafot, Ra'osh, and Ran on that which R' Zeira sharpened the knife, etc. — Chullin daf 8.`,
  '2#_': `(According to Tosafot's view there, that for Rav Acha bar Yaakov R' Zeira disputes R' Levi, etc.; and so ruled Ra'osh and Rambam, chapter 7 of Hilchot Shechitah).`,
});

// --- kereti (3) ---
patchFile('siman_026/kereti/part-001.txt', 'kereti', {
  '1#א': `At the time of shechitah — that is, before slaughtering the majority.`,
  '1#ב': `Treifah; and if he slaughtered majority of the trachea in an animal, or the esophagus, and the trachea or esophagus was perforated — Derishah's view: kosher; and Bach is stringent to forbid; and see Peleti what I wrote: according to our custom to forbid ikkur in the last minority — here too there is to forbid.`,
  '2#_': `He slaughtered the trachea, etc. — even according to the above view that if the trachea was perforated it is kosher; nevertheless the lung, which is another organ and the matter of that organ does not apply at all — we say treifot apply to half-living creatures; and even if one of the simanim was slaughtered, treifot apply to the other organs — and this is correct.`,
});

// --- peleti (2) ---
patchFile('siman_026/peleti/part-001.txt', 'peleti', {
  '1#_': `Treifah — and this is while the majority of the esophagus was not yet slaughtered; but if the esophagus majority was already slaughtered, if it was perforated — kosher, for behold it is as if it is not — so most early and latter authors raised, except Bach; and in truth, why need length on this? Behold Tosafot, Chullin 31b, s.v. hachalid, wrote explicitly, and thus: and here too, if after slaughtering the majority the minority was uprooted, its shechitah is kosher, since it was not through its shechitah — end; behold a clear matter that uprooting the minority is called not through shechitah. And in truth it is difficult for me: that the Rabbis and R' Yehudah dispute regarding the trachea slaughtered in a large ring and all hagramah — all in the trachea, and they do not dispute in the esophagus, where he slaughtered the majority in its place and the last minority did hagramah in the slaughter-house — for the Rabbis we require all shechitah in its place — invalid; and for R' Yehudah, behold majority of shechitah is in its place; and if something was perforated in the slaughter-house we forbid — behold the esophagus majority was already slaughtered and there is no perforation or split that disqualifies it. But from where Tosafot and Ra'osh came, first chapter of Chullin, and Rashba in responsum 366 — all answer and say uprooting is not through shechitah; and if so, according to Rama's words that even in ikkur we are stringent in the minority — the same regarding perforation of the siman after slaughtering its majority; and here it does not apply that this is through shechitah, for they agreed uprooting is not through shechitah. And it is strained to say the stringent hold uprooting is through shechitah — this is strained; therefore one should be stringent where there is no loss, as Bach's view.`,
  '2#_': `Treifah — and even though in the previous seif it is said: if he slaughtered the esophagus and it was perforated — kosher; one may distinguish between another organ and that organ — so Derishah; and so it appears in Rashba's responsum. And so it is proven from Ra'osh's words: we do not hold like R' Levi, who said: he slaughtered the trachea and the lung was perforated — kosher; for R' Levi said two contradictory matters here: slaughtered at the place of the cut, etc., and we do not know which of them was last, and we act stringently. And one should understand: behold that which if the trachea was severed — slaughter afterward helps — does not apply to the halakhah, for R' Yochanan does not hold thus, and the baraita teaches "these are forbidden" — if so the halakhah is like R' Yochanan. And why is this matter needed? Only the other law, as one who places in a basket. (And so one must say regarding those above in s.k. before this: as it is written, R' Levi in crop severance in its majority — nevertheless slaughter helps in it; all the more treifot apply to it; and what is written: severed by itself or through shechitah — behold Ra'osh is concerned for two matters to be stringent. And one must say: this certainly resolves that text, for R' Yochanan disputes and it is reasonable to him that whatever was severed — slaughter no longer helps, and behold it is like slaughtered and standing.) And one must say Ra'osh holds it is a distant dispute — we do not act accordingly; since R' Levi holds even in that organ itself slaughter and treifot apply after it was severed, and R' Yochanan disputes only in that organ, but in other organs R' Yochanan agrees with R' Levi that treifot apply — and such is the halakhah — examine well.`,
});

// --- kaf-hachayim (2) ---
patchFile('siman_026/kaf-hachayim/part-001.txt', 'kaf-hachayim', {
  '1#_': `<b>(1) [Seif 1] The esophagus was perforated at the time of shechitah, etc.</b> The same if somewhat damaged at the place slaughtered at the side of the cut before the majority was slaughtered — treifah. Shemirat Shabbat KeHilchatah, part 1; Shulchan Petach, part 1; Zivchei Tzedek, part 1.`,
  '2#_': `<b>(2) There. The esophagus was perforated at the time of shechitah, etc.</b> That is before completing shechitah of the esophagus; but after he slaughtered the majority — kosher. Maharshal, chapter HaShochet, siman 17. Taz, s.k. 1. Shach, s.k. 1; and he wrote: all the more if the esophagus was perforated after it was entirely slaughtered before slaughtering the trachea — kosher, not like Bach, who wrote it requires study for practice. And so Peri Chadash, part 1; Peri To'ar, part 1; for the first paragraph, part 1; in Leket Yosher, part 1. However Shemirat Shabbat KeHilchatah, part 1, wrote one should not be lenient in this except in case of loss; and a careful person should be concerned to be stringent for himself. And so Machberet, part 1: in case of loss there is to permit.`,
});

console.log('siman 026 patch complete');
