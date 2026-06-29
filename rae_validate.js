const fs=require('fs'),path=require('path');

const jsonPath='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json';
const corpusBase='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

function hebrewNumeral(s){
  s=s.replace(/['"״׳\s]/g,'').trim();
  const v={'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,
    'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,'ק':100,
    'ר':200,'ש':300,'ת':400};
  let n=0;for(const c of s)n+=v[c]||0;return n;
}
function seifPad(n){return 'seif-'+String(n).padStart(3,'0');}
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const j=JSON.parse(fs.readFileSync(jsonPath,'utf8'));

// Collect moves, pick a spread of samples
const moves=[];
for(let si=0;si<j.text.length;si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim))continue;
  for(let se=0;se<seifim.length;se++){
    const t=seifim[se];
    if(typeof t!=='string'||!t.trim())continue;
    const smallM=t.match(/<small>([\s\S]*?)<\/small>/);
    if(!smallM)continue;
    const label=smallM[1].trim();
    if(!/^סעיף/.test(label))continue;
    const seifStr=label.replace(/^סעיף\s*/,'').trim().split(/\s/)[0];
    const correctN=hebrewNumeral(seifStr);
    if(!correctN)continue;
    const currentN=se+1;
    if(currentN===correctN)continue;
    const simanDir=path.join(corpusBase,'siman'+(si+1));
    if(!fs.existsSync(simanDir))continue;
    const wrongDir=path.join(simanDir,seifPad(currentN),'rabbi-akiva-eiger');
    const correctDir=path.join(simanDir,seifPad(correctN),'rabbi-akiva-eiger');
    const wrongHe=path.join(wrongDir,'he.html');
    const correctHe=path.join(correctDir,'he.html');
    if(!fs.existsSync(wrongHe)||!brSegs(fs.readFileSync(wrongHe,'utf8')).length)continue;
    if(fs.existsSync(correctHe)&&brSegs(fs.readFileSync(correctHe,'utf8')).length)continue; // skip conflicts
    moves.push({si:si+1,currentN,correctN,label,rae:t});
  }
}

// Pick ~8 samples spread across different simanim
const samples=[];
const step=Math.floor(moves.length/8);
for(let i=0;i<moves.length&&samples.length<8;i+=Math.max(1,step)) samples.push(moves[i]);

for(const {si,currentN,correctN,label,rae} of samples){
  const mechPath=path.join(corpusBase,'siman'+si,seifPad(correctN),'mechaber','he.html');
  const mechHe=fs.existsSync(mechPath)?brSegs(fs.readFileSync(mechPath,'utf8')):[];
  console.log('=== siman'+si+' | RAE at wrong seif-'+String(currentN).padStart(3,'0')+' -> correct seif-'+String(correctN).padStart(3,'0')+' ['+label+'] ===');
  console.log('RAE HE: '+strip(rae).slice(0,140));
  console.log('Mechaber seif '+correctN+': '+(mechHe.length?strip(mechHe[0]).slice(0,140):'[no mechaber entry]'));
  console.log();
}
