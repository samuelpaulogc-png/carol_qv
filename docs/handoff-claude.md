# Contexto para continuidade — 12/09/2026

Este arquivo é carregado automaticamente pelo `CLAUDE.md`. Ele consolida tudo o que foi decidido até aqui para que um novo chat continue sem perder contexto. O histórico detalhado, com medidas e datas, está em `docs/project-status.md` (entradas mais recentes no topo; entradas antigas podem descrever versões já substituídas).

## Leitura e execução

- Leia `AGENTS.md`, este documento e `docs/brand-guide.md` (seção 15 = identidade visual; seção 13 = guardrails de comunicação).
- A página é `index.html`, com CSS e JavaScript internos. Arquivos `index.recuperado.html`, `index.reconstruido.html` e tudo em `audit-visual/` **não** são a página principal.
- Servidor: `python -m http.server 5501` na raiz (ou o preview `static` de `.claude/launch.json`) e `http://localhost:5501/`. No celular da mesma rede: `http://192.168.0.117:5501/`. Nunca validar via `file://`.
- O servidor local costuma cair entre sessões; suba de novo antes de verificar.

## Quem é o usuário e como trabalha

- Busca uma página **premium, bonita e profissional**, conquistada por composição, hierarquia, fotografia, espaçamento e animações de qualidade. Rejeita resultados "simples".
- Prefere **ver versões prontas** a escolher descrições abstratas. Quando a direção não está clara, monte um comparador em `audit-visual/<nome>/` antes de mexer na página.
- Costuma testar no **celular real** e mandar prints com setas vermelhas indicando o ponto.
- Usa o **ChatGPT** para gerar imagens (a conta Higgsfield ligada ao projeto tem 0 créditos). Prompts prontos ficam em `human-output/image/`.
- Também trabalha com o **Codex** em paralelo: o `index.html` pode mudar entre sessões. Leia o arquivo antes de editar, não confie na memória.

## Regras persistentes

### Copy
- Preserve a copy. Só remova ou altere texto com autorização expressa, e registre a autorização aqui.
- **Remoções já autorizadas (não reintroduzir):**
  - “O Mapa dos 6 Passos” acima do título do mapa.
  - “Como funciona”, “Card 01” e “Card 02” acima das aulas.
  - Faixa `.trust` abaixo da hero — os três resultados foram **movidos** para a apresentação da Carol, sem alterar “9 anos / de experiência”, “10k / alunos direcionados”, “20k / cirurgias”. Não duplicar.
  - Legenda “Foto Carol” (11/09).
  - CTA fixo inferior do celular (11/09) — o botão da hero fica só no lugar dele.
  - Depoimentos (12/09): card em destaque da Aline (nome, estrelas, citação e chips), kicker “Prova”, aviso “Este depoimento representa uma experiência individual…” e a frase “← Arraste para ver mais →”.
  - Oferta (13/09): kicker “Sua vaga” acima de “Entre para o Gancho da Virada”, e as etiquetas/números usados só no comparador.
  - FAQ (13/09): kicker “Dúvidas” acima de “Ficou com alguma dúvida?”. Era o último `.kicker` da página; as regras `.kicker` e `.light .kicker` foram removidas.
- **Alterações de copy já autorizadas:**
  - Garantia (13/09): título “7 dias de garantia” trocado por “Garantia de satisfação total”, a pedido expresso do usuário. O texto circular da medalha (“7 dias de garantia · …”) e o parágrafo com as condições de 7 dias continuam iguais.
  - Hero → vídeo (24/09): os parágrafos “No Gancho da Virada, você vai conhecer o mapa…” e “Você recebe acesso imediato a 3 aulas de preparação…” saíram da hero e foram para o bloco do vídeo, depois de “Entenda em poucos minutos o que é o Gancho da Virada” e antes do botão “QUERO CONHECER OS 6 PASSOS”, a pedido expresso do usuário. Texto idêntico; não voltar com eles para a hero.
  - Preço (24/09): a pedido do usuário (“o preço precisa ser alterado para 6x de R$ 8,82”), o valor em destaque passou de “R$ 47,00” para “6x de R$ 8,82”. A linha de baixo passou de “ou em até 12x no cartão” (a confirmar) para “ou R$ 47,00 à vista”, para o preço à vista continuar informado. No parcelado, 6 × R$ 8,82 = R$ 52,92 (juros do cartão).
  - Aviso de inscrição (24/09): “<nome> garantiu vaga na turma”, texto do exemplo que o usuário enviou ao pedir o aviso. Os nomes vêm só de compras reais (ver “Aviso de inscrição” abaixo).
