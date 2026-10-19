import { readFile, mkdir, writeFile, rename, unlink } from 'node:fs/promises';
import { resolve, extname, dirname, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { PNG } from 'pngjs';
import { root as defaultRoot } from './import-catalog.mjs';

export const kinds = ['reference', 'sprite', 'sheet', 'audio', 'data', 'model'];
export const hash = bytes => createHash('sha256').update(bytes).digest('hex');
export async function json(path) { return JSON.parse(await readFile(path, 'utf8')); }
export async function atomicJSON(path, data) {
  const temp = path + `.tmp-${process.pid}`;
  try { await writeFile(temp, JSON.stringify(data, null, 2) + '\n', { flag: 'wx' }); await rename(temp, path); }
  catch (error) { await unlink(temp).catch(() => {}); throw error; }
}
export function args(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!/^--[a-z-]+$/.test(argv[i]) || !argv[i + 1] || argv[i + 1].startsWith('--')) throw Error('Use --opcao valor.');
    if (result[argv[i].slice(2)] !== undefined) throw Error('Opção repetida: ' + argv[i]);
    result[argv[i].slice(2)] = argv[i + 1];
  }
  return result;
}
export function inspect(bytes, kind, extension) {
  if (['reference', 'sprite', 'sheet'].includes(kind)) {
    if (extension !== '.png') throw Error('Imagens precisam ser PNG.');
    const png = PNG.sync.read(bytes, { checkCRC: true });
    if (!png.width || !png.height) throw Error('PNG vazio.');
    return { width: png.width, height: png.height, dimensions: `${png.width} × ${png.height} px` };
  }
  if (kind === 'data') {
    if (extension !== '.json') throw Error('Dados precisam ser JSON.');
    JSON.parse(bytes.toString('utf8'));
  }
  if (kind === 'model') {
    if (extension !== '.glb' || bytes.length < 20 || bytes.toString('ascii', 0, 4) !== 'glTF' || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== bytes.length) throw Error('Modelo precisa ser GLB v2 válido.');
    let offset = 12, chunks = 0;
    while (offset < bytes.length) {
      if (offset + 8 > bytes.length) throw Error('GLB truncado.');
      const size = bytes.readUInt32LE(offset), type = bytes.readUInt32LE(offset + 4);
      if (size % 4 || offset + 8 + size > bytes.length) throw Error('Chunk GLB inválido.');
      if (chunks === 0) {
        if (type !== 0x4e4f534a) throw Error('GLB sem JSON inicial.');
        const doc = JSON.parse(bytes.toString('utf8', offset + 8, offset + 8 + size));
        if (doc.asset?.version !== '2.0') throw Error('GLB sem metadados glTF 2.0.');
      }
      offset += 8 + size; chunks++;
    }
    if (!chunks) throw Error('GLB sem chunks.');
  }
  if (kind === 'audio') {
    if (extension === '.ogg') {
      if (bytes.length < 30 || bytes.toString('ascii', 0, 4) !== 'OggS' || bytes[4] !== 0 || (!bytes.includes(Buffer.from('vorbis')) && !bytes.includes(Buffer.from('OpusHead')))) throw Error('OGG Vorbis/Opus inválido.');
    } else if (extension === '.wav') {
      if (bytes.length < 44 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE' || bytes.readUInt32LE(4) + 8 !== bytes.length) throw Error('WAV inválido.');
      let offset = 12, format = false, data = false;
      while (offset + 8 <= bytes.length) {
        const type = bytes.toString('ascii', offset, offset + 4), size = bytes.readUInt32LE(offset + 4);
        if (offset + 8 + size > bytes.length) throw Error('WAV truncado.');
        if (type === 'fmt ') { if (size < 16 || ![1, 3].includes(bytes.readUInt16LE(offset + 8))) throw Error('WAV precisa ser PCM/float.'); format = true; }
        if (type === 'data' && size > 0) data = true;
        offset += 8 + size + size % 2;
      }
      if (!format || !data) throw Error('WAV sem áudio.');
    } else throw Error('Áudio precisa ser WAV ou OGG.');
  }
  return {};
}
export async function register(options, root = defaultRoot) {
  for (const field of ['id', 'file', 'kind', 'creator', 'rights']) if (!options[field]?.trim()) throw Error('Campo obrigatório: --' + field);
  if (!kinds.includes(options.kind)) throw Error('Tipo de arquivo inválido.');
  const catalog = await json(resolve(root, 'public/data/catalog.json'));
  if (!catalog.assets.some(a => a.id === options.id)) throw Error('ID não existe no catálogo: ' + options.id);
  const variant = options.variant || 'base', version = Number(options.version || 1);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(variant)) throw Error('Variante deve usar minúsculas ASCII e hífens.');
  if (!Number.isInteger(version) || version < 1 || version > 999) throw Error('Versão deve ser de 1 a 999.');
  const bytes = await readFile(options.file), extension = extname(options.file).toLowerCase();
  if (bytes.length > 64 * 1024 * 1024) throw Error('Arquivo excede 64 MiB.');
  const dimensions = inspect(bytes, options.kind, extension);
  const id = `${options.id}-${options.kind}-${variant}-v${String(version).padStart(3, '0')}`;
  const filename = id.toLowerCase().replaceAll('-', '_') + extension;
  const file = `assets/production/${options.id}/${filename}`;
  const manifestPath = resolve(root, 'public/data/production.json');
  const manifest = await json(manifestPath);
  const existing = manifest.records.find(r => r.id === id);
  if (existing) {
    if (existing.sha256 === hash(bytes)) {
      const current = await readFile(resolve(root, 'public', existing.file));
      if (hash(current) !== existing.sha256) throw Error('Arquivo registrado foi alterado; investigue antes de continuar.');
      return { record: existing, unchanged: true };
    }
    throw Error('Versão já existe com outros bytes. Incremente --version.');
  }
  let sourceBytes, sourceFile;
  if (options.source) {
    const sourceExt = extname(options.source).toLowerCase();
    if (!['.bbmodel', '.blend', '.glb', '.gltf', '.kra', '.ora', '.psd', '.png'].includes(sourceExt)) throw Error('Extensão de fonte não suportada.');
    sourceBytes = await readFile(options.source);
    sourceFile = `assets/production/${options.id}/${id.toLowerCase()}-source${sourceExt}`;
  }
  const prompt = options['prompt-file'] ? await readFile(options['prompt-file'], 'utf8') : '';
  const record = { id, assetId: options.id, kind: options.kind, variant, version, status: 'review', file, filename, bytes: bytes.length, sha256: hash(bytes), ...dimensions, creator: options.creator, rights: options.rights, notes: options.notes || '', prompt, createdAt: new Date().toISOString(), ...(sourceFile ? { sourceFile, sourceSha256: hash(sourceBytes) } : {}) };
  const made = [];
  try {
    await mkdir(dirname(resolve(root, 'public', file)), { recursive: true });
    await writeFile(resolve(root, 'public', file), bytes, { flag: 'wx' }); made.push(resolve(root, 'public', file));
    if (sourceFile) { await writeFile(resolve(root, 'public', sourceFile), sourceBytes, { flag: 'wx' }); made.push(resolve(root, 'public', sourceFile)); }
    manifest.records.push(record);
    await atomicJSON(manifestPath, manifest);
  } catch (error) { for (const path of made) await unlink(path); throw error; }
  return { record, unchanged: false };
}
export function localFile(root, value) {
  if (typeof value !== 'string' || !/^assets\/production\/[A-Z]+-\d{3}\/[a-z0-9_.-]+$/.test(value)) throw Error('Caminho de produção inválido: ' + value);
  const target = resolve(root, 'public', value);
  if (!target.startsWith(resolve(root, 'public/assets/production') + sep)) throw Error('Caminho fora da produção.');
  return target;
}
