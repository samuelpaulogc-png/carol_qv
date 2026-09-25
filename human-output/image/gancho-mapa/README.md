# Fundo do card do mapa (`#mapa`)

O card “Existe um caminho entre onde você está e onde quer chegar” tem, desde 24/09, uma imagem por baixo do vidro navy translúcido (em teste: a serra noturna cobrindo o card inteiro). O usuário pediu opções de imagem ou de ícone, como na referência dele: dois objetos 3D grandes nos lados, um preso por correntes e outro aceso, bem apagados atrás do título.

## Opções

1. `01-marcadores-travado-livre.txt` (recomendada): dois marcadores de mapa em 3D. À esquerda, apagado e preso por correntes (“onde você está”, travado); à direita, livre e aceso em turquesa (“onde quer chegar”). Conversa com o título e com a frase “travado justamente no ponto que está impedindo você de avançar”. Variação possível: trocar os marcadores por bússolas.
2. `02-trilha-na-serra.txt`: a serra noturna atual, agora com uma trilha de luz turquesa subindo até um topo aceso. Continua o fundo de hoje, com uma história.
3. `03-carta-navy-lupa.txt`: pedida pelo usuário a partir de referências de mapas antigos (rosa dos ventos, rotas) e de lupa sobre mapa. Carta de navegação em navy, estilo cianotipia, com território imaginário; lupa à esquerda sobre o ponto “você está aqui”; rosa dos ventos à direita, com a agulha apontando para a direita. Sem rota desenhada: o percurso é a linha de batimento da página. Diferente do bônus 03, que é um mapa de papel dobrado, com trilha pontilhada.

## Regras

- **16:9, o maior possível.** Eu salvo em WebP.
- **Centro vazio e escuro.** O título fica no alto, no centro, e a linha dos 6 passos atravessa o card na altura do meio.
- **Sem texto e sem nada que lembre os 6 passos** (nomes, números, ícones de etapas).
- **Só azul-marinho e turquesa (#2AD2C1).** A página já escurece a imagem com o vidro navy, então ela pode vir com contraste normal.
- No celular o card é estreito e mostra só uma faixa central da imagem; os objetos laterais da opção 1 quase não aparecem ali.

## Depois de gerar

Salvar a imagem em `assets/` e avisar. Eu converto para WebP e troco a última camada de `background` do `#mapa > .wrap`.
