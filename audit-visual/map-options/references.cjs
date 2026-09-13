const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
 for(const [name,url] of [['human','https://agent.humanacademy.ai/'],['ddp','https://rennanmezabarba.com.br/ddp/']]){
  const p=await b.newPage({viewport:{width:1440,height:1000}});
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:45000});await p.waitForTimeout(2500);
  for(const [i,y] of [0,850,1800].entries()){
   await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(1000);
   await p.screenshot({path:`audit-visual/map-options/reference-${name}-${i}.png`});
  }
  console.log(name,await p.title());await p.close();
 }
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
