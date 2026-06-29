#!/usr/bin/env node
/** EH001 siman 003 — beur-hagra + pitchei-teshuva error blocks + chokhmat-shlomo fix. */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_003/beur-hagra/part-001.txt", "beur-hagra", {
  "1#י": `But he prohibits himself, etc. As stated in Yevamot 47a; and Tosafot there on "trusted," etc., and on "there is no testimony," etc.`,
  "1#ל": `And the woman who had relations, etc. As stated in Yevamot; and "you are not trusted," etc.; and although he is disqualified — so too regarding sons of sons there; but tzarich iyun — even safek is not as stated there "and there is not," etc., forty completely; so too Tosafot there on the above; but if he comes, etc., from there 24b and first chapter of Sanhedrin "close relative," etc. — evidently regarding others, even though he disqualifies himself — not even safek, for we execute on his word.`,
  "9#ד": `And not so, etc. Not like Abaye there 69b; and a fortiori the latter version that even Abaye agrees.`,
});

patchFile("siman_003/pitchei-teshuva/part-001.txt", "pitchei-teshuva", {
  "7#_": `Trusted regarding him. Avnei Heitev; and what he wrote "an incident occurred," etc. — apparently what does he teach us? Is it not explained so in Shulchan Aruch 61? The responsum of R' Yehuda HaLevi is not available now; but I looked in Chut HaMeshulash siman 110 — there discusses one witness came and testified he recognizes him that he is not kohen, and swore a severe oath on this, and said within a year this will be clarified; meanwhile he admitted — in this there is reasoning to say truthful words are recognizable and from anxiety over clarification he admitted; nevertheless not trusted to be lenient — see there. Presumably R' Yehuda HaLevi's responsum also discusses such case, or discusses giving excuse — as written in responsum Chut HaShani siman 17 brought below siman 6 s.k. 1. What Avnei Heitev wrote on law of firstborns, etc. — see Pitchei Teshuva Yoreh De'ah siman 305 s.k. 5.`,
});

patchFile("siman_003/chokhmat-shlomo/part-001.txt", "chokhmat-shlomo", {
  "1#_": `See what Maharshal wrote in his responsa on this — see there and examine.`,
});

console.log("siman_003 beur-hagra/pitchei/chokhmat partial patches applied");
