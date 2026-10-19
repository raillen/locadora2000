# LOCADORA 2000 — Arquivo de produção

Portal de documentação e GDD de **LOCADORA 2000 · A Game Shop Simulator**. Catálogo integral de 358 assets-base em 16 categorias, derivado do Markdown fornecido, com tabela, fichas, galeria, direção visual, análise e pipeline de produção.

## Desenvolvimento

Requisitos: Node.js 22.12+ (validado também com Node 24) e npm.

```bash
npm ci
npm run catalog
npm run dev
```

Vite usa a porta 5173. A compilação estática fica em `dist/` e funciona em uma subpasta, como `/locadora2000/`.

```bash
npm test
npm run build
npm run preview
```

O preview usa a porta 4173. Os testes de navegador usam o Chromium instalado no ambiente:

```bash
npm run test:browser
```

Se ele não estiver em `/usr/bin/chromium`, defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` ou instale o navegador com `npx playwright install chromium`. Não são necessários banco, conta, API nem chaves de serviços.

## Páginas

| Rota | Conteúdo |
|---|---|
| `#/overview` | Visão geral, métricas reais e frentes de produção |
| `#/gdd` | GDD expandido, com propostas identificadas |
| `#/analysis` | Análise da fonte, lacunas e dependências |
| `#/table` | Catálogo completo, busca, filtros, ordenação e paginação |
| `#/asset/ENV-001` | Briefing e versões de um asset |
| `#/sheets` | Galeria de arquivos efetivamente registrados |
| `#/art` | Direção visual e critérios técnicos |
| `#/pipeline` | Registro, revisão e publicação de assets |
| `#/roadmap` | Plano de entregas, sem datas inventadas |
| `#/source` | Markdown original preservado |

## Adicionar assets

```bash
npm run register -- --id ENV-001 --file /caminho/piso.png --kind sprite --variant clean --version 1 --creator "Autor" --rights "Direitos de uso" --notes "Footprint 1x1; âncora na base"
npm run check
npm run build
```

O registro salva o arquivo, hash e metadados no manifesto. Tabela, ficha e galeria refletem o mesmo registro. Todo novo arquivo entra em revisão. O portal não gera imagens, não inventa produção e não salva uploads em armazenamento do navegador.

Consulte [o pipeline completo](public/docs/pipeline.md). Novos assets devem seguir o estilo isométrico ilustrado do jogo; o visual PS1 da biblioteca de referência não é a direção deste projeto.

## Publicação

O workflow [Pages](.github/workflows/pages.yml) executa validação, testes e build em pushes e PRs. Só publica em pushes na `main` ou em execução manual nessa branch. Ative **Settings → Pages → Source: GitHub Actions** no GitHub.

Portal publicado pelo GitHub Pages: **https://raillen.com/locadora2000/**. O deploy confirmado usa o domínio existente da conta; não foi necessário mudar a configuração do domínio. A biblioteca `game-assets-lib` permanece independente, conforme solicitado.

- [GDD](https://raillen.com/locadora2000/#/gdd)
- [Tabela de produção](https://raillen.com/locadora2000/#/table)
- [Galeria de assets](https://raillen.com/locadora2000/#/sheets)

O sucesso do deploy é conferido no GitHub Actions. A disponibilidade HTTP deve ser verificada separadamente quando a política de rede do ambiente permitir acesso ao domínio.

Arquivos de produção entram no Git junto ao manifesto e são publicados com o site no deploy seguinte. Não há backend de upload nem escrita pública.

## Fontes e estado do projeto

- [Catálogo original](public/docs/catalogo-original.md): cópia integral do anexo, com 358 IDs e prioridades preservados.
- [GDD](public/docs/gdd.md): expansão editorial e técnica; regras propostas estão identificadas.
- [Análise](public/docs/analise.md): entendimento do jogo e riscos encontrados.
- `public/data/catalog.json`: derivado reproduzível do catálogo.
- `public/data/production.json`: arquivos e revisões reais; inicialmente vazio.

Este repositório implementa o portal de produção. A simulação do jogo e os assets de gameplay ainda precisam ser produzidos. O desenho da fachada na página inicial é uma ilustração conceitual da interface, não um asset aprovado do jogo.
