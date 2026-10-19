# LOCADORA 2000

## 1. Visão do jogo

**A Game Shop Simulator.** Transforme uma pequena locadora brasileira em um ponto de encontro do bairro. Alugue jogos, administre estações de console e PC, cuide dos equipamentos e conheça as pessoas que voltam à sua loja.

Este GDD organiza e expande o **Catálogo Mestre de Assets v1.0, de 19/10/2026**, preservado integralmente no portal. O documento original é a fonte da fantasia, do loop, da direção visual e dos 358 assets. Regras operacionais que o catálogo não define são identificadas como **proposta de design**, sujeitas ao protótipo. Não existe uma implementação jogável neste repositório.

| Campo | Definição | Situação |
|---|---|---|
| Gênero | Simulação de gerenciamento de comércio | Base do catálogo |
| Ambientação | Bairro brasileiro, fim dos anos 1990 e começo dos 2000 | Base do catálogo |
| Apresentação | 2D isométrico/dimétrico ilustrado; geometria simples | Base do catálogo |
| Idioma inicial | Português brasileiro; inglês em etapa posterior | Base do catálogo |
| Plataforma do protótipo | PC, teclado e mouse | Proposta; confirmar |
| Modo de jogo | Um jogador, simulação local | Proposta; confirmar |
| Engine e hardware mínimo | A definir após prova técnica | Decisão aberta |

## 2. Pilares de experiência

1. **A loja tem história.** O comércio de bairro, os CRTs, as etiquetas e os clientes recorrentes sustentam a identidade brasileira. Marcas, capas e jogos são fictícios.
2. **Cada exemplar importa.** Uma unidade tem condição, disponibilidade e histórico próprios. Um jogo alugado não pode ser vendido ao mesmo tempo.
3. **Rotina com decisões.** Atendimento, filas e manutenção criam escolhas compreensíveis; os resultados aparecem no caixa e no retorno dos clientes.
4. **Crescimento legível.** Mais espaço, equipamentos e variedade devem mudar a operação da loja, além de alterar sua aparência.
5. **Arte econômica e consistente.** Silhueta, câmera, luz, âncora e paleta compartilhadas têm prioridade sobre quantidade de detalhes.

**Público proposto:** pessoas interessadas em simuladores de loja e gestão acessível, com afinidade por videogames e pela vida cotidiana dos anos 2000. Duração de sessões, classificação indicativa e modelo comercial ainda precisam ser definidos.

## 3. Fantasia e contexto

O jogador começa com poucos jogos, aparelhos usados e dinheiro limitado. A loja atende estudantes, adultos, famílias, colecionadores e jogadores competitivos. Ela pode oferecer locação, venda, jogo por hora, avaliação de usados e oficina.

A narrativa emerge do negócio: devolver um jogo atrasado, recuperar um controle defeituoso, reconhecer o gosto de um cliente ou conseguir financiar uma nova estação. O catálogo não estabelece uma trama linear, protagonista nomeado, cidade específica ou campanha. Essas decisões permanecem abertas.

## 4. Loop central

**Preparar → abrir → atender → administrar → fechar → investir.**

| Etapa | Ações | Feedback necessário |
|---|---|---|
| Preparar | Limpar, organizar, testar, repor e conferir reservas | Estado dos itens, ocupação e pendências |
| Abrir | Receber clientes e iniciar atendimento | Porta, relógio, fila e demandas |
| Atender | Alugar, receber devoluções, vender e iniciar sessões | Confirmação de transação e mudança de estado |
| Administrar | Acompanhar caixa, estoque, desgaste e satisfação | Alertas, HUD e tooltips |
| Fechar | Conferir receita, custos e devoluções | Resumo de fim de dia |
| Investir | Comprar estoque, melhorar equipamentos e expandir | Capacidade e novos serviços |

**Proposta de tempo:** relógio de simulação separado do tempo real, com pausa e velocidades configuráveis. Duração do dia e horário de funcionamento são parâmetros de balanceamento, sem valores finais. O protótipo deve testar se o jogador consegue atender, compreender as consequências e planejar sem depender de reflexos rápidos.

