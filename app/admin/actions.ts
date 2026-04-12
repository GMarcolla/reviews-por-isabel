"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteImageFromCloudinary } from "@/lib/cloudinary-server";

export async function createLugar(data: any) {
  // Remove campos gerenciados pelo Prisma
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanData } = data;

  try {
    // Gera slug único baseado no nome
    const slugBase = (cleanData.nome as string)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    let slug = slugBase;

    // Garante unicidade do slug
    const existing = await prisma.lugar.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    await prisma.lugar.create({
      data: {
        ...cleanData,
        slug
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
  // Remove campos gerenciados pelo Prisma que não podem ser atualizados diretamente
  const { id: _id, slug: _slug, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanData } = data;

  try {
    // 1. Busca o lugar atual para verificar a imagem antiga
    const currentLugar = await prisma.lugar.findUnique({
      where: { id },
      select: { imagem: true }
    });

    // 2. Se a imagem mudou, deleta a antiga do Cloudinary
    if (currentLugar && currentLugar.imagem !== cleanData.imagem) {
      await deleteImageFromCloudinary(currentLugar.imagem);
    }

    // 3. Atualiza no banco
    await prisma.lugar.update({
      where: { id },
      data: cleanData
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
    // 1. Busca o lugar para obter a URL da imagem
    const currentLugar = await prisma.lugar.findUnique({
      where: { id },
      select: { imagem: true }
    });

    // 2. Se existe, deleta do Cloudinary
    if (currentLugar?.imagem) {
      await deleteImageFromCloudinary(currentLugar.imagem);
    }

    // 3. Deleta do banco
    await prisma.lugar.delete({
      where: { id }
    });
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
    await prisma.cupom.create({
      data: {
        ...data
      }
    });
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
    await prisma.cupom.update({
      where: { id },
      data: {
        ...data
      }
    });
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
    await prisma.cupom.delete({
      where: { id }
    });
  } catch (error) {
    console.error("Error deleting cupom:", error);
    throw new Error("Falha ao remover o cupom.");
  }

  revalidatePath("/admin/cupons");
  revalidatePath("/");
}
