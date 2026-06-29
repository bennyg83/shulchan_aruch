#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "1:_": `Said in any language—I found why no peh in birkat hamazon—for all who bless birkat hamazon with intent nothing controls him not af nor foam nor wrath; all careful in birkat hamazon his food available honor all days (Chinuch and book named Gan); see Sefer Chasidim siman 46 story one man see there.`,
  },
  "baer-heitev/part-001.txt": {
    "2:_": `With his lips—but if thought in heart did not fulfill—appears if from illness or other ones called in heart fulfilled like baal keri Magen Avraham; found why no peh in birkat hamazon—all who bless birkat hamazon with intent nothing controls not af foam wrath; food available honor all days Chinuch Ateret Zekenim careful bless in book not aloud Bach; Sefer Chasidim story one died revealed dream relative judged daily not careful bless all blessings with heart intent see there Eliyah Rabbah.`,
    "4:_": `Birkat hamazon—see siman 199 s.1; l'chatchila bless before comes to that see Magen Avraham.`,
    "5:_": `Drunk—see Taz and Yad Aharon.`,
  },
  "beer-hagolah/part-001.txt": {
    "1:_": `Sotah 32.`,
    "2:א": `Berakhot 15.`,
    "2:ב": `Per Rashi and per Rabbenu Yonah there and Rosh.`,
    "3:_": `Kol Bo there.`,
    "4:_": `Tur in name Yerushalmi ch. 1 Terumot.`,
    "5:_": `Eruvin 64.`,
  },
  "beur-hagra/part-001.txt": {
    "1:_": `Seif 1 birkat hamazon etc.—Tosafot Berakhot 13a s.v. and Chachamim etc.; also R' Yehudah himself there 15a does not hold like Rabbi; also plain mishnah Sotah 32a like Rabbanan; Rosh there.`,
    "2:א": `Seif 2 must etc.—Gemara there conclusion even R' Yehudah b'dieved no; there one does not bless birkat hamazon; Rashi s.v. in heart etc.`,
    "2:ב": `And if not etc.—there and if blessed fulfilled; there Rosh halacha etc. R' Yoshiah halacha etc. R' Yosef dispute etc.`,
    "2:ג": `And provided etc.—see there Tosafot 2b s.v. Rav Chisda and Rosh there.`,
    "3:_": `Seif 3 there is who etc.—Magen Avraham.`,
    "4:_": `Seif 4 even etc.—Tosafot there 41b s.v. from here etc.`,
    "5:_": `Seif 5 if etc.—Tosafot Eruvin 67a s.v. drunk etc.`,
  },
  "biur-halacha/part-001.txt": {
    "3:_": `There is who says etc.—see Magen Avraham challenged plain matter why wrote some say; correct as Birkei Yosef and Nehar Shalom this some say holds Rashi can fulfill even if do not understand language; proved from Kol Bo source of this law; Mechaber wrote some say because main law holds like other poskim stringent as below siman 193 s.1; nevertheless copied because anyway better than not bless at all fulfills per this view; see Taz there s.k.2.`,
    "5:א": `If blessed and feces before him etc.—see Mishna Berurah from Levush; appears if knew initially and transgressed would not be uncertain since transgressed initially brazenly Torah prohibition certainly returns; only truly accidental did not know feces here sinned negligent did not check—uncertain perhaps Gemara only tefillah stricter not birkat hamazon; Peri Megadim above siman 76 interprets this literally even if knew initially uncertain; Tosafot and Ramban Likkutim also uncertain if found feces later; perhaps Peri Megadim since Mechaber stam implies uncertain all cases because Gemara tefillah stricter even found later recorded uncertainty birkat hamazon too—but always uncertain birkat hamazon all cases requires study; Chayei Adam klal 3 Nishmat Adam letter zayin expanded—holds even knew initially need not return birkat hamazon—appears like Peri Megadim uncertainty all cases rule lenient b'dieved; reason not Torah doubt for Torah all cases b'dieved fulfilled even transgressed Torah only rabbinic penalty tefillah; see there expanded lighter than other mitzvah through sin—in my view not clear on contrary stricter since clear to all not only shema forbidden speak Torah in filthy place—all holy matters as Rambam ch. 3 Laws Shema halacha 4 Ramban Likkutim; if transgressed and spoke included despising word of God Berakhot 24b—how say b'dieved fulfilled blessing must bless God on food; proof brought Shulchan Aruch siman 76 if read place should suspect feces must return; siman 185 Tosafot Rosh uncertain return—wonder on difficulty Tosafot brought proof birkat hamazon lenient from tefillah lenient regarding drunk; shema not lenient siman 199 s.1 especially Gra text Yerushalmi rules drunk forbidden shema; moreover Ramban Likkutim expanded Tosafot doubt found later feces where blessed birkat hamazon ruled must return even if knew initially transgressed intentionally now wants return from regret certainly require return bless—many Acharonim stringent on Tosafot Rosh doubt especially Ramban holds like them especially knew initially transgressed intentionally—all return bless.`,
    "5:ב": `Or was drunk etc.—see Mishna Berurah what wrote Acharonim conclusion; Ramban Likkutim also concludes main law permitted drunk all blessings except tefillah because like standing before king; proof Yerushalmi as Magen Avraham; Biur HaGra siman 199 implies even per Yerushalmi not clear permitted—for he explained Chizkiya whether read or bless is to be stringent disputes Chizkiya mother who lenient earlier birkat hamazon [Ramban Likkutim explains opposite Chizkiya lenient even shema see there]; nevertheless possible Gra admits b'dieved if became drunk bless birkat hamazon as Rav Asi permits earlier as Magen Avraham and Acharonim.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `(1) In any language etc.—Rokeach wrote all letters in birkat hamazon except peh feh—to inform no foam wrath controls meal when bless birkat hamazon with intent merits roses around Eden stream; Chinuch all careful birkat hamazon food honor all days; Sefer Chasidim siman 46 story one died revealed dream relative judged daily not careful hamotzi birkat hamazon fruit blessings with heart intent said for your pleasure intended these—no judgment wicked but twelve months passed said not judged harshly like first twelve.`,
    "2:_": `(2) [Levush] thought etc.—appears if illness or other ones called in heart fulfilled like baal keri Magen Avraham; more learn from shema siman 62 see siman 101.`,
    "3:_": `(3) Aloud etc.—if not expert birkat hamazon; if expert need not loud Lechem Chamudos Acharonim; Rosh Chochmah implies always loud—voice awakens intent reminds Rosh Chodesh Shabbat mention event; quietly forgets all.`,
    "4:_": `(4) Before him etc.—Mlebushi Yom Tov on Shulchan Aruch wrote or drunk fine since omitted Tosafot Rosh chapter Hader; seif 4 above their words chapter Ein Omdin as Lechem Chamudos; I clarified Eliyah Rabbah yod siman 1 s.8 Tosafot words do not contradict Shulchan Aruch Rama true descended depth see there at length; on question wondered there raised for law if reached Lot's drunkenness forbidden all blessings; if not reached if can speak before king though cannot speak properly permitted birkat hamazon; if cannot speak before king at all permitted other blessings birkat hamazon doubt; also raised Rama siman 199 law shema like tefillah means drunk forbidden l'chatchila shema not like King's delicacies; Rama wrote other blessings can bless—precisely other blessings not shema blessing law like shema itself.`,
    "5:_": `(5) [Levush] drunk in tefillah etc.—Olat Tamid challenged Levush if so other blessings also doubt per Rama siman 199 drunk can bless other blessings; words wondrous—for Tosafot Eruvin 64 s.v. drunk clear doubt other blessings like birkat hamazon; Rosh Mordechai Agudah so; also wrote appears sufficient must return bless for birkat hamazon Torah doubt stringent; also like doubt lack knowledge not included in doubt—end; in my view not like lack knowledge specifically broken wave siman 53 expert distinguish before wheat; here all doubts satisfy sages so; for law Bach siman 199 ruled must return bless like shema tefillah if say Tosafot Mordechai; implies explicitly birkat hamazon and other blessings; Nachalat Tzvi Olat Tamid there.`,
  },
  "eshel-avraham/part-001.txt": {
    "1:_": `Said—that we do not bless Who sanctified us in His commandments commanded bless birkat hamazon see responsa Yoreh Deah siman 53.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [Seif 1] birkat hamazon in any language—for written you shall eat be satisfied etc. any language you bless Sotah 33a Tur Beit Yosef; specifically understands language as siman 62 letter gimel; when does not know Hebrew; knowing mitzvah preferred Hebrew Bach siman 193; Ari wrote intentions in text as Shem HaMeforash Parshat Ekev Rashash—only in fixed Hebrew order some below siman 187 s.14; wrote above many times Acharonim even without Ari intent must that text and order God arranges proper intent; therefore not lenient except one who does not know Hebrew; who knows must Hebrew—from this know how great mitzvah birkat hamazon careful letters not missing any especially divine names.`,
    "2:_": `(2) Bach wrote why no feh (plain peh) in birkat hamazon—all who bless birkat hamazon with intent nothing controls not af foam wrath; Chinuch Parshat Ekev wrote all careful birkat hamazon food honor all days also Sefer Shem Gan; Sefer Chasidim siman 46 man died early years after twelve months revealed relative dream asked how there said daily judged not careful birkat hamazon fruit blessings heart intent said for your pleasure intended these—wicked judgment only twelve months passed more than twelve said not judged harshly like first twelve Bach custom Hagahot Tur letter alef Taz letter alef Acharonim letter alef; see our words siman 183 letter lamed siman 5 letters alef bet hei study.`,
    "3:_": `(3) There birkat hamazon etc.—we do not bless on it hamotzi to bless on food like other mitzvot—for if needed bless on blessing say Who sanctified us to bless then need third on second Who sanctified us in commandments commanded bless blessing on blessing endlessly; therefore no blessing on any blessing in world Beit David siman 83; appears reason blessing gives praise God Who privileged us this mitzvah—only on mitzvah that is not blessing; mitzvah that is itself blessing not applicable; therefore no blessing on it.`,
    "4:_": `(4) [Seif 2] if did not hear fulfilled—same below siman 206 s.3 Levush Acharonim; Charedim wrote not fulfilled Birkei Yosef letter bet Yoreh Deah letter dalet Shaarei Tefillah letter alef; for law as Shulchan Aruch Acharonim b'dieved fulfilled.`,
    "5:א": `(5) There provided speaks lips—if only thought heart not fulfilled Beit Yosef Rashi R' Yehudah Rosh Tur; Bach all poskim except Rambam ch. 1 Berakhot Semag hold fulfilled Tur not Shulchan Aruch so ruled Orach Torah s.k.1 Magen Avraham letter alef Eshel Avraham letter alef; Peri Chadash Sefer Mayim Chayim brought Zechor LeAvraham letter bet Raz letter gimel Darkei Chaim letter alef.`,
    "5:ב": `(5) wrote Magen Avraham in place of doubt if doubt blessed or not good think blessings in heart—fulfills at least Rambam Semag; no concern blessing in vain since not with lips; wrote so Gra klal 1 s.63 Sefer Ginat Veradim siman 23 Eshel Avraham there; Birkei Yosef siman 62; wrote above siman 127 letter yod many poskim; proof Ari arranged names pray forbidden say aloud yet effect above by intent alone—permits forbidden aloud in thought and effect above; same doubt blessings though forbidden aloud Torah doubt permitted in thought and effect if obligated; see above siman 174 letter mem study.`,
  },
  "machatzit-hashekel/part-001.txt": {
    "1:א": `(s.k. 1) provided not fulfilled—light thought not like speech as siman 62; see Magen Avraham siman 101; appears like baal keri—we taught Berakhot 20b baal keri before Ezra enactment forbidden prayer Torah study; therefore on food bless after not before—Gemara reason after is birkat hamazon Torah; blessing before only rabbinic therefore not permitted before.`,
    "1:ב": `Explained there Targum Yonatan blesses after by thought forbidden articulate lips; therefore difficulty one who says thought not speech—what did Sages accomplish enact thought birkat hamazon; nevertheless even if not like speech nevertheless fulfills when ones and cannot speak mouth.`,
    "1:ג": `Same bring proof Magen Avraham siman 62 if ones illness called shema in heart fulfilled—only Magen Avraham wanted proof birkat hamazon established from birkat hamazon itself.`,
    "1:ד": `Peri Chadash above siman 62 if ones passed still time read shema must read articulate; same here if ones passed food not digested must return bless birkat hamazon articulate even if at time of ones blessed by thought.`,
    "2:א": `(s.k. 2) There is etc.—requires study Rabbi Yehudah way not found only one posek though no disputant; language some say—Rabbi Yehudah only Kol Bo; only new law new reasoning unlike here obvious matter.`,
    "2:ב": `And wrote there meaning if hearer does not understand nevertheless fulfills; Peri Chadash Shelah wrote even individual bless birkat hamazon aloud—voice awakens intent not forget if time causes mention mid-blessing e.g. Shabbat wanted yaaleh v'yavo Peri Chadash brought Acharonim.`,
    "3:א": `(s.k. 3) cannot speak etc.—can speak to God; Taz challenged one who cannot speak properly cannot speak before king; Chokhmat Shlomo when mind clear only tongue heavy like drunk must speak slowly speaking before king not manner speak quickly; therefore can speak before king; speaking with friend not manner speak slowly—properly called cannot speak properly now correct.`,
    "3:ב": `Tosafot chapter Hader Eruvin 64a s.v. drunk Torah level; since uncertain must bless from doubt.`,
    "3:ג": `As siman 199 Rama wrote other blessings can bless though drunk—from Mordechai Gemara wrote reason without us not intend properly.`,
  },
  "magen-avraham/part-001.txt": {
    "2:_": `Provided speaks—but if thought heart not fulfilled; appears if illness or other ones called heart fulfilled like baal keri.`,
    "3:_": `There is who etc.—requires study why wrote some say—plain since do not know bless must fulfill through his blessing as siman 193 see there.`,
    "4:_": `Cannot speak—nevertheless can speak before king else Rabbi Yehudah forbids l'chatchila as siman 65 even b'dieved doubt; Tosafot chapter Hader same all blessings; hints chapter Hader doubt if may bless l'chatchila drunk cannot speak before king; hints chapter Onein somewhat plain permitted l'chatchila; therefore l'chatchila bless before becomes so; if happened became drunk nevertheless bless Torah level; plain Yerushalmi implies bless; Zohar Terumot 273; all the more today without intent as siman 199.`,
  },
};

const base = "output/siman_185";
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
