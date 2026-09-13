const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict'),crypto=require('crypto'),dir='audit-visual/map-options';
const copy=()=>{let n,s='';const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{
 const mainHash=crypto.createHash('sha256').update(fs.readFileSync('index.html')).digest('hex');
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true}),report=[];
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,812],['tablet',768,1024]]){
  const baseline=await b.newPage({viewport:{width,height}});
  await baseline.goto('http://localhost:5501/',{waitUntil:'networkidle'});const original=await baseline.evaluate(copy);await baseline.close();
  for(const option of ['lateral']){
   const p=await b.newPage({viewport:{width,height}}),errors=[],failed=[];
   p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://localhost:'))failed.push(r.url())});
   await p.goto(`http://localhost:5501/${dir}/${option}.html`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
   assert.equal(await p.evaluate(copy),original);
   const s=p.locator('#mapa');
   for(const el of await s.locator('.reveal').all()){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(170)}await p.waitForTimeout(700);
   await s.screenshot({path:`${dir}/${option}-${name}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
   const metrics=await p.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,height:document.querySelector('#mapa').offsetHeight,nodes:document.querySelectorAll('#mapa .node').length}));
   assert.equal(metrics.width,metrics.scrollWidth);assert.equal(metrics.nodes,6);assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
   await p.emulateMedia({reducedMotion:'reduce'});
   for(const el of await s.locator('.reveal').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
   const cta=s.getByRole('link',{name:'QUERO DESCOBRIR',exact:true});await cta.focus();assert.equal(await cta.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');await cta.click();assert.equal(new URL(p.url()).hash,'#oferta');
   report.push({option,name,...metrics,textUnchanged:true,errors,failed});console.log(option,name,JSON.stringify(metrics));await p.close();
  }
 }
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync('index.html','utf8')).digest('hex'),mainHash);
 fs.writeFileSync(`${dir}/lateral-spacing-validation.json`,JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