## 5. Vertical slice e fronteiras do MVP

O catálogo recomenda uma sala pequena, balcão, duas estantes, uma estação de console, uma estação de PC, três personagens, um aluguel e uma devolução. Essa é a primeira entrega funcional. Os **130 assets P0** são o backlog do MVP completo, não a quantidade necessária para iniciar o slice.

**Proposta para os três personagens do slice:** dono (`CHR-001`), estudante (`CHR-004`) e adulto (`CHR-006`). O dono atende o balcão; o atendente adicional pode entrar depois. A escolha evita exigir contratação para provar o loop.

| Entrega | Inclui | Condição de saída |
|---|---|---|
| Prova técnica | Grade, ordenação, colisão e uma estação montada | Personagens passam pelos móveis sem erro de profundidade |
| Vertical slice | Loja pequena, estoque por exemplar, aluguel, devolução e uma sessão por hora | Um expediente completo com transações consistentes |
| MVP | Loop diário, preços, condição, venda simples, dados e interface essencial | Dias consecutivos, progressão inicial e salvamento confiável |
| Release inicial | Variedade, fornecedores, funcionários e oficina aprofundada | Sistemas integrados e balanceados |
| Pós-MVP | Eventos, torneios, decoração avançada e novas gerações | Inclusão guiada pelo resultado do MVP |

O escopo funcional do MVP ainda precisa de aprovação: o original lista aluguel, venda, jogo por hora, reparo e usados como candidatos. **Proposta:** validar aluguel/devolução e jogo por hora primeiro; vender um item e limpar um disco antes de criar negociação e minijogo de reparo.

## 6. Produtos, inventário e disponibilidade

Separar **definição de produto** de **exemplar físico** é uma proposta central de arquitetura. A definição contém título, gênero, geração e preço-base. O exemplar contém ID único, condição, localização, custo e vínculo com uma transação.

**Ciclo de vida da fonte:** comprar/receber → inspecionar → limpar/testar/reparar → destinar para aluguel, venda, estação ou coleção → usar/desgastar → reparar/retirar → revender/descartar/guardar.

**Estados propostos:** disponível, reservado, alugado, em uso, em inspeção, em reparo, vendido e retirado. O estado e a localização devem ser independentes: um produto pode estar disponível no estoque ou numa estante.

- Toda movimentação deve preservar a identidade do exemplar.
- Um exemplar não pode participar de duas transações incompatíveis.
- Itens vendidos ou retirados deixam de contar como disponíveis.
- Cancelar uma operação deve liberar reservas sem duplicar unidades.
- Compatibilidade mínima entre jogo, console e controle é necessária no slice; a tabela completa `DAT-018` pode continuar em P1.

## 7. Locação, reserva e devolução

**Proposta de fluxo:** selecionar cliente → selecionar exemplar disponível → exibir preço e prazo → confirmar pagamento e contrato → retirar exemplar da disponibilidade. A devolução encerra o contrato, registra a condição e libera o item após inspeção.

| Exceção | Comportamento proposto |
|---|---|
| Exemplar indisponível | Bloquear confirmação e explicar o motivo |
| Cliente sem orçamento | Oferecer cancelamento ou alternativa de preço |
| Devolução atrasada | Calcular atraso pelo relógio do jogo, exibir multa e registrar pagamento |
| Dano na devolução | Comparar condição anterior e atual e informar consequência |
| Reserva expirada | Liberar a unidade sem alterar o dinheiro |

Prazos, caução, limite de itens por cliente, teto de multa, perdão e inadimplência não são definidos na fonte. Devem ficar em dados de balanceamento e ser validados antes do MVP. O slice pode operar sem reservas e sem dívida persistente.

## 8. Estações de jogo por hora

Uma estação reúne suporte, assento, tela, plataforma, periféricos compatíveis e posição de uso. Exemplos: `FUR-012`, `ELE-014`, `ELE-001`, `ELE-009` para console; `FUR-011`, `ELE-017`, `ELE-019`, `ELE-021` e `ELE-022` para PC.

