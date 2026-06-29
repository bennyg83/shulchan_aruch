#!/usr/bin/env node
/** worker-slot-4 — siman 167 part 3 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_167/levushei-serad/part-001.txt": {
    "4:_":
      "See there. He preceded in Biur HaGra, meaning from where it began to bake—and this is Rashi; his intent: even for this girsa the explanation is like the first girsa, that he should not break from the middle of the slice but from the place of the crust where baking begins; but in the crust itself there is no distinction, for all sides bake at one time. On this Rama wrote our bread does not bake equally on all sides, therefore one breaks on the side, etc. But one could ask: in siman 254 it is explained that also bread in the time of Shulchan Aruch had one side that began baking first; see there; and see Acharonim on this.",
    "7:_":
      "See there. And Rashi wrote. He brought this to explain what Rama wrote, our bread, and as Taz explained above, note (4); his intent: Rashi wrote only from the edges, because their bread baked on two sides equally; but for our bread he cuts also on top—this is the continuation of his words; and I already wrote in note (4) what is puzzling on this; see there.",
    "10:_": "Magen Avraham, s.k. 188: divided girsaot. And for one girsa the berachah refers to the future.",
    "11:_":
      "See there: nihyeh with kamatz—past tense, that it already was; and view (2) to say with segol, which is present tense, that it applies to both past and future, like Borei which is present tense and we do not say Bara; but in the gemara they said Borei is also not present but past, and berachah refers only to past; and what we do not say Bara is because of biblical language. If so, one could say nihyeh with kamatz; but Yerushalmi implies it disagrees with our Talmud, which holds like Beit Shammai who say shebara from the light of fire, which is past—that is specifically because in the six days of creation it was created; but for something constantly renewed, etc.—apparently he holds Borei is present and berachah applies to past and future. This is the continuation of Magen Avraham's words.",
    "18:_":
      "And for us, even. Meaning: do not say that since our sitting is like their sitting, if so where they do not require sitting—for us, such as when they established a place for eating, meaning they said we shall eat here or in such-and-such place, and similarly a host with household members—for them sitting is not required, if so for us too sitting is not required; he teaches us that for us, even sitting is not required without sitting being called establishment.",
  },
  "output/siman_167/machatzit-hashekel/part-001.txt": {
    "1:_":
      "(s.k. 1) In a place, etc.—in a place that is hard, etc.—meaning, to clarify even in whole bread the hard place, for on all sides there it certainly bakes well. This is per the girsa in the gemara that one must break where the bottom crust formed; see Rabbeinu Yonah.",
    "12:_":
      "(s.k. 12) He need not, etc.—or perhaps Rabbi Akiva Eiger means to interrupt: granted, if he must wait, it is the need of hamotzi and permitted from the outset to wait even l'chatchila from the outset; but since by law he need not wait and it is not the need of hamotzi but only the need of the meal, he is doubtful whether l'chatchila it is forbidden. And Magen Avraham wrote: since Rama was silent here in Shulchan Aruch and did not emend per the Mechaber, who wrote he need not—implying if he wishes he may wait—and he should have emended he is not permitted to wait; rather, perforce he retracted and ruled it is permitted to wait, since we hold that between berachah and eating, in any case b'dieved it is not interruption even if it is only for the need of the meal. If so, we derive a level: between netilah and berachah is lighter than it—even l'chatchila it is permitted even if only for the need of the meal.",
    "16:_":
      "(s.k. 16) And he shall not speak, etc.—and siman 210, etc.—all this is Shelah's words, for Taz wrote first that he should not speak until after swallowing the slice, and brought proof from siman 210 that if one chews and expels he need not bless, and concluded. Nevertheless he did not wish to rely on this b'dieved if he spoke that he return and bless; see there. Therefore l'chatchila it is proper to be careful not to speak until he swallows an olive's bulk, for Magen Avraham wrote in s.k. 7 that one should be stringent that the slice of hamotzi be an olive's bulk.",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const blocks = parseBlocksInFile(fs.readFileSync(file, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(file, out);
  console.log(file);
}
