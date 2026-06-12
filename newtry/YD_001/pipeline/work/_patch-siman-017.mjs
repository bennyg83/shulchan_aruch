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

// --- mechaber (3) ---
patchFile('siman_017/mechaber/part-001.txt', 'mechaber', {
  '1#main': `The law of one who slaughters a dangerously ill animal. In it are 3 seifim. One who slaughters a healthy animal and it did not convulse (pirkus) (meaning: it did not writhe)—behold it is permitted. But a dangerously ill one—and this is anything that they stand up (with a shout or with a stick) (Kol Bo in the name of the Ravad) and it does not stand even though it eats food of healthy animals; if one slaughtered it and it did not convulse at all—behold it is nevelah and one is lashed for it. And if it convulsed—behold it is permitted. And the convulsion must be at the end of the shechitah (and one must draw out until after the shechitah) (Ta"u Netiv hag chalak according to Rashi's view) but at the beginning it does not help. What is the convulsion—in a small behemah and in chayah both coarse and fine: whether it stretched its foreleg and returned it, or stretched its hind leg even though it did not return it, or bent its hind leg alone—behold this is pirkus and permitted. But if it stretched its foreleg and did not return it—behold it is forbidden, for this is only release of the soul alone. And in a large behemah—whether foreleg or hind leg, whether it stretched and did not bend or bent and did not stretch—behold this is pirkus and permitted. And if it did not stretch foreleg or hind leg and did not bend at all—behold it is nevelah. And in fowl—even if it only quivered (meaning: in the blink of an eye) in its eye and did not writhe (meaning: shake) only in its tail—behold this is pirkus.`,
  '2#main': `One who slaughters a dangerously ill animal at night and did not know if it convulsed—behold it is doubtful nevelah and forbidden.`,
  '3#main': `Great Torah scholars would not eat from an animal that they hurry and slaughter lest it die, even though it convulsed at the end of the shechitah. And this matter has no prohibition; rather whoever wishes to be stringent upon himself in this—behold he is praiseworthy.`,
});

// --- siftei-kohen (8) ---
patchFile('siman_017/siftei-kohen/part-001.txt', 'siftei-kohen', {
  '1#א': `<b>In a shout or with a stick.</b> But when they stand it up by its hand—one does not remove it from the presumption of dangerously ill. There (in the Gemara):`,
  '1#ב': `<b>Behold it is nevelah.</b> For anything that did not convulse—it is known its soul was removed from it before shechitah. End of Talmud:`,
  '1#ג': `<b>And to draw out until after shechitah.</b> And so Beit Yosef and Maharshal chapter HaShochet siman 18 wrote that from our Rashi's explanation it does not sound thus; therefore the main view appears that even though it did not make the convulsion after shechitah but only at completion of shechitah it is kosher—end of his words. And so Beit Yosef wrote that from our Rashi's explanation it does not sound thus, and I have not grasped the end of their view—for behold it appears explicitly from Rashi's explanation in the entire sugya of chapter HaShochet (Chullin daf 38a)—see there s.v. kol heichi and s.v. amar Rava and s.v. she'ani omer and s.v. at end of shechitah—they challenged in Beit Yosef s.v. zeh pireish for death—and examine. And so it appears in the Talmud—see there:`,
  '1#ד': `<b>Or it bent its leg, etc.</b> Beit Yosef wrote: it appears that when it bent only its foreleg it is forbidden. And so Taz wrote explicitly. But Rashba and Ran and Kol Bo in the name of the Raz and Tur and R' Yerucham ruled that even if it bent only its foreleg it is permitted. And Maharshal there wrote that such is the view of the Rif and Rosh and he ruled accordingly, and so Beit Yosef.`,
  '1#ה': `<b>Even if it did not quiver only in its eye.</b> Know that there are variant texts in the Talmud—some read "in its body" instead of "in its eye," and some poskim hold that quivering in its eye does not help; and so Maharshal and Beit Yosef.`,
  '1#ו': `<b>And not writhe only in its tail.</b> And likewise wagging tail in behemah helps, as stated in the mishnah; and so Rosh and Tur and R' Yerucham and other poskim, and Maharshal and Beit Yosef and Taz. And what he wondered in siman 38 seif 37 daf 148b on Rabbenu Baḥya who did not emend thus—there is no wonder, for he holds like the Rav HaMagid chapter 4 of Ma'achalot Assurot in the Talmud of Ramban and Rashba—that it states fowl for amplification, lest one think by him that tail-wagging is a light matter—it teaches us—and all the more in behemah. And so Ran; and it appears from the words of the Rav HaMagid there that the view of Rambam too, who is like the Mechaber's wording, is thus—see there:`,
  '2#_': `<b>One who slaughters the dangerously ill, etc.</b> And it does not help if on the morrow he found the walls of the slaughterhouse smeared with blood—even though Tur wrote that it helps in such a case, he already wondered on this, and also in Beit Yosef he wondered on him; and this is his view here.`,
  '3#_': `<b>But whoever wishes to be stringent, etc.</b> And regarding an idolater's animal—where there is no monetary loss—because of piety it is forbidden; but regarding an Israel's animal, because of monetary loss—even piety does not apply, only stringency for great scholars. So it appears to me from the words of the Rav HaMagid in the name of Ramban and Rashba—not like the Taz; and he wrote in responsa that Rabbenu Yehuda wrote in the name of the Geonim: regarding an idolater's animal it is not rendered fit until it stands on its legs by itself and walks four cubits in a small one and full height in a large one—and so Ra'avan siman 222, and Maharshal and Beit Yosef in the name of responsa.`,
});

