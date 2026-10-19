export const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const kindLabels = { reference: 'Referência', sprite: 'Sprite', sheet: 'Sprite sheet', audio: 'Áudio', data: 'Dados', model: 'Modelo 3D' };
export const statusLabels = { planned: 'Planejado', review: 'Em revisão', approved: 'Aprovado', deprecated: 'Retirado' };
export function assetStatus(records) {
  const active = records.filter(r => r.status !== 'deprecated');
  if (active.some(r => r.status === 'review')) return 'review';
  if (active.some(r => r.status === 'approved')) return 'approved';
  return records.length ? 'deprecated' : 'planned';
}
export function productionRows(catalog, manifest) {
  return catalog.assets.map(asset => {
    const records = manifest.records.filter(r => r.assetId === asset.id);
    return { ...asset, records, status: assetStatus(records) };
  });
}
export function filterAssets(rows, { query = '', category = '', priority = '', status = '' } = {}) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return rows.filter(row => (!category || row.category === category) && (!priority || row.priority === priority) && (!status || row.status === status) && terms.every(term => normalize([row.id, row.title, row.description, row.variants, row.categoryLabel, row.format].join(' ')).includes(term)));
}
export function safeProductionPath(path) {
  return typeof path === 'string' && /^assets\/production\/[A-Z]+-\d{3}\/[a-z0-9_-]+\.(png|ogg|wav|json|glb|bbmodel|blend|gltf|kra|ora|psd)$/.test(path) ? path : null;
}
export function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }
