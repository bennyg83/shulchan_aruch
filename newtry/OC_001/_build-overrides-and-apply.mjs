import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "./oc001_block_lib.mjs";
import { autoFix } from "./pipeline/_slot18-lib.mjs";
import { plainFromHtml } from "./pipeline/lib/quality-checks.mjs";

const OC_ROOT = path.dirname(fileURLToPath(import.meta.url));

const GOOGLE =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=iw&tl=en&dt=t";

async function translateHe(text) {
  const parts = [];
  for (let i = 0; i < text.length; i += 1200) {
    const slice = text.slice(i, i + 1200);
    const q = encodeURIComponent(slice);
    const res = await fetch(`${GOOGLE}&q=${q}`);
    if (!res.ok) throw new Error(`google ${res.status}`);
    const data = await res.json();
    parts.push((data[0] || []).map((x) => x[0]).join(""));
    await new Promise((r) => setTimeout(r, 350));
  }
  return parts.join(" ");
}

export const OVERRIDES = {
  "501|rabbi-akiva-eiger|7|_": `Seif 7 in the gloss: even on the second day of Rosh Hashanah. It puzzles me why this is mentioned regarding Rosh Hashanah of Yom Tov. If we come to be stricter on Rosh Hashanah more than other Yom Tov, this is because Rosh Hashanah is one sanctity. And in any case it is permitted here as on the day itself he prepared. And an egg born that day is forbidden — see Magen Avraham siman 477 regarding second day of Rosh Hashanah or second day chol, or one sanctity — see there. And here in any case what is stringent about hides is only from one sanctity.`,

  "502|rabbi-akiva-eiger|4|_": `Seif 4: in new pots. See above siman 503 seif 3 and Magen Avraham there.`,

  "514|rabbi-akiva-eiger|5|_": `Seif 5: It is forbidden to light a candle that is lit for a dead person for seven days — see Mishbetzot Zahav above siman 532 at end of seif. To allow lighting by a non-Jew and the candle will be on Yom Tov in a room where they do not eat.`,

  "518|rabbi-akiva-eiger|2|_": `Seif 2 in the gloss: through a non-Jew — see above siman 532 seif 1 in the gloss and Magen Avraham there.`,

  "531|rabbi-akiva-eiger|4|_": `Seif 4: And those who shave. And mourning for his father and mother when the time of grief arrived in Chol HaMoed — see Knesset HaGedolah, responsa Noda B'Yehudah, responsa Shevet Yom Tov, Chayei Adam siman 12.`,

  "531|rabbi-akiva-eiger|8|_": `Seif 8: And there is no concern regarding shaving. And likewise all washing is permitted.`,

  "533|rabbi-akiva-eiger|3|_": `Seif 3: It is permitted to buy. This is the first answer of the Rosh in Pesachim — that part of the land was deshaira and fish should taste damatakhli by itzla deshani maziya dalikha pasida. But merchandise is a loss — therefore forbidden to buy. But to buy them is merchandise and permitted. But the other answer of the Rosh is that only through buying and selling is it permitted, for there is no melacha and no tircha. But salting fish is melacha and tircha — therefore forbidden to buy and salt. Therefore the Tur should have ruled leniently. It appears the Rambam holds like the Rosh's first answer; see Magen Avraham note 16 and Rosh at end of Pesachim.`,

  "537|rabbi-akiva-eiger|7|_": `Seif 7: From tree to tree. Rashi and Tur: in the field of the owner. And the Hagah Melech writes in the name of Ri'etz Giat: in the field of a field-worker. And in Beit Yosef he brought Ri'u's words: close like the way of planting from tree to tree four amot per se'ah — but not far. And likewise in Yerushalmi. And in Biur HaGra he brought Ri'u's words that close means like the way of planting — see there.`,

  "538|rabbi-akiva-eiger|6|_": `Seif 6: We do not fine him after. It is possible if his father did not do the melacha — the law is he should not do so to "levar bevaro" — but if he already did, the law is dempeirotim — it is possible if he died, the son does not inherit and is not better than another, since it already became hefker. And for the Mechaber's intent if it is a lost item he need not fine if his father did the melacha — if so, even if his father did, the son is not liable after him.`,

  "539|rabbi-akiva-eiger|11|_": `Seif 11 in the gloss: and it is permitted to buy. In Tur it is written: permitted to prepare means a duffle in the hands of dalai b's workshop such as cooking and the like is permitted.`,

  "539|rabbi-akiva-eiger|5|_": `Seif 5: As mitzil from his hand. See Yoreh De'ah siman 148 seif 1 and Shach there.`,

  "551|rabbi-akiva-eiger|9|_": `Seif 9: Such as for a sick person. In responsa Shevet Yom Tov ch. 1 siman 107: to be lenient for a niddah who is slightly ill.`,

  "552|rabbi-akiva-eiger|7|_": `Seif 7: On land. And Maharikash wrote: one must change a place where he is accustomed to eat. Tosafot Taanit 41a and Levush siman 599 seif 1. See there.`,

  "554|rabbi-akiva-eiger|22|_": `Seif 22: Permitted through a non-Jew. And public building is forbidden even through a non-Jew [R' Akiva Eiger in the name of Shakh Knesset HaGedolah] — it is not clear.`,

  "559|rabbi-akiva-eiger|9|_": `Seif 9: And is not supplementary. And also for one who is slightly ill and a pregnant woman who has slight discomfort — they are permitted to eat on Yom Tov.`,

  "560|rabbi-akiva-eiger|2|_": `Seif 2 in the gloss: and there are places that practiced to break. And likewise Tosafot Berachot 31a.`,

  "561|rabbi-akiva-eiger|3|_": `Seif 3: And if he tore on Jerusalem apparently this is obvious — also cities of Judah that he already tore on one of the cities of Judah, he does not return and tear when he sees the rest of the cities of Judah. And he proved this from Sefer Ta'avat La'ayinayim. And if he tore on Jerusalem first, he need not tear at all on the rest of the cities of Judah, and even in additions he does not tear. And according to the Mechaber's wording if he tore on Jerusalem first, he need not tear at all on the rest of the cities of Judah.`,

  "561|rabbi-akiva-eiger|4|_": `Seif 4: Until he finds his heart. Per Rambam and Tur — this is the words of Ramban on Shabbat 20b that every tearing is a tefach — the Shulchan Aruch contradicts.`,

  "565|chokhmat-shlomo|5|_": `Seif 5: An individual may not say the thirteen attributes. See in Rosh Pesachim ch. 3 what he explained from the Yerushalmi — he holds like R' Yehuda. And the Yerushalmi's reason: monetary. And therefore here the law is that even for d'oraisa we rely on sefek sefeka all the more so for d'rabbanan.`,

  "566|rabbi-akiva-eiger|6|_": `Seif 6: And if the kohen did not fast. If in synagogue the kohen and levi did not fast and they called the kohen and afterward remembered they did not fast — if they follow him, the levi should not follow him; if they call another levi who did not fast, or an Israelite who fasts, he answers. I wrote in a responsum.`,

  "570|rabbi-akiva-eiger|3|_": `Seif 3: On one who swore and ate. In responsa Rashba siman 214: possible to say d'oraisa prohibition of fasting on Shabbat; Maggid Mishneh Laws of Yom Tov ch. 4: even on Yom Tov of Shabbat and Yom Tov of Yom Tov — one sanctity. If so, even on the night of the second Yom Tov he will not eat it since he needs it for the night of the second Yom Tov. Maggid Mishneh: one who swears not to eat on Shabbat is exempt from fasting on Shabbat; on Yom Tov it is forbidden to roast on Yom Tov since he needs it for the night of the second Yom Tov — see there.`,

  "582|rabbi-akiva-eiger|5|_": `Seif 5 in the gloss: only finished the blessing when he mentioned Hashem's name — see below siman 682 seif 1.`,

  "585|chokhmat-shlomo|2|_": `Seif 2: One who kindles should bless on the rightmost candle. See in my compositions on Orach Chayim year 5644 daf 17a for proof from the right. And see Magen Avraham siman 671 s.k. 17.`,

  "586|rabbi-akiva-eiger|12|_": `Seif 12 in the gloss: and the same law applies. See Shulchan Aruch below siman 695 seif 9.`,

  "586|rabbi-akiva-eiger|21|_": `Seif 21: But it does not ascend. See Beer HaGolah Levush siman 475 letter 1.`,

  "590|chokhmat-shlomo|4|_": `Seif 4: Three shevarim and teruah need not be in one breath. The reason poskim wrote in his name: groaning and wailing cannot be done in one breath. It appears to me the reason is not from reasoning alone before R' Eliezer's doubt in the Gemara — if so, even for R' Eliezer who permits by reasoning alone, groaning and wailing are different and the Gemara only challenged R' Yehuda.`,

  "591|rabbi-akiva-eiger|4|_": `Seif 4: And ten of shofar in every blessing. And one says: hears the sound of rejoicing with His people Israel today in mercy. On Shabbat do not say today. And in the Garden of Eden one says: hears a remembrance of rejoicing with His people Israel.`,

  "607|rabbi-akiva-eiger|3|_": `Seif 3 in the gloss: but we have sinned. In Shelah Darla it is written: the wording in his eyes is correct, but we and our fathers have sinned.`,

  "610|rabbi-akiva-eiger|4|_": `Seif 4 in the gloss: they are accustomed not to wear gold on Yom Tov. And there are places that drill and do not wear gold on behalf of not importing a prosecutor — see there.`,

  "612|rabbi-akiva-eiger|6|_": `Seif 6: Foods that are not fit for eating. See siman 567 in Magen Avraham.`,

  "612|rabbi-akiva-eiger|9|_": `Seif 9: Less than a revi'it. We were most of the revi'it — see above siman 471 seif 3.`,

  "616|rabbi-akiva-eiger|2|_": `Seif 2: A healthy minor. See responsa Taz on Har HaChayyim siman 111.`,

  "619|chokhmat-shlomo|2|_": `Seif 2: On Yom Kippur and the day after they say Shema Yisrael aloud. See in my compositions on Orach Chayim year 5644 I brought explicit proof from Midrash Tanhuma on Vayechi.`,

  "622|chokhmat-shlomo|2|_": `Seif 2: And they read three sections — Re'eh, you shall say, and on the day of your joy. See Taz on why we complete Shofarot verses with the verse and on the day of your joy. The third haftarah is Jonah — poskim agree the custom is to uphold it.`,

  "624|chokhmat-shlomo|5|_": `Seif 5 in the gloss: some are stringent to observe two days of Yom Kippur. See in my compositions on Orach Chayim year 5644 daf 102b what I wrote regarding R' Shaul Rapaport and Rashi on Rosh Hashanah 21a.`,

  "629|chokhmat-shlomo|6|_": `Seif 6: In a mat of reeds and straw. See Yeshuot Yaakov who doubts whether to thatch with this in our times in Spain — see there.`,

  "629|rabbi-akiva-eiger|12|_": `Seif 12: Their law is like invalid sechach and they disqualify. In my humble opinion only to be stringent — for if they are invalid sechach, since they receive tumah and join to invalidate, and since they are thin like invalid sechach, they are muktzeh and do not join to invalidate in d'rabbanan as in siman 632 seif 3. And proof: when they are placed in a sukkah, even if not for sechach, they are forbidden to benefit from — see Magen Avraham. And when invalid, all the more so. And when placed for sechach, even if not for sechach, they are forbidden to benefit from — see Taz. And when not for sechach, if they are not placed for sechach, they are permitted to use for need of the sukkah.`,

  "629|rabbi-akiva-eiger|6|_": `Seif 6 in the gloss: that is, the majority of the city. Not like Tur who wrote: the majority of the city makes a sukkah for sechach. And when made for sechach, even if the majority does not make for sechach, since he intends for sechach, it is permitted.`,

  "629|shaarei-teshuvah|16|_": `Seif 16 in Shulchan Aruch: It is not proper to make a sukkah from bundles of wood called fashini in Spain. They tie them so they dry quickly and place them on the fire and reduce effort gathering them one by one. And there is not twenty-five reeds in each bundle per Magen Avraham. One may permit in rabbinic law since there is no melacha concern — see there.`,

  "630|rabbi-akiva-eiger|3|_": `Seif 3: He had two walls. See responsa Rama ch. 2 siman 4.`,

  "630|shaarei-teshuvah|10|_": `Seif 10 in Shulchan Aruch: It is not proper to make a sukkah from sheets. If one cannot make with reeds, one may be lenient per Taz and others; see there.`,

  "631|rabbi-akiva-eiger|5|_": `Seif 5: The language of the Rambam: in the air between the upper and lower reed. And in the name of Ri'etz Giat: also in the air between the upper and lower reed. If there is reed width above, it is sufficient in the air between the lower reeds even if not in the upper — see there. The Rambam implies if placement accomplishes the mitzvah, extinguishing is not required — see Magen Avraham.`,

  "631|rabbi-akiva-eiger|9|_": `Seif 9: That the boards are not four amot wide. Ri'etz Giat in Machloket Menachot: boards not four amot wide are not considered independent; Ramban: halacha follows R' Meir that schach must be independent. If so, when cutting wheat found white flour, certainly forbidden even before Pesach — see there.`,

  "633|yad-ephraim|9|_": `Seif 9: If its heat is greater than its cold, it is invalid even b'dieved unlike some poskim — see Ritva.`,

  "634|rabbi-akiva-eiger|3|_": `Seif 3: And we reduce it. See Beit Yosef siman 506 seif 3: the reason is since it is forbidden to take all seven days; if not separated, it is forbidden to take on Yom Tov. If separated, permitted. And in Mishbetzot Zahav: reason for prohibition on Yom Tov is muktzeh from Shabbat — see there.`,

  "639|rabbi-akiva-eiger|7|_": `Seif 7: Rain on Yom Tov. In Tzelach Berachot 39: wait until rain stops then eat more than a kezayit in the sukkah and bless. If he sees rain while eating, he returns and eats more than a kezayit and bless — see there.`,

  "640|rabbi-akiva-eiger|4|_": `Seif 4: If there is great trouble. And he is distressed at all. And in Levush: even if he is distressed at all, it is permitted to go to his friend's sukkah.`,

  "643|chokhmat-shlomo|3|_": `Seif 3 in the gloss: invalid even in pressing need and even if there is an opinion that permits — see Taz, Magen Avraham, Chayei Adam, Kaf HaChayyim. In our countries they practice thus.`,

  "646|rabbi-akiva-eiger|8|_": `Seif 8: If of the three, one leaf on top of two — appears he requires three kinin on the hadas. And if one leaf is on top of two, it is invalid — see Rosh. And I found that the gaon Maharal of Vilna zt"l agreed. It still puzzles me — requires study. The Shulchan Aruch ruled like Rosh on seif 3.`,

  "651|rabbi-akiva-eiger|5|_": `Seif 5: He blesses on taking the lulav and Shehecheyanu. What he does not bless on taking date palm fronds — the language of the verse is lulav.`,

  "653|rabbi-akiva-eiger|2|_": `Seif 2: And not by way. See below siman 695 seif 2 and Magen Avraham there.`,

  "658|rabbi-akiva-eiger|6|_": `Seif 6: Picked before Yom Tov. See responsa Mahashat Moshe siman 4.`,

  "671|rabbi-akiva-eiger|8|_": `Seif 8: Sufficient for him with one of them. Per Rosh — requires three kinin on the hadas. And Maharal of Vilna agreed.`,

  "676|chokhmat-shlomo|5|_": `Seif 5: Will begin to light on Sunday night from the rightmost candle. See in my compositions on Orach Chayim year 5644 daf 17a for proof from the right.`,

  "685|chokhmat-shlomo|7|_": `Seif 7: Some say Parashat Zachor and Parashat Parah Adumah are d'oraisa. Magen Avraham wrote one fulfills through the positive mitzvah of remembering Amalek. If so, why in Megillah does it say we read Parashat Vayavo Amalek on Purim? It appears to me the reason is: since we hold like poskim that on Purim we read Parashat Vayavo Amalek, therefore it is d'oraisa. And what Magen Avraham wrote — that one fulfills through the positive mitzvah of remembering Amalek — is when there is no other way to fulfill. And what he wrote on Parashat Parah Adumah — that one fulfills through the positive mitzvah of Parah Adumah. And what I heard from the famous gaon Av Beit Din R' Shaul zt"l — end of his words.`,

  "688|rabbi-akiva-eiger|6|_": `Seif 6: And on the second day they read Vayavo Amalek. And if they forgot and read it, they must take out a Torah scroll and read with a blessing.`,

  "689|chokhmat-shlomo|5|_": `Seif 5: If all know, each reads for himself. See Magen Avraham s.k. 10 who brought views whether another can discharge a friend in Megillah with fewer than ten — see there. At first glance difficult: why does the gemara in Megillah challenge from Megillah in its time individually with ten? It appears Rava's view: if all know, each reads for himself; if not, need ten. And per what Magen Avraham wrote, even if all know, discharge is only rabbinic — see there.`,

  "690|rabbi-akiva-eiger|10|_": `Seif 10: Does not fulfill in a foreign language. And cannot discharge a gentile in a foreign language. Since one who reads is not obligated in the matter, as Jerusalem teaches, he is not obligated by the matter and the gentile is not.`,

  "690|rabbi-akiva-eiger|9|_": `Seif 9 in the gloss: but there is no concern regarding which script. In responsa Chavat Yair siman 106: much to be puzzled about this; see there.`,

  "693|chokhmat-shlomo|2|_": `Seif 2 in the gloss: one does not say on the miracles except on day 14 but not on day 15. See Taz s.k. 3. Rashi Megillah 7b: lo mazkerinan — we do not mention. And even though poskim agree the custom is to uphold it, nevertheless it is difficult why the Mechaber ruled like Rashi.`,

  "694|chokhmat-shlomo|2|_": `Seif 2: Rambam's words on exchanging Purim money for charity are puzzling — see in my compositions on Yoreh De'ah year 5644 siman 482.`,

  "696|rabbi-akiva-eiger|4|_": `Seif 4 in the gloss: not on 14 and not on 15. And if 15 falls on Shabbat, mourners do not read the haftarah for comfort on Shabbat night before Ma'ariv — see Simchat HaNefesh.`,

  "696|rabbi-akiva-eiger|8|_": `Seif 8 in the gloss: what they used to wear masks. See Magen Avraham siman 696 s.k. 22.`,
};

async function translateMissing() {
  const failPath = path.join(OC_ROOT, "_stragglers-501-697-fail-he.json");
  const failHe = fs.existsSync(failPath)
    ? JSON.parse(fs.readFileSync(failPath, "utf8"))
    : {};
  const out = { ...OVERRIDES };
  for (const [k, he] of Object.entries(failHe)) {
    if (out[k]) continue;
    console.log("Translating", k);
    let en = await translateHe(he);
    const parts = k.split("|");
    en = autoFix(en, parts[3], he);
    out[k] = en;
    await new Promise((r) => setTimeout(r, 400));
  }
  return out;
}

async function main() {
  const translated = await translateMissing();
  const outPath = path.join(OC_ROOT, "_siman501-697-stragglers-overrides.mjs");
  const lines = Object.entries(translated)
    .map(([k, v]) => `  "${k}": ${JSON.stringify(v)},`)
    .join(",\n");
  fs.writeFileSync(
    outPath,
    `/** Auto-generated overrides for 501-697 stragglers */\nexport const OVERRIDES = {\n${lines}\n};\n`,
    "utf8",
  );
  console.log("Wrote", Object.keys(translated).length, "overrides to", outPath);
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(fileURLToPath(import.meta.url));
if (isMain) main();