from pathlib import Path
import re

p=Path('index.html')
s=p.read_text(encoding='utf-8')
def change(old,new,count=1):
    global s
    assert s.count(old)==count,(old[:100],s.count(old))
    s=s.replace(old,new)

change('.marquee span{','.marquee>span{')
change('</style>',Path('audit-visual/rev1/design.css').read_text(encoding='utf-8')+'\n</style>')
change('<div class="cta-group reveal d3">','<div class="cta-group">')
change('<a href="#oferta" class="btn">QUERO PARTICIPAR<small>Acesso imediato às 3 aulas + encontro ao vivo</small></a>','<div class="hero-cta-slot"><a href="#oferta" class="btn">QUERO PARTICIPAR<small>Acesso imediato às 3 aulas + encontro ao vivo</small></a></div>')
change('<div class="pain-concept-slot">','<div class="pain-concept-slot">\n          <img src="assets/images/dor-formacao.jpg" alt="" width="1600" height="2399" loading="lazy" decoding="async">')
change('<div class="pain-single-image">','<div class="pain-single-image">\n          <img src="assets/images/dor-perguntas.png" alt="" width="1122" height="1402" loading="lazy" decoding="async">')
change('<div class="carol-photo">','<div class="carol-photo">\n        <img src="assets/images/carol-retrato.jpg" alt="" width="1600" height="1066" loading="lazy" decoding="async">')
change('<div class="play" role="button" aria-label="Reproduzir vídeo">','<button class="play" type="button" aria-label="Reproduzir vídeo" style="border:0">')
change('<path d="M8 5v14l11-7z"/></svg>\n        </div>','<path d="M8 5v14l11-7z"/></svg>\n        </button>')

desktop='M0 52 H83 C122 52 123 92 154 92 L163 74 L174 111 L185 92 C215 92 215 132 250 132 C288 132 291 92 320 92 L330 74 L341 111 L352 92 C383 92 383 52 417 52 C456 52 458 92 487 92 L496 74 L507 111 L518 92 C547 92 550 132 583 132 C623 132 624 92 654 92 L663 74 L674 111 L685 92 C715 92 717 52 750 52 C789 52 791 92 820 92 L830 74 L841 111 L852 92 C882 92 884 132 917 132 H1000'
mobile='M70 0 V40 C70 76 119 75 133 75 L143 64 L155 88 L166 75 C204 75 230 80 230 110 C230 146 181 145 167 145 L157 134 L145 158 L134 145 C96 145 70 150 70 180 C70 216 119 215 133 215 L143 204 L155 228 L166 215 C204 215 230 220 230 250 C230 286 181 285 167 285 L157 274 L145 298 L134 285 C96 285 70 290 70 320 C70 356 119 355 133 355 L143 344 L155 368 L166 355 C204 355 230 360 230 390 V450'
change('<svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">','<svg class="ecg-desktop" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">')
old='M0,60 L120,60 L150,60 L165,30 L180,90 L200,60 L320,60 L335,30 L350,90 L370,60 L490,60 L505,30 L520,90 L540,60 L655,60 L670,30 L685,90 L705,60 L825,60 L840,30 L855,90 L875,60 L1000,60'
change(old,desktop,2)
change('        <div class="nodes">',f'''        <svg class="ecg-mobile" viewBox="0 0 300 450" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="mobileJourney" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#24B7D3"/><stop offset="1" stop-color="#30EFAD"/></linearGradient></defs>
          <path d="{mobile}" fill="none" stroke="url(#mobileJourney)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="nodes">''')