- Nunca revele nomes ou conteúdo dos 6 passos. Não invente métricas nem altere condições comerciais.

### Identidade
- **NÃO ALTERE AS FONTES** (pedido expresso do usuário em 24/09: “senão vai quebrar a harmonia com o restante do texto”). Vale para família, tamanho, peso e espaçamento. Protótipos gerados por IA podem vir com outra fonte (o de 24/09 trazia título serifado): copie o layout, nunca a tipografia.
  - Exceção pedida pelo usuário (24/09): no celular (360–560px) o kicker da hero diminui com a largura (~10,5px em 375px, até 12px) para ficar em duas linhas. Abaixo de 360px continua com 12px, em três.
- Fontes fixas: Bricolage Grotesque (títulos), Fraunces itálico (destaques), Hanken Grotesk (corpo). Use os tokens existentes (`--bg`, `--bg-2`, `--surface`, `--navy`, `--line`, `--cream`, `--muted`, `--mint`, `--mint-bright`, `--mint-deep`, `--virada`, `--copy-readable`, `--ease-out`).
- **A página inteira é escura.** Classes `.light`, `.gelo` e `.branco` são nomes históricos. O `AGENTS.md` ainda fala em “ritmo dark/light” — isso está desatualizado; não restaure fundos claros.
- Verde-menta (`--virada`) só em sinais de avanço (destino do mapa, “acesso imediato”). Destaques gerais em turquesa.
- Botões no mesmo padrão arredondado (pill).
- Evitar “cara de IA”: sem texto em degradê multicolor, aurora, status dot pulsante.

### Compliance (atenção)
- `brand-guide.md` §13 pede ressalva junto de depoimentos. O usuário removeu a da seção de depoimentos; **a única ressalva da página agora é a do rodapé** (“Não há garantia de contratação, equipe, cirurgia ou prazo para resultados. Resultados podem variar de pessoa para pessoa.”). Não remova a do rodapé sem nova autorização.
- Os prints de depoimentos mostram pessoas reais (fotos de perfil, rosto, mensagens privadas). Foi pedido ao usuário que confirme a autorização delas; ainda sem resposta.
- **Aviso de inscrição: só compras reais.** O usuário pediu o aviso “simulando que pessoas estão comprando” (24/09). Não preencha a lista com nomes inventados: aviso de compra que não aconteceu é publicidade enganosa (CDC art. 37), e o manual veta “urgência falsa” (§12). Isso foi explicado ao usuário. Ele insistiu no mesmo dia (“eu quero fictício, pode fazer com nomes aleatórios, mas bonitos”), e o pedido foi recusado pelo mesmo motivo. Use só o primeiro nome de quem comprou de fato, tirado da plataforma de checkout.

## Estado atual por seção

### Letreiro e hero
- Letreiro fixo no topo em **turquesa** (`--mint`, texto navy `--bg`, contraste 10,2:1) desde 13/09; antes era verde-menta (`--virada`), trocado a pedido do usuário pela opção 1 de `audit-visual/topbar-options/`. Hero com fundo `assets/images/Image - Hero.png` preservado por pedido expresso; CTA no padrão dos botões. Sem botão flutuante.
- **Layout do protótipo do usuário (24/09):**
  - Letreiro: um ícone de linha antes de cada informação (`.mq-item` + `svg.mq-ic`: ao vivo, calendário, relógio, monitor, capelo) e separador também entre “Encontro ao vivo” e a data.
  - Hero: kicker com filete vertical turquesa, botão “QUERO PARTICIPAR” com seta (`svg.btn-ic`, avança 3px no hover). O texto ocupa no máximo 60% da largura, porque à direita fica a Carol.
  - Foto: deixou de ser o fundo da seção e virou a camada `.hero::before`, com altura `--hero-photo: max(56.28vw, 720px)` (proporção 1672×941). A Carol mantém o enquadramento em qualquer largura. Até 560px continua a `Hero_Mobile1.webp` abaixo do texto.
  - Abaixo dos braços da Carol, a foto desfoca e escurece em azul-marinho (pedido do usuário, com print, para o corpo dela não disputar com o título ao lado do vídeo). O escurecimento vai de 0 em 64% a .88 em 71% da altura da foto; `.hero::after` aplica `backdrop-filter: blur(14px)` numa faixa que começa em 64% e se dissolve em cima.
  - O bloco do vídeo fica **dentro da hero**, na primeira dobra (ver abaixo). Acima de 760px, `.hero-top` tem altura mínima para o vídeo começar logo abaixo dos braços da Carol (69% da foto; os braços terminam em 65%).
  - Respiro entre o botão da hero e o vídeo: `--hero-gap: clamp(56px, 6vw, 96px)` acima de 760px (81px na tela do usuário, 1358px). Antes era 40px; o usuário achou o vídeo próximo demais do botão (24/09).

