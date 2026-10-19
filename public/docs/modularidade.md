# Assets e modularidade

## Objetivo

Definir os próximos complementos do inventário e a construção dos kits reutilizáveis de LOCADORA 2000. Este guia incorpora as recomendações solicitadas pelo usuário em 19/10/2026 e complementa o GDD e o pipeline de produção.

O catálogo navegável preserva os **358 assets-base do documento original**. Os conjuntos adicionais abaixo estão documentados para planejamento; sua decomposição em novos registros e IDs deve acontecer ao preparar a produção, preservando os IDs existentes. Quantidade de peças, medidas e prioridades condicionais precisam ser validadas no protótipo.

## Complementos recomendados

| Conjunto | Conteúdo | Prioridade sugerida | Uso no jogo |
|---|---|---|---|
| Kit de limpeza da loja | Vassoura, rodo, balde e pano de chão | P1; antecipar se a limpeza entrar no primeiro loop | Preparar e manter o estabelecimento; complementar os utensílios de limpeza de eletrônicos já catalogados |
| Bandejas de recebimento e devolução | Recipientes de balcão para produtos recebidos, aguardando inspeção e liberados | P1 | Tornar o fluxo de devolução e inspeção visível |
| Etiquetas comerciais | Preço, código do exemplar, reservado e em manutenção | P0 como conjunto gráfico simples | Comunicar identidade, disponibilidade e condição operacional de produtos e equipamentos |
| Sujeira em camadas | Poeira, pegadas e líquido derramado | P1 | Reutilizar pisos e móveis com diferentes condições de limpeza |
| Instalação elétrica aparente | Tomadas, interruptores e canaletas | P1 | Completar as estações e a identidade visual do comércio |

As etiquetas complementam os cartazes e a etiquetadora existentes; podem compartilhar a mesma base gráfica. As bandejas compartilham um recipiente-base e mudam a etiqueta e o conteúdo. O kit de limpeza deve ser dividido em objetos individuais quando houver interação ou armazenamento independente.

### Conteúdo reutilizável nas telas

