import { marked } from 'marked';
import DOMPurify from 'dompurify';
import '@fontsource-variable/dm-sans/index.css';
import '@fontsource-variable/space-grotesk/index.css';
import { productionRows, filterAssets, kindLabels, statusLabels, escapeHTML as e, safeProductionPath } from './model.js';
import './style.css';

const paths = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  book: '<path d="M12 6c-3-3-7-3-10-2v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 2Zm0 0v15"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><path d="m3 16 5-5 4 4 4-6 5 8"/>',
  art: '<path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 1-4c-1-1-1-2 1-2h2c5 0 4-12-6-12Z"/><path d="M7 8h.01M12 6h.01M17 9h.01M6 13h.01"/>',
  flow: '<rect x="8" y="2" width="8" height="6" rx="1"/><rect x="2" y="16" width="8" height="6" rx="1"/><rect x="14" y="16" width="8" height="6" rx="1"/><path d="M12 8v4H6v4m6-4h6v4"/>',
  flag: '<path d="M5 22V3m0 0c5-4 9 4 15 0v11c-6 4-10-4-15 0"/>',
  note: '<path d="M14 2H5v20h14V7Zm0 0v6h5M8 12h8M8 16h8"/>',
  search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  down: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  check: '<path d="m5 12 4 4L20 5"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="m5 5 14 14M5 19 19 5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  external: '<path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7"/>',
};
const icon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.note}</svg>`;
const docs = { gdd: { title: 'Game Design Document', file: 'gdd', kicker: 'DESIGN DO JOGO', desc: 'A visão, os sistemas e as decisões que dão forma à nossa locadora.' }, art: { title: 'Direção de arte', file: 'catalogo-original', kicker: 'BÍBLIA VISUAL', desc: 'Uma loja brasileira, formas simples e uma linguagem visual compartilhada.' }, pipeline: { title: 'Pipeline de produção', file: 'pipeline', kicker: 'DO ARQUIVO AO PORTAL', desc: 'Crie, registre, revise. Um fluxo para manter todos os assets no mesmo lugar.' }, analysis: { title: 'Análise do GDD', file: 'analise', kicker: 'LEITURA CRÍTICA', desc: 'O que a fonte define, as dependências encontradas e os próximos passos.' }, source: { title: 'Documento original', file: 'catalogo-original', kicker: 'FONTE PRESERVADA', desc: 'O catálogo mestre completo, como foi recebido, sem alterações.' } };
docs.modularity = { title: 'Assets e modularidade', file: 'modularidade', kicker: 'KITS E COMPLEMENTOS DO INVENTÁRIO', desc: 'Peças reutilizáveis, encaixes, variantes e estados para construir a nossa loja.' };
const nav = [
  { title: 'PROJETO', items: [['overview', 'Visão geral', 'home'], ['gdd', 'Game Design Document', 'book'], ['analysis', 'Análise do GDD', 'note']] },
  { title: 'BIBLIOTECA DE ASSETS', items: [['table', 'Tabela de produção', 'table'], ['sheets', 'Galeria de assets', 'image']] },
  { title: 'DOCUMENTAÇÃO', items: [['art', 'Direção de arte', 'art'], ['modularity', 'Assets e modularidade', 'table'], ['pipeline', 'Pipeline e publicação', 'flow'], ['roadmap', 'Roadmap', 'flag'], ['source', 'Documento original', 'note']] },
];
const route = () => {
  const [path, query = ''] = location.hash.replace(/^#\/?/, '').split('?');
  const [page = 'overview', id] = path.split('/');
  return { page: page || 'overview', id, params: new URLSearchParams(query) };
};
const url = (page, params = {}) => { const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v)); return `#/${page}${q.size ? '?' + q : ''}`; };
const badge = (text, type = '') => `<span class="badge ${e(type)}">${e(text)}</span>`;
const priority = value => badge(value, value.toLowerCase());
const status = value => `<span class="status ${e(value)}"><i></i>${e(statusLabels[value])}</span>`;
const linkButton = (label, href, primary = false, extra = '') => `<a class="button ${primary ? 'primary' : ''}" href="${e(href)}" ${extra}>${label}${icon('arrow', 17)}</a>`;
let catalog, manifest, rows, renderId = 0;
const cache = new Map();
const app = document.querySelector('#app');

