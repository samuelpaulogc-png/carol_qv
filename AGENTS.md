# Gancho da Virada — instruções do projeto

## Visão geral

- Landing page estática de captura para o evento **Gancho da Virada**, de Caroline, voltado a instrumentadores cirúrgicos recém-formados.
- A aplicação está em `index.html`; a única dependência externa atual são as fontes do Google Fonts.
- `docs/brand-guide.md` é a fonte da verdade para copy, posicionamento, identidade visual e paleta. Consulte especialmente a seção 15.
- `docs/project-status.md` registra o estado atual, decisões já tomadas e placeholders pendentes.

## Como executar

- Na raiz, execute `python -m http.server 5501` e abra `http://localhost:5501/`.
- Não use `file://` para validar comportamento; o preview pode aparecer como snapshot estático.

## Regras de conteúdo

- Não adicione copy, dados, depoimentos, métricas ou claims fora do briefing sem confirmação do usuário.
- Nunca revele os nomes ou o conteúdo dos **6 passos** fora do encontro ao vivo.
- Preserve os números de autoridade: 9 anos, aproximadamente 10 mil alunos direcionados e aproximadamente 20 mil cirurgias. Não invente métricas.
- Preserve os placeholders até o usuário fornecer conteúdo real: vídeo, imagens, checkout, depoimentos, resposta sobre gravação e parcelamento.

## Direção visual

- Siga a paleta e o DNA de marca documentados; não introduza outra direção visual sem solicitação.
- Evite aparência genérica de IA: sem gradientes multicoloridos em texto, brilhos tipo aurora, status dots pulsantes ou decoração gratuita.
- Prefira cores sólidas e sublinhado contínuo. Preserve o ritmo dark/light e o mapa em linha de ECG.
- Fontes atuais: Bricolage Grotesque em títulos, Fraunces em destaques itálicos e Hanken Grotesk no corpo.

## Restrições técnicas

- Faça alterações focadas em `index.html` e mantenha a página funcional como arquivo estático.
- Não embuta imagens raster como data URI; salve-as em `assets/` e referencie o arquivo.
- Valide desktop e mobile. Em 375 px, confirme que `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- `.reveal` depende do `IntersectionObserver` e da classe `.in-view`.
- Preserve HTML semântico, foco de teclado, contraste e `prefers-reduced-motion`.

## Verificação antes de concluir

- Confira visualmente mudanças de interface pelo servidor local.
- Confirme ausência de overflow horizontal e de conteúdo novo não autorizado.
- Resuma arquivos alterados e pendências.
