#!/usr/bin/env node
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { SLUGS } from './_tr-228-slugs.mjs';
import { SLUGS_B } from './_tr-228-slugs-b.mjs';
import { SLUGS_C } from './_tr-228-slugs-c.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const he = JSON.parse(fs.readFileSync(path.join(WORK, '_he-228.json'), 'utf8'));

/** @type {Record<string, Record<string, string>>} */
const T = {
  'baer-heitev': {
    '10#_': `The place. Taz wrote Beit Yosef challenged from beginning transgresses do not stand, etc.; some distinguish between sins one is accustomed to — e.g. not lending vessels — most of world fail — therefore not ashamed to tell truth; but uncommon sin — possibly ashamed to say nevertheless would vow; also specifically if others open for him we fear ashamed to answer truth in heart; but if one comes himself saying I ask you release my vow because now clear sin in vowed vow — good opening helps — not brazen to say, etc. — since if wanted could be entirely silent.`,
    '20#א': `His fellow. Maharik wrote likewise if swore before his agent — not release except per sender's intent or agent's intent — agent like person; from need to inform — implies even without suspicion of shame forbidden; Rosh wrote per Yerushalmi ab initio release vow not in his presence only inform release — Gemara here main reason — release only in his presence meaning with his knowledge — Shach; Taz explained per his fellow — fellow confirmed vow and he wants to release; Shach explained for fellow's will.`,
    '20#ב': `And his will. Shach wrote appears Mechaber also holds — must inform and he agrees in will; likewise Taz.`,
    '20#ח': `To punish them. However if did not do him favor — though should not release ab initio — if transgressed and released do not punish — Bach; Beit Yosef wrote however all this for law; but where possible profanation of God's name — forbid — nothing more severe — as Zedekiah punished he and Sanhedrin who released though mitzvah that release.`,
    '20#ל': `To release. Shach wrote implies even if did him favor can release thus; difficult from where — responsum Ramban only no suspicion since died — without favor; but if did favor — reasonable if died cannot release; thus proved, etc.; difficult — see there.`,
    '20#ס': `To remove. As Even HaEzer siman 77; even per those who dispute there — married woman unlike here. Mahari Weil.`,
    '21#א': `Release. Meaning needs sage release and their intent and agreement (but their intent alone does not help as seif 37); Ribash wrote if vowed per community — even if majority agree to nullify vow — not heed until all agree; if vower says now intent was on majority — believed before sages; appears also per siman 211 nowadays all like gentiles regarding need release; but not so stringent to say insufficient release; however appears if specified per so-and-so, etc. — certainly intent all agree — even says intent was majority — not heed — Shach.`,
    '21#ג': `Mitzvah. Then release even without their intent — presumably agree to release — Shach (hire cantor wage is mitzvah Rashdam part 4 siman 214 avoid quarrels mitzvah per many poskim release community swore not take teacher mitzvah Maharival part 3 siman 88 release sage swore not be sage in community mitzvah Raanach part 2 siman 23 release swore not hear Torah from sage mitzvah Mekor Baruch siman 20 marry woman he desires mitzvah Maharam Levi part 4 siman 1 learn Torah with one he desires mitzvah Shiyurei Knesset page 217 appear before officers teach merit of Israel Darchei Moshe mitzvah Maharam part 1 siman 15).`,
    '21#ז': `Presumably. Maharik wrote if those three involved in that vow — all agree per intent of many; all the more if said I vow per your intent — Shach.`,
    '21#ט': `Constraint. Shach wrote means if said anonymously per intent of many; but if specified — no leniency even in constraint and need; Ribash wrote document written per intent of many — law as per intent of many in Gemara — not compelled; should ab initio be stringent not release since some say even anonymous per intent of many no release.`,
    '24#_': `Annuls. Rosh wrote possibly even if husband revokes intent and permits her to vow per others — nothing — since woman anonymously vows per husband's intent; verse tied her annulment to husband — husband can retract permission; Shach wrote though Rosh wrote possibly — nevertheless holds law so; likewise plainly in hints; Tur Even HaEzer siman 96 plainly even if husband gave permission, etc.; not Bach who wrote Rosh uncertain.`,
    '33#ב': `And afterward. All the more if already gave cherem and afterward swore — must tell. Shach; Taz wrote but even without cherem must tell when this one needs testify — behold if not tell, etc.; must be they did not demand testimony — then no transgression as Choshen Mishpat siman 228; but if truly demanded testimony — must tell even without cherem.`,
    '39#ב': `To extend. Written Bedek HaBayit in name of Orach Chayyim — vow partially released — entire vow released; likewise oath — therefore if Reuven owes Shimon maneh by oath by set time and at that time Reuven asks Shimon extend payment until other time — Reuven no longer bound by that oath; Shach wondered what this has to partial release, etc.; must be Orach Chayyim case as if received — therefore no longer bound — entire released; Taz wrote many err in document extending payment by set time — at time lender says I profit you time and does not forgive document — transgresses document; Beit Yosef fix say as if received on condition swear pay by set time and he swears — end quote (see Choshen Mishpat siman 73 seif 6 Semak and Taz there — examine).`,
    '45#ב': `After the fact. Shach wrote Rema follows view holds per intent of many permitted after the fact; but already explained there no release even after the fact — likewise here; this vow in distress like Jacob vowed if God be with me, etc.; but one who vowed in illness not eat cheese harming illness and now regrets — not called vow in distress — can release even ab initio — end quote.`,
  },
};

Object.assign(T, SLUGS, SLUGS_B, SLUGS_C);

// CHUNK2

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let body = `/** Editorial translations — siman 228 (176 blocks) — Hatarat nedarim */\nexport const TRANSLATIONS = {\n`;
let n = 0;
for (const [slug, keys] of Object.entries(T)) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys)) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
    n++;
  }
  body += `  },\n`;
}
body += `};\n`;

const missing = [];
for (const [slug, keys] of Object.entries(he)) {
  for (const key of Object.keys(keys)) {
    if (!T[slug]?.[key]) missing.push(`${slug}\t${key}`);
  }
}
if (missing.length) {
  console.error('MISSING:', missing.join('\n'));
  process.exit(1);
}

fs.writeFileSync(path.join(WORK, '_tr-data-228.mjs'), body);
console.log(`wrote _tr-data-228.mjs (${n} blocks)`);
