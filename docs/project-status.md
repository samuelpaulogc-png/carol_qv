# Handoff — Landing Page "Gancho da Virada"

Resumo para continuar o trabalho em outro chat.

Contexto consolidado: [handoff-claude.md](handoff-claude.md), atualizado em 12/09/2026. As entradas históricas podem incluir versões substituídas.

## Carol: transição suave entre a foto e o fundo — 24/09/2026

- **Pedido do usuário**, com print da base da faixa da equipe: “adicione um pouco de blur entre a imagem e o fundo para não ficar um corte seco e sim algo suave”.
- **Causa medida** (cor média por linha, 1358px): a última linha da faixa era (18,6 · 23,4 · 50,3) e a seção logo abaixo, (12 · 18 · 54).
  - O grão, com opacidade .1, clareava a faixa inteira até a borda.
  - O escurecimento lateral, que ficava acima do degradê de baixo, escurecia a base à esquerda.
  - No celular, o degrau aparecia dos lados do retrato.
- **Feito:**
  - Os degradês de cima e de baixo passaram para cima do escurecimento lateral, então as duas bordas terminam em `--bg-2` puro.
  - O degradê de baixo ficou mais longo e suave: 1 → .86 (12%) → .6 (28%) → .26 (44%) → 0 (62%).
  - O grão ganhou `mask-image` e some nos 20% de cima e a partir de 58% da altura.
  - Novo `span.mentor-blur` (`aria-hidden`), entre a foto e os degradês: `backdrop-filter:blur(12px)` nos 34% de baixo, entrando aos poucos pela máscara. No celular, 10px e 50%. O desfoque começa abaixo do rosto da Carol em todas as larguras e não atinge texto nem retrato.
- **Resultado:** a última linha da faixa agora é (12 · 18 · 54), a mesma cor da seção de baixo, sem degrau. O maior salto entre linhas vizinhas perto da borda caiu de 6,6 para 1,1 no computador e de 9,0 para 0 na borda, no celular. O degrau de cor no topo também sumiu. Fica só o fio de 1px da borda do `#para-quem`, o mesmo divisor do mapa e da oferta.
- **Conferido**, antes e depois, em 1920, 1440, 1358, 900, 768, 375 e 320px: sem overflow e sem erros no console. Textos e rosto da Carol continuam nítidos.

## Carol: foto nova da turma na faixa — 24/09/2026

- **Pedido do usuário**, com a imagem anexada: trocar a foto atual por essa. É a mesma foto da turma (Carol de avental azul e touca rosa, braços abertos), agora numa sala cirúrgica azul com focos acesos, sem a parede branca e sem a marca do hospital.
- **Feito:**
  - `assets/images/carol-equipe.webp` (1448×1086, 199 KB) entrou no lugar de `assets/hero-equipe.webp` (1024×683) em `#carol .mentor-banner`. É a cópia que veio pelo chat; o original do usuário deve ser maior.
  - O tratamento da seção é o mesmo: cinza, luminosidade sobre o navy, opacidade .52, grão e degradês.
- **Enquadramento:** `object-position` passou de `center 42%` para `center 30%` acima de 760px.
  - A foto nova é 4:3 e a antiga era 3:2. Com 42%, as cabeças de trás eram cortadas no alto em 1920 e 2560px, e o fim de “mostrar” passava sobre o rosto da Carol de 1358 a 1920px.
  - Com 30%, as cabeças aparecem inteiras e o rosto da Carol fica ao lado de “esse caminho?”.
  - O celular não mudou: recorte próprio, centralizado.
- **Mantido:** `assets/hero-equipe.webp`, a foto real, continua no disco sem uso.
- **Opção mostrada, não aplicada:** a foto nas cores originais (sem cinza, opacidade .62).
- **Conferido:**
  - Enquadramento em 2560, 1920, 1440, 1358, 1024, 900 e 768px.
  - Na página final, em 1440, 1358, 900, 768, 375 e 320px: imagem carregada em 1448×1086, sem overflow, sem erros no console nem requisições com falha. Os números terminam em 9 anos / 10k / 20k.

## Como funciona: etiqueta “Acesso imediato” em turquesa — 24/09/2026

- **Pedido do usuário**, com print dos dois cards: dar à etiqueta “ACESSO IMEDIATO” (card da esquerda) a cor da etiqueta “22 de outubro • 20h • Online e ao vivo” (card da direita) e tirar o ícone de raio.
- **Feito:** a etiqueta perdeu a classe `mint` e o SVG do raio e usa o estilo da etiqueta da data: texto `--mint-bright`, borda `rgba(42,210,193,.35)` e fundo `rgba(42,210,193,.08)`. As regras `.badge.mint`, sem outro uso na página, foram removidas. O texto não mudou.
- **Conferido** em 1358, 1440, 900, 768, 375 e 320px: estilo calculado das duas etiquetas idêntico (cor, borda, fundo, fonte, espaçamento, cantos) e mesma altura quando ficam em uma linha. Sem overflow e sem erros no console.

## Mapa: pulso fluido nas pontas do ECG — 24/09/2026

- **Pedido do usuário**, com setas nos picos e vales: “precisa ficar mais suave ainda… por conta desses trajetos pequenos ainda tá muito rígido”.
- **Causa medida:** a bolinha andava em velocidade constante pelo traçado e virava de uma vez em cada ponta. Congelando o relógio a cada 1/60s: giro de até 137° entre dois quadros no computador (12 quadros acima de 60°) e 108° no celular (10 quadros).
- **Feito** (JS `tunePulse`, que calcula as tabelas SMIL uma vez, no ocioso, só para o SVG visível):
  - Velocidade limitada pela curva, com freada e retomada graduais, como algo físico numa curva fechada.
  - Bolinha num caminho arredondado; o rastro continua na linha exata e acende cada ponta.
  - Rastro por tempo: 50–300ms atrás da bolinha, encurtando nas pontas.
  - Saída e chegada suaves, com cruzeiro no meio. Ciclo de 5s: 4,2s de percurso e 0,8s de pausa.
- **Tentativas intermediárias**, com a medição a cada passo:
  - Freada suavizada demais ficava diluída (125°).
  - Com a ease global (rápida no meio), as pontas do meio continuavam rápidas (108°).
  - Só arredondar mais fazia o rastro cortar os picos. Por isso a bolinha e o rastro foram separados.
- **Resultado:**
  - Maior giro entre quadros de 60° no computador (1 quadro) e 40° no celular (nenhum acima de 60°).
  - O rastro fica a ≤0,8px da bolinha durante o percurso.
- **Desempenho:** a primeira versão amostrava o traçado com `getPointAtLength` e travava a página (1,9s no computador; 8,6s com CPU 4x mais lenta). Lendo o `d` e achatando as curvas no JS, caiu para 21ms e 75ms.
- **Continua valendo:** pausa fora da tela e com o botão de pausa; some com movimento reduzido; sem JS fica a versão simples declarada no SVG; sem erros.

## Mapa: pulso mais suave e menos rígido (computador e celular) — 24/09/2026

- **Pedido do usuário:** “deixe mais suave e menos rígida a animação” da bolinha, no computador e no celular, com a skill da Emil se precisasse.
  - Não há skill da Emil (Kowalski) no ambiente nem no catálogo de skills do usuário.
  - Foi usado o guia `apple-design`, que trata de movimento fluido. Trechos aplicados: §11, rastro/motion blur para movimento rápido; §14, sem saltos bruscos de brilho e loop sem ser mecânico.
- **Antes:** percurso linear de 3,4s, sem pausa, e a bolinha sumia no fim e reaparecia no começo de uma vez. No computador era um `<circle>` levemente oval (8,8×9,8px).
- **Agora**, com ciclo de 4,2s:
  - 3,5s de percurso com aceleração e freada por igual;
  - fade de entrada de 0,3s e fade de saída ao chegar;
  - 0,7s de pausa entre as passagens;
  - rastro de luz em 4 trechos sobrepostos da própria linha;
  - bolinha redonda, com anéis de brilho, igual nos dois.
  - Uma primeira curva (.42 0 .2 1) chegava a 77% do caminho na metade do tempo e se arrastava no fim; foi trocada por .45 .05 .55 .95 (50% na metade).
- **Verificado com o relógio congelado:**
  - A ponta do rastro fica a ≤0,2px da bolinha em todos os instantes, nos dois.
  - Opacidade .79 em 0,15s, 1 no percurso, .73 em 3,3s e 0 na pausa.
  - Pausa fora da tela e com o botão do letreiro; some com movimento reduzido; sem erros.
  - No celular o rastro fica sem filtro de brilho, porque seria refeito a cada quadro.

## Mapa no celular: bolinha na linha, desenho desfeito — 24/09/2026

- O usuário esclareceu que “a animação” era a bolinha que percorre a linha no computador, e que no celular ela nem existia. Pediu para voltar o mapa como estava, exceto o ajuste do PASSO 06.
- **Desfeito:** o desenho da linha no celular, com os passos acendendo e os dois gatilhos (meio da tela e parada de rolagem). O `pathLength` da linha e o JS também saíram. O mapa aparece inteiro, como antes.
- **Mantido:** PASSO 06 12px mais baixo, sem a haste, e “PRIMEIRA OPORTUNIDADE” descendo o mesmo tanto.
- **Novo: bolinha no celular**, com o mesmo traçado da linha vertical, loop de 3,4s como no computador.
  - Feita de traços de tamanho fixo (`non-scaling-stroke`) para ficar redonda: um círculo comum ficava oval, 12,7×8px em 430px de largura.
  - O brilho vem de dois anéis translúcidos (22px a .12, 14px a .28) em volta do núcleo de 9px. A primeira versão usava `filter`, que num elemento tão pequeno é recortado: a bolinha não aparecia.
- **Verificado:**
  - Em 360, 390 e 430px, a bolinha anda, é redonda e tem brilho.
  - Fica parada fora da tela e com o botão de pausa do letreiro; some com movimento reduzido.
  - No computador nada mudou; sem erros.

## Mapa no celular: PASSO 06 mais baixo e desenho quando a pessoa está no mapa — 24/09/2026

- **Pedido do usuário:** “PASSO 06” estava colado ao ponto final dos passos no celular (abaixar um pouco, sem exagerar), e a animação do mapa precisava começar quando a pessoa já atravessou um pouco do mapa, para ver com facilidade.
- **PASSO 06:**
  - A linha que desce do nó 6 terminava 4px dentro do rótulo. O rótulo desceu 12px e agora começa 8px abaixo do fim da linha.
  - A haste desse nó, que ficava sob a linha, saiu.
  - “PRIMEIRA OPORTUNIDADE” desceu os mesmos 12px (gap de 14px mantido).
- **Animação:**
  - O mapa só tinha a entrada comum (fade de 350ms disparado com 8% visível), que acabava antes de a pessoa ver. Agora, no celular, a linha se desenha de cima para baixo em 2,4s e cada passo acende quando ela chega (frações medidas no traçado: 3%, 22%, 40%, 58%, 77%, 95%). “PRIMEIRA OPORTUNIDADE” aparece no fim.
  - Começa com o topo do percurso no meio da tela, ou quando a pessoa para de rolar 0,6s com ele acima de 75%.
- **Verificado em tempo real:**
  - Rolando, o desenho começou com o topo em 45% da tela; parando em 61%, começou 0,5s depois.
  - Pelo botão “QUERO CONHECER OS 6 PASSOS”, começou em 375×667, 360×740, 390×844 e 430×932.
  - Computador sem mudança; movimento reduzido e sem JS mostram tudo; sem overflow e sem erros.

## Mapa: luz do vidro por dentro, não por fora — 24/09/2026

- Pedido do usuário, com setas no print 2 (canto de cima à esquerda, lateral esquerda, meio da base, canto de baixo à direita): “o blur tá aplicado na parte externa e na referência na parte interna”.
- **Causa:** o painel tinha um brilho turquesa em volta (`box-shadow` externo de 70px), e o fundo da seção tinha duas manchas de luz ao lado dele. Por dentro, a cor era uniforme. A borda também era dupla: a real, fixa, e o anel com gradiente por cima.
- **Feito:**
  - Sem luz do lado de fora: só uma sombra escura de profundidade.
  - Uma única linha de borda, fina e nítida: a borda real ficou transparente e o anel mostra a linha, acendendo nos pontos das setas.
  - Por dentro, a luz desses pontos entra no vidro (camada abaixo do conteúdo), com brilho interno suave em toda a volta.
  - No celular, os mesmos pontos em tamanho menor.
- **Verificado** em 1358 e 375px, com recortes nos pontos das setas antes e depois; sem overflow e sem erros.

## Mapa: painel de vidro e percurso luminoso — 24/09/2026

- **Pedido do usuário**, com duas versões geradas: do print 1, o layout do cartão (glassmorphism); do print 2, o estilo interno (os 6 passos e as 3 perguntas com ícone no fim). A seção de baixo dos prints foi ignorada, como pedido.
- **Aplicado:**
  - Painel translúcido com desfoque, borda com gradiente turquesa mais forte nos cantos, brilho interno e externo, filete acima do título, e luzes suaves no fundo da seção para o vidro aparecer.
  - Linha do ECG com brilho; nós com anel aceso, fundo radial e número com leve brilho; cadeado removido, como na referência.
  - Haste pontilhada com ponto entre cada nó e o rótulo; pontos acesos nas pontas da linha no computador.
  - Fio vertical entre as colunas; perguntas com linha em cima e embaixo e chevron turquesa no fim; seta no botão.
- **Verificado:**
  - Fontes, tamanhos e pesos iguais aos de antes (perguntas 18px/500, números 24px/500).
  - Sem overflow e sem erros em 1358, 900 e 375px.

## Dor: “o certificado não responde” e setas em anel — 24/09/2026

- Pedido do usuário, com imagem de referência: estilizar “o certificado não responde” e as setinhas das perguntas.
- A frase, que já estava em Fraunces itálico mas na cor do texto, ficou turquesa (`--mint-bright`). Fonte, tamanho e peso não mudaram.
- As setas das 5 perguntas agora ficam num anel de 24px: borda turquesa, fundo translúcido, leve brilho, seta de 15px. Continuam alinhadas à primeira linha e deslizando 6px na entrada.
- Ajuste do usuário: o “o” antes de “certificado” saiu do destaque e voltou ao estilo do texto.
- Verificado em 1358 e 375px, sem overflow.

## “Para quem é” no layout da referência — 24/09/2026

- **Pedido do usuário** (imagem de referência): implementar o layout da referência na seção de público, sem mudar a fonte nem aumentá-la; se a fonte fosse mudar, fazer só o design/layout.
- A copy da referência é idêntica à da página (título e 7 critérios), e a grade já era 2 · 3 · 2.
- **Aplicado:**
  - Cartões de vidro com borda e cantos de 12px.
  - No topo de cada cartão, um filete turquesa que se dissolve, com brilho.
  - Check num anel de 44px, fio vertical e texto.
  - Espaço de 20px entre os cartões.
  - Luz de foco no alto à direita.
- **Grade:** 2 · 3 · 2 acima de 1100px (antes, três por linha deixava o texto dos cartões do meio em 4 linhas em 1440px; com o espaço interno ajustado, ficaram 3); duas colunas de 761 a 1100px; uma no celular.
- **Não aplicado, e por quê:**
  - Kicker “O GANCHO DA VIRADA” e negritos dentro dos critérios: é texto novo e mudança de peso de fonte (regra “não altere as fontes”).
  - Foto da sala cirúrgica: não há imagem assim no projeto, e as que existem já são usadas em outras seções. Prompt em `human-output/image/gancho-para-quem/`; a foto entra por `--who-photo`.
- **Verificado** em 1440, 1358, 1100, 1024, 900, 768, 375 e 320px:
  - família, tamanho, peso e entrelinha iguais aos de antes em todas as larguras;
  - sem overflow e sem erros;
  - as outras seções ficaram iguais, com todos os elementos visíveis na mesma posição relativa. A seção ficou 56px mais alta em 1440px.

## Preço: 6x de R$ 8,82 — 24/09/2026

- Pedido do usuário: “O preço precisa ser alterado para 6 x de R$ 8,82.”
- **Antes:** “DE R$ 297,00” · **R$ 47,00** · “ou em até 12x no cartão” (parcelamento a confirmar).
- **Agora:** “DE R$ 297,00” · **6x de R$ 8,82** · “ou **R$ 47,00** à vista”.
  - Mesmo estilo de antes: “6x de R$” e “,82” pequenos, “8” grande em Bricolage, e o valor à vista em turquesa como estava o “12x”.
  - O R$ 47,00 continua informado como preço à vista.
  - 6 × R$ 8,82 = R$ 52,92 no parcelado (juros do cartão).
- **Verificado** em 1440, 1358, 900, 768, 375 e 320px:
  - o valor cabe na linha (232px em 1358; 222px em 320);
  - sem overflow e sem erros;
  - a animação de entrada (preço antigo riscado, valor subindo) segue igual.

## Aviso de inscrição fica na tela durante a rolagem — 24/09/2026

- Pedido do usuário: no celular, ao deslizar depois que o aviso aparecia, ele sumia; ele quer que continue aparecendo pelo período, “que nem no PC”.
- **Causa:** se a rolagem trouxesse um botão, o vídeo, o carrossel ou o FAQ para baixo do aviso, ele saía antes da hora. No celular o aviso ocupa quase a largura toda e os botões também, então qualquer deslizada fazia isso.
- **Feito:**
  - A saída antecipada foi removida: depois de aparecer, o aviso fica os 5s.
  - Ele continua não *surgindo* em cima de botões ou do vídeo.
  - Em tela de toque, o texto do aviso deixa o toque passar (`pointer-events:none`), então um botão que fique embaixo continua funcionando; só o “×” responde.
