# LOCADORA 2000 — Catálogo Mestre de Assets

**Subtítulo:** *A Game Shop Simulator*  
**Documento:** Inventário visual, sonoro e de conteúdo para produção  
**Versão:** 1.0  
**Data:** 19/10/2026  
**Status:** Base de produção; itens P0/P1/P2 sujeitos a validação durante o protótipo.

## 1. Objetivo e escopo

Este documento define os assets necessários para produzir **LOCADORA 2000**, um simulador de gerenciamento de uma locadora brasileira de videogames, com áreas de jogo por hora, venda de usados, manutenção, estoque, clientes recorrentes e progressão da loja. O jogo será apresentado em **2D isométrico**, com sprites de alta resolução e formas geométricas simples inspiradas em modelagem por blocos no Blockbench; os modelos 3D são ferramentas de produção, não necessariamente objetos 3D exibidos em tempo real.

O inventário é organizado por **assets-base**. Cores, tamanhos, estados, capas, desgaste, orientação e quantidade de estoque devem ser derivados de um mesmo asset sempre que possível, em vez de criar arquivos independentes para cada combinação. As contagens de variantes descritas na tabela são metas iniciais e podem ser ajustadas depois do protótipo.

## 2. Direção visual

### Princípio de arte

**2D isométrico ilustrado, geométrico e econômico em detalhes.** A aparência deve lembrar objetos construídos com blocos simples no Blockbench e convertidos em sprites: silhuetas claras, volumes legíveis, poucas cores, sombras planas e uma identidade calorosa de comércio de bairro brasileiro entre o fim dos anos 1990 e o começo dos anos 2000. Não é pixel art tradicional e não deve parecer uma renderização realista.

### Regras visuais

- **Projeção:** dimétrica/isométrica com grade de referência 2:1; tile-base recomendado de 128 × 64 px para protótipos, sujeito a teste na resolução-alvo.
- **Paleta:** aproximadamente 8–12 cores-base compartilhadas; cada asset deve usar preferencialmente 3–6 cores visíveis, com variações de claro/escuro em vez de gradientes complexos.
- **Cores de identidade:** azul profundo, azul médio, amarelo quente, creme, cinza-azulado, grafite, marrom madeira, verde planta e vermelho de acento. Manter saturação controlada e contraste suficiente para leitura.
- **Geometria:** caixas, prismas, cilindros simples e chanfros discretos; evitar detalhes minúsculos que desapareçam na escala normal de jogo.
- **Contorno:** ausente ou fino e consistente; não alternar aleatoriamente entre contorno grosso e sem contorno.
- **Sombreamento:** uma direção de luz fixa, sombras suaves/planas e sombra de contato separada quando for útil para posicionamento.
- **Texturas:** opcionais e mínimas; preferir cores planas, etiquetas, formas gráficas e desgaste pontual.
- **Cultura visual:** letreiros pintados, ventiladores, balcões, cartazes, caixas de jogos fictícios, fichários, televisores de tubo, cabos, adesivos e pequenos sinais de uso. Evitar logos, capas, personagens ou marcas comerciais reais sem autorização.
- **Legibilidade:** todo item deve ser reconhecível no tamanho em que aparece no jogo; detalhes de capa podem ser simplificados e reforçados por cor e ícone.
- **Consistência:** câmera, escala, âncora, luz, paleta e sombra devem ser compartilhadas por toda a biblioteca.

### Pipeline de criação recomendado

1. Criar modelos simples por blocos no **Blockbench** para móveis, eletrônicos e props geométricos.
2. Exportar os modelos em formato interoperável, preferencialmente GLB/glTF quando apropriado.
3. Usar **Blender** para câmera ortográfica/dimétrica, iluminação padronizada, fundo transparente e render em lote.
4. Fazer correções 2D pontuais em Krita/GIMP quando a imagem precisar de detalhes gráficos, etiquetas ou limpeza de silhueta.
5. Exportar PNG transparente, thumbnails e atlas; manter o arquivo-fonte e metadados junto ao sprite final.
6. Para capas, pôsteres e UI, produzir arte 2D original diretamente, sem obrigar cada elemento plano a passar pelo 3D.

### Padrões técnicos iniciais

| Propriedade | Padrão recomendado |
|---|---|
| Sprite comum | PNG com transparência |
| Tile de piso | 128 × 64 px (referência inicial) |
| Props pequenos | 128–256 px no maior eixo, conforme leitura |
| Móveis médios | 256–512 px no maior eixo |
| Fachadas/cenas | Composição modular ou render separado por camada |
| Personagens | Sheets separados por direção e animação |
| Direções de personagem | NE, NW, SE, SW; validar nomes conforme a convenção da engine |
| Quadros de caminhada | 6–8 por direção como alvo inicial |
| Origem/âncora | Documentada por asset; base do objeto ou ponto de contato com o chão |
| Sombra | Separada quando permitir recoloração, movimento ou ordenação mais limpa |
| Atlas | Separar por ambiente, mobiliário, eletrônicos, personagens, UI e efeitos |
| Nome de arquivo | `categoria_asset_variante_estado_direcao_v###.png` |

## 3. Loop de gameplay

### Fantasia central

O jogador começa com uma pequena locadora de bairro, poucos jogos, equipamentos usados e caixa limitado. Seu objetivo é transformar o negócio em um ponto de encontro da comunidade gamer, equilibrando rentabilidade, disponibilidade de produtos, condição dos equipamentos, reputação e satisfação dos clientes.

### Ciclo diário

1. **Preparar a loja:** organizar móveis e prateleiras, limpar, repor produtos, testar equipamentos, conferir reservas e definir preços ou promoções.
2. **Abrir o expediente:** clientes entram para alugar jogos, devolver itens, comprar acessórios, negociar usados, jogar por hora ou pedir recomendações.
3. **Atender e resolver problemas:** registrar transações, lidar com filas, atrasos, produtos danificados, estações ocupadas, reparos e clientes insatisfeitos.
4. **Gerenciar o negócio em tempo real:** acompanhar caixa, estoque, demanda, desgaste, energia, reputação e necessidades de contratação.
5. **Fechar a loja:** conferir dinheiro e devoluções, pagar despesas, avaliar resultados, encomendar mercadorias e planejar melhorias.
6. **Investir e progredir:** ampliar a loja, melhorar equipamentos, contratar funcionários, desbloquear novos produtos, sediar campeonatos e construir uma clientela recorrente.

### Ciclo de vida de um produto

**Comprar ou receber → inspecionar → limpar/testar/reparar → escolher destino (aluguel, venda, estação de jogo ou coleção) → usar e desgastar → reparar ou retirar de circulação → revender, descartar ou manter como raridade.** Um mesmo item pode passar por várias etapas, tornando estoque, condição física e valor de revenda parte central da gestão.

### Sistemas que precisam de suporte visual

- Locação, reserva, devolução, atraso e multas.
- Venda de jogos, acessórios, bebidas e snacks.
- Estações cobradas por hora, consoles, computadores e arcade.
- Compra e avaliação de produtos usados.
- Oficina de limpeza, diagnóstico e reparo.
- Estoque, pedidos, fornecedores, preços e finanças.
- Construção, decoração, expansão e melhorias.
- Clientes recorrentes, preferências, humor, filas e reputação.
- Eventos e campeonatos, com premiações e decoração temporária.

### Escopo de produção por prioridade

- **P0 — MVP:** indispensável para uma versão jogável que demonstre o loop principal.
- **P1 — Release inicial:** amplia variedade e profundidade, mas pode entrar depois de validar o protótipo.
- **P2 — Pós-MVP:** decoração avançada, eventos e detalhes que aumentam a riqueza sem bloquear o loop principal.

## 4. Como ler o catálogo

- **ID:** identificador estável para documentação, arquivos e referências cruzadas.
- **Nome:** nome humano do asset-base.
- **Categoria:** grupo funcional.
- **Descrição/função:** o que representa e como é usado no jogo.
- **Variações/estados:** derivações previstas sem necessariamente criar um novo modelo-base.
- **Prioridade:** P0, P1 ou P2 conforme o impacto no MVP.
- **Formato recomendado:** tipo de arquivo ou pacote de sprites a produzir.

**Observação:** a tabela é um catálogo de produção inicial abrangente, não uma ordem para desenhar tudo de uma vez. Começar pelos P0 usados na primeira loja jogável; criar os demais assets conforme os sistemas forem implementados.

## 5. Catálogo mestre de assets