**Proposta de estados:** indisponível → livre → reservada para deslocamento → ocupada → aguardando limpeza → livre. Defeito bloqueia novas sessões. A estação deve liberar a reserva quando o cliente não consegue chegar.

**Proposta para o slice:** cobrança antecipada de um bloco de tempo, sem extensões automáticas. O HUD mostra tempo restante; o encerramento libera o cliente e registra desgaste uma única vez. Pausa do jogo congela a sessão. Preço, duração, tolerância e energia por estação ficam parametrizados.

## 9. Venda, usados e oficina

**Venda:** informar preço, conferir disponibilidade, cobrar e retirar a unidade. Snacks e acessórios usam o mesmo núcleo de transações; perecibilidade não é requisito definido no catálogo.

**Usados:** receber oferta → inspecionar procedência e condição → estimar valor → aceitar/recusar → definir destino. Negociação, falsificação e raridade entram gradualmente. A fonte sugere esses temas, mas não especifica probabilidades, modelos de fraude ou minijogos.

**Oficina:** diagnóstico, ferramentas, custo, tempo e resultado precisam de regras explícitas. Proposta inicial: limpeza determinística com custo e duração conhecidos; reparos com risco apenas quando o jogador puder conhecer os fatores relevantes. Falhas não devem consumir dinheiro ou peças em duplicidade.

`FUR-013` (mesa de oficina) e `REP-001` (bancada de reparo) podem compartilhar o mesmo modelo-base. Preservar ambos os IDs do catálogo e registrar a decisão de reutilização, sem apagar entradas.

## 10. Clientes, filas e reputação

A fonte prevê preferências, orçamento, paciência, hábitos e chance de retorno, com dez perfis-base (`DAT-005`). Aparência e perfil de comportamento devem poder variar independentemente.

**Fluxo proposto:** chegar → escolher necessidade → procurar produto/estação → entrar na fila → ser atendido → reagir → sair. Um cliente pode desistir por indisponibilidade, preço, espera ou caminho bloqueado.

- Filas precisam de posições reservadas e saída segura.
- Clientes recorrentes devem manter identidade e histórico.
- Reputação deve explicar suas causas: atendimento, espera, disponibilidade e condição.
- Humor precisa de texto/ícone além de cor (`VFX-008`, `UI-013`).
- Pesos, limites, recuperação e impacto da reputação sobre demanda são parâmetros propostos, ainda sem curva aprovada.

## 11. Economia e balanceamento

A fonte exige compra, locação, venda, reparo, despesas, caixa e progressão, mas não oferece uma planilha financeira preenchida. Não tratar valores inventados como preços finais.

**Modelo proposto:**

```text
caixa_final = caixa_inicial + entradas_recebidas - saídas_pagas
resultado_operacional = receita_do_dia - despesas_do_dia
ocupação = minutos_ocupados / minutos_disponíveis
margem_de_venda = preço_recebido - custo_do_exemplar
```

Caixa e lucro são conceitos distintos. Compra de estoque reduz caixa, mas seu tratamento contábil deve ser consistente no relatório. Manter um livro de transações com motivo, horário e referência à operação; não recalcular pagamentos pela presença de um objeto na cena.

**Experimentos necessários:** medir dias até o primeiro upgrade, proporção de clientes atendidos, ocupação, espera média, retorno de investimento, giro de estoque e frequência de caixa negativo. Testar cenários de demanda baixa, normal e alta antes de definir falência ou recuperação.

## 12. Construção e progressão

Organização, decoração, expansão e melhorias fazem parte da fantasia original. A referência inicial é um tile de **128 × 64 px**, grade 2:1 e objetos com footprint e âncora documentados.

**Proposta de construção:** selecionar → visualizar footprint → girar quando suportado → validar acesso e colisão → confirmar → cobrar. Cancelamento não gera débito. Não permitir bloquear entrada, fila, balcão ou acesso às estações.

**Progressão proposta:** reputação e saúde financeira liberam variedade de estoque, capacidade e serviços. Quantidade de marcos, custos, tamanho da loja e requisitos permanecem em aberto. Campeonatos e expansão tecnológica não devem bloquear o primeiro expediente.