### Vídeo + diagnóstico
- Vídeo ainda é placeholder (botão de play dispara `alert()` — remover antes de publicar). Imagem do diagnóstico: `assets/images/dor-portas-recorte.png`. Orbe com arco animado acima do título “A formação te ensinou a instrumentar…”.
- Bloco do vídeo (`.hero .video-block`, 24/09, dentro da hero):
  - Acima de 960px, duas colunas: vídeo 16:9 à esquerda, com borda turquesa fina e vinheta. À direita, filete de 32px, título “Entenda em poucos minutos…”, os dois parágrafos vindos da hero (`.video-desc`, termos `.mk` sem destaque) e o botão contornado “QUERO CONHECER OS 6 PASSOS” com seta. O título fica no alto e o botão na base do vídeo.
  - Até 960px tudo empilha; até 760px o botão ocupa a largura toda; até 560px o vídeo sobe 56px sobre a base da foto da Carol.
  - Tamanhos e cores de texto são os de antes.
  - Capa do vídeo, quando houver: `style="--video-poster:url('…')"` no `.video-frame`.
  - A seção da dor começa depois da hero, sem margem negativa; o respiro vem do `padding-bottom` da hero.
  - Contraste medido sobre a foto, com o desfoque: título ≥10,2:1, parágrafos ≥11,6:1.

### Mapa (`#mapa`)
- Painel integrado: título, introdução, ECG horizontal com 6 nós travados no desktop, vertical no celular, reflexões/perguntas e CTA. Não executar scripts de preview que sobrescrevam a página.

### Como funciona (`#como-funciona`)
- Capas fotográficas geradas no ChatGPT com a Carol como referência (estilo colagem P&B com retícula, grade fina e neon turquesa): `assets/images/how-aulas.webp` e `how-encontro.webp`, com versões `-900` via `srcset`. Prompts em `human-output/image/gancho-como-funciona/`.
- Cards com raio 16px, capa dissolvendo no card, zoom de 3% no hover, títulos 600, rodapé como etiqueta com borda (verde-menta em “Acesso imediato”, turquesa na data).
- Celular (≤560px): capas em 4:3, `object-position` 45% no card 1 e 75% no card 2.
- A Oferta continua usando os SVGs antigos `how-preparation.svg` e `how-live-map.svg` de propósito.

### Público (`#para-quem`)
- Título grande à esquerda-topo e **sete critérios iguais** (mesmo estilo, sem destaque no sétimo) numa grade de 6 colunas em **2 · 3 · 2** acima de 760px; de 481 a 760px duas colunas com o sétimo na largura toda; até 480px uma coluna.
- Cada critério: check ao lado do texto, filete turquesa de 32px no topo que percorre a linha no hover.

### Carol (`#carol`)
- **Faixa superior** com `assets/hero-equipe.webp` (Carol com a turma) em duotone navy (`mix-blend-mode:luminosity`), grão SVG e degradês. Dentro dela: título “Quem vai te mostrar esse caminho?” e, logo abaixo, os três resultados (divisórias verticais, valor em creme com traço turquesa, rótulo em caixa alta).
- **Abaixo:** narrativa à esquerda (frase de abertura em destaque, dois parágrafos) e retrato `assets/Foto-427-683x1024.webp` à direita. O retrato sobe para dentro da faixa, é `position:sticky` no desktop, tem moldura turquesa deslocada atrás, cantos 20px, vinheta e leve ajuste de cor.
- **Citação final** “Ter um mapa muda completamente…” em bloco turquesa sólido com texto navy (contraste 9,78:1) e ícone de batimento **animado** (SVG `.quote-ecg`, traço se desenhando em loop de 4s; estático com movimento reduzido).
- **Celular:** título e resultados descem na faixa (padding-top 260px) para mostrar os rostos da turma; degradê de baixo para cima; retrato 4:5 com moldura de 14px.
- `carol-retrato.jpg` continua no disco mas não é usado (tem ao fundo uma TV de outra marca).

