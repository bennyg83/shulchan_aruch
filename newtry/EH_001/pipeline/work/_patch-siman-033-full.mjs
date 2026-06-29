#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

let n = 0;
const p = (rel, slug, T) => { n += patchFile(rel, slug, T); };

p("siman_033/mechaber/part-001.txt", "mechaber", {
  "1#main": `How a woman is betrothed through intercourse. It contains 2 seifim.

Through intercourse how? He said to her before two witnesses "Behold you are betrothed to me through this intercourse" and he secluded with her in their presence — she is betrothed, even though it is brazen (whether he came upon her in the normal manner or not) (Tur). And her status is only like a betrothed woman and not like a married woman.

{Rama: And some say specifically when he came upon her in her father-in-law's house; but if he brought her into his house and came upon her, or he had already betrothed her and came upon her — her status is like a married woman. Some say that an unattached man who comes upon an unattached woman before witnesses — we are concerned that perhaps he intended for betrothal (Mordechai chapter HaOmer), for the presumption is that a man does not make his intercourse intercourse of prostitution; but if he is already presumed toward prostitution or he has another wife — we are not concerned (Terumat HaDeshen siman 209). And some are lenient in every matter — see below siman 149 and 167 seif 2 and above siman 15 seif 10.}`,
  "2#main": `One who betroths through intercourse — his intent applies at completion of intercourse; therefore if before he completed she accepted kiddushin from another she is betrothed to the second. But if he aroused in her and withdrew immediately, or if he said from the outset that his intent is to acquire through arousal — he acquires immediately.`,
});

p("siman_033/baer-hetev/part-001.txt", "baer-hetev", {
  "2#_": `Intercourse. Except for a yevamah — even if he said his intent is at completion of intercourse he acquires through arousal. And intercourse after kiddushin acquires through arousal. Intercourse of an unwitting man does not acquire a woman — Ri'iv (Beit Yosef in this siman).`,
});

p("siman_033/beer-hagolah/part-001.txt", "beer-hagolah", {
  "1#א": `Mishnah at beginning of Kiddushin.`,
  "1#ב": `From words of Rambam chapter 3 Laws of Marriage — from that which they said "they are witnesses of seclusion, they are witnesses of intercourse" — Gittin 81b.`,
  "1#ג": `There 12b.`,
  "1#ד": `And likewise Rambam from implication of the Gemara Kiddushin 9b.`,
  "1#ה": `Question there 10a, and Abaye and Rava sought to resolve it and the Gemara rejected them; and Rosh wrote in name of Ramban that the halakhah is like them even though the Gemara rejected them — for the plain meaning of the mishnah is like them, as R' Yochanan and Ravina rejected the baraita like R' Yochanan ben Bag Bag brought there 9b.`,
  "2#א": `Statement of Amemar in name of Rava there 10a.`,
  "2#ב": `Tur from words of his father Rosh there in his rulings — a woman is acquired through arousal — Yevamot 53b; and likewise here in chapter 3, for such is the view of Beit HaGadol and so is the main view of Rambam and such is the main point.`,
});

p("siman_033/beit-meir/part-001.txt", "beit-meir", {
  "1#_": `{Hagahah} Or he had already betrothed her, etc. — so explained siman 55 seif 1 in Shulchan Aruch — see there. Some say, etc. that perhaps he intended — see Beit Shmuel; meaning as explained there that the main reason is that even if they intended it is as though she was betrothed without witnesses, unlike here through the presumption that a man does not make his intercourse prostitution — the Gemara immediately applies to him.`,
});

