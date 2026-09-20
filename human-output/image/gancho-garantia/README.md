# Selo de garantia — substitui a medalha atual

A seção de garantia usa hoje um SVG: um "7" em Fraunces sobre disco turquesa, com o texto circular "7 dias de garantia · " girando em volta (28s). A imagem gerada entra no lugar dessa medalha.

## Regras

- **Proporção 1:1.** Gerar o maior possível; eu salvo em 640×640 e 320×320 WebP.
- **Fundo azul-marinho liso (#080C22)**, o mesmo da seção, para a peça se fundir ao certificado. Se o gerador entregar fundo transparente (PNG), melhor ainda.
- **Sem nenhum texto**, a não ser o número 7 em relevo. Letras geradas por IA saem tortas, e o "7 dias de garantia" já está escrito na página, no título e no parágrafo.
- **Só turquesa (#2AD2C1) e metal escuro.** Sem dourado nem prateado brilhante: a página não tem essas cores.

## Depois de gerar

1. Salvar em `assets/images/` como `garantia-selo.webp` (e `-320`).
2. No `index.html`, trocar o bloco `.gcert-medal` (o SVG `gcert-ring` mais o `span.gcert-num`) pela imagem.
3. Decidir sobre o movimento: hoje o texto circular gira. Com a imagem, dá para
   - deixar o selo parado (mais sóbrio),
   - manter um anel fino girando por trás dele, preservando o movimento atual, ou
   - fazer o selo aparecer com um leve giro e parar, quando entra na tela.

O texto da garantia e as condições de 7 dias não mudam.