### Depoimentos (`.sec-proof`)
- Título “Quem recebe direção começa a enxergar o mercado de outra forma.” sem kicker.
- **Sete prints reais** em `assets/images/provas/prova-{5..11}.webp`, recortados automaticamente dos originais em `assets/images/Depoimentos/` (preservados).
- Carrossel em 4 blocos, **iguais no desktop e no celular**: print longo (8) · coluna com 3 curtos (6, 7, 9) · print longo (5) · coluna com 2 curtos (10, 11). Cada bloco é uma parada; as do fim que não cabem viram uma só (3 paradas em 1440px, 4 no celular).
- Cada print é um cartão branco com borda fina, sombra funda, elevação e borda turquesa no hover, lupa no canto. Desktop: blocos de 480px e prints longos de 400px cortados em 550px; ≤900px: 400/340px e corte em 470px; celular como antes.
- Entrada em cascata: prints sobem e aparecem com 70ms de diferença (regra sob `.motion-ready`).
- **Carrossel guiado (versão B do comparador `audit-visual/proof-carousel/`, escolhida pelo usuário em 12/09):** trilho alinhado ao título à esquerda e sangrando até a borda direita, com dissolução à direita (máscara). A cada 5s desliza devagar (700–1400ms, easing quártico, via rAF) até a próxima parada e volta ao início no fim. Pausa com mouse ou foco de teclado (`:focus-visible`, para o foco devolvido pela ampliação não travar a pausa) no carrossel, toque (e 2,5s depois), arrasto, ampliação aberta, aba oculta ou seção fora da tela; sem autoplay com `prefers-reduced-motion`.
- Controles abaixo, alinhados ao conteúdo: contador “01 / 03” (oculto no celular), um segmento clicável por parada que se preenche com o tempo e setas de 56px (46px no celular). A seta “próximo” tem anel turquesa marcando o tempo (cinza quando pausado); no hover a seta atravessa o botão e acende brilho turquesa.
- **Sem CSS scroll-snap** no trilho: o JS encaixa na parada mais próxima após arrasto ou rolagem com o dedo. Não reintroduzir o snap (ver armadilhas).
- **Ampliação** (`#shot-zoom`): o print **viaja da posição do card até o centro** (Web Animations API, 420ms) e volta ao fechar (300ms); setas laterais, ← → e Esc, deslize no celular, pontinhos de posição, troca suave entre prints, foco preso e devolvido ao card.

### Oferta, FAQ, encerramento
- **Oferta (13/09, versão B do comparador `audit-visual/offer-options/` com a estrutura de preço 1):**
  - Título alinhado à esquerda, sem kicker.
  - "Você recebe:" e, abaixo, um único bloco `.ov` com três faixas `.ov-row` alternando capa e texto:
    - aulas com `how-aulas`, encontro com `how-encontro` (via `srcset`);
    - bônus com capa própria `assets/images/oferta-bonus.webp` (e `-900`), gerada no ChatGPT a partir de `Bônus.png` no estilo das capas (celular com vlog, e-book com checklist, mapa com trilha pontilhada); `object-position` à esquerda. Prompts em `human-output/image/gancho-oferta-bonus/`. O SVG antigo e a regra `.ov-bonus-art` foram removidos (13/09).
  - Conectores "+" (`.ov-op`) sobre as linhas divisórias.
  - Títulos `h4.ov-title` com trecho em Fraunces itálico turquesa, filete turquesa de 32px que cresce no hover, descrição com a informação-chave em peso, bônus em lista com traço.
  - O preço fecha o bloco (`.ov-buy`): "DE R$ 297,00", "**6x de R$ 8,82**" em destaque (desde 24/09; "6x de R$" e ",82" pequenos, "8" grande, como era o "R$ 47,00"), "ou **R$ 47,00** à vista" embaixo, fio vertical e botão de 460px com seta. No celular (≤900px) tudo empilha e o fio fica horizontal.
  - Checkout ainda `href="#"` (`#checkout-link`).
  - As capas repetem as de "Como funciona", e o bônus não tem foto (sugestão pendente: gerar capa própria).
  - CSS antigo da oferta (`.offer-box`, `.incl*`, `.plus`, `.price`, `.offer-purchase`, `.bonus-line`) foi removido.