### AMBIENTE E CONSTRUÇÃO

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| ENV-001 | Tile de piso neutro | Ambiente E Construção | Tile-base do chão interno da locadora; define a grade e o ritmo visual. | limpo, gasto, manchado | P0 | Sprite/atlas |
| ENV-002 | Piso cerâmico claro | Ambiente E Construção | Piso principal inspirado em lojas brasileiras dos anos 2000. | bege, cinza-claro | P0 | Sprite/atlas |
| ENV-003 | Piso xadrez | Ambiente E Construção | Piso decorativo para áreas de jogos ou entrada. | azul-creme, cinza-creme | P1 | Sprite/atlas |
| ENV-004 | Piso de borracha | Ambiente E Construção | Piso resistente para oficina e estoque. | preto, grafite | P1 | Sprite/atlas |
| ENV-005 | Piso externo de calçada | Ambiente E Construção | Base da calçada em frente à loja. | inteiro, rachado, remendado | P0 | Sprite/atlas |
| ENV-006 | Asfalto | Ambiente E Construção | Trecho de rua visível no entorno da loja. | seco, remendado | P1 | Sprite/atlas |
| ENV-007 | Meio-fio | Ambiente E Construção | Borda entre calçada e rua. | cinza, gasto | P1 | Sprite/atlas |
| ENV-008 | Parede interna baixa | Ambiente E Construção | Módulo de parede para layouts com visão aberta. | azul, creme, branco | P0 | Sprite modular |
| ENV-009 | Parede interna alta | Ambiente E Construção | Módulo de parede para áreas fechadas e fundos. | azul, creme, cartazes | P0 | Sprite modular |
| ENV-010 | Parede externa | Ambiente E Construção | Fachada lateral e traseira do edifício. | azul, amarelo, neutro | P0 | Sprite modular |
| ENV-011 | Canto interno de parede | Ambiente E Construção | Conecta paredes em ângulo sem emendas visíveis. | esquerdo, direito | P0 | Sprite modular |
| ENV-012 | Canto externo de parede | Ambiente E Construção | Fecha cantos externos do edifício. | esquerdo, direito | P0 | Sprite modular |
| ENV-013 | Rodapé | Ambiente E Construção | Acabamento na base das paredes. | azul, madeira, cinza | P2 | Sprite modular |
| ENV-014 | Porta de entrada | Ambiente E Construção | Porta principal da locadora, com área de passagem. | aberta, fechada | P0 | Sprite/estados |
| ENV-015 | Porta interna | Ambiente E Construção | Porta para oficina, escritório e estoque. | aberta, fechada | P1 | Sprite/estados |
| ENV-016 | Janela frontal | Ambiente E Construção | Janela de vitrine voltada para a rua. | clara, com adesivos | P0 | Sprite modular |
| ENV-017 | Janela lateral | Ambiente E Construção | Janela para iluminação e ambientação. | aberta, fechada | P2 | Sprite/estados |
| ENV-018 | Escada curta | Ambiente E Construção | Pequena mudança de nível ou acesso de depósito. | cinza, madeira | P2 | Sprite |
| ENV-019 | Coluna estrutural | Ambiente E Construção | Elemento de sustentação e quebra visual do espaço. | pintada, descascada | P2 | Sprite |
| ENV-020 | Grade de segurança | Ambiente E Construção | Grade metálica para janela ou porta de serviço. | preta, cinza | P1 | Sprite modular |
| ENV-021 | Toldo | Ambiente E Construção | Cobertura da entrada ou da vitrine. | azul-amarelo, vermelho-creme | P1 | Sprite |
| ENV-022 | Calha e cano | Ambiente E Construção | Detalhe externo de construção. | cinza, enferrujado | P2 | Sprite modular |

### FACHADA E EXTERIOR

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| EXT-001 | Fachada principal | Fachada E Exterior | Conjunto principal da frente da loja, com letreiro e vitrine. | dia, noite; limpa, desgastada | P0 | Composição |
| EXT-002 | Letreiro LOCADORA 2000 | Fachada E Exterior | Logo físico da loja em fachada. | aceso, apagado; níveis de melhoria | P0 | Sprite/estados |
| EXT-003 | Placa perpendicular | Fachada E Exterior | Placa que se projeta da fachada para a calçada. | azul-amarelo, antiga | P1 | Sprite |
| EXT-004 | Vitrine externa | Fachada E Exterior | Conjunto de vidro e suportes para produtos em destaque. | básica, melhorada | P0 | Sprite modular |
| EXT-005 | Adesivo de horário | Fachada E Exterior | Horário de funcionamento aplicado à porta. | aberto, fechado, feriado | P1 | Decal/2D |
| EXT-006 | Placa 'Alugam-se jogos' | Fachada E Exterior | Sinalização temática para comunicar a atividade. | português, inglês | P1 | Decal/2D |
| EXT-007 | Placa de promoção | Fachada E Exterior | Quadro externo com oferta do dia. | preço variável, liquidação | P0 | Sprite/variável |
| EXT-008 | Cavalete de calçada | Fachada E Exterior | Placa móvel de promoções. | aberto, recolhido | P1 | Sprite/estados |
| EXT-009 | Tapete de entrada | Fachada E Exterior | Tapete que marca a entrada e recebe sujeira. | limpo, sujo | P1 | Sprite/estados |
| EXT-010 | Lixeira externa | Fachada E Exterior | Lixeira junto à porta. | vazia, cheia | P1 | Sprite/estados |
| EXT-011 | Vaso externo | Fachada E Exterior | Planta decorativa para a fachada. | pequeno, grande | P2 | Sprite |
| EXT-012 | Banco de calçada | Fachada E Exterior | Assento para clientes esperando. | madeira, metal | P2 | Sprite |
| EXT-013 | Poste de iluminação | Fachada E Exterior | Iluminação da calçada à noite. | aceso, apagado | P2 | Sprite/estados |
| EXT-014 | Bicicleta estacionada | Fachada E Exterior | Veículo de cliente na calçada. | azul, vermelho, usado | P2 | Sprite |
| EXT-015 | Motocicleta estacionada | Fachada E Exterior | Veículo decorativo de cliente ou entregador. | cores variadas | P2 | Sprite |
| EXT-016 | Ponto de ônibus distante | Fachada E Exterior | Elemento de contexto urbano no cenário externo. | com placa, com banco | P2 | Sprite |
| EXT-017 | Banca de jornal distante | Fachada E Exterior | Estabelecimento de fundo para a rua. | fechada, aberta | P2 | Composição |
| EXT-018 | Fachada de lanchonete vizinha | Fachada E Exterior | Prédio vizinho que reforça o bairro. | dia, noite | P2 | Composição |
| EXT-019 | Fachada de assistência técnica | Fachada E Exterior | Vizinho ligado ao universo de eletrônicos. | básica, melhorada | P2 | Composição |
| EXT-020 | Caixa de energia externa | Fachada E Exterior | Detalhe de infraestrutura urbana. | intacta, envelhecida | P2 | Sprite |
| EXT-021 | Caixas de entrega na calçada | Fachada E Exterior | Volumes aguardando recebimento pela loja. | 1, 3, 5 caixas | P1 | Sprite/variação |

### MÓVEIS E MOBILIÁRIO COMERCIAL

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| FUR-001 | Balcão de atendimento | Móveis E Mobiliário Comercial | Balcão principal para aluguel, venda e devolução. | curto, longo; básico, melhorado | P0 | Sprite modular |
| FUR-002 | Balcão de caixa | Móveis E Mobiliário Comercial | Área de cobrança com espaço para terminal e sacolas. | básico, avançado | P0 | Sprite |
| FUR-003 | Balcão de exposição | Móveis E Mobiliário Comercial | Móvel para acessórios e itens de compra por impulso. | baixo, alto | P1 | Sprite |
| FUR-004 | Estante de jogos baixa | Móveis E Mobiliário Comercial | Prateleira baixa para capas e caixas de jogos. | vazia, meia, cheia | P0 | Sprite/estados |
| FUR-005 | Estante de jogos alta | Móveis E Mobiliário Comercial | Estante vertical para ampliar a capacidade de estoque exposto. | vazia, meia, cheia | P0 | Sprite/estados |
| FUR-006 | Estante dupla | Móveis E Mobiliário Comercial | Móvel central acessível pelos dois lados. | vazia, meia, cheia | P1 | Sprite/estados |
| FUR-007 | Estante de filmes | Móveis E Mobiliário Comercial | Prateleira para seção opcional de DVDs e filmes. | vazia, meia, cheia | P2 | Sprite/estados |
| FUR-008 | Vitrine de vidro | Móveis E Mobiliário Comercial | Móvel para itens raros e produtos caros. | vazia, ocupada, iluminada | P1 | Sprite/estados |
| FUR-009 | Expositor giratório | Móveis E Mobiliário Comercial | Expositor compacto para acessórios pequenos. | vazio, cheio | P2 | Sprite/estados |
| FUR-010 | Prateleira de parede | Móveis E Mobiliário Comercial | Módulo decorativo ou de produtos na parede. | curta, longa | P1 | Sprite modular |
| FUR-011 | Mesa de computador | Móveis E Mobiliário Comercial | Mesa para estação de lan house. | simples, dupla | P0 | Sprite |
| FUR-012 | Mesa de console | Móveis E Mobiliário Comercial | Mesa ou suporte para TV e console. | pequena, larga | P0 | Sprite |
| FUR-013 | Mesa de oficina | Móveis E Mobiliário Comercial | Bancada para diagnóstico e reparos. | básica, equipada | P0 | Sprite |
| FUR-014 | Mesa de escritório | Móveis E Mobiliário Comercial | Móvel do gerente para documentos e computador. | simples, executiva | P1 | Sprite |
| FUR-015 | Cadeira de madeira | Móveis E Mobiliário Comercial | Assento econômico para clientes e funcionários. | natural, pintada | P1 | Sprite |
| FUR-016 | Cadeira plástica | Móveis E Mobiliário Comercial | Cadeira barata e comum em ambientes de bairro. | azul, vermelha, branca | P0 | Sprite |
| FUR-017 | Cadeira giratória | Móveis E Mobiliário Comercial | Cadeira para estações de computador. | básica, confortável | P0 | Sprite |
| FUR-018 | Banco comprido | Móveis E Mobiliário Comercial | Assento coletivo para espera ou área de jogos. | madeira, metal | P1 | Sprite |
| FUR-019 | Sofá de dois lugares | Móveis E Mobiliário Comercial | Móvel para a área de consoles. | azul, vermelho, gasto | P1 | Sprite |
| FUR-020 | Poltrona | Móveis E Mobiliário Comercial | Assento individual para área premium. | cores variadas, usada | P2 | Sprite |
| FUR-021 | Armário de estoque | Móveis E Mobiliário Comercial | Armazenamento fechado para produtos e ferramentas. | baixo, alto | P1 | Sprite |
| FUR-022 | Arquivo de gavetas | Móveis E Mobiliário Comercial | Móvel para fichas e documentação da loja. | cinza, bege | P1 | Sprite |
| FUR-023 | Gaveteiro de balcão | Móveis E Mobiliário Comercial | Organizador para dinheiro, recibos e acessórios. | aberto, fechado | P1 | Sprite/estados |
| FUR-024 | Carrinho de reposição | Móveis E Mobiliário Comercial | Carrinho para transportar caixas dentro da loja. | vazio, carregado | P1 | Sprite/estados |
| FUR-025 | Lixeira interna | Móveis E Mobiliário Comercial | Recipiente para lixo da loja. | vazia, cheia | P0 | Sprite/estados |
| FUR-026 | Tapete decorativo | Móveis E Mobiliário Comercial | Tapete de área de jogos ou entrada. | liso, geométrico, logo | P2 | Sprite |
| FUR-027 | Biombo ou divisória | Móveis E Mobiliário Comercial | Separa áreas de atendimento e jogo. | curto, longo | P2 | Sprite |
| FUR-028 | Suporte de parede para controles | Móveis E Mobiliário Comercial | Exposição e armazenamento de controles. | vazio, ocupado | P1 | Sprite/estados |

