#!/usr/bin/env node
/** Generate mechaber main-block fixes from Hebrew for slot16 need list */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const need = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "work", "need-slot16-compact.json"), "utf8")
);
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output");

const MECH = {
  604: {
    "1:main":
      "The order of Erev Yom Kippur. It contains 2 seifim: It is a mitzva to eat on Erev Yom Kippur and to increase at the meal. {Rama: And it is forbidden to fast on it even a taanit chalom (Maharil), and if one vowed to fast on it see above siman 570 seif 2.}",
    "2:main":
      "They do not fall on their faces on Erev Yom Kippur. {Rama: Also they do not say Lamenatzeach and Mizmor leTodah (Minhagim); also they do not say many selichot before dawn, and some places are accustomed to increase selichot, and all is according to custom. Regarding saying Avinu Malkeinu on Erev Yom Kippur there is dispute among acharonim; my city's custom is not to say it except when Yom Kippur falls on Shabbat when Avinu Malkeinu is not said — then they say it on Erev Yom Kippur at shacharit.}",
  },
  605: {
    "1:main":
      "The custom of kapparot on Erev Yom Kippur. It contains one seif: What people are accustomed to do for atonement on Erev Yom Kippur — to slaughter a rooster for each male and recite verses over it — some refrain from the custom. {Rama: And some Geonim wrote this custom and many acharonim wrote it, and so is practiced in all these lands, and one should not change it, for it is an established custom. They are accustomed to take a male rooster for a male and for a female a hen (Beit Yosef in name of Tashbetz); for a pregnant woman they take two roosters lest she bear a male. They choose white roosters as it says 'if your sins are like scarlet they shall be white as snow'; they give the kapparot to the poor or redeem them with money given to the poor (Maharil).}",
  },
  607: {
    "1:main":
      "The order of vidui at minchah on Erev Yom Kippur. It contains 6 seifim: One must confess at minchah before the interrupting meal. {Rama: An individual says it after finishing his prayer; the shaliach tzibbur says it on Yom Kippur within the prayer (Tur).}",
    "2:main":
      "One need not specify the sin; if he wishes to specify he may. If he confesses quietly it is proper to specify the sin. {Rama: But when praying aloud or when the shaliach tzibbur repeats the prayer he should not specify the sin; what they say on 'for the sin' in aleph-bet order is not called specifying since all say equally — it is only prayer formula (my opinion).}",
    "3:main":
      "One must confess standing; even if he already confessed when hearing the shaliach tzibbur he must stand. {Rama: He should confess again with the shaliach tzibbur (Ran chapter 2 Rosh Hashanah); the essence of vidui is 'but we have sinned' (Tur).}",
    "5:main":
      "In minchah prayer on Erev Yom Kippur he does not conclude with vidui after it. {Rama: The shaliach tzibbur does not repeat vidui at minchah but prays Shemoneh Esreh like other days of the year (Tur and Mordechai); they do not say Avinu Malkeinu (custom of 514); certainly not tachanun.}",
    "6:main":
      "The entire congregation receives forty lashes after minchah prayer so that one put it to heart to repent from sins in his hand. {Rama: Custom that the one lashed says vidui while being lashed and the lasher says 'and He is merciful atones iniquity' three times — thirty-nine words corresponding to thirty-nine lashes (Minhagim). Custom to lash with any strap as only a reminder of lashes; take a calf strap as it says 'the ox knows its purchaser' (Kol Bo). The lashed should not stand or sit but lean (Minhagim), face north and back south (Maharil). Yom Kippur atones only for those who repent believing in its atonement; one who scoffs and thinks what does this Yom Kippur avail him — it does not atone (Rambam chapter 3 laws of teshuva).}",
  },
  606: {
    "1:main":
      "A person should appease his fellow on Erev Yom Kippur. It contains 4 seifim: Sins between man and his fellow — Yom Kippur does not atone until he appeases him, even if he did not anger him with action but only with words he must appease him. If he is not appeased the first time he returns a second and third time, each time taking three men with him. If he is not appeased after three times he is not obligated toward him (however he should later say before ten that he sought forgiveness) (Mordechai Yoma and Maharil). If the other is his teacher he must go to him many times until he is appeased. {Rama: And one who forgives should not be cruel in forgiving (Maharil) unless he intends for the benefit of the one seeking forgiveness (gemara Yoma).}",
    "2:main":
      "If one against whom he sinned died, he brings ten men and stands them at his grave and says: I sinned against the God of Israel and against so-and-so whom I wronged. (It is customary to seek forgiveness on Erev Yom Kippur) (Mordechai Yoma).",
    "3:main": "An enactment of the early ones and a cherem not to speak ill of the dead.",
    "4:main":
      "He may immerse and scour himself whenever he wishes provided it is before night, and he does not bless on the immersion. {Rama: He need not immerse more than once without vidui because of keri, and the same for pouring nine kavim of water (Mahariv, Kol Bo, Tashbetz). One who had a relative die between Rosh Hashanah and Yom Kippur may wash and immerse on Erev Yom Kippur, for Yom Kippur cancels shiva (Maharil laws of mourning); even though they are accustomed not to wash all thirty days, immersion for a mitzva is permitted (his own opinion).}",
  },
  608: {
    "2:main":
      "Women who eat and drink until dark and do not know it is a mitzva to add from chol onto kodesh — one does not rebuke them lest they come to do so intentionally. {Rama: The same law for any prohibited matter — we say better they be inadvertent than intentional; specifically what is not explicit in Torah even if d'oraisa; but if explicit in Torah one rebukes him (Ran chapter 4 Beitzah and Rosh in name of Ittur). If he knows his words are not heeded he should not speak publicly to rebuke but once; he should not multiply rebukes once he knows they will not listen, but privately he must rebuke until they strike him or curse him (Ran end of HaBayit).}",
  },
  609: {
    "1:main":
      "Insulating hot food on Erev Yom Kippur. It contains one seif: It is permitted to insulate hot food from Erev Yom Kippur for motzaei Yom Kippur. {Rama: And some say one should not insulate on Yom Kippur (see Tur), and so is the custom in these lands (Maharil).}",
  },
  610: {
    "4:main":
      "It is customary in all places to increase lights in synagogues and to spread fine garments in the synagogue. {Rama: It is customary that every person great or small makes a candle for himself (Mordechai and Mahariv); also a ner neshama for father and mother who died (Kol Bo), and this is proper as some rabbis wrote. If these lights go out on Yom Kippur one does not tell a non-Jew to relight them (Maharil). One whose candle went out on Yom Kippur relights it at motzaei Yom Kippur and does not extinguish it again but leaves it burning until consumed; also accepts that all his days he will not extinguish his candle at motzaei Yom Kippur — neither his nor another's (so found in old minhagim). Some say one spreads tablecloths on Yom Kippur like Shabbat (Mordechai and Maharil).}",
  },
  611: {
    "2:main":
      "Every melacha for which one is liable on Shabbat one is liable on Yom Kippur; and everything exempt on Shabbat but forbidden is likewise on Yom Kippur — except on Shabbat intentional is stoning and Yom Kippur intentional is karet. Whatever is forbidden to move on Shabbat is forbidden on Yom Kippur. They permitted trimming vegetables and cracking nuts from minchah onward when it falls on a weekday; nowadays they are stringent. {Rama: If a fire broke out in the synagogue on Yom Kippur one may save one meal for the night as on Shabbat for minchah meal (Ran end of Kol Kitvei); already explained siman 334 how we act now for fire on Shabbat, and the same on Yom Kippur. They are accustomed for children to play with nuts (Agudah and Maharil) and one does not protest even if they do so not for need of the day.}",
  },
  612: {
    "4:main": "The measure of eating half a loaf — some say four eggs and some say three eggs (laughing Rashba).",
    "6:main":
      "If he ate foods unfit for eating or coarse eating such as immediately after the meal he ate on Erev Yom Kippur until he was disgusted with food — he is exempt. {Rama: If he ate spiced foods or seasoned foods he is liable, for it is common to season — and it is forbidden on Yom Kippur to taste something to spit out even spices; see above siman 567 gloss.}",
    "9:main":
      "One who drinks on Yom Kippur a full cheekful is liable; we estimate for each person according to his size — the large according to his largeness and the small according to his smallness. Not a full cheekful literally but enough that he moves it to one side in his mouth and it appears as a full cheekful, which is less than a revi'it for an average person. All liquids combine for the measure. {Rama: If he drank liquids unfit for drinking such as brine, fish sauce, or undiluted vinegar he is exempt; but diluted vinegar he is liable (Tur).}",
    "10:main":
      "If he drank a little and drank again — if from the start of the first drinking until the end of the last drinking is the time to drink a revi'it, they combine for the measure; if not they do not combine. Some say the time to combine drinks is the time to eat half a loaf, like combining eating. {Rama: It is permitted on Yom Kippur to touch foods and liquids to give to children; we are not concerned lest he eat or drink if he touches (Terumat HaDeshen siman 147).}",
  },
};

