#!/usr/bin/env node
/** worker slot 3 — siman 404 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const chokhmat = `Seif 1 — marginal note: We have the text in Eruvin 43b: Rabbi Chiya asked — are there techum limits above ten handbreadths, etc. He vowed only, etc. When — if you say he stands on a weekday, since naziriteship takes effect on him, where does Shabbat come and remove it? It is difficult — what is the challenge? Behold we say in Sukkah ch. 2 and Gittin ch. 2: for fear he died we are not concerned; for fear he might die we are concerned; if so, one may say here likewise. Tosafot in Kiddushin wrote this reasoning applies only to something destined to be so; nevertheless coming of the Messiah is certainly destined. If so, one may say here likewise: on that day itself it is forbidden to drink from power of doubt lest today he come; so all weekdays. But on Shabbat the day will not come — only we fear perhaps he already came — we are not concerned; we follow presumption that initially he did not come and presumption of his permission that he was permitted wine. What is the challenge? It appears properly: every day, although we fear the Messiah may come, nevertheless we must say Elijah came yesterday — otherwise how would the Messiah come? Thus the whole concern is perhaps he already came; otherwise why fear the Messiah will come if Elijah did not come yesterday? Perforce we also fear perhaps he already came; the challenge is proper — why permitted on Shabbat, naziriteship takes effect; thus the Gemara is precise "he vowed when" — what relevance here? He could have challenged without this. Per the above it is proper: without the above Gemara text there is no difficulty — one may say Elijah need not come first, Messiah may come without him; thus for fear he will come we are concerned, for fear he came we are not. Since the Gemara concludes Messiah cannot come until Elijah comes first, every day the only concern is perhaps he already came; thus the challenge is proper — he stands on a weekday, also on Shabbat to forbid wine — examine well. With this is also resolved why the tanna taught "I am a nazir on the day the son of David comes" — he should have taught "on the day Elijah comes." Per the above it is proper: he teaches a novelty — not only vow on day Elijah comes do we certainly fear, for fear he will come; but vow on day son of David comes — impossible unless Elijah came first; thus concern perhaps Elijah already came — in any case we are concerned; it works either way. For one who did not know son of David does not come until Elijah first — not hard why he did not teach Elijah; he taught a fixed matter that will certainly be. Per conclusion Messiah does not come until Elijah the day before — properly he did not teach "day Elijah comes": he teaches we also fear perhaps he came — examine well. Incidentally I note what Beit Yosef wrote here in Rashba's name — therefore we are stringent from presumption of techum of his house; see my work Yoreh Deah edition 5 siman 112 explanation of Rashba; also explanation of Rambam that beyond twelve mil is d'oraisa — see there at length with God's help — examine well.`;

const fixes = {
  "output/siman_404/mechaber/part-001.txt": {
    "1:main":
      "Whether there are techum limits above ten handbreadths. One who walks outside the techum above ten handbreadths — e.g., jumped on pillars ten high when each does not have four by four handbreadths — it is doubtful whether techum applies above ten or not; and whatever is d'rabbanan, its doubt is resolved leniently. {Rama: However, if he was walking in this manner, or by jumping there from within twelve mil to outside twelve mil, we follow stringency per those who say techum of twelve mil is d'oraisa (my words and Rambam's responsum).} And since on seas and rivers there is no d'oraisa techum prohibition per all opinions, because they do not resemble the desert encampment — one who came in a ship on Shabbat and reached a port: if from entry of Shabbat until reaching the port it was always above ten handbreadths from ground of sea or river, he descends and is not restrained, and has two thousand cubits from the place he reached below ten. {Rama: And if it is doubtful whether above ten or not — we follow leniency (Maggid chapter 27). And if he already went two thousand from where he reached below ten so he has only four cubits — nevertheless if he must leave the ship because of rain upon him, or sun shining on him, or needs his bodily needs and must thereby enter the city — the whole city is like his four cubits; and since he went up (Or Zarua, Mordechai, Hagahot Ashri chapter Mi Shehutziah); see below siman 406; see above siman 346 regarding one riding on the road when it becomes dark on erev Shabbat what he should do.}",
  },
  "output/siman_404/beer-hagolah/part-001.txt": {
    "1:א": "Question in Gemara 43b, unresolved; Rambam wrote in chapter 27 of Mishneh Torah.",
    "1:ב": "Likewise in the name of Rambam's responsum.",
    "1:ג": "There and there.",
    "1:ד":
      "Rambam, Ramban, and Rashba — from mishnah Eruvin 41 in the incident of Rabbi Gamliel; they establish it there in Gemara regarding one traveling below ten.",
  },
  "output/siman_404/baer-heitev/part-001.txt": {
    "1:א":
      "On seas. Even beyond twelve mil they are not d'oraisa, because they do not resemble desert encampment; therefore we follow leniency. R' Moshe Alshakar siman 108 wrote permitted to descend from ship by ferry unless in a place where they were stringent; some forbid ferry — see Turei Zahav on Darkhei Moshe. See siman 339 seif 7.",
    "1:ב":
      "Above. Magen Avraham wrote: if he went out to land once after dark he acquired residence there and has only two thousand from there — s.v., in the name of Rashbatz.",
    "1:ג": "He went out — meaning his ship sailed from there beyond two thousand.",
    "1:ד":
      "And needs. Likewise if non-Jews pushed him into the city — the whole is like four cubits; see siman 405; and if he did not go out from where he reached below ten — two thousand cubits, and his measure ended in half the city — forbidden to walk more, as siman 403 and 400. One who comes on Shabbat from outside techum — permitted to walk on the following Yom Tov beyond four cubits. Beit Yosef; see Magen Avraham.",
  },
  "output/siman_404/magen-avraham/part-001.txt": {
    "1:א":
      "It is d'oraisa. Specifically for the person himself; but his vessels and animal are d'rabbanan (Ralbag 108); in R' Moshe Alshakar it appears he disagrees (so 397).",
    "1:ב":
      "And since, etc. Even beyond twelve mil they are not d'oraisa because they do not resemble, etc.; therefore lenient (nevertheless so Rambam chapter 27). R' Moshe Alshakar siman 108 wrote permitted to descend from ship by ferry unless where they were stringent; some forbid ferry — see Turei Zahav on Darkhei Moshe (so 397); see siman 339; he wrote in Keneset HaGedolah if the ship drifts it is forbidden to walk all of it, for one may not walk in it more than a mil — in the name of s.v. and siman 405 explicitly permits — see there.",
    "1:ג":
      "Above ten. And although water acquires residence even above ten, as I wrote siman 397 seif 14 — one may say water is all considered as one since connected to ground (Tosafot 45b); if he went out to land once after dark he acquired residence there and has only two thousand from there (s.v., Rashbatz).",
    "1:ד": "And if he already went out — meaning his ship sailed from there beyond two thousand.",
    "1:ה":
      "The whole city like four cubits — must read: it is called leaving unknowingly; see siman 405 seif 7; likewise if non-Jews pushed him into city — whole like four cubits; see siman 405 seif 6 (Maharil); if he did not go out from where he reached below ten — two thousand, measure ended in half city — forbidden more, as siman 403 and 400. One coming Shabbat from outside techum — permitted following Yom Tov beyond four cubits (Beit Yosef and Hagah and Shlah, not like Shach). Plain Hagahot Maimoniot deals when he reached once below ten, for he ruled no techum above ten; both from Or Zarua; Rabbeinu Yerucham brings proof for those who hold techum above ten and sailed from there — Eliyahu Rabbah did not analyze siman 346.",
  },
  "output/siman_404/turei-zahav/part-001.txt": {
    "1:_":
      "And each does not have four by four — for if it had four by four, walking there would be convenient; obviously techum prohibition applies there; but without four by four, walking there is not convenient — we are in doubt.",
  },
  "output/siman_404/mishnah-berurah/part-001.txt": {
    "1:א":
      "(1) Above ten handbreadths — for all above ten is not a place of walking; primary walking place is on the ground or at least within ten, which is also considered walking on the ground; the Sages were uncertain whether techum prohibition applies here.",
    "1:ב": "(2) He jumped, etc. — the same regarding walking in air by jumping, as below.",
    "1:ג":
      "(3) And each does not have, etc. — for he is like one walking in air; but if they had four by four convenient for walking, he is considered walking on the ground; plainly techum prohibition applies there. Even if only one pillar of four handbreadths, part within his techum and part outside — forbidden to go from one head to the other (Rashi).",
    "1:ד":
      "(4) Four by four — but if on one side less than four by four, even if very long, not convenient for walking — also included in the doubt.",
    "1:ה":
      "(5) In d'rabbanan — such as outside techum of two thousand cubits until twelve mil, which all agree is d'rabbanan.",
    "1:ו": "(6) In this way — meaning via pillars.",
    "1:ז":
      `(7) Per those who say, etc. — meaning Poskim who rule like Yerushalmi that beyond twelve mil is d'oraisa, learned from verse "let no man go out of his place on the seventh day" — and this place is beyond twelve mil corresponding to Israel's camp. From Mechaber's words "and whatever is d'rabbanan," etc., it implies he leans to rule stringently on land beyond twelve mil even above ten, which is d'oraisa doubt; Beur HaGra leans to Poskim that it is always d'rabbanan.`,
    "1:ח":
      "(8) And since on seas and rivers, etc. — meaning even beyond twelve mil they are not d'oraisa, because they do not resemble, etc.; for those who say d'oraisa we learn from desert — walking in desert was on dry land not water; therefore we are lenient regarding above ten.",
    "1:ט":
      "(9) One who came in a ship on Shabbat — not meaning he boarded on Shabbat — for then he was at entry of day on land and acquired residence there and forbidden to descend to port; but meaning he traveled with the ship on Shabbat and reached port.",
    "1:י":
      "(10) Always, etc. — if even once below ten during Shabbat he acquired residence there; if from that place to port is more than two thousand — again forbidden to descend to port, for he has only four cubits — his sitting place on ship considered all as four cubits. When sailing Shabbat on ship standing above ten intending to descend Shabbat elsewhere beyond two thousand — must be careful: as soon as he acquired residence on ship at twilight while above ten, not to go to dry land; if he went to dry land one hour he acquired residence there and forbidden again to descend to port outside two thousand from his residence on land — as siman 346 — see there.",
    "1:כ":
      "(11) He descends, etc. — if ship far from port he descends via ramp. To pass via ferry on the water (called pram) if tied to ship and port — all permit descent; if not tied — some permit, some forbid, lest it appear like a raft since he did not rest on it from daytime; nevertheless in Shulchan Aruch Rabbi Zalman implies: if he did not leave ship to land from entry of day until now — permitted.",
    "1:ל":
      "(12) From place he reached — meaning if he reached a place below ten far from port, they measure two thousand cubits from there.",
    "1:מ":
      "(13) If above ten, etc. — refers to measure of twelve mil of seas and rivers; same for measure of two thousand on land.",
    "1:נ":
      "(14) We follow leniency — we rely that from Shabbat entry until port it was above ten, because d'rabbanan doubt is lenient.",
    "1:ס":
      "(15) And if he already went out — meaning he reached one place below ten, acquired residence, went more than two thousand — by law he has only four cubits as one who left techum; even under duress only four cubits; nevertheless if under duress he entered walled city — whole city considered four cubits, as law of non-Jews taking him into walled city siman 405; if he did not go beyond two thousand, only measure ended in half city — may walk only until measure ended. One who comes on Yom Tov from outside techum from place reached below ten — nevertheless following Shabbat permitted two thousand from where he stands, for Shabbat and Yom Tov are two sanctities and no preparation prohibition since he did nothing (Acharonim).",
    "1:ע":
      "(16) Because of rain, etc. — all the more if non-Jews pushed him into city — whole city like four cubits; nevertheless he may not tell non-Jew to push him.",
    "1:פ":
      "(17) Or needs, etc. — all when he did not find modest place to relieve, and place to hide from sun or rain until within city; otherwise forbidden to enter, as below siman 406; this is what Rama wrote — see below, etc.",
  },
  "output/siman_404/beur-hagra/part-001.txt": {
    "1:א":
      "Seif 1 — and whatever. See Rif ch. 6 Shabbat regarding Porpet, etc.; so Gemara there 34a; Eruvin 45b, Yom Tov 3:2, and other places in Talmud; likewise in law doubt as in first chapter Avodah Zarah.",
    "1:ב": "However. There and there.",
    "1:ג": "Not via. Gemara there.",
    "1:ד":
      "Per those who say, etc. Rif beginning Eruvin in Yerushalmi's name; so Tosafot Chagigah 17b s.v. dikhtiv, in Yerushalmi's name; but our Talmud disagrees with Yerushalmi, from ch. 6 Shabbat and ch. 24 knowing techum per Rabbi Akiva and no difficulty per Rabbis; in such case Raosh challenged beginning Eruvin; so Ritva and explanation; they brought more proofs from several places techum d'rabbanan, eruv d'rabbanan; see Tosafot Sukkah — nothing, for certainly four thousand cubits are d'rabbanan; but great proof from 45b: why should he acquire, etc.; alternative answer, etc.; several lines there.",
    "1:ה":
      "And since there is not. Per Rif beginning Shabbat: where techum prohibition applies, even from first day forbidden to sail; as siman 346; therefore ship above ten as Rif there — must say no techum.",
    "1:ו": "One who came. There 41b — ship, etc.; Tosafot incident they came, etc.",
    "1:ז":
      "From place he reached. Even midday — from what is said there if not from morning, etc.; perhaps it stood; Tosafot 45b s.v. lekanku in incident of Rabbi Gamliel; here: always was, etc.",
    "1:ח": "And if it is doubt. As above — d'rabbanan doubt.",
    "1:ט": "And if he already went out, he has not. There if not from morning, etc. — perhaps it stood.",
    "1:י": "Nevertheless if needs. As above siman 406.",
    "1:כ":
      "The whole city. There they brought him to city; likewise in such case as said if not from morning, etc., as above; halachah like Rabbi Gamliel; he said because he rested in air of partitions — from challenge that nevertheless halachah like Rabbi Gamliel regarding ship, etc.; they did not ask on Rabbi Gamliel himself why — teaches even if left knowingly it does not help, as siman 405 seif 6; here is when not knowingly.",
  },
  "output/siman_404/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] One who walks outside techum above ten, etc. — if techum applies above ten is a question unresolved in Gemara Eruvin 43; Poskim disagree whether we rule stringently or leniently; many great ones wrote: whatever of techum is from Torah — its doubt is stringent; whatever is from their words — its doubt is lenient, as Beit Yosef; as Shulchan Aruch ruled here.",
  },
  "output/siman_404/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] [Levush] should be stringent, etc. — requires study, for Shulchan Aruch implies ruled leniently even on land if not beyond twelve mil per those who say d'oraisa; so Riaz and Shiltai Giborim wrote, and so is primary; see Keneset HaGedolah — some say his vessels and animal are for everyone d'rabbanan even beyond twelve mil.",
  },
  "output/siman_404/rabbi-akiva-eiger/part-001.txt": {
    "1:_":
      "Seif 2 — on seas and rivers, not karmelis — there in Mishneh Torah. Therefore per those who hold nowadays we have no public domain — see above siman 343 seif 88 — there is no d'oraisa techum.",
  },
  "output/siman_404/machatzit-hashekel/part-001.txt": {
    "1:_": "Seif kaf alef — it is. But his vessels and animal, etc. — see above end siman 365, Magen Avraham seif 18.",
  },
  "output/siman_404/peri-megadim/part-001.txt": {
    "1:_":
      "And there is not — Taz; likewise one pillar, part within techum and part outside — forbidden to ascend and leave techum if it has four by four in square; if long without four width — doubt; see Levush — implies on land even within twelve mil doubt is stringent; specifically seas and rivers where essential techum even beyond twelve mil is d'rabbanan — doubt lenient; on land since beyond twelve mil for many Poskim is Torah, even within twelve mil they relied on verse — doubt stringent. In opening essay we wrote from this reliance if we go stringent; but from Rabbi Zalman in Hagah beyond twelve mil doubt stringent — implies within twelve mil even on land doubt lenient; Eliyah Rabbah on this.",
  },
  "output/siman_404/yad-ephraim/part-001.txt": {
    "1:_": "Magen Avraham seif bet — see Tamim De'im siman 74.",
  },
  "output/siman_404/biur-halacha/part-001.txt": {
    "1:א":
      "And each does not have four by four, etc. — see Likutei Chassidim part 6 siman 96 on wagons going by steam (called Eisenbahn) — forbidden to sit on them Shabbat; also erev Shabbat forbidden if knows will travel Shabbat because of techum — see there another reason; so responsa Mahari 1 siman 58 — on wagons called Eisenbahn everywhere forbidden; so Sefer Kalkalas Shabbat.",
    "1:ב":
      "Per those who say, etc. — know regarding carrying his animal or vessels beyond twelve mil — Darkhei Moshe wrote dispute: Ralbag wrote here for everyone d'rabbanan; R' Moshe Alshakar holds d'oraisa; Magen Avraham and Ramban innovations on Eruvin — per those who say twelve mil techum is d'oraisa, also his vessels are d'oraisa. Nevertheless appears lenient here above ten, for essence of twelve mil techum and below ten even for person many Poskim hold only d'rabbanan.",
    "1:ג": `And since on seas and rivers, etc. — Gra's innovations cite Maggid: likewise no techum in karmelis; concludes therefore for us without public domain we have no d'oraisa techum now — so Rabbi Zalman. Indeed hard to say so; on the contrary from Mechaber who mentioned only water and rivers, not karmelis — implies specifically seas and rivers that are not walking places at all; and Rama wrote in Hagah "however if he was walking," etc., per those who say d'oraisa techum — implies also for us there is d'oraisa techum; and per some Acharonim Rama holds nowadays no public domain — see siman 346; therefore no distinction. Essential reasoning, though from Rambam in Torah, is hard to align — in Talmud one opinion holds two thousand also Torah, learned from city outskirts thousand and thousand for techum — there certainly only karmelis, second thousand was animal field certainly not public domain, yet per Rabbi Akiva lashes if left beyond this measure; if so for us that only twelve mil is Torah, certainly even if twelve mil were karmelis there is prohibition "let no man go out"; so Ramban in sugya 43b does not hold like Rambam; although in essential law he also intended Rambam's words in responsum: "I do not call this 'let no man go out' since he did not walk three parsa on foot — ship travel is not called walking; wonder — he sits in his private domain, the ship is private domain, etc., you worry for walking three parsa — he is stationary and the ship moves," etc. — see there: only because not walking; but if he walked on foot in water twelve mil — d'oraisa per twelve mil d'oraisa view; all the more karmelis on land. Thus although we may be lenient on water in all cases even walking on foot because not resembling desert encampment at all — on land even karmelis we should be stringent; although not fully resembling desert encampment — so appears to me.`,
    "1:ד": `From place he reached, etc. — from unspecified language it appears even merely by traveling he reached a place below ten he acquired residence there; difficult — Gemara 45b implies where continuously moving they do not acquire residence even below ten; so Tosafot; possibly distinguish ship is different — ship stationary, water moves beneath — as we find this reasoning Bava Metzia 9b. Later found Rashba challenged similarly on Gemara doubt regarding ship traveling above ten whether techum applies; they bring proof from Rabbi Gamliel's ship — see there: "I wonder — ship moves continuously; we say later water in clouds do not acquire residence because moving," etc.; one may say Rabbi Gamliel's ship all twilight was stationary; later found likewise Ramban innovations — even below ten in moving ship no leaving-techum issue because continuously moving — see there. Nevertheless from all Poskim who ruled definitively and Talmud language "traveling in thin air" — implies even by traveling he acquired residence — requires study for practice.`,
  },
  "output/siman_404/chokhmat-shlomo/part-001.txt": {
    "1:_": chokhmat,
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
