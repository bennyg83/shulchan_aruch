#!/usr/bin/env node
/** worker slot 3 — siman 405 part 1 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_405/mechaber/part-001.txt": {
    "1:main":
      "The law of one who leaves the techum. One who left the techum, even one cubit — may not enter to be like the people of the city; he has only four cubits from where he stands and outward.",
    "2:main":
      "If one foot was within the techum and one foot outside the techum — he may enter.",
    "3:main":
      "One upon whom the day was sanctified while he was outside the city techum, even one cubit — may not enter to be like the people of the city; he walks only two thousand cubits in every direction from where the day was sanctified upon him.",
    "4:main":
      "One who left the techum unknowingly — it is permitted to make for him a partition of people who made eruv in that direction, and they may walk there; they make around him like a partition and he enters among them — he who did not know those for whom the partition was made toward him. But if he left knowingly — forbidden.",
    "5:main":
      "One whom non-Jews took outside the techum, or an evil spirit, or any other duress, or who left by mistake — has only four cubits. If they returned him within the techum, it is as if he did not leave, and the whole city is like four cubits as at first, and beyond it two thousand in every direction. But if he returns knowingly — only four cubits. {Rama: And if he entered a ship and the ship went outside the techum and returned afterward to the port from which it sailed — it is as if he did not leave, for it is like non-Jews took him and returned him (Or Zarua).}",
    "6:main":
      "If non-Jews placed him outside the techum in a pen or prison, or cave, or another city enclosed with a wall for residence, or other duress, or mistakenly left techum and entered one of these and remembered while inside — he walks all of it. But if he left his techum knowingly, even inside one of these — only four cubits.",
    "7:main":
      "One whose ship sailed at sea — walks all of it, since he rested in the air of partitions. If the ship walls broke on Shabbat — if traveling, walks all; if standing, only four cubits. {Rama: If in the middle he has ten-handbreadth partitions and none on top — we follow the middle; even if only enough to carve ten, for we say carve to complete (Or Zarua).}",
    "8:main":
      "If he left knowingly and non-Jews returned him — only four cubits. However if returned to his city (enclosed with partitions for residence — Raosh chapter Mi Shehutziah, Rabbeinu Yerucham ch. 1, Or Zarua) — whole like four cubits; even if left knowingly and returned knowingly (see law of unspecified towns siman 401).",
    "9:main":
      "Produce taken outside the techum and returned — even intentionally did not lose its place; the whole city is for them like four cubits and beyond two thousand as at first. If Yom Tov — if Shabbat, permitted to eat in place, even for the Jew who returned them for his need intentionally — why? They are under duress. While not returned and outside their place — if taken out mistakenly, permitted to eat them, forbidden to carry beyond four cubits; if intentionally, forbidden to eat, even for one who did not take them out. Some permit for one who did not take them out.",
  },
  "output/siman_405/beer-hagolah/part-001.txt": {
    "1:_": "Mishnah Eruvin 52, and like Tanna Kamma; so Rambam chapter 26.",
    "2:_": "Gemara there and alternate wording.",
    "3:_": "Mishnah there 52.",
    "4:א": "Gemara there 43 in incident of Nachmani.",
    "4:ב": "There 44.",
    "4:ג": "From implication of Gemara there; so Raosh there.",
    "4:ד": "(See above siman 362 seif 5.)",
    "5:א": "Mishnah there 48 and Rashi's explanation there.",
    "5:ב": "Gemara there from precision of mishnah.",
    "6:א":
      "Gemara there like Rabbi Gamliel; Rav ruled there 42; Tosafot and Raosh like Rambam chapter 27 Laws of Shabbat.",
    "6:ב": "There 41 from precision of mishnah.",
    "7:א": "Gemara there like Rabbi Gamliel.",
    "7:ב": "Hagahot Ashri there.",
    "8:א": "Gemara there 41 from precision of mishnah.",
    "8:ב": "Raosh and Mordechai there in name of Rambam from Gemara sugya.",
    "9:א": "Gemara there 41.",
    "9:ב": "Hagahot Ashri in name of Tosafot.",
    "9:ג": "Baraita there and Gemara, and Tanna Kamma.",
    "9:ד": "Raosh there.",
    "9:ה": "Mordechai in name of Rambam.",
  },
  "output/siman_405/baer-heitev/part-001.txt": {
    "1:_":
      "One cubit. See Magen Avraham who raised: since his four cubits are swallowed within the techum, therefore it appears lenient here if duress — we hold swallowing techum is a matter; but regarding domain, all agree it is not a matter — see there.",
    "2:_": "Four cubits. See what I wrote siman 409 seif 5.",
    "3:_":
      "To walk. When he reaches within the techum, permitted to walk to city without partition — see what I wrote seif 1. Magen Avraham.",
    "4:_": "And it went out. See siman 346 seif 6.",
    "5:_":
      "Enclosed. If he came to outskirts of city — like city (Maharil); he concluded there they practiced not to leave ship but non-Jews carry to city or seashore place ten high — see Magen Avraham.",
    "6:_":
      "To his city. Since he rested in air of partitions; but another city, even if non-Jews placed him — only four cubits since he left knowingly — see seif 6 and 7. Magen Avraham.",
    "7:_":
      "Like four. Nevertheless forbidden to go beyond it, for he lost his techum since he left knowingly.",
    "8:_":
      "To eat them. If a person made eruv to that side, or another city is adjacent there — Rashi; see siman 495.",
    "9:_": "Beyond. Even if in walled city — Taz; see there he expanded.",
  },
  "output/siman_405/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] Even one cubit, etc. Bach and Olat Shabbat hold specifically intentionally; but if left under duress or for mitzvah, all who did not go more than two cubits may enter to be like people of city. Magen Avraham disagrees from Raavad and Maggid Mishnah — matter depends on clarification and appears he clarified toward his face. Not a valid challenge — they proved thus per Rif; he holds so and is on eight amot; also beginning siman 397 I explained so — Levushei Yom Tov, Taz, Perishah, R' Yonatan, Meor, end chapter Mi Shehutziah, Tosafot 44b; also some say siman 397 — four cubits on every side; if so perforce distinguish unintentional/intentional from duress/mitzvah; per this all four cubits enter to be city member; so ruled Avodat HaKodesh 31. Magen Avraham after citing Maggid Mishnah and Raavad wrote therefore lenient if duress — wonder, for Maggid Mishnah forbids whenever appears clarified; appears shortage in Raavad words he brought — Raavad himself wrote when he clarified outer side; Maggid Mishnah wrote appears clarified, and since wrote it is strained, reasonable to be lenient like Raavad if not clarified thus — I reconcile his words. For law, primary as I explained.",
    "2:_":
      "[2] Within techum, etc. Per what I wrote above — same if one foot within four cubits of techum and one foot outside four cubits beyond techum — so appears; so Avodat HaKodesh there.",
    "3:_":
      "[3] Partition, etc. Even partition more than two thousand — walks all, as siman 403; when reaches within techum permitted to walk to city without partition.",
    "4:_": "[4] They did not know, etc. See siman 362 seif 5 from this.",
    "5:_":
      "[5] On ship, etc. Magen Avraham explained: ship at twilight below ten, acquired residence there, sailed Shabbat, returned — as unknowing since entered permissibly, or entered Shabbat to dwell — if entered to sail, like leaving knowingly.",
    "6:_": "[6] Enclosed wall, etc. Implies even if brought to outskirts of city — does not help.",
    "7:_":
      "[7] Since he rested, etc. But if came to another city — forbidden, for did not rest in air of partitions; since entered ship Shabbat — like left knowingly; Olat Shabbat not precise; same if placed in Cuthean ship. May enter small ship hanging to relieve and return to large ship — requires study: here entered from daytime, rested there; he also wrote if entered permissibly e.g. acquired yesterday — like left unknowingly; must say left after dark from ship to room — requires study. Shiltai Giborim 200: even jumped ship to ship before leaving techum and second ship took him outside — walks all though did not rest in second partitions.",
    "8:_":
      "[8] Broke, etc. One might say since permitted partially, permitted entirely (Olat Shabbat); no difficulty, as end siman 365 — we say so only in enclosed partitions.",
    "9:_":
      "[9] [Levush] if remained, etc. Shulchan Aruch language: if in middle he has, etc.; Magen Avraham explained on head sloped; if partitions on head breached — need not be breached more than standing; Levush does not imply so.",
  },
  "output/siman_405/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] One who left the techum, etc. — intentionally and knowingly not for mitzvah. Rashi; so Bach; but if left unknowingly see below seif 4 and letter 3; if left mistakenly see Orach Chayim siman 397 letter 3; in this siman letter 1 wrote mistaken is like intentional — but from seif 5 below proves mistaken like duress — see there; so Mishna Berurah letter 2.",
    "2:_":
      "(2) There. Even one cubit may not enter, etc. — so Tur; so Rambam ch. 27. Maamer Mordechai wrote Rashba ruled like Rashba who said even fifteen cubits may enter, for measurers are not precise and beyond marker fifteen cubits — see there; Beit Yosef brought; we rule like Rambam; so Acharonim.",
    "3:_":
      "(3) There. He has only four cubits from where he stands outward. So Rambam ch. 27 halachah 11; implies toward his face he may not walk even one cubit; Maamer Mordechai: Rambam holds like Rabbi Yehudah in mishnah there — only four cubits one direction; since walking and wants to go, appears he clarifies toward his face — therefore only four cubits from feet outward — see there. See above siman 397 seif 1 in Hagah — dispute: some say four cubits in center, two each direction; some four each direction; we brought Poskim agreeing — see there. Entering like city people — Magen Avraham seif kaf alef; Orach Chayim letter 1: whoever left under duress or mitzvah within four cubits of techum may enter; so Rabbi Zalman letter 1 ch. 1 klal 76 letter 28; Mishna Berurah letter 2.",
    "4:_":
      "(4) [Seif 2] He may enter. We follow majority; since only one foot outside techum, majority still inside — therefore may enter. Rashi. Per above he has four cubits outside techum — same here: if left under duress, one foot within four cubits of techum, one foot outside four cubits beyond techum — may enter. Orach Chayim letter 2 ch. 1 there; Mishna Berurah letter 4.",
    "5:_":
      "(5) [Seif 3] And he is outside techum, etc. — if he were inside techum, since he intends to enter city, he is like city people and walks whole city and two thousand each direction from city, as above siman 400.",
    "6:_":
      "(6) There. May not enter like city people, etc. — but may walk in city three cubits, for he has two thousand apart from four cubits which are his residence place, as siman 397. Rabbi Zalman letter 3.",
    "7:_":
      "(7) [Seif 4] Unknowingly. E.g. his mind was occupied and he did not know he left techum, as Gemara; same if duress or mistake, as next seif; same if left for mitzvah — also considered duress, as above letter 3.",
    "8:_":
      "(8) There. Permitted to make partition, etc. — reason: when people surrounded him with partitions, it is like enclosed karpef considered all four cubits; he walks within enclosure toward city and enters his techum permissibly; since entered techum, as if he did not leave. Beit Yosef. Then whole city four cubits as at first and beyond two thousand, as next seif.",
    "9:_":
      "(9) There. Permitted to make partition, etc. — that it not be more than two thousand cubits. Rambam ch. 27 halachah 14; Maamer Mordechai: Raavad and Rashba disagreed — even large is permitted — see there. Bach, Beit Yosef; so Magen Avraham seif bet — even partition more than two thousand walks all; so Orach Chayim letter 3, Tosafot letter 3, Rabbi Zalman letter 4.",
  },
  "output/siman_405/yad-ephraim/part-001.txt": {
    "1:_": 'Taz seif kaf bet — "the ship never stood once," etc. — thus it should read.',
    "2:_":
      "Magen Avraham seif zayin — since he entered ship on Shabbat, etc. What is said here \"since he rested in air of partitions\" — not meaning he acquired residence at entry of day on land, for on land he acquired residence; only meaning when he entered ship and stood in air of partitions he had not yet left techum and was then permitted to walk all; therefore even though later sailed outside techum, permitted to walk all. Such \"rested in air of partitions\" — since partitions absorbed him within techum and permitted walking all. See below seif 8 and seif 12; no proof from there regarding return to his city — if so, rested in these partitions from daytime; even if not from daytime, appears permitted as Hagahot Maimoniot below siman 406 seif 2 — to his city in every case permitted; one may say there by returning to city he returns to original techum, not so ship now outside techum and did not rest in these partitions from daytime. Though no proof from seif 8, reasonable: ship entered Shabbat — properly called rested in air of partitions, since when entering partitions leaving techum not yet forbidden and could walk all — partitions not nullified though now outside techum, as appears to me. Acharonim explained: acquired residence at entry of day — left from there; not like Mechaber siman 346 nor Rama siman 346 — their words strained; per Or Zarua plainly; from Magen Avraham siman 346 seif 11 does not imply so — see there; I shortened.",
  },
  "output/siman_405/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Magen Avraham seif kaf alef — whether left under duress. Tosafot in sugya: one may say even under duress swallowing techum does not apply. That case is different — below siman 406 entering modest place, as Tosafot 44a s.v. Amar Lei: since already left the four cubits Sages gave him; by right should give other four cubits; since in first techum they did not give other four cubits but return to first techum; here since he did not lose the four cubits — may not enter; so more Tosafot there 42b s.v. uleumay; that case below siman 409 seif 2 plainly for mitzvah helps as Gemara 46; under duress one may say does not apply like mitzvah; where he did not lose his four cubits — may not enter.",
    "2:_":
      "Magen Avraham seif bet — even partition more than two thousand. This is Raavad and Rashba — like placed in dir and sahar; Rambam holds only two thousand. Hagahot Maimoniot in reason: one who left unknowingly — all considered four cubits when rested there also when left unknowingly; that is dir and sahar; but if placed where partition made afterward — if he had rested there that place would not be four cubits, as siman 403; all the more when left did not rest — should not be four cubits; enough if permitted two thousand as when rested there — see there.",
    "3:_":
      "Seif 6 — outside techum in pen or prison. Animal guard there — R' Yonatan; see responsa Noda Biyehudah 2 Orach Chayim 67.",
  },
  "output/siman_405/shaarei-teshuvah/part-001.txt": {
    "1:_":
      "(On Shulchan Aruch seif 6) Placed him in pen or prison, etc. Noda Biyehudah wrote siman 47: if placed in animal karpef enclosed with partitions and animals are there called tiergarten — even if permanent dwelling for guard, his dwelling is void, for people do not dwell among animal herds; may not carry beyond se'ah; animal herds worse than seeds; even less than se'ah — room to argue — see there.",
  },
  "output/siman_405/netiv-chayim/part-001.txt": {
    "1:_":
      "Magen Avraham seif 14. Should read: specifically where there is Noda Biyehudah and not clear — if so Rif and Raosh should explain when he has other fruit forbidden to export; but primary what I found in Ritva chiddushim in name of R' Yonah: even on Shabbat melachah of Shabbat is not forbidden because carrying prohibition was made on Rosh Hashanah or bringing in/taking out — they forbade only matter with action, i.e. repair made on its body — called action; therefore we say melachah of Shabbat everywhere; reason is reasonable.",
    "2:_": "Shulchan Aruch seif 7 — if it is a ladder in a basket — see Rambam ch. 6 Gifts to Poor halachah 7.",
  },
  "output/siman_405/chokhmat-shlomo/part-001.txt": {
    "1:_":
      "Above seif 1 — marginal note: Among Poskim dispute whether techum from Torah beyond twelve mil — now appears clear proof it is only d'rabbanan from Gemara 58b: R' Nachman in name of R' Elazar bar Avuhu — we do not measure neither heifer nor cities of refuge because they are Torah, and why not teach techum itself regarding twelve mil that is Torah and we do not measure? Why omit techum dealing with it and teach other matter? Perforce techum is entirely d'rabbanan. In my opinion this is irrefutable proof; Gemara itself infers 35b from this — per Rabbi Meir techum d'rabbanan — see there; examine.",
    "2:_":
      "Seif 7 in Hagah \"we say carve to complete\" — marginal note: see Magen Avraham; see Sefer Eliyahu Rabbah; see my responsum to Krakow in my work Orach Chayim year 5404 first chapter Eruvin siman 363 what he wrote to resolve Magen Avraham's question — see there; examine.",
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
