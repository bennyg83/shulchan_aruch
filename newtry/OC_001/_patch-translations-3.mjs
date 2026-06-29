import fs from "fs";

const path = "_siman105-199-stragglers-translations.mjs";
let t = fs.readFileSync(path, "utf8");
t = t.replace(
  /according to the method of Magen Avraham/g,
  "per the method of Magen Avraham",
);
const new179 =
  "Seif 5 — those who read in the house of the homeowner to eat kinds of fruits. NB: see in Taz who argues on this law, and in Avodat Rachel he rules like Shulchan Aruch; and in my humble opinion it seems the law is with Taz, for even if the intent of Tosafot is as Beit Yosef understood and as Peri Megadim wrote that so is our reading in the Gemara — their words themselves are astounding: for certainly what relevance does the homeowner's reliance have there? Within the meal we do not require his intent certainly, and even if he did not have intent it is permitted to eat within the meal; only where he explicitly removed himself from eating it is forbidden to eat more. Therefore automatically the homeowner's reliance is a doubt and he does not make removal, and it remains stam as if they did not say 'give us and we will bless.' But regarding fruits — if those from the first courses are not before him, then by law he must bless on them; only if one says he had explicit intent he need not bless on them. And from where is it derived that the homeowner's reliance creates intent to be as if he certainly intended? Perhaps he does only a doubt or stam. Therefore the essential ruling is like Taz. And what Avodat Rachel wrote — safek berachot lehakel — this is astounding, for that applies where it is not a berachah of enjoyment, or even in a berachah of enjoyment if he already ate — for Birkat HaMazon he cannot exempt in another matter. But before the berachah, neither to exempt nor to bless if he has a doubt — examine well.";
t = t.replace(
  /"179\|chokhmat-shlomo\|5\|_": "[^"]*",/,
  `"179|chokhmat-shlomo|5|_": ${JSON.stringify(new179)},`,
);
fs.writeFileSync(path, t);
console.log("ok");