// --- turei-zahav (4) ---
patchFile('siman_017/turei-zahav/part-001.txt', 'turei-zahav', {
  '1#א': `<b>In a shout or with a stick.</b> Meaning: but if they stand it up by hand—it does not help.`,
  '1#ב': `<b>Behold it is nevelah.</b> For it is clear to the Sages that its soul was removed before completion of its shechitah.`,
  '1#ג': `<b>Only in its eye.</b> In Tur's book it is written "in its body," and Maharshal wrote that we practice stringently that the eye alone does not suffice but the body.`,
  '1#ד': `<b>Only in its tail.</b> In Beit Yosef he brought that Rosh and Ran and Ramban and Rashba and the Rav HaMagid hold that in behemah too tail-wagging helps like the plain mishnah; and that which Rava stated it regarding fowl is for amplification—that tail-wagging is a light matter and one might think it does not suffice—it teaches us; and so Tur—only that Beit Yosef proved from Rambam's view that tail-wagging does not help except in fowl; and it appears one who relies on all these did not lose, especially since Rambam did not mention explicitly a prohibition; and I again found thus in Maharshal chapter HaShochet siman 19, and so concludes Lechem Chamudot.`,
});

// --- beer-hagolah (3) ---
patchFile('siman_017/beer-hagolah/part-001.txt', 'beer-hagolah', {
  '1#_': `As Rabbi Yehuda said in the name of Rav—Chullin daf 37.`,
  '2#_': `Wording of Rambam chapter 4 of Laws of Shechitah from the mishnah there and like the Sages.`,
  '3#_': `There in the Gemara daf 38, and like the Rif and Shulchan Aruch.`,
});

// --- baer-heitev (8) ---
patchFile('siman_017/baer-heitev/part-001.txt', 'baer-heitev', {
  '1#א': `<b>It stands.</b> And he wrote in the Shach: but if they stand it up by hand it does not help, for it is clear to the Sages that its soul was removed before shechitah.`,
  '1#ב': `<b>The shechitah.</b> And he wrote in the Shach that Maharshal rules that even though it did not convulse after shechitah, at completion of shechitah suffices; and the Shach disagrees with him.`,
  '1#ג': `<b>And permitted.</b> And Beit Yosef wrote: but if it bent only its foreleg it is treifah. But Maharshal and the Shach permit when it bent its foreleg.`,
  '1#ד': `<b>In its eye.</b> And he wrote in the Shach that there are versions that read "in its body" instead of "in its eye." And Maharshal wrote that we practice thus and quivering in the eye alone does not suffice but specifically in the body; and Peri Chadash disagrees.`,
  '1#ה': `<b>Pirkus.</b> And all the later poskim ruled that in behemah too, if it wags its tail—behold this is pirkus.`,
  '2#_': `<b>And forbidden.</b> And he wrote in the Shach: and it does not help if on the morrow he found the walls of the slaughterhouse smeared with blood.`,
  '3#_': `<b>Praiseworthy.</b> And likewise regarding an animal that a sage forbade and permitted—this is a matter that depends on reasoning. But a matter of Gemara is good to eat; see below siman 109. And he wrote in the Shach: and specifically regarding idolaters' animals one should be stringent because of piety; but regarding Israel's animals—even piety does not apply because of monetary loss, only stringency for great scholars. And in responsa he wrote that regarding an idolater's animal it is not rendered fit until it stands on its legs by itself and walks four cubits in a small one, and in a large one full height—and so ruled Maharshal and Beit Yosef.`,
});

