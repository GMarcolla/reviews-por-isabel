import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { receitaSchema } from '@/lib/validations/receita';
import { uploadReceitaImage, validateImageFile, deleteReceitaImage } from '@/lib/upload-receitas';

/**
 * GET /api/receitas/[id]
 * Busca uma receita específica por ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const receita = await prisma.receita.findUnique({
      where: { id },
    });

    if (!receita) {
      return NextResponse.json(
        { error: 'Receita não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(receita);
  } catch (error) {
    console.error('Erro ao buscar receita:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar receita' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/receitas/[id]
 * Atualiza uma receita existente (requer autenticação)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Verificar autenticação
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Verificar se receita existe
    const receitaExistente = await prisma.receita.findUnique({
      where: { id },
    });

    if (!receitaExistente) {
      return NextResponse.json(
        { error: 'Receita não encontrada' },
        { status: 404 }
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

    // Upload de nova imagem se fornecida
    let imagemUrl = validatedData.imagem || receitaExistente.imagem;
    if (validatedData.imagem && validatedData.imagem.startsWith('data:image/')) {
      // Deletar imagem antiga se existir
      if (receitaExistente.imagem) {
        await deleteReceitaImage(receitaExistente.imagem);
      }
      // Upload da nova imagem
      imagemUrl = await uploadReceitaImage(validatedData.imagem, validatedData.titulo);
    }

    // Atualizar receita
    const receita = await prisma.receita.update({
      where: { id },
      data: {
        titulo: validatedData.titulo,
        convidado: validatedData.convidado,
        ingredientes: validatedData.ingredientes,
        passos: validatedData.passos,
        imagem: imagemUrl,
        opiniao: validatedData.opiniao,
      },
    });

    return NextResponse.json(receita);
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);

    // Erro de validação Zod
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar receita' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/receitas/[id]
 * Deleta uma receita (requer autenticação)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Verificar autenticação
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Verificar se receita existe
    const receita = await prisma.receita.findUnique({
      where: { id },
    });

    if (!receita) {
      return NextResponse.json(
        { error: 'Receita não encontrada' },
        { status: 404 }
      );
    }

    // Deletar imagem do Cloudinary
    if (receita.imagem) {
      await deleteReceitaImage(receita.imagem);
    }

    // Deletar receita do banco
    await prisma.receita.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Receita deletada com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao deletar receita:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar receita' },
      { status: 500 }
    );
  }
}
