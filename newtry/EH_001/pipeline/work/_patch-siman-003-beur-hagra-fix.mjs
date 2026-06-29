#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";
patchFile("siman_003/beur-hagra/part-001.txt", "beur-hagra", {
  "8#א": `And so if. Mishnah there 99: kohenet who became mixed, etc., and they freed, etc.`,
});
console.log("fixed beur-hagra 8#א");
