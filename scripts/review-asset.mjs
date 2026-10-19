import { resolve } from 'node:path';
import { root } from './import-catalog.mjs';
import { args, json, atomicJSON } from './production.mjs';
try {
  const options = args(process.argv.slice(2));
  if (!['review', 'approved', 'deprecated'].includes(options.status) || !options.notes?.trim()) throw Error('Use --record ID --status review|approved|deprecated --notes "Justificativa".');
  const path = resolve(root, 'public/data/production.json'), manifest = await json(path);
  const record = manifest.records.find(r => r.id === options.record);
  if (!record) throw Error('Registro não encontrado.');
  record.status = options.status;
  record.reviews ||= [];
  record.reviews.push({ status: options.status, notes: options.notes, date: new Date().toISOString() });
  await atomicJSON(path, manifest);
  console.log(`Revisão registrada: ${record.id} → ${record.status}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
