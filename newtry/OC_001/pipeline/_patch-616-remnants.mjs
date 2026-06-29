#!/usr/bin/env node
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const beur =
  "(א) Seif 2 small. As Rif in Rosh Hashanah: a boy eight and nine we train, ten and eleven complete d'rabbanan, twelve d'oraisa; in R' Nasan in Niddah a boy nine and ten we train, eleven complete d'rabbanan, twelve d'oraisa; in R' Yehuda a boy ten and eleven we train, twelve d'oraisa for a girl and thirteen d'oraisa for a boy — but R' Hillel and R' Nasan do not distinguish between boy and girl, and likewise R' Yehuda does not distinguish in training and completion d'rabbanan between boy and girl; and Rif ruled regarding completion d'oraisa like R' Yehuda as we hold in chapter Yotzei Dofen that within the chapter is like after the chapter, and in Ketubot 50a Abbaye said etc. — but regarding training and completion halacha is not like R' Yochanan but like R' Nasan. Per this view what Shulchan Aruch taught \"one year before\" etc. — for one year it is fine etc., not like Rashi \"year before\" meaning two years but an actual year, and this means \"one year before\" per their words — year ten for R' Hillel and year eleven for R' Nasan, and one year before for ill and two years for healthy. R' Yehuda said to their chapter — twelve and also for ill and healthy. There the Rabbis said what is chinuch etc. For R' Hillel before twelve like R' Yehuda, also for ill and healthy — R' Hillel also divides completion for ill and healthy as wrote son of ten and son of eleven; but R' Nasan who does not divide — Ran wrote this means one year before in completion and per two years in training for ill is strained. It appears to me all is in completion at year eleven, and \"one year before\" for a girl and \"two years before\" for a boy; but for R' Nasan and R' Yehuda it all refers to their chapter of girl.";

const machatz =
  "(ו) And a prohibition of a negative command is more severe than action as stated in the first chapter of Yevamos on that sugya and as is also proven in the second chapter of Yevamos — end quote Terumat HaDeshen siman 94. Therefore since eating in the sukkah is only a positive command, therefore even to feed them is permitted. Except Magen Avraham siman 269 rejected this per what we hold that even a d'rabbanan prohibition we do not feed by hand, all the more a positive d'oraisa. Therefore one must say what Shulchan Aruch wrote here, and further that there it was a positive time-bound commandment — the main answer remains the first that sukkah is different, for in eating there is no prohibition etc. And truly to feed a minor by hand outside the sukkah, even to a woman, is forbidden, as explicit below siman 210. Only what he distinguished above regarding Yom Kippur that eating itself is forbidden — he now wrote another reason that even if Yom Kippur is literally like sukkah in this. One may be more lenient in the sukkah as a positive commandment from Yom Kippur. However Terumat HaDeshen at the end of the responsum challenged the Tosafot above and proved from Eruvin whether she is obligated in chinuch her son, and concluded one should not be lenient — see there.";

spawnSync(
  process.execPath,
  [
    path.join(__dirname, "_patch-one-block.mjs"),
    path.join(__dirname, "..", "output/siman_616/beur-hagra/part-001.txt"),
    "2",
    "א",
    beur,
  ],
  { stdio: "inherit" }
);
spawnSync(
  process.execPath,
  [
    path.join(__dirname, "_patch-one-block.mjs"),
    path.join(__dirname, "..", "output/siman_616/machatzit-hashekel/part-001.txt"),
    "2",
    "ו",
    machatz,
  ],
  { stdio: "inherit" }
);
