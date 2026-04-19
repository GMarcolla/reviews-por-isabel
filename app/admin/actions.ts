"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImageFromCloudinary } from "@/lib/cloudinary-server";

export async function createLugar(data: any) {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanData } = data;

  try {
    const slugBase = (cleanData.nome as string)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    let slug = slugBase;

    const existing = await prisma.lugar.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    await prisma.lugar.create({
      data: {
        ...cleanData,
        slug,
        // Converte strings vazias para null nos campos de FK
        categoriaId: cleanData.categoriaId || null,
        subcategoriaId: cleanData.subcategoriaId || null,
      }
    });

  } catch (error) {
    console.error("Error creating lugar:", error);
    throw new Error("Falha ao criar o lugar.");
  }

  revalidatePath("/admin/lugares");
  revalidatePath("/");
  redirect("/admin/lugares");
}

export async function updateLugar(id: string, data: any) {
  const { id: _id, slug: _slug, createdAt: _createdAt, updatedAt: _updatedAt, categoria: _cat, subcategoria: _sub, ...cleanData } = data;

  try {
    const currentLugar = await prisma.lugar.findUnique({
      where: { id },
      select: { imagem: true }
    });

    if (currentLugar && currentLugar.imagem !== cleanData.imagem) {
      await deleteImageFromCloudinary(currentLugar.imagem);
    }

    await prisma.lugar.update({
      where: { id },
      data: {
        ...cleanData,
        categoriaId: cleanData.categoriaId || null,
        subcategoriaId: cleanData.subcategoriaId || null,
      }
    });
  } catch (error) {
    console.error("Error updating lugar:", error);
    throw new Error("Falha ao atualizar o lugar.");
  }

  revalidatePath("/admin/lugares");
  revalidatePath("/");
  redirect("/admin/lugares");
}

export async function deleteLugar(id: string) {
  try {
    const currentLugar = await prisma.lugar.findUnique({
      where: { id },
      select: { imagem: true }
    });

    if (currentLugar?.imagem) {
      await deleteImageFromCloudinary(currentLugar.imagem);
    }

    await prisma.lugar.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting lugar:", error);
    throw new Error("Falha ao remover o lugar.");
  }

  revalidatePath("/admin/lugares");
  revalidatePath("/");
}

// ==========================================
// AÇÕES PARA CUPONS
// ==========================================

export async function createCupom(data: any) {
  try {
    await prisma.cupom.create({ data: { ...data } });
  } catch (error) {
    console.error("Error creating cupom:", error);
    throw new Error("Falha ao criar o cupom.");
  }

  revalidatePath("/admin/cupons");
  revalidatePath("/");
  redirect("/admin/cupons");
}

export async function updateCupom(id: string, data: any) {
  try {
    await prisma.cupom.update({ where: { id }, data: { ...data } });
  } catch (error) {
    console.error("Error updating cupom:", error);
    throw new Error("Falha ao atualizar o cupom.");
  }

  revalidatePath("/admin/cupons");
  revalidatePath("/");
  redirect("/admin/cupons");
}

export async function deleteCupom(id: string) {
  try {
    await prisma.cupom.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting cupom:", error);
    throw new Error("Falha ao remover o cupom.");
  }

  revalidatePath("/admin/cupons");
  revalidatePath("/");
}

// ==========================================
// AÇÕES PARA CATEGORIAS
// ==========================================

export async function createSubcategoria(categoriaId: string, nome: string) {
  try {
    // Calcula a próxima ordem
    const ultima = await prisma.subcategoria.findFirst({
      where: { categoriaId },
      orderBy: { ordem: 'desc' },
      select: { ordem: true },
    });
    const novaOrdem = (ultima?.ordem ?? 0) + 1;

    await prisma.subcategoria.create({
      data: { nome: nome.trim(), categoriaId, ordem: novaOrdem },
    });
  } catch (error) {
    console.error("Error creating subcategoria:", error);
    throw new Error("Falha ao criar a subcategoria.");
  }

  revalidatePath("/admin/categorias");
}

export async function updateSubcategoria(id: string, nome: string) {
  try {
    await prisma.subcategoria.update({
      where: { id },
      data: { nome: nome.trim() },
    });
  } catch (error) {
    console.error("Error updating subcategoria:", error);
    throw new Error("Falha ao atualizar a subcategoria.");
  }

  revalidatePath("/admin/categorias");
}

export async function deleteSubcategoria(id: string) {
  try {
    // Verifica se há lugares vinculados
    const count = await prisma.lugar.count({ where: { subcategoriaId: id } });
    if (count > 0) {
      throw new Error(`Não é possível remover: ${count} lugar(es) estão vinculados a esta subcategoria.`);
    }
    await prisma.subcategoria.delete({ where: { id } });
  } catch (error: any) {
    console.error("Error deleting subcategoria:", error);
    throw new Error(error.message || "Falha ao remover a subcategoria.");
  }

  revalidatePath("/admin/categorias");
}

export async function reorderSubcategorias(items: { id: string; ordem: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.subcategoria.update({
          where: { id: item.id },
          data: { ordem: item.ordem },
        })
      )
    );
  } catch (error) {
    console.error("Error reordering subcategorias:", error);
    throw new Error("Falha ao reordenar as subcategorias.");
  }

  revalidatePath("/admin/categorias");
}