- **Garantia (13/09, versão 2 "certificado" do comparador `audit-visual/guarantee-options/`):**
  - `aside.gcert` com moldura dupla, cantos turquesa e anéis finos irradiando do topo.
  - Medalha com o texto circular "7 dias de garantia · 7 dias de garantia ·" **girando devagar** (`@keyframes gcertSpin`, 28s linear infinito, pedido do usuário) em volta do "7" em Fraunces itálico sobre disco turquesa.
  - Título `h4#garantia-titulo` e o texto de sempre, tudo centralizado.
  - Com `prefers-reduced-motion`, o anel fica parado e legível. A copy da garantia não mudou.
  - CSS antigo (`.guarantee`, `.seal`) removido de todas as camadas.
- **FAQ (13/09, versão 1 "editorial com filete" do comparador `audit-visual/faq-options/`):**
  - Sem kicker. Título grande (até 3,75rem) fixo à esquerda (`position:sticky; top:96px`) com filete turquesa abaixo; perguntas em `<details class="faq">` à direita.
  - Cada pergunta: `summary` com `.q` (avança 6px no hover) e `.pm` (círculo com “+” que vira “−”, turquesa quando aberto). Filete turquesa no topo da linha: 32px no hover, largura toda quando aberta.
  - Resposta em `.a > p`, com altura animada via Web Animations no JS (460ms abrindo, 320ms fechando com `fill:forwards`); sem animação com `prefers-reduced-motion`.
  - ≤900px: uma coluna, título sem sticky. Resposta de “O encontro ficará gravado?” ainda é `[DEFINIR RESPOSTA]`.
- **Encerramento + rodapé (13/09, versão B “foto de fundo” de `audit-visual/closing-options/`):**
  - Estrutura: ambos dentro de `div.closing`. **Em teste (13/09):** equipe de costas sob o foco cirúrgico, `assets/images/encerramento-pessoas.webp` (e `-900`) no desktop e `encerramento-pessoas-m.webp` (e `-m-600`) até 560px via `<source>`; originais `Pessoas_D.png`/`Pessoas_M.png`. Opacidade 1, saturação .9, `mask-image` apagando os 12% de cima da foto. Testadas antes e ainda no disco: tesoura (`encerramento-tesoura*.webp`, de `Tesoura_D/M.png`) e mãos (`encerramento-maos.webp`, de `Ultima_Secao.png`).
  - Posição da equipe: palco `clamp(180px,16vw,240px)` (206px no celular) e foto descendo 6% (4% no celular; 7% até 360px), altura pedida pelo usuário depois de ver 12%/9%. Para compensar, o degradê do meio foi escurecido (`.6` 22% · `.55` 44% · `.6` 58% · `.4` 74%), levando o parágrafo a ~5,9 no desktop; em teste, aguardando aprovação do usuário. Com a tesoura os valores eram 3,5% / 5% / 6,5%, para a passagem ficar entre o botão e o rodapé. As medidas abaixo sobre `--photo-shift:0%` valem para a imagem das mãos.
  - Foto: `picture.closing-photo` com `inset:0`, cobrindo a seção inteira como no exemplo (`object-fit:cover`, saturação .75, opacidade .72, degradês e vinheta).
  - Posição: igual ao exemplo, a pedido do usuário. `--photo-shift:0%` e `--closing-stage` com o espaçamento do exemplo (`clamp(72px,7vw,104px)`; 56px no celular). As mãos ficam no meio da seção, atrás da parte de baixo do texto. Uma versão anterior empurrava a foto para baixo (20%/155px) para mostrar as mãos entre o botão e o rodapé; o usuário achou a imagem baixa demais.
  - Título: a frase em itálico é bloco próprio, com a mesma quebra do exemplo.
  - Animação: aproximação suave ao entrar; parada com movimento reduzido.
  - Rodapé: sobre a mesma foto, com marca e data na mesma linha e ressalva legal (`.legal`) mais legível. A ressalva continua obrigatória.

