# Plano de Implementação — Sales Page Full Kontakt Pro

> Roteiro para agente de desenvolvimento (Claude Code). Baseado em pesquisa de referências reais de sales pages de bibliotecas Kontakt/samples e inspirações de páginas de música.

## 1. Referências Pesquisadas

### 1.1 Sales pages de bibliotecas Kontakt / samples

**Kontakt 8 — Native Instruments** ([link](https://www.native-instruments.com/en/products/komplete/samplers/kontakt-8/))
- Navegação por abas internas: Overview, Sounds, Tools, Ecosystem, Downloads
- Hero com preço em destaque + CTA "Add to cart"
- 4 vídeos demonstrativos (YouTube embed) mostrando ferramentas em ação
- Player de áudio embutido com demos do instrumento
- Ícones de categorias de som (Orchestral, Acoustic, Band, Beats, Choir, Synths, Vintage)
- Prova social textual ("Oscar-winning scores, major TV shows")
- Tabela comparativa: versão gratuita (Player) vs. paga (completa)

**Albion ONE — Spitfire Audio** ([link](https://www.spitfireaudio.com/en-us/products/albion-one))
- Abas internas: Overview, Listen, Walkthrough, What's included, Tech specs
- 4 atributos-chave com ícones logo abaixo do hero (nº de músicos, articulações, engine, player)
- Seção "Listen to Albion ONE": 10 faixas de demonstração reproduzíveis, feitas por artistas diferentes (prova social por associação)
- 3 vídeos (update, tutorial geral, scoring to picture)
- Capturas de tela da interface (5 painéis diferentes)
- Selo Trustpilot integrado
- Desconto para estudantes/educadores (40%) como gatilho de segmentação
- Seção dedicada de especificações técnicas (SO, tamanho de instalação, versão mínima do Player)
- FAQ para iniciantes

**Output Arcade** ([link](https://output.com/products/arcade))
- Proposta de valor direta no hero: "Perform, shape, and tweak thousands of mix-ready samples so you can sound entirely original"
- Foco em interatividade do produto (plugin "playable") como diferencial visual

**Splice** ([link](https://splice.com/sounds))
- Busca em linguagem natural ("soulful vocal chops", "hip hop kick")
- Filtros por gênero, instrumento, BPM e tom (key) — metadados visuais junto à waveform
- Preview individual de cada som com um clique
- Sistema de "créditos" para download (modelo de oferta diferente de compra única)

**Cymatics — ORACLE Sample Pack** ([link](https://cymatics.fm/pages/oracle-sample-pack))
- Funil clássico: Hero → Proposta de valor → Detalhamento dos itens inclusos → CTA
- Empilhamento de valor: mostra preço individual de cada componente (Sample Pack + MIDI + 808) somado ao "valor total", ancorando a oferta
- Gatilhos de copy: problema → solução ("stuck trying to build a melody from scratch" → "step your melody game up")
- Linguagem de urgência/oferta grátis por tempo limitado

### 1.2 Inspirações de páginas de música para sales pages

- **Awwwards — Music & Sound** ([link](https://www.awwwards.com/websites/music-sound/)): sites premiados combinam áudio interativo com visual (WebGL, animações CSS/JS) e navegação simplificada — útil para hero animado e transições entre seções
- **wavesurfer.js** ([link](https://wavesurfer.xyz/)) e **WaveformPlayer** ([link](https://waveformplayer.com/)): bibliotecas JS leves para renderizar waveform real do áudio com play/pause, ideais para substituir o player de áudio genérico do navegador por um visual customizado (cor de marca, progresso na waveform)

## 2. Padrões Recorrentes a Aplicar

1. **Hero direto**: nome do produto + tagline de benefício + preço + CTA principal, sem rolagem necessária para decidir a primeira ação
2. **Navegação por abas/âncoras internas**: Visão geral, Ouça, Conteúdo incluso, Requisitos, FAQ
3. **Prova de qualidade sonora antes de qualquer texto longo**: player com waveform customizada tocando demos reais logo abaixo do hero
4. **Ancoragem de valor**: listar os componentes do pacote com preço individual somado, mostrando o "desconto" da oferta combinada
5. **Especificações técnicas em seção própria**: requisitos de sistema, tamanho em disco, versão mínima do Kontakt/Kontakt Player necessária
6. **Prova social**: depoimentos de músicos/produtores, selos de avaliação (Trustpilot ou equivalente local), menção a usos reais (trilhas, lançamentos)
7. **FAQ para reduzir objeções** (compatibilidade, forma de entrega, suporte)
8. **CTA repetido** em pontos estratégicos (hero, após demos, antes do FAQ, rodapé)

## 3. Plano de Implementação (passo a passo)

### Fase 1 — Estrutura e conteúdo
- [ ] Definir copy do hero (nome, tagline, preço, CTA) e 3–4 diferenciais em bullets/ícones
- [ ] Selecionar 6–10 demos de áudio representativos da biblioteca para a seção "Ouça"
- [ ] Escrever descrição do que está incluso (nº de patches, articulações, kits, presets)
- [ ] Levantar especificações técnicas (SO suportado, versão do Kontakt/Player, tamanho em GB)
- [ ] Redigir FAQ (mínimo 6 perguntas: compatibilidade, entrega, reembolso, uso comercial, atualizações, suporte)

### Fase 2 — Componentes de UI
- [ ] Hero com CTA fixo (sticky) ao rolar a página
- [ ] Player de áudio customizado com waveform (via `wavesurfer.js`) para cada demo, com botão play/pause e barra de progresso na cor da marca
- [ ] Seção de navegação por âncoras (Overview / Listen / What's Included / Tech Specs / FAQ)
- [ ] Bloco de ancoragem de preço (valor individual dos itens somado vs. preço final)
- [ ] Carrossel ou grid de screenshots da interface do instrumento dentro do Kontakt
- [ ] Selo/bloco de prova social (avaliações, depoimentos, logos de quem usa)
- [ ] Tabela de especificações técnicas em formato responsivo (accordion no mobile)
- [ ] Componente de FAQ em accordion
- [ ] Rodapé com CTA final + links de suporte/política de reembolso

### Fase 3 — Interatividade e performance
- [ ] Lazy loading dos arquivos de áudio (carregar waveform sob demanda, ao entrar em viewport)
- [ ] Apenas um player tocando por vez (pausar os demais automaticamente ao iniciar novo áudio)
- [ ] Testar carregamento em conexão 3G/4G simulada (arquivos de áudio/imagens otimizados)
- [ ] Garantir que vídeos (se usados) sejam embed leve (thumbnail + play sob clique, não autoplay)

### Fase 4 — Validação
- [ ] Revisar responsividade (mobile-first, já que tráfego de anúncio deve ser majoritariamente mobile)
- [ ] Testar todos os CTAs (checkout, links de âncora, players)
- [ ] Validar tempo de carregamento (Lighthouse/PageSpeed)
- [ ] Checar consistência de copy com a campanha de anúncios já ativa

## 4. Stack sugerida
- Front-end: HTML/CSS/JS puro ou Next.js (conforme stack já usada em outros projetos)
- Player de áudio: `wavesurfer.js`
- Hospedagem de áudio: arquivos otimizados (MP3 128–192kbps) servidos via CDN
- Checkout: manter integração já usada para o produto (ex.: Kiwify/Hotmart/Eduzz, conforme aplicável)