## 13. Controles, câmera e interface

**Proposta para PC:** mouse seleciona objetos e ações; arrastar ou teclas de navegação movem a câmera; roda ajusta zoom dentro de limites legíveis; Escape cancela ou pausa. Mapeamentos finais e suporte a controle precisam de teste.

| Área | Informação essencial | Assets da fonte |
|---|---|---|
| HUD | Dinheiro, tempo, reputação e alertas | UI-007, UI-008, UI-029, UI-031 |
| Atendimento | Cliente, exemplar, preço, prazo e confirmação | UI-017, UI-018, UI-019 |
| Inventário | Quantidade disponível, condição e destino | UI-020, UI-030 |
| Construção | Custo, footprint e validade | UI-024, UI-038, UI-040 |
| Fechamento | Entradas, despesas e consequências | UI-022, UI-035 |
| Suporte | Tutorial, pausa e opções | UI-032, UI-033, UI-037 |

Não confundir estes painéis do jogo com o portal de documentação. O portal serve ao desenvolvimento e não implementa a simulação.

## 14. Direção de arte

**2D isométrico ilustrado, geométrico e econômico em detalhes.** Volumes simples inspirados em Blockbench, silhuetas claras, cores planas e identidade calorosa. Não aplicar automaticamente a direção PS1/low-poly texturizada do projeto de referência.

- Paleta compartilhada de aproximadamente 8–12 cores-base; normalmente 3–6 cores por asset.
- Azul profundo, azul médio, amarelo quente, creme, cinza-azulado, grafite, madeira, verde planta e vermelho de acento.
- Contorno ausente ou fino e consistente; direção de luz fixa.
- Piso de 128 × 64 px como teste inicial; props de 128–256 px e móveis de 256–512 px no maior eixo.
- Sprites PNG transparentes, âncora na base e sombra separada quando útil.
- Personagens com NE, NW, SE e SW; alvo inicial de 6–8 quadros de caminhada por direção.
- Capas, marcas, cartazes e jogos originais; nenhuma marca comercial real é necessária.

**Pipeline da fonte:** Blockbench → GLB/glTF quando apropriado → Blender com câmera ortográfica/dimétrica → correção 2D em Krita/GIMP → PNG, thumbnail, atlas e metadados. Capas e UI podem nascer diretamente em 2D.

## 15. Áudio e música

O catálogo tem 22 assets-base de áudio, incluindo tema, ambiente de loja, porta, caixa, UI e alertas. Música deve reforçar acolhimento sem competir com o feedback de atendimento. A fonte recomenda OGG para música/loops e WAV para efeitos.

**Proposta:** buses independentes de música, ambiente e efeitos; volume ajustável e opção de silenciar. Alertas essenciais também devem aparecer visualmente. Verificar loop sem clique, volume relativo e sobreposição de clientes. Vozes não verbais e chuva são P2.

## 16. Dados, arquitetura e salvamento

O catálogo define 18 assets-base de conteúdo/dados, incluindo 50 títulos de jogos no MVP, três gerações de consoles, 20+ acessórios, dez perfis de clientes e tabelas de preços e balanceamento. Essas contagens são metas da fonte, não dados já criados.

**Arquitetura proposta:** definições imutáveis em arquivos de dados, estado da simulação separado da apresentação, IDs estáveis e operações transacionais. A escolha da engine não está feita. Os modelos 3D podem ser apenas fontes de renderização para o jogo 2D.

**Salvamento proposto como requisito do MVP:** versão do formato, dinheiro, dia/hora, exemplares, locações, clientes recorrentes, estações, layout e progressão. Gravar atomicamente e manter backup. Carregar durante uma sessão ou devolução não pode repetir a cobrança. O catálogo não detalha esse sistema; precisa entrar no planejamento técnico.

## 17. Acessibilidade e localização

Português brasileiro é P0 (`DAT-015`); inglês é P1 (`DAT-016`). Textos, moeda, datas e horários devem vir de dados localizáveis. Evitar texto essencial incorporado em sprites.