p("siman_033/beit-shmuel/part-001.txt", "beit-shmuel", {
  "1#א": `He said to her before two witnesses. The same applies before one witness if they do not contradict him — per those who are concerned for betrothal before one witness as written siman 42.`,
  "1#ב": `And he secluded with her. And if they were engaged in the matter of betrothal the declaration is not needed — so wrote Chelkat Mechokek; and possibly it is even weaker since the witnesses do not see the intercourse.`,
  "1#ג": `That he came upon her. And intercourse of an unwitting man does not acquire a woman except for a yevamah — Ri'iv; see Tosafot Yevamot 9.`,
  "1#ד": `He brought her into his house. Then kiddushin and nissuin come as one; or he had already betrothed her — he came upon her, meaning in her father-in-law's house he acquires her and they do not strike him lashes since he came upon her for marriage — Ran.`,
  "1#ה": `That perhaps he intended. Even per what is written siman 26 — even if both intended for betrothal, if they did not say explicitly that he betroths her it is not kiddushin; nevertheless here per those who hold a man does not make his intercourse prostitution it is as though he said.`,
  "2#_": `His intent is at completion of intercourse. Except for a yevamah — even if he said his intent is at completion of intercourse he acquires through arousal. And intercourse after kiddushin acquires through arousal. See siman 55 and siman 61 and in Rambam chapter 10 and Nimmukei Yosef chapter HaIsh.`,
});

p("siman_033/beur-hagra/part-001.txt", "beur-hagra", {
  "1#א": `Before all and he secluded, etc. Kiddushin 65a.`,
  "1#ב": `Whether, etc. 9b.`,
  "1#ג": `And her status is only, etc. And the entire sugya there 9b you find such as "he came," etc.; see Rashi there s.v. shelo keDarkah and we read in it "for," etc.; and if it were so nevertheless she is married — see there.`,
  "1#ד": `And some say specifically, etc. From what is written Kesubos 73a "lest for two reasons," etc.; and Rashi there s.v. ella, etc.; but regarding, etc.; but otherwise she has a ketubah — difficult: a betrothed woman has no ketubah; and there the mishnah teaches "he brought her in," etc.; and Ran explained it discusses such a case where he brought her into his house — see siman 55 seif 6.`,
  "1#ה": `Or he betrothed, etc. Tosafot Kiddushin 10a s.v. kol and Ran Gaon, etc.; and so wrote Rif and as written siman 55 seif 1; and Ran there; and specifically for marriage but for prostitution not: there and with this is resolved what is written Yevamot 58a such as he came upon her, etc.; and likewise evident from the body of the sugya.`,
  "1#ו": `Some say, etc. See above siman 15 and siman 26.`,
  "2#_": `But if, etc. or, etc. Tosafot there in Kiddushin and Yevamot 55b s.v. eshet, etc.`,
});

p("siman_033/chokhmat-shlomo/part-001.txt", "chokhmat-shlomo", {
  "1#_": `Seif 1 — through intercourse how, etc. NB see in the Gemara first chapter of Kiddushin 10 regarding the question of intercourse of marriage — and in Tosafot s.v. veChayavin alav and in Maharsha there; and see what is written on all this and in Tosafot 4 s.v. zevuni on this and in Pilpul HaSugya Sanhedrin 69 whether we follow.`,
  "2#_": `Seif 2 — one who betroths through intercourse, etc. NB behold regarding the law whether forbidden intercourse acquires or not — it now appears to me there is clear proof that it acquires, from what is written first chapter of Kiddushin (4b) in Tosafot s.v. meIkara that the law is challenged that she exits at six and jubilee and signs — rather he prefers to establish, etc.; examine well.`,
});

p("siman_033/pitchei-teshuva/part-001.txt", "pitchei-teshuva", {
  "1#_": `Whether not in the normal manner. See in Sha'arei HaMelekh chapter 1 Laws of Marriage where he discusses this law (and what he challenged there how she is betrothed through intercourse not in the normal manner since we require that he betroth her with something from which she has benefit — and what is the reason one who betroths with benefit prohibitions is not betrothed — and if so intercourse not in the normal manner from which she has no benefit, etc. — see there).`,
  "2#_": `For the presumption is that a man, etc. See below siman 149 s.k. 2 regarding if she was a niddah; and see in Avnei Meluim s.k. 1.`,
});

console.log(`siman_033: ${n} blocks patched`);
