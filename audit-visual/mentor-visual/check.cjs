const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict'),dir='audit-visual/mentor-visual';
const contents=html=>{
 const root=html?new DOMParser().parseFromString(html,'text/html'):document;
 const normal=s=>s.replace(/\s+/g,' ').trim();
 const walker=document.createTreeWalker(root.body,NodeFilter.SHOW_TEXT);let n,text='';
 while(n=walker.nextNode())if(!n.parentElement.closest('style,script'))text+=n.textContent;
 return {words:normal(text).split(' ').sort(),story:[...root.querySelectorAll('.carol-body p,.mentor-story p')].map(p=>normal(p.textContent)),stats:[...root.querySelectorAll('.auth')].map(p=>normal(p.textContent)),criteria:[...root.querySelectorAll('.check')].map(p=>normal(p.textContent))};
};
(async()=>{
 const before=fs.readFileSync(`${dir}/before.html`,'utf8').replace(/\r\n/g,'\n'),current=fs.readFileSync('index.html','utf8').replace(/\r\n/g,'\n');
 // Preserve all pre-existing styles before the section-specific block.
 assert.equal(current.slice(0,current.indexOf('/* Público: critérios')),before.slice(0,before.lastIndexOf('/* Público e mentora:')));
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true}),report=[];
 for(const width of (process.argv.slice(2).length?process.argv.slice(2).map(Number):[1440,900,768,600,375,320])){
  const p=await b.newPage({viewport:{width,height:1000}}),errors=[],failed=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://localhost:5501/'))failed.push(r.url())});
  await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  assert.deepEqual(await p.evaluate(contents),await p.evaluate(contents,fs.readFileSync(`${dir}/before.html`,'utf8')));
  assert.equal(await p.locator('.trust').count(),0);assert.equal(await p.locator('#carol .auth').count(),3);
  for(const selector of ['#para-quem','#carol']){
   const section=p.locator(selector);
   for(const el of await section.locator('.reveal').all()){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(180)}
   await section.evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await p.waitForTimeout(700);
   for(const img of await section.locator('img').all())await img.evaluate(e=>e.decode());
   await section.screenshot({path:`${dir}/after-${selector.slice(1)}-${width}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
  }
  const metrics=await p.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,criteria:document.querySelectorAll('#para-quem .check').length,stats:document.querySelectorAll('#carol .auth').length,photos:[...document.querySelectorAll('#carol img')].map(e=>({src:e.getAttribute('src'),loaded:e.complete&&e.naturalWidth>0})),height:document.querySelector('#carol').offsetHeight}));
  assert.equal(metrics.width,metrics.scrollWidth);assert.equal(metrics.criteria,7);assert.equal(metrics.photos.length,2);assert(metrics.photos.every(e=>e.loaded));assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  await p.emulateMedia({reducedMotion:'reduce'});for(const el of await p.locator('#carol .reveal').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await p.locator('#como-funciona .how-art img').first().getAttribute('src'),'assets/images/how-aulas.webp');
  if(width===1440||width===375){await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(400);await p.screenshot({path:`${dir}/after-hero-${width}.png`})}
  report.push({...metrics,errors,failed,copyPreserved:true});console.log(width,'OK');await p.close();
 }
 fs.writeFileSync(`${dir}/validation.json`,JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
