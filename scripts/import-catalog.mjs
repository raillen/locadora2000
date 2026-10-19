import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const slug = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function parseCatalog(markdown) {
  const assets = [], categories = [], seen = new Set();
  for (const line of markdown.split(/\r?\n/)) {
    if (!/^\| [A-Z]+-\d{3} \|/.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map(s => s.trim());
    if (cells.length !== 7) throw Error('Linha inválida: ' + line);
    const [id, title, category, description, variants, priority, format] = cells;
    if (seen.has(id) || !/^P[012]$/.test(priority)) throw Error('ID duplicado ou prioridade inválida: ' + id);
    seen.add(id);
    const categoryId = id.split('-')[0];
    if (!categories.some(c => c.id === categoryId)) categories.push({ id: categoryId, title: category });
    assets.push({ id, title, category: categoryId, categoryLabel: category, description, variants, priority, format });
  }
  if (!assets.length) throw Error('O documento não contém assets.');
  return { version: 1, project: 'locadora2000', source: 'docs/catalogo-original.md', categories, assets };
}
export async function importCatalog() {
  const text = await readFile(resolve(root, 'public/docs/catalogo-original.md'), 'utf8');
  const catalog = parseCatalog(text);
  await writeFile(resolve(root, 'public/data/catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
  console.log(`Catálogo atualizado: ${catalog.assets.length} assets, ${catalog.categories.length} categorias.`);
  return catalog;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await importCatalog();
