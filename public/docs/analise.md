# Análise do documento de LOCADORA 2000

## O que foi recebido

O arquivo recebido é o **Catálogo Mestre de Assets v1.0**, datado de 19/10/2026. Ele contém uma direção visual clara, a fantasia de gerenciamento, um loop diário, um ciclo de vida dos produtos e uma lista de produção abrangente. Ele também fornece a base para desenvolver o GDD, mas não descreve todas as regras do jogo.

Conferi as 358 linhas de assets, sem IDs duplicados: **130 P0, 150 P1, 78 P2**, distribuídos em **16 categorias**. Os totais declarados no Markdown correspondem às tabelas. O original foi preservado integralmente; o catálogo navegável é derivado dele.

## Entendimento do jogo

LOCADORA 2000 é um simulador de uma locadora de videogames brasileira na passagem dos anos 1990 para os 2000. O jogador constrói um negócio e uma relação com o bairro. Sua gestão combina aluguel, devolução, venda, estações de jogo por hora, usados, condição dos produtos, oficina, estoque e crescimento da loja.

O centro do design é o **exemplar físico**: comprar um jogo, inspecioná-lo, alugá-lo, recebê-lo desgastado, recuperar seu valor e escolher seu próximo destino. Isso diferencia o jogo de uma loja em que cada produto é apenas uma quantidade numérica.

O loop é **preparar → abrir → atender → administrar → fechar → investir**. Clientes recorrentes e preferências dão significado às decisões financeiras. A identidade visual exige ilustração isométrica de geometria simples, sem realismo e sem pixel art tradicional. O visual PS1 texturizado da biblioteca usada como referência de site não deve ser transferido para este jogo.

## Pontos fortes

- A ambientação brasileira aparece em objetos concretos: CRTs, ventiladores, letreiros pintados, fichários, cartazes e equipamentos usados.
- A produção diferencia assets-base de variantes e preserva IDs estáveis.
- A direção técnica conecta Blockbench, Blender e correção 2D sem exigir que o jogo rode em 3D.
- A priorização P0/P1/P2 evita tratar cada detalhe como requisito imediato.
- O catálogo propõe um vertical slice pequeno e verificável.

## Lacunas que precisam de decisão

O documento não escolhe engine, plataforma final, controles, regras de tempo, preços, prazos, multas, algoritmo de demanda, desgaste, falência, salvamento ou duração da progressão. O GDD expandido organiza esses temas e apresenta propostas, explicitamente separadas das definições da fonte.

Não há briefing numérico de economia: `DAT-006` e `DAT-017` são assets a produzir, não tabelas preenchidas. Sem esses dados, não é possível avaliar retorno de investimento, dificuldade ou velocidade da progressão.

## Tensões e dependências encontradas

1. **130 P0 ainda é um escopo grande.** O slice recomendado não precisa de todos eles. Produzir primeiro só o que valida a sala, atendimento, aluguel, devolução e estações.
2. **Quatro consoles visuais contra três gerações de dados.** `ELE-001` a `ELE-004` são P0; `DAT-002` prevê três gerações no MVP. Definir o conjunto antes do primeiro lote de consoles.
3. **Bancadas potencialmente duplicadas.** `FUR-013` e `REP-001` podem compartilhar uma base, preservando ambos os registros.
4. **Compatibilidade é funcionalmente necessária antes da tabela completa.** `DAT-018` é P1, mas uma estação de console precisa de uma regra mínima para funcionar no slice.
5. **Oficina tem dependências divididas.** Há bancadas e ferramentas P0, mas interface, regras e animações de reparo majoritariamente P1. Não presumir que o sistema completo está no primeiro slice.
6. **A contagem não representa arquivos finais.** Personagens com quatro direções, roupas, paletas e animações multiplicam quadros. Estimar o esforço por animação e conjunto de estados.
7. **Salvar/carregar é uma lacuna importante.** Dinheiro, locações em andamento e estado de exemplares precisam de persistência consistente para sustentar a progressão.

## Recomendação de implementação

Validar primeiro a câmera, o tamanho real dos objetos e a ordenação de profundidade. Depois implementar inventário por exemplar e transações. Só então ligar aluguel/devolução, sessões e fechamento. Produção artística em lote vem depois da aprovação da escala e da luz.

O primeiro marco deve provar que um cliente consegue entrar, alugar um jogo, sair, devolver, pagar o valor correto e liberar a unidade, enquanto outra pessoa usa uma estação. O fechamento precisa explicar o dinheiro que entrou e saiu. Isso valida a promessa do jogo com custo menor que produzir toda a lista P0.

## O que o portal entrega

GDD expandido, fonte original, análise crítica, catálogo integral, filtros de produção, fichas de assets, galeria de arquivos registrados, padrões de publicação e roadmap. Não há assets de jogo gerados nesta entrega. Nenhum item é apresentado como produzido ou aprovado sem arquivo e registro correspondentes.
