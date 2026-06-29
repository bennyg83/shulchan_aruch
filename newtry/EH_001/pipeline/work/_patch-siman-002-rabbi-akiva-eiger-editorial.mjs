#!/usr/bin/env node
/** EH001 siman 002 — rabbi-akiva-eiger editorial (1 block). */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_002/rabbi-akiva-eiger/part-001.txt", "rabbi-akiva-eiger", {
  "1#_": `Siman 2 in Beit Shmuel letter 13 — we do not rule like Rabban Gamliel regarding one who says "I am certain." In my humble opinion this is only where R' Yehuda disqualifies — as we say "and you shall not perform the deed" — meaning even though halachah is like Rabban Gamliel, nevertheless the deed should not be done to heed R' Yehuda. But here where both permit — R' Yehuda because a double doubt is stronger for him, and Rabban Gamliel because "I am certain" is stronger for him — from the Torah to be stringent.`,
});

console.log("siman_002 rabbi-akiva-eiger editorial patch applied");
