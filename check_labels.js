const fs=require('fs'),path=require('path');
const base='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries';

function showLabels(relPath,slug,simanim){
  const full=base+'/'+relPath;
  if(!fs.existsSync(full)){console.log(slug+': NOT FOUND');return;}
  const j=JSON.parse(fs.readFileSync(full,'utf8'));
  console.log('\n=== '+slug+' ===');
  for(const si of simanim){
    const seifim=j.text[si-1];
    if(!Array.isArray(seifim)||!seifim.length) continue;
    seifim.slice(0,4).forEach((e,i)=>{
      if(typeof e==='string'&&e.trim())
        console.log('  s'+si+' idx'+i+':', e.slice(0,110).replace(/\n/g,' '));
    });
  }
}

showLabels('Biur_Halacha/merged.json','biur-halacha',[135,137]);
showLabels('Beur_HaGra_on_Shulchan_Arukh,_Orach_Chayim/merged.json','beur-hagra',[135,137]);
showLabels('Netiv_Chayim_on_Shulchan_Arukh,_Orach_Chayim/merged.json','netiv-chayim',[135,137]);
showLabels('Machatzit_HaShekel_on_Orach_Chayim/merged.json','machatzit-hashekel',[1,135,137]);
showLabels('Dagul_MeRevava_on_Shulchan_Arukh,_Orach_Chayim/merged.json','dagul-merevavah',[1,137]);
showLabels("Ba'er_Hetev_on_Shulchan_Arukh,_Orach_Chayim/merged.json",'baer-heitev',[135,137]);
showLabels('Yad_Ephraim_on_Shulchan_Arukh,_Orach_Chayim/merged.json','yad-ephraim',[4,11,15,32,135,363,633]);
showLabels("Sha'arei_Teshuvah_on_Shulchan_Arukh,_Orach_Chayim/merged.json",'shaarei-teshuvah',[433,459,629,630]);
showLabels('Ateret_Zekenim_on_Shulchan_Arukh,_Orach_Chayim/merged.json','ateret-zekenim',[135,137]);
showLabels('Eshel_Avraham_on_Shulchan_Arukh,_Orach_Chayim/merged.json','eshel-avraham',[1,135,137]);
showLabels('Levushei_Serad_on_Shulchan_Arukh,_Orach_Chayim/merged.json','levushei-serad',[1]);
