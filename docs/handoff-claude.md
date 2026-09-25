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
  - Oferta (24/09): as linhas “R$ 47,00 à vista · ou 6x de R$ 8,82”, “Pagamento seguro • Acesso imediato” e a etiqueta “AO VIVO” vieram do protótipo que o usuário pediu para implementar (no protótipo, “R$ 47 à vista”; ficou “R$ 47,00” para bater com o preço). “Pagamento seguro” depende da plataforma de checkout; remova se ela não oferecer.
  - Aviso de inscrição (24/09): “<nome> garantiu vaga na turma”, texto do exemplo que o usuário enviou ao pedir o aviso. Os nomes vêm só de compras reais (ver “Aviso de inscrição” abaixo).
  - FAQ (24/09):
    - O rótulo “Dúvidas frequentes” (em caixa alta via CSS) acima de “Ficou com alguma dúvida?” e os números 01–06 antes das perguntas vieram do pedido expresso do usuário ao recriar a seção pela referência.
    - O rótulo substitui a remoção do kicker “Dúvidas” de 13/09.
    - Perguntas, respostas e título não mudaram (conferido texto a texto).
- Nunca revele nomes ou conteúdo dos 6 passos. Não invente métricas nem altere condições comerciais.

### Identidade
- **NÃO ALTERE AS FONTES** (pedido expresso do usuário em 24/09: “senão vai quebrar a harmonia com o restante do texto”). Vale para família, tamanho, peso e espaçamento. Protótipos gerados por IA podem vir com outra fonte (o de 24/09 trazia título serifado): copie o layout, nunca a tipografia.
  - Exceção pedida pelo usuário (24/09): no celular (360–560px) o kicker da hero diminui com a largura (~10,5px em 375px, até 12px) para ficar em duas linhas. Abaixo de 360px continua com 12px, em três.
