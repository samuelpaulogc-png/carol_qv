# Capas dos 3 cards de bônus — oferta

Para os cards criados em 19/09/2026 na seção "Entre para o Gancho da Virada".

## Padrão visual (o mesmo de `how-aulas.webp`, `how-encontro.webp` e `oferta-bonus.webp`)

- Fundo: centro cirúrgico em preto e branco, escuro, desfocado, sobre navy quase preto (#080C22).
- Objetos flutuando num espaço escuro, cada um com contorno fino de neon turquesa (#2AD2C1).
- Malha de grade fina ao fundo, como uma planta técnica, bem discreta.
- Elementos de interface simples: botão de play, quadradinhos de check, barra de progresso, ícone de download. Sem texto legível.
- Luz do foco cirúrgico ao fundo, fora de foco, como fonte de luz.
- Só o turquesa tem cor. Nada de verde-menta, nada de outras cores.

## Regras de enquadramento (por causa do card)

- Proporção 16:9. Gerar o maior possível e salvar em 1672×941 e 900×506.
- O canto superior esquerdo leva a etiqueta 01/02/03 da página: deixar essa área limpa, sem elemento importante.
- A base da imagem se dissolve no card: manter o assunto no terço superior e no meio, e deixar a parte de baixo mais escura e vazia.
- Sem texto, sem letras, sem números, sem logotipos. Sem marca d'água.

## Como usar

1. Gerar no ChatGPT com os prompts desta pasta (`01-vlog.txt`, `02-ebook.txt`, `03-mapa.txt`).
2. Para o bônus 01, anexar uma foto da Carol como referência de rosto, como foi feito nas capas de "Como funciona". Se preferir não usar o rosto, o prompt tem a variação sem pessoa identificável.
3. Salvar em `assets/images/` como `bonus-vlog.webp`, `bonus-ebook.webp`, `bonus-mapa.webp` (e as versões `-900.webp`).
4. No `index.html`, trocar cada `<span class="ovb-slot">` pelo `<img>` do comentário que está no próprio HTML.

`assets/images/oferta-bonus.webp` (a capa antiga do bloco de bônus) ficou sem uso e pode servir de referência de estilo.
