import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, cp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { register, json, inspect } from '../scripts/production.mjs';
import { parseCatalog, root as project } from '../scripts/import-catalog.mjs';
import { check } from '../scripts/check-content.mjs';
import { productionRows } from '../src/model.js';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'locadora-assets-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'public/data'), { recursive: true });
  await mkdir(join(root, 'public/assets/production'), { recursive: true });
  await cp(join(project, 'public/docs'), join(root, 'public/docs'), { recursive: true });
  const catalog = parseCatalog(await readFile(join(root, 'public/docs/catalogo-original.md'), 'utf8'));
  await writeFile(join(root, 'public/data/catalog.json'), JSON.stringify(catalog));
  await writeFile(join(root, 'public/data/production.json'), JSON.stringify({ version: 1, project: 'locadora2000', records: [] }));
  const image = new PNG({ width: 8, height: 8 }); image.data.fill(255);
  const file = join(root, 'example.png');
  await writeFile(file, PNG.sync.write(image));
  return { root, catalog, file, options: { id: 'ENV-001', file, kind: 'sprite', creator: 'Test fixture', rights: 'Test only; not a game asset', variant: 'clean' } };
}
test('registering a real PNG updates the shared manifest, preserves source and is repeatable', async t => {
  const { root, catalog, options } = await fixture(t);
  const source = join(root, 'source.bbmodel'); await writeFile(source, '{"meta":{"format_version":"4.0"}}');
  const first = await register({ ...options, source }, root);
  assert.equal(first.record.status, 'review');
  assert.equal(first.record.width, 8);
  assert.equal(first.record.height, 8);
  assert.equal(first.record.id, 'ENV-001-sprite-clean-v001');
  assert.equal(await readFile(join(root, 'public', first.record.sourceFile), 'utf8'), await readFile(source, 'utf8'));
  const again = await register(options, root);
  assert.equal(again.unchanged, true);
  const manifest = await json(join(root, 'public/data/production.json'));
  assert.equal(manifest.records.length, 1);
  assert.equal(productionRows(catalog, manifest).find(a => a.id === 'ENV-001').status, 'review');
  assert.deepEqual(await check(root), { assets: 358, categories: 16, records: 1 });
});
test('different bytes cannot overwrite a registered version; new versions preserve history', async t => {
  const { root, options, file } = await fixture(t);
  const first = await register(options, root);
  const oldBytes = await readFile(join(root, 'public', first.record.file));
  const image = new PNG({ width: 9, height: 9 }); image.data.fill(100); await writeFile(file, PNG.sync.write(image));
  await assert.rejects(register(options, root), /Versão já existe/);
  assert.deepEqual(await readFile(join(root, 'public', first.record.file)), oldBytes);
  await register({ ...options, version: '2' }, root);
  assert.equal((await json(join(root, 'public/data/production.json'))).records.length, 2);
});
test('invalid IDs, variants, missing rights and corrupt files never enter the manifest', async t => {
  const { root, options, file } = await fixture(t);
  await assert.rejects(register({ ...options, id: '../../test' }, root), /ID não existe/);
  await assert.rejects(register({ ...options, variant: '../bad' }, root), /Variante/);
  await assert.rejects(register({ ...options, rights: '' }, root), /obrigatório/);
  await assert.rejects(register({ ...options, version: '0' }, root), /Versão/);
  await writeFile(file, 'not a PNG');
  await assert.rejects(register(options, root));
  assert.equal((await json(join(root, 'public/data/production.json'))).records.length, 0);
});
test('JSON data can be registered; corrupt or changed production files fail validation', async t => {
  const { root, options } = await fixture(t);
  const data = join(root, 'games.json'); await writeFile(data, '{"games":[]}');
  const result = await register({ ...options, id: 'DAT-001', file: data, kind: 'data' }, root);
  await check(root);
  await writeFile(join(root, 'public', result.record.file), '{"games":["changed"]}');
  await assert.rejects(check(root), /Hash\/tamanho divergente/);
});
test('truncated audio and models are rejected', () => {
  assert.throws(() => inspect(Buffer.from('OggSnot audio'), 'audio', '.ogg'), /inválido/);
  assert.throws(() => inspect(Buffer.alloc(44), 'audio', '.wav'), /inválido/);
  assert.throws(() => inspect(Buffer.from('glTFnot a model'), 'model', '.glb'), /válido/);
});