- Fontes fixas: Bricolage Grotesque (títulos), Fraunces itálico (destaques), Hanken Grotesk (corpo). Use os tokens existentes (`--bg`, `--bg-2`, `--surface`, `--navy`, `--line`, `--cream`, `--muted`, `--mint`, `--mint-bright`, `--mint-deep`, `--virada`, `--copy-readable`, `--ease-out`).
- **A página inteira é escura.** Classes `.light`, `.gelo` e `.branco` são nomes históricos. O `AGENTS.md` ainda fala em “ritmo dark/light” — isso está desatualizado; não restaure fundos claros.
- Verde-menta (`--virada`) só em sinais de avanço (destino do mapa) e no check do aviso de inscrição. Destaques gerais em turquesa. A etiqueta “Acesso imediato” de “Como funciona” era verde-menta e passou a turquesa a pedido do usuário (24/09); não voltar com o verde nela.
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
- **Referências do usuário (24/09):** o painel virou vidro (print 1): navy translúcido com desfoque, borda turquesa que acende nos cantos, brilho interno e um filete curto acima do título.
  - **Luz só por dentro** (ajuste do usuário, com setas no print 2): fora do painel não há brilho, só uma sombra escura de profundidade. Saíram o brilho turquesa externo e as duas manchas de luz do fundo da seção.
  - A borda real é transparente (`background-clip:padding-box`) e a linha visível é uma só, o anel em `.wrap::after`. Ela acende no canto de cima à esquerda, na lateral esquerda (~36%), no meio da base e no canto de baixo à direita.
  - A luz desses pontos entra no vidro por `.wrap::before` (`z-index:-1`, abaixo do conteúdo), com tamanhos menores até 760px.
  - O percurso segue o print 2: linha com brilho, nós com anel turquesa aceso **sem o cadeado**, e uma haste com ponto até “PASSO 0X”. No computador, pontos acesos nas pontas da linha (os marcadores dos rótulos saem).
  - Fio vertical entre as duas colunas de texto.
  - **Fundo atual: carta de navegação (24/09, imagem do usuário gerada com o prompt `human-output/image/gancho-mapa/03-carta-navy-lupa.txt`).**
    - Carta em navy estilo cianotipia, com lupa à esquerda sobre um ponto de luz (“você está aqui”) e rosa dos ventos à direita. `assets/images/mapa-carta.webp`, gerado de `assets/Imagem do ChatGPT 24 de set. de 2026, 20_41_26.png`. O alto (14%) e a base (28%) vêm transparentes no próprio arquivo.
    - Mesma linha da serra: por baixo do navy translúcido do painel. Mas ocupa a **largura inteira** (`50% 30% / 100% auto`), não `cover`: o card é quase quadrado e o `cover` cortaria a lupa e a rosa. No computador, a lupa cai sobre “FORMAÇÃO” e o passo 1, e a rosa ao lado do passo 6.
    - Até 760px, **imagem vertical própria** (pedido do usuário, 24/09: “só adicione ela, não mexa na transparência… a única coisa que é para você mexer é o posicionamento”): `assets/images/mapa-carta-m.webp` (941×1672, de `assets/Imagem do ChatGPT 24 de set. de 2026, 20_45_58.png`; a pedido do usuário, a base vem dissolvida no arquivo, do 66% da altura para baixo, para suavizar onde a imagem termina, na altura dos passos 4 e 5), em `100% auto` no alto do card (`50% 0`). Antes estava em `cover` com `14% 0`, mas o usuário achou que só mostrava a lupa e pediu para ela não cobrir o card todo. Com o navy a 90–95% ela quase não aparece no celular; foram mostradas prévias com o navy só do celular em 80–88% e 70–80%. O usuário aplicou primeiro a de 80–88% e depois escolheu a de **70–80%** (`.7`→`.8`), que é a atual, só até 760px. A camada navy do celular é própria (fica na regra do celular, que reescreve as três camadas), mais transparente que a do computador.
    - Escurecida a pedido do usuário (24/09, “um pouco mais escurecido”): o degradê navy por cima passou de `.62`→`.74` para `.72`→`.82` e, num segundo pedido (“escureça mais um pouco”), para `.8`→`.88` e, num terceiro, para `.86`→`.92`. Depois, o usuário confirmou que se referia à transparência da camada por cima (“deixe menos transparente o fundo por cima da imagem”): `.9`→`.95`.
    - Substituiu a serra (`mapa-montanhas*.webp`, ainda no disco). A subida de 44px entre 761 e 1100px deixou de existir.
  - **Paisagem de fundo (24/09, substituída pela carta acima):** serra noturna com clarão no horizonte, no alto do painel, atrás do título e do percurso.
    - Arquivo: `assets/images/mapa-montanhas.webp`, gerado de `assets/Imagem do ChatGPT 24 de set. de 2026, 19_32_00.png` (1672×941). A base já vem transparente no arquivo (de 56% da altura para baixo), por isso some no navy do vidro antes dos textos em qualquer largura. Se trocar a imagem, refaça essa transparência.
    - **Fica por baixo do navy translúcido de sempre do painel** (ajuste do usuário, 24/09: com a imagem por cima “ficou muito forte”; ele pediu o fundo como estava, com a imagem visível por transparência, e mandou um exemplo de imagem apagada atrás de fundo escuro). Para deixar mais ou menos visível, mexa na opacidade do degradê navy (`.62`→`.74`).
    - **Em teste (24/09, pedido do usuário “para eu ver como fica”):** a imagem cobre o card inteiro, com `assets/images/mapa-montanhas-inteira.webp` (sem a transparência na base) em `75% 50% / cover`, ainda por baixo do navy. A subida de 44px entre 761 e 1100px ficou desativada. O comentário no CSS explica como voltar à serra só no alto; aguardando o usuário escolher.
    - É a última camada de `background` do `#mapa > .wrap` (`50% 0 / max(100%,1000px) auto`). De 761 a 1100px sobe 44px, senão o clarão cai atrás de “PRIMEIRA OPORTUNIDADE”.
    - As curvas de nível (`map-contours.svg` em `.map-stage::before`) saíram, porque o protótipo não as tem.
    - Rótulos, título e introdução ganharam um halo navy (`text-shadow`) para seguirem legíveis sobre o clarão.
  - As 3 perguntas em linhas com seta turquesa no fim.
  - “QUERO DESCOBRIR” ganhou seta.
  - Fontes, tamanhos e pesos iguais aos de antes. O cadeado saiu por seguir a referência; volta removendo `#mapa .node .disc svg{display:none}`.
