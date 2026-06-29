#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_009/baer-hetev/part-001.txt", "baer-hetev", {
  "1#ב": `To a third. One should be uncertain whether he speaks specifically one after another or even intermittently — see Darkei Moshe. Woman whose husband died and married another who was married to another woman and died — Hilkhot Ketanot question 152 ruled deadly. Two rival wives married two men and died — possibly together should not marry one; but each alone attributes the mishap to her fellow — Hilkhot Ketanot 153. Deadly woman may do yibbum ab initio — Raam part 1 siman 22. Responsum Chakham Tzvi question 1 brought proof from Rashi and Ramban parashat Vayeshev that deadly applies even to yevamah — see there. Seems mishnayot Yevamot chapters 1 and 4 discuss prohibition not danger — examine. See Relanach siman 36, Ravad part 1 siman 255; see above siman 174.`,
  "1#ג": `She leaves. So Rambam — per him no prohibition at all; rather concern and fear since mostly weak bodies were harmed — see Kesef Mishneh chapter 1 Even HaEzer. Per Rosh it is danger and compelled to remove — danger stricter than prohibition.`,
});

patchFile("siman_010/beer-hagolah/part-001.txt", "beer-hagolah", {
  "3#ד": `Rambam chapter 10 of laws of Gittin, and like Rav Yosef's latter version, etc.; and stringently he holds he adds to the first version — so there.`,
  "5#ב": `Nissim from Yerushalmi; and so Ritva in the name of Ramban.`,
});

patchFile("siman_010/beur-hagra/part-001.txt", "beur-hagra", {
  "1#ב": `And so if, etc. There 108 mishnah: he gave her get, etc. — permitted, etc., even though she was designated to him.`,
  "6#_": `One who extracts, etc. As one opinion — first version of sugya there like first version since Rabbanan challenge Rabbanan against each other; per latter version no challenge. Rambam chapter Keteretei Leshana like his method everywhere rules like latter version; holds latter version here too holds reason of first version and adds since Rabbanan challenge each other as above. For ailonit and seeing blood — latter version unnecessary; did not write also reason of first version — must say know, etc., per explanation must know lest be like divorcing conditionally as stated — not relevant to seeing blood and ailonit. Above relied on what preceded "and so," etc.`,
});

console.log("siman 009-010 error fixes applied");