- **Verificação:**
  - Em tempo real, deslizando 60px a cada 100ms: o aviso ficou na tela em todas as 46 amostras e saiu após 5,0s (375×667 e 390×844).
  - Com relógio simulado, sobre botão ou vídeo, ele sai só aos 5s (4,98s).
  - Tocar no texto do aviso sobre “QUERO CONHECER OS 6 PASSOS” leva a `#mapa`.
  - O “×” responde ao toque, e no computador o mouse ainda segura o aviso.

## Aviso de inscrição com ritmo constante — 24/09/2026

- Pedido do usuário: “só aparece uma vez, eu quero que se a pessoa subir a página novamente apareça de novo. Eu não quero algo lotando a tela, mas que dê a sensação de constância.”
- **Antes:** primeiro só depois de rolar 60% da tela, 5,5s na tela, 38–64s de intervalo, no máximo 4 por visita.
- **Agora:**
  - Primeiro em 6–10s (~3s na prévia), em qualquer ponto da página, inclusive no topo.
  - Um de cada vez: 5s na tela e 15–25s até o próximo; até 12 por visita.
  - Com compras reais, cada nome aparece uma vez por visita. A prévia recomeça os 4 nomes de exemplo sem repetir o último.
  - Continua sem cobrir botões, os controles do carrossel e as perguntas do FAQ. O vídeo agora só é evitado quando metade dele ou mais está na tela: só a borda aparecendo lá embaixo impedia o aviso no topo em 1358px.
- **Verificação:**
  - 46 testes com relógio simulado.
  - 12 avisos em 8 minutos, com intervalos de 15,2 a 25,0s e 5s na tela.
  - Ao subir a página, volta em 18–23s, com outro nome.
  - Com 3 compras reais, 3 avisos com nomes diferentes; o primeiro em 9,1s.
  - Com a lista vazia, nada aparece.
  - Pausa, ampliação, “×”, teclado e movimento reduzido também verificados.
  - Sem overflow de 320 a 1920px e sem erros no console.

## Aviso de inscrição: prévia mais rápida; nomes fictícios recusados — 24/09/2026

- O usuário disse que o aviso “ainda não tá aparecendo” e pediu nomes fictícios (“pode fazer com nomes aleatórios, mas bonitos”).
- **Por que não aparecia:** no endereço normal, a lista `#compras-reais` está vazia, então o aviso não é ativado. Isso é de propósito. Na prévia (`?compras=exemplo`), o primeiro aviso só vinha 9–14s após abrir a página e depois de passar do vídeo.
- **Feito:** na prévia, o primeiro aviso agora vem ~2s após abrir (até 3s depois de rolar para além do vídeo). Medido em tempo real, rolando como uma pessoa: 2,3s no computador (1358×650) e na hora no celular (375×667). Sem o parâmetro, continua sem aparecer.
- **Não feito:** preencher a lista com nomes inventados. Seria escrever compras que não aconteceram para convencer quem visita, o que o CDC trata como publicidade enganosa (art. 37) e o manual veta como “urgência falsa” (§12). A lista continua esperando nomes de compras reais.

## Aviso de inscrição (“<nome> garantiu vaga na turma”) — 24/09/2026

- **Pedido do usuário**, com print de exemplo: um aviso “simulando que pessoas estão comprando”, que apareça “de forma leve e sutil em alguns momentos” e não a todo momento.
- **Feito:**
  - Cartão fixo no canto de baixo à esquerda, no formato do exemplo (check, nome em destaque, “garantiu vaga na turma”) com as cores da página. Detalhes no handoff, seção “Aviso de inscrição”.
  - Aparece só depois da primeira dobra, 5,5s por vez, com 38–64s de intervalo, e no máximo 4 por visita.
  - Nunca cobre botões, o vídeo, os controles do carrossel ou as perguntas do FAQ.
  - Espera com a aba oculta, com a ampliação aberta e com as animações pausadas; o “×” encerra na sessão.
- **Sem nomes inventados.** Aviso de compra que não aconteceu é publicidade enganosa (CDC art. 37), e o manual veta “urgência falsa” (§12). Por isso:
  - o aviso lê a lista `#compras-reais` no fim do HTML, com nomes de compras reais;
  - vazia, ele não aparece;
  - `?compras=exemplo` mostra uma prévia com quatro nomes de exemplo, só para o usuário ver o visual.
- **Verificação:**
  - 49 testes com relógio simulado em 1358 e 375px: ritmo, bloqueios, limite de 4, “×”, pausa, ampliação, teclado e movimento reduzido.
  - Capturas em 320, 375, 390, 768, 1358, 1440 e 1920px; sem overflow nem erros no console.
  - Com a lista vazia, todos os elementos ficam na mesma posição da versão anterior (fora os que se movem sozinhos: letreiro e carrossel).

## Hero: kicker em duas linhas no celular — 24/09/2026

- O usuário perguntou se havia um `<br>` em “Para quem se formou em / instrumentação…” no celular. Não havia: a quebra vinha do `text-wrap: balance` com 12px. Sem o balance, “mercado...” ficaria sozinho na última linha.
- A pedido dele (“e se diminuir para ficar em duas linhas?”), de 360 a 560px o kicker usa `font-size: clamp(10.25px, calc((100vw - 64px) / 29.5), 12px)`: 10,25px em 360, ~10,5 em 375, ~11,05 em 390 e 12px a partir de ~420. Família, peso e espaçamento continuam os mesmos.
- A divisão por 29,5, e não por 27,8 (o ajuste exato), deixa margem para o arredondamento da largura das letras. Em 390px, com o ajuste exato, a linha passava 2,5px e voltava a ter três linhas.
- Abaixo de 360px continua com 12px, em três linhas: em duas, o texto precisaria de ~9px.
- Verificado em 320, 359, 360, 375, 384, 390, 393, 400, 412, 414, 430, 480 e 560px. Sem overflow.

## Hero: mais respiro entre o botão e o vídeo — 24/09/2026

- Pedido do usuário (print com setas): o vídeo e o texto ao lado estavam próximos demais do botão “QUERO PARTICIPAR”. Ele pediu mais respiro sem mexer no desfoque.
- Acima de 760px o espaço entre a hero e a linha do vídeo virou `--hero-gap: clamp(56px, 6vw, 96px)` (antes, 40px fixos). Ele também entra na altura mínima do `.hero-top`, para o texto continuar centralizado nas telas largas.
- Medido entre “Vagas limitadas…” e o topo do vídeo: 81px em 1358px (antes ~40), 87px em 1440, 61px em 1024, 57px em 768 e 166px em 1920. Celular sem mudança.
- O desfoque continua preso à foto. Com a linha mais baixa, o título fica ainda mais dentro da área escurecida. Sem overflow.

## Hero: desfoque azul abaixo dos braços da Carol — 24/09/2026

- Pedido do usuário (print com setas): o corpo da Carol aparecia atrás do título “Entenda em poucos minutos…” e podia disputar com ele. Ele sugeriu “blur azul ou sei lá”.
- **Primeira tentativa, descartada:** mancha oval desfocada atrás da coluna de texto. Deixava uma borda oval visível e não cobria o título em 1920px, onde a Carol fica maior.
- **Aplicado:**
  - a dissolução da foto ficou mais curta, de transparente em 64% a .88 de azul-marinho em 71% da altura (antes começava em 62% e chegava a .72 em 76%);
  - `.hero::after` desfoca a foto (`backdrop-filter: blur(14px)`) em toda a largura a partir de 64%, com a borda de cima se dissolvendo.
  - Os braços, que terminam em 65%, continuam nítidos.
- Contraste no pior ponto: título de 6,4:1 para ≥10,2:1; parágrafos ≥11,6:1 (1920 a 961px). Celular sem mudança: até 560px a hero não tem essa foto.

## Hero + vídeo no layout do protótipo do usuário — 24/09/2026

- O usuário gerou no ChatGPT um protótipo em imagem (prompt escrito nesta sessão) e pediu o layout “na linha desse”. Instrução: implementar só o código e não se preocupar com fundos.
- Durante o trabalho, o usuário pediu: **“NÃO ALTERE AS FONTES. Senão vai quebrar a harmonia com o restante do texto.”** O protótipo trazia o título em fonte serifada; ficou a Bricolage Grotesque. Os ajustes de tamanho e peso feitos no meio do caminho (kicker, subtítulo, texto do vídeo) foram desfeitos. Regra registrada no handoff.
- **Do protótipo, aplicado:**
  - ícones no letreiro;
  - kicker com filete vertical turquesa;
  - seta nos dois botões;
  - vídeo na primeira dobra, em duas colunas (vídeo à esquerda; filete, título em itálico, parágrafos e botão contornado à direita, sob a Carol).
- **Não aplicado (fundo/arte):** capa fotográfica do vídeo e as linhas curvas decorativas. Ficou o gancho `--video-poster` para a capa.
- **Estrutura:**
  - o bloco do vídeo saiu da seção da dor e foi para dentro da hero;
  - a foto virou a camada `.hero::before` (altura `max(56.28vw,720px)`, dissolução a partir de 62%);
  - `.hero-top` com altura mínima para o vídeo começar a 69% da foto, logo abaixo dos braços da Carol (que terminam em 65%);
  - texto da hero limitado a 60% da largura;
  - saíram as regras antigas `.pain .video-*`, `.video-intro`, `.hero::after`, a altura mínima anterior da hero e o `padding-bottom:96px` de 561–760px (não há mais sobreposição).
- **Medido (1440px):** vídeo 622×350 a 32px abaixo dos braços. Em 1358px (tela do usuário) e 1920px, a mesma relação. Contraste do texto sobre a foto: título ≥6,4:1, parágrafos ≥9,9:1.
- **Validação:** Chrome headless em 1920, 1440, 1358, 1280, 1024, 961, 900, 768, 600, 375 e 320px, com e sem movimento. Sem overflow e sem erros de console; sem JS, tudo visível. As seções da dor em diante mantêm a mesma geometria, elemento por elemento.

## Hero: parágrafos movidos para o bloco do vídeo — 24/09/2026

- Substituído no mesmo dia pelo layout do protótipo (entrada acima). Mantido o registro da autorização da mudança de copy.

- Pedido expresso do usuário (com print): tirar da hero “No Gancho da Virada, você vai conhecer o mapa…” e “Você recebe acesso imediato a 3 aulas de preparação…” e colocá-los depois de “Entenda em poucos minutos o que é o Gancho da Virada” e antes do botão “QUERO CONHECER OS 6 PASSOS”. Texto e marcação idênticos.
- **Bloco do vídeo:** `.video-copy` reúne o título e os dois `p.video-desc` (17px no desktop, 16px até 960px, cor `rgba(236,240,248,.84)` como na hero; os `.mk` continuam sem destaque). Acima de 960px: texto à esquerda (até 62ch) e botão à direita, alinhado à base do texto. Até 960px o botão desce para baixo do texto. No DOM o vídeo vem antes do texto, na mesma ordem em que aparece na tela.
- **Hero:** sem os parágrafos ela encolheria de 843 para ~670px em 1440px. A foto passaria a ser cortada em cima (cabeça da Carol colada no letreiro) e o vídeo cobriria os braços dela. Acima de 760px: `min-height:max(56.28vw,720px)` (proporção da foto) e texto centralizado (`display:grid;align-content:center`). Medido: 1440px 843→810, 1366px 826→769, 1024px 720→720. O vídeo começa na cintura da Carol, como antes. Em 1920px a hero passa a 1081px e mostra a foto inteira; antes a cabeça era cortada pelo letreiro nessa largura.
- **Celular:** a hero ficou ~290px mais baixa. Em 375px o botão “QUERO PARTICIPAR” (antes em ~803px) e a foto da Carol (antes em 879px, agora em 587px) aparecem na primeira tela.
- **Correção junto (já existia):** entre 561 e 760px o vídeo sobe 56px sobre a hero, que só tinha 40px de respiro, e cobria “Vagas limitadas para o encontro ao vivo”. Agora `padding-bottom:96px` nessa faixa.
- CSS morto removido: as regras `.hero .desc` (cinco camadas) e `.hero .desc .mk`.
- Validação: Chrome headless com servidor local, capturas antes/depois em 1920, 1440, 1366, 1280, 1024, 961, 960, 900, 768, 760, 700, 600, 561, 560, 375 e 320px. Na tela do usuário (1358×607), título, subtítulo, botão e Carol ficam inteiros na primeira tela. Sem overflow e sem erros de console. Com movimento, a hero e o bloco do vídeo entram normalmente; sem JS, tudo visível. As seções abaixo do vídeo têm a mesma geometria (posição e tamanho de todos os elementos iguais, diferença só de subpixel).

## Números de autoridade: contagem na entrada — 20/09/2026

- Pedido do usuário. Os três números (`#carol .auth .n`) contam de zero até o valor real em 900 ms, com desaceleração, 60 ms entre um e outro, na mesma cascata do traço turquesa que já existia.
- Os valores finais saem do próprio HTML (`9 anos`, `10k`, `20k`): o script lê o texto, anima e devolve o texto original no fim. Se os números mudarem no HTML, a animação acompanha.
- A largura de cada número é travada durante a contagem ("0" e "10k" têm larguras diferentes), então o rótulo abaixo não se mexe. Medido: 184/159/159 px antes, durante e depois.
- Com movimento reduzido ou sem JS, aparecem prontos. Acontece uma vez, quando a faixa entra na tela.
- Ressalva registrada: na auditoria do noho.ink a contagem tinha sido desaconselhada (clichê e atrapalha a leitura); ficou curta e discreta a pedido do usuário.

## Carrossel de depoimentos: avanço contínuo — 20/09/2026

- Pedido do usuário: movimento contínuo e suave, no lugar do avanço guiado de parada em parada (versão B escolhida em 12/09).
- O trilho desliza a 24 px/s. Nas pontas desacelera nos últimos 150 px, descansa 1,2 s e volta pelo mesmo caminho — sem o salto de volta ao início.
- Pausas inalteradas: mouse, foco de teclado, toque (+2,5 s), arrasto, ampliação aberta, aba oculta, seção fora da tela, movimento reduzido e o botão de pausa do letreiro. Setas e segmentos continuam; o preenchimento dos segmentos e do anel da seta agora mostra a posição no trilho, não o tempo até a próxima parada.
- **Armadilha:** ler `scrollLeft` de volta a cada quadro perde o avanço de fração de pixel (0,08 px/quadro é arredondado para zero e o trilho não sai do lugar). A posição vive em `state.pos` e só depois é escrita no trilho; `state.lastAuto` distingue a rolagem do próprio carrossel da rolagem do usuário.
- Validação: medições a cada 250 ms no desktop e no celular, pausa/retomada por mouse e toque, inversão na ponta, setas, movimento reduzido e sem JS (trilho parado, 7 prints acessíveis), sem overflow, sem erros de console.

## Oferta: reestruturação premium — 20/09/2026

- Várias rodadas com o usuário até chegar aqui. O que incomodava: excesso de fios horizontais, coluna de rótulo vazia à esquerda, repetição entre título e "Você recebe:" e cards pequenos demais.
- **Título absorveu o rótulo:** "Entre para o *Gancho da Virada* e receba:" (mudança de copy autorizada pelo usuário). O `<h3>Você recebe:</h3>` foi removido.
- **Entregas em dois blocos lado a lado** (`.ov-core`), com fundo em degradê, borda, raio 18px, sombra e brilho turquesa no canto — mesma linguagem dos cards de "Como funciona". O check virou disco de 32px com o traço em SVG se desenhando na entrada, no desenho dos nós do mapa. As linhas do grid vêm do contêiner (`subgrid`), então os títulos ocupam a mesma altura e as descrições alinham; no celular cada bloco volta a ter a altura do próprio conteúdo.
- **Bônus:** frase "E ainda leva *três bônus* junto com a sua inscrição:" (copy nova, evitando prazo ou promessa que a página não faz) em largura total, e as três faixas em ziguezague — imagem à direita no 01 e no 03, à esquerda no 02 —, com o conector "+" sobre cada divisória.
- **Preço:** valor e botão na mesma linha (o fio vertical e a coluna vazia saíram), valor até 5,25rem e brilho turquesa no canto do bloco.
- Imagens dos bônus aplicadas (`bonus-vlog`, `bonus-ebook`, `bonus-mapa`, com `-900`), geradas pelo usuário a partir dos prompts em `human-output/image/gancho-bonus-cards/`.
- Comparadores usados e mantidos fora do commit: `audit-visual/offer-bonus/` e `audit-visual/offer-premium/`.

## Selo de garantia: em decisão — 20/09/2026

- Prompts em `human-output/image/gancho-garantia/`: selo premium em metal (01), selo clássico ondulado (02) e edição de um selo existente trocando cores e palavras (03). A copy do selo usa as palavras da página ("GARANTIA DE SATISFAÇÃO TOTAL", "7 DIAS"); evitado "100% dinheiro de volta", que promete mais do que o texto da garantia.
- O usuário gerou o selo e ele foi convertido para `assets/images/garantia-selo.webp` (73 KB) e `-320.webp` (32 KB), com o transparente em volta recortado. **Ainda não aplicado na página.**
- Comparador em `audit-visual/garantia-selo/` com três opções: medalha atual, imagem gerada e uma versão desenhada em SVG. Recomendação: a imagem gerada, por ter profundidade e tipografia mais encorpada. Falta decidir também o movimento (selo parado, anel girando atrás ou giro na entrada).
- `.gitignore` passou a excluir `audit-visual/` e qualquer pasta `originais/` (os PNGs de origem, de 1,3 a 1,8 MB cada, ficam só no disco).

