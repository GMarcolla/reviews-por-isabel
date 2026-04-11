// @ts-nocheck
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { getTodosLugares } from '../lib/data';
import { cupons } from '../lib/data/cupons';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding (migração) dos dados estáticos para o banco...');
  
  const lugares = getTodosLugares();
  
  // Clean existing data
  await prisma.cupom.deleteMany();
  await prisma.lugar.deleteMany();
  console.log('Registros antigos removidos.');

  console.log(`Encontrados ${lugares.length} lugares. Migrando...`);
  
  for (const lugar of lugares) {
    await prisma.lugar.create({
      data: {
        id: lugar.id,
        slug: lugar.id,
        nome: lugar.nome,
        categoria: lugar.categoria,
        subcategoria: lugar.subcategoria || null,
        descricaoCurta: lugar.descricaoCurta,
        descricaoCompleta: lugar.descricaoCompleta,
        imagem: lugar.imagem,
        imagemAlt: lugar.imagemAlt,
        endereco: lugar.endereco,
        enderecoGoogleMaps: lugar.enderecoGoogleMaps,
        enderecoGoogleMapsLabel: lugar.enderecoGoogleMapsLabel,
        enderecoGoogleMaps2: lugar.enderecoGoogleMaps2,
        enderecoGoogleMaps2Label: lugar.enderecoGoogleMaps2Label,
        telefone: lugar.telefone,
        instagram: lugar.instagram,
        instagramReview: lugar.instagramReview,
        website: lugar.website,
        horarioFuncionamento: lugar.horarioFuncionamento,
        faixaPreco: lugar.faixaPreco,
        destaque: lugar.destaque || false,
        ordem: lugar.ordem || 0,
      }
    });
  }
  
  console.log(`Encontrados ${cupons.length} cupons. Migrando...`);
  
  for (const cupom of cupons) {
    try {
      await prisma.cupom.create({
        data: {
          id: cupom.id,
          lugarId: cupom.lugarId, // Relaciona com a FK lugarId
          codigo: cupom.codigo,
          descricao: cupom.descricao,
          termos: cupom.termos,
          ativo: cupom.ativo,
        }
      });
    } catch (e) {
      console.warn(`Aviso: Falha ao inserir cupom ${cupom.id} (Lugar ${cupom.lugarId} possivelmente não encontrado)`);
    }
  }

  console.log('✅ Seeding finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
