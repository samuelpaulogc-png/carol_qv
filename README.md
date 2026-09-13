# Gancho da Virada

Landing page estática de captura para o evento **Gancho da Virada**, voltado a instrumentadores cirúrgicos recém-formados.

## Executar localmente

Na raiz do projeto, execute:

```powershell
python -m http.server 5501
```

Depois, abra [http://localhost:5501/](http://localhost:5501/).

## Estrutura

```text
.
├── index.html                 # Landing page autocontida
├── README.md                  # Visão geral e execução local
├── AGENTS.md                  # Instruções compartilhadas para o Codex
├── CLAUDE.md                  # Importa as instruções de AGENTS.md
├── docs/
│   ├── brand-guide.md         # Manual da marca e fonte da verdade da copy
│   └── project-status.md      # Estado atual, decisões e pendências
├── assets/
│   └── images/
│       ├── hero-carol.png
│       └── hero-equipe.webp
├── .agents/skills/            # Skills locais do Codex
├── .claude/launch.json        # Preview local no Claude Code
└── .codex/
    ├── config.toml            # Configuração local do Codex
    └── agents/                # Agentes personalizados do projeto
```

## Conteúdo e identidade

- Consulte `docs/brand-guide.md` antes de alterar copy, posicionamento, paleta ou identidade visual.
- Consulte `docs/project-status.md` para decisões existentes e placeholders pendentes.
- Não revele os seis passos do método na landing page.
- Não introduza claims, métricas ou depoimentos sem confirmação.

## Assets

As imagens ficam em `assets/images/`. Prefira formatos otimizados para web e não embuta imagens raster como data URI no HTML.