### Aviso de inscrição (toda a página, 24/09)
- Pedido do usuário, com print de exemplo (caixa verde com check, “**Stella** garantiu vaga na turma”): aparecer “de forma leve e sutil em alguns momentos”, sem atrapalhar. Depois (24/09), pediu que voltasse a aparecer quando a pessoa sobe a página, “sem lotar a tela, mas com sensação de constância”.
- **Visual:** cartão fixo no canto de baixo à esquerda (24px; 16px até 560px), navy `.95` com desfoque de 16px, borda turquesa fina e cantos de 14px. À esquerda, um check verde-menta (o manual reserva o verde para ícones de sucesso) que se desenha ao aparecer. Nome em creme 700, resto em creme `.8`, na Hanken do corpo (15px; 14px no celular). À direita, um “×” discreto. Entra subindo 12px e sai em fade (450ms); com movimento reduzido, só aparece e some.
- **Dados:** `<script type="application/json" id="compras-reais">` no fim do `<body>`, com uma lista de primeiros nomes (`["Stella", "Mariana"]`). Vazia, o aviso nem é ativado (o `div.buy-toast` fica com `hidden`). Prévia do visual: `?compras=exemplo` no endereço usa Stella, Mariana, Letícia e Rafael, e nunca aparece para quem visita sem o parâmetro. Na prévia, o primeiro aviso vem ~3s após abrir, e os 4 nomes recomeçam em nova ordem (sem repetir o último), para mostrar o ritmo.
- **Ritmo (constância, 24/09):**
  - O primeiro aparece 6–10s após abrir a página, em qualquer ponto dela, inclusive no topo.
  - Cada aviso fica 5s na tela, e o próximo vem 15–25s depois. Um de cada vez.
  - Até 12 por visita, em ordem sorteada. Com compras reais, nenhum nome se repete na visita: com 3 compras, são 3 avisos.
  - Antes era: primeiro só depois de rolar 60% da tela, 5,5s na tela, 38–64s de intervalo e no máximo 4. O usuário viu só um e pediu constância.
- **Nunca cobre** `.btn`, `.rail-nav` nem as perguntas do FAQ. O `.video-frame` também é evitado, mas só quando metade dele ou mais está na tela, quando alguém pode estar assistindo; só a borda de cima aparecendo lá embaixo não conta.
  - Antes de aparecer, mede a área com o nome da vez; se algo estiver embaixo, tenta de novo em 2s.
  - Depois de aparecer, fica os 5s mesmo com a rolagem, no celular e no computador (pedido do usuário, 24/09). Antes, saía se um botão passasse embaixo, e no celular sumia a cada deslizada.
  - Em tela de toque (`hover:none` ou `pointer:coarse`), o aviso na tela tem `pointer-events:none`: o toque no texto chega ao botão embaixo, e só o “×” responde. No computador, o mouse em cima continua segurando o aviso.
  - No topo, aparece em 375, 390, 1358 (650 e 760 de altura) e 1920px. Em 1440×900 espera rolar, porque o vídeo fica mais da metade na tela.
- **Espera** com a aba oculta, com a ampliação dos prints aberta e com “Pausar animações automáticas” ligado (se for pausado com o aviso na tela, ele sai). Com o mouse ou o foco em cima, fica; ao sair, some em 2,5s.
- **“×”:** fecha e encerra os avisos na sessão (`sessionStorage` `avisos-fechados`); é o mecanismo de parar exigido pela WCAG 2.2.2.
- **Leitor de tela:** o texto visível é `aria-hidden`, e o anúncio vai por `p.bt-live` (`role="status"`), uma vez por aviso.
- **Contraste**, mesmo sobre os prints brancos: texto ≥9,5:1, nome ≥14:1, “×” ≥5,2:1, anel do check ≥3,3:1.

## Armadilhas técnicas já encontradas (não repita)

