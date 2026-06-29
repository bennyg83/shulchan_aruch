#!/usr/bin/env node
/** Build siman436-part1.json and siman436-part2.json from hand translations */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { translateCite436 } from "./lib/translate-cite-436.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const PART1_SLUGS = [
  "mechaber",
  "mishnah-berurah",
  "machatzit-hashekel",
  "magen-avraham",
  "turei-zahav",
  "beer-hagolah",
  "baer-heitev",
];
const PART2_SLUGS = [
  "beur-hagra",
  "biur-halacha",
  "chok-yaakov",
  "eliyah-rabbah",
  "kaf-hachayyim",
  "peri-megadim",
  "chatam-sofer",
  "eshel-avraham",
  "ateret-zekenim",
  "rabbi-akiva-eiger",
  "yad-ephraim",
];

function handKey(slug, b) {
  const marker =
    slug === "mechaber" && (!b.marker || b.marker === "_") ? "main" : b.marker || "_";
  return `${slug}/${b.seif}:${marker}`;
}

/** @type {Record<string, string>} */
const HAND = {
  // —— mechaber ——
  "mechaber/1:main":
    "The laws of one who sets out to sea or travels by caravan. Contains 3 seifim. If one sets out from dry land to sea or goes out in a caravan and does not leave anyone in his home who will check for him within thirty days, he must check. (And he should not bless then on biur chametz) (Kol Bo). Before thirty days he need not check; and when Passover arrives he nullifies (Tur). And if his intention is to return before Passover, he must check and afterward go out, for we are concerned lest he return on the eve of Passover at bein hashemos and not have leisure to burn. Similarly one who makes his home a storehouse within thirty days must check, and afterward he may gather his store into it. Before thirty days, if his intention is to clear it before Passover he must check and afterward make it a store; and if he does not intend to clear it before Passover he need not check. {Rama: And a wheat storehouse that has wheat that leavened in the floor of the pit — if the storehouse was made thirty days before Passover he need not burn but nullifies in his heart and that suffices; however after Passover when clearing the storehouse it is forbidden to benefit from those wheats; and if there is no known chametz there but only doubt, it is permitted to sell the store thus together (Responsa Rashba siman 70).}",
  "mechaber/2:main":
    "Some say that before thirty days when there is no need to check — that is when he does not intend to return during Passover; even if his intention is to return before or after Passover he need not check since it is before thirty days; (and when Passover arrives he nullifies). But if his intention is to return during Passover he must check even from Rosh Hashanah. And if he forgot and did not check he nullifies when Passover arrives and should not bless on the nullification. {Rama: (Also his wife should check and nullify in his house lest he forget to nullify where he is) (Kol Bo).}",
  "mechaber/3:main":
    "An Israelite who leaves a gentile's house within thirty days and enters another house in that city or goes to another city need not burn in the gentile's house, for he fulfills the mitzva of biur in that other house. However if he sets out to sea or went in a caravan and does not enter a house for Passover, some say the obligation of biur applies to him since it is within thirty days, and he must burn in the gentile's house he is leaving to fulfill biur. {Rama: (even though the gentile will enter the house during Passover; and some say he need not when a gentile enters) (Tur).}",

  // —— mishnah-berurah ——
  "mishnah-berurah/1:א":
    "(1) And he does not leave anyone in his home, etc. — meaning he did not instruct someone before his journey to check when the time arrives; for if he appointed someone for this he need not check himself, for one's agent is like oneself; and it was already explained above siman 432 in Mishna Berurah that l'chatchila it is better to appoint men for bedika, and if he has none he may also appoint a woman for this.",
  "mishnah-berurah/1:ב":
    "(2) Within thirty days — and even if he does not intend to return at all until after Passover, he will not see the chametz in his house because from then on the obligation of bedika applies to him.",
  "mishnah-berurah/1:ג":
    "(3) He must check — on the night before he departs by candlelight, and then he must also nullify chametz he did not see as on the night of the 14th; and if he forgot to check at night he checks by day; and if he has small children at home and must leave chametz for them to eat and has no one to appoint for bedika, he takes them out of the house to another person's house and leaves food for them there, and locks his checked house so no one brings chametz there — otherwise what does his bedika accomplish; and if he leaves his wife and children and adult household members who have da'at and can check, he need not check anything before departing but instructs one of them to check and nullify chametz when the time arrives, as in s.k. 1; and see siman 434 that it is proper he also nullify himself where he is when nullification time arrives.",
  "mishnah-berurah/1:ד":
    "(4) And he should not bless then, etc. — for when one checks on the night of the 14th they enacted blessing on biur chametz because what he finds in bedika he conceals to burn tomorrow — thus bedika is the beginning of biur; not so here where he will not burn it ever but use it on other days, only removing it from this house.",
  "mishnah-berurah/1:ה":
    "(5) He need not check — for the enactment of the Sages does not apply to him; and if there is known chametz there some say he must burn before going out and some are lenient.",
  "mishnah-berurah/1:ו":
    "(6) He nullifies — where he is, for even though he does not see the chametz he transgresses bal yimatzei if he did not nullify from the outset (Gra).",
  "mishnah-berurah/1:ז":
    "(7) His intention to return before Passover — and all the more if his intention is to return during Passover.",
  "mishnah-berurah/1:ח":
    "(8) He must check — and even if he left at the beginning of the year he must check (Acharonim), and even if he already nullified he must check lest he return, find chametz, and eat it.",
  "mishnah-berurah/1:ט":
    "(9) We are concerned lest, etc. — specifically one who sets out to sea or goes in a caravan on a distant road; even if he intends to return long before Passover we are concerned he may delay; but one going on a near road even within thirty days we are not concerned; nevertheless everything is according to circumstances — sometimes even on a near road if he limits his arrival narrowly near bedika time we are concerned he may delay and must check beforehand; some are lenient in this; in practice one should decide according to nearness and distance of the place.",
  "mishnah-berurah/1:י":
    "(10) And he will not have leisure to burn — meaning on Yom Tov he cannot burn because chametz is not burned on Yom Tov, and he would keep chametz in his house.",
  "mishnah-berurah/1:כ":
    "(11) Storehouse — even if there is no known chametz there but it is a place where chametz was used and he now wishes to place grain there for some time or wood and the like.",
  "mishnah-berurah/1:ל":
    "(12) He must check — even if he does not intend to clear it until after Passover so chametz will not be seen on Passover; nevertheless the obligation of bedika applied beforehand since it is within thirty days; and if he did not check before he must clear the store and check.",
  "mishnah-berurah/1:מ":
    "(13) He must check — for the Sages were concerned lest he begin clearing before the night of the 14th and not finish, leaving less than three tefachim covered on the chametz so it is not as burned; then when the night of the 14th arrives he forgets chametz under the store since it is hidden from sight.",
  "mishnah-berurah/1:נ":
    "(14) And if he does not intend, etc., before Passover — but after Passover.",
  "mishnah-berurah/1:ס":
    "(15) He need not check — before thirty days the obligation of bedika does not apply; afterward when the storehouse is made it is as burned like chametz on which a collapse fell and nullification when Passover arrives suffices, as above; and Magen Avraham wrote all this regarding unknown chametz, but for known chametz he must burn from the outset; some are lenient even for known chametz, as in s.k. 5.",
  "mishnah-berurah/1:ע":
    "(16) That there is leavened wheat — meaning there were leavened wheats there and afterward he placed the storehouse over them; nevertheless he need not burn since the storehouse was made before thirty days and he only nullifies before Passover; but if he placed the wheat and afterward the wheat leavened from the pit's moisture, even if placed within thirty days he need not clear it — for when he placed the wheat there was not yet chametz, and now it is like chametz on which a collapse fell (and all the more when there is doubt whether they leavened), and he nullifies before Passover.",
  "mishnah-berurah/1:פ":
    "(17) Forbidden to benefit, etc. — for although chametz on which a collapse fell is permitted to benefit after Passover, here it is worse: there he does not intend to clear the mound and dig after Passover, but here he intends to clear his pit after Passover — it is as nullified with intent to return and acquire; plainly he may sell the entire storehouse to a gentile before Passover and afterward benefit is permitted.",
  "mishnah-berurah/1:צ":
    "(18) And if there is no known chametz — meaning when he placed the storehouse from above it was not known whether leavened wheat was then in its floor.",
  "mishnah-berurah/1:ק":
    "(19) The storehouse — after Passover there is nothing to fear: even if he now finds leavened grain perhaps it leavened after Passover; also perhaps it is only spoilage and loss, not chametz.",
  "mishnah-berurah/2:א":
    "(20) And some say that before, etc. — this view comes to be lenient; the wording is somewhat unclear — meaning what we said that before thirty days he need not check applies even when he intends to return before Passover, only that he should not intend to return during Passover; this view does not hold what was written above that we are concerned lest he come on the eve at bein hashemos, etc.",
  "mishnah-berurah/2:ב":
    "(21) Since it is before thirty — but within thirty when bedika obligation applies, even if he intends to return home before Passover we are concerned he may delay and not come, and therefore needs bedika; and it was explained above in s.k. 1 that all this is for one setting out to sea or caravan on a distant road; but on a near road with intent to return before Passover we are not concerned and rely that he will check when he arrives.",
  "mishnah-berurah/2:ג":
    "(22) And when Passover arrives he nullifies — meaning when he did not come home before Passover.",
  "mishnah-berurah/2:ד":
    "(23) He must check — for when he comes during Passover it is not in his possession to nullify and he transgresses bal yera'eh and bal yimatzei; know that according to this view the same applies to one who makes his home a storehouse — according to the first view bedika obligation depends on intent to clear before Passover; according to this view only if he intends to clear during Passover (Beit Yosef); for practical halacha many Acharonim ruled to be stringent like the first view; nevertheless in pressing circumstances such as leaving with the caravan one may rely on the latter view if he does not intend to come during Passover.",
  "mishnah-berurah/2:ה":
    "(24) And if he forgot and did not check — if he checked he would have had to nullify at the time of bedika as written at the beginning of the siman.",
  "mishnah-berurah/2:ו":
    "(25) And he should not bless — for the essence of nullification is in the heart; one does not bless on matters of the heart (Magen Avraham).",
  "mishnah-berurah/3:א":
    "(26) He need not burn in the gentile's house, etc. — even if the gentile will not enter before Passover; the reason as below (Rabbi Akiva Eiger).",
  "mishnah-berurah/3:ב":
    "(27) For he fulfills mitzvas biur, etc. — this is not the main reason; one with several houses is not obligated to check only one; rather since he leaves the gentile's house not intending to return he presumably declares hefker his chametz left there — as throwing in the street — it is no longer his and he does not transgress bal yera'eh; nevertheless if he will not enter another house before Passover, as setting out to sea or caravan, some say since he is within thirty days he must fulfill bedika before leaving while the chametz is still his; not so here where he enters another house and fulfills biur there — no reason to obligate him.",
  "mishnah-berurah/3:ג":
    "(28) In that other house — either he himself or the homeowner where he stays is like his agent to burn his chametz, and one's agent is like oneself (Acharonim).",
  "mishnah-berurah/3:ד":
    "(29) And he must burn in the gentile's house, etc. — if he leaves an Israelite's house and another Israel enters, all agree he need not check for the second Israel has biur obligation; likewise leaving a gentile's house when another Israel enters to dwell — he need not check and the second Israel is obligated.",
  "mishnah-berurah/3:ה":
    "(30) Even though the gentile will enter during Passover — and bring chametz there anyway, nevertheless the Israelite must check his chametz; all the more when the gentile will not enter.",
  "mishnah-berurah/3:ו":
    "(31) And some say he need not, etc. — for biur is not a personal obligation but whoever has chametz must check and burn; here he has no chametz for he declares it hefker as above — no obligation on him.",
  "mishnah-berurah/3:ז":
    "(32) When the gentile enters — see Kaf HaChayim that not specifically; even if no gentile enters he is not obligated since the Israelite declared his chametz hefker as above; for practical halacha there are opinions among Acharonim whether like the Mechaber or like the view in Rama; it seems if a gentile enters one may be lenient. Regarding whether he must check on the night of the 14th rooms he intends to sell tomorrow to a gentile with their chametz — Acharonim differ: Mekor Chayim and Chayei Adam say he must check since the rooms are not yet sold and remain in Israel's possession, even if sold the gentile has not yet taken possession and the key remains with the owner; Binyan Olam responsum 20 disagrees — no bedika needed since selling tomorrow to a gentile fulfills tashbitu and biur, no worse than chametz found after bedika left for food tomorrow; likewise Chatam Sofer responsum 131 lenient when fulfilling bedika in other rooms; Eshel Avraham wrote lenient seems correct and such is custom — see there; but he must be careful at sale to sell the room and all chametz in it (including in holes and cracks), not sell the room and wages therein stam (Pitchei Teshuvah); nevertheless one should not protest those lenient who sell on the 13th. Acharonim wrote: all thirty days one must examine everything he does lest chametz remain in a way hard to remove.",
};

