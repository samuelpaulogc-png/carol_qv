# Fundo da seção "O Gancho da Virada é para você que..."

A seção `#para-quem` foi refeita em 24/09 pela referência do usuário: título à esquerda e sete cartões de vidro em 2 · 3 · 2. Na referência, atrás dos cartões, uma sala cirúrgica escura ocupa o lado direito, com o foco aceso no alto. A página ainda não tem essa foto; por enquanto há só um brilho suave de luz no canto de cima à direita.

## Regras

- **Proporção larga (21:9 ou 16:9).** Gerar o maior possível; eu salvo em WebP.
- **Tudo o que importa fica no terço direito.** A metade esquerda precisa ser quase preta e limpa: ali ficam o título e os cartões.
- **Sem pessoas e sem nenhum texto.** A Carol já aparece na hero e na apresentação; aqui a sala fica vazia.
- **Só azul-marinho, azul-petróleo e reflexos turquesa (#2AD2C1).** Nada de vermelho, laranja ou amarelo.

## Depois de gerar

1. Salvar a imagem em `assets/images/` (por exemplo, `para-quem-sala.png`) e me avisar; eu converto para WebP.
2. No `index.html`, pôr na `section#para-quem` o atributo `style="--who-photo:url('assets/images/para-quem-sala.webp')"`. O CSS já escurece a foto da esquerda para a direita e, no celular, mostra só o alto dela, sob um degradê.