- **Celular (24/09, pedidos do usuário):**
  - **Bolinha na linha (computador e celular):** percorre a linha em SMIL. Era a isso que o usuário se referia ao pedir “a animação” no celular: antes ela só existia no SVG do computador.
    - Cada SVG tem o traçado em `<defs>` (`#ecgRouteDesk`, `#ecgRouteMob`, `pathLength="1"`). O rastro são 4 `<use>` desse traçado exato, com traço curto animado.
    - A bolinha anda por `<mpath>` num caminho arredondado criado pelo JS (`#…Ball`, desvio padrão de 8 unidades no computador e 5 no celular). Os picos do computador ficam mais agudos na tela.
    - **Movimento fluido (pedidos do usuário, 24/09: “mais suave e menos rígida”, depois “os trajetos pequenos ainda estão rígidos”):**
      - O JS `tunePulse` calcula as tabelas SMIL uma vez, no ocioso, só para o SVG visível. Sem JS fica a versão declarada no HTML, que é mais simples.
      - A velocidade é limitada pela curva (≤ √(GRIP/curvatura), como aceleração lateral) e só muda aos poucos (`RAMP`): a bolinha freia antes de cada ponta e retoma depois.
      - No percurso inteiro, sai devagar (10% do tempo) e chega devagar (12%), em cruzeiro no meio. O ciclo tem 5s: 4,2s de percurso e 0,8s de pausa.
      - A bolinha entra e sai em fade.
      - O rastro vai de onde a bolinha estava 300/190/110/50ms antes até onde ela está, então encurta nas pontas e estica nos trechos rápidos.
      - Resultado: o maior giro de direção entre quadros caiu de 137° para 60° no computador e de 108° para 40° no celular. A bolinha passa a ~6px das pontas no computador (dentro do halo) e ~2,6px no celular; o rastro acende a ponta exata.
    - **Armadilha:** não amostrar o traçado com `getPointAtLength` em laço (milhares de chamadas travavam a página: 1,9s no computador, 8,6s num celular lento). O `tunePulse` lê o atributo `d` (M, L, H, V, C) e achata as curvas ele mesmo: 21ms e 75ms.
    - A bolinha é feita de traços com `vector-effect:non-scaling-stroke`, para ficar redonda nos dois SVGs, que esticam diferente na largura e na altura: um `<circle>` ficava oval, 12,7×8px em 430px no celular e 8,8×9,8px no computador.
    - O brilho da bolinha vem de dois anéis translúcidos, sem `filter`, porque num elemento tão pequeno o filtro é recortado e a bolinha some. O rastro tem brilho só no computador.
    - Pausa fora da tela e com “Pausar animações automáticas” (pega o `svg:has(animateMotion)`). `.ecg-run` e `.ecg-pulse` somem com movimento reduzido.
  - Uma animação de desenho da linha com gatilho no meio da tela chegou a ser feita e foi desfeita a pedido do usuário. O mapa aparece inteiro, como antes.
  - **PASSO 06:** a linha desce do nó 6 e terminava dentro do rótulo. Agora o rótulo fica 12px mais baixo que os outros e a haste desse nó sai; “PRIMEIRA OPORTUNIDADE” desceu o mesmo tanto (gap de 14px mantido).

### Como funciona (`#como-funciona`)
- Capas fotográficas geradas no ChatGPT com a Carol como referência (estilo colagem P&B com retícula, grade fina e neon turquesa): `assets/images/how-aulas.webp` e `how-encontro.webp`, com versões `-900` via `srcset`. Prompts em `human-output/image/gancho-como-funciona/`.
- Cards com raio 16px, capa dissolvendo no card, zoom de 3% no hover, títulos 600, rodapé como etiqueta com borda, turquesa nas duas. A etiqueta “Acesso imediato” era verde-menta com ícone de raio; a pedido do usuário (24/09, com print), ficou igual à da data, “22 de outubro • 20h • Online e ao vivo”, e perdeu o ícone. As regras `.badge.mint` saíram.
- Celular (≤560px): capas em 4:3, `object-position` 45% no card 1 e 75% no card 2.
- A Oferta continua usando os SVGs antigos `how-preparation.svg` e `how-live-map.svg` de propósito.

### Público (`#para-quem`)
- **Layout da referência do usuário (24/09):**
  - Título grande à esquerda-topo e **sete critérios iguais** em **cartões de vidro**: navy translúcido, borda fina, cantos de 12px.
  - Cada cartão tem, no topo, um filete turquesa desenhado sobre a própria borda: começa no canto, acompanha a curva de 12px e se dissolve para a direita (até 120px, no máximo 30% da largura; traço de 2px) e para baixo na lateral, com brilho. Ajuste do usuário (24/09): antes o filete começava 14px depois do canto. O check fica num anel de 44px (40px no celular) com leve brilho, seguido de um fio vertical e do texto.
  - Fontes, tamanhos e pesos iguais aos de antes: 18px, e 16px a partir de 1000px para baixo. Os cartões não reagem ao hover, porque são leitura.
