from pathlib import Path
import re

p = Path('index.html')
html = p.read_text(encoding='utf-8')
start = html.rindex('/* Público e mentora:')
end = html.index('</style>', start)
html = html[:start] + Path('audit-visual/mentor-visual/section.css').read_text(encoding='utf-8') + '\n\n' + html[end:]

trust = re.search(r'<!-- ===== FAIXA DE AUTORIDADE ===== -->\s*<section class="trust".*?</section>', html, re.S)
assert trust
cards = re.search(r'<div class="auth-cards">(.*?)\n    </div>', trust.group(), re.S).group(1)
html = html[:trust.start()] + html[trust.end():]

start = html.index('    <div class="carol reveal d1">')
end = html.index('<!-- ===== BLOCO 06', start)
old = html[start:end]
heading = re.search(r'<h2>(.*?)</h2>', old, re.S).group(1)
paragraphs = re.search(r'<div class="carol-body">(.*?)\n      </div>', old, re.S).group(1).replace('carol-opening', 'mentor-opening')
quote = re.search(r'<p class="hl">(.*?)</p>', old, re.S).group(1)

html = html[:start] + '''  </div>
</section>

<!-- Apresentação da Carol e números transferidos da faixa abaixo da hero. -->
<section class="mentor-section" id="carol" aria-labelledby="mentor-title">
  <div class="mentor-banner">
    <img src="assets/hero-equipe.webp" alt="" width="1024" height="683" loading="lazy" decoding="async">
    <div class="wrap mentor-heading reveal">
      <h2 id="mentor-title">''' + heading + '''</h2>
    </div>
  </div>
  <div class="wrap mentor-details reveal">
    <figure class="mentor-portrait">
      <img src="assets/Foto-427-683x1024.webp" alt="" width="683" height="1024" loading="lazy" decoding="async">
      <figcaption>Foto Carol</figcaption>
    </figure>
    <div class="mentor-content">
      <div class="auth-cards" role="group" aria-label="Números de autoridade">''' + cards + '''
      </div>
      <div class="mentor-story">''' + paragraphs + '''
      </div>
      <p class="mentor-quote">''' + quote + '''</p>
    </div>
  </div>
</section>

''' + html[end:]
p.write_text(html, encoding='utf-8')