## Oferta: foco nos bônus, em cards — 19/09/2026

- Pedido da expert: as 3 aulas e o encontro já aparecem como cards em "Como funciona", então a oferta passa a destacar os bônus. O usuário escolheu, no comparador, a versão "Três cards" e pediu um layout menos simples.
- **Entregas principais:** viram `ul.ov-core`, duas linhas com check turquesa, filete de 32px no topo de cada linha, título em Bricolage (com o trecho em Fraunces itálico) e a descrição abaixo. Copy idêntica à das faixas antigas; nada foi reescrito.
- **Bônus:** título `Bônus` com fio turquesa que se dissolve à direita e, dentro da caixa `.ov`, três `article.ovb-card` (fundo em degradê surface→bg-2, brilho turquesa no topo, borda, sombra funda, raio 16px). Cada card tem capa 16:9 com a imagem dissolvendo no card, etiqueta `01/02/03` em cápsula com desfoque no canto e o nome do bônus com filete turquesa. No hover (só mouse) a borda acende e a capa dá zoom de 3%, como em "Como funciona". Até 900px vira uma coluna.
- **Imagens aplicadas em 19/09:** o usuário gerou as três no ChatGPT com os prompts de `human-output/image/gancho-bonus-cards/` (vlog com a Carol na tela do celular, tablet com o checklist, mapa dobrado com o caminho pontilhado). Convertidas para `assets/images/bonus-vlog.webp`, `bonus-ebook.webp` e `bonus-mapa.webp` (e `-900`), ~80 KB cada em 1672×941 e ~35 KB em 900×507. Os PNGs originais (1,7 MB cada) saíram de `assets/` e ficaram em `human-output/image/gancho-bonus-cards/originais/`, fora do commit. O espaço reservado `.ovb-slot` continua no CSS, caso alguma capa precise ser trocada.
- Entrada: os cards entram em cascata (`.ovb-cards` virou `tx-group`) e as capas sobem na moldura (`.ovb-art` entrou na lista de mídia) assim que as imagens existirem.
- **CSS removido** (as faixas antigas deixaram de existir): `.ov-row`, `.ov-media`, `.ov-media-bonus`, `.ov-op`, `.ov-body`, `.ov-title`, `.ov-desc`, `.ov-bonus` e suas regras em media query e em movimento reduzido. `assets/images/oferta-bonus.webp` (e `-900`) ficou órfã — pode virar a capa de um dos bônus.
- Comparador em `audit-visual/offer-bonus/` (página real em iframe, seletor com atual / três cards / cards altos / destaque + dois). **Não commitado**, para não ir ao ar junto com a página.
- Validação: Chrome headless, capturas em 1440 e 390px, sem overflow em 1440/1200/900/768/375/320, sem erros de console.

## Movimento inspirado no noho.ink — 19/09/2026

- O usuário pediu uma auditoria do https://noho.ink/ com a skill do Emil e autorizou aplicar o que fizesse sentido, sem deixar a página pesada. O noho usa Webflow, GSAP, ScrollTrigger, SplitText e Lenis. Descartados: tela de carregamento de ~3 s com rolagem travada, rolagem suavizada (Lenis), cursor magnético, proteção de tela, fotos trocando dentro da frase e letreiro gigante no rodapé (seria um elemento novo; fica como sugestão).
- **Títulos linha a linha** (h1 da hero e todos os h2): o JS espera as fontes (máx. 1,5 s), quebra o título nas linhas que o navegador desenhou e recria os `<span>` de estilo em cada linha (`.tl-line` > `.tl-in`). Cada linha sobe de dentro de uma fresta (112% → 0, 800 ms, `--ease-reveal` = cubic-bezier(.19,1,.22,1), 90 ms entre linhas). Depois da entrada, o HTML original volta, então o texto quebra normalmente em qualquer largura. Refaz as linhas ao mudar a largura ou quando uma fonte termina de carregar, só nos títulos que ainda não entraram.
- Classe dos títulos: `.ln-title` (não usar `.tl`, que já é o canto do certificado da garantia). Enquanto divididos, `.is-split` vira coluna flex para as margens negativas das linhas não colapsarem; alturas conferidas iguais antes e depois em 1440 e 375 px.
- Substitui o desfoque da frase em itálico (rodada anterior). O sublinhado da hero agora assenta 700 ms após as linhas subirem.
- `.sec-head`, `.mentor-heading` e `.forwhom` deixaram de ser `.reveal`, porque título e listas já têm entrada própria.
- **Fotos subindo na moldura:** capas de “Como funciona” e da oferta (recorte abrindo de baixo + 8%, 1 s, mantendo o zoom do hover) e retrato da Carol (só o recorte, com cantos de 16 px, para a moldura turquesa continuar para fora).
- Sem biblioteca nova (~5 KB de JS). Validação: Chrome headless, capturas no meio e no fim das entradas em desktop e 375 px, sem overflow em 1440/900/768/375/320, sem erros de console. Sem JS ou com movimento reduzido nada é dividido e tudo aparece; a troca de preferência durante a visita (simulada) restaura títulos e mostra as fotos.

## Textos: animações de entrada (skill emil-design-eng) — 19/09/2026

- Pedido do usuário: auditar os textos com a skill do Emil Kowalski e aplicar animações sutis. Copy intacta; só CSS no fim do bloco `css-proposta` e JS junto do observador de entrada.
- Títulos `h2`: a frase em Fraunces (`.serif`) entra 160 ms depois do título, saindo de `blur(4px)` (450 ms).
- Hero: o sublinhado de “centro cirúrgico” assenta no lugar (offset 16→8 px e cor surgindo, 600 ms, 420 ms após o título). Continua `text-decoration`, com o recorte nas descendentes preservado.
- Listas em cascata (60 ms entre itens, 8 px, 400 ms), disparadas quando o grupo chega a 85% da tela, via classes `.tx-group`/`.tx-in` dadas pelo JS: perguntas da dor, “Talvez…” e perguntas do mapa, critérios de público, resultados da Carol (com o traço turquesa se desenhando), bônus e preço. `p.lines` deixou de ser `.reveal` no JS, para não mover duas vezes.
- Preço: “DE R$ 297,00” é riscado na hora (traço `::after` em `scaleX`, substituindo o `line-through`), depois sobem o R$ 47 e o parcelamento.
- Dor (pedido do usuário, com print do celular): seta turquesa antes de cada uma das 5 perguntas, com o mesmo desenho da seta do botão de compra. É um `::before` com máscara SVG, 18 px, alinhado à 1ª linha, e o texto quebrado fica recuado. Na cascata, a seta desliza 6 px para o lugar logo depois da pergunta.
- FAQ: ao abrir, o texto da resposta desce 6 px junto com a altura (260 ms). Comentário com acentos corrompidos corrigido.
- **Correção:** as transições de `.reveal` passaram para o estado `.in-view`. Antes, o `getComputedStyle` do início do script calculava a página visível antes de `.motion-ready`, e o texto da abertura nunca chegava a animar.
- Rejeitado de propósito: hover em texto que não é clicável, contagem dos números (10k/20k) e animação no letreiro.
- Validação: Chrome headless pelo servidor local, capturas no meio e no fim de cada entrada, linha do tempo da abertura medida quadro a quadro, sem overflow em 1440/900/768/375/320, sem erros de console. Movimento reduzido e sem JS mostram tudo no estado final, e o FAQ chama as duas animações. Não testado em celular físico.

## Animações: auditoria aplicada — 19/09/2026

- Após a auditoria, o usuário autorizou aplicar os ajustes de movimento conforme o julgamento do agente. Implementação concentrada em `index.html`, sem dependências novas; copy, links, imagens e placeholders preservados.
- Entradas: 350 ms / 12 px com a curva `--ease-out` existente; atrasos de 40–120 ms. Corrigido o conflito de transições em “Como funciona”. Cada print de depoimento passa a entrar uma vez quando fica visível, inclusive na rolagem horizontal, sem animar também o contêiner nem atrasar o hover.
- Botões: pressão em escala .97 / 160 ms, com feedback já no contato em telas de toque e limpeza em cancelamento do gesto. Hovers restritos a mouse; removidos deslocamento das perguntas do FAQ, halo das setas e expansão decorativa dos filetes do checklist. Capas mantêm zoom discreto de 250 ms; filetes da oferta e FAQ usam transform em vez de largura; foto final desacelera em 700 ms / escala 1.03.
- Letreiro: trilho dimensionado pelo conteúdo e duas repetições iguais, eliminando o salto no ciclo. Botão discreto no canto direito pausa/retoma os movimentos automáticos da página. Com movimento reduzido, a informação do letreiro fica estática, completa e sem duplicação. A primeira repetição também está disponível para leitores de tela.
- Mantidos o selo giratório, os ECGs e o ritmo lento do autoplay aprovado; efeitos contínuos pausam fora da tela/aba oculta. Navegação manual do carrossel dura 240 ms; teclado é imediato. O controle de pausa também interrompe o autoplay.
- Ampliação: preservada a viagem do card ao centro em 420 ms; saída em 240 ms. Efeitos WAAPI são liberados ao terminar, permitindo o fade de troca. Comandos rápidos acumulam a posição desejada, operações antigas são canceladas, carregamento da próxima imagem é aguardado e fechar durante entrada/troca não deixa callbacks alterando a camada oculta. Teclado e movimento reduzido são imediatos; swipe horizontal preservado.
- FAQ: abre em 220 ms e fecha em 160 ms; novos cliques revertem a partir da altura atual. Teclado é imediato. Mudança para movimento reduzido ou redimensionamento finaliza uma expansão em curso sem deixar altura travada.
- Validação: Chrome pelo servidor local, screenshots desktop/mobile, larguras 320/375/768/1024/1440/1920 sem overflow (`scrollWidth === clientWidth`, incluindo 375 px). Conferidos cliques rápidos, fechamento durante entrada/troca, Enter/Escape/setas, swipe emulado, pressão/cancelamento de toque, pausa/retomada, movimento reduzido inicial e durante interação e fallback sem JavaScript. Sem exceções JS nos cenários monitorados. Comparação com a versão anterior confirmou copy, links e imagens inalterados.
- Limite da validação: toque emulado; não testado em aparelho físico. Placeholders de conteúdo continuam pendentes como antes.

## Letreiro: verde-menta trocado por turquesa — 13/09/2026

- O usuário achou que o letreiro podia ter uma cor que combinasse mais. O verde-menta (`--virada`) destoava do turquesa usado em botões, títulos e capas, e o manual reserva o verde para sinais de avanço.
- Comparador `audit-visual/topbar-options/` (página real em iframe): 0 atual, 1 turquesa com texto navy, 2 faixa navy com linha turquesa, 3 turquesa fechado `#0E766C` com texto creme.
- Aplicada a recomendação (opção 1): `.topbar{background:var(--mint)}`; texto, data e separadores continuam em `--bg`. Contraste 10,2:1.

## Oferta: capa própria do bônus — 13/09/2026

- O usuário gerou `Bônus.png` (1672×941) com o prompt `human-output/image/gancho-oferta-bonus/chatgpt-bonus-1-tres-telas.txt` e pediu para aplicar na faixa do bônus. Original preservado.
- Convertida para `assets/images/oferta-bonus.webp` (119 KB) e `-900` (43 KB). Substitui a ilustração SVG antiga; a regra `.ov-bonus-art` foi removida e entrou `.ov-media-bonus img{object-position:0% 50%}`, para o corte cair na direita (onde a faixa já desvanece).
- Backup: `index.before-bonus.html` no scratchpad.

## Encerramento: equipe de costas aplicada para teste — 13/09/2026

- O usuário pediu para ver `Pessoas_D.png` (16:9) e `Pessoas_M.png` (9:16) na página: equipe de costas sob o foco cirúrgico. Originais preservados.
- Convertidas para `encerramento-pessoas.webp` (55 KB) e `-900` (25 KB); `encerramento-pessoas-m.webp` (43 KB) e `-m-600` (25 KB). Substituem a tesoura no `<picture>`.
- As toucas azul-claras ficavam atrás do parágrafo (contraste 3,2 no desktop, 3,96 no celular). Ajustes:
  - foto desce 12% no desktop, 9% no celular e 12% até 360px;
  - `mask-image` apaga os 12% de cima da foto, para a borda não cortar a luminária.
  - Palco, opacidade 1, saturação .9 e degradês continuam os da tesoura.
- Contraste simulado com as caixas reais de texto: título ≥13,9, itálico ≥9,2, parágrafo ≥10,8, ressalva ≥6,3. Sem overflow e sem erros de console em 1440, 1024, 768, 375 e 320px.
- As imagens da tesoura e das mãos continuam no disco. Backup: `index.before-pessoas.html` no scratchpad.
- **Ajuste do usuário (mesmo dia):** gostou e pediu a imagem mais para cima. Foto passou a descer 6% no desktop, 4% no celular e 7% até 360px. Contraste simulado do parágrafo caiu para 3,4 no desktop (touca central atrás da última linha) e 5,3 em 375px; título e itálico continuam ≥9,6. O usuário vai decidir, vendo o resultado, se a foto deve ser escurecida.
- **Escurecimento (a pedido, para ver):** degradê vertical do `::after` com faixa mais escura atrás do parágrafo — `.6` em 22%, `.55` em 44%, `.6` em 58%, `.4` em 74% (antes `.55/.3/.3`). Contraste simulado do parágrafo: 5,9 no desktop, 7,3 em 375px, 11,2 em 320px; título ≥14,9, itálico ≥10,3. Aguardando aprovação.

## Encerramento: imagem da tesoura aplicada para teste — 13/09/2026

- O usuário gerou `Tesoura_D.png` (16:9) e `Tesoura_M.png` (9:16) a partir dos prompts 14/15 e pediu para ver direto na página. Originais preservados.
- Convertidas para `encerramento-tesoura.webp` (32 KB) e `-900` (14 KB); `encerramento-tesoura-m.webp` (32 KB) e `-m-600` (18 KB). A versão vertical entra por `<source media="(max-width: 560px)">`.
- As mãos das duas versões caíam atrás do botão. Ajustes:
  - palco entre botão e rodapé: `clamp(180px,16vw,240px)` (206px no celular);
  - foto desce 3,5% (5% no celular; 6,5% até 360px);
  - opacidade 1 e saturação .9, porque a foto já é escura (a .72 a sala sumia);
  - degradê do meio vai até 74% e escurece em 90%.
- Medido: a passagem começa abaixo do botão em 1440, 1024, 768, 375 e 320px (folga de 17 a 56px). Contraste simulado: título ≥12, itálico ≥10,7, parágrafo ≥11,4, ressalva ≥5,9. Sem overflow e sem erros de console.
- Imagem das mãos (`encerramento-maos*.webp`) continua no disco para voltar, se o usuário preferir. Backup: `index.before-tesoura.html` no scratchpad.

## Encerramento: cenário do corredor descartado — 13/09/2026

- O usuário gerou as imagens da opção 1 (corredor com a mulher de costas, desktop e celular). Primeiro disse que serviam, mas que não estava 100% satisfeito; depois, que **não gostou desse cenário**. Não propor mais corredor, com ou sem porta de luz.
- **Pontos observados nas imagens geradas:**
  - fileira de luminárias no centro, atrás do texto;
  - porta alta demais no celular;
  - mulher grande e cortada pelas bordas;
  - aspecto de imagem gerada.
- **Continuam na mesa:**
  - **Mãos:** a imagem atual da página, que o usuário acha boa, mas que corta no celular. Prompt da versão vertical só para celular pronto: `chatgpt-13-maos-vertical-celular.txt`.
  - **Luz cirúrgica C1:** já testada no comparador; parágrafo com contraste ≥4,5 e preenche o celular.

## Encerramento: cenários que preenchem a seção no celular — 13/09/2026

- **Pergunta do usuário:** qual cenário combina com a copy e preenche a seção inteira. As mãos (atual na página) ficam cortadas no celular.
- **Diagnóstico:**
  - A entrega do instrumental é uma ação horizontal. No celular a seção tem proporção ~0,4, então o 16:9 em cover mostra só o centro.
  - Qualquer cenário precisa de uma imagem vertical própria para o celular, carregada com `<picture>`.
- **Recomendação:** o corredor com a mulher de costas caminhando até a porta iluminada. É o "caminho" da copy e a perspectiva funciona na vertical.
- **Prompts escritos para as duas opções:**
  - **Opção 1:** `chatgpt-12-corredor-caminho.txt`, com desktop 16:9 e celular 9:16.
    - Câmera baixa; luminárias fracas no teto.
    - Porta de luz pequena no ponto de fuga a ~70% da altura, na altura do botão.
    - No desktop a mulher fica no terço esquerdo; no celular, no terço direito, deixando a porta visível.
  - **Opção 2:** `chatgpt-13-maos-vertical-celular.txt`, só com o celular 9:16. O desktop atual é mantido.
    - Anexar `Ultima_Secao.png` como referência de estilo.
    - Entrega do instrumental entre 58% e 72%, com antebraços preenchendo a base e fundo desfocado em cima.
- Posições nos prompts baseadas nas faixas medidas da página:
  - desktop: texto 15–64%, botão 68–75%, rodapé 83–100%;
  - celular: texto 12–56%, botão 60–70%, rodapé 74–100%.

## Encerramento: prompt de uma mulher de costas sob a luz cirúrgica — 13/09/2026

