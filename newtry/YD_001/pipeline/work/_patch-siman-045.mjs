#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const TRANSLATIONS = {
  mechaber: {
    '1#main': `The law if the placenta was removed. In it are 2 seifim. Cattle or bird where the placenta was removed but the fetus rests in it — kosher. {Rama: And all the more if it was punctured — kosher (one opinion). And some are stringent to forbid if punctured or dissolved (there; Rokeach; and above seif 3; Hagahot Sha'ar HaDin siman 88 in name of Or Zarua; Orach Chaim general rule 55). And one should be stringent if not in a place of great loss.}`,
    '2#main': `If the membrane through which urine drips was removed — kosher. And some forbid. {Rama: And so is customary to declare treifah even if punctured (Tur in name of R' Chananel; Hagahot Maimuni chapter 8 of Hilchot Shechitah in name of Tosafot beginning of daf 48; Agudah; and so Hagahot Sha'ar HaDin siman 88 in name of Or Zarua; Darkei Moshe in name of Maharai; Maharshal in his responsa siman 96 in name of Ra'avyah and R' Yitzchak).}`,
  },
  'siftei-kohen': {
    '1#א': `Or bird, etc. And Tosafot and poskim wrote to R' Chananel regarding bird — treifah; and so in Hagahot Sha'ar HaDin siman 88 and in Maharshal's responsa siman 96, and thus: Ra'avyah wrote that if removed in the bird's intestines where the egg rests — R' Chananel and R' Yitzchak rule regarding bird to forbid; Or Zarua end of his words. And so Bach wrote that one should be stringent where there is no great loss; and so Orach Chaim general rule 55 law 9; and so Darkei Moshe concludes; and he wrote: I saw in Or Zarua as their words.`,
    '1#ב': `And all the more if punctured, etc. — meaning according to the rule established below siman 50 seif 2 that any organ that if punctured is treifah — if removed — treifah; except that some are stringent regarding puncture, etc.; and so Darkei Moshe. But regarding removal of the placenta — all agree it is kosher, as stated explicitly in the mishnah and gemara.`,
    '1#ג': `And some are stringent, etc. And Bach wrote that it appears from the gemara's context in Piskei Avodah Zarah and chapter Echad Devei Mammonot that by law punctured or dissolved placenta is forbidden; and therefore even in great loss it is forbidden; however if partially removed — kosher, end of his words. And his words were not clarified to me. And so Tosafot Piskei Avodah Zarah (daf 48a) and Agudah there siman 47 imply explicitly that punctured placenta is kosher; and so Rokeach siman 398; and so appears from other poskim's words.`,
    '1#ד': `In puncture, etc. And it is explained in Hagahot Sha'ar HaDin and Orach Chaim there that if partially removed — kosher; and they bring it in Darkei Moshe; and so is in the gemara chapter Echad Devei Mammonot (Sanhedrin daf 33a).`,
    '2#_': `And so is customary, etc. And so Maharshal in his responsa there wrote that it appears one should practice thus, except in his book Piskei Avodah Zarah siman 42 he retracted — see there.`,
  },
  'turei-zahav': {
    '1#_': `And some are stringent. This is Rokeach whom Beit Yosef brings; he wrote on it: I do not know his source; it is logical that dissolved is not more severe than removed, end of his words. And so Maharshal — it did not appear to him as Rokeach's words, from where does he distinguish between dissolved and removed; one must not add to treifot, end of his words. Also Rama in Darkei Moshe wrote that Ra'ash, Rashba, Ran, and R' Yerucham permit; only in great loss he was stringent here. And it is explained in Beit Yosef according to Tosafot's conclusion that also in bird in the cluster of its eggs the law is like cattle regarding placenta. Maharshal brought an incident where they found a needle stuck in the cluster of eggs and declared treifah because it is in the body's cavity and perhaps one of the organs was punctured; and so Orach Chaim.`,
  },
  'baer-heitev': {
    '1#א': `Bird. Maharshal wrote in name of Ra'avyah that if removed in the bird's intestines where the egg rests — treifah; and Bach wrote one should be stringent where there is no great loss. (And Peri Chadash disputes; and one should investigate if two placentas were found in it what its law is; and it appears this depends on the dispute in interpretations regarding "all excess is considered as removed" — see Kenesset HaGedolah 163.)`,
    '1#ב': `Dissolved. Shach wrote: if partially removed — kosher. (And Bach was stringent even in great loss regarding punctured or dissolved placenta; however if partially removed part of it is kosher. And Peri Chadash wrote for practice we are lenient regarding puncture and partial removal and dissolution; and all the more removal by hand. And accordingly in bird sometimes found in cluster of eggs which in foreign tongue they call geswalene eier and the eggs are dissolved like moldy — permitted in great loss per Rama and Shach and Peri Chadash even without great loss; if the fetus dissolved in the cattle's intestines see Peri Chadash and Kenesset HaGedolah that they permit similar to dissolved placenta where the fetus rests in it; and majority of poskim declare the fetus and animal treifah (see Chayei Adam siman 18 and Peri Chadash here).)`,
    '2#_': `To declare treifah. And all the more removed; and so Tosafot chapter One Who Hens (daf 48): if punctured the urinary chamber or removed — treifah. Oxen that urinate blood must inspect the membrane where the urine exits whether it was punctured — if not punctured, permitted to eat (Hagahot Lifnei Periyah). And Maharshal wrote they found a needle stuck in cluster of eggs and declared treifah because it was in the body's cavity and perhaps one internal organ was punctured.`,
  },
  'beer-hagolah': {
    '1#_': `Mishnah Chullin daf 54 and in gemara daf 55.`,
    '2#א': `Tur in name of Ra'avan and Ra'ash agreed.`,
    '2#ב': `There in name of Rabbenu Chananel; and so in Sha'arei Perushim; Hagahot Maimuni chapter 8 of Hilchot Shechitah in name of Tosafot; and so Rokeach.`,
  },
  'beur-hagra': {
    '1#א': `Or bird. Tosafot 56b s.v. ibaya etc.; however perhaps etc.; and it appears we read etc.; and so poskim.`,
    '1#ב': `And all the more etc. As stated above siman 40 seif 5.`,
    '1#ג': `And some are stringent etc. — they liken to spleen and etc.; and according to what stated siman 43 seif 2 partial removal equals puncture; and here kosher as in Bechorot 28 and Sanhedrin 33 — then also puncture. (Likkut) And some are stringent — Shahar says as siman 50 seif 2; one should not liken to spleen as Ra'ash end chapter 7 wrote: specifically spleen whose puncture when "Adam" punctures is only in its support etc.; and further if so it should have taught "they ruled treifah like spleen" and not relied on safek; for safek is kosher regarding puncture per all (end).`,
    '2#א': `Removed etc. As written (54a) do not add to treifot; and further it is similar to halcholot there 50a since thighs etc. do not return to body — same here.`,
    '2#ב': `And some forbid — they hold it is in category of intestinal organs.`,
  },
  kereti: {
    '1#א': `Or bird in bird cluster of eggs — meaning like placenta in cattle.`,
    '1#ב': `Bird; and Tosafot's view to explain R' Chananel that urinary membrane is treifah in bird; Peri Chadash rejected his words; see Peleti where I settled R' Chananel's words; and see there therefore called placenta and main name trayfachat because it is mother of fledglings; and so in baraita.`,
    '1#ג': `To forbid puncture — see Peleti where I elaborated — main law kosher and lenient did not lose in place of great loss per Rama's view.`,
    '1#ד': `Dissolved; and if fetus dissolved in cow's intestines whether to forbid cow see Peleti what he wrote; and per all if cattle's womb intact there is no concern at all.`,
    '2#_': `Even if punctured; punctured urinary sac — do not add to treifot; and this is not membrane where urine drips into.`,
  },
  peleti: {
    '1#_': `Or bird; and Tosafot on daf 55b s.v. ibaya wrote to explain R"T's words who ruled treifot stringently regarding removal even though we conclude in Bechorot for Darkei Moshe's view one who declares treifah in removal; and Tosafot's view is R' Chananel speaks of bird in cluster of eggs. And they ruled to declare treifah. And indeed R' Chananel's words are kabbalah and fitting to heed them. However Peri Chadash rejected his words in his claim: as the mishnah teaches "these are kosher in cattle — removed placenta" — if so in "these treifot in bird" it should have taught "removed trayfachat"; this is his claim and there is no substance in his words; on the contrary the law is with him — how can it teach "they ruled treifah" for prohibition where there is no dispute at all; and they always said halachah from a generalization that they dispute; and so the matter since it teaches "they ruled" from a generalization there is one who rules to permit. And if this is R"T who returned to the rabbis and said "your stringency — treifot" — see there. But this is what Peri Chadash said: the tanna of the mishnah who does not list treifot in bird permits in bird like cattle. Therefore they ruled to be stringent and forbid; and they acted and ruled; and so we hold stringently. And this is Tosafot's intent on why Levi did not enumerate the rest of the bird because it does not deal with dispute like he did not list removal of down which R' Yehudah declares treifah; and at first glance the matter is puzzling — there he did not wish to list treifot where many dispute; but here if so one who disputes — in Bechorot in cattle we learned but in bird we do not find permitting; and see Maharsha and Maharam of Lublin; and according to what I wrote our tanna is mishnah tanna who does not list among these treifot those who dispute and permit; and properly he did not enter himself into dispute; and it is clear and correct. And I said therefore they said placenta and said trayfachat because placenta is nickname for cattle and trayfachat for bird; and they abbreviated in their tongue as order; and it must be "meterefachat" and "metar" in every Greek Roman tongue; and also in Hebrew placenta like arrow for "metareh" meaning quiver; and if half and they abbreviated tongue of small fledglings hanging on cluster as we say in Yevamot "eggs of pachi" — see Rashi and Arukh; and this is trayfachat mother of fledglings; and they abbreviated in tongue and omitted nevertheless from trayfachat and it must be meterefachat and nickname for placenta of eggs; and in my view this was kabbalah in R' Chananel.`,
    '2#_': `And some are stringent to forbid puncture. And acharonim' view is to be stringent; and I did not know the essence; and the proof of this is Rokeach and it is according to what Beit Yosef wrote in his name siman 42 that his view is to permit removed bile; and we learn he does not hold Tosafot's view at all how puncture is treifah — likewise removed; for bile punctured is treifah and removed is kosher per his view; and if so also here regarding placenta one can say puncture is treifah and nevertheless removed placenta is kosher like anonymous mishnah. But according to what we ruled above siman 41 removed bile is treifah for its law equals puncture; and if so if we declare treifah here for puncture also removed is treifah; and alongside it we learned removed is kosher. Therefore the law has no root; and all the more Bach's words that we merited his responsum; and all he brought as proof from chapter One Who Hens is strained and built on rotten foundation in Maharam's name; and the essence difficulty Bach raised in responsum is how R"T's mishnah was hidden from them then in their hands even though not written before Rabbi — removed placenta kosher; and what did they need testimony of Tuvia the doctor. One can answer simply: certainly he knew what was tradition in their hands removed placenta kosher; only he thought the interpretation on creature lacking that it did not pain her; but in removal by hand that pains her — treifah. But in creature lacking he knew her; and they already said in gemara Yevamot chapter 6 on Sarah she had no offspring even house of offspring she did not have; and Sarah was not treifah; but in removal by hand that pains her he did not think to permit; and this is simple; therefore they brought testimony from Tuvia the doctor who cut in Egypt with hands the placenta; and understand. And regarding dissolution that declares treifah I did not understand — if so removed placenta why kosher; behold at first slight dissolution and afterward entire dissolution; and how can treifot return to kosher status like previous siman; and you could say indeed treifah; and R"T's act was removal by hand as act of testimony of thanksgiving in Egypt; if so why did acharonim strike on "they ruled trayfachat" for prohibition — he erred in mishnah matter; the act was anonymous removal and they did not know whether anonymous or by hand and declared treifah like above in kulya; but R"T knew it was removed by hand; and therefore one must say he does not hold Tosafot's view and other authors' view on this law; therefore one need not be stringent; and see below in laws of niddah siman 194 where I clarified from Rambam's commentary on mishnah that partial removal of placenta is treifah. And behold Bach and acharonim cited in name of Or Zarua that fetus dissolved in its mother's intestines — even the cow is treifah; stillbirth kosher; and acharonim wrote one must not add to treifot; and to me it is difficult — for behold animal is treifah without sign or mark on its body because fetus dissolved inside it; and if so in chapter Kol HaTa'aruvot the gemara challenges mixed with treifah — how did they know etc. — see there he strained and did not answer in such case animal is treifah and no sign or mark on its body and therefore cannot be recognized; perhaps Or Zarua holds as Tosafot's view who challenged in mixed treifah why feed them — behold one does not redeem kodshim to dogs; granted for one who says they are treifah by goring or falling — reasonable after slaughter we inspect it; but for one who says fetus treifah from birth — and this is Tosafot go according to his view who holds fetus treifah for commoner forbidden but for priest permitted; and per Rashi only for priest forbidden — no place for Tosafot's question; and if so Or Zarua holds like Rashi regarding fetus treifah; and in goring and falling Tosafot wrote there is inspection; but in this case we challenged let us say in dissolution of fetus — for then placenta has no remedy and is treifah forever and stands; and also stands Tosafot's question behold one does not redeem etc.; but in any case acharonim's question what will help and harm that fetus dissolution declares animal treifah — have we come to add to treifot Chazal enumerated; therefore it appears as I wrote removed placenta anonymously — if we would attribute that dissolution of placenta began one after another until entirely dissolved — behold treifah as explained already became treifah at beginning of dissolution; and how return to kosher status; but from anonymous we do not attribute dissolution and we say on account of weakness it was removed in most cases without dissolution; but if we saw that fetus dissolution preceded in its interior — behold established this weakness causes dissolution inside like one who bears dissolution; and if so if removed afterward we attribute from power of dissolution this matter occurred and treifah for it does not return to kosher status; and understand; and if so what Or Zarua wrote fetus dissolution — meaning also removed placenta; and understand.`,
  },
  'pitchei-teshuva': {
    '1#_': `Or bird. [Be'er Heitev and what he wrote — investigate if two placentas found etc. See Levushei Srad siman 18 wrote hen with two intestines where egg rests — not kosher except in great loss; however if not adhered to one another whoever wishes to permit without great loss — we do not rebuke him; but if one large and one small — kosher even without great loss even if adhered together; however if one adhered to another organ declared treifah by puncture such as gizzard etc. — not kosher except in great loss whether large adhered or small adhered — see there reason of matter.]`,
    '2#_': `Or dissolved. Be'er Heitev and what he wrote regarding geswalene eggs in bird see in responsa Emunat Shmuel siman 18 wrote plainly to permit; and see responsa Kiryat Channah siman 11 that he doubted this and concluded nevertheless I received from my rabbis to permit without doubt — see there; and see Peri Megadim that his view is to be stringent without great loss; and see responsa Mekom Shmuel siman 28.`,
  },
  'kaf-hachayim': {
    '1#_': `(1) [Seif 1] Cattle or bird where placenta was removed but fetus rests in it — kosher. Tosafot Chullin 56b s.v. ibaya and poskim wrote to R' Chananel bird treifah; therefore Bach wrote one should be stringent where no great loss; and so Shach s.k. 1. Lifnei Periyah 1; Beit Shmuel 1; and wrote and not like Peri Chadash. Sha'arei Perushim 1 end; Arukh HaShulchan general rule 19; Anaf Yosef siman 24; Zivchei Shem 1; Beit Yitzchak 2; Zivchei Tzedek 1.`,
    '2#_': `(2) And in bird the intestine where eggs rest is like placenta in cattle. Bach. Perishah 1 Lifnei Periyah there. Beit Shmuel there. Kereti 1. Sha'arei Perushim there. Chokhmat Adam there. Beit Yitzchak there. Zivchei Tzedek 1; and see below 12.`,
  },
  'yad-avraham': {
    '1#_': `(Siman 45 seif 1) Cattle or bird where placenta was removed but child rests inside — kosher. See responsa Emunat Shmuel siman 18 that permitted bird in which was found geswalene eier and intestines where eggs rest were not punctured or dissolved. And also fetus dissolved in cattle's intestines — kosher.`,
  },
  'yad-ephraim': {
    '1#_': `Cattle or bird. Be'er Heitev and what he wrote in name of Kenesset HaGedolah when has two placentas Mahariach wrote to permit from force of seif seif both in cattle and bird even without great loss.`,
    '2#_': `To forbid puncture or dissolution. Be'er Heitev; and see responsa Pri HaAdamah daf 44 that in Jerusalem Holy Community custom to declare treifah in dissolution — see there; and see responsa Bach siman 156 regarding dissolution or puncture of placenta whether to be stringent; and specifically in removal or partial removal one can say partial removal alone and puncture alone; and even though regarding spleen we do not hold thus. Nevertheless regarding placenta where permitted matter not clarified — concern for Torah prohibition — see there; and in Holy Community he cited Bach's words in brief and imprecisely — see there; and see Noda BiYehudah Even HaEzer siman 105 regarding cattle that while alive had urine dripping from feet — do not declare treifah on account of urine drip only on account water found in body cavity — explained below siman 50; and see there what I wrote regarding bird likewise treifah if urinary sac punctured. I wondered for he brought there from Bach responsum and there explained siman 147 bird has no urinary sac at all (and in Ben HaMechaber's gloss he noticed but did not write it is so in Bach responsum); and it appears responsum body not before him only what questioner cited in his words; and see Mekom Shmuel siman 108 cluster of eggs if punctured or dissolved — to permit in place of some need and stringent one may be stringent — see there; and see Or Zarua's words in responsa what he wrote and do not depart from his words which are fine flour.`,
  },
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

const FILES = [
  ['siman_045/mechaber/part-001.txt', 'mechaber'],
  ['siman_045/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_045/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_045/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_045/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_045/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_045/kereti/part-001.txt', 'kereti'],
  ['siman_045/peleti/part-001.txt', 'peleti'],
  ['siman_045/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_045/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_045/yad-avraham/part-001.txt', 'yad-avraham'],
  ['siman_045/yad-ephraim/part-001.txt', 'yad-ephraim'],
];

let total = 0;
for (const [rel, slug] of FILES) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(`No translations for slug: ${slug}`);
  total += patchFile(rel, slug, T);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
const progress = FILES.map(([rel, slug]) => {
  const n = Object.keys(TRANSLATIONS[slug]).length;
  return `${ts} siman_045/${slug} ${n} blocks DONE`;
});
progress.push(`${ts} siman_045 COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');

console.log(`[COMPLETE] siman_045 — ${total} blocks across ${FILES.length} files`);