### CONSOLES, TELAS E ELETRÔNICOS

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| ELE-001 | Console doméstico geração 1 | Consoles, Telas E Eletrônicos | Console fictício de cartuchos, visual simples e angular. | cinza, preto; ligado, desligado | P0 | Sprite/estados |
| ELE-002 | Console doméstico geração 2 | Consoles, Telas E Eletrônicos | Console fictício de 16-bit com detalhes coloridos. | preto, cinza | P0 | Sprite |
| ELE-003 | Console doméstico geração 3 | Consoles, Telas E Eletrônicos | Console fictício de 32/64-bit, corpo compacto. | cinza, preto | P0 | Sprite |
| ELE-004 | Console doméstico geração 4 | Consoles, Telas E Eletrônicos | Console fictício do início dos anos 2000. | preto, prata; ligado, desligado | P0 | Sprite/estados |
| ELE-005 | Console doméstico geração 5 | Consoles, Telas E Eletrônicos | Console fictício com design futurista para progressão avançada. | preto, branco | P2 | Sprite |
| ELE-006 | Console portátil monocromático | Consoles, Telas E Eletrônicos | Dispositivo portátil simples com tela verde. | cinza, roxo | P1 | Sprite |
| ELE-007 | Console portátil colorido | Consoles, Telas E Eletrônicos | Portátil com tela colorida e botões destacados. | azul, vermelho, amarelo | P1 | Sprite |
| ELE-008 | Console portátil avançado | Consoles, Telas E Eletrônicos | Portátil com tela maior para fase posterior. | prata, preto | P2 | Sprite |
| ELE-009 | Controle clássico | Consoles, Telas E Eletrônicos | Controle fictício com direcional e poucos botões. | cinza, preto, colorido | P0 | Sprite |
| ELE-010 | Controle de seis botões | Consoles, Telas E Eletrônicos | Controle para jogos de luta e arcade. | preto, colorido | P1 | Sprite |
| ELE-011 | Controle analógico | Consoles, Telas E Eletrônicos | Controle com alavancas e botões frontais. | cinza, preto | P0 | Sprite |
| ELE-012 | Controle sem fio | Consoles, Telas E Eletrônicos | Controle de geração posterior. | preto, branco | P2 | Sprite |
| ELE-013 | Controle quebrado | Consoles, Telas E Eletrônicos | Versão danificada usada em reparos ou negociação. | cabo rompido, botão faltando | P1 | Sprite/estado |
| ELE-014 | Televisão CRT pequena | Consoles, Telas E Eletrônicos | TV de tubo para estação individual. | 14, 20 polegadas; ligada, desligada | P0 | Sprite/estados |
| ELE-015 | Televisão CRT grande | Consoles, Telas E Eletrônicos | TV de tubo para área de jogos ou campeonato. | 21, 29 polegadas | P0 | Sprite |
| ELE-016 | Televisão LCD antiga | Consoles, Telas E Eletrônicos | Tela plana para progressão tecnológica. | ligada, desligada | P2 | Sprite/estados |
| ELE-017 | Monitor CRT | Consoles, Telas E Eletrônicos | Monitor de tubo para computador de lan house. | ligado, desligado | P0 | Sprite/estados |
| ELE-018 | Monitor LCD | Consoles, Telas E Eletrônicos | Monitor de computador para upgrade. | básico, avançado | P1 | Sprite |
| ELE-019 | Computador desktop | Consoles, Telas E Eletrônicos | Torre de PC com design de época. | bege, preto; lateral aberta | P0 | Sprite/estados |
| ELE-020 | Mini PC ou torre compacta | Consoles, Telas E Eletrônicos | Computador melhorado de menor volume. | preto, prata | P2 | Sprite |
| ELE-021 | Teclado | Consoles, Telas E Eletrônicos | Periférico de computador. | bege, preto; limpo, sujo | P0 | Sprite/estado |
| ELE-022 | Mouse | Consoles, Telas E Eletrônicos | Periférico de computador. | com fio, sem fio | P0 | Sprite |
| ELE-023 | Mousepad | Consoles, Telas E Eletrônicos | Base para mouse, inclusive versões promocionais. | liso, estampado | P1 | Sprite |
| ELE-024 | Fone de ouvido | Consoles, Telas E Eletrônicos | Fone usado por clientes em computadores. | simples, acolchoado | P0 | Sprite |
| ELE-025 | Caixas de som | Consoles, Telas E Eletrônicos | Par de alto-falantes de computador. | pequenas, grandes | P1 | Sprite |
| ELE-026 | Roteador | Consoles, Telas E Eletrônicos | Equipamento para conexão de rede. | básico, avançado; ligado, desligado | P1 | Sprite/estados |
| ELE-027 | Switch de rede | Consoles, Telas E Eletrônicos | Equipamento para conectar várias estações. | 8 portas, 16 portas | P2 | Sprite |
| ELE-028 | Modem antigo | Consoles, Telas E Eletrônicos | Equipamento de internet da época. | bege, preto | P1 | Sprite |
| ELE-029 | Estabilizador | Consoles, Telas E Eletrônicos | Equipamento elétrico comum em setups antigos. | cinza, bege | P1 | Sprite |
| ELE-030 | Filtro de linha | Consoles, Telas E Eletrônicos | Acessório de energia para várias estações. | 4, 6 tomadas | P1 | Sprite |
| ELE-031 | Nobreak | Consoles, Telas E Eletrônicos | Proteção de energia para equipamentos caros. | básico, avançado | P2 | Sprite |
| ELE-032 | Impressora | Consoles, Telas E Eletrônicos | Impressora de recibos ou documentos. | jato de tinta, matricial | P1 | Sprite/estados |
| ELE-033 | Leitor de código de barras | Consoles, Telas E Eletrônicos | Dispositivo de caixa para produtos cadastrados. | com fio, sem fio | P2 | Sprite |
| ELE-034 | Máquina de fliperama | Consoles, Telas E Eletrônicos | Cabine arcade com tela, botões e joystick. | jogo de luta, corrida, shooter | P1 | Sprite/skins |