- O usuário pediu outra cena: só uma mulher de costas, com a luz cirúrgica refletindo nela, e o restante do cenário (mesa cirúrgica e equipamentos) preenchendo toda a seção.
- Prompt salvo como cenário novo: `human-output/image/gancho-encerramento/chatgpt-11-mulher-de-costas-luz-cirurgica.txt`. O prompt da equipe (cenário 10) foi mantido.
- **Desktop 16:9:**
  - câmera atrás da mulher, que fica no terço inferior direito;
  - foco no topo direito, com a luz refletindo na touca, nos ombros e nas luvas;
  - mesa cirúrgica vazia e preparada à frente dela;
  - sala completa em penumbra nas laterais e no fundo;
  - faixa central sem pontos de luz fortes, para o texto.
- **Celular 9:16:**
  - foco no topo;
  - metade de cima com o teto e o fundo da sala em penumbra;
  - mulher e mesa iluminadas entre 52% e 78% da altura;
  - base escura para o rodapé.
- Inclui correções prontas para rosto visível, mais de uma pessoa, luz no meio, cenário vazio e cores quentes.

## Encerramento: prompt da equipe sob a luz cirúrgica — 13/09/2026

- O usuário pediu um prompt de uma equipe trabalhando sob uma luz cirúrgica, com versão adaptada para o celular. Arquivo: `human-output/image/gancho-encerramento/chatgpt-10-equipe-sob-luz-cirurgica.txt`.
- A composição usa o que as medições anteriores mostraram:
  - **Desktop 16:9:** foco no canto superior esquerdo com cone de luz em diagonal, equipe no terço inferior (na altura do botão), centro escuro para o título e o parágrafo e base escura.
  - **Celular 9:16:** foco no topo à direita com halo contido, metade de cima escura, equipe entre 52% e 75% da altura (altura do botão) e quarto de baixo escuro para o rodapé.
    - O formato vertical é necessário porque a seção no celular tem proporção de cerca de 0,4.
    - Um 16:9 cortado mostraria só uns 20% da largura.
- **Implementação futura:** `<picture>` com `<source media="(max-width: 560px)">` para a versão vertical.
- **Revisão:** o usuário gostou das imagens geradas, mas esqueceu de avisar que quer as pessoas **de costas**, sem foto de frente mostrando rostos. O prompt foi reescrito no mesmo arquivo:
  - câmera atrás da equipe, na altura dos ombros;
  - três profissionais de costas, com a instrumentadora em primeiro plano;
  - lado de lá da mesa vazio e escuro, para ninguém ficar de frente;
  - luz contornando as silhuetas por trás.
  - A mesma composição foi mantida no desktop e no celular, e entrou uma correção pronta para o caso de aparecer rosto.

## Encerramento: teste com a imagem da luz cirúrgica — 13/09/2026

- **Imagem nova:** o usuário adicionou `assets/images/Luz_Cirurgica.png` (1672×941, 1,3 MB; original preservado) para testar se enquadra melhor. A cena é um foco cirúrgico visto de baixo, com o núcleo de LEDs aceso em turquesa no centro, cercado por uma sala escura. Corresponde ao cenário 4 dos prompts.
- **Brilho por faixa horizontal, medido com PIL** (média na largura toda):
  - **Luz cirúrgica:** muito escura em cima (8–13) e embaixo (2–5); pico no centro entre 30% e 60% da altura (28–37, com núcleo de 255).
  - **Mãos:** escura em cima (3–5); clara entre 40% e 70% (25–45) e clara de novo na base (41–52), atrás do rodapé.
- **Convertida** para `encerramento-luz.webp` (35 KB) e `-900.webp` (13 KB). A página **não** foi alterada.
- **Comparador `audit-visual/closing-options/` atualizado:**
  - **B:** passou a mostrar as mãos exatamente como estão na página (mesmo CSS de foto, degradês e vinheta).
  - **C · Luz cirúrgica:** mesmo tratamento, trocando só a imagem.
- **Verificado:** sem erros de console, sem overflow e imagens carregadas nas duas versões, em 1359 e 375px.
- **Contraste do pior ponto do texto:** calculado recompondo a foto em canvas com a mesma opacidade (.72) e o mesmo degradê vertical. A sombra do texto e a vinheta foram ignoradas, então o valor é conservador.

  | Texto | Mãos 1359 | Mãos 375 | Luz 1359 | Luz 375 |
  |---|---|---|---|---|
  | "Você já aprendeu…" | 17,1 | 17,0 | 13,5 | 14,8 |
  | Frase em itálico | 12,4 | 12,4 | **2,58** | 7,9 |
  | Texto dos 6 passos | **2,69** | **2,70** | **2,66** | **2,65** |
  | Ressalva do rodapé | 5,8 | 5,6 | 6,3 | 6,3 |

  - Nas mãos, o ponto fraco é o parágrafo sobre as luvas e a pinça.
  - Na luz, é o parágrafo e a frase em itálico no desktop, porque o núcleo de LEDs fica atrás dela.
  - Referências mínimas: 4,5 para texto comum e 3 para títulos grandes.
  - Para qualquer uma das duas, a correção seria escurecer só a faixa central do degradê (.3 → cerca de .5).
- **Prints do usuário no celular:**
  - Na C (luz), o núcleo de LEDs fica atrás do parágrafo dos 6 passos e atrapalha a leitura.
  - Na B (mãos), o texto fica limpo e as mãos emolduram o botão.
- **Sugestão:** descer a luz, sem escurecer. O usuário aprovou montar as duas alternativas no comparador:
  - **C1 · Luz descida:** `--shift` de 30% no desktop e 22% até 900px, para o núcleo sair de trás do texto e ficar na altura do botão. Brilho e degradê iguais aos da C.
  - **C2 · Luz escurecida:** mesma posição da C; degradê do meio de .3 para .55 (stops 0 / .22→.6 / .45→.55 / .7→.55 / .88→.85 / 1).
- **Verificado:** sem erros de console, sem overflow e imagem carregada nas quatro versões (B, C, C1, C2), em 1359, 900, 768, 375 e 320px.
- **Contraste do pior ponto:** canvas com a descida e o degradê de cada versão; sombra do texto ignorada.

  | Texto | B · Mãos | C · Luz | C1 · Luz descida | C2 · Luz escurecida |
  |---|---|---|---|---|
  | Texto dos 6 passos | 2,69–2,81 | 2,65–2,67 | **4,50 (1359) · 4,54 · 4,61 · 6,42 (375) · 5,22 (320)** | 4,61 em todos |
  | Frase em itálico | ≥12,3 | 2,58 (1359), 5,1–7,9 nos demais | 6,1–7,6 | 4,31 (1359), 6,3–8,8 nos demais |
  | Marca / ressalva do rodapé | ≥16 / ≥5,6 | ≥15,8 / 6,3 | 17 no desktop, 9,1–9,7 em tablet e celular / 5,3–5,6 | ≥16 / 6,3 |

- **Posição do núcleo de luz na C1:** o centro fica 16px abaixo do botão no desktop (691 contra 614–675px). No celular fica atrás da base do botão (618 contra 538–623px). A borda inferior do halo encosta no topo do rodapé nos tamanhos pequenos, mas os textos do rodapé seguem acima de 4,5.
- **Conclusão:** C1 e C2 resolvem a legibilidade (parágrafo ≥4,5; título grande ≥3). A C1 mantém o brilho total da luz; a C2 apaga a imagem inteira no meio.

## Encerramento: foto na mesma posição do exemplo — 13/09/2026

- Feedback: o usuário gostou do resultado final, mas achou a imagem muito embaixo e pediu que ela cubra quase toda a seção, como na versão B do comparador.
- Alterado:
  - `--photo-shift` passou para 0%.
  - `--closing-stage` voltou ao espaçamento do exemplo: `clamp(72px,7vw,104px)` no desktop e 56px até 560px.
  - Removidos os ajustes de tablet (13%/236px) e celular (8%/440px).
  - Tratamento de cor, degradês, vinheta, título e textos mantidos.
- Consequência: as mãos voltam para o meio da seção, atrás da parte de baixo do texto e do botão, como a figura no exemplo.
- **Verificado:** sem erros de console e sem overflow em 1359, 1440, 900, 768, 375 e 320px. A foto cobre toda a `.closing` em todos os tamanhos. Títulos inalterados: 276px de altura em 1359px.

  | Largura | Encontro das mãos | Texto dos 6 passos | Topo das luvas | Botão |
  |---|---|---|---|---|
  | 1359px | 516px | 467–597px | 405px | 637–702px |
  | 900px | 410px | termina em 419px | — | — |
  | 375px | 517px | 353–521px | — | — |

  - As pontas dos dedos ficam dentro da coluna do texto, então a pinça passa atrás do parágrafo.
- **Ponto a observar:** a legibilidade do texto sobre as luvas claras. Hoje há degradê de .3 no meio e sombra no texto; se o usuário achar que atrapalha, escurecer só a faixa central do degradê.

## Encerramento: foto cobrindo a seção inteira e título igual ao exemplo — 13/09/2026

- **Feedback do usuário (com prints):**
  - na página, a foto cobria só metade da seção e aparecia só uma mão;
  - no exemplo (versão B do comparador), a foto cobria a seção inteira;
  - pediu para confirmar se os textos tinham o mesmo tamanho.
- **Causa da mão única:**
  - `.closing-photo` tinha as classes `.reveal` e `.in-view`, e a regra de entrada troca o `transform`.
  - O `translateX(-50%)` que centralizava a foto era substituído por `translateY(22px)`.
  - Com isso, a foto começava no meio da tela (`left:672px` em 1359px) e mostrava a metade esquerda da imagem do lado direito.
- **Tamanho dos textos:** idêntico ao exemplo, medido em 1359px:
  - título: 59,8px;
  - texto dos 6 passos: 18px;
  - botão: 17,6px;
  - larguras: 980px no bloco e 620px no parágrafo.

  A diferença estava na quebra de linha: na página, a frase em itálico era `inline` depois do `<br>`; no exemplo, era um bloco próprio. Pelo print, o navegador do usuário também parecia estar com zoom reduzido na página.
- **Correção:**
  - `.closing-photo` com `inset:0`, sem `transform`. A imagem cobre a seção inteira com `object-fit:cover` e desce `--photo-shift` para as mãos ficarem abaixo do botão, e não atrás do texto. Mesmo tratamento do exemplo: saturação .75, contraste 1.05, degradês verticais e vinheta radial; opacidade .72.
  - Frase em itálico com `display:block` e `margin-top:.18em`; o título ficou com 276px de altura, igual ao exemplo.
  - Valores por tamanho:
    - desktop: `--photo-shift` 20% e `--closing-stage` (padding abaixo do botão) 155px;
    - até 900px: 13% e 236px;
    - até 560px: 8% e 440px.
  - `sizes` da imagem: `(max-width: 560px) 300vw, 125vw`.
- **Verificado:** sem erros de console e sem overflow. A foto cobre toda a `.closing`. Posições das mãos (em px):

  | Largura | Botão → mãos | Mãos → rodapé | Luvas abaixo do texto |
  |---|---|---|---|
  | 1359 | 44 | 89 | 30 |
  | 1440 | 42 | 91 | 27 |
  | 900 | 89 | 125 | 87 |
  | 768 | 95 | 119 | 95 |
  | 375 | 176 | 242 | 147 |
  | 320 | 153 | 265 | 110 |

  - Em todos os tamanhos, as mãos ficam até 56px acima do meio entre o botão e o rodapé.
  - No celular aparecem as pontas dos dedos das duas mãos e a pinça.
- Backups: `index.before-closing-cover.html` no scratchpad.

## Encerramento com foto e rodapé integrado na página — 13/09/2026

- O usuário salvou a imagem em `assets/images/Ultima_Secao.png` (1672×941, 1,4 MB; original preservado). Script aplicado:
  - **Imagem:** `encerramento-maos.webp` (46 KB) e `encerramento-maos-900.webp` (19 KB).
  - **HTML:** `section.final` e `footer` agora dentro de `div.closing`, com `<picture class="closing-photo reveal" aria-hidden="true">` ancorado embaixo (largura `max(100%,1400px)`, 230% no celular) e degradês para o navy em cima, embaixo e nas laterais. O texto fica na área escura; `--closing-stage` cria o espaço das mãos abaixo do botão. A foto se aproxima (scale 1.05 → 1) ao entrar e fica parada com movimento reduzido.
  - **Rodapé:** marca e data em `.foot-row`, ressalva em `p.legal` (`--muted`, .8125rem; o estilo inline saiu). Copy idêntica.
  - **CSS removido:** `.band-final::before`, `.final` (base, camada e breakpoint), `.final::before`, `footer` base e o fundo de `.final`/`footer`. A seção deixou de usar `band band-final seam`.
- Backup anterior: `index.before-closing.html` no scratchpad.
- **Ajustes feitos pelas medidas** (as capturas saíram em branco porque o painel oculto congela a renderização):
  - Foto afastada da base (`bottom:clamp(40px,5vw,72px)`), para as mãos ficarem entre o botão e o rodapé.
  - Até 900px: `--closing-stage:380px`, porque as luvas encostavam no botão.
  - Até 560px: `--closing-stage:320px` e foto com `bottom:250px`, porque o rodapé empilhado cobria as mãos.
- **Verificado:** sem erros de console, sem overflow nem elementos fora da tela. Copy, `href="#oferta"` e ressalva idênticos; nenhum `.band-final` nem estilo inline restante; ressalva com contraste de 6,32:1.

  | Largura | Botão → luvas | Encontro das mãos | Luvas → rodapé |
  |---|---|---|---|
  | 1440px | 133px | 925px (meio exato: 929px) | 53px |
  | 900px | 59px | — | 24px |
  | 768px | 64px | — | 19px |
  | 375px | 52px | — | 76px |
  | 320px | 112px | — | 41px |

  - No celular, o recorte mostra o punho da mão esquerda, a pinça e as pontas dos dedos da direita.
- **Não observado visualmente:** a composição real e a aproximação da foto; falta conferência no navegador e no celular. O PNG original `Ultima_Secao.png` (1,4 MB) continua em `assets/images/`, mas não é usado pela página.

## Encerramento: imagem escolhida (passagem do instrumental) — 13/09/2026

- O usuário gerou no ChatGPT a imagem do cenário 1 e pediu a implementação com ela. A imagem é 16:9, com a metade de cima quase preta, mãos enluvadas no centro entregando uma pinça com brilho turquesa e a mesa de instrumentais desfocada embaixo.
- A imagem veio só colada no chat e não foi encontrada no disco (Downloads, Área de Trabalho, Imagens e projeto). Foi pedido ao usuário que a salve.
- Script pronto no scratchpad: `apply_closing_photo.py "<caminho>"`.
  - **Imagem:** converte para `assets/images/encerramento-maos.webp` e `-900.webp`.
  - **HTML:** envolve encerramento e rodapé em `.closing`, com `<picture class="closing-photo reveal">` ancorado embaixo (o texto fica na área escura e as mãos no "palco" abaixo do botão), e integra o rodapé (marca e data na mesma linha, ressalva em `.legal`, sem estilo inline).
  - **CSS:** remove as regras antigas de `.final`, `footer` e `.band-final`.
  - **Segurança:** se algum trecho não bater, o script para sem alterar nada.
- Faltam a verificação visual e o ajuste fino do "palco" (`--closing-stage`) e do recorte no celular.

## Encerramento: foto de fundo escolhida — 13/09/2026

- O usuário escolheu a versão **B (foto de fundo)** do comparador `audit-visual/closing-options/`, em vez da A (batimento) recomendada.
- **Pendente:** imagem definitiva. A `dor-limiar.webp` só serve como provisória: repete o orbe do diagnóstico e tem 900×900px. Prompts prontos em `human-output/image/gancho-encerramento/`:
  - `chatgpt-portas-abertas.txt` (principal): as portas do centro cirúrgico se abrindo com luz turquesa e a profissional de costas entrando, como fecho da imagem do diagnóstico;
  - `chatgpt-luz-no-corredor.txt` (alternativa): vista de dentro da sala apagada para a porta aberta, com trilha de luz e sem pessoas;
  - `brief.txt`, com uso, paleta, regras e nome de arquivo sugerido (`assets/images/encerramento-portas.webp`).
- O usuário pediu mais ideias de cenário. Foram sugeridas 8 (passagem do instrumental, mãos calçando luva, mesa vista de cima, foco acendendo, monitor cardíaco, corredor do alto, amanhecer e Carol abrindo a porta). Ele escolheu três, com prompts salvos na mesma pasta:
  - `chatgpt-1-passagem-instrumental.txt`
  - `chatgpt-3-mesa-vista-de-cima.txt`
  - `chatgpt-4-foco-acendendo.txt`
- A pedido do usuário, prompts dos demais cenários também salvos na pasta:
  - `chatgpt-2-maos-calcando-luva.txt`
  - `chatgpt-5-monitor-cardiaco.txt`
  - `chatgpt-6-corredor-do-alto.txt`
  - `chatgpt-7-amanhecer-hospital.txt`
  - `chatgpt-8-carol-abrindo-a-porta.txt` (exige anexar foto da Carol; ela fica no terço direito para liberar o centro para o texto)
- Ideia do próprio usuário: uma mulher de costas no corredor, com a câmera próxima das costas dela e o corredor inteiro à frente. Prompt salvo em `chatgpt-9-mulher-de-costas-no-corredor.txt`, em duas versões:
  - **desktop 16:9:** ela no terço direito em primeiro plano, com o ponto de fuga e a porta de luz no centro, para o título não ficar sobre a cabeça dela;
  - **celular 4:5:** ela embaixo, cortada nos ombros, com o corredor subindo. O corte centralizado do 16:9 perderia a figura.
  - Na implementação, usar `<picture>` com as duas versões.