// Load extended translations from companion module
const { HAND_EXT } = await import("./_build-siman436-hand-ext.mjs");
Object.assign(HAND, HAND_EXT);

function buildPart(slugs) {
  const out = {};
  const missing = [];
  for (const slug of slugs) {
    const fp = path.join(ROOT, "output", "siman_436", slug, "part-001.txt");
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    for (const b of blocks) {
      const k = handKey(slug, b);
      let en = HAND[k];
      if (!en && slug === "beer-hagolah") en = translateCite436(b.he);
      if (!en) missing.push(k);
      else out[k] = en;
    }
  }
  return { out, missing };
}

const r1 = buildPart(PART1_SLUGS);
const r2 = buildPart(PART2_SLUGS);

fs.writeFileSync(path.join(__dirname, "siman436-part1.json"), JSON.stringify(r1.out, null, 2) + "\n");
fs.writeFileSync(path.join(__dirname, "siman436-part2.json"), JSON.stringify(r2.out, null, 2) + "\n");

console.log("PART1 keys:", Object.keys(r1.out).length, "missing:", r1.missing.length);
console.log("PART2 keys:", Object.keys(r2.out).length, "missing:", r2.missing.length);
console.log("TOTAL:", Object.keys(r1.out).length + Object.keys(r2.out).length);
if (r1.missing.length) console.log("MISSING_P1:", r1.missing.join(", "));
if (r2.missing.length) console.log("MISSING_P2:", r2.missing.join(", "));
