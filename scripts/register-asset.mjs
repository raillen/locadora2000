import { args, register } from './production.mjs';
try {
  const result = await register(args(process.argv.slice(2)));
  console.log(`${result.unchanged ? 'Já registrado (sem alteração)' : 'Registrado em revisão'}: ${result.record.id}`);
  console.log('Tabela, ficha e galeria leem o mesmo registro. Publique o portal para atualizar o site público.');
} catch (error) { console.error(error.message); process.exitCode = 1; }