### MÍDIA, JOGOS E COLECIONÁVEIS

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| MED-001 | Caixa de jogo para cartucho | Mídia, Jogos E Colecionáveis | Embalagem fictícia para jogos antigos. | várias cores e gêneros | P0 | Sprite/skins |
| MED-002 | Cartucho pequeno | Mídia, Jogos E Colecionáveis | Mídia física de console antigo. | cinza, colorido, etiqueta | P0 | Sprite/skins |
| MED-003 | Cartucho grande | Mídia, Jogos E Colecionáveis | Cartucho de formato maior para consoles clássicos. | cinza, preto, colorido | P1 | Sprite/skins |
| MED-004 | Caixa de jogo em CD | Mídia, Jogos E Colecionáveis | Embalagem de jogo em caixa de CD. | padrão, dupla | P0 | Sprite/skins |
| MED-005 | Caixa de jogo em DVD | Mídia, Jogos E Colecionáveis | Embalagem para jogos da geração 2000. | padrão, edição especial | P0 | Sprite/skins |
| MED-006 | Caixa de jogo portátil | Mídia, Jogos E Colecionáveis | Embalagem compacta para portátil. | cartonado, plástico | P1 | Sprite/skins |
| MED-007 | Manual de instruções | Mídia, Jogos E Colecionáveis | Livreto dentro de caixas de jogos. | fechado, aberto | P1 | Sprite |
| MED-008 | Disco de jogo | Mídia, Jogos E Colecionáveis | Mídia circular usada para aluguel e reparo. | limpo, riscado, quebrado | P0 | Sprite/estados |
| MED-009 | Disco de demonstração | Mídia, Jogos E Colecionáveis | Disco promocional para evento ou item barato. | várias capas | P2 | Sprite/skins |
| MED-010 | Caixa de DVD de filme | Mídia, Jogos E Colecionáveis | Mídia opcional para seção de filmes. | gêneros variados | P2 | Sprite/skins |
| MED-011 | Cartão de memória | Mídia, Jogos E Colecionáveis | Acessório para salvar progresso. | cinza, azul, transparente | P0 | Sprite/skins |
| MED-012 | Memory unit fictícia | Mídia, Jogos E Colecionáveis | Armazenamento removível de geração posterior. | preto, branco | P2 | Sprite |
| MED-013 | Adaptador de cartão | Mídia, Jogos E Colecionáveis | Acessório pequeno para conectar mídias. | cinza, preto | P2 | Sprite |
| MED-014 | Capa protetora de cartucho | Mídia, Jogos E Colecionáveis | Estojo ou capa para preservar mídia. | transparente, colorida | P2 | Sprite |
| MED-015 | Caixa de jogo rara | Mídia, Jogos E Colecionáveis | Versão especial com acabamento diferenciado. | selada, usada | P1 | Sprite/estados |
| MED-016 | Jogo falsificado | Mídia, Jogos E Colecionáveis | Item de procedência duvidosa para mecânica de inspeção. | capa genérica, etiqueta ruim | P1 | Sprite/estado |
| MED-017 | Jogo sem caixa | Mídia, Jogos E Colecionáveis | Mídia usada vendida sem embalagem. | cartucho, disco | P0 | Sprite |
| MED-018 | Lote de jogos usados | Mídia, Jogos E Colecionáveis | Conjunto de mídias comprado de clientes. | pequeno, médio, grande | P0 | Composição |
| MED-019 | Revista de videogame fictícia | Mídia, Jogos E Colecionáveis | Revista de época usada como decoração ou colecionável. | capas variadas | P1 | Sprite/skins |
| MED-020 | Guia de estratégia | Mídia, Jogos E Colecionáveis | Livro com dicas de jogos fictícios. | fino, grosso | P2 | Sprite |

### ACESSÓRIOS E PEQUENOS ELETRÔNICOS

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| ACC-001 | Cabo de energia | Acessórios E Pequenos Eletrônicos | Cabo de alimentação para console ou TV. | curto, longo; bom, danificado | P0 | Sprite/estados |
| ACC-002 | Cabo AV | Acessórios E Pequenos Eletrônicos | Cabo de vídeo composto para consoles antigos. | conectores coloridos | P0 | Sprite |
| ACC-003 | Cabo RF | Acessórios E Pequenos Eletrônicos | Cabo de antena para equipamento antigo. | enrolado, reto | P2 | Sprite |
| ACC-004 | Cabo de rede | Acessórios E Pequenos Eletrônicos | Cabo Ethernet para computadores. | cores variadas | P1 | Sprite |
| ACC-005 | Cabo USB | Acessórios E Pequenos Eletrônicos | Cabo para periféricos e acessórios posteriores. | curto, longo | P1 | Sprite |
| ACC-006 | Extensão elétrica | Acessórios E Pequenos Eletrônicos | Extensão para alimentar estações. | branca, preta | P1 | Sprite |
| ACC-007 | Adaptador de tomada | Acessórios E Pequenos Eletrônicos | Adaptador pequeno para compatibilidade elétrica. | simples, múltiplo | P1 | Sprite |
| ACC-008 | Bateria AA | Acessórios E Pequenos Eletrônicos | Pilha usada em controles e acessórios. | avulsa, par, pacote | P0 | Sprite |
| ACC-009 | Bateria recarregável | Acessórios E Pequenos Eletrônicos | Acessório de maior valor para dispositivos portáteis. | par, carregando | P2 | Sprite/estados |
| ACC-010 | Carregador portátil | Acessórios E Pequenos Eletrônicos | Carregador para console portátil. | básico, danificado | P1 | Sprite/estados |
| ACC-011 | Volante de corrida | Acessórios E Pequenos Eletrônicos | Periférico para estação especial. | básico, com pedais | P2 | Sprite |
| ACC-012 | Joystick arcade | Acessórios E Pequenos Eletrônicos | Controle com alavanca para fliperama. | preto, vermelho | P2 | Sprite |
| ACC-013 | Adaptador multijogador | Acessórios E Pequenos Eletrônicos | Acessório para conectar controles extras. | 2 portas, 4 portas | P1 | Sprite |
| ACC-014 | Câmera USB | Acessórios E Pequenos Eletrônicos | Webcam para estações de computador. | básica, avançada | P2 | Sprite |
| ACC-015 | Microfone | Acessórios E Pequenos Eletrônicos | Microfone para partidas e eventos. | mesa, headset | P2 | Sprite |
| ACC-016 | Pendrive antigo | Acessórios E Pequenos Eletrônicos | Armazenamento portátil de geração posterior. | pequeno, grande | P2 | Sprite |
| ACC-017 | Limpador de disco | Acessórios E Pequenos Eletrônicos | Kit para limpar mídias. | frasco, pano, kit completo | P0 | Sprite/estados |
| ACC-018 | Estojo de transporte | Acessórios E Pequenos Eletrônicos | Bolsa para console portátil ou acessórios. | preto, colorido | P1 | Sprite |
| ACC-019 | Película protetora | Acessórios E Pequenos Eletrônicos | Acessório pequeno para portátil. | embalagem, aplicada | P2 | Sprite/estados |
| ACC-020 | Chaveiro gamer fictício | Acessórios E Pequenos Eletrônicos | Brinde ou item de venda por impulso. | formas e cores variadas | P2 | Sprite/skins |

### OFICINA, DIAGNÓSTICO E REPARO

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| REP-001 | Bancada de reparo | Oficina, Diagnóstico E Reparo | Superfície principal para manutenção de consoles e controles. | básica, melhorada | P0 | Sprite |
| REP-002 | Tapete antiestático | Oficina, Diagnóstico E Reparo | Área segura para eletrônicos na bancada. | azul, verde | P1 | Sprite |
| REP-003 | Chave de fenda | Oficina, Diagnóstico E Reparo | Ferramenta manual de reparo. | pequena, média | P0 | Sprite |
| REP-004 | Jogo de chaves | Oficina, Diagnóstico E Reparo | Conjunto organizado de ferramentas. | básico, completo | P1 | Sprite |
| REP-005 | Alicate | Oficina, Diagnóstico E Reparo | Ferramenta para cabos e peças. | pequeno, grande | P1 | Sprite |
| REP-006 | Pinça | Oficina, Diagnóstico E Reparo | Ferramenta para componentes pequenos. | reta, curva | P1 | Sprite |
| REP-007 | Ferro de solda | Oficina, Diagnóstico E Reparo | Ferramenta para reparos eletrônicos avançados. | desligado, ligado | P2 | Sprite/estados |
| REP-008 | Estação de solda | Oficina, Diagnóstico E Reparo | Equipamento de oficina avançada. | básica, avançada | P2 | Sprite |
| REP-009 | Multímetro | Oficina, Diagnóstico E Reparo | Instrumento para diagnóstico elétrico. | desligado, medindo | P1 | Sprite/estados |
| REP-010 | Lupa com luminária | Oficina, Diagnóstico E Reparo | Equipamento para inspeção de componentes. | apagada, acesa | P2 | Sprite/estados |
| REP-011 | Ar comprimido | Oficina, Diagnóstico E Reparo | Lata para limpeza de poeira. | cheia, vazia | P1 | Sprite/estados |
| REP-012 | Pincel antiestático | Oficina, Diagnóstico E Reparo | Ferramenta de limpeza delicada. | limpo, usado | P1 | Sprite |
| REP-013 | Pano de microfibra | Oficina, Diagnóstico E Reparo | Pano para limpeza de telas e discos. | limpo, sujo | P0 | Sprite/estados |
| REP-014 | Álcool isopropílico | Oficina, Diagnóstico E Reparo | Frasco de produto de limpeza técnico. | cheio, quase vazio | P1 | Sprite/estados |
| REP-015 | Peças eletrônicas | Oficina, Diagnóstico E Reparo | Pequenos componentes usados em reparos. | capacitores, botões, conectores | P1 | Sprite/coleção |
| REP-016 | Carcaça de controle | Oficina, Diagnóstico E Reparo | Peça substituta para controle danificado. | cores variadas | P1 | Sprite/skins |
| REP-017 | Botões de reposição | Oficina, Diagnóstico E Reparo | Conjunto de botões para controles. | cores variadas | P1 | Sprite/coleção |
| REP-018 | Caixa de ferramentas | Oficina, Diagnóstico E Reparo | Organizador de ferramentas da oficina. | fechada, aberta | P1 | Sprite/estados |
| REP-019 | Console aberto para reparo | Oficina, Diagnóstico E Reparo | Estado visual de console desmontado. | gerações diferentes | P1 | Sprite/estados |
| REP-020 | Controle desmontado | Oficina, Diagnóstico E Reparo | Peças separadas para minijogo de reparo. | parcial, completo | P1 | Sprite/estados |
| REP-021 | Disco em teste | Oficina, Diagnóstico E Reparo | Mídia posicionada em equipamento de leitura. | funcionando, com erro | P1 | Sprite/estados |
| REP-022 | Estação de teste | Oficina, Diagnóstico E Reparo | Monitor, cabos e console usados para verificar funcionamento. | básica, avançada | P0 | Sprite |