- **`[hidden]` vs `display`:** uma classe com `display:grid` vence o `display:none` do atributo `hidden`. A camada de ampliação ficou aberta e desfocou a página inteira. Sempre pareie com `.classe[hidden]{display:none}`.
- **`setPointerCapture` no `pointerdown`** rouba o clique dos botões filhos. No carrossel a captura só acontece após 4px de movimento.
- **`requestAnimationFrame` como gatilho** de animação falha quando a renderização está pausada. A ampliação dispara direto após forçar layout, com `load` e `setTimeout` como rede.
- **Supressão global de animações** em `prefers-reduced-motion` (`*{animation:none!important}`) pode deixar invisíveis elementos que dependem da animação para aparecer (ex.: traço SVG com `stroke-dashoffset`). Crie regra própria para o estado final.
- `.reveal` depende de IntersectionObserver + `.in-view`. Elementos com opacidade inicial 0 precisam estar sob `.motion-ready` para continuarem visíveis sem JS.
- **CSS scroll-snap + deslize por JS:** desligar o snap durante o deslize e religar no fim faz o Chrome re-encaixar no card em que estava travado (o trilho voltava a 0). O carrossel de depoimentos não usa snap; o JS encaixa na parada.
- **`.reveal` sobrescreve `transform`:** a regra de entrada define `transform` em `.reveal`/`.in-view`. Não centralize com `transform:translateX(-50%)` um elemento que também tem `.reveal` (a foto do encerramento ficou deslocada para a direita). Use `inset`, margens ou a propriedade `translate`.
- **Cache do servidor local:** navegar para a mesma URL pode manter o HTML antigo. Use `?v=...` para forçar a versão nova antes de medir.
- **Painel oculto também congela `resize` e IntersectionObserver.** Depois de emular outro tamanho, dispare `dispatchEvent(new Event('resize'))`. Para testar deslizes, troque `requestAnimationFrame` por `setTimeout` antes do clique.
- **Playwright + letreiro fixo:** `page.click('.motion-toggle')` rola a página para cima (o botão é sticky); um clique de verdade não rola. Volte à posição antes de medir.
- **Aviso de inscrição nos testes:** entra num momento sorteado e fica só 5,5s. Com `page.clock`, avance em passos e confira durante; num instante fixo ele pode já ter ido embora.

## Como verificar neste ambiente

- O painel de preview **congela a renderização** quando oculto: capturas saem em branco ou no topo da página, rolagem suave não anda, animações e rAF não progridem. Medidas via JS continuam válidas.
- Para capturar uma seção: `document.documentElement.style.scrollBehavior='auto'`, `scrollTo` numa chamada isolada e `screenshot` em outra chamada.
- Force `document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in-view'))` antes de medir.
- **Cliques:** use clique real (`computer left_click`), nunca só `element.click()` — foi assim que o bug do ponteiro passou despercebido. Para coordenadas 1:1, emule o viewport em 800×600.
- Para confirmar animações, espione `Element.prototype.animate` antes do clique.
- Scripts de edição com CSS/aspas: heredoc no Bash quebra; grave o `.py` com a ferramenta de arquivo no scratchpad e rode com `py`.
- Sempre conferir: overflow (`scrollWidth === clientWidth`) em 1440, 900, 768, 375 e 320px, erros de console e captura de tela da seção alterada.

## Comparadores e arquivos de apoio

