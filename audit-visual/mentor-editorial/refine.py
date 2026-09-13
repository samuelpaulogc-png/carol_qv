from pathlib import Path

page = Path('index.html')
html = page.read_text(encoding='utf-8')
start = html.index('/* Público e mentora:')
end = html.index('</style>', start)
css = html[start:end]
css = css.replace('#para-quem .who-layout{gap:88px}', '#para-quem .who-layout{gap:96px}')
carol_start = css.index('#para-quem .carol{')
media_start = css.index('@media(max-width:1000px)', carol_start)
css = css[:carol_start] + '''/* Retrato e narrativa em uma composição aberta, sem card externo. */
#para-quem .carol{grid-template-columns:minmax(0,.88fr) minmax(0,1.12fr);grid-template-rows:auto 1fr;grid-template-areas:'heading heading' 'photo story';column-gap:56px;row-gap:44px;padding:64px 0 0;border:0;border-top:1px solid var(--line);border-radius:0;background:none;overflow:visible}
#para-quem .carol-photo{grid-area:photo;position:relative;display:block;min-height:560px;aspect-ratio:auto;overflow:hidden;background:none;align-self:stretch}
#para-quem .carol-photo img{position:absolute;inset:0;width:100%;height:calc(100% - 32px);aspect-ratio:auto;object-fit:cover;object-position:55% center;border-radius:8px}
#para-quem .carol-photo .ph-t{position:absolute;left:0;bottom:0;padding:0;width:100%;display:flex;align-items:center;gap:14px;border:0;border-radius:0;background:none;color:var(--muted);font-size:.625rem;letter-spacing:.15em;line-height:1}
#para-quem .carol-photo .ph-t::after{content:'';height:1px;flex:1;background:var(--line)}
#para-quem .carol-story{display:contents}
#para-quem .carol-story h2{grid-area:heading;margin:0;padding:0;max-width:900px;font-size:clamp(2.5rem,4.8vw,4.25rem);font-weight:500;line-height:1.05;letter-spacing:-.04em;text-wrap:balance}
#para-quem .carol-story h2 .serif{display:block;margin-top:4px}
#para-quem .carol-manifesto{grid-area:story;align-self:start;position:relative;margin-top:40px;padding:40px;border:1px solid rgba(135,148,172,.2);border-left:2px solid var(--mint);border-radius:0 8px 8px 0;background:var(--bg)}
#para-quem .carol-body{padding:0}
#para-quem .carol-story p{max-width:none;margin:0;font-size:1.0625rem;line-height:1.7;color:var(--copy-readable);text-wrap:pretty}
#para-quem .carol-opening{display:block;margin-bottom:22px;font-family:'Bricolage Grotesque',sans-serif;font-size:1.625rem;line-height:1.3;letter-spacing:-.02em;color:var(--cream);text-wrap:balance}
#para-quem .carol-body p+p{margin-top:22px}
#para-quem .carol-story .hl{max-width:none;margin:32px 0 0;padding:28px 0 0;border:0;border-top:1px solid rgba(135,148,172,.24);background:none;color:var(--cream);font-size:1.75rem;line-height:1.4;text-align:left;text-wrap:pretty}
''' + css[media_start:]
css = css.replace('#para-quem .carol{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}', '#para-quem .carol{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);column-gap:32px;row-gap:32px}')
css = css.replace('#para-quem .carol-story h2{font-size:2rem;padding:36px 28px 24px}', '#para-quem .carol-story h2{font-size:3.25rem;padding:0}')
css = css.replace('#para-quem .carol-body{padding:0 28px 32px}', '#para-quem .carol-manifesto{margin-top:24px;padding:28px}\n #para-quem .carol-photo{min-height:540px}\n #para-quem .carol-body{padding:0}\n #para-quem .carol-opening{font-size:1.375rem}')
css = css.replace('#para-quem .carol-story .hl{padding:28px 40px;font-size:1.5rem}', '#para-quem .carol-story .hl{padding:24px 0 0;font-size:1.5rem}')
css = css.replace('#para-quem .who-layout{gap:48px}', '#para-quem .who-layout{gap:56px}')
css = css.replace("#para-quem .carol{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;grid-template-areas:'photo' 'heading' 'story' 'quote';border-radius:24px}", "#para-quem .carol{grid-template-columns:minmax(0,1fr);grid-template-rows:auto;grid-template-areas:'heading' 'photo' 'story';gap:28px;padding-top:40px;border-radius:0}")
css = css.replace('#para-quem .carol-photo{min-height:0;aspect-ratio:5/4}', '#para-quem .carol-photo{min-height:0;aspect-ratio:1/1}')
css = css.replace('#para-quem .carol-photo .ph-t{left:20px;bottom:20px}', '#para-quem .carol-photo .ph-t{left:0;bottom:0}')
css = css.replace('#para-quem .carol-story h2{padding:28px 24px 20px;font-size:clamp(1.875rem,5vw,2.25rem)}', '#para-quem .carol-story h2{padding:0;font-size:clamp(2.25rem,6.4vw,3rem);line-height:1.1}\n #para-quem .carol-manifesto{margin-top:0;padding:26px 24px}\n #para-quem .carol-opening{font-size:1.375rem;margin-bottom:20px}')
css = css.replace('#para-quem .carol-body{padding:0 24px 28px}', '#para-quem .carol-body{padding:0}')
css = css.replace('#para-quem .carol-story .hl{padding:24px;font-size:1.375rem;line-height:1.5;text-align:left}', '#para-quem .carol-story .hl{margin-top:24px;padding:24px 0 0;font-size:1.5rem;line-height:1.4;text-align:left}')
html = html[:start] + css + html[end:]
html = html.replace('<div class="carol-body"><p>Quando eu comecei, ninguém me entregou um mapa. Eu precisei', '<div class="carol-manifesto"><div class="carol-body"><p><span class="carol-opening">Quando eu comecei, ninguém me entregou um mapa.</span> Eu precisei')
html = html.replace('<p class="hl">Ter um mapa muda completamente a forma como você percorre o caminho.</p>', '<p class="hl">Ter um mapa muda completamente a forma como você percorre o caminho.</p>\n      </div>')
page.write_text(html, encoding='utf-8')
Path('audit-visual/mentor-editorial/section.css').write_text(css, encoding='utf-8')
