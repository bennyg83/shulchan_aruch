import fs from 'fs';
import path from 'path';

const p = path.join(process.cwd(), 'output/siman_217/mechaber/part-001.txt');
let t = fs.readFileSync(p, 'utf8');

const replacements = [
  [
    /The immigrant from China[\s\S]*?grows in the garden\r?\n/,
    `One who vowed from groats is forbidden in thick groats stew (meaning: thick, heavy soup of groats); from the stew he is permitted in groats. From the stew he is forbidden in garlic; from garlic he is permitted in the stew. From spices he is forbidden in raw spices and permitted in cooked spices. And if he said, "Konam spices that I taste," he is forbidden in raw and cooked spices. From cabbage he is forbidden in asparagus (Rambam and Rashi explained: a type of water in which cabbage was cooked; Rashi explained: a type of cabbage); from asparagus he is permitted in cabbage. From chicory he is permitted in capers. From "vegetable" he is permitted in field vegetables, because it is an accompanying name (Mishna, perek of one who vows from cooked food) (for in common speech they do not call "vegetable" without specification except vegetables that grow in gardens) (Beit Yosef and Rashi there in explanation of the Mishna).\n`,
  ],
  [
    /The sweater from the milk[\s\S]*?between land:\r?\n/,
    `One who vowed from milk is permitted in whey (meaning: water separated from milk when it is curdled, called sirvo) (Rambam, perek 9 of Nazir, halacha 8). And there is one who says that if they call whey by the name of milk, such as if they call it "whey of milk," it is forbidden (Tur and Beit Yosef in the name of Ran). From milk he is permitted in cheese; from cheese he is permitted in milk; and he is forbidden in it whether salted, unripe, moist, or dry.\n`,
  ],
  [
    /It is arranged from oil[\s\S]*?both of them:\r?\n/,
    `One who vowed from oil — if it is in a place where they rely on olive oil, he is forbidden in it and permitted in sesame oil. And if it is in a place where they rely on sesame oil, he is forbidden in it and permitted in olive oil. And if they rely on both, he is forbidden in both, even if most of their supply is from one of them.\n`,
  ],
  [
    /The order from the grain[\s\S]*?the sample:\r?\n/,
    `One who vowed from grain, or one who vowed from alalta, is forbidden only in the five species. And the same law applies to one who vows from dagan.\n`,
  ],
  [
    /The candle map is not[\s\S]*?water and salt:\r?\n/,
    `One who vows from bread without specification is forbidden only in bread of wheat and barley. And in a place where they are accustomed to make bread from every kind of matter, and he vowed from bread or from food — he is forbidden in the five species. And if he said, "All sustenance is upon me," he is forbidden in everything except water and salt.\n`,
  ],
  [
    /The candles of the needles[\s\S]*?language of men\r?\n/,
    `One who vows from wheat is forbidden in it whether raw or cooked. "Wheat, wheat that I do not taste" — he is forbidden in them whether flour or bread. "Wheat that I do not taste" — he is forbidden in what is baked from it and permitted in a cup of wheat. "Wheat, wheat that I do not taste" — he is forbidden whether in what is baked from it or in a cup. {Rama: One who says, "Bread of wheat, barley, and spelt is upon me" — he is forbidden only in bread of wheat, bread of barley, and bread of spelt, for "bread" that he said refers to all of them (Ran, perek Shevuos Shetayim). And some are stringent to forbid barley and spelt entirely, unless he says that his intention was only bread, or the language of people in that city is known — then we follow the language of people (so Ran in the name of Ramban).}\n`,
  ],
  [
    /Jessss that I am drowning[\s\S]*?life and shame:\r?\n/,
    `"Groats that I taste" — he is forbidden to eat them cooked and permitted to eat them raw. "Groats that I taste" — he is forbidden to eat them raw and permitted to eat them cooked. "Groat, groats that I taste" — he is forbidden to eat them whether raw or cooked.\n`,
  ],
  [
    /This year's fruit is forbidden[\s\S]*?must not all:\r?\n/,
    `One who vows from the fruits of the year is forbidden in all the fruits of the year; and permitted in kids, lambs, milk, eggs, and chicks. And if he said, "Growth of the year is upon me," he is forbidden in all of them.\n`,
  ],
  [
    /The order from the fruits of the land[\s\S]*?for everyone:\r?\n/,
    `One who vows from the fruits of the land is forbidden in all the fruits of the land and in tree fruit; and permitted in mushrooms and truffles. And if he said, "Growth of the ground is upon me," he is forbidden in all of them.\n`,
  ],
  [/The summer is not prohibited but from the Iranians:\r?\n/, `One who vows from summer is forbidden only in figs.\n`],
  [
    /The candles from the water drawn[\s\S]*?by his name:\r?\n/,
    `One who vows from water flowing from such-and-such a spring is forbidden in all the rivers that are fed from it; needless to say regarding what flows from it, even if its name changed and they call it only "such-and-such a river" or "such-and-such a spring." And if he said, "From such-and-such a river," or "from such-and-such a spring," he is forbidden only in what is called by its name.\n`,
  ],
  [
    /The order of pleasure from a kind[\s\S]*?warm innocence:\r?\n/,
    `One who vows benefit from a spring may immerse in it for a mitzvah immersion in the rainy season, but not in the hot season.\n`,
  ],
  [
    /The sweaters are allowed in a bag[\s\S]*?cover them\):\r?\n/,
    `One who vows from clothing is permitted in a sack, sheet, and chlamilah (meaning: coarse types of garments that people do not normally use for clothing).\n`,
  ],
  [/The order from the house is forbidden from the leaf allowed at home:\r?\n/, `One who vows from a house is forbidden in its attic; from the attic he is permitted in the house.\n`],
  [
    /The order from the city is not allowed[\s\S]*?mother and songs:\r?\n/,
    `One who vows from a city is forbidden to enter its ibbur — meaning, within seventy amot and remnants.\n`,
  ],
  [
    /The ventilator from the house[\s\S]*?map is permitted:\r?\n/,
    `One who vows from a house is forbidden only from the wing inward — meaning, from the door closure inward; but from the door closure outward, including the thickness of the threshold, is permitted.\n`,
  ],
  [
    /The vowing to stand at Beit A[\s\S]*?purchase of the rebels\r?\n/,
    `One who swore to stand in house A is forbidden from the wing outward. {Rama: One who vowed to dwell in the Jewish quarter must dwell in the large quarter and on its street, for such is the language of people; we do not say that three houses are called a quarter (Beit Yosef, siman 228, daf 274, end of side b, in the name of responsum of Rashba). A community that decreed not to buy houses from idolaters — it is forbidden to exchange with them as well, for this too is called buying and selling (Mordechai, perek HaMekabel).}\n`,
  ],
  [
    /The city's inhabitants are not allowed[\s\S]*?different word:\r?\n/,
    `One who vows from the inhabitants of a city is forbidden in one who sat there thirty days; from the sons of the city he is forbidden only in one who sat there twelve months. {Rama: And if he vowed from one who dwells there, even a temporary residence is called residence (Rashba, siman 267). However, we follow the language of people: "residence" is not called residence unless he dwells there with the members of his household in a fixed manner, even if it is less than forty days; and if the language of people is different, we follow it according to the intention of the one who vowed.}\n`,
  ],
  [
    /Vander of the seas is not allowed[\s\S]*?dry inhabitants:\r?\n/,
    `One who vows from sea-goers is forbidden in all sea-goers, even those who go only from Akko to Jaffa, and even those who go down to stroll; and permitted in land dwellers.\n`,
  ],
  [
    /Land inhabited vows are also forbidden[\s\S]*?annexed to the land:\r?\n/,
    `One who vows from land dwellers is forbidden also in sea-goers, even those who sail far who ultimately descend to dry land.\n`,
  ],
  [
    /He said that the sea descenders[\s\S]*?Lord of the Sea:\r?\n/,
    `If he said, "Sea-goers after thirty days are upon me" — whoever is a sea-goer at the time of the vow is forbidden to him; and whoever is not a sea-goer at the time of the vow is permitted to him, even if after thirty days, when the vow takes effect, he becomes a sea-goer.\n`,
  ],
  [
    /Vander of the wise men[\s\S]*?name of the deceased\)\r?\n/,
    `{Rama: And even if he says he did not intend thus, it does not help (Beit Yosef in the name of Raash), since the language is certainly so. And he is permitted in everything that is not a living being, even though the sun sees it (Beit Yosef in the name of Tosafot).} And if he vowed from re'im hachamah (sun-seers), he is permitted regarding the blind.\n`,
  ],
  [
    /Wander of the head's rashes[\s\S]*?name of the ship\r?\n/,
    `One who vows from black-haired people is forbidden in bald people and bearded people, and permitted in women and minors, for only men are called black-haired. And if their custom is to call all people black-haired, he is forbidden in all. {Rama: One who vows from everything red is forbidden to see the sun as well, since it too is red (Nimukei Yosef, perek of one who sells a ship; and Tosafot there, daf 74a; and Chiddushei Ramban there).}\n`,
  ],
  [/The sweater is not in the headlines:\r?\n/, `One who vows from Shabbat-desecrators is forbidden even in Kutim.\n`],
  [/Henderson of Jerusalem is prohibited[\s\S]*?the headlines:\r?\n/, `One who vows from Jerusalem ascenders is forbidden in Israelites and permitted in Kutim.\n`],
  [
    /Neander is prohibited[\s\S]*?Aikiel and made:\r?\n/,
    `One who vows from sons of Noah is forbidden in the nations of the world and permitted in Israel. One who vows from the seed of Avraham is forbidden in Israel and in converts, and permitted in the nations of the world, even in the sons of Ishmael and Esau.\n`,
  ],
  [/Hashem's people are forbidden from Hashem's people and Hashem's people\r?\n/, `One who vows from the uncircumcised is forbidden in circumcised members of the nations of the world and permitted in uncircumcised Israelites.\n`],
  [/Hashem's people are not allowed in the land of Israel[\s\S]*?nations of the world:\r?\n/, `One who vows from the circumcised is forbidden in uncircumcised Israelites and permitted in circumcised members of the nations of the world.\n`],
  [/Wander from Israel is prohibited in migrant villages permitted in Israel:\r?\n/, `One who vows from Israel is forbidden in converts; from converts he is permitted in Israel.\n`],
  [/vows from Israel are not permitted in the priests[\s\S]*?permitted in Israel:\r?\n/, `One who vows from Israel is forbidden in priests and Levites; from priests and Levites he is permitted in Israel.\n`],
  [/The cylinders are allowed in dirty liners:\r?\n/, `One who vows from priests is permitted in Levites; from Levites he is permitted in priests.\n`],
  [/Henderson buildings are allowed in boys:\r?\n/, `One who vows from sons is permitted in grandsons.\n`],
  [/Those who vowed to swear on anything other than Hashem's word[\s\S]*?\(See also:\)\r?\n/, `One who vowed or swore regarding a matter besides moedim and Yom Tov — if he says that his intention was to exclude Chanukah and Purim from the general category, he is believed. (And see in Orach Chayim, siman 570.)\n`],
  [
    /Those who vowed to not laugh[\s\S]*?sign of the IDF\)\r?\n/,
    `One who vowed or swore that he would not laugh any laughter is forbidden to cast lots and to gamble with any person on his account; and likewise forbidden to wager with his fellow in what they call apostat. (Responsum Chazeh HaTenufah.) {Rama: A community that decreed not to pray in a minyan on account of some matter — they are forbidden to read from the Torah, for every holy matter is called prayer (Responsum of Raash, kelal 3, siman 9). One who vowed not to accept a deposit is forbidden to lend on a pledge to an Israelite (Maharil). However, it appears that we follow his intention, as will be explained in siman 218 (my humble opinion). One who vowed or swore to fast a set number of days, and an obligatory fast occurred — it counts for him toward the number of days. And likewise one who vowed to go to the cemetery or to a place, and it happened that he went there on business — he has fulfilled his vow (Responsum of Maharil, siman 118). And see above, siman 239, more on this.}\n`,
  ],
];

let n = 0;
for (const [re, rep] of replacements) {
  if (re.test(t)) {
    t = t.replace(re, rep);
    n++;
  } else {
    console.warn('NO MATCH:', String(re).slice(0, 60));
  }
}
fs.writeFileSync(p, t);
console.log('Applied', n, 'of', replacements.length);
