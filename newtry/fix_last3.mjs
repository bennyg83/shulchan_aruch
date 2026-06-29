import { readFileSync, writeFileSync } from 'fs';

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

function patchLine(file, lineIndex, newContent) {
  const t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  const old = lines[lineIndex];
  const cr = old.endsWith('\r') ? '\r' : '';
  lines[lineIndex] = newContent + cr;
  writeFileSync(file, lines.join('\n'), 'utf8');
  console.log(`Patched ${file.split('/').slice(-3).join('/')} line ${lineIndex}`);
}

// siman_170/turei-zahav lines 58-59 (same block, two continuation lines)
patchLine(`${base}/siman_170/turei-zahav/part-001.txt`, 58,
  'Or in any case, it is only as a guarantor for the interest, etc. Levush wrote: and some say that even without collateral — even if the non-Jew took the money directly from the lender — and even if the Jew became guarantor only for the interest — it is forbidden to be an arev kablan for the non-Jew, since when the Jew says to him "as long as my money is with the non-Jew I will give you a dinar per month," it follows that as long as the non-Jew does not pay, he is obligated to give the interest — and thus responsibility for the principal is also upon him until the non-Jew repays. It is as if he borrowed money from a Jew and said "as long as I give you a dinar per month you cannot compel me to give you the principal" —');

patchLine(`${base}/siman_170/turei-zahav/part-001.txt`, 59,
  'end quote Levush. This view does not appear in Beit Yosef here or in Derishah. However, above siman 169 in Beit Yosef s.v. "a non-Jew who said to a Jew \'borrow for me,\'" he wrote in the name of Baal HaTerumah similarly. [Nekudot HaKesef]: And in truth it is a question on Rama — how did he write here on his own authority against Baal HaTerumah, who is a rishon, and did not even cite him. And even though above the case involves a Jew who borrowed from a Jew for a non-Jew\'s sake, and here the non-Jew borrowed from the Jew and the Jew became guarantor — there is no difference for the purposes of this reasoning. For if you say that by being guarantor for the interest he becomes guarantor also for the principal — what difference does it make here versus there. And moreover it is a simple ruling that if the Jew was guarantor for principal and interest it is forbidden even though the non-Jew received the money.');

// siman_177/turei-zahav line 296
patchLine(`${base}/siman_177/turei-zahav/part-001.txt`, 296,
  'If the custom is to hire a porter, etc. Tur wrote that it is assessed according to the custom, so there should be no loss to the recipient, etc. And Beit Yosef explains: if the custom was that the recipient brings the fruits on his own shoulder, then without doubt he would bring them and not pay a porter wage; but if the custom is that the giver pays the porter wage, or that the recipient pays the porter wage — then the recipient incurs a loss compared to other recipients.');

console.log('Done.');