- Duas variações pedidas para o mesmo cenário, ambas com desktop 16:9 e celular 4:5:
  - `chatgpt-9b-caminhando-luzes-acendendo.txt`: ela caminha no terço esquerdo e as luzes do teto acendem em sequência até a porta.
  - `chatgpt-9c-sobre-o-ombro-entre-portas.txt`: ombro e touca desfocados no canto inferior direito, corredor com portas laterais fechadas e só a do fundo aberta.
- Próximo passo: quando as imagens forem geradas, colocar todas lado a lado no comparador `closing-options/`.

## Comparador do encerramento + rodapé — 13/09/2026

- **Pedido do usuário:** encerramento ("Você já aprendeu a instrumentar…") e rodapé mais premium. Na dúvida entre usar fundo ou outra solução, mandou referências:
  - Human Academy/Agent Lab: fundo animado com ícones da marca, faixa inclinada, fechamento curto e rodapé no mesmo fundo;
  - Claude Economy: foto escura de porta entreaberta atrás do título;
  - Dever de Prosperar: cartão com texto e imagem ao lado.
- **Recomendação aceita para teste:** batimento atravessando a seção, com rodapé integrado. Descartados:
  - ícones flutuando, com risco de clipart e cara de IA;
  - cartão com imagem, que repete o formato da oferta;
  - "Falar com o time", barra fixa e contagem regressiva, que exigem copy ou condições que não existem.
- **Montado `audit-visual/closing-options/`**, com seletor. A copy é idêntica à da página.
  - **0 · Atual:** referência.
  - **A · Batimento atravessando:**
    - grade fina do mapa ao fundo e brilho verde-menta sutil;
    - linha de ECG que se desenha ao entrar na tela, da borda esquerda até o centro, com dois batimentos, e termina num ponto verde-menta acima do botão (o destino do mapa); o caminho segue apagado até a borda direita;
    - pulso de luz percorrendo o traço a cada 4,2s;
    - SVG próprio no celular;
    - título maior, com a frase em itálico em bloco;
    - estático com movimento reduzido.
  - **B · Foto de fundo:** `dor-limiar.webp` (corredor com as portas do centro cirúrgico e luz turquesa) sob degradês e vinheta, com aproximação lenta ao entrar. Imagem **provisória**: é a mesma do orbe do diagnóstico e tem só 900×900px.
  - **Rodapé nas duas propostas:** mesmo fundo, fio fino, "Gancho da Virada" e a data na mesma linha, ressalva abaixo em `--muted` com .8125rem. Antes era `--muted-2` com .76rem, contraste baixo.
- **Verificado:** sem erros de console, sem overflow nem elementos fora da tela em 1440, 375 e 320px. Título, texto dos 6 passos, botão, marca, data e ressalva são idênticos aos de `index.html` (comparados via `fetch`) nas três versões.
  - **A:** o traço termina no centro, com o ponto verde-menta e o botão alinhados (713/712/713px em 1440; 188 em 375; 160 em 320). A animação `ecgPulse` roda com a seção ativa. No celular, o SVG próprio é exibido e o de desktop fica oculto.
  - **B:** foto carregada.
  - **Contraste da ressalva:** 6,32:1 nas propostas, contra 3,5:1 na versão atual.
- **Não observado:** o desenho progressivo da linha e a aproximação da foto, porque o painel oculto congela transições. Capturas de tela não tentadas.

## FAQ editorial com filete na página — 13/09/2026

- O usuário escolheu a versão **1 (editorial com filete)** e pediu a remoção do kicker “Dúvidas” (autorização registrada no handoff).
- **HTML:** kicker removido; nas 6 perguntas o texto foi para `span.q`, o ícone SVG `.ch` virou `span.pm` (`aria-hidden`) e a resposta ganhou `<p>` dentro de `.a`. Copy idêntica, inclusive o placeholder da gravação.
- **CSS:** removidas as regras antigas do FAQ (base `.faq-list`/`.faq`, camada `.sec-faq` e breakpoints) e as regras `.kicker`/`.light .kicker`, que ficaram sem uso. Bloco novo no fim do `<style>`.
- **JS:** abertura/fechamento com altura animada adicionado no fim do script, usando o `motionPreference` existente.
- Backup anterior: `index.before-faq.html` no scratchpad da sessão. A comparação com ele mostra alterações só no FAQ e nas regras do kicker.
- Verificado sem erros de console e sem overflow nem elementos fora da tela:
  - 1440px: colunas de 430 e 602px, título sticky (`top:96px`) com 60px, perguntas de 23px, 6 itens convertidos. O clique na primeira pergunta abre com animação de 460ms. Placeholder da gravação preservado, nenhum `.kicker` restante e regra de movimento reduzido presente.
  - 768px: uma coluna, título estático com 44px.
  - 375px: título com 32px, perguntas com 18px e ícone de 32px.
  - 320px: sem problemas.
- Não medido: o fim das animações (o painel oculto congela as animações). Capturas de tela não tentadas.

## Comparador do FAQ — 13/09/2026

- O usuário quer o FAQ ("Ficou com alguma dúvida?") mais premium, bonito e profissional, no mesmo processo usado na oferta e na garantia.
- Montado `audit-visual/faq-options/`: seção em tamanho real com seletor fixo; copy idêntica (6 perguntas, respostas, kicker "Dúvidas" e placeholder da gravação).
  - **0 · Atual:** referência.
  - **1 · Editorial com filete:** título maior e fixo (sticky) à esquerda e perguntas maiores. No hover a pergunta avança 6px e surge um filete turquesa; aberta, o filete percorre a linha inteira.
  - **2 · Cartões em duas colunas:** título centralizado e 3 + 3 cartões arredondados. Aberto, o cartão ganha fundo mais claro, borda turquesa, fio de luz no topo e resposta separada por fio.
  - **3 · Índice + leitura:** painel único com índice das perguntas à esquerda (`role=tablist`, setas/Home/End) e, à direita, a pergunta em destaque com filete e a resposta em corpo grande, com troca suave. No celular vira a sanfona da 1.
- Comum às propostas: abertura com altura animada (Web Animations; `fill:forwards` no fechamento para não piscar) e ícone "+" que vira "−". Com `prefers-reduced-motion`, abre e troca sem animação.
- Verificado, sem erros de console e sem overflow nem elementos fora da tela em 1440, 375 e 320px:
  - 1440px: 1 com colunas 430/602px, título sticky e perguntas de 23px; 2 com duas colunas de 548px; 3 com painel de 460px de altura. Na 3, o clique na terceira pergunta atualiza título e `aria-labelledby`, e a seta ↓ move o foco e troca a pergunta.
  - 375px: 1 com o título deixando de ser fixo; 2 em uma coluna, alinhada à esquerda; 3 com o painel oculto e a sanfona visível.
- Não medido: o fim das animações de abertura e fechamento, porque o painel oculto congela as animações. Capturas de tela não tentadas nesta rodada (falhas repetidas antes).

## Garantia: título alterado — 13/09/2026

- A pedido expresso do usuário, o título `h4#garantia-titulo` passou de “7 dias de garantia” para “Garantia de satisfação total”. Mantidos o texto circular da medalha (“7 dias de garantia · 7 dias de garantia ·”), o “7” e o parágrafo das condições. Autorização registrada no handoff.

## Garantia: certificado com selo girando na página — 13/09/2026

- O usuário escolheu a versão **2 (certificado)** em vez da 1 recomendada, pedindo o selo animado ("talvez girando").
- **HTML:** `div.guarantee` trocado por `aside.gcert` (`aria-labelledby="garantia-titulo"`) com:
  - moldura interna e quatro cantos turquesa;
  - medalha `aria-hidden` com SVG de dois anéis e o texto circular "7 dias de garantia · 7 dias de garantia ·" (`textPath`, id `gcert-ring-path`);
  - disco turquesa com o "7" em Fraunces itálico;
  - `h4#garantia-titulo` e o parágrafo de sempre.
- **Animação:** `.gcert-ring` gira com `@keyframes gcertSpin` (28s, linear, infinito); o "7" fica parado. Com `prefers-reduced-motion`, regra própria `animation:none` deixa o anel estático e legível.
- **CSS:** removidas todas as regras de `.guarantee` e `.seal` (linhas `.light`, base, breakpoints e camada `.offer-sec`). O bloco novo fica no fim do `<style>`.
- **Verificado:** sem erros de console; sem overflow nem elementos fora do cartão em 1440, 375 e 320px.
  - 1440px: cartão de 1112×472, a 24px do bloco de preço; medalha de 132px, texto circular renderizado, `gcertSpin` com `playState` running.
  - 375px: cartão de 327×487, medalha de 116px, título de 30px e texto de 16px.
  - 320px: cartão de 272×575, título em 2 linhas.
  - A regra de movimento reduzido foi encontrada na folha de estilos.
- A comparação anterior à troca está no backup `index.before-guarantee.html`, no scratchpad da sessão. Capturas de tela falharam por timeout do painel.

## Comparador da garantia — 13/09/2026

- O usuário pediu uma garantia bonita, premium e profissional, que acompanhe o resto da página, e rejeitou soluções apenas "ok". Imagem gerada é permitida: se for o caso, deixar o espaço reservado.
- Montado `audit-visual/guarantee-options/`. O fim da oferta aparece exatamente como na página (faixa do bônus, preço e botão), com a garantia logo abaixo e um seletor fixo:
  - **0 · Atual:** referência.
  - **1 · Numeral editorial:** "7" grande em Fraunces itálico turquesa com "dias" espaçado, fio vertical, título com o filete da oferta e linha de ECG estática e sutil no canto.
  - **2 · Certificado:** moldura dupla com cantos turquesa, anéis finos irradiando do topo, medalha com o texto circular "7 dias de garantia" e o "7" no centro; tudo centralizado.
  - **3 · Imagem + texto:** mesmo formato das faixas da oferta (imagem de um lado, texto do outro, filete), escudo pequeno ao lado do título e espaço tracejado para a imagem a gerar.
- Copy da garantia idêntica. Nenhum ícone novo, pulsação ou degradê em texto.
- Verificado, sem erros de console e sem overflow nem elementos fora do cartão:
  - **1440px** (alturas): atual 166px; 1 com 308px e numeral de 128px; 2 com 472px e texto circular renderizando; 3 com 328px e espaço de imagem de 415×278.
  - **375px:** 1 empilhada com "7" de 104px, 2 com medalha de 116px, 3 com imagem de 325×203.
  - **320px:** sem problemas.
- Capturas de tela falharam por timeout do painel.

## Oferta: versão B com preço em duas colunas na página — 13/09/2026

- O usuário aprovou a B com a estrutura de preço 1 e pediu a implementação. Mudança só na oferta; a garantia (`.guarantee`) ficou intacta para ser tratada depois. Backup anterior no scratchpad da sessão.
- **HTML:**
  - Removido o kicker "Sua vaga" (autorizado e registrado no handoff).
  - Título alinhado à esquerda.
  - "Você recebe:" mais o bloco `.ov`: três faixas `.ov-row` (capas `how-aulas`/`how-encontro` via `srcset`; bônus com o SVG antigo sobre grade), conectores "+" e o fechamento `.ov-buy`, com preço, fio e botão `#checkout-link` (`href="#"` e comentário do checkout preservados).
- **CSS:** removidas as regras mortas da oferta antiga em todas as camadas (`.offer-box`, `.incl*`, `.plus`, `.price`, `.offer-purchase`, `.bonus-line`, `.offer-art`). O bloco novo fica no fim do `<style>`. Ajustes feitos durante a verificação:
  - até 900px o botão fica com no máximo 460px, alinhado à esquerda (antes esticava para 787px);
  - até 360px a fonte do botão diminui (em 320px, 2 linhas em vez de 3).
- **Verificado:** sem erros de console; sem overflow nem elementos fora da tela em 1440, 900, 768, 375 e 320px. A comparação com o backup mostra alterações só nos trechos da oferta.
  - 1440px: vitrine com 1112px, títulos de 40px, preço em `164px 1px 721px` e botão de 460×61.
  - 375px: tudo empilhado, capas de 325×183, títulos de 30px e botão de 277px.
- Capturas de tela falharam por timeout do painel; a conferência visual fica com o usuário.

## Oferta: B escolhida, textos refinados no comparador — 13/09/2026

- O usuário escolheu a **B** (vitrine em um bloco) em vez da C recomendada. Pediu textos com mais estilo, sem os números 01/02/03 acima dos títulos e **sem o kicker "Sua vaga"** acima do título. A remoção de "Sua vaga" está autorizada e deve entrar na lista do handoff quando for para a página.
- Aplicado na B do comparador:
  - Títulos em `h4` com parte em Fraunces itálico turquesa: "3 Aulas de *Preparação*", "Encontro Ao Vivo — *Os 6 Passos da Virada*", "*Bônus*".
  - Filete turquesa de 32px entre título e descrição, que cresce para 72px no hover.
  - Descrições em 1,125rem com a informação-chave em peso ("Acesso imediato", "24 de setembro às 20h.").
  - Bônus em lista com traço turquesa e fios finos.
  - Copy inalterada. O bloco de preço ainda segue o seletor 1/2/3.
- Verificado, sem erros de console e sem overflow:
  - 1440px: títulos com 40px (aulas e bônus em 1 linha, encontro em 2).
  - 375px: títulos com 30px (aulas em 2 linhas, encontro em 3, bônus em 1), descrições com 277px de largura.
  - Na B não sobrou nenhum `.kicker` nem `.v-meta`.
  - Capturas de tela falharam por timeout do painel.

## Comparador da oferta — rodada 3 (preço embutido) — 13/09/2026

- O usuário não conseguia avaliar os blocos de preço isolados ("tenho que ver embutido"). Os três blocos de `audit-visual/price-block/` foram levados para dentro da B e da C em `audit-visual/offer-options/`.
- Um seletor fixo no topo (1 duas colunas com fio · 2 centralizado sóbrio · 3 faixa compacta) troca a estrutura ao vivo nas duas versões; a escolha fica salva no navegador.
- **B:** o preço é a última linha da vitrine, sem o "=".
- **C:** o preço ocupa a coluna da direita sem a caixa interna, sem o brilho e sem o ícone de raio ("Acesso imediato às 3 aulas" saiu). No celular fica embaixo da lista.
- Os blocos se adaptam por container query: na coluna da C (cerca de 540px) e no celular usam a forma empilhada.
- A versão A foi movida para o fim, sem mudanças.
- Correções durante a verificação:
  - Na coluna da C, `justify-content:center` encolhia o grid do bloco 2 para 399px. Agora a centralização é só vertical (`align-content`), e `justify-content` fica apenas no bloco 3, que é flex em coluna.
  - No celular, o seletor fixo tinha 146px de altura. Passou a ser uma linha só com rolagem lateral e sem título.
- Verificado em 1440 e 375px: sem erros de console e sem overflow. O seletor alterna os três blocos na B e na C, sem elementos fora do contêiner. Em 1440px os botões ficam numa linha: 460/480/449px na B e 490px na C, com o bloco centralizado na vertical. Em 375px os blocos ficam empilhados, com botão de 277px.

## Comparador do bloco de preço — 13/09/2026

- Feedback: o fechamento da B (preço + botão) não agrada, e a C continua com os mesmos problemas no celular (estrutura do bloco de preço e ícone de raio).
- Montado `audit-visual/price-block/` com três estruturas. Cada uma aparece larga (fim da B, 1112px) e em 375px (fim da C), usando container queries.
  - **1 · Duas colunas com fio:** preço à esquerda, fio vertical e botão à direita. No celular o fio fica horizontal.
  - **2 · Centralizado sóbrio:** tudo no eixo central, botão com largura contida e filete turquesa curto no topo.
  - **3 · Faixa compacta:** fundo um tom acima, preço e condições lado a lado separados por fio, botão no fim da linha.
- Nas três: "R$ 47,00" na mesma linha de base (sem "R$" e ",00" no alto), sem brilho, sem caixa dentro de caixa, sem "=" e sem ícone. Sombra do botão mais contida e sem reflexo. Copy igual; só "12x" em turquesa.
- Correção durante a verificação: o bloco "largo" dividia a linha com o de 375px e ficava com 753px, o que quebrava o botão da opção 1 e fazia o da opção 3 sair do cartão. Agora o largo ocupa a linha inteira e o celular fica embaixo.

## Comparador da oferta — rodada 2 — 13/09/2026

- Feedback do usuário: por enquanto mexer **só na oferta** (entregas + preço/botão); a garantia fica para depois. A ordem certa é mostrar primeiro o que a pessoa recebe e depois o preço, e a A estava invertida. Na B o botão ficava sozinho, separado do resto. A C pode ter acabamento mais premium.
- `audit-visual/offer-options/` reescrito, sem garantia em nenhuma versão:
  - **A · Ingresso:** "Você recebe:" com miniaturas → picote → canhoto com preço e botão.
  - **B · Vitrine em um bloco:** entregas e preço no mesmo contêiner, com linhas divisórias e conectores "+" e "=" centrados nelas. O preço é a última linha, com o botão ao lado.
  - **C · Cartão com capa:** moldura com fio turquesa nos cantos, capa com grão e vinheta, etiquetas de vidro "24 de setembro · 20h" e "Online e ao vivo" (copy do letreiro), entregas numeradas em blocos. Painel de preço próprio com brilho no topo, botão na largura toda e "Acesso imediato às 3 aulas" com sinal verde-menta.
