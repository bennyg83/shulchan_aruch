#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "output/siman_131/magen-avraham/part-001.txt": {
    "8:ד":
      "(If they spread.) Meaning when they spread grass to interpose between the floor — then it is permitted with leaning; and in some books the reading is \"or they spread,\" etc., meaning then even without leaning it is permitted, for specifically on the ground it is forbidden without leaning lest there be beneath him a stone floor and it was built upon it — ground is not considered an interruption, for the ground of a house is like it until the abyss as in chapter 15 Kelim; but grass is considered an interruption; and so Rambam chapter 30; and this is primary; and as mentioned, unlike what Rivash wrote siman 412 see there; and it implies on Rosh Hashanah grass is not needed, for they do not fall on their faces but only kneel and bow on their knees; but in the Temple they fall on their faces in the order of the service.",
  },
  "output/siman_131/mishnah-berurah/part-001.txt": {
    "8:ד":
      "(40) And it is forbidden, etc. — I will give a short introduction so it clarifies well: it is written in the Torah \"and a stone floor you shall not place in your land to prostrate upon it\" — meaning even when prostrating to Heaven on a stone floor or on a pavement of stones, for it is one matter; and the poskim wrote that it is forbidden from the Torah only when there are two degradations — prostrating with hands and feet extended and specifically on a pavement of stones; but kidda — falling on his face on the pavement without extending hands and feet — or extending hands and feet not on a pavement of stones is forbidden only d'rabbanan, for they decreed kidda lest full prostration, and not on pavement lest pavement of stones; but if there were two improvements — kidda without pavement of stones — the rabbis did not decree; and likewise if he fell kidda on pavement of stones but not full kidda — he tilted slightly to his side — or extending hands and feet not on pavement and tilting slightly to his side, not true extension — it is also permitted. Now we explain the gloss words. And it is forbidden for every person, etc. — meaning as for an important person mentioned above it is forbidden even without stone floor, so here; except there it is forbidden even kidda, and here forbidden only with extending hands and feet.",
    "8:ה":
      "(41) There is no stone floor, or pavement of stones. And if there is a pavement of stones there, even through kidda it is forbidden on the ground; but if he bows in prayer, even if there is a floor it is permitted — and specifically against pavement of stones; but a brick floor is not forbidden, for it is written stone and a brick is not a stone, as written \"and the brick was for them as stone.\"",
  },
  "output/siman_131/peri-megadim/part-001.txt": {
    "2:_":
      "On — Taz in Beit Yosef brings further reasons: some say to his left side — for the left is the way of freedom and we humble ourselves on that side; and further the Shechinah is on the right of the one praying, as it is said \"Hashem is your shadow at your right hand\" — thus when he leans on his left his face is toward the Shechinah, see there; and the Divine Presence in the name of Bachei parashat Korach per Kabbalah to the left; therefore in the morning because of tefillin one does not lean to his right; at Mincha or in selichot at night to his left, for there are many reasons to lean left; one who lays tefillin at Mincha leans right; one who has no hand tefillin in the morning leans left. And a left-handed person in the morning — it is clear to me we follow his right hand; at Mincha I am in doubt regarding the reason of left — there is no difference for left-handed as siman 27 summary 3 (see Turei Zahav 136; also for the reason of left perhaps there is doubt of danger — requires study here; siman 123 Magen Avraham letter yud); unlike the reason that Hashem is at his right — requires study.",
  },
  "output/siman_131/turei-zahav/part-001.txt": {
    "1:ג":
      "And the main thing is to lean, etc. Levush wrote: and I heard the compromise that even in the morning when he has tefillin on his head he falls on his left side, only he tilts his head slightly to the right; at Mincha he tilts his head to the left; and so I saw practiced and so it is fit to practice, for per Kabbalah there is a secret in it — until here; and since there is no clear proof for any reason, we should not change what most of the world practiced as Rama's compromise; and the difference of Mishna Berurah should be considered lack of knowledge — therefore do not change.",
  },
  "output/siman_132/mishnah-berurah/part-001.txt": {
    "8:ד":
      "(40) And it is forbidden, etc. — short introduction: Torah forbids placing a stone floor to prostrate upon, even to Heaven on stone floor or pavement — one matter; forbidden from Torah only with two degradations — prostration with hands and feet extended on stone pavement; kidda on pavement without extension, or extension not on pavement — d'rabbanan (kidda lest full prostration; not on pavement lest pavement); two improvements — kidda without pavement — no decree; kidda on pavement with tilt to side, or extension not on pavement with tilt — permitted. Gloss: forbidden for every person as important person without stone floor — here forbidden only with extension.",
    "8:ה":
      "(41) There is no stone floor, or pavement of stones. If pavement there, even through kidda forbidden on ground; if he bows in prayer even with floor permitted — specifically against stone pavement; brick floor not forbidden — stone written and brick is not a stone, as written \"and the brick was for them as stone.\"",
  },
};

for (const [file, blockFixes] of Object.entries(fixes)) {
  const raw = fs.readFileSync(file, "utf8");
  const blocks = parseBlocksInFile(raw);
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