// --- beur-hagra (5) ---
patchFile('siman_017/beur-hagra/part-001.txt', 'beur-hagra', {
  '1#א': `<b>In a shout, etc.</b> For since it says "that they stand it up," etc.—we learn that it must also be able to stand from its crouching, and standing it by hand is merely an act of wood in the world.`,
  '1#ב': `<b>Behold it is nevelah.</b> There 38a: it is known that its soul, etc.`,
  '1#ג': `<b>And to draw out, etc.</b> See Rashi there s.v. at end of shechitah and s.v. zeh pireish, etc.`,
  '1#ד': `<b>Only in its eye.</b> Such is the version of the Rif and Rambam there, and they omitted tail-wagging of behemah that the mishnah teaches and other matters stated in the Gemara; and he followed Rambam's path and explained what is written there as halachah only according to this baraita alone.`,
  '3#_': `<b>(Seif 3) And this matter, etc.</b> There 37b.`,
});

// --- kereti (11) ---
patchFile('siman_017/kereti/part-001.txt', 'kereti', {
  '1#א': `Or in a shout—and if one stood it up by hand, we have no concern for it.`,
  '1#ב': `Behold it is nevelah—for it is clear to the Sages that a dangerously ill animal that is in extreme weakness, when one began to slaughter a few simanim, it has no strength to endure further and its soul departs; and behold it is nevelah before completion of slaughter of the simanim.`,
  '1#ג': `And one is lashed; and it is permitted to slaughter the mother or the offspring after it, for it is certainly nevelah.`,
  '1#ד': `And to draw out until after shechitah—and Peri Chadash's view is that completion of shechitah suffices; and I already wrote in Peleti that he raised his head much against our Rabbi Yerucham who is stringent that specifically after shechitah, almost a moment—see there.`,
  '1#ה': `Whether it stretched its foreleg—and this is when it returned its foreleg—Shach.`,
  '1#ו': `Behold this is pirkus and permitted; and great ones are careful regarding an idolater's animal.`,
  '1#ז': `In its eye—there are variant readings in the Gemara, and there is a version "its body," and one should be stringent.`,
  '1#ח': `Behold pirkus; and if its cry is strong and it cast dung and runs far—and the like—see in the Gemara and poskim that these too help; and because they are uncommon I shortened.`,
  '2#א': `At night—Beit Yosef's view is with one candle, and this is not so—for then he can see when the defect was, whether in the middle of shechitah or at the end of shechitah; rather it deals with one who slaughters in darkness, and truly from the outset it is invalid, but b'dieved kosher as above.`,
  '2#ב': `If it convulsed—even walls of the slaughterhouse full of blood—perhaps it convulsed in the middle of shechitah.`,
  '2#ג': `Behold it is doubtful nevelah; and Tur renders fit when he found walls full of blood; and see Peleti that I wrote from where Tur learned his ruling—see there.`,
});