- Ajuste pedido depois: removidas da B as etiquetas "Acesso imediato" e "24 de setembro · 20h" (o usuário achou que davam cara de IA). Ficam os números 01/02/03 e os conectores. O usuário também não gostou de duas coisas na C no celular, que ainda não foram mexidas: a estrutura do bloco de preço e o ícone de raio em "Acesso imediato às 3 aulas".
- Nas três: "R$" menor alinhado ao topo do preço e reflexo que atravessa o botão no hover. Copy e condições comerciais inalteradas.
- Verificado em 1440px: sem erros de console, sem overflow, sem imagens quebradas, bônus nos dois slots, botões em uma linha (64–66px), conectores centrados nas linhas (±1px), etiquetas da capa sem encostar no título. Capturas de tela falharam por timeout de renderização do painel.

## Comparador da oferta "Sua vaga" — 13/09/2026

- O usuário quer a seção de oferta mais bonita, premium e profissional, sem direção fechada. Enviou referências: cartão de preço e bônus em faixas da Claude Economy, cronograma e barra fixa do Agent Lab, e cartão com capa do Starter (Human Academy).
- Montado `audit-visual/offer-options/` com três versões. Mantêm copy, paleta, botão e selo; `index.html` **não** foi alterado.
  - **A · Ingresso:** cartão único centralizado de 640px com preço grande, botão largo e picote. Abaixo, "Você recebe:" com miniaturas e garantia no rodapé.
  - **B · Vitrine:** cada entrega em faixa larga com foto de um lado, alternando lados. Etiquetas numeradas e "Acesso imediato" em verde-menta, data em turquesa. Fecha com painel de compra e garantia embutida.
  - **C · Cartão com capa:** foto `how-encontro` como capa com o título por cima. Abaixo, "Você recebe" à esquerda e preço + botão à direita, com selo resumido; texto completo da garantia no rodapé.
- Não incluídos, porque dependem de confirmação: lote, vagas restantes, contagem regressiva e barra fixa de compra. A barra repetiria o CTA fixo removido em 11/09.
- Observações para a decisão: o bônus não tem foto e usa a ilustração SVG atual, que fica fraca ao lado das capas (sobretudo na B). As capas de "Como funciona" apareceriam de novo na oferta.
- Verificado: sem erros de console e sem overflow em 1440, 375 e 320px, sem elementos fora da tela e sem imagens quebradas. Capturas das três versões no desktop e no celular.

## Depoimentos: carrossel guiado (versão B) na página — 12/09/2026

- O usuário escolheu a versão **B** do comparador e pediu a implementação. Mudanças só em `.sec-proof` (HTML dos controles, CSS e JS do carrossel); prints, título, ampliação e copy intactos. Backup anterior no scratchpad da sessão.
- Trilho alinhado ao título à esquerda (`--rail-pad`) e sangrando até a borda direita, com máscara dissolvendo à direita. Removidos: barra de progresso única, bordas `has-prev/has-next`, `scroll-snap`.
- Ajuste pedido no desktop para o deslize fazer sentido: blocos de 480px e prints longos de 400px com corte em 550px (antes 420/340/470). ≤900px volta a 400/340/470; celular sem mudança.
- Autoplay: 5s por parada, deslize de 700–1400ms com easing quártico; pausa com mouse/foco no carrossel, toque (+2,5s), arrasto, ampliação aberta, aba oculta ou seção fora da tela (IntersectionObserver 35%, relógio para fora da tela); desligado com `prefers-reduced-motion`.
- Controles: contador “01 / 03” (oculto ≤760px), um segmento clicável por parada com `aria-current`, setas de 56px (46px no celular), anel de tempo na seta “próximo” (cinza pausado) e seta que atravessa o botão no hover.
- Verificado: sem erros de console; sem overflow em 1440, 900, 768, 375 e 320px; trilho a 156,5px contra título em 157px (1440); 3 paradas em 1440/900 e 4 em 768/375/320; próximo 01→02→03→01, anterior 01→03, segmento 2 leva a 425px. Controles sem sobreposição em todos os tamanhos. A seção ficou 85px mais alta no desktop (1003px).
- Com clique real em 800×600, o print abre a ampliação com o carrossel pausado, e Esc fecha devolvendo o foco ao card. Corrigido no caminho: a pausa por foco travava o carrossel depois de fechar com mouse, porque o foco volta ao card. Agora só pausa com `:focus-visible`. Conferido: fechando pelo ×, o foco fica no card sem `:focus-visible` e sem pausa.

## Comparador do carrossel de depoimentos — 12/09/2026

- O usuário quer a seção de depoimentos "mais premium", sem direção fechada: talvez deslizar devagar, talvez animar ou remover as setas. Montado `audit-visual/proof-carousel/` com três versões, mesmos prints, título e cartão; `index.html` **não** foi alterado.
  - **A · Fluxo contínuo:** trilho infinito a 26 px/s com bordas dissolvendo (máscara), desacelera ao hover/toque, arrasto, sem setas nem barra; botão discreto "Pausar movimento" (WCAG 2.2.2).
  - **B · Passo a passo guiado:** avança um bloco a cada 5 s com deslize lento (700–1400 ms, easing quártico); segmentos clicáveis por parada, contador 01/04, botão "próximo" com anel que marca o tempo e seta que atravessa o botão no hover com brilho turquesa.
  - **C · Duas faixas:** mural com duas fileiras em sentidos opostos (22 px/s), prints centrados verticalmente, pausa por fileira e botão de pausa geral.
- Ampliação no comparador é simplificada; a da página (animada a partir do card) seria mantida na integração.
- Armadilha nova: alternar `scroll-snap-type` durante um deslize via JS faz o Chrome re-encaixar no card anterior ao religar o snap (o trilho voltava a 0). A versão B dispensa o CSS snap e encaixa na parada mais próxima por JS, inclusive após rolagem com o dedo.
- Verificado: sem erros de console, sem overflow em 1440 e 375 px, clones `aria-hidden` com `tabindex=-1`, A/C andando nos sentidos certos, B avançando sozinha (02/03 em 1440px) e setas dando a volta nas pontas; 4 paradas no celular. Rolagem automática desligada com `prefers-reduced-motion`.

## Handoff consolidado — 12/09/2026

- `docs/handoff-claude.md` reescrito a pedido do usuário para continuar em outro chat: perfil e forma de trabalho do usuário, todas as remoções de copy autorizadas, estado atual de cada seção (inclusive público em 2·3·2, Carol com resultados na faixa e citação animada, depoimentos com prints e ampliação animada), armadilhas técnicas encontradas, como verificar neste ambiente e pendências.
- Corrigidas informações desatualizadas da versão anterior do handoff (sétimo critério em Fraunces, resultados acima da narrativa, retrato 4:3 no celular, evidência mais recente em `mentor-visual/`).

## Celular: colunas de prints como no desktop — 12/09/2026

- Removido o `.shot-col{display:contents}` do breakpoint de 760px, que dissolvia a coluna e fazia cada print virar um slide. Agora o celular repete a composição do desktop: 4 blocos (print longo, coluna de 3 curtos, print longo, coluna de 2), coluna com `gap:16px`.
- Encaixe corrigido junto: `scroll-snap-align` passou para a coluna (`none` nos prints internos), senão o carrossel parava dentro da coluna.
- Medido em 375px: slides de 279×314, 311×371, 279×424 e 311×276; trilho 1300px contra 375px visíveis; sem overflow.

## Ampliação: animação visível de abertura — 12/09/2026

- O usuário não percebeu a entrada anterior (fade de 240ms + subida de 360ms via CSS). Trocada por animação com origem no card: o print viaja da posição e do tamanho dele no carrossel até o centro (Web Animations API, 420ms, `cubic-bezier(.22,1,.36,1)`), com o fundo entrando em 300ms; ao fechar, refaz o caminho em 300ms.
- Armadilha corrigida no caminho: a primeira versão encadeava `load` → `requestAnimationFrame`, e o rAF não roda quando a renderização está parada. Agora dispara direto após forçar o layout, com `load` e um `setTimeout(80)` como rede.
- Cascata na entrada da seção: cada print sobe 22px e aparece com atraso de 70ms em relação ao anterior (delays 0 a 420ms aplicados via JS). Regra fica sob `.motion-ready`, então sem JS os prints continuam visíveis.
- Verificado com clique real: abertura cria as duas animações com os valores esperados (`translate(-206px,92.8px) scale(.77)` → identidade) e o fechamento cria as inversas; camada só some ao fim, `src` limpo, scroll e foco restaurados.

## Ampliação dos prints: bug do clique e versão animada — 12/09/2026

- **Bug:** clicar no print (ou na lupa) não abria nada. Causa: o arrasto do carrossel chamava `setPointerCapture` no `pointerdown`; com a captura ativa o `click` vai para o trilho e nunca chega ao `<button>` do print. Corrigido: a captura só acontece depois de 4px de movimento, e o scroll do arrasto também só começa aí.
- Lição: testes com `element.click()` via JS não reproduzem isso. A validação passou a usar clique real (`computer left_click`) com o viewport igual ao painel, para as coordenadas baterem 1:1.
- Ampliação refeita: entrada com desvanecimento do fundo e leve subida da imagem, setas laterais, teclado (← → e Esc), deslize no celular, sete pontinhos de posição e transição suave na troca (`is-swapping`). Foco preso entre fechar/anterior/próximo e devolvido ao card ao sair; movimento reduzido cai para troca instantânea.
- Verificado com interação real em 800×600: clique abre em `prova-8`, seta vai para `prova-6`, teclado navega e volta, Esc fecha e restaura o scroll, arrasto rola 186px sem abrir a ampliação, barra e bordas acompanham. Sem erros de console.

## Depoimentos: avisos removidos e navegação refeita — 12/09/2026

- A pedido expresso do usuário, removidos o aviso legal da seção (“Este depoimento representa uma experiência individual…”) e a frase “← Arraste para ver mais →”. **Atenção:** `docs/brand-guide.md` seção 13 pede ressalva junto de depoimentos. O rodapé mantém a ressalva geral (“Não há garantia de contratação, equipe, cirurgia ou prazo para resultados. Resultados podem variar de pessoa para pessoa.”), que passa a ser a única da página. Decisão do usuário, registrada aqui.
- CSS órfão removido: `.disclaimer`, `.rail-hint` e seus overrides em `.sec-proof` e nos breakpoints.
- Navegação do carrossel refeita: setas e barra de progresso reunidas num conjunto centralizado abaixo do trilho; a barra mostra a proporção visível e a posição (largura e `left` em % via JS). Bordas do trilho dissolvem no fundo com degradê, só quando há conteúdo para aquele lado (`has-prev`/`has-next`). No celular, só a barra: ela substitui a frase removida como pista de que o conteúdo corre para o lado.
- Verificado em 1440px: barra em 70,7% de largura indo de 0% a 29,3% de deslocamento entre as pontas, `has-next` ligando no início e `has-prev` no fim, conjunto centralizado (713 de 720), sem overflow nem erros de console. Confirmado por captura de tela.

## Depoimentos: card da Aline e kicker removidos — 12/09/2026

- A pedido expresso do usuário, removidos o card em destaque da Aline (nome, cargo, estrelas, citação e os três chips “3 anos tentando → 3º passo → nova oportunidade”) e o kicker “Prova” acima do título. Autorização registrada; não reintroduzir.
- O carrossel passou a ter só os sete prints reais. `.kicker` continua em uso em “Sua vaga” e “Dúvidas”, então a regra foi mantida.
- Limpeza do CSS que ficou órfão: `.tcard` e variantes, `.stars`, `.flow`, `.chip`, `.arw`, mais os overrides em `.sec-proof` e nos breakpoints (2950 caracteres a menos). Nenhuma referência restante no arquivo.
- Setas do carrossel movidas de cima do trilho para a linha inferior, à direita da frase “Arraste para ver mais”: em 1024px elas começavam em x=883 e o título podia chegar a 884. Conferido em 1440, 1024 e 900px, sem sobreposição com título ou frase.
- Aviso legal segue no singular (“Este depoimento representa uma experiência individual”) com sete provas na tela; ajuste para o plural depende de autorização.

## Provas sociais reais nos depoimentos — 12/09/2026

- O usuário entregou sete prints em `assets/images/Depoimentos/` (1000×1000, WebP): cinco mensagens diretas do Instagram e duas conversas de WhatsApp, uma com foto da aluna instrumentando.
- Processamento (`/tmp` script com Pillow): recorte automático das margens vazias pela cor de borda, 30px de respiro, limite de 900px de largura, salvos como `assets/images/provas/prova-{5..11}.webp` (13 a 75 KB). Originais preservados.
- Os três cards de placeholder (“[Inserir print / vídeo / depoimento de aluno aqui.]”) saíram, cumprida a condição de haver conteúdo real. Card da Aline, aviso legal e “Arraste para ver mais” preservados.
- Montagem: cada print é um recorte em cartão branco (raio 20px, borda clara, sombra funda, elevação e borda turquesa no hover) sobre o navy. Prints curtos empilhados em colunas (`.shot-col`) para casar altura com os longos; no celular a coluna vira `display:contents` e cada print é um item do carrossel.
- Cada print é um `<button>` que abre a imagem ampliada em camada escura (`#shot-zoom`, `role="dialog"`), com foco no botão de fechar, Esc, clique fora e travamento do scroll do corpo. Prints longos têm corte em 470px com dissolvição e ícone de lupa.
- Carrossel ganhou arrasto com mouse (pointer events, com guarda para o arrasto não abrir a ampliação) e setas que desabilitam nos extremos; rolagem instantânea sob `prefers-reduced-motion`.
- Correção (12/09/2026): a camada de ampliação ficava visível na página toda, desfocando todas as seções com o `backdrop-filter`. Causa: `.shot-zoom{display:grid}` vence o `display:none` do atributo `hidden`. Adicionada `.shot-zoom[hidden]{display:none}`. Regra geral: sempre parear `hidden` com uma regra `[hidden]` quando o seletor define `display`.
- Verificado em 1440 e 375px: sete prints carregados, nenhum placeholder restante, trilho 2104px contra 1160px visíveis, setas chamando 928px por clique e desabilitando nos extremos, ampliação abrindo/fechando com foco e scroll restaurados, sem overflow nem erros de console. A animação suave das setas não pôde ser observada: o painel de preview congela animações quando oculto.

## Ícone animado e tratamento do retrato — 12/09/2026

- O ícone de batimento da citação deixou de ser `background-image` e virou SVG inline (`.quote-ecg`, `pathLength="100"`), com o traço se desenhando da esquerda para a direita em ciclo de 4s (`@keyframes quoteEcg`, opacidade .25→.85). Com `prefers-reduced-motion`, regra própria deixa o traço completo e estático, já que a supressão global de animações o deixaria invisível.
- Retrato: moldura turquesa de 1px deslocada atrás da foto (`::before`, inset 22px/-22px; 14px no celular), cantos passados para a própria imagem (20px, 16px no celular), vinheta interna na base e grade `contrast(1.06) saturate(.9) brightness(.9)` para integrar ao navy. `overflow` da figura passou a `visible` e o fundo saiu para a moldura aparecer.
- Validado em 1440, 375 e 320px: SVG 72×16 (64×14 no celular), animação aplicada, moldura terminando dentro da viewport (365px em 375; 310px em 320), sem overflow nem erros de console. O movimento em si não pôde ser observado: o painel de preview congela a renderização quando oculto.

## Legenda removida e citação em bloco turquesa — 11/09/2026

- “Foto Carol” removida do HTML com autorização expressa do usuário; as regras de `figcaption` saíram do CSS e o retrato ganhou `alt="Carol no centro cirúrgico"`. O véu escuro na base da foto, que existia para a legenda, foi suavizado (.72→.4, até 26%).
- Citação final (`.mentor-quote`) deixou o filete e virou bloco sólido em `--mint` com texto `#06122E`, raio 16px (14px no celular) e a linha de batimento do mapa em navy acima da frase. Turquesa, e não verde-menta, porque o manual reserva `--virada` a sinais de avanço.
- Medido: contraste 9,78:1; bloco 624×169 em 1440px, 327×159 em 375px; 2 linhas no desktop, 3 em 375px e 4 em 320px. Sem overflow nem erros de console em 1440, 900, 375 e 320px. `docs/handoff-claude.md` atualizado (a legenda não deve voltar).
- `audit-visual/quote-options/` guarda as quatro variações comparadas antes desta decisão.

## CTA fixo do mobile removido — 11/09/2026

- A pedido do usuário, removido o botão “Quero participar” que ficava fixo na base da tela do celular durante a rolagem. Era o próprio botão da hero, deslocado por JavaScript; o botão continua na hero, no lugar original, apontando para `#oferta`.
- Removidos o bloco de JavaScript (`updateMobileCta` e listeners de scroll/resize), as regras `.btn.is-docked`, `body.has-docked-cta footer` e a reserva de altura `.hero-cta-slot{min-height:var(--cta-slot-height)}`. `docs/handoff-claude.md` atualizado. As entradas históricas abaixo que descrevem o CTA fixo não valem mais.
- Conferido em 375px rolando a página inteira: nenhum botão fixo ou sticky, botão da hero estático no slot, rodapé sem o recuo extra, sem overflow nem erros de console; 1440px sem alteração.

## Público e Carol — refino premium (Claude), 11/09/2026

