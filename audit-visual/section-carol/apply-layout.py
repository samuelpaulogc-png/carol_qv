from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
start=s.index('  /* Retrato horizontal')
end=s.index('  /* Oferta ilustrada:',start)
css=Path('audit-visual/section-carol/layout.css').read_text(encoding='utf-8').replace('--muted:#B4BED0','--muted:#8794AC')
s=s[:start]+css+'\n\n'+s[end:]
changes={
    '<div class="wrap split">':'<div class="wrap who-layout">',
    '<h3>O Gancho da Virada é para você que...</h3>':'<h2>O Gancho da Virada <span class="serif">é para você que...</span></h2>',
    '<h3>Quem vai te mostrar esse caminho?</h3>':'<div class="carol-story">\n      <h2>Quem vai te mostrar <span class="serif">esse caminho?</span></h2>',
    '<div class="auth-cards">':'</div>\n      <div class="auth-cards">'
}
for old,new in changes.items():
    assert s.count(old)==1,old
    s=s.replace(old,new)
p.write_text(s,encoding='utf-8')
