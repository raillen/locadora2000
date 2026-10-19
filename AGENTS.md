# LOCADORA 2000

Este checkout já é isolado pela tarefa. Use-o diretamente; não crie worktrees sem solicitação explícita.

## Portal

- Node 22.12+; `npm ci`, `npm run dev`, `npm test`, `npm run build`.
- Site em português brasileiro. Texto e números da interface devem representar o estado real.
- GDD: `public/docs/gdd.md`. Fonte: `public/docs/catalogo-original.md`. Preservar o original e seus IDs.
- Propostas que não existem na fonte precisam ser identificadas como propostas, não decisões aprovadas.

## Sempre que criar um asset

1. Consultar o briefing no catálogo e a direção de arte. O estilo deste jogo é 2D isométrico ilustrado; não importar o visual PS1 do outro projeto.
2. Preservar o arquivo real, sua fonte e autoria/direitos. Não publicar placeholders como assets produzidos.
3. Registrar pelo comando `npm run register -- --id ID --file CAMINHO --kind TIPO --variant VARIANTE --version NUMERO --creator AUTOR --rights DIREITOS`. Opções e tipos estão em `public/docs/pipeline.md`.
4. O script atualiza `public/data/production.json` e copia o arquivo para `public/assets/production/`. Tabela, ficha e galeria usam esse mesmo manifesto.
5. Novos registros entram em revisão. Não aprovar automaticamente imagens geradas. Registrar revisão explícita com `scripts/review-asset.mjs` somente quando a revisão correspondente tiver ocorrido.
6. Rodar `npm run check`, `npm test` e `npm run build`. Incluir os arquivos e manifesto no mesmo conjunto de mudanças. Trabalhar sequencialmente ao registrar/revisar arquivos, evitando edições concorrentes do manifesto.
7. A publicação ocorre pelo workflow Pages após push na `main`; uma execução local ou commit não prova deploy.

Não alterar `game-assets-lib`: o usuário escolheu manter somente o portal de LOCADORA 2000. Não renumerar assets nem apagar versões anteriores. Se o conteúdo do arquivo mudar, incrementar sua versão. Não registrar credenciais em metadados ou prompts.
