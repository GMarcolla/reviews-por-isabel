import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar variáveis de ambiente - .env.local primeiro, depois .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Verificar se as variáveis existem
console.log('🔍 Verificando variáveis de ambiente...');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Encontrada' : '❌ Não encontrada');
console.log('BACKUP_DATABASE_URL:', process.env.BACKUP_DATABASE_URL ? '✅ Encontrada' : '❌ Não encontrada');
console.log('');

if (!process.env.BACKUP_DATABASE_URL) {
  throw new Error('BACKUP_DATABASE_URL não encontrada. Adicione ao arquivo .env ou .env.local');
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não encontrada no .env');
}

console.log('✅ Variáveis de ambiente carregadas\n');

// Banco de origem (backup)
const backupDb = new PrismaClient({
  datasources: {
    db: {
      url: process.env.BACKUP_DATABASE_URL,
    },
  },
});

// Banco de destino (principal)
const mainDb = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function restoreData() {
  try {
    console.log('🔄 Iniciando restauração dos dados...\n');

    // 1. Restaurar Categorias
    console.log('📦 Restaurando Categorias...');
    const categorias = await backupDb.categoria.findMany();
    for (const cat of categorias) {
      await mainDb.categoria.upsert({
        where: { id: cat.id },
        update: cat,
        create: cat,
      });
    }
    console.log(`✅ ${categorias.length} categorias restauradas\n`);

    // 2. Restaurar Subcategorias
    console.log('📦 Restaurando Subcategorias...');
    const subcategorias = await backupDb.subcategoria.findMany();
    for (const sub of subcategorias) {
      await mainDb.subcategoria.upsert({
        where: { id: sub.id },
        update: sub,
        create: sub,
      });
    }
    console.log(`✅ ${subcategorias.length} subcategorias restauradas\n`);

    // 3. Restaurar Lugares
    console.log('📦 Restaurando Lugares...');
    const lugares = await backupDb.lugar.findMany();
    for (const lugar of lugares) {
      await mainDb.lugar.upsert({
        where: { id: lugar.id },
        update: lugar,
        create: lugar,
      });
    }
    console.log(`✅ ${lugares.length} lugares restaurados\n`);

    // 4. Restaurar Cupons
    console.log('📦 Restaurando Cupons...');
    const cupons = await backupDb.cupom.findMany();
    for (const cupom of cupons) {
      await mainDb.cupom.upsert({
        where: { id: cupom.id },
        update: cupom,
        create: cupom,
      });
    }
    console.log(`✅ ${cupons.length} cupons restaurados\n`);

    console.log('🎉 Restauração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a restauração:', error);
    throw error;
  } finally {
    await backupDb.$disconnect();
    await mainDb.$disconnect();
  }
}

restoreData()
  .then(() => {
    console.log('\n✨ Processo finalizado!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Falha na restauração:', error);
    process.exit(1);
  });
