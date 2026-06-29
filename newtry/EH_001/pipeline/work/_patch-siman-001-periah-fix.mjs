#!/usr/bin/env node
/** EH001 siman 001 — periah u'rviah terminology fix (Herria / epic rabbi MT poison). */
import { patchFile } from "./_patch-siman-utils.mjs";

patchFile("siman_001/mechaber/part-001.txt", "mechaber", {
  "1#main": `The laws of periah u'rviah (being fruitful and multiplying) and not standing without a wife. It contains fourteen seifim.
Every man is obligated to marry a woman in order to be fruitful and multiply; and anyone who does not engage in periah u'rviah is as though he sheds blood, diminishes the Divine image, and causes the Divine Presence to depart from Israel. {Rama: Whoever has no wife dwells without blessing, without Torah, and is not called a man; and since he married a woman his sins are wavering, as it is said "He who finds a wife finds good and obtains favor from Hashem" (Tur).}`,

  "13#main": `A woman is not commanded regarding periah u'rviah (and see siman 154; nevertheless some say she should not stand without a husband because of suspicion (Hagahot Alfasi, chapter haBa al Yevimto, in the name of Or Zarua).)`,
});

patchFile("siman_001/beit-shmuel/part-001.txt", "beit-shmuel", {
  "3#ד": `**And in our time they did not compel.** See Mordechai and Agudah — they wrote: outside Eretz Yisrael they do not compel; it is also the law that we decreed upon ourselves not to marry a woman, but one does not decree a decree on the public unless the majority of the public can abide by it; therefore in any case they do not compel if he does not fulfill periah u'rviah, even in Eretz Yisrael — see siman 24.`,
});

console.log("siman_001 periah u'rviah terminology fix applied");
