import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const leftoversDir = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = path.resolve(leftoversDir, "..");
const arr = JSON.parse(
  fs.readFileSync(path.join(leftoversDir, "part99_completed.json"), "utf8")
);

const kit = {
  meta: {
    kind: "leftovers",
    kit: "01_OC_MECHABER_CUT_EN_GPT_KIT",
    purpose: "Kit 01 HOLD/REJECT leftovers — manual complete EN",
    chunk_index: 99,
    cases_in_chunk: arr.length,
    created: new Date().toISOString(),
  },
  cases: arr.map((c) => {
    const sm = /siman(\d+)/.exec(c.id);
    const sf = /seif-(\d+)/.exec(c.id);
    return {
      id: c.id,
      volume: "oc1",
      slug: "mechaber",
      siman: Number(sm[1]),
      seif: Number(sf[1]),
    };
  }),
};

fs.writeFileSync(
  path.join(AUDIT, "01_OC_MECHABER_CUT_EN_GPT_KIT_part99.json"),
  JSON.stringify(kit, null, 2) + "\n",
  "utf8"
);
console.log("wrote part99 with", kit.cases.length, "cases");