### ESTOQUE, ENTREGA E ADMINISTRAÇÃO

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| STK-001 | Caixa de papelão pequena | Estoque, Entrega E Administração | Caixa para entrega e organização de acessórios. | fechada, aberta | P0 | Sprite/estados |
| STK-002 | Caixa de papelão média | Estoque, Entrega E Administração | Caixa para lotes de jogos e periféricos. | fechada, aberta | P0 | Sprite/estados |
| STK-003 | Caixa de papelão grande | Estoque, Entrega E Administração | Caixa para consoles e equipamentos. | fechada, aberta | P1 | Sprite/estados |
| STK-004 | Pilha de caixas | Estoque, Entrega E Administração | Conjunto de volumes aguardando conferência. | 2, 4, 6 caixas | P1 | Composição |
| STK-005 | Prateleira de estoque | Estoque, Entrega E Administração | Estante funcional para itens não expostos. | vazia, parcial, cheia | P0 | Sprite/estados |
| STK-006 | Caixa organizadora plástica | Estoque, Entrega E Administração | Recipiente para pequenos produtos. | azul, cinza, transparente | P1 | Sprite |
| STK-007 | Carrinho de carga | Estoque, Entrega E Administração | Carrinho para mover entregas. | vazio, carregado | P2 | Sprite/estados |
| STK-008 | Prancheta de inventário | Estoque, Entrega E Administração | Prancheta usada para conferir mercadorias. | vazia, com papel | P1 | Sprite/estados |
| STK-009 | Caderno de locações | Estoque, Entrega E Administração | Registro manual de aluguéis no início do jogo. | fechado, aberto | P0 | Sprite/estados |
| STK-010 | Fichário de clientes | Estoque, Entrega E Administração | Arquivo físico com cadastro dos clientes. | fechado, aberto | P1 | Sprite/estados |
| STK-011 | Calculadora | Estoque, Entrega E Administração | Ferramenta para contas rápidas. | desligada, ligada | P1 | Sprite/estados |
| STK-012 | Telefone fixo | Estoque, Entrega E Administração | Telefone para reservas e contato com fornecedores. | tocando, parado | P1 | Sprite/estados |
| STK-013 | Computador administrativo | Estoque, Entrega E Administração | Terminal para estoque, finanças e pedidos. | ligado, desligado | P0 | Sprite/estados |
| STK-014 | Impressora de recibos | Estoque, Entrega E Administração | Imprime comprovantes e etiquetas. | ociosa, imprimindo | P1 | Sprite/estados |
| STK-015 | Etiquetadora | Estoque, Entrega E Administração | Ferramenta para imprimir preço e código. | ociosa, trabalhando | P2 | Sprite/estados |
| STK-016 | Dinheiro em caixa | Estoque, Entrega E Administração | Representação visual de dinheiro e troco. | notas, moedas, maço | P0 | Sprite/variação |
| STK-017 | Cofre pequeno | Estoque, Entrega E Administração | Armazenamento de dinheiro após o fechamento. | fechado, aberto | P2 | Sprite/estados |
| STK-018 | Pasta de documentos | Estoque, Entrega E Administração | Pasta para notas fiscais e contratos. | azul, bege; aberta, fechada | P1 | Sprite/estados |

### DECORAÇÃO E IDENTIDADE CULTURAL

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| DEC-001 | Pôster de jogo de ação fictício | Decoração E Identidade Cultural | Pôster colorido com arte original para parede. | 3 capas | P0 | Sprite/skins |
| DEC-002 | Pôster de jogo de corrida fictício | Decoração E Identidade Cultural | Arte promocional para decoração. | 3 capas | P1 | Sprite/skins |
| DEC-003 | Pôster de jogo de luta fictício | Decoração E Identidade Cultural | Arte de campeonato e personagens originais. | 3 capas | P1 | Sprite/skins |
| DEC-004 | Pôster de jogo de aventura fictício | Decoração E Identidade Cultural | Pôster de fantasia ou aventura. | 3 capas | P1 | Sprite/skins |
| DEC-005 | Pôster de lançamento | Decoração E Identidade Cultural | Cartaz de novidade com espaço para título e data. | vários jogos | P0 | Template 2D |
| DEC-006 | Cartaz de promoção | Decoração E Identidade Cultural | Material de preço e desconto. | oferta, liquidação, combo | P0 | Template 2D |
| DEC-007 | Cartaz de campeonato | Decoração E Identidade Cultural | Anúncio de torneio local. | luta, corrida, futebol fictício | P1 | Template 2D |
| DEC-008 | Quadro de avisos | Decoração E Identidade Cultural | Painel para recados, eventos e pedidos. | vazio, ocupado | P1 | Sprite/estados |
| DEC-009 | Calendário de parede | Decoração E Identidade Cultural | Calendário de época para reforçar a ambientação. | meses e estados | P2 | Sprite/variável |
| DEC-010 | Relógio de parede | Decoração E Identidade Cultural | Relógio analógico para marcar o expediente. | redondo, quadrado | P1 | Sprite |
| DEC-011 | Ventilador de parede | Decoração E Identidade Cultural | Ventilador comum de loja de bairro. | parado, girando | P0 | Sprite/estados |
| DEC-012 | Ventilador de pedestal | Decoração E Identidade Cultural | Ventilador móvel para áreas quentes. | parado, girando | P1 | Sprite/estados |
| DEC-013 | Luminária pendente | Decoração E Identidade Cultural | Luz geral sobre o balcão. | acesa, apagada | P1 | Sprite/estados |
| DEC-014 | Luminária fluorescente | Decoração E Identidade Cultural | Iluminação de teto típica de comércio. | acesa, apagada, falhando | P0 | Sprite/estados |
| DEC-015 | Planta em vaso pequeno | Decoração E Identidade Cultural | Decoração de prateleira ou balcão. | 3 espécies | P1 | Sprite/skins |
| DEC-016 | Planta grande | Decoração E Identidade Cultural | Planta de chão para cantos da loja. | 3 espécies | P1 | Sprite/skins |
| DEC-017 | Aquário decorativo | Decoração E Identidade Cultural | Objeto opcional para loja avançada. | ligado, desligado | P2 | Sprite/estados |
| DEC-018 | Adesivo de marca fictícia | Decoração E Identidade Cultural | Adesivo para vitrine, PC ou balcão. | 6 designs | P1 | Decal/2D |
| DEC-019 | Bandeirinha de evento | Decoração E Identidade Cultural | Decoração temporária para campeonatos. | cores variadas | P2 | Sprite |
| DEC-020 | Faixa de inauguração | Decoração E Identidade Cultural | Decoração de evento de expansão. | intacta, desgastada | P2 | Sprite/estados |
| DEC-021 | Tapete com logo | Decoração E Identidade Cultural | Tapete personalizado da loja. | azul, amarelo | P1 | Sprite |
| DEC-022 | Relógio digital | Decoração E Identidade Cultural | Relógio eletrônico de parede ou balcão. | hora variável | P2 | Sprite/variável |
| DEC-023 | Caixa de som portátil | Decoração E Identidade Cultural | Fonte de música ambiente ou anúncio. | desligada, ligada | P2 | Sprite/estados |
| DEC-024 | Trofeu de campeonato | Decoração E Identidade Cultural | Recompensa exposta após eventos. | bronze, prata, ouro | P1 | Sprite/skins |

### ALIMENTOS, BEBIDAS E VENDA POR IMPULSO

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| CON-001 | Geladeira de bebidas | Alimentos, Bebidas E Venda Por Impulso | Geladeira vertical para bebidas e lanches. | fechada, aberta; vazia, abastecida | P1 | Sprite/estados |
| CON-002 | Máquina de refrigerante | Alimentos, Bebidas E Venda Por Impulso | Máquina de venda automática opcional. | ligada, desligada | P2 | Sprite/estados |
| CON-003 | Garrafa de refrigerante | Alimentos, Bebidas E Venda Por Impulso | Produto unitário de venda. | cola fictícia, laranja, limão | P0 | Sprite/skins |
| CON-004 | Lata de refrigerante | Alimentos, Bebidas E Venda Por Impulso | Bebida em lata para venda rápida. | 3 sabores | P0 | Sprite/skins |
| CON-005 | Garrafa de água | Alimentos, Bebidas E Venda Por Impulso | Produto de consumo básico. | pequena, grande | P0 | Sprite |
| CON-006 | Suco de caixinha | Alimentos, Bebidas E Venda Por Impulso | Bebida comum para público jovem. | 3 sabores | P1 | Sprite/skins |
| CON-007 | Pacote de salgadinho | Alimentos, Bebidas E Venda Por Impulso | Produto de venda por impulso. | 3 sabores fictícios | P0 | Sprite/skins |
| CON-008 | Pacote de biscoito | Alimentos, Bebidas E Venda Por Impulso | Lanche embalado. | doce, salgado | P1 | Sprite/skins |
| CON-009 | Barra de chocolate | Alimentos, Bebidas E Venda Por Impulso | Doce unitário para caixa. | 3 embalagens | P1 | Sprite/skins |
| CON-010 | Bala e chiclete | Alimentos, Bebidas E Venda Por Impulso | Pequenos produtos de caixa. | pote, pacote | P1 | Sprite |
| CON-011 | Pote de doces | Alimentos, Bebidas E Venda Por Impulso | Recipiente de balcão com doces variados. | vazio, cheio | P2 | Sprite/estados |
| CON-012 | Cafeteira | Alimentos, Bebidas E Venda Por Impulso | Equipamento de café para funcionários ou clientes. | desligada, ligada | P2 | Sprite/estados |
| CON-013 | Copo descartável | Alimentos, Bebidas E Venda Por Impulso | Copo para bebidas quentes ou frias. | vazio, cheio | P2 | Sprite/estados |
| CON-014 | Bandeja de lanches | Alimentos, Bebidas E Venda Por Impulso | Organiza itens de consumo. | vazia, ocupada | P2 | Sprite/estados |
| CON-015 | Expositor de snacks | Alimentos, Bebidas E Venda Por Impulso | Prateleira pequena junto ao caixa. | vazio, abastecido | P1 | Sprite/estados |
| CON-016 | Caixa de refrigerante | Alimentos, Bebidas E Venda Por Impulso | Embalagem para reposição de bebidas. | fechada, aberta | P1 | Sprite/estados |
| CON-017 | Máquina de água | Alimentos, Bebidas E Venda Por Impulso | Bebedouro ou filtro de água. | com galão, sem galão | P2 | Sprite/estados |

