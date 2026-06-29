#!/usr/bin/env node
/** worker slot 3 — siman 406 */
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_406/mechaber/part-001.txt": {
    "1:main":
      "One who left the techum unknowingly. One who left the techum unknowingly — he has only four cubits; if he needs to relieve himself, he may leave them until he finds a modest place to relieve himself. Good advice: approach the side of his techum — for if he does not find a modest place until the techum, he may enter; after entering it is as if he did not leave, since he entered permissibly. But if he found a modest place first — he may not enter except to relieve himself there; he must distance from where he relieved until the odor ceases — there he has four cubits. If he distanced from the odor and entered the techum, it is as if he did not leave. If he left knowingly — he has no remedy. What we said regarding need to relieve himself — some say even for urine; some say specifically for feces.",
  },
  "output/siman_406/beer-hagolah/part-001.txt": {
    "1:א": "Plain in Gemara Eruvin 41; so Rambam wrote chapter 27.",
    "1:ב": "Raosh in his rulings there.",
    "1:ג": "Tur in name of Rabbenu Tam.",
    "1:ד": "There in name of his father Raosh.",
  },
  "output/siman_406/baer-heitev/part-001.txt": {
    "1:א": "Modest place. May go to Jewish house to relieve himself there — Raavad; Magen Avraham.",
    "1:ב":
      "Remedy — meaning: even if he came to his techum he has only four cubits, as siman 405 seif 8; nevertheless may go to modest place to relieve; if he came to his city see siman 405 seif 8 — whole city; another city only four cubits; so Raavad. Magen Avraham.",
  },
  "output/siman_406/magen-avraham/part-001.txt": {
    "1:א": "Modest place. May go to Jewish house to relieve there (Raavad).",
    "1:ב":
      "He has no remedy — meaning: even if he came to his techum he has only four cubits, as siman 405 seif 8; nevertheless may go to modest place to relieve; so R' Yehudah Rozani; if he came to his city — siman 405 seif 8 — whole city; another city only four cubits; so Raavad.",
    "1:ג":
      "Specifically for feces — but for urine dignity of people is not so great, for they urinate before many; also not so much filth that need distance, for absorbed in place; one may be stringent like this view.",
  },
  "output/siman_406/mishnah-berurah/part-001.txt": {
    "1:א": "(1) Unknowingly — see below.",
    "1:ב":
      "(2) Until he finds modest place — place where people are not present, because of human dignity; see above siman 3 that behind a fence is considered modest place; in field until companion cannot see him. Acharonim wrote in Raavad's name: may go to Jewish house to relieve; even if he found modest place earlier but near non-Jewish houses — may distance to Jewish houses lest non-Jews shame or frighten him.",
    "1:ג":
      "(3) Good advice, etc. — if he can search modest place in other directions, better than seeking modest place on side where he left.",
    "1:ד":
      "(4) Until his techum — if he found within four cubits of techum, considered within techum and may enter; likewise beginning siman 405 — see there.",
    "1:ה": "(5) As if he did not leave — and he has two thousand in every direction, as siman 405 seif 6.",
    "1:ו": "(6) Distance from where he relieved — this too is included in human dignity.",
    "1:ז":
      "(7) Until odor ceases — and no more; not even to first place where he sat initially if beyond this measure.",
    "1:ח":
      "(8) He has no remedy — permitted to leave beyond his four cubits until modest place and to distance from odor as above; but no remedy to be considered as if he did not leave if he entered techum — even if enters, only four cubits since he left knowingly at first; unless entered thereby to his city where he rested — then whole city like four cubits in every case, as siman 405 seif 8.",
    "1:ט":
      "(9) Specifically feces — for urine dignity not so great, for they urinate before many; also not so much filth needing distance, absorbed in place; one may be stringent like this view.",
  },
  "output/siman_406/biur-halacha/part-001.txt": {
    "1:א":
      "If he does not find, etc. — requires study: in other directions can he find modest place near his place; toward techum side must he distance more; is he permitted to clarify toward techum side to be permitted to enter techum; from Raosh's language somewhat implies permitted — requires study.",
    "1:ב":
      "Until his techum he may enter — Beit Yosef wrote they were lenient only when entering techum of city where he rested; but entering techum of another city — no, only four cubits; so Maamer Mordechai; see Or Zarua.",
  },
  "output/siman_406/eliyah-rabbah/part-001.txt": {
    "1:_":
      "[1] Modest place, etc. — so he will not be ashamed; may go to Jewish house to relieve there (Raavad).",
  },
  "output/siman_406/kaf-hachayyim/part-001.txt": {
    "1:_":
      "(1) [Seif 1] One who left techum unknowingly, etc. — if he left knowingly, already explained previous siman seif 8: even if non-Jews returned him — only four cubits. Beit Yosef; see below letter 14.",
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