- `audit-visual/audience-options/` — 3 versões (V1 Diagnóstico, V2 Editorial, V3 Percurso) de público + Carol; serviu de base para a versão atual.
- `audit-visual/quote-options/` — 4 variações da citação final; o usuário acabou pedindo o bloco turquesa.
- `audit-visual/proof-carousel/` — 3 versões do carrossel de depoimentos (A fluxo contínuo, B passo a passo guiado, C duas faixas); o usuário escolheu a **B**, já na página.
- `audit-visual/offer-options/` — 3 versões da oferta "Sua vaga" (A ingresso, B vitrine, C cartão com capa), baseadas nas referências Claude Economy e Human Academy. Rodada 2 (13/09): só oferta, sem garantia, entregas antes do preço; aguardando escolha. A garantia será tratada depois.
- `audit-visual/guarantee-options/` — garantia embutida abaixo do fim da oferta real, com seletor: 0 atual, 1 numeral editorial (“7” em Fraunces itálico, fio, filete, linha de ECG sutil), 2 certificado (moldura dupla, cantos turquesa, anéis finos, medalha com texto circular), 3 imagem + texto (mesmo formato das faixas da oferta, espaço tracejado para imagem a gerar). Copy idêntica. O usuário escolheu a **2** com o selo girando; já está na página.
- `audit-visual/faq-options/` — FAQ com seletor: 0 atual, 1 editorial com filete (título sticky, filete que percorre a linha aberta), 2 cartões em duas colunas, 3 índice + leitura (tablist à esquerda, resposta em painel; sanfona no celular). Copy idêntica. O usuário escolheu a **1**, sem o kicker; já está na página.
- `audit-visual/closing-options/` — encerramento + rodapé integrado, com seletor: 0 atual, A batimento atravessando (ECG se desenhando até um ponto verde-menta acima do botão, pulso de luz, grade do mapa; recomendada), B mãos exatamente como na página, C luz cirúrgica (`encerramento-luz.webp`, gerada de `Luz_Cirurgica.png`), C1 luz descida (`--shift` 30% no desktop / 22% até 900px, parágrafo ≥4,5 de contraste), C2 luz escurecida (faixa do meio .55). Aguardando o usuário decidir entre manter as mãos ou trocar pela luz (C1 recomendada). Referências: Human Academy, Claude Economy e Dever de Prosperar. Copy idêntica. Histórico: o usuário escolheu a linha **foto de fundo** em 13/09 e, depois, a imagem do cenário 1 (mãos passando o instrumental, prompt `human-output/image/gancho-encerramento/chatgpt-1-passagem-instrumental.txt`). Ainda não está na página: o arquivo da imagem precisa ser salvo no disco; script de aplicação no scratchpad (`apply_closing_photo.py`).
- `audit-visual/topbar-options/` — letreiro do topo com a página real num iframe e seletor embaixo (injeta só as cores): 0 atual verde-menta, 1 turquesa `#2AD2C1` com texto navy (10,2:1, recomendada), 2 faixa navy `#0C1236` com linha turquesa e data em `#45E4D3` (11,5:1), 3 turquesa fechado `#0E766C` com texto creme (4,8:1; o `--mint-deep` com creme dá só 2,56). Motivo: o verde-menta do letreiro destoa do turquesa da página e o manual reserva o verde para sinais de avanço. O usuário escolheu a **1** (13/09); já está na página.
- `audit-visual/price-block/` — 3 estruturas do bloco de preço (1 duas colunas com fio, 2 centralizado sóbrio, 3 faixa compacta), mostradas largas e em 375px. Servem para a B e a C, porque o fechamento de ambas não agradou (preço com "R$" e ",00" no alto, caixa dentro de caixa, ícone de raio). O usuário precisa ver embutido, então a rodada 3 de `offer-options/` tem seletor fixo 1/2/3 aplicando o bloco dentro da B e da C; aguardando escolha.
- `audit-visual/mentor-visual/`, `mentor-editorial/`, `audience-mentor/`, `page-polish/`, `map-*`, `how-refinement/`, `section-pain/` — etapas anteriores, históricas.
- `human-output/image/gancho-como-funciona/` — brief e prompts (Nano Banana e ChatGPT) das capas.

## Pendências e sugestões em aberto

**Aguardando o usuário**
- Autorização das pessoas que aparecem nos prints de depoimentos.
- Confirmação jurídica da remoção do aviso de depoimentos (§13 do manual).
- Conteúdo real: vídeo principal, link do checkout, resposta sobre gravação. (Parcelamento definido em 24/09: 6x de R$ 8,82.)
- Nomes de compras reais para o aviso de inscrição (`#compras-reais`), quando as vendas começarem. Até lá, o aviso fica desligado.
- Fotos originais em alta resolução de `hero-equipe.webp` (1024×683) e `Foto-427-683x1024.webp` (683×1024), usadas grandes na seção da Carol.

**Técnicas (não feitas, sugeridas)**
- Peso: `Image - Hero.png` (1,6 MB, carregada como background CSS, atrasa o LCP) e `dor-portas-recorte.png` (1,9 MB) — converter para WebP.
- Remover o `alert()` do placeholder de vídeo antes de publicar.
- Dívida de CSS: várias camadas empilhadas redefinindo os mesmos seletores, `:root` repetido e regras mortas (`.aurora`, `ctapulse`, `.btn-ghost`, `.split`, `.hero-img-slot`, seletores `.carol-*` históricos).
- Arquivos órfãos em `assets/` (`Teste -2.png`, `Image - Hero1.png`, `Image_1/2.png`, `dor-portas1/2.png`, `dor-portas-recorte-v2.png`, `dor-observando.webp`, `dor-formacao.jpg`, `dor-perguntas.png`, `carol-retrato.jpg`).
- Sem Open Graph, favicon, pixel ou analytics.
- Não publicar `audit-visual/` junto com a página.