- **Grade:** 2 · 3 · 2 acima de 1100px; de 761 a 1100px, duas colunas com o sétimo na largura toda; até 760px, uma coluna.
- **Fundo:**
  - Brilho suave de foco cirúrgico no alto à direita.
  - A foto da sala (como na referência) ainda não existe. Ela entra por `--who-photo` na `section`, e o CSS já escurece da esquerda para a direita.
  - Prompt em `human-output/image/gancho-para-quem/`.
- **Da referência, ficou de fora** por ser texto ou peso de fonte, e não layout: o kicker “O GANCHO DA VIRADA” acima do título e os trechos em negrito dentro dos critérios. Só com pedido do usuário.

### Carol (`#carol`)
- **Faixa superior** com `assets/images/carol-equipe.webp` (Carol com a turma, 1448×1086) em duotone navy (`mix-blend-mode:luminosity`), grão SVG e degradês.
  - **Foto trocada a pedido do usuário (24/09):** é a mesma foto da turma, numa versão nova enviada pelo usuário, com sala cirúrgica azul e focos acesos no fundo, sem a parede branca e sem a marca do hospital. O arquivo veio pelo chat, reduzido; se o original for maior, basta trocar mantendo o nome.
  - Enquadramento `center 30%` acima de 760px (era 42% com a foto antiga, que era 3:2). Com 42%, a foto nova (4:3) cortava as cabeças de trás em telas largas, e o fim de “mostrar” passava sobre o rosto da Carol. O celular mantém o recorte próprio.
  - A foto real, `assets/hero-equipe.webp`, continua no disco sem uso, para voltar se preciso.
  - Mostrada ao usuário e **não aplicada**: a foto nas cores originais (sem cinza, opacidade .62).
  - **Transição sem corte seco (pedido do usuário, 24/09, com print da base da faixa):**
    - As camadas de cima e de baixo terminam exatamente no `--bg-2` das seções vizinhas. O degradê de baixo passou para cima do escurecimento lateral e ficou mais longo e suave (até 62%).
    - O grão some perto das bordas (`mask-image`).
    - Na base, `span.mentor-blur` desfoca a foto aos poucos com `backdrop-filter`: 12px nos 34% de baixo no computador, abaixo do rosto da Carol; 10px e 50% no celular.
    - Antes, a borda de baixo tinha um degrau de cor (18,23,50 sobre 12,18,54): o grão clareava e o escurecimento lateral escurecia até a última linha.
    - O fio de 1px no topo é a borda do `#para-quem`, o mesmo divisor do mapa e da oferta, e foi mantido.
  - Dentro da faixa: título “Quem vai te mostrar esse caminho?” e, logo abaixo, os três resultados (divisórias verticais, valor em creme com traço turquesa, rótulo em caixa alta).
- **Abaixo:** narrativa à esquerda (frase de abertura em destaque, dois parágrafos) e retrato `assets/Foto-427-683x1024.webp` à direita. O retrato sobe para dentro da faixa, é `position:sticky` no desktop, tem moldura turquesa deslocada atrás, cantos 20px, vinheta e leve ajuste de cor.
  - **Borda da foto (24/09, referência do usuário e três ajustes):**
    - Hoje é um fio turquesa nítido de 1px (`--mint-bright`, `.mentor-rim`), **sem brilho nem desfoque**. Ele engrossa um pouco (2px, `.mentor-rim-bold`: segundo anel mascarado) em cinco pontos: canto de cima à direita, laterais a 35% da altura, base a 34% da largura e canto de baixo à direita. Nesses pontos o trecho grosso volta aos poucos para o fio fino.
    - O caminho até aqui:
      1. Borda com brilho em volta.
      2. “Pontos de luz mais fortes”: núcleo branco e rastros. O usuário achou “extremamente forte… horrível”.
      3. Brilho difuso e leve.
      4. Pedido final: “eu não quero blur, deixe a borda um pouquinho mais grossa em alguns pontos estratégicos. Somente isso.”
    - **Não voltar** com brilho, halo, desfoque, núcleos ou rastros na borda.
    - Aparece depois que a foto sobe; com movimento reduzido, já aparece pronta.
    - O usuário pediu para **não mudar o tamanho da foto nem mexer ou engrossar a moldura deslocada**: as duas continuam iguais, conferido de 320 a 1920px.
