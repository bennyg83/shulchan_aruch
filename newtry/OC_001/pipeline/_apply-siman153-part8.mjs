#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_153/machatzit-hashekel/part-001.txt": {
    "5:ח":
      "Not so regarding an individual volunteer — meaning: per this there is no concern of disrespect, but because it is collected; if so, how is it that they only collected when one individual volunteered all the money needed for a beit haknesset, and there is no concern of disrespect.",
    "5:ט":
      "Or they bought it with communal funds that were already collected, not for the need of a beit haknesset but for a discretionary matter; and afterward they built with the collected funds a beit haknesset — if so, likewise in a beit haknesset in such a case there is no disrespect.",
    "5:י":
      "And what is written in seif 8 — meaning: per this the difficulty above from seif 8 is settled: that even if they already built the beit haknesset, all this that they did not pray in it — they are permitted to change it; it deals with when they bought it with money collected for a discretionary matter, for which there is no concern of disrespect for a mitzvah, as stated above.",
    "5:כ":
      "And the same applies to new bricks — meaning: when one individual volunteered, or the public bought it with money that was already collected for a discretionary matter.",
    "6:_":
      "(s.k. 6) For all, etc. — as is stated in the Gemara, daf 27, on this that we learned: \"and likewise in their surplus\" (meaning: what remains from the money needed for minor sanctity — they do not lower the surplus money to minor sanctity); and Rava said: it is not so except when they sold a holy item and bought with the proceeds of the sale other sanctity, and money remained; but they collected money for the need of sanctity and bought that sanctity, and money remained from the money — those funds are surplus. Abaye objected from a baraita that is taught on the mishnah mentioned above: \"and likewise in their surplus.\" When is this so? When they did not stipulate; but if they stipulated, even for duchsusi (meaning: to hire an agent for public needs) it is permitted. And with what are we dealing? If when they sold and had surplus — a stipulation would not help; rather, when they collected money and nevertheless a stipulation is required — and how did Rava permit with collection even without stipulation? They answer: in truth it deals with when they sold and had surplus; and that a stipulation helps is when it is nullified in the majority. And one may say: with collection and surplus, it is not permitted except for a matter of mitzvah; if so, what did Abaye object — that even without stipulation, for a matter of mitzvah, nevertheless for duchsusi, which is a discretionary matter, a stipulation is required; or Abaye holds: from what Rava said unstated \"they collected money and surplus remained — permitted,\" it implies that it is fully permitted even for a discretionary matter. But Taz disagrees: it is not permitted except for a matter of mitzvah; however, for the need of duchsusi or other public needs, it is called a matter of mitzvah.",
    "8:_":
      "(s.k. 8) Permitted, etc. — and the same applies to money — meaning: when they did not collect for the need of a beit haknesset, but one individual volunteered, or the public from what was already collected; but if they collected wood, etc., it is forbidden, since they collected for the need of a beit haknesset; and there is no distinction between money and wood: when collected for the need of a beit haknesset — whether they collected money or collected wood, it is forbidden; and if they did not collect for the need of a beit haknesset, for which there is no disrespect in either — it is forbidden only when it comes into the hand of the gabbai.",
    "9:א":
      "(s.k. 9) To marry, etc. — and the same applies to orphans; for one might have thought: since women are commanded regarding procreation, the sale was not permitted for the need of their marriages — it teaches us the reason that it is permitted to sell for the need of a woman's marriage.",
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