// --- peleti (2) ---
patchFile('siman_017/peleti/part-001.txt', 'peleti', {
  '1#_': `And to draw out until after shechitah—so R' Yerucham according to Rashi's view; and some later ones questioned, for it is not found thus in Rashi; and the rabbi the Shach showed several places in Rashi that imply life is required after shechitah; and Peri Chadash challenged and wrote that Rashi's intent at end of shechitah is at completion of most of the simanim. And in yielding honor he had extra spirit in this—for these do not imply in Rashi at all; and R' Yerucham wrote in the name of Rashi: we should have troubled ourselves to reconcile Rashi's words that they align intentionally with R' Yerucham's words—and all the more in Rashi it appears explicitly like R' Yerucham in several places; and shall we force that there be contradiction against R' Yerucham? This is not the straight path. And the main point is that in truth we require that at end of shechitah it be certainly alive; and if so, if it convulsed at end of shechitah one cannot narrow—for perhaps the convulsion finished slightly before departure of its soul at slaughter of most simanim; therefore we require convulsion after shechitah so that it be clear that at end of shechitah it was alive—and this is correct. And what is the wonder—behold even at slaughter of the behemah it was still alive, and were it not that the Torah made it as dead, behold it would impart food tumah; and if so behold there is life in it; therefore the Shach's main view.`,
  '2#_': `At night—Tur ruled like R' Eliezer that if he found walls of the slaughterhouse with blood it is kosher; and Beit Yosef wondered why he ruled against the first tanna; and it appears he holds the reason we are concerned in the middle of shechitah is that the blood came then and not at the end. And if so, necessarily most dangerously ill animals are not in presumption of life and do not convulse at time of shechitah—for otherwise why do we not establish the majority and say it certainly leapt from the beginning until the end; it is fine where there is no blood—this is proof that if there were life it would have leapt, though this is strained—for in proof they do not leap; nevertheless there is inconsistency. But to say and forbid even when walls of the slaughterhouse are found full of blood from doubt that perhaps it was in the middle of shechitah—if so you establish dangerously ill as forbidden; how then is it permitted to slaughter it on Yom Tov, as explained in the mishnah that it is permitted to slaughter it—and is this preferable to drying out figs and a bird trampled where we doubt whether it is permitted to slaughter on Yom Tov or not? And this is worse—for behold it is in presumption of nevelah, for it was not clarified through convulsion; and when they come to slaughter it, it is not known whether it convulses or not, and he slaughtered on Yom Tov not according to law—and this is in my humble opinion a great difficulty; and from this Tur proved that the sugya there is halachah like this—that doubt of dangerously ill is to be lenient and to establish it in presumption of permission; and if so they slaughter it—for it will certainly leap and convulse properly; therefore he ruled like him; and in my humble opinion these matters are fitting to state.`,
});

// --- pitchei-teshuva (2) ---
patchFile('siman_017/pitchei-teshuva/part-001.txt', 'pitchei-teshuva', {
  '1#_': `<b>And to draw out until after shechitah.</b> See in Shulchan Melachim who wrote: and it is plain that all the more if the entire convulsion was after shechitah it is fine—see there. And see in Sefer Binat Adam, gate Orach Chaim siman 8, and at end of the gate he wrote that even if also after shechitah it did not convulse immediately but only after it waited about a quarter-hour it began to convulse—there is no concern here to say it is like a lizard's tail that does not die, unlike Zevach Shmuel who wrote to forbid in this; but if one cut all the joints and most of the flesh with them and it did not convulse at time of shechitah but only after one cut all the joints it convulsed—it does not help, for this is certainly like a lizard's tail. And one rabbi disagrees on this, and his view is also to render fit in this—and he returned and wrote to establish his words—see there.`,
  '2#_': `<b>Behold it is doubtful nevelah.</b> [See in Tiferet Shlomo siman 20 who wrote: that which we do not say establish on presumption of life, etc.—this is because there is a presumption opposing presumption of prohibition that it is not slaughtered; and from this we learn that regarding dangerously ill that was slaughtered, one witness is believed for it, even a woman, to say that it convulsed—for there is no presumption of prohibition here—see there.]`,
});

