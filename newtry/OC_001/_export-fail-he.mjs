import fs from "fs";
import { parseBlocksInFile } from "./oc001_block_lib.mjs";

const fail = `501|rabbi-akiva-eiger|7|_
502|rabbi-akiva-eiger|4|_
514|rabbi-akiva-eiger|5|_
518|rabbi-akiva-eiger|2|_
531|rabbi-akiva-eiger|4|_
531|rabbi-akiva-eiger|8|_
533|rabbi-akiva-eiger|3|_
538|rabbi-akiva-eiger|6|_
545|chokhmat-shlomo|3|_
547|chokhmat-shlomo|3|_
551|chokhmat-shlomo|10|_
551|rabbi-akiva-eiger|9|_
552|rabbi-akiva-eiger|7|_
561|chokhmat-shlomo|2|_
561|rabbi-akiva-eiger|4|_
570|rabbi-akiva-eiger|3|_
574|chokhmat-shlomo|4|_
582|chokhmat-shlomo|8|_
585|chokhmat-shlomo|2|_
608|chokhmat-shlomo|2|_
612|rabbi-akiva-eiger|6|_
616|rabbi-akiva-eiger|2|_
617|chokhmat-shlomo|2|_
619|chokhmat-shlomo|2|_
622|chokhmat-shlomo|2|_
624|chokhmat-shlomo|5|_
629|chokhmat-shlomo|6|_
629|rabbi-akiva-eiger|12|_
630|rabbi-akiva-eiger|3|_
631|rabbi-akiva-eiger|9|_
634|rabbi-akiva-eiger|3|_
638|chokhmat-shlomo|2|_
639|rabbi-akiva-eiger|7|_
640|rabbi-akiva-eiger|4|_
647|chokhmat-shlomo|2|_
653|rabbi-akiva-eiger|2|_
658|rabbi-akiva-eiger|6|_
671|rabbi-akiva-eiger|8|_
676|chokhmat-shlomo|5|_
689|chokhmat-shlomo|5|_
694|chokhmat-shlomo|2|_
696|rabbi-akiva-eiger|8|_`.trim().split("\n");

for (const k of fail) {
  const [siman, slug, seif, marker] = k.split("|");
  const fp = `output/siman_${siman}/${slug}/part-001.txt`;
  const b = parseBlocksInFile(fs.readFileSync(fp, "utf8")).find(
    (x) => String(x.seif) === seif && String(x.marker) === marker,
  );
  console.log("===", k, "===");
  console.log((b.he || "").replace(/<[^>]+>/g, "").trim());
  console.log();
}
