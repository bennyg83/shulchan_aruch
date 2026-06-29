#!/usr/bin/env node
/** worker-slot-5 — siman 214 editorial batch 1 (19 blocks) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { blockStableId } from "./lib/blocks.mjs";
import { simanPartFiles } from "./lib/editorial-queue.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");
const QUEUE_PATH = path.join(WORK, "editorial-queue-siman-214.json");

const fixes = {
  "ateret-zekenim/part-001.txt": {
    "1:_": `Every berachah, etc. This applies in the berachah over fruits or berachot over mitzvot or berachot of seeing — such as one who sees a rainbow; but in a berachah that is praise and thanksgiving, malchut is not required; and therefore we do not find malchut in all the berachot of the Shemoneh Esreh (my teacher in Bach in the name of R' Yehuda Falk).`,
  },
  "baer-heitev/part-001.txt": {
    "1:_": `<b>Name and malchut.</b> And that in the prayer of eighteen they did not enact malchut — Beit Yosef answers in the name of the Rosh that the first berachah, since it contains "the great God," is considered like malchut, and all the later ones are dragged along after the first. Rambam wrote chapter 11 of Berachot: one who performs a mitzvah and did not bless — if it is a mitzvah whose performance still persists, such as tzitzit, tefillin, and sukkah, he blesses after he wrapped himself; but if he slaughtered or covered or circumcised without a blessing, he does not return and bless after the act; and so with everything similar — see Magen Avraham. (And see in Sefer Even HaEzer who wondered on Shulchan Aruch's ruling that if he skipped the word haOlam he must return and bless.)`,
  },
  "beer-hagolah/part-001.txt": {
    "1:א": `Berachot 40; and according to R' Yochanan — Rif and Rambam there.`,
    "1:ב": `Tosafot there and the Rosh.`,
  },
  "biur-halacha/part-001.txt": {
    "1:א": `<b>And if he skipped the Name or malchut, etc.</b> — And even though regarding a berachah he does not fulfill his obligation with either of them, nevertheless there is a distinction between them regarding "you shall not take [the Name in vain]" — for a berachah with Name without malchut also has in it [the concern of] "you shall not take" [Peri Megadim in the introduction in the name of Beit Yosef and Bach]; but with malchut alone without Name he does not transgress, for "you shall not take the Name of Hashem" etc. is written — which is not so regarding malchut [Derech Pikudekha maamar 40 s.v. Amen].`,
    "1:ב": `<b>And even if he did not skip except the word haOlam alone, etc.</b> — And in Sefer Even HaEzer he raised that this matter is a doubt; and therefore from doubt he should not return and bless. And behold, what he raised from the Rosh also appears thus in Berachot daf 40 — that it is not indispensable b'dieved since he mentioned only "the Merciful One, King"; behold in the chapter "One who sees," regarding the berachah of thanksgiving, he mentioned "King of the world" in the conclusion; and so in Rif and in Terumat HaDeshen they mentioned there also "King of the world"; and therefore it is possible that it is a shortening of language in the chapter "How does one bless," and also his other proofs are not compelling, as Magen Giborim wrote; but from the Yerushalmi it appears ostensibly like him, as it states there at the beginning of the chapter "One who sees": every berachah that does not have malchut is not a berachah — and the reason is because it is written "I will exalt You, my God the King" — behold, with Melech alone he fulfills; but one can reject that there is a distinction between Melech alone and the word haMelech; and afterward I found in Shulchan Aruch of the Gra"z who also wrote thus, that there is a distinction between Melech and haMelech in the conclusion. And therefore, even though the words of Even HaEzer on this are not compelling to reject the words of Shulchan Aruch and several Acharonim who followed him, nevertheless if he said haMelech with the definite article, it is reasonable that he need not return.`,
  },
  "eliyah-rabbah/part-001.txt": {
    "1:_": `[1] <b>[Levush] Of the Shemoneh Esreh, etc.</b> Above siman 113 this was explained.`,
  },
  "kaf-hachayyim/part-001.txt": {
    "1:_": `(1) [Seif 1] Every berachah that does not have mention of Name and malchut, etc. — And the first berachah of the Shemoneh Esreh, since it contains "the great God," is considered like malchut. And some say because he says "the God of Abraham" it is considered like malchut, since the world had not yet crowned Him over them until Avraham our father came. And the first berachah of the seven [blessings] — even though it does not contain malchut, "the holy God unlike Him" is considered malchut. Beit Yosef in the name of Tosafot and the Rosh. And Rokeach siman 563 wrote: in all berachot that are thanksgiving to the Holy One, blessed be He, they have mention of Name and malchut; but in the prayer of eighteen that is not thanksgiving over enjoyment or a mitzvah but over stating a person's needs — and one should always arrange the praise of the Holy One, blessed be He, and afterward pray — therefore they did not enact malchut in it; end quote. And Beit Yosef brought it; and berachat Elohai Neshamah — according to those who say it is not adjacent to "Who formed" and has no malchut in it — it appears that since he mentions therein that the Holy One, blessed be He, creates souls and breathes them into bodies and afterward takes them from them and afterward returns them — you have no greater mention of malchut than this. Beit Yosef. Levush. And see further above siman 46 ot 3 and siman 113 ot 1.`,
  },
  "mechaber/part-001.txt": {
    "1:main": `In every berachah there must be Name and malchut. And it contains one seif: Any berachah that does not include mention of Name and malchut is not a berachah. If he skipped Name or malchut he must return and bless. Even if he only skipped the word haOlam alone he must return and bless, for Melech alone is not malchut.`,
  },
  "mishnah-berurah/part-001.txt": {
    "1:א": `(א) Every berachah — meaning whether berachot of enjoyment or berachot over mitzvot, whether a long berachah that has an opening and a conclusion or one that has only an opening alone — except for a berachah adjacent to its companion that is drawn along to the berachah preceding it, which has Name and malchut at its beginning.`,
    "1:ב": `(ב) Name and malchut — And that in the prayer of eighteen they did not enact malchut — Beit Yosef answers in the name of the Rosh that the first berachah, since it contains "the great God," is considered like malchut, and all the later ones are dragged along after the first; and see there further answers.`,
    "1:ג": `(ג) And if he skipped, etc. — But if he skipped the word Atah it is not indispensable b'dieved.`,
    "1:ד": `(ד) Name, etc. — Meaning he did not say any mention of the Name at all; but if he said one mention, such as Adonai or Elokeinu, he has fulfilled.`,
    "1:ה": `(ה) He must return and bless — the Mechaber discusses regarding the opening of the berachah that has Name and malchut, and the same regarding a berachah that has a conclusion — if he skipped the Name in the conclusion it is as if he did not conclude at all.`,
    "1:ו": `(ו) For Melech alone, etc. — And in Sefer Even HaEzer he disagrees on this; and see in Biur Halachah what we wrote on this.`,
  },
  "peri-megadim/part-001.txt": {
    "1:א": `<b>Name.</b> Taz and berachat Elohai Neshamah — see Levush. Tur wrote there are versions, thus: "Nevertheless, the hearer of the skip should bless between him and himself" — seemingly he should complete the skip and say Melech haOlam and fulfill with combination of berachot; and so said [another version]; and in Perishah he explained this that it stands on a doubt whether the halachah is like Rav or like R' Yochanan — he said: nevertheless the hearer should fix and bless.`,
    "1:ב": `<b>Question.</b> Many sat to eat and gave one person permission to bless the first berachah and exempt them, and he blessed in doubt in the manner I mentioned in siman 211 in Taz in Peri [Megadim] there regarding the doubt between borei peri haEtz and borei peri haAdamah; and there is doubt in Mishnah Berurah 61:11 on shehakol and on rice that was not cooked — berachot ch. 7 siman 67 and the like; nevertheless it is forbidden to bless again from doubt whether the hearers are permitted.`,
    "1:ג": `<b>Answer.</b> Seemingly one can say they are permitted, for they authorized him to be a messenger to bless properly and not in doubt; and proof from here that the hearer should fix; and one can say he should fix immediately when hearing the skip before he finished the berachah — and now requires study.`,
  },
  "turei-zahav/part-001.txt": {
    "1:_": `<b>Name and malchut.</b> And that in the prayer of eighteen they did not enact malchut — Beit Yosef wrote in the name of Rokeach that specifically in a berachah that is thanksgiving to the Holy One, blessed be He, they enacted thus; but prayer is only over fixing one's needs, and one should always arrange the praise of the Holy One, blessed be He, and afterward pray — therefore they did not enact malchut in it; end quote. And further he wrote in the name of the Rosh: and the first berachah of the eighteen, since it contains "the great God," is considered like malchut, etc.; and it appears that even though in the other berachot of the eighteen "the great God" is not in them, nevertheless all of them after the first are dragged along, for they are berachot adjacent to their companion.`,
  },
};

const base = "output/siman_214";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = path.join(OC_ROOT, base, rel);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
  total += Object.keys(blockFixes).length;
}
console.log(`fixed ${total} blocks`);

function buildQueueItems() {
  const items = [];
  for (const absPath of simanPartFiles(OUT, 214)) {
    const rel = path.relative(OUT, absPath).replace(/\\/g, "/");
    const blocks = parseBlocksInFile(fs.readFileSync(absPath, "utf8"));
    for (const b of blocks) {
      const he = String(b.he ?? "").trim();
      if (!he) continue;
      items.push({
        id: blockStableId(rel, { slug: b.slug, seif: b.seif, marker: b.marker }),
        file: rel,
        slug: b.slug,
        seif: b.seif,
        marker: b.marker,
        rawBlock: serializeBlock(b),
      });
    }
  }
  items.sort(
    (a, b) =>
      a.file.localeCompare(b.file) ||
      String(a.seif).localeCompare(String(b.seif)) ||
      String(a.marker).localeCompare(String(b.marker))
  );
  return items;
}

const items = buildQueueItems();
const queue = {
  generatedAt: new Date().toISOString(),
  siman: 214,
  part: 1,
  parts: 1,
  scope: "all",
  outRoot: OUT,
  totalInSiman: items.length,
  itemCount: items.length,
  items,
};
fs.mkdirSync(WORK, { recursive: true });
fs.writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf8");
console.log(`Refreshed queue: ${items.length} blocks`);

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
  /\bLord's Prayer\b/i,
  /\bHashem's Word\b/i,
  /\bHashem's promise\b/i,
  /\bCapernaum\b/i,
  /\bskyscrapers\b/i,
  /\bCongratulations\b/i,
  /\bthe craft\b/i,
  /\bfirst dish\b/i,
  /\ballocated\b/i,
  /\bhand recoils\b/i,
  /\bIDF\b/,
  /\bHoly Quran\b/i,
  /\bKGB\b/i,
  /\bGerry\b/i,
  /\bGreira\b/i,
  /\bMary\b/i,
  /\bDileg\b/i,
  /\bNomy\b/i,
];

let fail = 0;
for (const it of items) {
  const raw = it.rawBlock || "";
  const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
  const en = (enM ? enM[1] : "").trim();
  const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
  const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
  if (!he) continue;
  if (!en || en.length < 8) {
    console.error("FAIL", it.id, "empty_english");
    fail++;
    continue;
  }
  for (const p of MT_PATTERNS) {
    if (p.test(en)) {
      console.error("FAIL", it.id, `mt:${p}`);
      fail++;
      break;
    }
  }
  const issues = runBlockQualityChecks({
    slug: it.slug,
    seif: it.seif,
    marker: it.marker,
    he,
    en,
  });
  const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
  if (sev === "error") {
    console.error("FAIL", it.id, issues.map((i) => i.code).join(","));
    fail++;
  }
}
if (fail) {
  console.error(`Preflight: ${fail} failure(s) of ${items.length}`);
  process.exit(1);
}
console.log(`Preflight OK — ${items.length - fail}/${items.length} blocks`);
