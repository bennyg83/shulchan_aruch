#!/usr/bin/env node
/** Patch 9 garbled levushei-serad blocks in siman 128 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const FIXES = {
  "1:_":
    "Magen Avraham seif katan 1 — and see siman 101; for even though he wrote there in Magen Avraham seif katan 4 that a kohen reads first d'oraisa, nevertheless he wrote there that they are not expert in priestly lineage and also that a kohen may give honor to another, which is not so regarding nesiut kafim.",
  "2:_":
    "Seif katan 1 — from where does R' Yitzchak author of Tosafot learn to distinguish between alone and with other kohanim? It is reasonable that since we say in Ketubot that one who transgresses a positive commandment — there is no distinction.",
  "3:_":
    "There — and it is possible he holds thus for R' Yitzchak. He comes to answer the words of R' Yitzchak author of Tosafot that Magen Avraham did not answer; rather he holds for R' Yitzchak author of Tosafot that what we say in Ketubot regarding transgressing a positive commandment means mentioning the Divine Name in vain — if so, behold R' Yitzchak also concludes there in Tractate Shabbat \"if not because of a blessing in vain\"; and on this Magen Avraham concludes to see siman 276 that a blessing in vain is a negative commandment and not a positive commandment — and this answer is rejected. So it appears to me an explanation of Magen Avraham's words; and so he explained in Noda BiYehudah siman 6 — see there. And the other way he wished to explain there that Magen Avraham reconciles in these words the words of Rama is very strained — see there.",
  "5:_":
    "There — and it may be explained that we find. See in Atzei Arazim siman 3 seif katan 2.",
  "6:_":
    "Taz seif katan 1 — they did not refrain. It is difficult, for in Yevamot he explains the reason because they informed them, and Rashi explained \"and not because they nullified their minds\"; and so I saw that he challenged in Eliyahu Rabbah. And it appears to me the intent of Taz is on what the Gemara said there: at first they did not refrain because they did not act per Beit Shammai as their words — behold when Beit Shammai nullified their minds in practice against Beit Hillel, even though in halacha they disagreed with them.",
  "8:_":
    "Taz seif katan 2 — their heads were weak. Meaning presumably they were so weak that they were exempt; otherwise they would trouble themselves to fulfill the positive commandment — behold that even though they were exempt, nevertheless they were stringent to fulfill; so too here that even though exempt by law, nevertheless since if he wishes he may bless, it is fitting he go outside.",
  "17:_":
    "There — twenty-two cubits. For this measure is not called immediately. And see in Magen Avraham siman 166 what he challenged on these words of Tosafot.",
  "18:_":
    "Seif katan 11 — specifically in their days. The general intent: whether per those who hold they say Modim when they uproot — meaning at the time of walking to the duchan — or per those who hold they say Modim when they reach the duchan — all hold they say Modim first, as Magen Avraham wrote in seif katan 17 afterward (and this is what Magen Avraham concluded and as I wrote) so the congregation answers Amen on both; but in their days they said Modim while walking — therefore properly they can say the prayer after Modim, whether when uprooting or when reaching the duchan; not so nowadays — he should not say even when reaching the duchan, since they have not yet said Modim.",
  "38:_":
    "Seif katan 90 — the posek of Shema. It is difficult — behold here we deal with the prayer of eighteen blessings; what proof does he bring from Shema? Behold in prayer we hold in siman 104 that if they called him to the Torah he does not interrupt; and so Eliyahu Rabbah challenged. And it may be said: Magen Avraham meant that since when they call him to the Torah he interrupts in Shema, it is reasonable that in nesiut kafim, which is stricter — transgressing a positive commandment and further that nesiut kafim pertains to prayer and is not such an interruption — he interrupts also in prayer.",
};

function patch(file, slug, seif, marker, newEnglish) {
  let t = fs.readFileSync(file, "utf8");
  const esc = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(slug: ${slug}\\r?\\nseif: ${seif}\\r?\\nmarker: ${esc}\\r?\\n\\*\\*\\*\\* HEBREW \\*\\*\\*\\*\\r?\\n[\\s\\S]*?\\*\\*\\*\\* ENGLISH \\*\\*\\*\\*\\r?\\n)([\\s\\S]*?)(\\r?\\n\\*\\*\\*\\* END BLOCK \\*\\*\\*\\*)`,
    "m",
  );
  if (!re.test(t)) throw new Error(`${file} ${slug} ${seif} ${marker}`);
  t = t.replace(re, `$1${newEnglish}$3`);
  fs.writeFileSync(file, t);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fp = path.join(__dirname, "output/siman_128/levushei-serad/part-001.txt");
for (const [key, en] of Object.entries(FIXES)) {
  const [seif, marker] = key.split(":");
  patch(fp, "levushei-serad", seif, marker, en);
  console.log("patched", key);
}
console.log("ok levushei-serad 128 —", Object.keys(FIXES).length, "blocks");