# Ilustrações vetoriais das entregas, sem texto ou conteúdo dos seis passos.
art1='''<svg class="offer-art" viewBox="0 0 300 184" aria-hidden="true" fill="none">
  <rect x="45" y="22" width="210" height="128" rx="10" fill="#1D2864"/>
  <rect x="52" y="29" width="196" height="112" rx="5" fill="#080C22"/>
  <rect x="69" y="45" width="48" height="78" rx="5" fill="#141C4A" stroke="#2AD2C1" stroke-opacity=".4"/>
  <rect x="126" y="45" width="48" height="78" rx="5" fill="#141C4A" stroke="#2AD2C1" stroke-opacity=".65"/>
  <rect x="183" y="45" width="48" height="78" rx="5" fill="#141C4A" stroke="#2AD2C1"/>
  <path d="m87 66 15 10-15 10Zm57 0 15 10-15 10Zm57 0 15 10-15 10Z" fill="#2AD2C1"/>
  <path d="M80 105h26m31 0h26m31 0h26" stroke="#8794AC" stroke-width="3" stroke-linecap="round"/>
  <path d="M30 150h240l-10 12H40Z" fill="#6F7F90"/><path d="M121 150h58l-4 5h-50Z" fill="#080C22"/>
</svg>'''
art2='''<svg class="offer-art" viewBox="0 0 300 184" aria-hidden="true" fill="none">
  <rect x="40" y="25" width="220" height="126" rx="10" fill="#1D2864"/>
  <rect x="48" y="33" width="204" height="110" rx="5" fill="#080C22"/>
  <circle cx="109" cy="75" r="18" stroke="#2AD2C1" stroke-width="3"/><path d="M77 125c0-40 64-40 64 0" fill="#141C4A" stroke="#2AD2C1" stroke-width="2"/>
  <rect x="160" y="54" width="72" height="12" rx="4" fill="#141C4A"/>
  <path d="M161 84h62M161 96h49M161 108h55" stroke="#8794AC" stroke-width="3" stroke-linecap="round"/>
  <circle cx="232" cy="54" r="5" fill="#00FB8A"/><path d="M131 151v12h38v-12M113 163h74" stroke="#1D2864" stroke-width="6" stroke-linecap="round"/>
</svg>'''
art3='''<svg class="offer-art" viewBox="0 0 300 184" aria-hidden="true" fill="none">
  <path d="m140 46 51-13 61 15v94l-61-15-51 13Z" fill="#FFFFFF" stroke="#1D2864" stroke-width="2"/>
  <path d="M191 34v93" stroke="#DBE2F0" stroke-width="2"/><path d="M158 113c-12-21 60-12 47-41s23-14 27-7" stroke="#0C7D6F" stroke-width="2" stroke-dasharray="5 5"/>
  <circle cx="159" cy="112" r="4" fill="#24B7D3"/><circle cx="231" cy="66" r="4" fill="#00FB8A"/>
  <rect x="47" y="34" width="79" height="120" rx="6" fill="#1D2864"/><path d="M57 34v120" stroke="#2AD2C1" stroke-width="2"/>
  <path d="m72 62 5 5 10-12m-15 33 5 5 10-12m-15 33 5 5 10-12" stroke="#2AD2C1" stroke-width="2"/><path d="M96 62h17M96 88h17M96 114h17" stroke="#ECF0F8" stroke-width="2"/>
  <rect x="109" y="86" width="48" height="80" rx="8" fill="#080C22" stroke="#6F7F90" stroke-width="2"/><rect x="115" y="96" width="36" height="53" rx="3" fill="#141C4A"/><path d="m128 113 13 9-13 9Z" fill="#2AD2C1"/><path d="M128 157h10" stroke="#8794AC" stroke-width="2" stroke-linecap="round"/>
</svg>'''
start=s.index('<div class="incl">')
end=s.index('<div class="price">',start)
chunk=s[start:end]
arts=iter([art1,art2,art3])
chunk=re.sub(r'<div class="incl-item">',lambda m:m.group(0)+'\n          '+next(arts),chunk)
s=s[:start]+chunk+s[end:]
change('<span>1 dia de Vlog no Centro Cirúrgico • E-book "Checklist Cirúrgico" • Mapa da Jornada.</span>','<span class="bonus-lines"><span class="bonus-line">1 dia de Vlog no Centro Cirúrgico</span><span class="bonus-line"> • E-book "Checklist Cirúrgico"</span><span class="bonus-line"> • Mapa da Jornada.</span></span>')
change('      <div class="price">','      <div class="offer-purchase">\n      <div class="price">')
change('<a href="#" class="btn">QUERO PARTICIPAR DO GANCHO DA VIRADA<small>Acesso imediato às aulas + participação no encontro ao vivo</small></a>','<a href="#" class="btn" id="checkout-link">QUERO PARTICIPAR DO GANCHO DA VIRADA<small>Acesso imediato às aulas + participação no encontro ao vivo</small></a>\n      </div>')

js=Path('audit-visual/rev1/interactions.js').read_text(encoding='utf-8')
change("  // Video placeholder click hint",js+"\n  // Video placeholder click hint")
s=s.rstrip()+'\n</body>\n</html>\n'
p.write_text(s,encoding='utf-8')
print('Design aplicado; textos serão comparados com before.html.')