// --- nekudot-hakesef (1) ---
patchFile('siman_017/nekudot-hakesef/part-001.txt', 'nekudot-hakesef', {
  '1#_': `<b>(Siman 17) Hagahah</b> Tur: and likewise if it was stretched and returned it beside it—this is a sign. So ruled Rashba and Ran and Mahariv; and see in Yesh Seder chapter HaShochet siman 19 and in Beit Yosef that such is the main view—not like Rambam and Semag whose words imply specifically in the matter of bending and stretching and again bending; and the Rif and Rosh also hold like Tur and his support—see there and in hagahot of shechitot of Mahariv printed in Hanau, who wrote: one who slaughters a dangerously ill behemah requires that it bend its leg and foreleg and return and stretch, or the reverse, so that it appears there is still life in it lest people say it was nevelah before shechitah—and all this in a small behemah; but in a large behemah it suffices with bending foreleg or hind leg alone—end of his words. And I wondered at the outset at what he wrote "requires that it bend foreleg and leg"—I did not know why I need both; however one may say he speaks disjunctively (or-or). But that he equated foreleg and hind leg that it must return and stretch or the reverse—this certainly is not so, for regarding the hind leg there is no one who disagrees, and even stretching alone helps, and all the more bending alone; and this is explicit in the Gemara and in the hand too it is certainly so for most poskim that bending alone helps. And that he wrote "lest people say it was nevelah," etc.—I wondered why he forbade because of marit ayin lest people say the creatures "it is nevelah"—behold it is certainly nevelah as Rambam wrote and as implied in the Gemara that says: anything that does not do so—it is known its soul was removed beforehand. And that he wrote "but in a large behemah it suffices with bending foreleg or leg"—this too is astonishing, for in a large behemah even stretching foreleg or hind leg alone helps for everyone, as explicit in the Gemara, and there is no disputant in this; and possibly therefore he wrote "lest people say it was nevelah," meaning it is certainly nevelah, but by law it would be permitted in all those cases we stated—and he was more stringent because of marit ayin lest people say so—end.`,
});

// --- kaf-hachayim (3) ---
patchFile('siman_017/kaf-hachayim/part-001.txt', 'kaf-hachayim', {
  '1#_': `<b>(1) [Seif 1] One who slaughters the healthy, etc.</b> But the dangerously ill—and this is anything that they stand up in a shout or with a stick, etc.; but if they stand it up by hand it does not help. Darkei Moshe seif 1; Beit Yosef; Taz s.k. 1; Shach s.k. 1; Knesset HaGedolah in hagahot Tur; Peri Chadash seif 1; Lechem Panim seif 1; Beit Lechem Yehudah seif 1; Shulchan Melachim seif 1; Mishnat Zekenim seif 1; Shomer Petaim seif 1; Biur HaGra seif 1; Chayei Adam general rule 4 seif 8; Kometz seif 1; Zivchei Shalom seif 1; Zivchei Ratzon among the wholehearted seif 4; Zivchei Tzedek seif 1; and he wrote—not like Perishah and HaKereti who rendered fit even when they stand it up by hand, for since most later ones were stringent, we have only the words of the majority.`,
  '2#_': `<b>(2) And if</b> one stood it up by hand—even though afterward it walked nicely four cubits—it did not leave presumption of dangerously ill, for it is easier to go from place to place by itself. Turei Beit Shalom seif 13; Zivchei Ratzon there; Minchat Yosef seif 1. However the rabbi Zivchei Tzedek seif 2 wrote to prove not like Turei Beit Shalom, and wrote that if it did not stand in shout or stick and they stood it by hand and afterward it walked four cubits nicely—it is not dangerously ill; and he wrote they acted thus to render fit—see there.`,
  '3#_': `<b>(3) And if</b> they stand it up in a shout or with a stick and it stands—even if it does not eat at all—behold it is in presumption of health and permitted even if it did not convulse at all. Shulchan Melachim seif 5; Kometz seif 7; Zivchei Ratzon among the tamidim seif 2; Zivchei Tzedek seif 3.`,
});

// --- rabbi-akiva-eiger-yd (1) ---
patchFile('siman_017/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd', {
  '1#_': `(Siman 17 seif 8) <b>What is the pirkus.</b> In the Talmud it is further stated: groaning, and it cast thick dung, or wagging in its ear—behold pirkus. And they wrote in Tur, and so Peri Chadash raised, that such is the main halachah.`,
});

// --- yad-avraham (1) ---
patchFile('siman_017/yad-avraham/part-001.txt', 'yad-avraham', {
  '1#_': `(Siman 17 seif 1) <b>It slaughtered and did not convulse at all, etc.</b> And Be'er HaGolah wrote the wording of Rambam in chapter 4 of Laws of Shechitah. It should say Laws of Ma'achalot Assurot.`,
});

console.log('siman_017 patch complete');