const fixes = {};
for (const n of need) {
  if (!n.rel.startsWith("mechaber/")) continue;
  const m = MECH[n.siman]?.[n.key];
  if (!m) {
    const fp = path.join(OUT, `siman_${n.siman}`, n.rel);
    const b = parseBlocksInFile(fs.readFileSync(fp, "utf8")).find(
      (x) => `${x.seif}:${x.marker || "_"}` === n.key
    );
    console.error("missing mech", n.siman, n.key, plainFromHtml(b?.he || "").slice(0, 80));
    process.exit(1);
  }
  if (!fixes[n.siman]) fixes[n.siman] = {};
  if (!fixes[n.siman][n.rel]) fixes[n.siman][n.rel] = {};
  fixes[n.siman][n.rel][n.key] = m;
}

for (const [s, data] of Object.entries(fixes)) {
  const fp = path.join(path.dirname(fileURLToPath(import.meta.url)), `_fixes-siman${s}-manual-slot16.mjs`);
  let existing = {};
  if (fs.existsSync(fp)) {
    const mod = await import(pathToFileURL(fp).href + "?v=" + Date.now());
    existing = mod.FIXES || {};
  }
  for (const [rel, blockFixes] of Object.entries(data)) {
    if (!existing[rel]) existing[rel] = {};
    Object.assign(existing[rel], blockFixes);
  }
  fs.writeFileSync(
    fp,
    `/** worker-slot-16 — siman ${s} manual fixes */\nexport const FIXES = ${JSON.stringify(existing, null, 2)};\n`,
    "utf8"
  );
  console.log("wrote", fp, Object.values(existing).reduce((a, r) => a + Object.keys(r).length, 0), "keys");
}
