import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const patches = {
  "output/siman_139/ateret-zekenim/part-001.txt": [
    {
      seif: "11",
      marker: "_",
      en: `One who reads the Torah must hold the Torah scroll at the time of the blessing. In the writings of Maharal R' Yitzchak Luria, z"l, it is written that when he says "Bless Hashem the blessed One," he should grasp with both hands the etz chaim; and afterward when he begins "Blessed are You, Hashem, who chose us," he should hold only with his right hand; and afterward when he reads the Torah he should hold with both hands on the parchment by the break of the scarf; and he wrote a great reason according to the kabbalistic secret — see there.`,
    },
  ],
  "output/siman_139/baer-heitev/part-001.txt": [
    {
      seif: "1",
      marker: "_",
      en: `Initially. Kenesset HaGedolah wrote that it is a mitzvah that also the one ascending arranges [the blessings] for himself. And in two [aliyot], one who read at Maariv on erev Shabbat fulfills and it is counted in the reckoning. Peri Chadash — see Kenesset HaGedolah — see there.`,
    },
    {
      seif: "4",
      marker: "ג",
      en: `His face. And Taz wrote that turning one's face is not proper, for he appears as though he is not blessing over what he will read but over something else — for he appears as though he is withdrawing from it. And likewise Bach wrote it is proper that it be open entirely at the time of the blessing and he not turn his face at all, for such is the view of the poskim and the renowned Geonim; and so I practice. And those who bow during the blessing over the Torah err — one should not bow except in what the Sages enacted (38 places). And Shach in the name of Rokeach wrote an ancient custom to bow and prostrate during the blessing over the Torah in honor of the Torah — and not like those who do not practice thus. And likewise Maaseh Rav.`,
    },
    {
      seif: "10",
      marker: "_",
      en: `For us. If he erred in the first [blessing] and said asher natan and they rebuked him, he finishes asher bachar and goes out; and if he blessed asher natan until completion, he blesses afterward asher bachar banu. Be'er Sheva daf 58, Kenesset HaGedolah — see there.`,
    },
  ],
  "output/siman_139/beer-hagolah/part-001.txt": [
    { seif: "1", marker: "א", en: `Beit Yosef` },
    {
      seif: "1",
      marker: "ב",
      en: `Tur in the name of Midrash Rabbah and Tanchuma, parashat Yitro`,
    },
    { seif: "4", marker: "ב", en: `There, 32` },
    { seif: "9", marker: "_", en: `Tur — see there.` },
    { seif: "10", marker: "_", en: `Tur — see there.` },
  ],
  "output/siman_139/beur-hagra/part-001.txt": [
    {
      seif: "10",
      marker: "א",
      en: `(10) After, etc. — as in Beit HaMikdash where they say there that one returns to the place where he stopped; and Rif and Rambam explain that one returns and says Blessed is He who has given us sustenance, etc.`,
    },
  ],
  "output/siman_139/mishnah-berurah/part-001.txt": [
    {
      seif: "2",
      marker: "א",
      en: `(4) One must protest, etc. — from the Mechaber's words it is proved that even if one can read with the chazzan word for word from the text, nevertheless one should not call him, since he can read by himself; but from the words of Tur below in siman 141 and likewise from responsum of Rosh brought there in Beit Yosef, it implies one should be lenient in this [Peri Chadash]; and especially following what is written in Shulchan Aruch HaRav in the name of Maharil — certainly one should not be stringent in this.`,
    },
  ],
};

function replaceBlock(content, seif, marker, newEn) {
  const re = new RegExp(
    `(\\*\\*\\*\\* OC001 SOURCE BLOCK \\*\\*\\*\\*\\nslug: [^\\n]+\\nseif: ${seif}\\nmarker: ${marker}\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\n)[\\s\\S]*?(\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
  );
  if (!re.test(content)) throw new Error(`Block seif=${seif} marker=${marker} not found`);
  return content.replace(re, `$1${newEn}$2`);
}

for (const [rel, blocks] of Object.entries(patches)) {
  const fp = path.join(ROOT, rel);
  let content = fs.readFileSync(fp, "utf8");
  for (const { seif, marker, en } of blocks) {
    content = replaceBlock(content, seif, marker, en);
  }
  fs.writeFileSync(fp, content, "utf8");
  console.log("Patched", rel, blocks.length, "blocks");
}
