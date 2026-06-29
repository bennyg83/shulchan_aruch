import fs from "fs";
import { autoFix } from "./_slot16-lib.mjs";
const hand = JSON.parse(fs.readFileSync("pipeline/work/hand-slot16-siman-621.json", "utf8"));
const en =
  'In Musaf the prayer leader recites the order of the sacrificial service. {Rama: It is customary to fall on their faces when saying "and the Kohanim and the people," and also at Aleinu leShabeach; but the prayer leader is forbidden to leave his place during prayer to fall on his face, and one should protest those who do so.}';
for (const it of hand.items) {
  if (it.rel === "mechaber/part-001.txt" && it.key === "4:main") {
    it.en = autoFix(en, it.marker, it.he || "");
  }
}
fs.writeFileSync("pipeline/work/hand-slot16-siman-621.json", JSON.stringify(hand, null, 2) + "\n");
console.log("ok");