- **Citação final** “Ter um mapa muda completamente…” em **vidro escuro com borda turquesa acesa** (fundo da referência do usuário, 24/09), texto turquesa `--mint-bright` (contraste 10,6:1) e ícone de batimento **animado** também turquesa (SVG `.quote-ecg`, traço se desenhando em loop de 4s; estático com movimento reduzido).
  - A borda é sombra interna (`inset 0 0 0 1px`), então o bloco tem o mesmo tamanho de antes. Fonte, tamanho e peso não mudaram.
  - Na referência, o ícone fica à esquerda do texto; aqui continua acima, porque o pedido foi só o fundo.
  - Antes era um bloco turquesa sólido com texto navy (9,78:1).
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
- **Oferta (24/09, recriada pelo protótipo do usuário):** o usuário pediu para já implementar a estrutura e, se as imagens atuais não servissem, deixar o layout pronto para as novas.
  - Container de 1232px. Título “Entre para o Gancho da Virada e receba:” **centralizado** acima de 900px (à esquerda abaixo).
  - Cartão base comum (`.ov-core li`, `.ovb-card`, `.ov-buy`): vidro navy, borda turquesa `.2`, raio de 18px e um fio de luz no alto. Hover acende a borda.
  - **Entregas (`ul.ov-core`, 2 colunas; 1 coluna até 1100px):** ícone num anel de 56px (`.ovc-ic`: tela com play nas aulas, calendário no encontro), texto (`.ovc-text`) e capa sangrando à direita (`figure.ovc-art`, 40% da largura, dissolvendo para a esquerda). Até 560px a capa vira faixa 16:9 no alto do cartão.
    - Capas **provisórias**: `how-aulas` e um recorte de `how-encontro` na Carol (`--art-pos:88% 8%; --art-zoom:2.3`). Com imagem nova, basta trocar o arquivo e tirar `--art-zoom`. Etiqueta “● AO VIVO” (`.ovc-live`, ponto fixo, sem pulsar) sobre a capa do encontro.
  - **Bônus (`.ovb-list`, 3 cartões `.ovb-card`):** número em etiqueta com borda, título, filete de 32px com brilho (cresce no hover) e a imagem embaixo, subindo 10px por trás do texto com a parte de cima dissolvida. De 561 a 900px os cartões deitam (texto à esquerda, imagem à direita); até 560px empilham. As imagens `bonus-vlog/ebook/mapa.webp` já servem.
  - **Preço (`.ov-buy`, cartão próprio):** valor à esquerda com traço turquesa sob “6x de R$ 8,82” (“6x de R$” e “,82” passaram de `--muted` para creme; tamanhos iguais), fio vertical e, à direita, botão com brilho, “R$ 47,00 à vista · ou 6x de R$ 8,82” (`.ov-sum`) e cadeado + “Pagamento seguro • Acesso imediato” (`.ov-safe`). Até 900px empilha.
  - Saíram o bloco único `.ov`, as faixas `.ovb-row`/`.flip` e os conectores “+” (`.ovb-op`).
  - Fontes, tamanhos e pesos iguais aos de antes. Checkout ainda `href="#"` (`#checkout-link`).
- **Garantia (13/09, versão 2 "certificado" do comparador `audit-visual/guarantee-options/`):**
  - `aside.gcert` com moldura dupla, cantos turquesa e anéis finos irradiando do topo.
  - Medalha com o texto circular "7 dias de garantia · 7 dias de garantia ·" **girando devagar** (`@keyframes gcertSpin`, 28s linear infinito, pedido do usuário) em volta do "7" em Fraunces itálico sobre disco turquesa.
  - Título `h4#garantia-titulo` e o texto de sempre, tudo centralizado.
  - Com `prefers-reduced-motion`, o anel fica parado e legível. A copy da garantia não mudou.
  - CSS antigo (`.guarantee`, `.seal`) removido de todas as camadas.
