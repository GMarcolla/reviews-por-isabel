import { Cupom, Lugar } from '../types';
import { prisma } from '../prisma';

function mapCupom(dbCupom: any): Cupom {
  return {
    id: dbCupom.id,
    lugarId: dbCupom.lugarId,
    lugarNome: dbCupom.lugar.nome,
    categoria: dbCupom.lugar.categoria,
    subcategoria: dbCupom.lugar.subcategoria || dbCupom.lugar.categoria,
    codigo: dbCupom.codigo,
    descricao: dbCupom.descricao,
    termos: dbCupom.termos || undefined,
    ativo: dbCupom.ativo,
  };
}

export async function getCupons(): Promise<Cupom[]> {
  const cupons = await prisma.cupom.findMany({
    where: { ativo: true },
    include: { lugar: true }
  });
  return cupons.map(mapCupom);
}

export async function getCupomByLugarId(lugarId: string): Promise<Cupom | undefined> {
  const cupom = await prisma.cupom.findFirst({
    where: { lugarId, ativo: true },
    include: { lugar: true }
  });
  return cupom ? mapCupom(cupom) : undefined;
}

export async function getCuponsByLugarId(lugarId: string): Promise<Cupom[]> {
  const cupons = await prisma.cupom.findMany({
    where: { lugarId, ativo: true },
    include: { lugar: true }
  });
  return cupons.map(mapCupom);
}

export async function getCuponsByCategoria(categoria: string): Promise<Cupom[]> {
  const cupons = await prisma.cupom.findMany({
    where: { ativo: true, lugar: { categoria } },
    include: { lugar: true }
  });
  return cupons.map(mapCupom);
}

export async function getCuponsBySubcategoria(subcategoria: string): Promise<Cupom[]> {
  const cupons = await prisma.cupom.findMany({
    where: { ativo: true, lugar: { subcategoria } },
    include: { lugar: true }
  });
  return cupons.map(mapCupom);
}

export async function searchCupons(query: string): Promise<Cupom[]> {
  const cupons = await prisma.cupom.findMany({
    where: {
      ativo: true,
      OR: [
        { descricao: { contains: query, mode: 'insensitive' } },
        { lugar: { nome: { contains: query, mode: 'insensitive' } } }
      ]
    },
    include: { lugar: true }
  });
  return cupons.map(mapCupom);
}
