/**
 * Seed Script - Categorias e Subcategorias
 *
 * Este script:
 * 1. Cria as 5 categorias canônicas
 * 2. Cria todas as subcategorias (listadas pelo usuário + existentes no código)
 * 3. Migra todos os Lugar existentes apontando categoriaId e subcategoriaId corretos
 * 4. Trata os mapeamentos de nomes antigos para novos
 *
 * Execução: npx ts-node prisma/seed-categorias.ts
 * Ou via: npx prisma db seed (se configurado no package.json)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Definição das categorias e subcategorias
// ---------------------------------------------------------------------------

const SEED_CATEGORIAS = [
  {
    id: 'cat_rest',
    nome: 'Restaurantes',
    slug: 'restaurantes',
    rota: 'restaurantes',
    label: 'Restaurantes',
    ordem: 1,
    subcategorias: [
      { id: 'sub_bar', nome: 'Bar', ordem: 1 },
      { id: 'sub_bares', nome: 'Bares', ordem: 2 },
      { id: 'sub_buffets', nome: 'Buffets', ordem: 3 },
      { id: 'sub_coreano', nome: 'Coreano', ordem: 4 },
      { id: 'sub_empadas', nome: 'Empadas', ordem: 5 },
      { id: 'sub_esfirrarias', nome: 'Esfirrarias', ordem: 6 },
      { id: 'sub_gelateria', nome: 'Gelateria', ordem: 7 },
      { id: 'sub_hamburgueria', nome: 'Hamburgueria', ordem: 8 },
      { id: 'sub_hotdogs', nome: 'Hot Dogs', ordem: 9 },
      { id: 'sub_italiano', nome: 'Italiano', ordem: 10 },
      { id: 'sub_japones', nome: 'Japonês', ordem: 11 },
      { id: 'sub_mexicano', nome: 'Mexicano', ordem: 12 },
      { id: 'sub_padaria', nome: 'Padaria', ordem: 13 },
      { id: 'sub_pastelaria', nome: 'Pastelaria', ordem: 14 },
      { id: 'sub_pizza', nome: 'Pizza', ordem: 15 },
      { id: 'sub_germanico', nome: 'Restaurantes Germânicos', ordem: 16 },
      { id: 'sub_romantico', nome: 'Romântico', ordem: 17 },
      { id: 'sub_rest_outro', nome: 'Outro', ordem: 18 },
    ],
  },
  {
    id: 'cat_cafe',
    nome: 'Cafés e Docerias',
    slug: 'cafes',
    rota: 'cafes',
    label: 'Cafés e Docerias',
    ordem: 2,
    subcategorias: [
      { id: 'sub_brunch', nome: 'Brunch', ordem: 1 },
      { id: 'sub_cafeteria', nome: 'Cafeteria', ordem: 2 },
      { id: 'sub_doceria', nome: 'Doceria', ordem: 3 },
      { id: 'sub_sorveteria', nome: 'Sorveteria', ordem: 4 },
      { id: 'sub_cafe_outro', nome: 'Outro', ordem: 5 },
    ],
  },
  {
    id: 'cat_pass',
    nome: 'Passeios',
    slug: 'passeios',
    rota: 'lazer',
    label: 'Lazer & Passeios',
    ordem: 3,
    subcategorias: [
      { id: 'sub_concerto', nome: 'Concerto', ordem: 1 },
      { id: 'sub_evento', nome: 'Evento', ordem: 2 },
      { id: 'sub_festival', nome: 'Festival', ordem: 3 },
      { id: 'sub_mirante', nome: 'Mirante', ordem: 4 },
      { id: 'sub_museu', nome: 'Museu', ordem: 5 },
      { id: 'sub_parque', nome: 'Parque', ordem: 6 },
      { id: 'sub_pass_outro', nome: 'Outro', ordem: 7 },
    ],
  },
  {
    id: 'cat_loja',
    nome: 'Onde Comprar',
    slug: 'onde-comprar',
    rota: 'lojas',
    label: 'Onde Comprar',
    ordem: 4,
    subcategorias: [
      { id: 'sub_decoracao', nome: 'Decoração', ordem: 1 },
      { id: 'sub_eletronicos', nome: 'Eletrônicos', ordem: 2 },
      { id: 'sub_livraria', nome: 'Livraria', ordem: 3 },
      { id: 'sub_moda', nome: 'Moda', ordem: 4 },
      { id: 'sub_presentes', nome: 'Presentes', ordem: 5 },
      { id: 'sub_loja_outro', nome: 'Outro', ordem: 6 },
    ],
  },
  {
    id: 'cat_serv',
    nome: 'Serviços',
    slug: 'servicos',
    rota: 'prestadores',
    label: 'Serviços',
    ordem: 5,
    subcategorias: [
      { id: 'sub_arquiteta', nome: 'Arquiteta', ordem: 1 },
      { id: 'sub_beleza', nome: 'Beleza / Estética', ordem: 2 },
      { id: 'sub_dentista', nome: 'Dentista', ordem: 3 },
      { id: 'sub_unhas', nome: 'Unhas', ordem: 4 },
      { id: 'sub_serv_outro', nome: 'Outro', ordem: 5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Mapeamento de nomes legados de CATEGORIA (campo string) → categoriaId
// ---------------------------------------------------------------------------
const MAPA_CATEGORIA_LEGADO: Record<string, string> = {
  // Canônicas
  'restaurantes': 'cat_rest',
  'cafés e docerias': 'cat_cafe',
  'passeios': 'cat_pass',
  'onde comprar': 'cat_loja',
  'serviços': 'cat_serv',
  // Legados
  'hamburgueria': 'cat_rest',
  'esfirraria': 'cat_rest',
  'padaria': 'cat_rest',
  'gelateria': 'cat_rest',
  'pastelaria': 'cat_rest',
  'empadas': 'cat_rest',
  'hotdog': 'cat_rest',
  'germanico': 'cat_rest',
  'buffet': 'cat_rest',
  'bar': 'cat_rest',
  'coreano': 'cat_rest',
  'mexicano': 'cat_rest',
  'italiano': 'cat_rest',
  'japones': 'cat_rest',
  'japonês': 'cat_rest',
  'pizzaria': 'cat_rest',
  'romantico': 'cat_rest',
  'cafeteria': 'cat_cafe',
  'doceria': 'cat_cafe',
  'brunch': 'cat_cafe',
  'evento': 'cat_pass',
  'concerto': 'cat_pass',
  'festival': 'cat_pass',
  'parque': 'cat_pass',
  'lazer': 'cat_pass',
  'dentista': 'cat_serv',
  'arquiteta': 'cat_serv',
  'unhas': 'cat_serv',
  'beleza': 'cat_serv',
  'servico': 'cat_serv',
  'moda': 'cat_loja',
  'decoracao': 'cat_loja',
  'decoração': 'cat_loja',
  'livraria': 'cat_loja',
  'loja': 'cat_loja',
};

// ---------------------------------------------------------------------------
// Mapeamento de nomes legados de SUBCATEGORIA (string) → subcategoriaId
// Formato: "categoriaId|nomeAntigo" → subcategoriaId
// ---------------------------------------------------------------------------
const MAPA_SUBCATEGORIA_LEGADO: Record<string, string> = {
  // Restaurantes — nomes que mudaram
  'cat_rest|esfirraria': 'sub_esfirrarias',
  'cat_rest|hot dog': 'sub_hotdogs',
  'cat_rest|buffet': 'sub_buffets',
  'cat_rest|alemão / germânico': 'sub_germanico',
  'cat_rest|pizzaria': 'sub_pizza',
  'cat_rest|romantico': 'sub_romantico',
  'cat_rest|hotdog': 'sub_hotdogs',
  'cat_rest|germanico': 'sub_germanico',
  // Restaurantes — nomes que mantêm (mas vieram via campo categoria legado)
  'cat_rest|hamburgueria': 'sub_hamburgueria',
  'cat_rest|bar': 'sub_bar',
  'cat_rest|coreano': 'sub_coreano',
  'cat_rest|mexicano': 'sub_mexicano',
  'cat_rest|italiano': 'sub_italiano',
  'cat_rest|japonês': 'sub_japones',
  'cat_rest|japones': 'sub_japones',
  'cat_rest|padaria': 'sub_padaria',
  'cat_rest|pastelaria': 'sub_pastelaria',
  'cat_rest|empadas': 'sub_empadas',
  'cat_rest|gelateria': 'sub_gelateria',
  'cat_rest|pizza': 'sub_pizza',
  'cat_rest|romântico': 'sub_romantico',
  // Cafés
  'cat_cafe|cafeteria': 'sub_cafeteria',
  'cat_cafe|doceria': 'sub_doceria',
  'cat_cafe|brunch': 'sub_brunch',
  'cat_cafe|sorveteria': 'sub_sorveteria',
  // Passeios
  'cat_pass|parque': 'sub_parque',
  'cat_pass|evento': 'sub_evento',
  'cat_pass|festival': 'sub_festival',
  'cat_pass|concerto': 'sub_concerto',
  'cat_pass|museu': 'sub_museu',
  'cat_pass|mirante': 'sub_mirante',
  // Serviços
  'cat_serv|dentista': 'sub_dentista',
  'cat_serv|arquiteta': 'sub_arquiteta',
  'cat_serv|unhas': 'sub_unhas',
  'cat_serv|beleza / estética': 'sub_beleza',
  'cat_serv|beleza': 'sub_beleza',
  // Lojas
  'cat_loja|moda': 'sub_moda',
  'cat_loja|decoração': 'sub_decoracao',
  'cat_loja|decoracao': 'sub_decoracao',
  'cat_loja|livraria': 'sub_livraria',
  // Outro (todas as categorias)
  'cat_rest|outro': 'sub_rest_outro',
  'cat_cafe|outro': 'sub_cafe_outro',
  'cat_pass|outro': 'sub_pass_outro',
  'cat_loja|outro': 'sub_loja_outro',
  'cat_serv|outro': 'sub_serv_outro',
  // Nomes novos que já chegam no banco com grafia atualizada (vindos de cadastros manuais)
  'cat_rest|restaurantes germânicos': 'sub_germanico',
  'cat_rest|esfirrarias': 'sub_esfirrarias',
  'cat_rest|hot dogs': 'sub_hotdogs',
  'cat_rest|buffets': 'sub_buffets',
  'cat_rest|bares': 'sub_bares',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveCategoria(legadoCategoria: string | null | undefined): string | null {
  if (!legadoCategoria) return null;
  const key = legadoCategoria.toLowerCase().trim();
  return MAPA_CATEGORIA_LEGADO[key] ?? null;
}

function resolveSubcategoria(
  categoriaId: string,
  legadoSubcategoria: string | null | undefined
): string | null {
  if (!legadoSubcategoria) return null;
  const key = `${categoriaId}|${legadoSubcategoria.toLowerCase().trim()}`;
  return MAPA_SUBCATEGORIA_LEGADO[key] ?? null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('🌱 Iniciando seed de categorias e subcategorias...\n');

  // 1. Criar categorias e subcategorias (upsert para idempotência)
  for (const cat of SEED_CATEGORIAS) {
    const { subcategorias, ...catData } = cat;

    await prisma.categoria.upsert({
      where: { id: catData.id },
      update: {
        nome: catData.nome,
        slug: catData.slug,
        rota: catData.rota,
        label: catData.label,
        ordem: catData.ordem,
      },
      create: catData,
    });

    for (const sub of subcategorias) {
      await prisma.subcategoria.upsert({
        where: { id: sub.id },
        update: { nome: sub.nome, ordem: sub.ordem },
        create: { ...sub, categoriaId: catData.id },
      });
    }

    console.log(`✅ Categoria "${catData.nome}" com ${subcategorias.length} subcategorias`);
  }



  console.log('\n✨ Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
