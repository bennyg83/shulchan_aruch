import { readFileSync, writeFileSync } from 'fs';

const file = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output/siman_124/baer-heitev/part-001.txt';
let t = readFileSync(file, 'utf8');
const lines = t.split('\n');

const result = lines.map(line => {
  // seif 11 ב
  if (line.startsWith('with pleasure. The Bible wrote that we were jealous')) {
    return 'For benefit — Siftei Kohen wrote: meaning by strict law, but for us it is permitted for benefit in a place of loss. And here it deals with when he did not touch the wine with the spigot, rather when he wanted to raise the wine he tilted the barrel until the wine reached the spigot — for otherwise even if he did not raise it, it is forbidden for benefit because he touched the wine through the spigot. This is unlike measuring with a reed below seif 19, where he did not intend any swirling at all; but here he intended swirling and it is forbidden for benefit — so Tosafot. However for us, touch of non-Jews through something else is permitted even for drinking in a place of loss, as below seif 24.';
  }
  // seif 11 ג
  if (line.startsWith('Caught. And he wrote in the Bible in the name of the apostles')) {
    return 'That it should stop — and Beit Yosef wrote in the name of Tosafot that as an act of piety one should be careful lest the non-Jew precede him and stop it first.';
  }
  // seif 23 ג
  if (line.startsWith('with pleasure. The Bible and its friend put a finger')) {
    return 'For benefit — Siftei Kohen wrote: and for us, when he inserted his finger it is permitted for benefit in a place of loss; and when he inserted a long spigot it is permitted even for drinking in a place of loss, as below seif 24. But if the situation is such that it cannot be saved unless he inserts his finger, and there is no Jew there who can save it, it is permitted even for drinking in a place of loss; and so the Bach ruled as practical halacha to be lenient.';
  }
  // seif 25 _
  if (line.startsWith('in the dance. Even though many of the verses of the Bible')) {
    return 'In a wineskin — even if he shook it much, it is permitted. Taz. And Beit Yosef explains that this is in a closed wineskin; but in an open one it is permitted only in a place of loss. And see siman 125 seifim 8, 9, 10.';
  }
  return line;
});

const out = result.join('\n');
writeFileSync(file, out, 'utf8');
console.log('Done');
