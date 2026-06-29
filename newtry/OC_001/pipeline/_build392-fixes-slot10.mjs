#!/usr/bin/env node
/** Build siman 392 fixes from hand JSON + translation map */
import fs from "fs";

const hand = JSON.parse(fs.readFileSync("pipeline/work/hand-slot10-siman-392.json", "utf8"));
const transPath = "pipeline/work/trans392-slot10.json";
const trans = fs.existsSync(transPath) ? JSON.parse(fs.readFileSync(transPath, "utf8")) : {};

const mech = {
  "1:main":
    "Laws of city eruvin. Containing 8 seifim. A city that was individual acquisition — even if became public — all join one shituf and carry entire area. Similarly if public with one opening — all one shituf. But if public with two openings people enter one exit other — even if became individual — do not eruv entire city; leave one place even one courtyard and house inside; join rest; participants permitted entire city except place left; those remaining permitted their place via shituf they make themselves. If remaining many — forbidden carry rest of city; this for recognition so know eruv permitted carry this city many pass through; place left not joined — carry only these for themselves those for themselves. If wish eruv each alleyway alone — certainly helps no greater shiyur than this. {Rama: Must make between them two lechayayim two tefachim; if ten amot wide need tzurat hapetach (Tur):}",
  "2:main":
    "City of many with one opening and ladder elsewhere — eruv entire city no shiyur needed; ladder in wall not considered opening; even many ladders side by side until ten amot wide not considered opening. If two openings and garbage heap before one — as if only one opening.",
  "3:main":
    "Houses left as shiyur even if not open to city — backs to city faces outside; even one house e.g. cattle barn or straw barn not needing eruv — make shiyur and eruv rest.",
  "4:main":
    "City all residents joined except one alleyway — forbids all. If built marker on alleyway opening — does not forbid. Therefore city individual acquisition even became many — do not eruv half; either all or alleyway by alleyway building marker on opening if wish divide reshut lest forbid other alleyways.",
  "5:main":
    "In what cases said cannot eruv half — city surrounded high wall ten handbreadths with doors; but if entire city not fit partitions and they came fit half and eruv — permission in their hands.",
  "6:main":
    "What we said cannot eruv half — lechi and koreh do not help separate them; but pas four amot or two lechayayim two tefachim divide and eruv half; if wider than ten amot make tzurat hapetach. {Rama: Or partition ten high at alleyway opening (Tur); some say individual city forbidden divide lengthwise since both need go to reshut ha-rabbim inside; but widthwise each exits this gate and that without foothold on each other — eruv half and correction between as siman 363 until ten lechi or koreh; more than ten tzurat hapetach (Hagahot Maimoniyot ch. 5 Laws of Eruvin, Rosh, Tur):}",
  "7:main": "City of many diminished to fifty dwellings — no shiyur needed.",
  "8:main":
    "One acquiring shituf for all city residents — if all one eruv need not inform them acquisition is theirs. Law one forgot not join or went dwell other city or gentile with them in city — all laws as courtyard and alleyway.",
};

const fixes = {};
let miss = 0;
for (const it of hand.items) {
  if (!fixes[it.rel]) fixes[it.rel] = {};
  const id = `${it.rel}|${it.key}`;
  if (it.rel.startsWith("mechaber/") && mech[it.key]) fixes[it.rel][it.key] = mech[it.key];
  else if (trans[id]) fixes[it.rel][it.key] = trans[id];
  else {
    miss++;
    fixes[it.rel][it.key] = it.hePlain.replace(/"/g, "'");
  }
}

const lines = ['/** worker-slot-10 — siman 392 editorial fixes (149 blocks) */', "export const FIXES = {"];
for (const [rel, obj] of Object.entries(fixes).sort()) {
  lines.push(`  "${rel}": {`);
  for (const [key, val] of Object.entries(obj)) {
    lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(val)},`);
  }
  lines.push("  },");
}
lines.push("};", "");
fs.writeFileSync("pipeline/_fixes-siman392-slot10.mjs", lines.join("\n"), "utf8");
console.log("written fixes, missing trans:", miss);
