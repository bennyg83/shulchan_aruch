import fs from 'fs';

const p221 = 'output/siman_221/mechaber/part-001.txt';
let t = fs.readFileSync(p221, 'utf8');
t = t.replace(
  /The blessing of pleasure[\s\S]*?Lord.s name\):/,
  `One forbidden benefit from his fellow is forbidden in his coal, and permitted in his flame. One forbidden benefit from his fellow may blow the shofar blast of a mitzvah for him. {Rama: One forbidden benefit from his fellow is permitted to slaughter for him a healthy animal, but not a dangerous one (so it appears from Beit Yosef in the name of Ohel Moed).}`
);
fs.writeFileSync(p221, t);

const p220 = 'output/siman_220/mechaber/part-001.txt';
let t2 = fs.readFileSync(p220, 'utf8');
t2 = t2.replace(
  /He said to him that the year is passed[\s\S]*?new head\./,
  `If he said "until Rosh Chodesh Adar" — until Rosh Chodesh of the first Adar; "until the end of Adar" — until the end of Adar; "until the end of the second Adar" — until the end of the second Adar. And according to Rambam, if he knew the year was intercalated and said "until Rosh Chodesh Adar," he is forbidden until Rosh Chodesh of the second Adar.`
);
t2 = t2.replace(
  /He told her that you enjoyed me until[\s\S]*?father.s house\s*$/m,
  `If he said to her, "Konam that you benefit me until the festival if you go to your father's house until Pesach" — she is forbidden to benefit immediately. And if she went before Pesach and he is found benefiting from her — behold, he receives lashes at the time of the Sanhedrin, and she is forbidden his benefit until the festival; and she is permitted to go to her father's house once Pesach arrives.`
);
fs.writeFileSync(p220, t2);
console.log('done');
