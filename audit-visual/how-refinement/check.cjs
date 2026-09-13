const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict'),dir='audit-visual/how-refinement';
const copy=html=>{const root=html?new DOMParser().parseFromString(html,'text/html').body:document.body;let n,s='';const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true}),report=[];
for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,1000],['tablet',768,1024]]){
 const p=await b.newPage({viewport:{width,height}}),errors=[],failed=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://localhost:5501/'))failed.push(r.url())});
 await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
 assert.equal(await p.evaluate(copy),await p.evaluate(copy,fs.readFileSync(`${dir}/before.html`,'utf8')));
 const section=p.locator('#como-funciona');for(const el of await section.locator('.reveal').all()){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(170)}await p.waitForTimeout(700);
 for(const img of await section.locator('img').all())await img.evaluate(el=>el.decode());
 await section.screenshot({path:`${dir}/after-${width}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
 const metrics=await p.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,height:document.querySelector('#como-funciona').offsetHeight,cards:document.querySelectorAll('#como-funciona .hcard').length}));
 assert.equal(metrics.width,metrics.scrollWidth);assert.equal(metrics.cards,2);assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
 await p.emulateMedia({reducedMotion:'reduce'});for(const el of await section.locator('.reveal').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
 const cta=section.locator('.btn');await cta.focus();assert.equal(await cta.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');await cta.click();assert.equal(new URL(p.url()).hash,'#oferta');
 report.push({name,...metrics,textPreserved:true,errors,failed});console.log(report.at(-1));await p.close();
}
fs.writeFileSync(`${dir}/validation.json`,JSON.stringify(report,null,2));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
