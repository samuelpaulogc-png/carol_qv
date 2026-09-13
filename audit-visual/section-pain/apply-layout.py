from pathlib import Path
import re
p=Path('index.html')
s=p.read_text(encoding='utf-8')
start=s.index('<style>')
end=s.index('</style>')
css=s[start:end]
# Consolidate the rules for this block, including its old media-query overrides.
selectors=r'diagnostic(?:-copy|-visual)?(?:::(?:before|after))?|sub|question-groups|question-card(?::last-child| p)?|close(?: b| \.em)?|single-image(?: img)?'
css,count=re.subn(r'[ \t]*\.pain-(?:'+selectors+r')\s*\{[^{}]*\}','',css)
assert count>25,count
css=re.sub(r'^[ \t]*/\* (?:véu:|empilhado:)[^\n]+\*/\s*$', '',css,flags=re.M)
css+='\n'+Path('audit-visual/section-pain/layout.css').read_text(encoding='utf-8')+'\n'
s=s[:start]+css+s[end:]
old='Você terminou sua formação e percebeu que o certificado não responde algumas das perguntas mais importantes:'
new='Você terminou sua formação e percebeu que <span class="serif">o certificado não responde</span> algumas das perguntas mais importantes:'
assert s.count(old)==1
s=s.replace(old,new)
old='<p class="pain-close">Muitos instrumentadores não ficam parados por falta de capacidade. <b>'
new='<p class="pain-close"><span class="pain-close-context">Muitos instrumentadores não ficam parados por falta de capacidade.</span> <b>'
assert s.count(old)==1
s=s.replace(old,new)
p.write_text(s,encoding='utf-8')
print('Regras consolidadas:',count)
