import { cloudinary, deleteImageFromCloudinary } from './cloudinary-server';

/**
 * Faz upload de uma imagem de receita para o Cloudinary
 * @param file - Arquivo em base64 ou URL
 * @param titulo - Título da receita (usado para nomear o arquivo)
 * @returns URL da imagem no Cloudinary
 */
export async function uploadReceitaImage(
  file: string,
  titulo: string
): Promise<string> {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary não configurado');
  }

  try {
    // Gerar nome do arquivo baseado no título
    const fileName = titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    // Upload para pasta específica de receitas
    const result = await cloudinary.uploader.upload(file, {
      folder: 'receitas',
      public_id: `${fileName}-${Date.now()}`,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' },
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw new Error('Falha no upload da imagem');
  }
}

/**
 * Deleta uma imagem de receita do Cloudinary
 * @param imageUrl - URL da imagem no Cloudinary
 */
export async function deleteReceitaImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) {
    return;
  }

  try {
    await deleteImageFromCloudinary(imageUrl);
  } catch (error) {
    console.error('Erro ao deletar imagem da receita:', error);
    // Não lançar erro para não bloquear a exclusão da receita
  }
}

/**
 * Valida se o arquivo é uma imagem válida
 * @param base64String - String base64 da imagem
 * @returns true se válido
 */
export function validateImageFile(base64String: string): boolean {
  // Verificar se é base64 válido
  if (!base64String.startsWith('data:image/')) {
    return false;
  }

  // Verificar tipos permitidos
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const mimeType = base64String.split(';')[0].split(':')[1];

  if (!allowedTypes.includes(mimeType)) {
    return false;
  }

  // Verificar tamanho (aproximado, base64 é ~33% maior que o arquivo original)
  const sizeInBytes = (base64String.length * 3) / 4;
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

  if (sizeInBytes > maxSizeInBytes) {
    return false;
  }

  return true;
}
