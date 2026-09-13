from pathlib import Path
import urllib.request, concurrent.futures
out=Path('audit-visual/rev1/source-images');out.mkdir(exist_ok=True)
items={'photo1':'12-jEbwRtIa13r6VJSKkPDC9tEpZU1nsC','photo2':'1LEOOUjzExE00Fzd98mkrtBS7P8DNvlr3','photo3':'1u4di3_vJielAIndWxhiINn9CyrVMPcFK','photo4':'1HmOvMTwZI15Xi8PnQOGSVReoqNBPZ3Iq','carol':'1cxhOeOv15UOjeoxw7YSEwU6pdo9fePq1'}
def get(item):
 name,id=item
 try:
  r=urllib.request.urlopen('https://drive.google.com/thumbnail?id='+id+'&sz=w1600',timeout=30);data=r.read();mime=r.headers.get_content_type()
  if not mime.startswith('image/'):return name,mime,'not image'
  ext={'image/png':'.png','image/jpeg':'.jpg','image/webp':'.webp'}.get(mime,'.img');p=out/(name+ext);p.write_bytes(data);return name,mime,len(data),str(p)
 except Exception as e:return name,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
 for result in pool.map(get,items.items()):print(result)
