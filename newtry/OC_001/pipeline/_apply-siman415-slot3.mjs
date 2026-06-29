#!/usr/bin/env node
/** worker slot 3 — siman 415 (eruv techumin l'chatchila for mitzvah) */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_415/mechaber/part-001.txt": {
    "1:main":
      "One may only make eruv techumin for a matter of mitzva. Contains 4 seifim. One may only make eruv techumin for a matter of mitzva — such as when one wished to go to a house of mourning or to a wedding feast, or to greet his teacher, or his companion who came from a journey, and similar cases. {Rama: Or when one wishes to go strolling on Yom Tov or Shabbat in an orchard where there is joy — this is called a matter of mitzva (Tur HaZahav siman 77).} Or out of fear, such as when one wished to flee from idol-worshippers or from bandits and the like. {Rama: And then he is permitted to go even for an optional matter (Tur and Hagahot Maimoniyot chapter Kol Me'arvin).} And if he made eruv for none of these but for optional matters, behold it is an eruv.",
    "2:main":
      "One may not make eruv techumin during bein hashemashot. But if he made eruv, his eruv is an eruv.",
    "3:main":
      'Two people said to him: "go and make eruv for us" — one made eruv for him while it was still day and one made eruv for him during bein hashemashot: the one who made eruv for him while it was still day — his eruv was eaten during bein hashemashot; and the one who made eruv for him during bein hashemashot — his eruv was eaten after nightfall — both acquired eruv. Some disagree.',
    "4:main":
      'When placing eruv techumin one recites the blessing on the mitzva of eruv and says: "through this eruv I shall be permitted to walk from such-and-such place two thousand amot in each direction." If he makes eruv for many he says: "so-and-so and so-and-so shall be permitted," or: "the residents of such-and-such place shall be permitted."',
  },
  "output/siman_415/beer-hagolah/part-001.txt": {
    "1:א": "Eruvin chapter 2.",
    "1:ב": "Mishnah there.",
    "1:ג": "Mishnah there 36.",
    "1:ד": "Rambam in chapter 2 of Hilchot Eruvin.",
    "1:ה": "Mishnah there.",
    "1:ו": "Tur in the name of the Rambam there.",
    "2:א": "Mishnah Shabbat 34, as explained in the Gemara there.",
    "2:ב": "Tur in the name of the Rambam there.",
    "3:א": "Gemara Shabbat 34, and in Eruvin 46.",
    "3:ב": "Rambam there, and so Rashi explained.",
    "3:ג":
      'Per the explanation of Ra"ch that only regarding eruv chatzerot is it so, and likewise is the view of Raosh and Rambam and Rashba.',
    "4:_": "Rambam there and Sefer Ha'itim, and it is agreed from the Geonim.",
  },
  "output/siman_415/baer-heitev/part-001.txt": {
    "1:א":
      "Marriage. But a kohen's daughter to an Israelite am ha'aretz, or a Torah scholar's daughter to an am ha'aretz — it is not mitzva (Gemara Pesachim). And Magen Avraham wrote in siman 479 s.k. 4 that if they say songs and praises it is a seudat mitzva — see there.",
    "1:ב":
      "His companion. Even if he is not a sage. Or that he went out to oversee public affairs. Or that he was outside his city and needs to go to his house (Shulchan Gavoah). And in Maharil he was uncertain whether one may make eruv in order to go to a minyan; and Magen Avraham wrote, and per what Magen Avraham wrote in siman 90 seif 16 it is certainly permitted, and so is implied from what Magen Avraham wrote in siman 311 end of seif 2. And one who makes eruv with his feet may make eruv for an optional matter (Beit Yosef) — see Magen Avraham.",
    "4:_":
      "And he says. And if he did not say, it is not an eruv, as written in siman 416 seif 2, and see siman 366.",
  },
  "output/siman_415/beur-hagra/part-001.txt": {
    "1:א":
      "A wedding feast. Even though an engagement feast is also mitzva, as written in chapter 3 of Pesachim 49a — specifically only for his own betrothal, as explained regarding his father-in-law.",
    "1:ב": "Or his companion. There — and the Rabbanan: sometimes it is pleasing, etc.",
    "1:ג": 'Or when one wishes. Yom Tov 12a, and per Tosafot there s.v. Hagah, etc.',
    "1:ד":
      "And then permitted. Chapter 5 of Yom Tov 40a — one who invited him, they may not bring him, etc.",
    "1:ה":
      "And if he made eruv. Pesachim 49a — and to rest the shevitah of reshus, and as Rashi explained there; and see Tosafot.",
    "2:א": "Seif 2: and if he made eruv. Rashi there from what is below seif 3.",
    "2:ב": "When he places and says. As explained above.",
  },
  "output/siman_415/magen-avraham/part-001.txt": {
    "1:א":
      "And of marriage. But a kohen's daughter to an Israelite (am ha'aretz), or a Torah scholar's daughter to an am ha'aretz — it is not mitzva, as stated in chapter 3 of Pesachim; see there siman 479.",
    "1:ב":
      "Or his companion. And even if he is not a sage (as explained in Tur HaZahav). Or that he went out to oversee public affairs (Tosafot chapter 8). Or that he was outside his city and needs to go to his house (Shulchan Gavoah chapter 8). In Maharil he was uncertain whether one may make eruv in order to go to a minyan; and per what he wrote in siman 90 seif 16 it is certainly permitted, and so is implied from what he wrote in siman 311 end of seif 2. And one who makes eruv with his feet may make eruv for an optional matter (Beit Yosef); see siman 418, see there siman 464.",
    "2:_":
      "His eruv is an eruv. And there are those who disagree — in seif 3 they hold it is invalid since it did not have presumption of validity; see siman 409 seif 6 and in any case.",
    "4:א":
      "He recites blessing, etc. Even though it is lenient that one goes outside the techum, nevertheless it is relevant to say \"and He commanded us not to walk without eruv,\" as in the matter of slaughter.",
    "4:ב":
      "And he says, etc. And if he did not say, it is not an eruv, as written in siman 416 seif 2; see there and see siman 366.",
  },
  "output/siman_415/eliyah-rabbah/part-001.txt": {
    "1:_":
      '[1] [Levush] And it seems to me the reason, etc. And it seems to me more the reason as explained in siman 413 — because techum is supported by a verse. Here is Beit Yosef\'s view specifically with bread, but with his feet one may make eruv even for reshus; and Olat Shabbat elaborated to disagree and did not see that R\' Yehonatan at the beginning of the chapter Keitzad Mishtatfin ruled thus; also hidden from him were Bach\'s words siman 464. Nevertheless for practical law one should be stringent, for so it seems to me from Rabbeinu Yerucham page 100 and Maharil; and in any case for great need one may be lenient. And further, it is difficult for him on those who forbid — what does the Gemara challenge on daf 82: what does it teach us? We learned explicitly: for anyone who will go to the wedding feast — behold, much is taught that even with his feet it is forbidden, for in the Mishnah it deals explicitly with one who did not use his feet, as it says "he places the jugs," etc.; and see what I wrote at the beginning of siman 418.',
    "2:_":
      "[2] Of marriage, etc. In Avodat HaKodesh page 32, and Rabbeinu Yerucham — the same law applies to engagement; and see in Minhagim seif 34.",
    "3:_":
      "[3] Or his companion, etc. Even if he is not a sage (Magen Avraham). And in my humble opinion the essence is as Beit Yosef holds — specifically a sage; and so is implied in Avodat HaKodesh there, and Riaz in Shiltai Gibborim at the beginning of the chapter Keitzad Mishtatfin.",
    "4:_":
      "[4] From the Kutim, etc. Those who distress him, or that he was going to his city and needs to go to his house (Riaz there); and likewise to go to a brit milah or to a minyan (Semak); and likewise to oversee public affairs (Tosafot there); and for redemption of captives, and for testimony of the new moon, and wisdom that comes to a woman in childbirth, and one who comes to save from Kutim — they go out without eruv (Rabbeinu Avraham bar Natan page 70).",
  },
  "output/siman_415/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] One may only make eruv techumin for a matter of mitzva, etc. — and this is specifically with bread; but with his feet one may make eruv even for an optional matter — R\' Yehonatan on the Rif, and so Beit Yosef; and so is the view of Magen Avraham s.k. 12 and in siman 464 s.k. 13; and so Chayei Adam general 87 or 12. However in Sefer Even Ha'ezer he wrote that from Tosafot's words in the chapter Elu Overin (Pesachim daf 49) and Raosh and Ran there it is clear that even with his feet one may not make eruv for an optional matter; and he wrote that so is also in Yerushalmi; therefore they omitted it in Shulchan Aruch — see there; and so Avodat HaRokeach or 1, for so is from Mahari Weil and Maharil; therefore he wrote one should not be lenient except for great need — see there.",
    "2:_":
      "(2) There: of marriage. And likewise of engagement. Pri Etz Chayim and Mahari Weil Avodat HaRokeach or 2, Tosafot Shantz or 3, Ateret Zekeinim or 1. However the Gra wrote that specifically for his own betrothal it is considered a matter of mitzva, as written below siman 464 seif 7 — see there; and nevertheless one may be lenient per the first opinion because many are.",
    "3:_":
      "(3) There, of marriage. But a kohen's daughter to an Israelite am ha'aretz, or a Torah scholar's daughter to an am ha'aretz — it is not mitzva, as stated in Pesachim chapter 3, 1 s.k. 1, Tosafot Shantz or 2; and see in Even Ha'ezer siman 2 seif 8.",
    "4:_":
      "(4) And if — in the marriage of a Torah scholar's daughter to an am ha'aretz they say songs — it is a seudat mitzva (Mordechai chapter 4 of Pesachim 1, siman 479 s.k. 4, Tosafot Shantz in this siman or 2). And what Machatzit HaShekel wrote to reject because he can say songs in his house — or alternatively that there too there is joy for the groom — examine. And see in responsa Chavot Yair siman 70 that he wrote that in our time we do not have am ha'aretz of whom the Sages spoke here, as we do not have am ha'aretz of whom they spoke regarding the six matters in chapter 3 of Pesachim; and see there what he elaborated on the boundary of seudat mitzva — see there.",
  },
  "output/siman_415/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) Of, etc. But, etc. to am ha'aretz, etc. — the words \"to am ha'aretz\" apply also to a kohen's daughter to an Israelite — specifically when he is am ha'aretz; but when he is a Torah scholar, even a kohen's daughter to an Israelite Torah scholar is mitzva; and so is in the Gemara there; and likewise a daughter of am ha'aretz to am ha'aretz — also it is not a seudat reshus. And see responsa Chavot Yair siman 70 that he wrote, and these are his words: and in my humble opinion we do not have am ha'aretz of whom the Sages spoke here, as we do not have am ha'aretz of whom they spoke regarding the six matters in Pesachim chapter 3 — end of his words; and see there that he elaborated on the boundary of seudat mitzva; see what Magen Avraham wrote there siman 479 — meaning that he wrote there that even in the marriage of a Torah scholar's daughter to an am ha'aretz, if they say at the feast songs and praises, it is called seudat mitzva; however in my humble opinion it is that therefore the feast is called seudat mitzva, but one is not permitted to make eruv for this reason and rely on the songs and praises, for songs he can say even in his house, even though the songs are akin to wedding songs; nevertheless he can say other songs in his house, and all of Tehillim.",
    "2:_":
      "(s.k. 2) Or his companion — even if he is not a sage; for some say if he is a sage he is included in the permission of one's teacher, as written: much Torah I learned from my teachers, more from my colleagues. And per what he wrote in siman 90 seif 16 — meaning per one opinion that in order to pray with ten one must go before him four mil and after him one mil — if so it is a great mitzva; and likewise R' Eliezer freed his slave to complete ten.",
    "4:_":
      '(s.k. 4) He recites blessing, etc. — as in the matter of slaughter — meaning we recite blessing on slaughter even though we were not commanded to slaughter; for if he does not wish to eat he need not slaughter; nevertheless we recite blessing since we were commanded not to eat without slaughter.',
  },
  "output/siman_415/biur-halacha/part-001.txt": {
    "2:_":
      "And if he made eruv, his eruv is an eruv — see in Mishna Berurah. And behold per what we wrote above that most poskim hold like those who disagree nearby — therefore here too even b'dieved his eruv is not an eruv; and nevertheless it appears to me if he placed eruv techumin during bein hashemashot of R' Yehuda — for R' Yosi this time is still full day [as on Shabbat 34, see there] — one may be lenient.",
    "3:א":
      "His eruv was eaten during bein hashemashot — I was uncertain whether if it was eaten during bein hashemashot of R' Yehuda, which begins immediately after sunset, it also helps; or specifically during bein hashemashot of R' Yosi, which is after bein hashemashot of R' Yehuda finishes. But I have no doubt regarding one who placed during bein hashemashot whether specifically during bein hashemashot of R' Yehuda or even during bein hashemashot of R' Yosi, which is a very short time before tzeit hakochavim — for certainly it is reasonable that even during bein hashemashot of R' Yosi, which fundamentally the halacha is certainly like R' Yosi against R' Yehuda as the Gemara said [Pesachim daf 2], and we hold until tzeit hakochavim it is day except we are stringent like R' Yehuda regarding Shabbat as the Gemara said the halacha is like R' Yehuda regarding Shabbat — therefore regarding eruv techumin one can certainly rely on R' Yosi's view, as I wrote in my humble opinion.",
    "3:ב":
      'And there are those who disagree — behold from the Mechaber\'s wording it implies that fundamentally he ruled like the first opinion, which is the view of Rashi and Rambam and Ra\'ah who stands in his method and not like Tosafot and Raosh; and in my humble opinion I am uncertain: behold we find nine Rishonim who hold that even b\'dieved his eruv is not an eruv when he made eruv during bein hashemashot — they are Ra"ch and Rabbeinu Tam and Rashba [brought in Tosafot] and Rambam [who wrote explicitly in his novellae that the essence is like Rabbeinu — "go out and make eruv" and he made eruv during bein hashemashot refers only to eruv chatzerot per Ra"ch\'s explanation] and Rashba in his novellae and Raosh [who brought Ra"ch\'s view for practical law as evident from the hints] and Ritva in Eruvin daf 76 and Ran in Shabbat end of chapter 2 and Mordechai in the chapter Kol Me\'arvin — and he should have brought this view as primary and the first view in the name of "some say"; and uncertain for practical law. And know further that per those who are stringent regarding techum for the time of bein hashemashot there is a dispute among the Rabbis whether if his eruv was eaten during bein hashemashot — per Rashba author of Tosafot [in Shabbat 34] if we see that his eruv was eaten during bein hashemashot one cannot apply presumption of validity [for specifically if we have doubt whether it was eaten while it was still day or after dark, or regarding terumah when it became impure — we are lenient that it became impure after dark, for we establish it on its presumption that it was pure until now, or that it stood until now; not so where we see during bein hashemashot that it was ruined — it is as if he placed during bein hashemashot, for we judge that time and presumption of validity does not apply here]; but the view of Rashba in his novellae to Eruvin daf 76 and Ritva there — if his eruv was eaten during bein hashemashot, even for techum we are lenient, for this is comparable to terumah: doubt whether it became impure while it was still day or after dark — see there. And I say to myself that his reasoning is: since we doubt when it was eaten, we rely that certainly the eruv stood until the time it needed to stand by law.',
  },
  "output/siman_415/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Only for a matter of mitzva — and there is a dispute among the poskim: some say this is specifically when he made eruv with bread, but when he makes eruv with his feet it is permitted l'chatchila even for an optional matter, since he sits there by himself and acquires shevitah through his sitting — even for an optional matter it is permitted; and some say there is no distinction between bread and feet — one never makes eruv l'chatchila except for a matter of mitzva. And in a place of need one may be lenient per the first opinion.",
    "1:ב":
      "(2) Of marriage — and likewise an engagement feast or a kinyan feast that is customary to make now, for these too are a seudat mitzva. The marriage of a kohen's daughter to an Israelite am ha'aretz, or a Torah scholar's daughter to an am ha'aretz — is not a seudat mitzva [Gemara]. And in responsa Chavot Yair he wrote that now we do not have am ha'aretz of whom the Sages spoke here [unless it is known they are contemptuous of mitzvot, for they are not better than the am ha'aretz mentioned in the Gemara]; and all the more if she is a daughter of am ha'aretz to am ha'aretz — per all opinions it is a seudat mitzva. However if it is known they will not conduct there according to law and youths and maidens will dance together there — certainly there is no mitzva to make eruv in order to go there and rejoice with them; and see above in siman 338 in Biur Halacha s.v. lehakel. And greater than this the poskim wrote in Even Ha'ezer siman 62 that it is not proper to recite blessing in such a case where the joy is in his home, unless through his going there he can prevent them from this; in such a case certainly it is mitzva to go there.",
    "1:ג":
      "(3) Or his companion — even if he is not a sage, for this is considered mitzva since he came from a journey; and the view of Eliyahu Rabbah is that regarding a companion he deals with a sage.",
    "1:ד":
      "(4) And similar to these — such as when he must go out to oversee public affairs, or to go to a brit milah, or to pray with a minyan; and likewise when he was outside his city and wishes to come to his house to pray on Shabbat and Yom Tov. However for redemption of captives, and wisdom that comes to a woman in childbirth, and one who comes to save from Kutim — they go out even without eruv [Acharonim].",
    "1:ה":
      "(5) In an orchard where there is joy — however it is plain that it deals with permitted joy; but per what is found among idol-worshippers in some places in large towns where they engage in frivolity and mixing of males and females — for this certainly one may not make eruv, for it is called a matter of sin and not a matter of mitzva; and many great ones already cried out against this frivolity. One who guards his soul will distance himself from going there; and on this the am ha'aretz said: fortunate is the man who did not go, etc.",
    "1:ו":
      "(6) From the Kutim — who will distress him or collect money from him. And if there is concern of danger in this, even without eruv it is permitted to flee [Acharonim].",
    "1:ז":
      "(7) And then permitted — this refers to the entire aforementioned seif, and means: since he acquired eruv there because of need of mitzva, he is permitted to walk two thousand amot even for an optional matter.",
    "2:א":
      "(8) Eruv techumin — for eruv chatzerot is permitted l'chatchila during bein hashemashot, as above in siman 261 seif 1; and eruv techumin is more stringent than it, for techum has support from a verse.",
    "2:ב":
      "(9) And if he made eruv, etc. — because the prohibition of techum is d'rabbanan and a doubt is resolved leniently; and nevertheless doubt whether the eruv was placed or not is no worse than this, as explained above in siman 409 seif 6 — see there.",
    "2:ג":
      "(10) His eruv is an eruv — and there are those who disagree; in seif 3 they hold also in this that it is invalid, since the eruv did not have presumption of validity.",
    "3:א":
      '(11) Two people said to him, etc. — this law is mentioned above in siman 393 seif 3, except there it deals with eruv chatzerot, and here it teaches us that for eruv techumin too the law is thus. And there are those who disagree; they hold that specifically for eruv chatzerot they were lenient in this, but not for eruv techumin — and he does not acquire eruv except specifically the first one, because we establish the eruv on its presumption, and certainly it stood until the time it needed to stand; but not the second who placed during bein hashemashot, for presumption does not apply here. And see in Biur Halacha what we wrote that most Rishonim hold this view.',
    "3:ב":
      "(12) Both acquired eruv — for regarding each one we take the lenient view because it is a d'rabbanan matter; and see above in siman 393 seif 3 in Mishna Berurah and Biur Halacha in what we wrote there.",
    "4:א":
      "(13) He recites blessing, etc. — even though if he does not wish to go outside two thousand amot he does not need eruv, nevertheless it is relevant to say \"and He commanded us not to walk without eruv,\" as in the matter of slaughter where one recites blessing on it even though he is not obligated to eat meat.",
    "4:ב":
      "(14) On the mitzva of eruv — and if he did not recite blessing it does not prevent.",
    "4:ג":
      '(15) And he says "through this eruv," etc. — and if he did not say, it is not an eruv (Magen Avraham). However if he said "let this be for eruv" it helps b\'dieved [Chayei Adam]. And all this is when he made eruv with bread; but if he made eruv with his feet, intention alone suffices when he went there [Peri Megadim].',
    "4:ד":
      '(16) To walk — in Levush the text is "to walk tomorrow," and so it is above in siman 409 seif 7. And if he makes eruv for all the Shabbatot of the year he says "for all the Shabbatot of the year."',
    "4:ה":
      "(17) Such-and-such — meaning from this place, for he says it at the time he places it.",
  },
  "output/siman_415/netiv-chayim/part-001.txt": {
    "1:_":
      '(Magen Avraham s.k. 5) And if he did not say, it is an eruv, as he wrote — so it should read.',
  },
};