- A pedido do usuário, sobre a versão do Codex (grade de critérios + faixa da equipe + retrato e números). Só CSS de `#para-quem` e `#carol`; HTML e copy intactos.
- Critérios: check ao lado do texto (antes acima), texto em `--cream` 1.125rem, filete turquesa de 32px no topo de cada item que percorre a linha no hover. Sétimo critério mantém o fechamento em Fraunces.
- Faixa da equipe: duotone navy real (`mix-blend-mode:luminosity` sobre `--navy`, cinza com contraste), grão SVG, degradês que fundem com `#para-quem` no topo e com a narrativa na base, e escurecimento à esquerda para o título. Altura mínima 560px.
- Retrato sem moldura interna: passou para a coluna direita e sobe 240px para dentro da faixa (180px no tablet, 48px no celular), 4:5, sombra profunda e legenda “Foto Carol” sobre a base da foto. Título da faixa limitado à largura da primeira coluna para nunca encostar no retrato (medido pelos retângulos reais das linhas: folga ≥ 40px de 761 a 1440px).
- Números: divisórias verticais, valor em creme com traço turquesa acima, rótulo em caixa alta via CSS. Frase de abertura maior (até 2rem, 22ch) e citação com filete superior em vez da barra lateral.
- Validado em 1440, 1024, 1000, 900, 768, 761, 375 e 320px: sem overflow, fotos carregadas, sem erros de console.
- Compactação de `#carol` a pedido do usuário: os três `.auth` saíram do bloco de texto e passaram para dentro da faixa, logo abaixo do título (mesma copy, mesma ordem, aparecem uma vez), com filete superior e largura limitada à primeira coluna. Faixa 560→480px de altura mínima, duotone um pouco mais escuro (opacidade .52), retrato `position:sticky` (top 96px) acompanhando o texto no desktop/tablet, espaçamentos da narrativa e da citação reduzidos. Seção em 1345px: 1321→1054px; vão sob o retrato 393→173px.
- Faixa no celular (até 760px), a pedido do usuário para dar respiro à foto: título e números descem (`padding-top` 150→260px), imagem com `height:115%;top:-15%` e, só no celular, degradê de baixo para cima no lugar do escurecimento lateral. Em 375px: rostos da turma entre 57 e 222px da faixa, título começa em 282px; faixa com 553px. Conferido em 375, 320 e 600px, sem overflow, sobreposição do retrato com os números ou erros de console.
- Citação no celular: removido o `padding-left:20px` herdado da versão com barra lateral, que deslocava o texto em relação ao filete; agora alinhada, 1.3125rem. Validado em 1440, 1345, 1000, 900, 768, 375 e 320px, sem overflow, sobreposição entre retrato e título/números ou erros de console.
- Sétimo critério igualado aos demais a pedido do usuário (sem Fraunces, sem check preenchido, sem faixa própria). Grade de 6 colunas em 2 · 3 · 2 acima de 760px; de 481 a 760px, duas colunas com o sétimo na largura toda; até 480px, uma coluna. Conferido em 1440, 900, 600 e 375px, sem overflow nem erros.

## Público, fotografias e autoridade — versão visual, 11/09/2026

- O usuário esclareceu que deseja mais imagens e menos sensação de textos espalhados. Indicou o preview do Claude com fotografia de equipe no fundo e propôs mover para a Carol os resultados que ficavam abaixo da hero. Essa mudança de posição foi autorizada; nenhum número ou rótulo foi alterado.
- `#para-quem`: título acima de uma grade de seis critérios (três colunas no desktop, duas em telas intermediárias, uma no celular estreito); sétimo critério fecha a grade com destaque em Fraunces. Todas as palavras preservadas.
- A apresentação agora é uma seção própria, `#carol`: fotografia da equipe em toda a largura, com tratamento de cinza e sobreposição marinho via CSS, título sobre a área inferior e transição para o fundo. Abaixo, retrato da Carol à esquerda e os resultados, narrativa e citação agrupados à direita. No mobile, sequência em uma coluna e recorte específico do banner.
- Fotografias já existentes no projeto: `assets/hero-equipe.webp` (1024×683, cerca de 82 KB) e `assets/Foto-427-683x1024.webp` (683×1024, cerca de 62 KB). Sem imagens geradas ou novos arquivos raster. `carol-retrato.jpg` foi substituída na apresentação, mas permanece no projeto.
- Os três `.auth` foram transferidos integralmente da antiga `.trust` para `#carol .auth-cards`. A faixa abaixo da hero foi removida; os resultados aparecem uma única vez. Legenda “Foto Carol”, narrativa e citação preservadas.
- Estilos anteriores às regras específicas dessa seção permanecem idênticos ao snapshot. Evidências em `audit-visual/mentor-visual/`: antes/depois, estilos e validação. Conferidas larguras 1440, 900, 768, 600, 375 e 320; recorte final repetido nas três larguras menores. Sem overflow, erros JavaScript ou recursos locais ausentes. Comparação de todas as palavras considerando a mudança autorizada de ordem, parágrafos, critérios e números exatos. As duas fotos carregam e movimento reduzido está preservado.
- As versões em `mentor-editorial/` e `audience-mentor/` passam a ser históricas. Os scripts `implement.py`/`refine.py` são registros de transformação, não comandos para reaplicar sobre a página pronta.

## Carol — refinamento editorial após novas referências, 11/09/2026

- O usuário considerou a primeira atualização melhor, mas ainda abaixo da qualidade desejada. Enviou três screenshots da apresentação de Marcelo Anders como contexto visual, sem pedir cópia da identidade ou do conteúdo.
- Substituído o painel externo arredondado por composição aberta: título amplo acima, fotografia independente à esquerda e painel de narrativa à direita, com filete turquesa. A legenda da foto fica abaixo da imagem. A primeira frase existente recebe destaque tipográfico e a citação fecha o painel após uma divisória fina.
- O público continua com título lateral e sete critérios; a conexão com a apresentação da Carol ganhou uma divisória e espaçamento próprio. No mobile, título da mentora antes da foto, seguido do painel narrativo. Fontes, cores e todas as palavras preservadas.
- CSS anterior de `#para-quem` atualizado no próprio bloco. HTML ganhou `.carol-manifesto` e `.carol-opening`; nenhuma dependência ou imagem nova.
- `audit-visual/mentor-editorial/`: backup da versão anterior, estilos, capturas e validação em 1440, 768, 375 e 320 px. Comparação integral de copy, sete critérios, ausência de overflow e erros JS/recursos locais; movimento reduzido e capas da seção anterior conferidos. As capturas em `audience-mentor/` passam a ser históricas.

## Público e mentora — composição de 11/09/2026

- `#para-quem`: título à esquerda e lista contínua dos sete critérios à direita; último critério com destaque discreto. Mobile em coluna única.
- Foto da Carol ocupa a lateral do painel, narrativa à direita e frase final em faixa na base. No celular, fotografia 5:4 antes da narrativa. Imagem original preservada, enquadrada via CSS.
- Copy integral preservada, assim como as capas fotográficas atuais de `#como-funciona`. Estilos restritos à seção; parágrafos agrupados em `.carol-body`.
- Evidências em `audit-visual/audience-mentor/`: snapshot, estilos, capturas e verificação em 1440, 768, 375 e 320 px, sem overflow horizontal, erros JavaScript ou falhas de recursos locais. Conferidos sete critérios, igualdade de copy e movimento reduzido.

## Capas fotográficas de “Como funciona” — 10/09/2026

- Os dois cards de `#como-funciona` passaram a usar capas geradas no ChatGPT, com a foto da Carol como referência: estilo colagem editorial (P&B com retícula, grade fina, neon turquesa), inspirado nos cards de bônus de `https://claude-economy.vercel.app/`.
- Card 1: `assets/images/how-aulas.webp` (Carol em roupa privativa num tablet, com outras telas de aula). Card 2: `assets/images/how-encontro.webp` (mapa dobrado com ECG passando por 6 cadeados idênticos e ponto verde-menta; Carol numa tela ao vivo). Nenhum conteúdo dos passos é revelado.
- WebP 1672×941 (200 KB e 211 KB) e versões de 900 px (40 KB e 69 KB), servidas via `srcset`. Os PNGs originais (`Card 1.png`, `Card 2.png`) foram enviados para a Lixeira do Windows.
- CSS: `.how-art` sem margem superior (capa encosta no topo do card), imagem em `aspect-ratio:16/9` com `object-fit:cover` e máscara que dissolve os últimos 28% no fundo do card. Removido o `max-height:240px` do mobile.
- A seção de Oferta continua usando `how-preparation.svg` e `how-live-map.svg`.
- Validado em 1440 e 375 px: imagens carregadas, 16:9, cards com a mesma altura, sem overflow e sem erros de console.
- Prompts e brief em `human-output/image/gancho-como-funciona/`.
- Retoque premium seguindo os cards de bônus da referência, sem copy nova nem fontes novas: raio dos cards 24→16 px (14 px no mobile), capa com sobreposição em degradê para `--bg-2` (substitui a máscara e reduz o vão até o título), zoom de 3% na capa ao passar o mouse (desligado com movimento reduzido), títulos em peso 600, e rodapé dos cards convertido em etiqueta com borda e fundo suave (turquesa; verde-menta para “Acesso imediato”), em caixa alta via CSS. Validado em 1440, 768 e 375 px: cards com a mesma altura, etiquetas alinhadas, sem overflow nem erros de console.
- Capas mais altas no celular (11/09/2026, a pedido do usuário, sem mudar os textos): até 560 px a capa usa `aspect-ratio:4/3` (325×244 em 375 px, antes 325×183), com enquadramento por card (`object-position` 45% no card 1 e 75% no card 2, para manter a tela da Carol e o mapa), degradê só nos últimos 28% e 8 px até o título. Entre 561 e 760 px segue 16:9. Validado em 375, 320 e 600 px, sem overflow nem erros de console.

## Acabamento geral da página — 10/09/2026

- Refino aplicado em `index.html`, concentrado na apresentação da Carol, depoimentos, oferta, FAQ e encerramento. Hero, diagnóstico, mapa e composição de “Como funciona” preservados.
- Tokens de ritmo e leitura: `--section-space`, `--section-title` e `--copy-readable`. Mais consistência entre tamanhos de títulos, contraste do corpo, bordas e espaçamentos.
- Depoimentos alinhados ao container da página, com tratamento mais simples dos cards e destaque tipográfico para Aline; carrossel e placeholders preservados.
- Oferta reutiliza as duas ilustrações de “Como funciona”; botão do checkout voltou ao mesmo raio arredondado de 100px dos demais. Ajustados alinhamentos, preço e apresentação da garantia, sem alterar valores ou condições.
- FAQ em duas colunas no desktop (título à esquerda, perguntas à direita), com divisórias finas e controles nativos de abertura. Mobile em coluna única. Encerramento ganhou largura de leitura e quebras de título mais equilibradas.
- Remoções anteriores solicitadas pelo usuário preservadas: sem “O Mapa dos 6 Passos” acima do título do mapa e sem “Como funciona”/“Card 01”/“Card 02” na seção das aulas.
- `audit-visual/page-polish/`: backup, estilos, capturas antes/depois e `validation.json`. Conteúdo integral comparado, sem overflow ou erros JS/recursos locais em 320, 375, 768 e 1440 px. Conferidos FAQ por teclado, foco, movimento reduzido e CTA. Checkout, vídeos, depoimentos pendentes e resposta sobre gravação continuam com os placeholders existentes.

## Refinamento de “Como funciona” — 10/09/2026

- Seção aplicada no `index.html`, agora com âncora `#como-funciona`. Referência `https://claude-economy.vercel.app/` consultada no Chrome: aproveitada a ideia de capas visuais grandes e hierarquia entre título e descrição, mantendo a identidade da LP.
- Dois cards com ilustrações próprias em SVG: `assets/images/how-preparation.svg` (três aulas) e `assets/images/how-live-map.svg` (mapa com seis pontos, sem revelar conteúdo dos passos). Imagens decorativas, com dimensões explícitas e carregamento lazy; não são vídeos clicáveis nem capturas do curso.
- Título da seção alinhado à esquerda, títulos dos cards ampliados, textos com mais contraste, acesso/data alinhados no rodapé dos cards e botão com o estilo compartilhado preservado. Dois cards no desktop/tablet; uma coluna até 760 px. Retirados a faixa em gradiente e o deslocamento dos cards no hover.
- Conteúdo integral preservado. `audit-visual/how-refinement/validation.json`: verificação de copy, overflow horizontal, erros JS, recursos locais, foco do CTA, navegação para oferta e movimento reduzido; capturas antes/depois em desktop e mobile, além de captura final do tablet. Backup anterior em `before.html` no mesmo diretório.

## Alternativas do mapa para comparação — 10/09/2026

- **Estado mais recente da página principal:** painel integrado refinado a pedido do usuário. Título centralizado em largura ampla no desktop, frase introdutória logo abaixo, mapa sem faixas ou divisórias horizontais, curvas topográficas restritas ao percurso. Reflexões e perguntas ficam abaixo em duas colunas; aviso e botão encerram o painel. No mobile, título alinhado à esquerda, percurso vertical e textos empilhados. Nenhuma palavra alterada; fontes, paleta e botão preservados. CSS anterior do painel substituído em `index.html`, sem nova camada duplicada. Capturas e validação em `audit-visual/map-polished/` (1440, 768 e 375 px, sem overflow, erros JS ou recursos locais ausentes; seis nós, entrada dos textos, foco, CTA e movimento reduzido conferidos). Previews anteriores permanecem como histórico de comparação.
- Segundo refinamento tipográfico do preview lateral: destaque itálico do título em linha própria; “6 passos” sem quebra interna; largura de leitura dos parágrafos limitada a 48ch; frase “Ao final…” separada visualmente do parágrafo e perguntas em Bricolage, com hierarquia mais clara. Copy integral mantida, capturas e validação responsiva atualizadas. `index.html` continua com o painel integrado.
- Refinamento posterior da alternativa lateral: intervalos regulares entre título, reflexão e perguntas; frases de reflexão em blocos separados, sem mudar nenhuma palavra; aviso e CTA na coluna de leitura. No mobile, título e reflexão antecedem o mapa. Apenas `audit-visual/map-options/lateral.html` e seu CSS foram ajustados; o painel integrado segue na página principal. Capturas do comparador atualizadas e validação em `lateral-spacing-validation.json` (1440, 768 e 375 px, sem overflow, copy preservada, CTA e movimento reduzido conferidos).
- O usuário escolheu o **painel integrado**, agora aplicado em `index.html`. Os previews permanecem como registro das alternativas.
- Implementação restrita ao CSS de `#mapa` e às classes de entrada dos blocos de texto; conteúdo, fontes, paleta e botão preservados. Fundo topográfico referenciado por caminho relativo para manter compatibilidade com hospedagem em subdiretório.
- Validação da implementação: `audit-visual/map-implemented/validation.json` e capturas desktop/mobile/tablet no mesmo diretório. Layout comparado ao preview aprovado em 1440, 768 e 375 px; textos idênticos, seis nós, sem overflow, erros JS ou recursos locais ausentes; entrada dos blocos, movimento reduzido, foco e navegação do CTA conferidos.
- Comparador: `http://localhost:5501/audit-visual/map-options/`, com versão atual, mapa lateral e painel integrado; permite alternar capturas desktop/mobile e abrir cada página completa.
- `audit-visual/map-options/lateral.html`: mapa vertical à direita dos textos no desktop; sequência vertical no mobile.
- `audit-visual/map-options/integrated.html`: título, reflexão, percurso e fechamento dentro de um painel único. No mobile, a introdução antecede o mapa.
- Estilos das alternativas em `lateral.css` e `integrated.css` no mesmo diretório. `build.cjs` gera os previews a partir da página atual, sem editar o arquivo principal.
- Referências Human Academy e Dever de Prosperar consultadas visualmente, sem copiar textos, imagens ou paletas dessas páginas.
- `validation.json`: ambas verificadas em 1440, 768 e 375 px; sem overflow horizontal, erros de JavaScript ou recursos locais ausentes. Copy integral comparada à principal, seis nós preservados, foco do botão e navegação para oferta conferidos, assim como movimento reduzido. Capturas no mesmo diretório.

## O que é
Landing page de captura para o evento **Gancho da Virada** (Caroline), voltada a instrumentadores cirúrgicos recém-formados. Mecanismo central: o **Mapa dos 6 Passos** entre a formação e a primeira oportunidade (os 6 passos NUNCA são revelados fora do encontro ao vivo).

## Arquivos
- `index.html` — a landing page estática, com CSS e JavaScript locais no mesmo arquivo; fontes externas via Google Fonts e imagens em `assets/`.
- `docs/brand-guide.md` — **manual da marca** (fonte da verdade de copy e paleta). Seção 15 = identidade visual.
- `docs/project-status.md` — este arquivo.

## Paleta oficial (do manual, seção 15) — JÁ APLICADA
- Navy institucional `#1D2864`; fundo navy profundo `#080C22`.
- Turquesa (primária/CTA) `#2AD2C1`; variações `--mint-bright #45E4D3`, `--mint-deep #1AA99B`.
- Verde-menta "avanço/virada" `#00FB8A` (usar SÓ em sinais de sucesso: destino do mapa, "acesso imediato", etc.).
- Cinza-ardósia `#6F7F90` (texto de apoio). Branco/gelo para seções claras.
- Gradiente do mapa (ciano→verde): `#24B7D3 → #30EFAD`.
- Em seções claras, turquesa vira `--teal-ink #0C7D6F` para ter contraste como texto.

## Fontes (Google Fonts)
- Display/títulos: **Bricolage Grotesque**
- Destaques emocionais em itálico: **Fraunces**
- Corpo: **Hanken Grotesk**
(O manual marca tipografia como [PREENCHER] — se a marca definir fontes oficiais, trocar.)

