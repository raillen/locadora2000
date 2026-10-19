# Produção e publicação de assets

## Um registro, duas visualizações

O portal de LOCADORA 2000 é independente de `game-assets-lib`. As rotas `#/table` e `#/sheets` usam `data/catalog.json` e `data/production.json`. Um arquivo registrado aparece na ficha e na tabela do asset e na galeria, sem cadastrar novamente em outra página.

O catálogo original está em `public/docs/catalogo-original.md`. `npm run catalog` extrai suas tabelas para JSON. O histórico de produção fica separado e não é apagado quando o catálogo é reimportado.

## Antes de produzir

1. Ler a direção de arte do GDD e o briefing do ID escolhido.
2. Conferir prioridade, estados e arquivos existentes na ficha do asset.
3. Definir escala, câmera, âncora, footprint, variante e versão.
4. Produzir a imagem, áudio ou dado real. Uma referência visual não substitui o sprite final.
5. Preservar autoria, direitos, arquivo-fonte e instruções relevantes.

## Registrar um arquivo

Na raiz do repositório, com Node 22.12+ e `npm ci` já executado:

```bash
npm run register -- --id ENV-001 --file /caminho/piso.png --kind sprite --variant clean --version 1 --creator "Nome do autor" --rights "Descrição dos direitos de uso" --notes "Âncora na base; footprint 1x1; validar na cena"
```

O comando valida o arquivo, copia para `public/assets/production/ENV-001/`, registra seu hash e metadados e atualiza o manifesto. A primeira versão entra em **Em revisão**. `--source /caminho/modelo.bbmodel` pode preservar também o arquivo-fonte. `--prompt-file /caminho/brief.txt` guarda o briefing/prompt como texto; não inserir credenciais.

Tipos: `reference`, `sprite`, `sheet`, `audio`, `data`, `model`. Referências, sprites e sheets aceitam PNG válido; áudio aceita WAV PCM ou OGG Vorbis/Opus; dados aceitam JSON válido; modelos aceitam GLB v2 válido. A ferramenta não gera assets e não converte formatos. Fontes `.bbmodel`, `.blend`, `.glb`, `.gltf`, `.kra`, `.ora`, `.psd` ou `.png` podem ser preservadas à parte; dependências externas de projetos Blender/glTF precisam ser empacotadas pelo autor.

Variantes e revisões usam nomes distintos, por exemplo `clean` e `worn`, versões 1 e 2. Um arquivo existente com conteúdo diferente nunca é sobrescrito. Registrar novamente o mesmo ID/tipo/variante/versão e os mesmos bytes é uma operação sem alteração.

## Revisar

```bash
node scripts/review-asset.mjs --record ENV-001-sprite-clean-v001 --status approved --notes "Revisão visual concluída; transparência e escala conferidas"
```

Estados: `review` (em revisão), `approved` (arquivo aprovado) e `deprecated` (retirado). Aprovar uma referência não aprova automaticamente o sprite do jogo. O portal mostra separadamente os tipos de arquivo; o aceite final do jogo inclui teste na engine e continua sendo responsabilidade da revisão de produção.

Não há botão de upload ou aprovação pública: este é um site estático. Alterações permanentes entram pelos scripts e pelo Git, com histórico de revisão. Isso evita oferecer uma edição no navegador que só seria salva localmente.

## Validar e publicar

```bash
npm run check
npm test
npm run build
git add public/assets/production public/data/production.json
git commit -m "assets: register ENV-001 clean v001"
git push origin main
```

O último comando pressupõe que você esteja na branch `main` correta e tenha revisado suas mudanças; não use para sobrescrever outra branch. O workflow de GitHub Pages valida e compila o portal em cada push na `main`. Em outras branches, CI valida e compila sem publicar. Os arquivos só aparecem no site público após o deploy terminar com sucesso.

Ative **Settings → Pages → Build and deployment → Source: GitHub Actions** no repositório. O endereço padrão esperado é `https://raillen.github.io/locadora2000/`. Um caminho em `raillen.com` depende da configuração do domínio existente; este repositório não muda o domínio da biblioteca anterior e não contém CNAME.

## Direção técnica

Usar PNG transparente, câmera compartilhada, uma direção de luz, âncora na base e tamanhos validados na cena. Exportar com nomes ASCII e sem espaços. Preservar os IDs do catálogo mesmo quando o nome humano mudar.

Para o slice, começar por piso, paredes, balcão, duas estantes, console/CRT, PC e três personagens. Não iniciar 130 assets P0 antes de confirmar escala e integração.
