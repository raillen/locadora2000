import { readFile, realpath } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { root as defaultRoot, parseCatalog } from './import-catalog.mjs';
import { json, hash, inspect, kinds, localFile } from './production.mjs';

export async function check(root = defaultRoot) {
  const catalog = await json(resolve(root, 'public/data/catalog.json'));
  const expected = parseCatalog(await readFile(resolve(root, 'public/docs/catalogo-original.md'), 'utf8'));
  if (JSON.stringify(catalog) !== JSON.stringify(expected)) throw Error('Catálogo divergente da fonte. Execute npm run catalog.');
  const manifest = await json(resolve(root, 'public/data/production.json'));
  if (manifest.version !== 1 || manifest.project !== 'locadora2000' || !Array.isArray(manifest.records)) throw Error('Manifesto inválido.');
  const ids = new Set(catalog.assets.map(a => a.id)), records = new Set();
  for (const r of manifest.records) {
    if (!ids.has(r.assetId) || records.has(r.id) || !kinds.includes(r.kind) || !['review', 'approved', 'deprecated'].includes(r.status) || !r.creator?.trim() || !r.rights?.trim()) throw Error('Registro inválido: ' + r.id);
    records.add(r.id);
    const file = localFile(root, r.file);
    const actual = await realpath(file);
    if (!actual.startsWith(await realpath(resolve(root, 'public/assets/production')) + sep)) throw Error('Link de arquivo escapa da produção.');
    const bytes = await readFile(file);
    if (hash(bytes) !== r.sha256 || bytes.length !== r.bytes) throw Error('Hash/tamanho divergente: ' + r.id);
    inspect(bytes, r.kind, r.file.slice(r.file.lastIndexOf('.')));
    if (r.sourceFile) {
      const path = localFile(root, r.sourceFile);
      if (!(await realpath(path)).startsWith(await realpath(resolve(root, 'public/assets/production')) + sep)) throw Error('Fonte fora da produção.');
      if (hash(await readFile(path)) !== r.sourceSha256) throw Error('Hash da fonte divergente: ' + r.id);
    }
  }
  for (const name of ['gdd', 'analise', 'pipeline', 'catalogo-original', 'modularidade']) {
    const text = await readFile(resolve(root, `public/docs/${name}.md`), 'utf8');
    if (text.length < 200 || !text.startsWith('# ')) throw Error('Documento ausente/incompleto: ' + name);
  }
  return { assets: catalog.assets.length, categories: catalog.categories.length, records: manifest.records.length };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log('Conteúdo validado:', await check()); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
