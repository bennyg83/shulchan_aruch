const text = `but ' " ' etc. and if ' ' niddah we say chuppah likewise Rosh what he wrote in name of Mordekhai ".`;
const text2 = `witnesswine '. is not inherits her likewise ch. 10 holds Rambam ', it appears likewise if further' there is no for behold it is stated siman " Rambam even ' further' does not help / is ineffective ' wrote on condition`;

const SALAD_TOKENS = [
  /\bwrote\b/g,
  /\bthere is no\b/g,
  /\bit is clear\b/g,
  /\bnevertheless\b/g,
  /\bbehold\b/g,
  /\bfurther\b/g,
  /\bsafek\b/g,
  /(?<!\w)'(?!\w)/g,
  / " /g,
  /\bfolio\b/g,
  /\bseif "\b/g,
  /\bsiman "\b/g,
];

function saladScore(t) {
  let score = 0;
  for (const re of SALAD_TOKENS) {
    const m = t.match(re);
    if (m) { score += m.length; console.log(String(re), '->', m.length); }
  }
  if (t.length < 30) score += 10;
  if (t.length > 100 && !t.includes('.')) score += 5;
  return score;
}

console.log('=== text1 ===');
console.log('score:', saladScore(text));
console.log('\n=== text2 ===');
console.log('score:', saladScore(text2));