### PERSONAGENS E VARIAÇÕES VISUAIS

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| CHR-001 | Dono da locadora | Personagens E Variações Visuais | Personagem principal; roupa casual e silhueta reconhecível. | 3 roupas, 4 direções | P0 | Sprite sheet |
| CHR-002 | Atendente jovem | Personagens E Variações Visuais | Funcionário que opera caixa e devoluções. | 2 roupas, 4 direções | P0 | Sprite sheet |
| CHR-003 | Técnico de reparos | Personagens E Variações Visuais | Funcionário com roupa prática e acessórios de oficina. | 2 roupas, 4 direções | P1 | Sprite sheet |
| CHR-004 | Cliente estudante A | Personagens E Variações Visuais | Jovem cliente frequente após a escola. | 3 paletas, 4 direções | P0 | Sprite sheet |
| CHR-005 | Cliente estudante B | Personagens E Variações Visuais | Segundo perfil jovem para variedade visual. | 3 paletas, 4 direções | P0 | Sprite sheet |
| CHR-006 | Cliente adulto casual | Personagens E Variações Visuais | Cliente que aluga ou compra jogos. | 3 paletas, 4 direções | P0 | Sprite sheet |
| CHR-007 | Pai ou mãe cliente | Personagens E Variações Visuais | Cliente acompanhado de criança ou buscando presente. | 2 paletas, 4 direções | P1 | Sprite sheet |
| CHR-008 | Criança cliente | Personagens E Variações Visuais | Cliente jovem para eventos e horários escolares. | 3 paletas, 4 direções | P1 | Sprite sheet |
| CHR-009 | Colecionador | Personagens E Variações Visuais | Cliente com roupa e bolsa que sugerem cuidado com itens raros. | 2 paletas, 4 direções | P1 | Sprite sheet |
| CHR-010 | Cliente competitivo | Personagens E Variações Visuais | Jogador frequente que participa de campeonatos. | 2 paletas, 4 direções | P1 | Sprite sheet |
| CHR-011 | Cliente atrasado recorrente | Personagens E Variações Visuais | Perfil para eventos de devolução atrasada. | 2 paletas, 4 direções | P1 | Sprite sheet |
| CHR-012 | Cliente negociador | Personagens E Variações Visuais | Pessoa que oferece produtos usados para venda ou troca. | 2 paletas, 4 direções | P1 | Sprite sheet |
| CHR-013 | Entregador | Personagens E Variações Visuais | Personagem que traz caixas de fornecedores. | 2 roupas, 4 direções | P2 | Sprite sheet |
| CHR-014 | Representante de fornecedor | Personagens E Variações Visuais | NPC para pedidos e desbloqueios comerciais. | 2 paletas, 4 direções | P2 | Sprite sheet |
| CHR-015 | Concorrente lojista | Personagens E Variações Visuais | Personagem associado à loja rival. | 2 paletas, 4 direções | P2 | Sprite sheet |
| CHR-016 | Cliente idoso colecionador | Personagens E Variações Visuais | Cliente que busca títulos antigos e conversa com a equipe. | 2 paletas, 4 direções | P2 | Sprite sheet |
| CHR-017 | Cliente com mochila | Personagens E Variações Visuais | Variação visual de cliente que chega da escola. | 3 mochilas, 4 direções | P1 | Sprite sheet |
| CHR-018 | Cliente com sacola | Personagens E Variações Visuais | Variação para quem sai com compras. | 3 sacolas, 4 direções | P1 | Sprite sheet |
| CHR-019 | Silhuetas de multidão | Personagens E Variações Visuais | Personagens simplificados para eventos e fundo. | 6 silhuetas | P2 | Sprite sheet |
| CHR-020 | Mãos de interação | Personagens E Variações Visuais | Mãos estilizadas para close-ups de reparo ou atendimento. | neutras, segurando item | P2 | Sprite sheet |

### ANIMAÇÕES DE PERSONAGENS E OBJETOS

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| ANI-001 | Locomoção 4 direções | Animações De Personagens E Objetos | Ciclo de caminhada para NPCs e jogador. | NE, NW, SE, SW; 6–8 quadros | P0 | Sprite sheet |
| ANI-002 | Idle 4 direções | Animações De Personagens E Objetos | Animação curta de personagem parado. | 2–4 quadros por direção | P0 | Sprite sheet |
| ANI-003 | Atender no balcão | Animações De Personagens E Objetos | Animação de interação entre funcionário e cliente. | iniciar, atender, concluir | P0 | Sprite sheet |
| ANI-004 | Pegar e colocar item | Animações De Personagens E Objetos | Animação de recolher ou posicionar mercadoria. | caixa, jogo, acessório | P1 | Sprite sheet |
| ANI-005 | Carregar caixa | Animações De Personagens E Objetos | Caminhada com caixa ou pacote. | caixa pequena, média, grande | P1 | Sprite sheet |
| ANI-006 | Sentar | Animações De Personagens E Objetos | Transição para cadeira ou sofá. | 4 direções principais | P1 | Sprite sheet |
| ANI-007 | Jogar console | Animações De Personagens E Objetos | Personagem sentado usando controle. | vitória, neutro, frustrado | P0 | Sprite sheet |
| ANI-008 | Usar computador | Animações De Personagens E Objetos | Personagem sentado digitando ou usando mouse. | ocioso, digitando | P0 | Sprite sheet |
| ANI-009 | Conversar | Animações De Personagens E Objetos | Gestos simples de conversa. | neutro, animado, irritado | P1 | Sprite sheet |
| ANI-010 | Inspecionar produto | Animações De Personagens E Objetos | NPC ou jogador examinando jogo usado. | normal, suspeito, satisfeito | P1 | Sprite sheet |
| ANI-011 | Negociar preço | Animações De Personagens E Objetos | Gestos de oferta e recusa. | oferecer, pensar, aceitar, recusar | P1 | Sprite sheet |
| ANI-012 | Consertar equipamento | Animações De Personagens E Objetos | Animação de trabalho na bancada. | limpar, abrir, montar | P1 | Sprite sheet |
| ANI-013 | Entregar produto | Animações De Personagens E Objetos | Troca visual de item entre duas pessoas. | jogo, console, dinheiro | P1 | Sprite sheet |
| ANI-014 | Comemorar vitória | Animações De Personagens E Objetos | Animação de cliente vencendo campeonato. | curta, coletiva | P2 | Sprite sheet |
| ANI-015 | Reação negativa | Animações De Personagens E Objetos | Reclamação, frustração ou insatisfação. | espera, preço, produto defeituoso | P1 | Sprite sheet |
| ANI-016 | Usar telefone | Animações De Personagens E Objetos | Funcionário ou cliente falando ao telefone. | parado, andando | P2 | Sprite sheet |
| ANI-017 | Máquina arcade em uso | Animações De Personagens E Objetos | Efeito de tela e botões durante a partida. | idle, jogando | P2 | Sprite/efeito |
| ANI-018 | Porta abrindo | Animações De Personagens E Objetos | Animação de abertura da porta da loja. | abrir, fechar | P1 | Sprite sheet |
| ANI-019 | Luzes piscando | Animações De Personagens E Objetos | Animação para letreiro ou equipamento com falha. | lento, rápido | P2 | Sprite sheet |
| ANI-020 | Efeito de reposição | Animações De Personagens E Objetos | Pequena animação ao abastecer uma prateleira. | 1, 3, 5 itens | P1 | Sprite/efeito |

