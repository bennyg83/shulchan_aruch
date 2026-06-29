#!/usr/bin/env node
/** EH001 siman 017 FULL REDO — baer-hetev + turei-zahav */
import { patchFile } from "./_patch-siman-utils.mjs";
import baerP1 from "./_tr-017-baer-p1.mjs";
import baerP2 from "./_tr-017-baer-p2.mjs";
import baerP3 from "./_tr-017-baer-p3.mjs";
import tazP1 from "./_tr-017-taz-p1.mjs";
import tazP2 from "./_tr-017-taz-p2.mjs";
import tazP3 from "./_tr-017-taz-p3.mjs";

let n = 0;
const p = (rel, slug, T) => { n += patchFile(rel, slug, T); };

p("siman_017/baer-hetev/part-001.txt", "baer-hetev", baerP1);
p("siman_017/baer-hetev/part-002.txt", "baer-hetev", baerP2);
p("siman_017/baer-hetev/part-003.txt", "baer-hetev", baerP3);
p("siman_017/turei-zahav/part-001.txt", "turei-zahav", tazP1);
p("siman_017/turei-zahav/part-002.txt", "turei-zahav", tazP2);
p("siman_017/turei-zahav/part-003.txt", "turei-zahav", tazP3);

console.log(`siman 017 baer-hetev + turei-zahav patch done (${n} blocks)`);
