import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { receitaSchema } from '@/lib/validations/receita';
import { generateUniqueSlug } from '@/lib/utils';
import { uploadReceitaImage, validateImageFile } from '@/lib/upload-receitas';

/**
 * GET /api/receitas
 * Lista todas as receitas ordenadas por data de criação
 */
export async function GET() {
  try {
    const receitas = await prisma.receita.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(receitas);
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar receitas' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/receitas
 * Cria uma nova receita (requer autenticação)
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Parse e validação do body
    const body = await request.json();
    
    // Validar imagem se fornecida
    if (body.imagem && body.imagem.startsWith('data:image/')) {
      if (!validateImageFile(body.imagem)) {
        return NextResponse.json(
          { error: 'Imagem inválida. Use JPEG, PNG ou WebP com no máximo 5MB' },
          { status: 400 }
        );
      }
    }

    const validatedData = receitaSchema.parse(body);

    // Gerar slug único
    const slug = await generateUniqueSlug(validatedData.titulo);

    // Upload da imagem se fornecida
    let imagemUrl = validatedData.imagem || '';
    if (validatedData.imagem && validatedData.imagem.startsWith('data:image/')) {
      imagemUrl = await uploadReceitaImage(validatedData.imagem, validatedData.titulo);
    }

    // Criar receita no banco
    const receita = await prisma.receita.create({
      data: {
        slug,
        titulo: validatedData.titulo,
        convidado: validatedData.convidado,
        ingredientes: validatedData.ingredientes,
        passos: validatedData.passos,
        imagem: imagemUrl,
        opiniao: validatedData.opiniao,
      },
    });

    return NextResponse.json(receita, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar receita:', error);

    // Erro de validação Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao criar receita' },
      { status: 500 }
    );
  }
}