- **FAQ (24/09, recriada pela referência do usuário, “aparência premium e sofisticada”):** é uma pausa sem foto entre a oferta e o encerramento.
  - **Fundo só em CSS:** navy `#080C22`, luz turquesa muito leve no canto de baixo à esquerda, azul discreto no alto e vinheta nas bordas.
  - **Arte em SVG inline (`aria-hidden`):**
    - Um “?” grande em contorno na coluna da esquerda: dois traços numa máscara, cor `rgba(42,210,193,.13)`.
    - Uma linha de batimento fina, em degradê que some nas pontas e com brilho só no pico. Ela vai do canto de baixo à esquerda até os cartões.
    - Não há grão nem foto.
  - **Computador:**
    - Container de 1232px (1184 de conteúdo), colunas 40/60, padding vertical `clamp(96px,9.4vw,132px)`. O título não é mais sticky.
    - Na coluna da esquerda: filete, “DÚVIDAS FREQUENTES” (Hanken 12px, 500, tracking .32em, `--muted`, 6,3:1), o título de sempre (mesmos tamanhos) e um filete de 40px abaixo.
  - **Cartões (`details.faq`):**
    - Fundo sólido um pouco mais claro que a seção (`#0C1233`→`#0A0F2C`). É sólido de propósito: a linha de batimento termina atrás do cartão, como na referência.
    - Borda de 1px azulada (`.17`), raio de 14px e 14px entre os cartões.
    - Em cada linha: número `01`–`06` (`span.faq-n`, `aria-hidden`, Bricolage 18px turquesa), divisória de 1px, a pergunta (fonte de sempre) e um botão circular de 44px. O “+” gira 45° e vira “×”.
    - Hover: borda turquesa e leve luz interna. Aberto: borda turquesa `.4`.
    - A resposta alinha com a pergunta; no celular, ocupa a largura do cartão.
  - **Uma aberta por vez:** abrir uma pergunta fecha a outra com a mesma animação de altura (Web Animations). Pelo teclado e com movimento reduzido, abre sem animação. Os cartões entram em sequência (`.tx-group`).
  - **Até 980px:** uma coluna, título primeiro, “?” menor no alto à direita e batimento na base.
  - **Até 560px:** padding de 72/88px e cartões mais compactos (número de 22px, botão de 34px). As fontes são as de antes: pergunta em 1.125rem, resposta em 1rem.
  - A resposta de “O encontro ficará gravado?” continua `[DEFINIR RESPOSTA]`.
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
- **IntersectionObserver em elemento de dentro de SVG** (`path`, `g`) é o ponto menos confiável, sobretudo no Safari do iPhone. Se não for detectado na tela, o controle de animações contínuas deixa a animação pausada. Observe o `<svg>` e aplique o estado ao filho. A linha de batimento da citação (`.quote-ecg`) passou a ser assim em 24/09, depois de o usuário relatar que ela parou no celular.
  - Ela fica parada de propósito com movimento reduzido no aparelho: no iPhone, Ajustes > Acessibilidade > Movimento; no Android, “Remover animações”.
  - Também fica parada depois de um toque no botão de pausa (‖) do letreiro.
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
- `audit-visual/quote-options/` — 4 variações da citação final; o usuário acabou pedindo o bloco turquesa, trocado em 24/09 pelo vidro escuro da referência.
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
- Foto original em alta resolução de `Foto-427-683x1024.webp` (683×1024), usada grande na seção da Carol. A faixa da equipe já usa a foto nova (`carol-equipe.webp`, 1448×1086, cópia do chat); se o arquivo original for maior, trocar mantendo o nome.

**Técnicas (não feitas, sugeridas)**
- Peso: `Image - Hero.png` (1,6 MB, carregada como background CSS, atrasa o LCP) e `dor-portas-recorte.png` (1,9 MB) — converter para WebP.
- Remover o `alert()` do placeholder de vídeo antes de publicar.
- Dívida de CSS: várias camadas empilhadas redefinindo os mesmos seletores, `:root` repetido e regras mortas (`.aurora`, `ctapulse`, `.btn-ghost`, `.split`, `.hero-img-slot`, seletores `.carol-*` históricos).
- Arquivos órfãos em `assets/` (`Teste -2.png`, `Image - Hero1.png`, `Image_1/2.png`, `dor-portas1/2.png`, `dor-portas-recorte-v2.png`, `dor-observando.webp`, `dor-formacao.jpg`, `dor-perguntas.png`, `carol-retrato.jpg`).
- Sem Open Graph, favicon, pixel ou analytics.
- Não publicar `audit-visual/` junto com a página.