### INTERFACE, ÍCONES E HUD

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| UI-001 | Logo principal do jogo | Interface, Ícones E Hud | Marca LOCADORA 2000 para menus e materiais promocionais. | horizontal, compacto | P0 | PNG/SVG |
| UI-002 | Logo monocromático | Interface, Ícones E Hud | Versão para telas pequenas e documentos. | claro, escuro | P1 | PNG/SVG |
| UI-003 | Ícone de aplicativo | Interface, Ícones E Hud | Ícone de executável e loja digital. | 1024, 512, 256 px | P0 | PNG |
| UI-004 | Tela inicial | Interface, Ícones E Hud | Composição principal com loja, título e botões. | dia, noite | P0 | UI |
| UI-005 | Botões padrão | Interface, Ícones E Hud | Botões de menu e confirmação. | normal, hover, pressionado, desativado | P0 | UI atlas |
| UI-006 | Ícones de navegação | Interface, Ícones E Hud | Ícones de voltar, fechar, confirmar e avançar. | claro, escuro | P0 | UI atlas |
| UI-007 | Ícone de dinheiro | Interface, Ícones E Hud | Representa caixa e saldo. | pequeno, grande | P0 | UI icon |
| UI-008 | Ícone de reputação | Interface, Ícones E Hud | Representa reputação e avaliações da loja. | níveis | P0 | UI icon |
| UI-009 | Ícone de popularidade | Interface, Ícones E Hud | Representa demanda de jogos e categorias. | baixo, médio, alto | P0 | UI icon |
| UI-010 | Ícone de estoque | Interface, Ícones E Hud | Acesso ao inventário e mercadorias. | normal, alerta | P0 | UI icon |
| UI-011 | Ícone de aluguel | Interface, Ícones E Hud | Representa empréstimos e devoluções. | normal, atrasado | P0 | UI icon |
| UI-012 | Ícone de reparo | Interface, Ícones E Hud | Representa oficina e manutenção. | normal, urgente | P1 | UI icon |
| UI-013 | Ícone de cliente | Interface, Ícones E Hud | Representa perfil, humor e histórico de cliente. | normal, satisfeito, irritado | P0 | UI icon |
| UI-014 | Ícones de categorias de jogo | Interface, Ícones E Hud | Ações, corrida, esporte, aventura, puzzle e luta fictícios. | 6–10 categorias | P0 | UI atlas |
| UI-015 | Ícones de consoles | Interface, Ícones E Hud | Representação dos consoles fictícios na interface. | todas as gerações | P0 | UI atlas |
| UI-016 | Ícones de acessórios | Interface, Ícones E Hud | Representação de cabos, controles, memória e periféricos. | 12–20 ícones | P1 | UI atlas |
| UI-017 | Painel de caixa | Interface, Ícones E Hud | Interface para vendas e pagamentos. | compacto, expandido | P0 | UI |
| UI-018 | Painel de locação | Interface, Ícones E Hud | Interface de alugar, reservar e devolver jogos. | normal, atraso | P0 | UI |
| UI-019 | Painel de cliente | Interface, Ícones E Hud | Ficha de cliente, preferências e histórico. | resumo, completo | P0 | UI |
| UI-020 | Painel de inventário | Interface, Ícones E Hud | Lista de produtos, quantidades e condições. | lista, grade | P0 | UI |
| UI-021 | Painel de pedidos | Interface, Ícones E Hud | Interface de compra de fornecedores. | catálogo, carrinho, entrega | P1 | UI |
| UI-022 | Painel de finanças | Interface, Ícones E Hud | Resumo de receita, despesas, lucro e caixa. | diário, semanal | P0 | UI |
| UI-023 | Painel de funcionários | Interface, Ícones E Hud | Contratação, escala, salário e habilidade. | lista, perfil | P1 | UI |
| UI-024 | Painel de decoração | Interface, Ícones E Hud | Seleção e posicionamento de móveis. | selecionar, girar, colocar, cancelar | P0 | UI |
| UI-025 | Painel de construção | Interface, Ícones E Hud | Compra de módulos de piso, paredes e expansão. | categorias | P1 | UI |
| UI-026 | Painel de oficina | Interface, Ícones E Hud | Fila de reparos, diagnóstico e resultado. | simples, avançado | P1 | UI |
| UI-027 | Painel de campeonato | Interface, Ícones E Hud | Inscrição, chaves, prêmios e resultados. | pré-evento, em curso, final | P2 | UI |
| UI-028 | Painel de objetivos | Interface, Ícones E Hud | Missões, metas diárias e marcos de progressão. | ativo, concluído, falhou | P0 | UI |
| UI-029 | Painel de notificações | Interface, Ícones E Hud | Avisos de chegada, atraso, estoque e eventos. | info, alerta, sucesso | P0 | UI |
| UI-030 | Tooltip de item | Interface, Ícones E Hud | Nome, preço, condição, demanda e ações possíveis. | compacto, detalhado | P0 | UI |
| UI-031 | Barra de tempo | Interface, Ícones E Hud | Indicação de hora, expediente e dia da semana. | aberto, fechado | P0 | UI |
| UI-032 | Menu de pausa | Interface, Ícones E Hud | Continuar, opções, salvar e sair. | padrão | P0 | UI |
| UI-033 | Menu de configurações | Interface, Ícones E Hud | Áudio, vídeo, idioma, controles e acessibilidade. | abas | P0 | UI |
| UI-034 | Tela de carregamento | Interface, Ícones E Hud | Ilustração da loja com dicas de gameplay. | variações | P1 | UI |
| UI-035 | Tela de fim de dia | Interface, Ícones E Hud | Resumo de receita, custos, reputação e eventos. | resultado bom, neutro, ruim | P0 | UI |
| UI-036 | Tela de falência ou recuperação | Interface, Ícones E Hud | Apresenta consequências financeiras e opções de recuperação. | alerta, recuperação | P1 | UI |
| UI-037 | Tela de tutorial | Interface, Ícones E Hud | Explica ações básicas com imagens e etapas. | por sistema | P0 | UI |
| UI-038 | Cursor de interação | Interface, Ícones E Hud | Cursor ou marcador para selecionar objetos. | normal, válido, inválido | P0 | UI |
| UI-039 | Indicador de alcance | Interface, Ícones E Hud | Mostra área em que o jogador pode interagir. | válido, bloqueado | P1 | UI |
| UI-040 | Grade de posicionamento | Interface, Ícones E Hud | Overlay de células durante construção. | livre, ocupado, inválido | P0 | UI |

### EFEITOS VISUAIS

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| VFX-001 | Sombra padrão de objeto | Efeitos Visuais | Sombra suave consistente para objetos colocados no cenário. | pequena, média, grande | P0 | Sprite/overlay |
| VFX-002 | Sombra de personagem | Efeitos Visuais | Sombra de contato sob personagens. | parado, andando | P0 | Sprite/overlay |
| VFX-003 | Brilho de objeto selecionado | Efeitos Visuais | Realce de interação sem contorno pesado. | normal, foco | P0 | Overlay |
| VFX-004 | Partículas de poeira | Efeitos Visuais | Pequenas partículas durante limpeza ou reforma. | leve, intensa | P2 | Sprite sheet |
| VFX-005 | Efeito de limpeza | Efeitos Visuais | Brilho curto ao limpar disco, balcão ou móvel. | pequeno, grande | P1 | Sprite sheet |
| VFX-006 | Efeito de reparo concluído | Efeitos Visuais | Feedback visual para item consertado. | simples, raro | P1 | Sprite sheet |
| VFX-007 | Efeito de dinheiro | Efeitos Visuais | Pequena animação de recebimento de pagamento. | venda, aluguel | P1 | Sprite sheet |
| VFX-008 | Ícone flutuante de satisfação | Efeitos Visuais | Indicador de reação acima do cliente. | feliz, neutro, irritado | P0 | UI/VFX |
| VFX-009 | Ícone flutuante de pensamento | Efeitos Visuais | Balão com necessidade ou produto desejado. | jogo, bebida, estação, ajuda | P1 | UI/VFX |
| VFX-010 | Efeito de falha elétrica | Efeitos Visuais | Piscar ou faísca estilizada em equipamento com defeito. | leve, forte | P2 | Sprite sheet |
| VFX-011 | Transição de dia/noite | Efeitos Visuais | Overlay ou mudança gradual de iluminação do cenário. | manhã, tarde, noite | P1 | Shader/overlay |
| VFX-012 | Confete de campeonato | Efeitos Visuais | Efeito de celebração em eventos. | curto, coletivo | P2 | Sprite sheet |

### ÁUDIO E MÚSICA

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| AUD-001 | Tema principal | Áudio E Música | Música de identidade do jogo, nostálgica e acolhedora. | menu, versão curta | P0 | OGG/WAV |
| AUD-002 | Música ambiente da loja | Áudio E Música | Loop musical leve para expediente. | dia, noite | P0 | OGG |
| AUD-003 | Música de campeonato | Áudio E Música | Faixa mais energética para eventos. | pré-evento, final | P2 | OGG |
| AUD-004 | Ambiência de rua | Áudio E Música | Som discreto de bairro, trânsito distante e pássaros. | dia, noite | P1 | OGG loop |
| AUD-005 | Ambiência de loja | Áudio E Música | Murmúrio de clientes, ventilador e aparelhos. | baixa, cheia | P0 | OGG loop |
| AUD-006 | Som de porta | Áudio E Música | Campainha ou rangido ao abrir a entrada. | abrir, fechar | P0 | WAV |
| AUD-007 | Passos do jogador | Áudio E Música | Passos estilizados sobre diferentes pisos. | cerâmica, concreto, madeira | P1 | WAV |
| AUD-008 | Som de caixa registradora | Áudio E Música | Feedback de pagamento e abertura de caixa. | abrir, fechar, cobrar | P0 | WAV |
| AUD-009 | Som de dinheiro | Áudio E Música | Efeito curto de venda ou pagamento. | moedas, notas | P1 | WAV |
| AUD-010 | Som de seleção de UI | Áudio E Música | Feedback de foco e confirmação. | hover, confirmar, cancelar | P0 | WAV |
| AUD-011 | Som de alerta | Áudio E Música | Notificação de atraso, estoque baixo ou evento. | leve, urgente | P0 | WAV |
| AUD-012 | Som de CRT ligado | Áudio E Música | Ruído curto de ativação de TV de tubo. | ligar, desligar | P1 | WAV |
| AUD-013 | Som de computador | Áudio E Música | Inicialização e operação de PC antigo. | ligar, erro, desligar | P1 | WAV |
| AUD-014 | Som de jogo arcade | Áudio E Música | Bipes genéricos originais para máquinas da loja. | idle, partida | P1 | WAV |
| AUD-015 | Som de controle | Áudio E Música | Cliques de botões e direcional. | leve, intenso | P1 | WAV |
| AUD-016 | Som de disco | Áudio E Música | Ejeção e inserção de mídia. | CD, cartucho | P1 | WAV |
| AUD-017 | Som de limpeza | Áudio E Música | Pano ou escova limpando superfície. | curto, longo | P1 | WAV |
| AUD-018 | Som de ferramenta | Áudio E Música | Cliques, parafusos e pequenos reparos. | abrir, montar, testar | P1 | WAV |
| AUD-019 | Som de sucesso | Áudio E Música | Feedback positivo para meta ou upgrade. | curto, importante | P0 | WAV |
| AUD-020 | Som de falha | Áudio E Música | Feedback para reparo malsucedido ou objetivo perdido. | leve, forte | P1 | WAV |
| AUD-021 | Vozes não verbais de clientes | Áudio E Música | Pequenos murmúrios sem diálogo inteligível. | feliz, neutro, frustrado | P2 | WAV |
| AUD-022 | Som de chuva | Áudio E Música | Ambiência climática opcional para o exterior. | leve, forte | P2 | OGG loop |

