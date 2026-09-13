const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,812]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,isMobile:name==='mobile',hasTouch:name==='mobile'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:5501/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`audit-visual/${name}-hero.png`});
  const sections=await page.locator('main > section, body > section').count();
  for(let i=0;i<sections;i++){
    const el=page.locator('main > section, body > section').nth(i); await el.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
    await el.screenshot({path:`audit-visual/${name}-section-${i+1}.png`});
  }
  for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=650){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(100);}
  await page.waitForTimeout(1000);await page.screenshot({path:`audit-visual/${name}-full.png`,fullPage:true});
  const data=await page.evaluate(()=>({title:document.title,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>({tag:e.tagName,text:e.textContent.trim(),size:getComputedStyle(e).fontSize,lineHeight:getComputedStyle(e).lineHeight})),sections:[...document.querySelectorAll('main > section, body > section')].map(e=>({id:e.id,class:e.className,height:e.getBoundingClientRect().height,text:e.textContent.trim().slice(0,100)}))}));
  fs.writeFileSync(`audit-visual/${name}-metrics.json`,JSON.stringify({...data,errors},null,2));
  console.log(name,JSON.stringify({sections,scrollWidth:data.scrollWidth,clientWidth:data.clientWidth,errors}));await page.close();
 }
 await browser.close();
})();
