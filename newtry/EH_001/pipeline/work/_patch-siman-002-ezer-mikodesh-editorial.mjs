#!/usr/bin/env node
/** EH001 siman 002 — ezer-mikodesh editorial (1 block). */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_002/ezer-mikodesh/part-001.txt", "ezer-mikodesh", {
  "1#_": `Seif 11 — regarding one country then another country. The boundary of a "country" may be distance, slight change of accent, change of kingdom and ministers, or change of customs — for in the Holy Land there are three lands and all one king. Nevertheless from the kingdom aspect one can also say it is two countries, especially at borders between them with strictness and delays. One more inclined not to have children — one can say a double doubt for leniency; well. Nevertheless from the sister herself to his sons, or his brother's wife — only if he has no son one can say a double doubt. Nevertheless perhaps they do not disagree on this.`,
});

console.log("siman_002 ezer-mikodesh editorial patch applied");
