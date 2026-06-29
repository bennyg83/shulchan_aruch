#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "mechaber/part-001.txt": {
    "1:main": `Whether women and minors are obligated in birkat hamazon. And in it 2 seifim: Women are obligated in birkat hamazon; and it is a doubt whether they are obligated d'oraisa and discharge men, or whether they are not obligated except d'rabbanan and do not discharge except one whose obligation is only d'rabbanan [and see below siman 199 regarding their zimmun].`,
    "2:main": `A minor is obligated d'rabbanan in order to educate him; and that which a son blesses for his father is when the father did not eat to satiation, for his obligation is only d'rabbanan.`,
  },
  "ateret-zekenim/part-001.txt": {
    "1:_": `Except for one whose obligation is only d'rabbanan; and some say one who did not eat can bless and discharge one who ate (Tur in name Semak who wrote in name R' Yitzchak); and one should not challenge what the Gemara said to discharge the many until he eats a kezayit of grain—for that is the reason so he can say let us bless Who fed us; so Tosafot explained; but to discharge his fellow without zimmun he need not a kezayit since he does not bless Who fed us (so Maharshal); Tur wrote on him not clear except until he eats a kezayit—it appears Tur's words are primary since we find explicitly in Yerushalmi we require a kezayit even without zimmun; whence do we know our Talmud disputes it—perhaps Yerushalmi too admits no eating required since it says all Israel are guarantors for one another and therefore can exempt even one who ate to satiation; but d'rabbanan always requires eating a kezayit and our Talmud too does not dispute [Maharshal].`,
  },
  "baer-heitev/part-001.txt": {
    "1:_": `And doubt. See Yad Aharon who expanded.`,
    "2:_": `To satiation. And even if the son too did not eat to satiation—for there are two d'rabbanan obligations—nevertheless he discharges his father, as end of Pesachim; Tosafot end ch. 2 Megillah dispute; so Agudah; and it implies there specifically regarding Megillah the law is so; and see siman 689; and obvious a minor does not discharge a woman. Magen Avraham.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:_": `Berakhot 20—it is a question and was not resolved; per Rambam and Rosh.`,
    "2:_": `Gemara there.`,
  },
  "beur-hagra/part-001.txt": {
    "1:א": `Seif 1 women. Mishnah 20b.`,
    "1:ב": `And doubt, etc. Gemara there.`,
    "1:ג": `Except, etc. There Tosefta, etc., and woman, etc., as written in seif 2.`,
    "2:_": `Seif 2 and that which a son, etc. Ran in end ch. 1 Kiddushin wrote that even in such a case he does not bless—for the obligation is not cast upon him even d'rabbanan, only upon his father; proof from that he does not recite shema though only d'rabbanan; therefore a blind person recites shema even per R' Yehudah since it says all who did not see, etc.; and what is written a son blesses, etc., refers to an adult; and that establishment in ch. 3 Berakhot is because of a woman—and must say he does not have that reading and according to your reasoning, etc.; and wrote there that although we conclude in ch. Eiruvin that whoever has a Torah root does not discharge others, all who are obligated only d'rabbanan refers to matzah which in Temple times was d'oraisa—if so now too all rabbinic enactments, etc., unlike a matter that is always d'rabbanan—end.`,
  },
  "biur-halacha/part-001.txt": {
    "1:א": `And discharge the men—meaning for example if they said covenant and Torah; and even though they need not say per what is written in siman 187 s.3 in Hagahah.`,
    "1:ב": `Or if they are not obligated, etc.—the same applies to a slave [Rambam]; and see in Rashba's novellae.`,
    "1:ג": `Only d'rabbanan—see Mishna Berurah regarding a woman who was uncertain if she blessed; and know that although Shulchan Aruch implies he relied on Rambam, Rosh, Rif, Riaz and supporters that women in birkat hamazon—it is a doubt whether they are obligated d'oraisa; and because it is a question unresolved in Talmud—nevertheless it is not so clear; and many great Rishonim hold they are obligated certainly d'oraisa; see Behag who omitted the entire sugya and copied only what is said at the head of the sugya obvious from the first teacher teaches us see there—apparently he holds it is d'oraisa; and so proven in Rif see there well; and as Ramban already noted in Milchamot; and so Rav Hai Gaon brought there in Milchamot; and he brought there in name of some Geonim see there; and Ramban agreed there himself; and so Raavad; and Rashba agreed to this; and so Ritva [called Rashba] Sukkah 38; and so Ran there; therefore it appears to me one who relies on Shaarei Efraim and other Acharonim who require a woman to return and bless did not lose—for without that the opinion of the aforementioned Rishonim is she is certainly obligated d'oraisa.`,
  },
  "chokhmat-shlomo/part-001.txt": {
    "1:_": `Seif 1: Women are obligated, etc., and discharge the men, etc. Note: behold what one discharges his fellow—whether from agency or from guarantorship—see responsum Laws Bekhor siman 320 [in my composition Turei Zahav on Yoreh Deah 47 siman 143] what I wrote proof it is from agency; and I proved a minor is included in guarantorship see there incidentally with God's help; and understand well.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `(1) [Levush] And women since they did not take, etc. And Kohanim and Levites are different—for in any case forty-eight cities were given them and it fits well Who gave you, so Acharonim wrote; but in Tosafot Berakhot daf 20 they conclude this is a wonder that stands; therefore they explained the doubt is because of covenant and Torah; also according to this it was difficult why Kohanim bring bikkurim and do not read.`,
    "2:_": `(2) [Levush] From the power of guarantorship, etc. So Levush wrote further at end of siman 193; and so in Tosafot and Rosh and poskim; and above siman 184 wrote the reason since they relied on the verse, etc., and it can be settled.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [Seif 1] And it is a doubt, etc.—per Rashba and Raavad they are obligated d'oraisa; per R' Yonah d'rabbanan; but Rosh wrote it is a question unresolved therefore women do not discharge others; and so Rambam ch. 5 Laws Berakhot as explained in Beit Yosef; and so ruled here in Shulchan Aruch; and so Levush; and so Acharonim; however b'dieved if she blessed for men they fulfilled. Rishon LeTziyon on Berakhot daf 5a, may his merit shield, letter bet.`,
    "2:_": `(2) There and doubt, etc.—the same regarding slaves there is a doubt for they are similar from the outset. Maamar Mordechai letter 2; Raz letter 1; and an uncircumcised one whose brothers died from circumcision is also a doubt—Avnei Nezer letter 1; and see below siman 199 s.6.`,
  },
  "levushei-serad/part-001.txt": {
    "1:_": `Magen Avraham s.k.1 and women. This is Rashi's explanation; but Tosafot explained because of covenant and Torah.`,
    "2:_": `There—from themselves unless a daughter inherits.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:א": `(s.k. 1) And doubt, etc.—Rashi wrote the reason as Magen Avraham wrote because women did not take a portion in the land; Tosafot wondered if so also regarding Kohanim and Levites for they did not take a portion in the land; therefore Tosafot explained since we say if he did not say covenant and Torah in birkat hamazon he did not fulfill; and women cannot say covenant and Torah as siman 187 seif 3; and perhaps their obligation is only d'rabbanan.`,
    "1:ב": `From themselves—meaning certainly we find women too took a portion in the land like daughters of Tzelofchad; but what they took they did not take from themselves but were daughters who inherit and took their father's portion.`,
    "1:ג": `But, etc.—cities of refuge, etc.; and with this Magen Avraham settles the wonder of Tosafot above—why was it not asked regarding Kohanim and Levites for they are certainly obligated from the Torah.`,
    "1:ד": `Not as Shach wrote that per Rashi the same—there is doubt regarding Kohanim and Levites whether d'oraisa; and see in responsa Shaarei Efraim and Mishna Lemelekh.`,
  },
  "magen-avraham/part-001.txt": {
    "1:א": `And doubt if they are. For it is written upon the good land and women had no portion in the land from themselves; but Kohanim and Levites had cities of refuge in Hagahot Alfasi; and so in Kol Bo not as Shach; siman 187 s.3; and thus Zohar Terumah page 298 that women are exempt from birkat hamazon to remove from them the obligation of the hand—for they have no Torah and covenant in them—end; and this is Tosafot's explanation.`,
    "1:ב": `And siman 199. Therefore they do not discharge others [Tur].`,
    "2:_": `To satiation. And even if the son too did not eat to satiation—for there are two d'rabbanan—nevertheless he discharges his father as end of Pesachim; Tosafot end ch. 2 Megillah dispute; so Agudah; and it implies there specifically regarding Megillah; and see siman 689; and obvious a minor does not discharge a woman.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:א": `(1) If they are obligated d'oraisa—for it is a positive time-bound commandment.`,
    "1:ב": `(2) Only d'rabbanan—for it is written upon the good land and women have no portion in the land from themselves (unless a daughter inherits); unlike Kohanim and Levites—for although they have no portion, nevertheless they have cities of refuge; and some say because covenant and Torah were not given to them.`,
    "1:ג": `(3) Except for one who has no, etc.—such as one who did not eat to satiation whose obligation is only d'rabbanan; and Tur concludes that because of doubt we hold women do not discharge others who ate to satiation [Magen Avraham]; and so Rambam ch. 5 Laws Berakhot. Shaagat Aryeh wrote a woman who ate to satiation and was uncertain if she blessed—must bless see there his reason; and Chayei Adam and Magen Giborim agreed; but in novellae R' Akiva Eiger and Birkei Yosef ruled she need not return and bless; and so sides Peri Megadim; nevertheless it appears one who wants to rely on Shaagat Aryeh and supporters—we do not protest; see Biur Halacha.`,
    "2:א": `(4) A minor is obligated d'rabbanan—meaning even if he only ate a kezayit he is obligated d'rabbanan to educate him.`,
    "2:ב": `(5) And that which a son, etc.—meaning that which is in the Gemara that a minor son blesses and discharges his father in birkat hamazon when he does not know how to bless.`,
    "2:ג": `(6) When the father did not eat to satiation—but if the father ate to satiation and is obligated from the Torah, a minor son who is obligated only d'rabbanan cannot discharge him; Acharonim wrote a minor does not discharge a woman—for perhaps she is obligated d'oraisa.`,
    "2:ד": `(7) For his obligation is only, etc.—and if the son too did not eat to satiation—for there are two d'rabbanan regarding him—if he discharges his father there are opinions among poskim; and one should be stringent.`,
  },
  "peri-megadim/part-001.txt": {
    "1:א": `Only d'rabbanan. Taz brought s.v. Berakhot 20b s.v. women; and so converts and slaves discharge the many; and Magen Avraham letter 1 wrote there further brought Tur's words, etc. Behold Rosh Hashanah 29a: whoever is obligated in a matter discharges the many; and although he fulfilled he discharges others who benefit; Rashi explained not to benefit and not to bless—and there is no guarantorship; Beit Yosef wrote this regarding the first blessing; but in birkat hamazon since he already ate he is obligated and there is guarantorship; therefore not specifically birkat hamazon—the same final blessing of the three or Birkat Nehenin is obligatory; see Rosh Berakhot 20a and Machatzit Hashekel—it appears the reason forbidden to benefit without blessing—it is not fit that one who did not benefit bless and discharge one who benefits; and final blessing perhaps this reason. Therefore even per Tur who wrote in birkat hamazon even without zimmun—one who did not eat discharges one who ate d'rabbanan since he relies on the verse; and blessing Who fed will bless—behold Birkat Nehenin and kind of three can discharge final blessing d'rabbanan; siman 213 in Magen Avraham 7 first blessing—even b'dieved they did not fulfill for his blessing was in vain unless he was mistaken see there on this.`,
    "1:ב": `Levush, may his light shine, in siman 184 s.6 wrote one who ate a kezayit discharges one who ate to satiation since they relied on the verse; and we wrote there that all rabbinic matters their law is Torah except they agreed in their doubt leniently; and honor of creatures overrides Torah, etc.; unlike where they relied on a verse—they want it to be actual Torah law; therefore discharges kezayit for one who ate to satiation; and do not say rabbinic does not discharge Torah; therefore one who ate a kezayit and doubts if he blessed—for himself he blesses—not as Magen Avraham siman 184 8; but here wrote that therefore discharges one who ate a kezayit from guarantorship; and R' Akiva Eiger 2; requires study see there in opening I will arouse more on this.`,
    "1:ג": `Question: Before him were seven species and other species and he does not know from which he ate—or bread and pat haba'ah b'kisnin—what is the law?`,
    "1:ד": `Answer: In brief—strengthen from occurrence as doubtful guilt offering; and doubt nevertheless stringent; and a woman does not discharge him unlike if not established for Rambam d'rabbanan and she discharges; however kind of three is a doubt; and with bread it is envisioned; and doubtful guilt offering—even if recognizable he brings doubtful guilt offering; and they gave in Shulchan Aruch general 11 we wrote from this.`,
    "1:ה": `In the name of the amazing Torah scholar, leader of the community Papada, may he live long, our teacher Rabbi Mori Cohen, may his light shine. And this is his language in his writings on Yevamot daf 62a: Rav said all agree regarding a slave who has no lineage for it is written dwell with you the nation the donkey (Genesis)—the nation similar to a donkey; Rashi explained Eliezer servant of Abraham. One can challenge—for in Chumash parashat Vayera he took his two lads with him; Rashi explained Yishmael and Eliezer; if so they are those lads Avraham told dwell here with the donkey; and for Yishmael certainly he had lineage for not from daughters of Canaan and was son of Abraham. Without Rashi I would say many slaves to Abraham besides Eliezer certainly and he took another slave with Eliezer; per Rashi it is difficult; requires study end. I mentioned his name with the book for I knew that man—God-fearing from many; may his soul be bound in life, amen. Behold truly it implies in commentators the convert converted Abraham; and parashat Lech lecha son to Abraham and he called the name of his son who was born—so the question is enormous; one can say Rashi fixed Eliezer is the word nation is a drash and refers only to Eliezer alone; and we find plural language called to an individual as honor of master of land; and Eliezer was important in house of Abraham.`,
  },
  "rabbi-akiva-eiger/part-001.txt": {
    "1:_": `Seif 1: And they do not discharge except one who has no obligation. And if a man who ate to satiation is uncertain if he blessed birkat hamazon—it can be said a woman who discharges him is a double doubt—perhaps he already blessed; and if you say he did not bless—perhaps women are obligated in birkat hamazon d'oraisa and he fulfills through them; and so a woman uncertain if she blessed birkat hamazon—it can be said she need not bless—for regarding d'oraisa it is a double doubt if obligated and doubtful if blessed; and regarding d'rabbanan the doubt is if she blessed—a rabbinic doubt; see Yoreh Deah siman 83.`,
    "2:_": `Seif 2: A minor is obligated d'rabbanan. I was uncertain regarding one who ate on the last day of the fourteenth year at evening before night and at beginning of night when he became an adult—the food not yet digested—whether he is obligated d'oraisa to bless. And if we say he is d'oraisa—it can be said if he blessed before night—for when it darkened he must return and bless since at the time he blessed he was not obligated d'oraisa to bless—he cannot exempt a d'oraisa obligation. See Magen Avraham siman 267 s.k.1 s.v. and requires study see there. Afterward my son-in-law Rav Shmuel showed me similarly was uncertain in Chochmat Adam whether one ate while an onen and was buried truly before food digested—whether must bless. One can distinguish—for there obligation extends from beginning of eating until after digestion; except while occupied in mitzvah—namely during aninut exempt from blessing. This can be said immediately when mitzvah finished must perform his mitzvah of birkat hamazon; but here at time of eating the person himself is not subject to obligation—it can be said never became obligated d'oraisa; requires study for halacha.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "1:_": `And doubt. See Tashbetz part 1 simanim 168–169 at length; and see Ramban's novellae what he wrote on the reason converts and Kohanim discharge others in birkat hamazon though they did not take a portion in the land; and see Birkei Yosef what he wrote to settle difficulties of language of the poskim; and see Kafot Tamarim daf 34; and responsa She'ilat Yaavetz siman 54 see there; and Birkei Yosef wrote they did not mention Ramban's proof from Rav Chisda son of Rav see there—and meaning Rav Chisda was a Kohen as found in several places.`,
  },
  "turei-zahav/part-001.txt": {
    "1:_": `Only d'rabbanan. And even though this is not a positive time-bound commandment and women are obligated—Tosafot explained in Birkat Hamazon there is covenant and Torah and this does not apply to women. Tur wrote and thus: I saw in Semak who wrote in name R' Yitzchak on one who did not eat can bless to discharge one who ate; and it appears to me we say to discharge his fellow until he eats a kezayit and Yerushalmi relies on the verse—end; Beit Yosef wondered—for it is clear in Tosafot and Rosh from law of guarantorship he can discharge others even if he did not eat at all like all mitzvot one obligated though fulfilled discharges except blessing of enjoyment; and birkat hamazon is among the mitzvot and does not require kezayit of grain only that he can say Who fed us; and our teacher Tur did not descend to depth of matters like Beit Yosef; and it is a wonder what depth is here—for in Semak itself it is clear there in Hagahah as Beit Yosef in name Tosafot; and so Rosh—end; plainly Tur knew this only he challenged that it does not imply in Gemara that said to discharge requires kezayit bread—it implies because he wants to discharge not so he can say Who fed us; and so Yerushalmi relies on verse you shall eat and be satisfied and bless—one who did not eat should not bless—it implies the blessing body one does not bless for his fellow; if so this is not in category of guarantorship at all; Rosh brought also R' Yitzchak's words only concluded on this perhaps meaning d'rabbanan cannot discharge and the verse is mere support; but Semak permitted entirely even d'rabbanan—end; Tur disagreed with him; and there are no depths of matters at all; and Tur's words are correct for halacha.`,
  },
};

const base = "output/siman_186";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