**Propostas:** escala de UI, tamanho de texto legível, alto contraste, pausa disponível, ícones acompanhados de texto, remapeamento de controles e opção de reduzir movimento. Nenhuma condição de item ou aviso pode depender só de cor ou áudio.

## 18. Produção de assets e documentação

O inventário original contém **358 assets-base em 16 categorias: 130 P0, 150 P1 e 78 P2**. Variantes, paletas e animações não estão incluídas como assets-base adicionais. O esforço real é maior que essa contagem.

A tabela e a galeria do portal leem o mesmo catálogo e manifesto. Registrar um arquivo publica sua referência nas duas telas na próxima compilação/publicação. Um registro novo fica **Em revisão**; somente revisão explícita pode aprová-lo. Uma imagem de referência não equivale a sprite final testado na engine.

Preservar fonte, versão, autoria/direitos, brief e arquivos exportados. IDs nunca são reutilizados. Mudanças de prioridade devem ser justificadas; a importação não deve apagar o histórico de produção.

## 19. Critérios de aceite e testes

**Slice funcional:**

- Abrir e fechar um expediente sem travamento ou cliente preso.
- Alugar uma unidade e impedir outra locação simultânea dessa unidade.
- Devolver e inspecionar a unidade; restaurar disponibilidade corretamente.
- Reservar, usar, encerrar e liberar uma estação, cobrando uma única vez.
- Reconciliar saldo e transações no fechamento.
- Salvar/carregar sem duplicação de dinheiro, unidades ou sessões.
- Manter leitura correta de piso, personagens e móveis na escala de gameplay.

**Asset pronto para o jogo:** silhueta legível, projeção/escala/luz coerentes, direitos registrados, transparência e âncora corretas, variantes consistentes, fonte rastreável e teste na cena. Aprovação de uma referência visual não comprova esses critérios de integração.

Medidas de desempenho e hardware mínimo só podem ser estabelecidos após escolher engine e cena de teste. Os testes deste repositório validam o portal e seus dados, não o jogo.

## 20. Roadmap e dependências

1. Fechar plataforma, engine, câmera e unidade de escala.
2. Montar prova técnica com piso, balcão, estante, estação e personagem.
3. Implementar inventário por exemplar, atendimento, aluguel e devolução.
4. Integrar PC/console por hora, relógio e fechamento.
5. Testar salvamento, balancear o primeiro expediente e revisar os P0.
6. Expandir conteúdo e serviços após demonstrar o loop.

**Dependência crítica:** câmera/escala antes de renderizar lotes; inventário/transações antes de locação e venda; navegação/ocupação antes de estações; economia antes de upgrades; persistência antes de uma progressão longa.

## 21. Decisões abertas e riscos

| Decisão ou risco | Evidência | Próxima validação |
|---|---|---|
| Tile e projeção finais | A fonte trata 128 × 64 e 2:1 como referências | Cena em 1080p e tela menor |
| Direções e animações | Quatro direções propostas; execução final em aberto | Caminhada, interação e oclusão |
| Área externa | Pode ser cenário ou área jogável | Limitar à fachada no slice |
| Gerações de console | ELE-001 a ELE-004 são P0, DAT-002 cita três gerações | Definir quais três entram primeiro |
| Reutilização de bancada | FUR-013 e REP-001 têm funções próximas | Validar modelo compartilhado |
| Escopo de serviços | Oficina e usados aumentam o custo do MVP | Provar primeiro aluguel e jogo por hora |
| Economia sem números | Tabelas são itens a produzir | Simular demanda e custos |
| Multiplicação de variantes | Personagens × direções × animações × paletas | Estimar quadros, reutilizar bases |
| Salvamento e recuperação | Não detalhados no catálogo | Especificar e testar no MVP |
| Engine e publicação do jogo | Ausentes da fonte | Prova técnica antes de compromisso |

Este GDD é uma base de trabalho completa em cobertura de temas; as propostas e decisões abertas precisam ser validadas. Não representa um escopo fechado, orçamento aprovado ou jogo já implementado.