function shell() {
  app.innerHTML = `<div class="sidebar-backdrop" data-action="menu"></div><aside class="sidebar" aria-label="Menu principal"><a class="brand" href="#/overview"><span class="brand-mark">L<span>2K</span></span><span>LOCADORA<strong>2000<span>®</span></strong></span></a><div class="brand-sub">ARQUIVO DE PRODUÇÃO</div><nav>${nav.map(group => `<div class="nav-group"><p>${group.title}</p>${group.items.map(([id, title, name]) => `<a href="#/${id}" data-nav="${id}">${icon(name)}<span>${title}</span>${id === 'table' ? `<small>${catalog.assets.length}</small>` : ''}</a>`).join('')}</div>`).join('')}</nav><div class="sidebar-bottom"><span class="live-dot"></span> FEITO NO BAIRRO, PARA O BAIRRO<p>A Game Shop Simulator<br>Documentação · v1.0</p><a href="https://github.com/raillen/locadora2000" target="_blank" rel="noopener noreferrer">Repositório do projeto ${icon('external', 14)}</a></div></aside><div class="workspace"><header class="topbar"><button class="icon-button mobile-menu" data-action="menu" aria-label="Abrir navegação" aria-expanded="false">${icon('menu')}</button><div class="breadcrumb">PROJETO <span>/</span> <strong id="crumb">Visão geral</strong></div><form id="global-search" class="global-search" role="search"><label class="sr-only" for="global-query">Buscar no catálogo de assets</label>${icon('search', 17)}<input id="global-query" placeholder="Buscar assets, IDs, categorias…" autocomplete="off"><kbd>/</kbd></form><button class="icon-button" data-action="theme" aria-label="Alternar tema claro ou escuro">${icon('sun')}</button></header><main id="main" tabindex="-1"></main><footer class="footer"><span><strong>LOCADORA 2000</strong> · A Game Shop Simulator</span><span>Uma boa história começa com uma porta aberta.</span></footer></div>`;
  try { document.documentElement.dataset.theme = localStorage.getItem('l2k-theme') || 'light'; } catch {}
  document.querySelector('#global-search').addEventListener('submit', event => { event.preventDefault(); location.hash = url('table', { q: document.querySelector('#global-query').value }); });
}
function heading(kicker, title, description, action = '') { return `<div class="page-heading"><div><div class="eyebrow">${kicker}</div><h1>${title}</h1><p>${description}</p></div>${action}</div>`; }
function storefront() {
  return `<svg class="storefront" viewBox="0 0 480 300" role="img" aria-label="Ilustração conceitual de uma locadora de bairro, com toldo e letreiro"><defs><pattern id="tiles" width="36" height="18" patternUnits="userSpaceOnUse"><path d="M0 18 36 0M0 0l36 18" fill="none" stroke="#d2cbb2" stroke-width=".6"/></pattern></defs><ellipse cx="260" cy="265" rx="185" ry="22" fill="#102d95"/><path d="m65 216 253-60 126 66-257 62z" fill="#ebe4ca"/><path d="m65 216 253-60 126 66-257 62z" fill="url(#tiles)"/><path d="M102 107 306 64l88 43v113l-204 45-88-49z" fill="#ffe398"/><path d="m306 64 88 43v113l-88-45z" fill="#e6bd62"/><path d="m102 107 204-43v111l-204 41z" fill="#f7efd5"/><path d="m92 95 212-45 103 49-214 47z" fill="#ffe167"/><path d="m92 95 214-45v39L92 134z" fill="#ffdf67"/><text x="123" y="109" fill="#173dc6" font-family="monospace" font-size="21" font-weight="900" transform="rotate(-12 123 109)">LOCADORA 2000</text><path d="m93 138 214-45-18 29-214 46z" fill="#173dc6"/><path d="m114 134 22-4-18 29-22 5m41-38 22-4-18 29-22 5m41-38 22-4-18 29-22 5m41-38 22-4-18 29-22 5m41-38 22-4-18 29-22 5" fill="#ffe167"/><path d="m75 168 214-46v11L75 179z" fill="#12339f"/><path d="m117 179 59-13v64l-59 13z" fill="#1d3760"/><path d="m123 183 47-10v42l-47 10z" fill="#88bebd"/><path d="m184 165 97-21v65l-97 21z" fill="#173654"/><path d="m190 170 85-18v49l-85 18z" fill="#8dbab8"/><path d="m229 162 4-1v50l-4 1" fill="#f7efd5"/><path d="m195 190 24-5v20l-24 5z" fill="#ffe167"/><path d="m241 181 27-6v25l-27 6z" fill="#d77e68"/><path d="m204 179 10-2v8l-10 2z" fill="#173dc6"/><path d="m333 127 38 19v45l-38-19z" fill="#1647a4"/><path d="m338 134 28 14v25l-28-14z" fill="#8dbab8"/><path d="m150 212 4-1v8l-4 1" fill="#ffe167"/><path d="m315 217 25 13-18 37-25-13z" fill="#cc7958"/><path d="m319 222 15 8-12 25-15-8z" fill="#173dc6"/><path d="m320 233 8 4m-11 3 8 4" stroke="#ffe167" stroke-width="2"/><path d="m365 232 14 7v16l-14-7z" fill="#cb7956"/><path d="m372 236-9-25m10 28 11-27m-12 18 0-28" stroke="#437463" stroke-width="9" stroke-linecap="round"/><text x="380" y="53" fill="#ffe167" font-family="monospace" font-size="13" transform="rotate(8 380 53)">DESDE 2000</text><path d="m379 61 78 11" stroke="#ffe167" stroke-width="1"/></svg>`;
}
function overview() {
  const active = manifest.records.filter(r => r.status !== 'deprecated'), produced = new Set(active.map(r => r.assetId)).size;
  return `${heading('BEM-VINDO AO PROJETO', 'Toda grande loja<br>começa no bairro.', 'O lugar onde a visão do jogo vira plano de produção.', linkButton('Ler o GDD', '#/gdd'))}<section class="hero"><div class="hero-copy"><span class="hero-label"><span></span> LOCADORA 2000 · A GAME SHOP SIMULATOR</span><h2>De portas abertas.<br>De volta aos <em>anos 2000.</em></h2><p>Uma locadora brasileira. Jogos nas estantes, TVs de tubo ligadas e um bairro inteiro de histórias para atender.</p><div class="hero-buttons">${linkButton('Conhecer o projeto', '#/gdd', true)}<a class="text-link" href="#/table">Explorar os assets ${icon('arrow', 17)}</a></div></div><div class="hero-art">${storefront()}<span class="art-caption">ESTUDO GRÁFICO DO PORTAL · NÃO É ASSET DO JOGO</span></div><span class="hero-index">L2K / 001</span></section><section class="stats" aria-label="Resumo da produção"><div><span>ASSETS CATALOGADOS</span><strong>${catalog.assets.length}<small>assets-base</small></strong><p>Um inventário, todas as possibilidades.</p></div><div><span>CATEGORIAS</span><strong>${catalog.categories.length}<small>frentes de criação</small></strong><p>Do piso da loja ao som do caixa.</p></div><div><span>PRIORIDADE P0</span><strong>${rows.filter(r => r.priority === 'P0').length}<small>essenciais para o MVP</small></strong><p>Começar pequeno. Validar o principal.</p></div><div><span>ARQUIVOS REGISTRADOS</span><strong>${active.length}<small>em ${produced} assets-base</small></strong><p>${active.length ? 'Referências e exports com histórico.' : 'A biblioteca está pronta para receber.'}</p></div></section><div class="section-heading"><div><span class="eyebrow">O MANUAL DA NOSSA LOCADORA</span><h2>Da ideia à primeira porta aberta.</h2></div><span class="section-note">DOCUMENTAÇÃO VIVA</span></div><section class="document-cards"><a href="#/gdd" class="doc-card"><span class="card-icon">${icon('book', 25)}</span><span class="card-number">01 / DESIGN</span><h3>O jogo que vamos criar</h3><p>Visão, loop diário, sistemas, economia e decisões de design em 21 capítulos.</p><span class="card-link">Game Design Document ${icon('arrow', 18)}</span></a><a href="#/art" class="doc-card"><span class="card-icon yellow">${icon('art', 25)}</span><span class="card-number">02 / IDENTIDADE</span><h3>Um jeito de ver o bairro</h3><p>Isometria ilustrada, geometria simples e uma paleta cheia de memória.</p><span class="card-link">Direção de arte ${icon('arrow', 18)}</span></a><a href="#/pipeline" class="doc-card"><span class="card-icon green">${icon('flow', 25)}</span><span class="card-number">03 / PRODUÇÃO</span><h3>Cada asset no seu lugar</h3><p>Do arquivo criado à tabela e à galeria. Versões, fontes e revisão preservadas.</p><span class="card-link">Pipeline e publicação ${icon('arrow', 18)}</span></a></section><section class="lower-grid"><div class="panel"><div class="section-heading compact"><div><span class="eyebrow">BIBLIOTECA DO PROJETO</span><h2>As peças da nossa loja.</h2></div><a class="small-link" href="#/table">Ver tudo ${icon('arrow', 16)}</a></div><div class="category-list">${catalog.categories.slice(0, 6).map(c => `<a href="${url('table', { category: c.id })}"><span class="category-code">${c.id}</span><span>${e(c.title)}</span><strong>${rows.filter(r => r.category === c.id).length}</strong>${icon('arrow', 15)}</a>`).join('')}</div></div><div class="slice-panel"><div class="eyebrow">PRÓXIMO MARCO / VERTICAL SLICE</div><h2>Uma sala.<br>Um expediente.<br>O primeiro aluguel.</h2><p>Balcão, duas estantes, uma estação de console, uma de PC e três personagens. O suficiente para provar o coração do jogo.</p><div class="slice-tags"><span>Preparar</span><b>→</b><span>Atender</span><b>→</b><span>Evoluir</span></div><a class="text-link" href="#/roadmap">Ver o plano de produção ${icon('arrow', 17)}</a></div></section><div class="source-note">${icon('note', 18)}<span>Baseado no Catálogo Mestre v1.0 · 19/10/2026. Propostas de design e decisões abertas estão identificadas no GDD.</span><a href="#/source">Consultar a fonte ${icon('external', 14)}</a></div>`;
}
function filterBar(params, gallery = false) {
  const selected = (value, key) => params.get(key) === value ? ' selected' : '';
  return `<form class="filters" id="filters" role="search"><div class="filter-search">${icon('search', 18)}<input name="q" aria-label="Buscar ${gallery ? 'arquivos' : 'assets'}" placeholder="Buscar por nome, ID ou descrição…" value="${e(params.get('q') || '')}"></div><label><span>Categoria</span><select name="category"><option value="">Todas as categorias</option>${catalog.categories.map(c => `<option value="${c.id}"${selected(c.id, 'category')}>${e(c.title)}</option>`).join('')}</select></label><label><span>Prioridade</span><select name="priority"><option value="">Todas</option>${['P0', 'P1', 'P2'].map(p => `<option${selected(p, 'priority')}>${p}</option>`).join('')}</select></label><label><span>Estado</span><select name="status"><option value="">Todos os estados</option>${Object.entries(statusLabels).filter(([id]) => !gallery || id !== 'planned').map(([id, label]) => `<option value="${id}"${selected(id, 'status')}>${label}</option>`).join('')}</select></label><button class="button filter-submit" type="submit">Filtrar</button></form>`;
}
function getFiltered(params, gallery = false) {
  const filters = { query: params.get('q') || '', category: params.get('category') || '', priority: params.get('priority') || '', status: gallery ? '' : params.get('status') || '' };
  let results = filterAssets(rows, filters);
  const sort = params.get('sort') || 'id';
  results = [...results].sort((a, b) => (sort === 'title' ? a.title.localeCompare(b.title, 'pt-BR') : sort === 'priority' ? a.priority.localeCompare(b.priority) || a.id.localeCompare(b.id) : a.id.localeCompare(b.id)));
  return results;
}
function thumbnail(record, size = '') {
  const path = safeProductionPath(record?.file);
  return path && ['sprite', 'sheet', 'reference'].includes(record.kind) ? `<img class="asset-thumb ${size}" src="./${e(path)}" alt="${e(kindLabels[record.kind])} de ${e(record.assetId)}" loading="lazy">` : `<span class="thumb-placeholder ${size}">${icon(record?.kind === 'audio' ? 'clock' : 'image', 21)}</span>`;
}
function table(params) {
  const filtered = getFiltered(params), pageSize = 30, pages = Math.max(1, Math.ceil(filtered.length / pageSize)), page = Math.min(pages, Math.max(1, Math.floor(Number(params.get('page'))) || 1));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  return `${heading('BIBLIOTECA DE ASSETS', 'Tabela de produção', 'Todos os assets-base, do planejamento ao arquivo revisado.', `<a class="button" href="./data/catalog.json" download="locadora2000-catalogo.json">${icon('down', 17)} Exportar JSON</a>`)}<div class="view-tabs"><a class="active" href="#/table">${icon('table', 17)} Tabela de produção</a><a href="#/sheets">${icon('image', 17)} Galeria de assets <small>${manifest.records.length}</small></a></div>${filterBar(params)}<div class="results-toolbar"><p role="status"><strong>${filtered.length}</strong> de ${rows.length} assets <span>· Fonte original preservada</span></p><label>Ordenar por <select id="sort"><option value="id"${params.get('sort') === 'id' ? ' selected' : ''}>ID</option><option value="title"${params.get('sort') === 'title' ? ' selected' : ''}>Nome</option><option value="priority"${params.get('sort') === 'priority' ? ' selected' : ''}>Prioridade</option></select></label><button class="plain-button" data-action="clear">Limpar filtros</button></div><div class="table-wrap"><table class="asset-table"><caption class="sr-only">Catálogo de produção de LOCADORA 2000</caption><thead><tr><th scope="col">ASSET / ID</th><th scope="col">DESCRIÇÃO</th><th scope="col">CATEGORIA</th><th scope="col">PRIORIDADE</th><th scope="col">ARQUIVOS</th><th scope="col">ESTADO</th></tr></thead><tbody>${visible.map(row => `<tr><td><a class="asset-name" href="#/asset/${row.id}">${thumbnail(row.records.find(r => r.status !== 'deprecated'))}<span><strong>${e(row.title)}</strong><code>${row.id}</code></span></a></td><td class="description-cell">${e(row.description)}</td><td><span class="table-category">${e(row.categoryLabel)}</span></td><td>${priority(row.priority)}</td><td class="files-cell">${row.records.length ? `<a href="#/asset/${row.id}">${row.records.length} arquivo${row.records.length > 1 ? 's' : ''}</a>` : '—'}</td><td>${status(row.status)}</td></tr>`).join('') || '<tr><td colspan="6"><div class="empty-state small">Nenhum asset corresponde aos filtros. <button class="plain-button" data-action="clear">Limpar filtros</button></div></td></tr>'}</tbody></table></div><div class="pagination"><span>${filtered.length ? (page - 1) * pageSize + 1 : 0}–${Math.min(page * pageSize, filtered.length)} de ${filtered.length} assets</span><div><button class="button" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''}>← Anterior</button><span>Página <strong>${page}</strong> de ${pages}</span><button class="button" data-page="${page + 1}" ${page >= pages ? 'disabled' : ''}>Próxima →</button></div></div><p class="help-note">O estado resume os arquivos registrados. Um arquivo de referência aprovado não significa que o asset já foi integrado ao jogo.</p>`;
}
function gallery(params) {
  const allowed = new Set(getFiltered(params, true).map(r => r.id));
  const records = manifest.records.filter(r => allowed.has(r.assetId) && (!params.get('status') || r.status === params.get('status')));
  return `${heading('BIBLIOTECA DE ASSETS', 'A produção ganha forma.', 'Referências, sprites, sheets, modelos, áudio e dados realmente registrados.', linkButton('Como adicionar assets', '#/pipeline'))}<div class="view-tabs"><a href="#/table">${icon('table', 17)} Tabela de produção</a><a class="active" href="#/sheets">${icon('image', 17)} Galeria de assets <small>${manifest.records.length}</small></a></div>${filterBar(params, true)}<div class="results-toolbar"><p role="status"><strong>${records.length}</strong> arquivos encontrados</p><button class="plain-button" data-action="clear">Limpar filtros</button></div>${records.length ? `<div class="gallery">${records.map(r => { const asset = rows.find(a => a.id === r.assetId); return `<a class="gallery-card" href="#/asset/${r.assetId}"><div class="gallery-preview">${thumbnail(r, 'large')}${badge(kindLabels[r.kind], 'kind')}</div><div class="gallery-info"><code>${r.assetId} / v${String(r.version).padStart(3, '0')}</code><h2>${e(asset.title)}</h2><p>${e(r.variant)} · ${e(r.dimensions || `${r.bytes} bytes`)}</p>${status(r.status)}</div></a>`; }).join('')}</div>` : `<section class="empty-state"><div class="empty-illustration">${icon('image', 52)}<span>+</span></div><span class="eyebrow">A PRIMEIRA PRATELEIRA ESTÁ RESERVADA</span><h2>${manifest.records.length ? 'Nenhum arquivo com esses filtros.' : 'Tudo pronto para o primeiro asset.'}</h2><p>${manifest.records.length ? 'Tente outra categoria, estado ou termo de busca.' : 'Os 358 assets estão catalogados. Quando um arquivo for criado e registrado, ele aparecerá aqui e na tabela de produção automaticamente.'}</p>${linkButton('Ver o fluxo de produção', '#/pipeline', true)}<a class="small-link" href="#/table">Consultar o catálogo planejado →</a></section>`}`;
}
function assetDetail(id) {
  const asset = rows.find(r => r.id === id);
  if (!asset) return notFound();
  return `<a href="#/table" class="back-link">← Voltar à tabela</a>${heading(`${asset.id} / ${e(asset.categoryLabel)}`, e(asset.title), e(asset.description), priority(asset.priority))}<section class="asset-details"><div class="panel detail-brief"><div class="eyebrow">BRIEFING DE PRODUÇÃO</div><h2>O que vamos criar</h2><dl><dt>Função no jogo</dt><dd>${e(asset.description)}</dd><dt>Variações e estados</dt><dd>${e(asset.variants)}</dd><dt>Formato recomendado</dt><dd>${e(asset.format)}</dd><dt>Estado dos arquivos</dt><dd>${status(asset.status)}</dd></dl><p class="help-note">A fonte descreve assets-base. Variantes e versões compartilham este ID e recebem registros próprios.</p>${linkButton('Consultar direção de arte', '#/art')}</div><div class="slice-panel detail-guidelines"><div class="eyebrow">PADRÃO LOCADORA 2000</div><h2>Simples na forma.<br>Forte na identidade.</h2><ul><li>Isometria ilustrada; referência de grade 2:1.</li><li>Paleta compartilhada, sombras planas e luz fixa.</li><li>PNG transparente, âncora e footprint documentados.</li><li>Arquivo-fonte, autoria e direitos preservados.</li></ul><a class="text-link" href="#/pipeline">Registrar uma nova versão ${icon('arrow', 17)}</a></div></section><div class="section-heading"><h2>Arquivos e versões <span class="count">${asset.records.length}</span></h2></div>${asset.records.length ? asset.records.map(r => { const file = safeProductionPath(r.file), source = safeProductionPath(r.sourceFile); return `<article class="record panel" id="${e(r.id)}"><div class="record-preview">${thumbnail(r, 'large')}</div><div class="record-info"><div class="record-meta">${badge(kindLabels[r.kind], 'kind')}${status(r.status)}</div><h3>${e(r.variant)} <span>· v${String(r.version).padStart(3, '0')}</span></h3><code>${e(r.id)}</code>${r.kind === 'audio' && file ? `<audio controls preload="none" src="./${file}"></audio>` : ''}<dl><dt>Arquivo</dt><dd>${e(r.filename)}</dd><dt>Dimensões / tamanho</dt><dd>${e(r.dimensions || `${r.bytes} bytes`)}</dd><dt>Autoria</dt><dd>${e(r.creator)}</dd><dt>Direitos</dt><dd>${e(r.rights)}</dd><dt>Observações</dt><dd>${e(r.notes || 'Nenhuma observação.')}</dd></dl><div class="record-actions">${file ? `<a class="button" href="./${file}" download>${icon('down', 17)} Baixar arquivo</a>` : ''}${source ? `<a class="button" href="./${source}" download>Baixar fonte</a>` : ''}</div>${r.prompt ? `<details><summary>Brief / prompt de criação</summary><pre>${e(r.prompt)}</pre></details>` : ''}${r.reviews?.length ? `<details><summary>Histórico de revisão</summary>${r.reviews.map(review => `<p>${e(statusLabels[review.status])} · ${e(new Date(review.date).toLocaleDateString('pt-BR'))}<br>${e(review.notes)}</p>`).join('')}</details>` : ''}</div></article>`; }).join('') : `<div class="empty-state small">${icon('image', 32)}<h3>Aguardando o primeiro arquivo.</h3><p>Este é um asset planejado. Ainda não existe sprite, referência ou export registrado.</p>${linkButton('Como registrar', '#/pipeline')}</div>`}`;
}
async function documentPage(page, params, currentRender) {
  const doc = docs[page];
  if (!cache.has(doc.file)) {
    const response = await fetch(`./docs/${doc.file}.md`);
    if (!response.ok) throw Error('Não foi possível carregar o documento.');
    cache.set(doc.file, await response.text());
  }
  if (currentRender !== renderId) return null;
  let markdown = cache.get(doc.file);
  if (page === 'art') markdown = '# Direção de arte\n\n' + markdown.split('## 2. Direção visual')[1].split('## 3. Loop de gameplay')[0] + '\n\n## Checklist de produção\n\n' + markdown.split('## 6. Checklist de produção')[1].split('## 9. Resumo do inventário')[0];
  if (page === 'art') markdown += '\n\n## Kits e peças reutilizáveis\n\nConsulte o [guia de assets e modularidade](#/modularity) para os complementos do inventário, famílias modulares, encaixes, estados e critérios do teste de estante. O [GDD](#/gdd?section=doc-14-direcao-de-arte) também registra a leitura das referências visuais fornecidas pelo usuário.\n';
  const headings = [], used = new Map(), renderer = new marked.Renderer();
  renderer.heading = function({ tokens, depth }) {
    const html = this.parser.parseInline(tokens), plain = html.replace(/<[^>]*>/g, '');
    const base = plain.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const count = used.get(base) || 0; used.set(base, count + 1);
    const id = `doc-${base}${count ? '-' + count : ''}`;
    if (depth === 2) headings.push({ id, title: plain });
    return `<h${depth} id="${id}">${html}</h${depth}>`;
  };
  const html = DOMPurify.sanitize(marked.parse(markdown, { renderer }));
  return `${heading(doc.kicker, doc.title, doc.desc, `<a class="button" href="./docs/${doc.file}.md" download="locadora2000-${doc.file}.md">${icon('down', 17)} Markdown</a>`)}${page === 'gdd' ? '<div class="document-notice"><strong>Base de trabalho · v1.0</strong><span>Definições da fonte e propostas de design estão identificadas. Decisões abertas aguardam validação no protótipo.</span></div>' : ''}<div class="document-layout"><article class="markdown">${html}</article><aside class="document-toc" aria-label="Nesta página"><div class="eyebrow">NESTA PÁGINA</div>${headings.map(h => `<a href="${url(page, { section: h.id })}">${e(h.title)}</a>`).join('')}<a class="toc-download" href="./docs/${doc.file}.md" download>${icon('down', 15)} Baixar documento</a></aside></div>`;
}
function roadmap() {
  const phases = [
    ['01', 'Prova técnica', 'Antes de produzir em lote', 'Validar engine, câmera, grade, âncoras, colisão e ordenação com poucos objetos.', ['ENV-001', 'FUR-001', 'FUR-004', 'CHR-001']],
    ['02', 'Vertical slice', 'O primeiro expediente completo', 'Uma sala, balcão, duas estantes, console, PC e três personagens. Alugar, devolver, usar uma estação e fechar o caixa.', ['ELE-001', 'ELE-014', 'ELE-017', 'ELE-019', 'CHR-004', 'CHR-006', 'UI-018', 'UI-035']],
    ['03', 'MVP', 'Expandir o loop validado', 'Inventário por exemplar, dados iniciais, venda simples, limpeza, progressão e salvamento. Os 130 P0 orientam esta etapa.', ['DAT-001', 'DAT-005', 'DAT-006', 'DAT-017', 'UI-020', 'UI-022']],
    ['04', 'Release inicial', 'Mais histórias para a mesma loja', 'Fornecedores, funcionários, oficina aprofundada, variedade de produtos e localização em inglês.', ['DAT-007', 'DAT-008', 'UI-023', 'UI-026', 'DAT-016']],
    ['05', 'Pós-MVP', 'Um ponto de encontro do bairro', 'Campeonatos, eventos, decoração avançada e novas tecnologias. Escopo condicionado ao resultado do MVP.', ['UI-027', 'VFX-012', 'AUD-003', 'ELE-005']],
  ];
  return `${heading('PLANEJAMENTO', 'Uma loja de cada vez.', 'Primeiro provar o loop. Depois preencher as prateleiras.')}<div class="document-notice"><strong>Plano proposto, sem datas fechadas</strong><span>O catálogo define prioridades, não um cronograma aprovado. Nenhuma fase do jogo está concluída neste repositório.</span></div><div class="roadmap">${phases.map(([number, title, subtitle, description, ids]) => `<section class="roadmap-phase"><span class="phase-number">${number}</span><div class="panel phase-content"><div class="phase-header"><span class="eyebrow">${subtitle}</span>${badge('Planejado', 'planned')}</div><h2>${title}</h2><p>${description}</p><div class="asset-links">${ids.map(id => `<a href="#/asset/${id}">${id}</a>`).join('')}</div></div></section>`).join('')}</div><div class="source-note">${icon('note')}<span>Revisar as dependências e decisões abertas antes de fechar o escopo.</span><a href="#/analysis">Ler a análise →</a></div>`;
}
function notFound() { return `<div class="empty-state"><span class="eyebrow">ESTA PRATELEIRA ESTÁ VAZIA / 404</span><h1>Página não encontrada.</h1><p>O endereço não corresponde a um documento ou asset do projeto.</p>${linkButton('Voltar à visão geral', '#/overview', true)}</div>`; }
async function render() {
  if (!rows) return;
  const currentRender = ++renderId, { page, id, params } = route(), main = document.querySelector('#main');
  document.body.classList.remove('menu-open');
  document.querySelector('.mobile-menu')?.setAttribute('aria-expanded', 'false');
  const label = nav.flatMap(g => g.items).find(n => n[0] === page)?.[1] || (page === 'asset' ? id : 'Página não encontrada');
  document.querySelector('#crumb').textContent = label;
  document.title = `${label} — LOCADORA 2000`;
  document.querySelectorAll('[data-nav]').forEach(a => { const active = a.dataset.nav === page || page === 'asset' && a.dataset.nav === 'table'; a.classList.toggle('active', active); active ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'); });
  try {
    let html;
    if (docs[page]) html = await documentPage(page, params, currentRender);
    else html = page === 'overview' ? overview() : page === 'table' ? table(params) : page === 'sheets' ? gallery(params) : page === 'asset' ? assetDetail(id) : page === 'roadmap' ? roadmap() : notFound();
    if (currentRender !== renderId || html === null) return;
    main.innerHTML = html;
    main.querySelector('#filters')?.addEventListener('submit', event => { event.preventDefault(); location.hash = url(page, Object.fromEntries(new FormData(event.currentTarget))); });
    main.querySelectorAll('#filters select').forEach(select => select.addEventListener('change', () => main.querySelector('#filters').requestSubmit()));
    main.querySelector('#sort')?.addEventListener('change', event => { params.set('sort', event.target.value); params.delete('page'); location.hash = url(page, Object.fromEntries(params)); });
    if (params.get('section')) requestAnimationFrame(() => { document.getElementById(params.get('section'))?.scrollIntoView({ block: 'start' }); });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  } catch (error) {
    main.innerHTML = `<div class="empty-state"><h1>Não foi possível carregar o conteúdo.</h1><p>${e(error.message)}</p><button class="button primary" data-action="retry">Tentar novamente</button></div>`;
  }
}
document.addEventListener('click', event => {
  if (event.target.closest('.skip-link')) {
    event.preventDefault();
    const main = document.querySelector('#main');
    main?.focus(); main?.scrollIntoView({ block: 'start' });
    return;
  }
  const button = event.target.closest('[data-action]');
  if (button?.dataset.action === 'menu') { const open = document.body.classList.toggle('menu-open'); document.querySelector('.mobile-menu').setAttribute('aria-expanded', String(open)); }
  if (button?.dataset.action === 'theme') { const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; try { localStorage.setItem('l2k-theme', theme); } catch {} }
  if (button?.dataset.action === 'clear') { const current = route(); if (location.hash === `#/${current.page}`) render(); else location.hash = `#/${current.page}`; }
  if (button?.dataset.action === 'retry') { if (catalog) render(); else boot(); }
  const pagination = event.target.closest('[data-page]');
  if (pagination && !pagination.disabled) { const current = route(); current.params.set('page', pagination.dataset.page); location.hash = url(current.page, Object.fromEntries(current.params)); }
  const image = event.target.closest('img.asset-thumb');
  if (image && image.closest('.record-preview')) {
    const dialog = document.createElement('dialog'); dialog.className = 'image-dialog'; dialog.innerHTML = `<button class="icon-button" aria-label="Fechar imagem">${icon('close')}</button><img src="${e(image.getAttribute('src'))}" alt="${e(image.alt)}">`; document.body.append(dialog); dialog.querySelector('button').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', ev => { if (ev.target === dialog) dialog.close(); }); dialog.addEventListener('close', () => dialog.remove()); dialog.showModal();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) { event.preventDefault(); document.querySelector('#global-query')?.focus(); }
  if (event.key === 'Escape') { document.body.classList.remove('menu-open'); document.querySelector('.mobile-menu')?.setAttribute('aria-expanded', 'false'); }
});
window.addEventListener('hashchange', render);
async function boot() {
  app.innerHTML = '<div class="boot"><span class="brand-mark">L<span>2K</span></span><p>Organizando as prateleiras…</p></div>';
  try {
    [catalog, manifest] = await Promise.all(['catalog', 'production'].map(async file => { const response = await fetch(`./data/${file}.json`, { cache: 'no-cache' }); if (!response.ok) throw Error(`Arquivo ${file} indisponível.`); return response.json(); }));
    rows = productionRows(catalog, manifest); shell(); await render();
  } catch (error) { app.innerHTML = `<div class="boot"><h1>Não foi possível abrir o arquivo.</h1><p>${e(error.message)}</p><button class="button primary" data-action="retry">Tentar novamente</button></div>`; }
}
boot();