Detalhar os estados visuais de TVs e computadores: tela desligada, menu fictício, jogo em execução e defeito. Esse conteúdo complementa os eletrônicos existentes, como [ELE-014](#/asset/ELE-014), [ELE-017](#/asset/ELE-017) e [ELE-019](#/asset/ELE-019), sem exigir uma nova carcaça para cada estado.

Usar artes originais e uma região de tela definida no modelo ou no sprite. Conservar o mesmo enquadramento entre os estados; avaliar brilho e animação separadamente. A tela apagada pode integrar o sprite-base, enquanto outros conteúdos são sobrepostos quando isso facilitar a produção.

## Famílias modulares

| Família | Registros de referência | Peças ou componentes compartilhados |
|---|---|---|
| Pisos e paredes | ENV-001 a ENV-013 | Piso repetível, parede reta, cantos, terminações e módulos com abertura; alturas e materiais compatíveis |
| Portas e janelas | ENV-014 a ENV-017 | Moldura, folha da porta, vidro e adesivos separados na produção |
| Fachada | EXT-001 a EXT-004; ENV-021 | Composição de paredes, entrada, vitrine, letreiro e toldo |
| Balcões | FUR-001 a FUR-003 | Trecho reto, canto, fechamento lateral e módulo de caixa |
| Estantes e armazenamento | FUR-004 a FUR-010; STK-005 | Estrutura, prateleiras, terminações, testeira e grupos de produtos |
| Estações de console e PC | FUR-011, FUR-012 e eletrônicos compatíveis | Mesa ou suporte, assento, tela, equipamento e periféricos com posições de encaixe |
| Oficina | FUR-013, REP-001 e REP-022 | Base de bancada compartilhada; ferramentas e equipamentos adicionados conforme a melhoria |
| Embalagens de jogos | MED-001 a MED-006 | Modelos por formato, capas, etiquetas e desgaste substituíveis |
| Cartazes e sinalização | DEC-001 a DEC-008; EXT-005 a EXT-008 | Suporte ou moldura compartilhada; arte e texto variáveis |
| Personagens | CHR-001 a CHR-018 | Corpos-base, cabelos, roupas e acessórios reutilizáveis na produção, com animações compatíveis |

Os módulos de canto de paredes já existem no catálogo, em ENV-011 e ENV-012. A etapa seguinte é especificar como encaixam, junto com terminações e vãos, evitando criar uma segunda família equivalente por engano.

Uma base compartilhada de bancada pode atender FUR-013 e REP-001, preservando ambos os IDs e suas funções. O vínculo deve constar no registro de produção ou no projeto-fonte.

## Modularidade na produção e no jogo

O jogo é apresentado em 2D. A biblioteca pode ser montada com peças reutilizáveis no Blockbench e renderizada em sprites compostos no Blender.

**Na produção:** compartilhar modelos, materiais, dimensões, texturas, rig e câmera. Uma estante completa pode nascer de laterais, prateleiras e grupos de caixas reutilizados.

**Durante o jogo:** separar componentes quando a mudança for visível e funcional, como produtos nas prateleiras, conteúdo de tela, porta aberta, sujeira ou um equipamento substituído. Conferir a ordenação de profundidade e a oclusão de cada camada.

Um modelo modular não obriga a engine a desenhar cada parafuso como um sprite separado. A decisão entre composição pronta e camadas dinâmicas depende de interação, estados, legibilidade e custo de manutenção.

### Objetos que funcionam como unidades completas

TVs, consoles, controles e ferramentas podem ser produzidos como objetos inteiros, com variantes de material, tela e condição. Separar um componente faz sentido quando ele precisa abrir, trocar, mover ou participar de uma interação visível.

Exemplos: tampa removível na oficina, tela que muda de conteúdo, porta com animação e controle usado por personagem. Botões e parafusos decorativos podem permanecer no mesmo modelo e no mesmo export.

### Modularidade, variante e estado

| Conceito | Exemplo | Tratamento |
|---|---|---|
| Módulo | Trecho de balcão que encaixa em outro | Geometria e encaixes compartilhados |
| Variante | O mesmo balcão azul ou de madeira | Material, paleta ou acabamento |
| Estado | O mesmo balcão limpo ou sujo | Camada ou export correspondente |
| Composição | Estação com mesa, TV, console e controle | Conjunto de objetos compatíveis, com posições definidas |

Manter essas diferenças no briefing ajuda a estimar trabalho e evita multiplicar modelos por cor ou arquivos por combinação desnecessária.

## Contrato técnico dos kits

Antes de produzir lotes, cada família precisa documentar:

1. **Unidade e dimensões:** largura, profundidade e altura, relacionadas à grade. O tile de 128 × 64 px continua sendo referência inicial, sujeita ao teste de escala.
2. **Footprint:** células ocupadas, espaço de acesso e área de interação.
3. **Âncora e pivô:** ponto de contato com o chão e ponto de rotação; manter uma convenção por família.
4. **Encaixes:** posições, alturas, orientação e tipo de peça aceito em cada conexão.
5. **Orientações permitidas:** quais rotações existem e quais precisam de export próprio.
6. **Fechamentos:** pontas, cantos, fundos e vãos que impedem buracos visíveis no conjunto.
7. **Materiais e paleta:** superfícies compartilhadas e limites das recolorações.
8. **Câmera, luz e sombra:** mesmas configurações para exports compatíveis; sombra de contato separada quando útil.
9. **Camadas e profundidade:** quais partes ficam à frente ou atrás de produtos e personagens.
10. **Fonte e versões:** projeto-fonte, peças utilizadas e vínculo entre cada export e o asset-base.

O número de pixels não define sozinho a escala física. Conferir o conjunto montado na cena antes de consolidar medidas ou considerar o kit pronto.

### Encaixes de uma estação

Uma mesa de console pode ter posições de referência para tela, console, controles, assento e personagem. Documentar alturas e áreas de acesso, junto com limites de tamanho e compatibilidade dos equipamentos. Uma TV maior só pode substituir a pequena se houver espaço visual e funcional.

### Cuidados com personagens

Reutilizar corpos, roupas e rig na produção e conferir o resultado em todas as direções. Acessórios precisam acompanhar a animação e respeitar oclusão. Espelhamento depende da simetria do design; detalhes assimétricos exigem conferência ou export específico.

## Primeiro teste de modularidade: estante

Depois do estudo visual do CRT, produzir um teste de estante baseado em [FUR-004](#/asset/FUR-004) e [FUR-005](#/asset/FUR-005).

- Um módulo simples com estrutura, prateleiras e fechamento.
- Dois módulos conectados lado a lado.
- Composição vazia, parcialmente ocupada e cheia.
- Grupo de caixas de jogos reutilizável, com capas variáveis.
- Export em escala de gameplay, junto ao piso e a um personagem de referência.

### Critérios de aceite do teste

- Junções alinhadas, sem frestas ou sobreposição perceptível.
- Mesma escala, câmera, iluminação e paleta entre os módulos.
- Terminações coerentes nas pontas expostas.
- Produtos legíveis e corretamente ocluídos pela estrutura.
- Alteração de ocupação preserva o móvel e sua âncora.
- As orientações suportadas funcionam junto às paredes.
- A composição mantém passagem e acesso dos personagens.
- Fontes e exports permitem repetir o resultado.

## Sheets para modelagem

Cada prancha deve apresentar o objeto ou módulo identificado, com frente, lateral, traseira, cima e baixo ortográficos conforme necessário, e uma vista dimétrica de gameplay. Todas as vistas compartilham proporções e detalhes. Peças simétricas podem simplificar a prancha; encaixes e componentes assimétricos exigem vistas adicionais.

Para kits, acrescentar uma composição montada ou um detalhe de conexão quando isso explicar o encaixe. Não substituir as projeções técnicas por várias perspectivas isométricas. Uma prancha de modelagem e um sprite sheet de animação têm funções diferentes.

## Registro e publicação

Registrar somente arquivos reais pelo [pipeline de produção](#/pipeline). Um estudo de modelagem entra como `reference`, com estado inicial `review`; isso não representa um modelo 3D concluído nem integração aprovada no jogo.

As propostas de ampliação deste guia não alteram o progresso de produção. A tabela e a galeria devem contar apenas os registros correspondentes no catálogo e no manifesto.