const PREFLIGHT = [
  /\bLord'?s Prayer\b/i,
  /\bHashem'?s Word\b/i,
  /\bHashem\b/i,
  /\bstrike in\b/i,
  /\bCapernaum\b/i,
  /&quot;/,
  /\bthere in the\b/i,
  /\bAccording to the\b/i,
  /\bin me\b/i,
  /\bDarbanan\b/i,
  /\bhand recoils\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bShield of Abraham\b/i,
  /\bSaturday\b/i,
  /\bher age\b/i,
  /\bthe craft\b/i,
  /\bBrian\b/i,
  /\bG-d\b/i,
];

let total = 0;
const risks = [];
const missing = [];

for (const [rel, blockFixes] of Object.entries(fixes)) {
  const file = rel.replace(/\//g, "\\");
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (!blockFixes[key]) {
      missing.push({ file, key });
    }
  }
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        const en = blockFixes[key];
        for (const re of PREFLIGHT) {
          if (re.test(en)) {
            risks.push({ file, key, pattern: re.source });
          }
        }
        if (en.length < 8 && !/^[\(\)\d\s\-–—.:,'"]+$/.test(en)) {
          risks.push({ file, key, pattern: "short_en" });
        }
        return { ...b, en };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out + (raw.endsWith("\n") ? "\n" : ""));
  console.log(file, n, "/", blocks.length);
  total += n;
}

console.log("TOTAL", total);
if (missing.length) {
  console.log("MISSING_KEYS", JSON.stringify(missing, null, 2));
}
if (risks.length) {
  console.log("PREFLIGHT_RISKS", JSON.stringify(risks, null, 2));
} else {
  console.log("PREFLIGHT_RISKS none");
}
