const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lugares = await prisma.lugar.findMany({
    select: { id: true, nome: true, categoria: true, subcategoria: true }
  });
  console.log('--- LUGARES NO BANCO DE DADOS ---');
  for (const l of lugares) {
    console.log('[ID: ' + l.id.slice(0,8) + '] ' + l.nome + ' | C: ' + l.categoria + ' | Sub: ' + l.subcategoria);
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
