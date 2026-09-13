from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8')
start=s.index('  /* Diagnóstico')
end=s.index('</style>',start)
for name in ['integrated','minimal']:
    css=Path('audit-visual/section-pain/'+name+'.css').read_text(encoding='utf-8')
    result=s[:start]+css+'\n'+s[end:]
    preview=result.replace('assets/','/assets/')
    Path('audit-visual/section-pain/option-'+name+'.html').write_text(preview,encoding='utf-8')
    if name=='integrated':p.write_text(result,encoding='utf-8')
