#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixesByFile = {
  "beur-hagra/part-001.txt": {
    "5:ג": `Or if he intended etc.—per Aruch's explanation beshesh means liften as written he eats spice etc.—meaning a matter requiring liften, and he said this does not require liften; and since he does not intend to eat with liften he need not wait for liften—so it is. And Aruch wrote: there is no judgment etc.—he eats spice without salt—its translation: as one who does not eat anything in six without salt—meaning twenty-four that are eaten with bread in six is its name; and in mishnah language liften; and in rabbinic language they call it beshesh; and further in Eretz Yisrael they put mallow in a pot with eggs and pepper and cook it and call it tavshil beshesh. Explanation 1—the blesser need not be ashamed and return for liften but blesses immediately because there is salt in it. Explanation 2—because it is beautiful bread and needs neither salt nor liften—end of his words. And Hagahot Maimoniot wrote that R' Chananel's explanation too is per Aruch; and see Tur and what he wrote or if it is etc.—for the reason is since it is not eaten without salt and liften, that he not interrupt between blessing and eating, he must wait for them; and per explanation above he eats etc.; and corresponding to this he said seasoned and it is liften; or etc. against salt; therefore Rambam wrote or if he intended etc.—the reason is because of interruption as said; and one can uphold Rambam's words also per Rashi's explanation.`,
    "11:ט": `At one table etc.—this requires study: what he wrote from them that establishment helps with sitting alone as above, and so the precision he infers from Tur siman 174 is only sitting alone; and Tosafot 43a and so too seif 12 if they were etc.; and it seems a typo and continuation of language above, and so Bach did not write it; and not like Magen Avraham.`,
    "12:ג": `Since etc.—as written establishment requires they say let us go etc.; and further they sit in one place is implied; and he wrote and they eat scattered—and this is another reason that two are required as written at the beginning and they said we shall eat etc.; and perhaps from this he inferred in Shulchan Aruch in earlier book and wrote unless etc.—and it is not necessary except that they not be scattered and establish together; establishment of place for us is not less than for them as explained.`,
    "13:א": `Seif 13: where etc.—that two in zimmun are like without reclining, and as Tosafot 46a wrote if as explained there they say two only conclude etc. and b'dieved he says they fulfill; for we hold mitzvah to divide; and so from challenge what does he teach us etc.; and in Rekanati he wrote in name of Riaz that so is R' Chananel's view but not Rosh's view; and so Rashi holds like Rosh that they do not fulfill since they did not establish; and per their view one must distinguish between without establishment and place where they do not zimmun; and nevertheless Rokeach and Shulchan Aruch HaRav are primary; and so for berachah on fruits—even though there is no zimmun on fruits, only l'chatchila forbidden—see siman 213.`,
    "13:ב": `If etc.—47a and halachah etc.; and same for motzi as written 46a the cutter blesses; and Tosafot there on lo etc.; and so in all berachot as written 43a from what mishnah teaches etc.`,
    "14:ב": `And if there is etc.—there 46a.`,
    "17:_": `Seif 17: the cutter etc.—as explained in Tosafot cited and Yerushalmi chapter 6 there teaches: the blesser extends his hand first unless he wished to give honor to his teacher or one greater than him in Torah—the permission is in his hand; Rav when he was cutting would taste with his left and divide with his right 40a per first explanation in Tosafot on slice of cutting; and so entire passage there on slice of cutting—for there it says afterward R' Huna etc. no interruption of berachah etc.; and so before that it said those reclining forbidden to taste anything etc.; and Tosafot brought as explained; and also 40 from there that permitted to divide before eating as explained 296 in Hagahah—from what Rav etc. from measure of piety that they need not wait for him as commentator wrote there; and also 40 unlike Sherira; and also 40 from there on slice of cutting if he comes to give honor etc.; and with this is resolved Sherira's difficulty who wrote and so nearby etc.; and so Rambam explained, see there.`,
    "20:א": `Seif 20: even etc.—from what is written ibaya lehu etc. and as explained only berachat hana'ain etc.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "2:_": `[2] [Levush] that it is a way of honor etc.—and from this reason I heard one should not cut bread from which part burned until it is unfit to eat; and if there is no other whole loaf, better to cut from the burnt part though it is not a way of honor; but I found in responsum of Shaar Ephraim that as long as the burnt part was not cut off it is called whole bread for lechem mishneh, see there. And if challah was taken from whole bread its law is like a slice; and I extended to prove this in responsum at end of my Eliyahu Zuta with deep analysis of what was attacked at end of Sullam LaMinchah—unnecessary to respond for inquirer. Magen Avraham wrote and in our bread he cuts above—until here; and it seems it refers when ash stuck below, and so Bach implies. And it seems it refers to a slice—for on whole he cuts around it; nevertheless on slice too one may cut thus; and that one does not cut from whole place like gluska siman 168 seif 3—Magen Avraham answered there because in any case it appears as a slice, see there; nevertheless good to do so wrote Rashal and Bach and meticulous ones mark with knife before berachah until here his words—meaning on Shabbat and Yom Tov; and so wrote Torat Chaim there we require remnants be recognizable at time of berachah. Maharil wrote laws of meal he practiced every erev Shabbat and erev Yom Tov to make fine flour cake to cut on it; and since it was thin he did not need prior cutting; but he places fingers on it and second thumb etc.`,
    "3:_": `[3] [Levush] we are concerned lest it slip etc.—and so Tosafot and Mordekhai wrote; but in Teshuvot 322 I found another reason because when cutting crumbs fall and it is not whole—until here; and see below siman 168 seif 2.`,
    "4:_": `[4] [Levush] for scripture is written etc.—and R' David Abudraham answered; and further there it is impossible to fix another way; and further mixing letter after tzerei or segol is not like mixing letter after kamatz which expands more. He wrote in halachot of Maharan: one who gives space between bread and min haaretz is assured he will not be harmed in that meal. R' David Abudraham: motzi lechem meant sustenance as making bread—for bread does not come from earth but grain from which bread is made; and so you find in manna I will rain for you lechem though bread did not descend—until here. But in Tolodot Yitzchak parashat Behar he wrote they bless hamotzi because in future He will bring forth bread as explained end of Ketubot that Eretz Yisrael brings forth gluskaot. And with this is settled that they say lechem min haaretz and not min haadamah—for eretz hints Eretz Yisrael; and from this Bach wrote they say hamotzi which implies also future—to hint on future to come. And this is Talmud's explanation from a person's berachot it is recognizable if he is talmid chacham—examine; and see in my Divrei Eliyahu Tehillim 104:14 I explained what he wrote there intending this. R' David Abudraham answered on that they did not fix lechem min haadamah for scripture's language they fixed; and Kolbo wrote it is as if he brought forth bread for there is no disqualification in grain of wheat—even bran is fit with it even mixed for so the poor eats.`,
    "5:_": `[5] Both his hands etc.—and if he has a sleeve he must remove it. Shelah wrote: intend in berachat hashulchan more than other berachot for food and drink bring a person to coarseness and haughtiness; therefore he must reflect so his heart be drawn to desire of Hashem blessed be He and not to desire of food and drink. Maharil wrote Shabbat laws: always when he mentioned Hashem in berachat hamotzi he raised bread with both hands upward until he finished mentioning Hashem and lowered as at first; on weekday he raised bread and on Shabbat both.`,
    "7:_": `[7] In idle words—and same law if he blessed another berachah per RaaM siman 4. I found in Baal Halachot Gedolot daf 10: if he answered amen after himself it is like speaking idle words. He wrote in Sefer Berachat Avraham: if he interrupted and did not speak at all he need not return and bless; and see below siman 206 note 4. Olat Tamid—this is his language. Shelah wrote he must eat before speaking for measure of olive—for less than olive is not considered eating; and also if he put slice of motzi in mouth and chews he must not speak until he swallows; and if he transgressed and spoke before swallowing he need not return and bless—until here. I checked Shelah daf 81 and found only latter part; and so Magen Avraham brought and his view inclines even to return and bless; and so I found in Berachat Avraham daf 173 he wrote plainly one blesses only on completion of matter which is swallowing after chewing—until here. From this somewhat difficult on Shelah there that he is doubtful; but beginning that must eat olive measure before speak I did not find; also Maharil's words I brought above contradict this; and behold we hold siman 168 seif 9 that on less than olive too we bless hamotzi; and reason of berachat hana'ain—and less than olive too is benefit and does not require olive measure—except where we bless on eating like eating matzah.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "2:_": `(2) There in the place where it baked well—in Derech Eretz Rabbah chapter 6 it teaches one should not spread hamotzi from soft place but from hard place—end quote; and Bach brought it; and so halachot.`,
    "3:_": `(3) Nevertheless an elder who cannot eat from hard place cuts from soft place—Leket Yosher there. Some say in Hagahot Tashbetz. Bayit Chadash there. And if this elder is host or greatest at meal he cuts for all from soft place per honor.`,
    "6:_": `(6) There and he shall cut a little etc.—one should cut opposite where it cracked because from that side baking began and dough was pushed until it cracked opposite—Darkei Moshe note 1 in name of Abudraham.`,
    "7:_": `(7) There and he shall cut a slice etc.—Tur wrote some do not want to cut bread at all before berachah so it be whole at berachah; and impossible—Rosh wrote one cuts slice before berachah so not interrupt between berachah and eating; and on Shabbat one cuts ring and leaves middle attached and cuts piece from below opposite above.`,
    "9:_": `(9) There and he shall cut slice of cutting—meaning l'chatchila to be careful even of slight interruption; but b'dieved obviously not considered interruption at all since it is like take bless.`,
    "11:_": `(11) There that if he holds the slice etc.—Maharil on weekday cut ring-like and left middle attached and cut piece from below opposite above; on Shabbat cut whole slice.`,
    "18:_": `(18) There until after berachah etc.—meticulous ones mark with knife before berachah—Bach in name of Rashal, Taz; Magen Avraham siman 274 note 1, Eshel Avraham note 2; nevertheless on Shabbat and Yom Tov one cuts before berachah per Torat Chaim and Maharil.`,
    "20:_": `(20) He wrote as customary in Hagahot Tashbetz note 6: how many pieces must one cut for hamotzi—its mnemonic heh chatichot—five pieces on Shabbat night corresponding to five words in...`,
  },
  "machatzit-hashekel/part-001.txt": {
    "2:ד": `And see siman 168 note 3 that on slice need not cut at whole side—see there note 5.`,
    "2:ה": `Maharil etc. and two joints etc. and spread also below to above—so there.`,
    "8:א": `(note 8) Hamotzi etc.—Rabbi Yosef wrote there are texts etc.—in Gemara 38a: Tannaim hamotzi lechem min haaretz, R' Nechemiah said motzi etc.; Rava said in motzi all agree it implies past—see there.`,
    "8:ג": `And so in Eruvin 19a R' Levi said sinners of nations even at entrance of Gehinnom do not repent—from verse and they went out and saw corpses of men who rebelled etc.`,
    "8:ח": `And in Chokhmat Shlomo he wrote in name of Yerushalmi etc.—Yerushalmi challenges Beit Shammai: he should have said on wine that He created fruit of vine; and answer: specifically wine renews each year and fire does not renew each year etc.`,
  },
  "magen-avraham/part-001.txt": {
    "6:ד": `But afterward it is not etc.—and that he must wait until they bring salt before each one as written note 65—that is l'chatchila for l'chatchila they too are forbidden to interrupt; and if he brought salt for motzi's slice, for meal needs it is not interruption as explained.`,
  },
  "mishnah-berurah/part-001.txt": {
    "18:ב": `(89) If he was a mourner—and on Shabbat the mourner distributes as usual so it not be public mourning if he gives in his hand.`,
    "20:ב": `(95) Even though he does not taste—and same when he already fulfilled eating matzah and already made kiddush on wine; and the reason in all this is berachat kiddush and eating kezayit matzah are from obligatory mitzvot that are obligation on the person; and automatically all enter in this into areivut as explained; and same on first and second nights of Sukkot when he is liable to eat kezayit bread in sukkah—he can take others out even though he does not taste himself.`,
    "20:ג": `(96) Whether of daytime bread—for its essence was instituted only for mitzvah and not for pleasure; and therefore this berachah is among other berachot of mitzvot—for we hold even though he fulfilled motzi.`,
  },
  "peri-megadim/part-001.txt": {
    "10:_": `It is not Taz—to exclude from nusach in Rambam chapter 4 halachah 2 and Mishnah Berurah who blesses hamotzi—Eshel Avraham; and distinction from kal vachomer berachot 35 etc.; and Magen Avraham 7 that in this text what baruchu teaches etc.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "13:_": `Melech, Master, etc.—and see Bach siman 165 that implies if he blessed anyway on bread he did not fulfill; and so Beit Yehudah siman 41; and Baruch Yitzchak wrote view of Bach and Taz.`,
  },
};

const base = "output/siman_167";
let total = 0;
for (const [rel, fixes] of Object.entries(fixesByFile)) {
  const fp = path.join(base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (fixes[key]) {
        total++;
        return { ...b, en: fixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
}
console.log("fixed", total, "blocks");
