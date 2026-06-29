#!/usr/bin/env node
/** worker slot 3 — siman 401 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_401/mechaber/part-001.txt": {
    "1:main":
      'One who sleeps on the road and it becomes dark for him acquires residence in his place and has two thousand cubits in every direction — specifically regarding a person, because since if he had been awake he would have acquired [residence], while sleeping he also acquires. But ownerless objects do not acquire residence; they are like the feet of the one who acquires them first, who may take them wherever he goes. But objects of non-Jews acquire residence in their place, even though their owners are not people who acquire residence — a decree [regarding] objects of non-Jews lest [one treat] objects of Israel [likewise]. And if non-Jews took them outside their techum and brought them into a city, they may be moved throughout it, for the whole [city] is like four cubits, provided it is enclosed for residence. Unspecified towns are [considered] enclosed for residence — they build houses first and afterward surround them. But unspecified fortresses are not enclosed for residence. {Rama: Therefore a Jew must be careful when he lent his vessels to a non-Jew and they were returned on Shabbat, not to carry them beyond four cubits if the city is not enclosed with a partition for residence, for the vessels acquired residence with the non-Jew. (Or Zarua)}',
  },
  "output/siman_401/beer-hagolah/part-001.txt": {
    "1:א": "Mishnah Eruvin 45, and like Rabbi Yohanan ben Nuri leniently; Gemara there 46.",
    "1:ב": "There in Gemara, and like the Sages leniently — halachah follows the lenient view in eruv.",
    "1:ג": "There 46, and like Rabbi Yohanan — Gemara.",
    "1:ד": 'Gemara there, incident of these needles.',
    "1:ה": "Explained in siman 397, and there I cited it.",
  },
  "output/siman_401/baer-heitev/part-001.txt": {
    "1:א":
      "Like the feet [of the acquirer]. And if two acquired it at once, one made eruv to the east and one to the west — neither may move it except to a place permitted to both. Taz — see there.",
    "1:ב":
      "Enclosed. Inhabitants of unwalled towns who fixed alleyways with a lechi as required are considered enclosed for residence, for they build houses first and then make the lechi, as in siman 358 seif 2; see seif 1 in Hagah — if not enclosed for residence, eruv would not help, for even one person's [limit] is forbidden. Magen Avraham.",
    "1:ג":
      "Enclosed. It appears to me: if they brought them to a Jewish alley where they make our eruv — lechi — the whole is as four cubits, for thereby carrying from domain to domain is permitted; and in the alley itself, which we regard as one domain, likewise for one coming from outside the techum it is all as four cubits and permitted throughout the alley; so Rashal, chapter One Who Comes, siman 9. Taz — see there; see Magen Avraham in seif kaf bet.",
  },
  "output/siman_401/beur-hagra/part-001.txt": {
    "1:א": 'Seif 1 — "because since." Rashi there, and so in Gemara there; meaning not like one master\'s leniency and like the other\'s. Raosh.',
    "1:ב": "Like the feet of whom. See Tosafot 45b, s.v. b'Yom Tov.",
    "1:ג": "Provided. Tosafot there s.v. d'kulah; proof from Rosh ch. 23.",
    "1:ד": "Therefore. Eruvin there 47b; and so one who lends his vessels to a gentile, etc.",
  },
  "output/siman_401/magen-avraham/part-001.txt": {
    "1:_":
      "Enclosed for residence. Inhabitants of unwalled towns who fixed alleyways with lechi as required are considered enclosed for residence, for they build houses first and then make lechi, as siman 358 seif 2; see seif 1 in Hagah — if not enclosed for residence, eruv does not help, for even one person's [techum] is forbidden.",
  },
  "output/siman_401/mishnah-berurah/part-001.txt": {
    "1:א":
      '(1) "Since if he had been awake," etc. — meaning that although at twilight, which is the time of acquiring residence, he was asleep and did not intend to acquire residence there, nevertheless he acquired residence there to have two thousand cubits in every direction from there; the reason is "since if he had been awake," etc.',
    "1:ב":
      "(2) Ownerless objects, etc. — for objects of Israel that have owners are like the feet of the owners; but ownerless objects, which have no owners and do not acquire residence in their place on their own, because they are not intelligent beings ever, are not compared to a sleeping person.",
    "1:ג": "(3) To wherever he goes — even if it is beyond the two thousand from the place where the objects were set down initially.",
    "1:ד":
      "(4) In their place — meaning in the place where they were set down at twilight; from there they have two thousand cubits in every direction and no more.",
    "1:ה":
      "(5) Decree — since in any case they have owners; if we said they do not acquire residence, one might say likewise regarding vessels whose owners are Israel that they also did not acquire residence, and permit taking them beyond two thousand.",
    "1:ו":
      "(6) That the whole is as four cubits — meaning that by right, objects taken outside their techum may be moved only within four cubits; nevertheless in this city, which is enclosed with partitions, it is permitted to move throughout it, for the whole is considered as four cubits.",
    "1:ז":
      "(7) Enclosed for residence — they built houses for residence first and afterward surrounded with a wall; not so if the enclosure preceded. One may move only within four cubits unless the enclosure is more than beit se'atayim. Our unwalled towns — since they fixed alleyways with lechi as required, the whole is considered enclosed for residence: the houses are like partitions and the open places fixed with lechi become for residence, for they build houses first and then make lechi; and a courtyard is always considered as four cubits.",
    "1:ח":
      "(8) Unspecified fortresses — the usual way is to make the fortress first and afterward people settle inside to dwell.",
    "1:ט":
      "(9) That he lent his vessels to a non-Jew — on erev Shabbat and he took them to his house outside the techum; for although they are Israel's vessels, since he lent them to him they acquired residence with him; and all the more so one who borrows vessels from a non-Jew on Shabbat.",
    "1:י":
      "(10) Not to move them, etc. — meaning garments; for other vessels, without eruv it is forbidden to move on Shabbat beyond four cubits; on Yom Tov one finds even other vessels where there is no carrying-out prohibition.",
  },
  "output/siman_401/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] He acquires residence in his place — if he is outside the techum of the city. Rabbi Zalman, letter 1 — meaning: but if he sleeps within the techum of the city and intends to enter the city, he is like the people of the city and walks all of it and beyond it two thousand cubits in every direction, as explained in Rambam chapter 27, halachah 10.",
  },
  "output/siman_401/yad-ephraim/part-001.txt": {
    "1:_":
      'Taz, seif kaf alef — "to the place of the object" — in this [case] the object did not acquire residence; so we say, etc. — thus it should read.',
  },
  "output/siman_401/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] But ownerless objects, etc. — Taz wrote that in the Gemara 46 we say this is lenient, etc.; and it appears to me that if two acquired it at once, one made eruv east and one west — these did not acquire residence but [the object is] like the feet of the acquirer; they may not move it from its place, as above siman 397 seif 9. We also say leniently that it acquired residence and one may carry it two thousand in every direction — up to here. I wonder, for in Tosafot there s.v. ka mashma lan they wrote it is not two leniencies that contradict each other, for we hold like the Rabbis that ownerless objects do not acquire residence; and sleeping — the reason is since if awake he would acquire, while sleeping he also acquires — up to here is their language; and so Raosh wrote. Thus it is clear we hold in every case that [objects] do not acquire residence; vessel and person are different because \"since if awake,\" etc. Moreover, per his view it would be two leniencies that contradict.",
  },
  "output/siman_401/peri-megadim/part-001.txt": {
    "1:א":
      "But ownerless objects — Taz, Eliyah Rabbah letter 1; and in Tosafot — two leniencies that contradict. Also ownerless — the halachah is like the Rabbis; and sleeping — since if awake he would acquire. Objects of non-Jews — the decree is close: they made them literally like Israel's; and even if a leniency emerges, as when two borrowed from a non-Jew, etc. — see there. In my humble opinion, Taz's intent regarding ownerless objects: if we said leniently that sometimes a stringency emerges from it — and the law is that ownerless objects are like the feet of the acquirer even if a stringency results, as when two borrowed — on this basis his question is drawn. If so, regarding objects of non-Jews that by law are like ownerless objects and by law like the feet of the acquirer — when two borrowed, it is forbidden to move them from their place — how does a leniency emerge from the decree lest Israel's [objects]? Nevertheless regarding ownerless objects, his view is certainly that when two borrowed it is stringency only; that is his suggestion for the question as said. Nevertheless one may say there is no contradiction in the decree, and likewise a leniency may emerge — Eliyah Rabbah and Tosafot; and see siman 396 in Taz letter gimel similarly.",
    "1:ב":
      "And know that what the Mechaber wrote — objects of non-Jews acquire residence in their place — means literally like Israel's vessels, because of the decree; and if they were far from the non-Jew, behold they are like the non-Jew and one may not move them from their place; see siman 397 seif 17, his fruits in another city; and Tosafot expanded on this.",
  },
  "output/siman_401/biur-halacha/part-001.txt": {
    "1:א":
      "Like the feet of the one who acquires them first — and if two acquired it, one made eruv east and one west, it is like the feet of both and forbidden to move it from its place [Tosafot and Maamer Mordechai and other Acharonim, not like Taz].",
    "1:ב":
      "They acquire residence in their place — see Mishna Berurah. And although the non-Jew's residence itself was elsewhere far away, it appears we do not follow him to forbid moving the vessels, since in truth a non-Jew has no residence and we follow only the placing of the vessels — so appears from Rambam and Mechaber; and Tosafot wrote thus in their view, except that Hagahot Asheri in the name of Or Zarua implies they are entirely like the feet of the non-Jew; if so, when the non-Jew is far away it is forbidden to move the vessels from their place, as with Israel's produce deposited elsewhere (siman 397 seif 17). Peri Megadim copied this. In truth Hagahot Asheri has no such implication: what he wrote there — he cannot take them beyond his two thousand — refers to the vessels; and one who examines Or Zarua will see he did not write this expression \"they are like the feet of the non-Jew,\" but that they acquire residence; and why Hagahot Asheri used \"like the feet of the non-Jew\" — the owners are presumably where the vessels are. Nevertheless in the essential law one should not reject Tosafot's doubt: although Poskim wrote they acquire in their place, perhaps that is when the non-Jew owner is also where the vessels are; but where the non-Jew is not there, perhaps they agree one follows the non-Jew as with Israel. So Gaon Yaakov concludes from the Gemara that we decree non-Jew lest Israel; afterward I found in Beit Meir he also challenged Tosafot from Hagahot Asheri in the name of Or Zarua and decided we do not follow the non-Jew himself at all — see there; and not like Gaon Yaakov.",
    "1:ג":
      "Provided it is enclosed for residence — see below siman 405 seif 6 in Biur Halachah what we wrote there, some Rishonim' views that we do not require enclosure with a partition; the same here.",
  },
  "output/siman_401/turei-zahav/part-001.txt": {
    "1:א":
      "But ownerless objects do not acquire residence. In the Gemara they say on 46b that this is lenient — for if it acquired residence he could not carry it except within its techum. It appears that if a leniency emerges from this that it acquired residence — e.g., two acquired it at once, one made eruv east and his techum ended near the object's place, and one made eruv west and his techum also ended near the object — in this we say neither may move it except where both are permitted, i.e., at that place of the object and slightly near it, and no more; unlike above siman 396 regarding two who borrowed a cloak, etc. But if we say the object acquired residence, each could carry two thousand from where the object's techum ends, for certainly the object's residence is through these finders on Shabbat; in this we also say leniently that it acquired residence. Accordingly it is difficult what he wrote afterward on a non-Jew's object that it acquired residence because of a decree lest Israel's object; per what was said, sometimes there is leniency if it acquired residence when two found it — likewise leniency if there is residence when two borrowed it from a non-Jew; and since in truth they have no residence, a leniency arises not according to law — requires study.",
    "1:ב":
      "Not to move them beyond four cubits. If the city is not enclosed with a partition — it appears if they brought them to a Jewish alley where they make our eruv — lechi — so the whole is as four cubits, for thereby domain-to-domain carrying is permitted; and in the alley itself, which we regard as one domain, likewise for one coming from outside the techum it is all as four cubits and permitted throughout the alley; so Rashal, chapter One Who Comes, siman 9. Rashba wrote only within four cubits if in a field or brought inside the city wall, for we regard the whole as four cubits, and all the more in a courtyard — up to here. He found prohibition only in a field, not in a courtyard; and this alley permitted by lechi is like one courtyard, as is clear to me.",
  },
  "output/siman_401/machatzit-hashekel/part-001.txt": {
    "1:א": `What Shulchan Aruch wrote: But objects of non-Jews acquire residence in their place, etc. — decree lest objects of Israel. From this language it implies even when their non-Jewish owners are elsewhere, the objects are not like the feet of the non-Jew but acquired residence where placed; so Tur's language and in Sefer Teshuvah he challenged: we come to this because of decree lest Israel's objects, and Israel's objects are like the feet of their owners — if so, likewise non-Jews' objects should be like the feet of their non-Jewish owners. Truly Sefer Teshuvah's words are reasonable; to reconcile the Poskim who hold they acquire in their place, one may say somewhat that they hold this suffices: since usually objects are where their owners are, if sometimes they are not where owners are and we say they acquire in their place, we will not confuse with Israel's vessels in such a case, since it is uncommon that they are not where their owners are; nevertheless they acquired residence because of do not distinguish. Some proof: they say 47b, Rabbi Yohanan — objects of non-Jews do not acquire residence; the Gemara concludes per him: what does he teach? If per the Rabbis it is obvious — now that ownerless objects, per him, do not acquire residence, objects of non-Jews whose owners are not people of residence, all the more so; and if per Rabbi Yehudah ben Rabbi Nosson who said ownerless objects acquire residence, he teaches that non-Jews' objects do not acquire. And it was taught: Rashba says one who borrows a vessel from a non-Jew on Yom Tov, etc., and ownerless stores that rested within the techum have two thousand in every direction. And if Rabbi Yehudah ben Rabbi Nosson agrees regarding non-Jews' objects, this baraita is not like whom? Rather per Rabbi Yehudah ben Rabbi Nosson non-Jews' objects acquire residence, and Rabbi Yohanan explained the baraita per the Rabbis. Do not challenge the Rabbis — it is obvious; he teaches lest you say decree lest Israel's objects — he teaches. And Rabbi Yohanan said non-Jews' objects acquire residence, for we decree non-Jews' vessels lest Israel's; and we hold like Rabbi Yohanan. Now the baraita language two thousand in every direction implies from their place, like ownerless stores.`,
    "1:ב": `Also the law two thousand in every direction implies thus; and as above 45b — if so, even if the baraita comes also per Rabbi Yohanan like Rabbi Yehudah ben Rabbi Nosson and not like the Rabbis, nevertheless challenge: whence for Rabbi Yohanan that the Rabbis agree regarding non-Jews' vessels because of decree? And if it is reasonable for Rabbi Yohanan, challenge what we see for Rabbi Yehudah ben Rabbi Nosson that he did not decree, for he holds non-Jews' objects are like ownerless and acquire in their place. Impossible that he holds one should decree lest Israel's vessels — he should have said non-Jews' objects are like the feet of their owners. Rather necessarily he did not decree and left the law; if so, whence for Rabbi Yohanan that the Rabbis decree? Or even if they decree, nevertheless this suffices if they acquire in their place. And he explained that therefore Rabbi Yehudah ben Rabbi Nosson need not decree, for from his words they acquire in their place — clear. And know what Taz wrote to be lenient in seif kaf alef — Sefer Teshuvah disagreed, for these are two leniencies that contradict.`,
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  let n = 0;
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) {
        n++;
        return { ...b, en: blockFixes[key] };
      }
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file, n);
}