### DADOS, TEXTO E CONTEÚDO DE JOGO

| ID | Nome do asset | Categoria | Descrição / função | Variações / estados previstos | Prioridade | Formato recomendado |
|---|---|---|---|---|---|---|
| DAT-001 | Catálogo de jogos fictícios | Dados, Texto E Conteúdo De Jogo | Dados de títulos, gênero, popularidade, preço, raridade e condição. | 50 títulos no MVP; expansão posterior | P0 | JSON/CSV |
| DAT-002 | Catálogo de consoles fictícios | Dados, Texto E Conteúdo De Jogo | Dados de gerações, custo, confiabilidade e compatibilidade. | 3 gerações no MVP | P0 | JSON/CSV |
| DAT-003 | Catálogo de acessórios | Dados, Texto E Conteúdo De Jogo | Dados de cabos, controles, periféricos e preços. | 20+ itens | P0 | JSON/CSV |
| DAT-004 | Catálogo de bebidas e snacks | Dados, Texto E Conteúdo De Jogo | Dados de custo, preço de venda e demanda. | 8–12 itens | P1 | JSON/CSV |
| DAT-005 | Perfis de clientes | Dados, Texto E Conteúdo De Jogo | Preferências, orçamento, paciência, hábitos e chance de retorno. | 10 perfis-base | P0 | JSON |
| DAT-006 | Tabela de preços iniciais | Dados, Texto E Conteúdo De Jogo | Preços de compra, aluguel, venda e reparo. | por categoria | P0 | JSON/CSV |
| DAT-007 | Tabela de fornecedores | Dados, Texto E Conteúdo De Jogo | Catálogo, prazo, preço e confiabilidade de cada fornecedor. | 3 fornecedores no MVP | P1 | JSON |
| DAT-008 | Tabela de reparos | Dados, Texto E Conteúdo De Jogo | Defeitos, ferramentas necessárias, custo e probabilidade de sucesso. | por classe de dispositivo | P1 | JSON |
| DAT-009 | Eventos aleatórios | Dados, Texto E Conteúdo De Jogo | Ocorrências de loja, bairro, estoque e clientes. | 20 eventos iniciais | P1 | JSON |
| DAT-010 | Metas e conquistas | Dados, Texto E Conteúdo De Jogo | Objetivos de progressão e recompensas. | 15–25 metas | P0 | JSON |
| DAT-011 | Textos de tutorial | Dados, Texto E Conteúdo De Jogo | Passo a passo das primeiras ações do jogador. | tutorial inicial e dicas contextuais | P0 | CSV/JSON |
| DAT-012 | Textos de notificações | Dados, Texto E Conteúdo De Jogo | Mensagens de alerta, sucesso, eventos e necessidades. | por sistema | P0 | CSV/JSON |
| DAT-013 | Textos de diálogos | Dados, Texto E Conteúdo De Jogo | Fal falas curtas para clientes e funcionários. | linhas modulares por perfil | P1 | CSV/JSON |
| DAT-014 | Nomes de jogos e capas | Dados, Texto E Conteúdo De Jogo | Banco de títulos e briefings de capas originais. | por gênero e geração | P0 | JSON + sprites |
| DAT-015 | Localização pt-BR | Dados, Texto E Conteúdo De Jogo | Textos, moeda, datas, horários e formatos brasileiros. | idioma inicial | P0 | CSV/JSON |
| DAT-016 | Localização en-US | Dados, Texto E Conteúdo De Jogo | Tradução de interface e conteúdo para mercado internacional. | primeira tradução | P1 | CSV/JSON |
| DAT-017 | Tabela de balanceamento | Dados, Texto E Conteúdo De Jogo | Parâmetros de economia, demanda, desgaste e progressão. | MVP e curvas de progressão | P0 | CSV/JSON |
| DAT-018 | Tabela de compatibilidade | Dados, Texto E Conteúdo De Jogo | Compatibilidade entre jogos, consoles e acessórios. | regras por geração | P1 | JSON |

## 6. Checklist de produção

Para cada asset visual, preencher e validar:

- [ ] ID e nome estáveis.
- [ ] Brief visual e referência aprovada.
- [ ] Silhueta legível no tamanho final.
- [ ] Paleta compatível com a bíblia visual.
- [ ] Câmera e direção isométrica corretas.
- [ ] Âncora/pivô e footprint documentados.
- [ ] Estados e variantes definidos sem duplicação desnecessária.
- [ ] PNG transparente exportado e sem pixels soltos.
- [ ] Sprite conferido em escala de gameplay.
- [ ] Arquivo-fonte Blockbench/Blender/2D preservado.
- [ ] Metadados, direitos e origem da referência registrados.
- [ ] Asset importado e testado dentro da cena.

## 7. Regras de nomenclatura

Usar nomes ASCII em minúsculas, sem espaços e sem acentos. Exemplos:

```text
env_floor_tile_ceramic_clean_v001.png
fur_shelf_games_medium_full_blue_v001.png
ele_console_gen02_off_v001.png
chr_customer_student_a_walk_se_v001.png
ui_icon_rental_overdue_v001.png
aud_sfx_register_payment_v001.ogg
```

IDs não devem mudar quando o nome de exibição for revisado. Se um asset for removido, marcar como `deprecated` no registro em vez de reutilizar o ID para outro objeto.

## 8. Critérios de aceite

Um asset está pronto quando:

1. É reconhecível na resolução normal de jogo.
2. Mantém a mesma projeção, escala e iluminação dos assets vizinhos.
3. Não usa marcas, personagens, logos ou capas protegidas sem autorização.
4. Tem transparência, recorte e âncora corretos.
5. Suas variantes são derivadas de forma consistente.
6. Foi testado sobre pisos, paredes e objetos de tamanhos diferentes.
7. Tem arquivo-fonte e versão exportada rastreáveis.

## 9. Resumo do inventário

- **Total de assets-base catalogados:** 358
- **P0 (MVP):** 130
- **P1 (release inicial):** 150
- **P2 (pós-MVP):** 78

| Categoria | Prefixo | Quantidade de assets-base |
|---|---|---:|
| Ambiente E Construção | ENV | 22 |
| Fachada E Exterior | EXT | 21 |
| Móveis E Mobiliário Comercial | FUR | 28 |
| Consoles, Telas E Eletrônicos | ELE | 34 |
| Mídia, Jogos E Colecionáveis | MED | 20 |
| Acessórios E Pequenos Eletrônicos | ACC | 20 |
| Oficina, Diagnóstico E Reparo | REP | 22 |
| Estoque, Entrega E Administração | STK | 18 |
| Decoração E Identidade Cultural | DEC | 24 |
| Alimentos, Bebidas E Venda Por Impulso | CON | 17 |
| Personagens E Variações Visuais | CHR | 20 |
| Animações De Personagens E Objetos | ANI | 20 |
| Interface, Ícones E Hud | UI | 40 |
| Efeitos Visuais | VFX | 12 |
| Áudio E Música | AUD | 22 |
| Dados, Texto E Conteúdo De Jogo | DAT | 18 |

## 10. Decisões ainda a validar no protótipo

1. Resolução final dos sprites e tamanho de tile após testar em 1080p e em telas menores.
2. Se a câmera usará 2:1 estrito ou projeção dimétrica ligeiramente ajustada.
3. Se os personagens serão totalmente renderizados de modelos 3D simples ou terão acabamento 2D manual.
4. Quantas direções de movimento serão necessárias para a primeira versão.
5. Se a área externa será jogável ou apenas cenário decorativo.
6. Quais atividades entram no MVP: aluguel, venda, jogo por hora, reparo e compra de usados são as candidatas principais.
7. Quais efeitos e sons terão prioridade após a primeira build jogável.

---

**Próxima ação recomendada:** usar este catálogo para filtrar os assets P0 e produzir primeiro um vertical slice contendo uma sala pequena, balcão, duas estantes, uma estação de console, uma estação de PC, três personagens, um ciclo de aluguel e uma devolução.