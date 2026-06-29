#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

const T = {
  "1#_": `Siman 37, Beit Shmuel note 1; and likewise I saw in Maharsha. — nb: I question — if so, inheritance of a daughter who fell to her from her mother's house — would her father acquire them, since it is truly similar to kiddushin and gift where they did not toil? Uncertain.`,
  "2#_": `Chelkat Mechokek note 1, and if they gave to her. — nb: see Ketzot HaChoshen siman 176 seif 12.`,
  "3#_": `Beit Shmuel note 18, and it was omitted from Bach. — nb: see responsum Rashach part 1 siman 6.`,
  "4#_": `Seif 13, gloss "and some say likewise." — nb: see below siman 57 seif 3.`,
  "6#_": `Seif 17, your eldest daughter. — nb: if he said I betrothed to you my daughter and does not know which — the betrother is not believed to say this is the one I betrothed, and it is not like below seif 21 (Taz).`,
  "7#_": `Beit Shmuel note 42, but if he has two sets. — nb: and likewise Maharam di Boton in responsum siman 61.`,
  "8#_": `Seif 21, I betrothed her. — nb: and if he said I betrothed one of my daughters and does not know to whom — Maharit wrote per Yerushalmi that one witness is believed, for he thinks this is the available one, therefore he said he betrothed her.`,
};

const n = patchFile("siman_037/rabbi-akiva-eiger/part-001.txt", "rabbi-akiva-eiger", T);
console.log(`rabbi-akiva-eiger: ${n} blocks`);
export default n;
