import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { root, parseCatalog } from '../scripts/import-catalog.mjs';
import { check } from '../scripts/check-content.mjs';
import { productionRows, filterAssets, assetStatus, safeProductionPath } from '../src/model.js';

const text = await readFile(new URL('../public/docs/catalogo-original.md', import.meta.url), 'utf8');
const catalog = parseCatalog(text);
test('all source records and priorities are preserved, with unique IDs', () => {
  assert.equal(catalog.assets.length, 358);
  assert.equal(catalog.categories.length, 16);
  assert.equal(new Set(catalog.assets.map(a => a.id)).size, 358);
  assert.deepEqual(Object.fromEntries(['P0', 'P1', 'P2'].map(p => [p, catalog.assets.filter(a => a.priority === p).length])), { P0: 130, P1: 150, P2: 78 });
  assert.equal(catalog.assets.find(a => a.id === 'DAT-018').title, 'Tabela de compatibilidade');
});
test('duplicate IDs or malformed priorities fail import', () => {
  const row = text.split('\n').find(line => line.startsWith('| ENV-001'));
  assert.throws(() => parseCatalog(text + '\n' + row), /duplicado/);
  assert.throws(() => parseCatalog(text.replace('| P0 |', '| P3 |')), /prioridade/);
});
test('query matches accents, multiple terms, ID and description with combined filters', () => {
  const rows = productionRows(catalog, { records: [] });
  assert.equal(filterAssets(rows, { query: 'televisao pequena', category: 'ELE', priority: 'P0', status: 'planned' })[0].id, 'ELE-014');
  assert.equal(filterAssets(rows, { query: 'ENV-001' }).length, 1);
  assert.equal(filterAssets(rows, { category: 'ENV' }).length, 22);
  assert.equal(filterAssets(rows, { query: 'nãoexiste' }).length, 0);
});
test('only manifest records affect production state, including retired versions', () => {
  assert.equal(assetStatus([]), 'planned');
  assert.equal(assetStatus([{ status: 'approved' }]), 'approved');
  assert.equal(assetStatus([{ status: 'approved' }, { status: 'review' }]), 'review');
  assert.equal(assetStatus([{ status: 'approved' }, { status: 'deprecated' }]), 'approved');
  assert.equal(assetStatus([{ status: 'deprecated' }]), 'deprecated');
});
test('file links reject external URLs, traversal, active content and invalid IDs', () => {
  for (const path of ['javascript:alert(1)', 'assets/production/ENV-001/../../x.png', 'assets/production/ENV-001/x.svg', 'https://example.com/x.png']) assert.equal(safeProductionPath(path), null);
  assert.equal(safeProductionPath('assets/production/ENV-001/env_001.png'), 'assets/production/ENV-001/env_001.png');
});
test('repository documents and manifest pass integrity validation', async () => {
  const production = JSON.parse(await readFile(new URL('../public/data/production.json', import.meta.url), 'utf8'));
  assert.deepEqual(await check(root), { assets: 358, categories: 16, records: production.records.length });
});