## Estrutura (8 blocos, na ordem do briefing)
1. Hero + vídeo  2. A Dor (cards de pergunta)  3. Mapa dos 6 Passos (linha de ECG com 6 nós travados 🔒)  4. Como Funciona (2 cards)  5. Para quem é + Carol (checklist + bio + 3 cards de autoridade: 9 anos / 10k alunos / 20k cirurgias)  6. Depoimentos (carrossel; Aline em destaque + disclaimer)  7. Oferta (De R$297 por R$47) + garantia 7 dias  8. FAQ (accordion) + CTA final.

## Decisões de design já tomadas
- **Ritmo dark↔light**: bloco CSS "Ritmo de fundos por seção" (perto da linha ~556) define o fundo de CADA seção. Seções CLARAS (classe `.light`): **Mapa (gelo)**, **Para quem é/Carol (branco)**, **Oferta (gelo)**. As demais são escuras. O tema `.light` redefine as variáveis da marca para versão clara.
- **Assinatura visual**: Mapa dos 6 Passos = linha de ECG/monitor (ciano→verde) ligando FORMAÇÃO → 6 nós travados → PRIMEIRA OPORTUNIDADE. Sem revelar os nomes dos passos.
- **Hero (estado atual)**: texto à esquerda sobre a imagem `assets/images/Image - Hero.png` no desktop. No mobile, o texto e o primeiro CTA precedem a imagem, que reutiliza o mesmo arquivo com enquadramento por CSS. O destaque "centro cirúrgico" mantém itálico, turquesa e sublinhado contínuo. Vídeo abaixo, ainda como placeholder.

## Revisão visual 1 — setembro/2026

- Aplicada a parte visual de `Ajuste LP - rev1.md`. A instrução direta do usuário exige preservar todos os textos: não foi aplicada a nova data, a retirada do subtítulo do CTA, a troca de depoimentos ou qualquer outra alteração de copy.
- Letreiro verde, entradas discretas com `IntersectionObserver` e respeito a `prefers-reduced-motion`, incluindo pausa das animações SVG.
- Fotos `photo3`, `photo2` e o retrato indicado da Carol obtidos no banco público fornecido. Arquivos locais: `dor-formacao.jpg`, `dor-perguntas.png`, `carol-retrato.jpg`. Legendas existentes foram preservadas por exigência de manter os textos.
- Mapa com fundo vetorial `journey-map.svg`, percurso em ECG e seis nós travados. No celular, origem, percurso vertical e destino ficam em sequência.
- Oferta organizada em três cards com ilustrações SVG, painel de preço/inscrição e garantia com selo em formato de escudo. Valores e descrições preservados.
- O próprio CTA do hero fica fixo no celular depois que sua posição original sai da tela. Volta ao lugar ao subir e fica recolhido quando outro CTA ou o painel de inscrição está visível, evitando sobreposição. Não há duplicação de texto.
- O CTA fixo usa o endereço do botão `#checkout-link` quando houver checkout real. Enquanto esse botão continuar com `href="#"`, o CTA fixo leva a `#oferta`.
- Registros visuais, cópia anterior e verificação da igualdade dos textos em `audit-visual/rev1/`.

### Refinamento da hero — setembro/2026

- Destaque turquesa e itálico concentrado em "centro cirúrgico"; os parágrafos usam cor uniforme e marcas internas sem negrito adicional. Textos integrais preservados.
- Parágrafos com mais contraste e tamanho de 17 px no desktop e 16 px no mobile/tablet. Identificação do público com espaçamento entre letras reduzido e quebras equilibradas. Grupos de texto e CTA com espaçamento revisado.
- Botão da hero usa novamente a classe compartilhada `.btn`, com degradê turquesa, formato arredondado, sombra e tipografia do padrão existente. Estilo exclusivo `.hero-action` removido a pedido do usuário para padronizar. Espaçamento da hero e comportamento fixo no mobile preservados.
- Entre 561 e 960 px, a coluna de texto fica limitada a 60% da largura disponível para evitar sobreposição ao rosto na foto.
- Fundo, imagem e seus estilos CSS preservados. Validação em 1440, 768 e 375 px: textos idênticos ao estado anterior, sem overflow ou erros de JavaScript. Conferidos foco de teclado, movimento reduzido, navegação para a oferta e recolhimento do CTA fixo diante do painel de inscrição. Capturas e relatórios em `audit-visual/hero-refinement/`.

### Refinamento do mapa — setembro/2026

- Seção `#mapa` reorganizada com título alinhado à esquerda, mapa em destaque, explicação em dois blocos e faixa final reunindo aviso de sigilo e CTA. No mobile, a leitura segue em uma coluna e o percurso permanece vertical.
- Novo fundo vetorial local `assets/images/map-contours.svg`: curvas de nível e grade cartográfica discretas sobre navy, substituindo o visual de papel dobrado claro. Não depende de bibliotecas ou imagens externas.
- Percurso em ECG preservado, com seis números centrais e pequenos cadeados. Todos os textos foram mantidos, sem revelar nomes ou conteúdo dos passos. Os parágrafos têm tratamento mais uniforme, e o botão usa o estilo compartilhado `.btn`.
- CSS restrito a `#mapa`. Validação em 1440, 768 e 375 px: seis pontos, igualdade dos textos da página, ausência de overflow e de erros de JavaScript, movimento reduzido, foco de teclado e CTA para `#oferta`. Capturas e relatórios em `audit-visual/map-refinement/`.

### Refinamento da seção de público e Carol

- A seção `.sec-who` passou a ter duas composições em sequência: título e checklist em duas colunas no desktop; abaixo, painel navy com retrato à esquerda, biografia à direita e faixa de autoridade na base.
- No mobile, checklist e apresentação se empilham. Os três números de autoridade ficam alinhados na mesma faixa, sem cards individuais.
- Textos, valores, fontes e fotografia preservados. Títulos da seção agora usam `h2`, com destaque itálico em partes do texto existente.
- Estilos restritos a `.sec-who`; registros da comparação em `audit-visual/section-carol/`.

### Refinamento do bloco de perguntas

- `.pain-diagnostic` usa o navy `--surface`, perguntas sobre `--bg-2`, textos claros e destaques turquesa, integrado à paleta escura da página. Chamada, cinco perguntas e conclusão ficam reunidas na coluna esquerda. Implementação atual em `index.html`, âncora `#diagnostico`.
- A coluna direita ocupa aproximadamente 45% do painel e contém `assets/images/dor-portas-recorte.png`, restaurada a pedido do usuário após avaliar a versão v2 no mobile. O fundo da mídia usa o mesmo `--surface` da área de texto, sem divisória vertical ou horizontal. Enquadramento central; versões alternativas continuam em `assets/`.
- Até 760 px, o painel ocupa toda a largura da tela, compensando as margens de `.wrap`. A imagem aparece primeiro, centralizada e inteira com `object-fit:contain`, numa área de altura `clamp(280px,96vw,380px)` (360 px em uma tela de 375 px). Abaixo ficam chamada, perguntas e conclusão, com 24 px de margem interna. Desktop preservado: texto à esquerda e imagem à direita.
- No mobile, o conteúdo sobe 72 px para o título se sobrepor à parte inferior do corpo (24 px mais abaixo que a versão anterior, a pedido do usuário). Uma máscara CSS dissolve os últimos 38% da imagem no fundo navy, sem blur, mantendo o corte do corpo suavizado mesmo com o título mais baixo. Rosto, portas, margem horizontal e todos os textos são preservados.
- Acima de 760 px, restaurado o enquadramento anterior à ampliação a pedido do usuário: `inset:20px 16px -24px 0`, máscara vertical de 64% a 92% e máscara radial no canto inferior esquerdo para suavizar a borda do ombro. Mobile preservado.
- As versões anteriores sem fotografia continuam disponíveis para comparação em `audit-visual/section-pain/option-integrated.html` e `audit-visual/section-pain/option-minimal.html`.
- CSS desse bloco consolidado, preservando o restante do design atual, todos os textos, fontes e paleta.
- Destaque tipográfico concentrado no título: o fechamento usa apenas a cor clara `--cream` e peso regular 400, sem trecho turquesa ou negrito. Perguntas, subcards, espaçamentos e estrutura preservados.
- Validado no navegador em 1440, 768 e 375 px: textos idênticos, cinco perguntas, sem overflow ou erros de JavaScript. Em 375 px, painel de x=0 a x=375, texto de x=24 a x=351 e imagem com 375 px de largura. Movimento reduzido preservado. Capturas atuais com o recorte transparente `fullwidth-*.png` e relatório `fullwidth-validation.json` em `audit-visual/section-pain/`; estado anterior em `cutout-before-*.png`.

## Revisão visual 2 — setembro/2026 (auditoria + alinhamento ao Design System de referência)

Referência usada: `D:\Meus Documentos\Downloads\DesignSystem - RM\index.html`. O `ds.html` daquela pasta é de outro projeto (marrom/dourado) e não se aplica.

### Auditoria de código (diagnóstico, medido no navegador)

- **35 tamanhos de fonte** distintos no desktop e 32 no mobile; nove valores entre 15,2 e 17,9px; quatro tamanhos diferentes de `h2`; `h4` maior que `h3`.
- **208 valores de cor fora dos tokens** (93 hex + 115 rgba). `rgba(42,210,193,…)` repetido 63 vezes. `--blue`, `--map-cyan` e `--map-green` definidos e nunca usados.
- **40 valores de espaçamento distintos.** Os tokens `--space-1..6` existiam com apenas 5 usos em ~150 declarações.
- **Duas camadas de CSS empilhadas**, com um segundo `:root` e **50 seletores redefinidos** nas duas.
- CSS morto encontrado: `.aurora`, `drift1-3`, `shine`, `ctapulse`, `.band-map`, `.band-offer`, `.btn-ghost`, `.split`, `.lead`, `.qm`.
- Página em 4,4 MB, sendo 4,1 MB de imagem, com os mesmos bytes servidos ao mobile.

**Três prioridades apontadas — as três seguem em aberto:** escala tipográfica (complexidade média), peso de imagem (baixa), adoção dos tokens + fusão das duas camadas de CSS (média-alta).

### Ritmo de fundos: fim do dark↔light

A referência usa a **mesma paleta**, porém toda escura. O ritmo passou a ser base `--bg #080C22` alternando com faixa `--bg-2 #0C1236` + `border-block:1px solid var(--line)`.

- As três seções claras (Mapa, Para quem é/Carol, Oferta) foram convertidas. A classe `.light` foi **mantida como gancho estrutural** — `.light .offer-box` define layout, não só cor — mas com os tokens reescritos para valores escuros, mais ~20 regras `.light .xxx` que tinham branco fixo.
- O painel branco da seção da dor virou navy.
- Isso substitui a decisão anterior de "ritmo dark↔light" registrada acima.

### Botão e faixa de autoridade

- `.btn` substituído pelo padrão `.btn + .btn-primary + .btn-lg` da referência: pill, gradiente mint, uppercase, `padding:20px 36px`, `min-height:60px`, transição `.16s`. Os `<small>` foram removidos dos três botões que os tinham.
- A faixa **9 anos / 10k / 20k** saiu de dentro do card da Carol e virou `<section class="trust">` logo abaixo do hero, no padrão `.trust` da referência. **A divisão da copy foi preservada** — não adotei o "10k alunos / direcionados" da referência para não criar texto novo.

### Bloco do conceito (seção da dor) — composição do orbe

- Foto da esquerda removida; layout passou a ser centrado, com orbe em cima e título embaixo.
- Orbe tokenizado: `--orb: min(420px,76vw)` no desktop e `min(320px,78vw)` no mobile. O recuo do título é derivado dele (`calc(var(--orb) * -.3)`), o que mantém o título a **~72% da altura do círculo** proporcionalmente nos dois breakpoints.
- Título sem `<br>`; o `.serif` fica em `display:block`, então a virada turquesa sempre começa em linha nova; `max-width:26ch`.
- Espaço entre a linha de ECG e o orbe: 74px no desktop, 54px no mobile.
- **Imagem:** `Image_1.png` → `assets/images/dor-limiar.webp` (900×900, 25 KB). Deslocada −90px (corte no topo e piso escuro estendido embaixo), com curva de gama 0,78 e saturação +18%. É esse levantamento tonal que faz a imagem separar do fundo — não há brilho externo.
- **Borda:** arco estático em `conic-gradient` turquesa 62%, visível de 0–108° e 252–360°, recortado em anel de 2px. As pontas caem exatamente na altura em que o título começa.
- **Luz animada:** `.orb-arc` com núcleo quase branco e anel mais largo que o fio estático. `@keyframes orbArc{from:rotate(201.5deg) to:rotate(434.5deg)}` percorre só os 233° do arco visível e reentra pela esquerda sem intervalo. Ciclo de 4,2s.
- **Pulso do ECG acima do orbe foi removido** (o `<circle>` com `animateMotion`), junto de duas regras órfãs. A linha permanece e ainda se desenha na entrada. Motivo: competia com o arco a 74px de distância. O pulso do Mapa foi mantido, porque ali a linha é a própria metáfora da jornada.

### Bloco de perguntas

Implementei uma versão sem caixas (perguntas separadas por fios, painel sem borda, véu de degradê na imagem, padding 48px). **Essa versão foi substituída por edições de outra frente de trabalho** e não está mais no arquivo. O estado atual é o descrito na seção "Refinamento do bloco de perguntas" acima.

`assets/images/dor-observando.webp` (900×1125, 38 KB, nuca e ombro com o centro cirúrgico desfocado) foi produzida para esse slot e **ficou órfã** quando a colagem de portas entrou no lugar.

### Estado verificado (10/09/2026)

| Item | Valor |
|---|---|
| Peso da página | 4054 KB |
| Overflow horizontal | Nenhum, de 320px a 1920px |
| Erros de JavaScript | Zero |
| 404s | Nenhum |
| Loops infinitos | `.ecg-track` 3,4s · `.orb-arc` 4,2s · `.marquee` 32s |
| `prefers-reduced-motion` | Global, desligando todas as animações |

### Pendências abertas por esta revisão

- **`dor-portas-recorte.png` pesa 1,92 MB** e é hoje o maior arquivo da página. Substituiu uma WebP de 38 KB no mesmo slot. Converter para WebP recupera praticamente toda a economia de peso que a revisão havia conseguido (a página tinha chegado a 2168 KB).
- **`Image - Hero.png` (1,64 MB)** continua em PNG e é servida como `background` CSS, o que impede `srcset` e controle de prioridade do LCP.
- **Órfãos no disco:** `dor-observando.webp`, `dor-formacao.jpg`, `dor-perguntas.png`, `dor-portas1.png`, `dor-portas2.png`, `dor-portas-recorte-v2.png`.
- As três prioridades da auditoria (escala tipográfica, tokens, fusão das camadas de CSS).

### Convenções estabelecidas

**Imagens do slot lateral do painel:** 4:5, mínimo 900×1125, **terço esquerdo escuro** (é o lado que encosta na coluna de texto), paleta navy/turquesa sem cores quentes, sem texto nem logo. Sempre converter para WebP.

**Prompts de IA:** escrever a posição no quadro e o requisito do terço escuro em maiúsculas dentro do prompt principal, porque os modelos ignoram instrução de composição. No negativo, incluir sempre `warm colours, orange, beige` — os modelos copiam a paleta junto com o estilo quando se dá uma referência.

**Verificação antes de concluir:** Playwright (`%TEMP%/gancho-validation/node_modules/playwright-core` + Chrome do sistema), checando overflow em 15 larguras de 320 a 1920px, erros de JavaScript, `.reveal` recebendo `.in-view`, contraste WCAG e `prefers-reduced-motion`.

## Placeholders a preencher

- Vídeo principal (`<!-- INSERIR VÍDEO PRINCIPAL -->` no hero).
- Vídeo do YouTube: o documento informa que ainda será publicado; inserir quando houver URL real.
- Link do checkout (botão da oferta está com `href="#"`).
- Depoimentos reais (3 cards genéricos + card da Aline).
- FAQ "O encontro ficará gravado?" = `[DEFINIR RESPOSTA]`.
- Parcelamento (hoje "em até 12x no cartão" — ajustar à plataforma).
- Notificação de compra: pendente de fonte real de compras e autorização da copy; nenhuma notificação fictícia foi inserida.

## Preferências do usuário (IMPORTANTES)
- **NÃO adicionar copy/dados/claims fora do escopo do briefing sem confirmar antes.** Só melhorias visuais são livres. (Já removeu uma faixa de números que foi adicionada por conta própria.)
- **Evitar "cara de IA"**: sem gradientes de texto multicolor, sem brilhos de aurora, sem "status dot" pulsante em pill. Prefere destaques em **cor sólida** e sublinhado **contínuo** (não tracejado).
- Números de autoridade são reais: 9 anos, ~10k alunos direcionados, ~20k cirurgias. Não inventar métricas.

## Notas técnicas / cuidados
- **NÃO** embutir imagens como data URI gigante no HTML (uma foto de fundo chegou a inflar o arquivo para 172KB numa linha só). Referenciar arquivos externos de imagem.
- Overflow horizontal no mobile já corrigido (era o `.rail-wrap` dos depoimentos com margem negativa). Sempre checar `document.documentElement.scrollWidth === clientWidth` a 375px.
- O preview via `file://` renderiza como **snapshot estático** (não rola). Para checar seções, use JS (`getComputedStyle`, forçar `.reveal.in-view`) ou abra num navegador real.
- Animações de entrada usam classe `.reveal` + IntersectionObserver (adicionam `.in-view`).
- Data de referência do trabalho: agosto/2026. Evento: 24 de setembro, 20h, online e ao vivo.
