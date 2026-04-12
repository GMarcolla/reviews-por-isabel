import { v2 as cloudinary } from "cloudinary";

// Configura o Cloudinary apenas se as chaves estiverem presentes (evita erros em build time se não houver env)
if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Extrai o public_id de uma URL do Cloudinary
 * Ex: https://res.cloudinary.com/demo/image/upload/v12345/folder/sample.jpg -> folder/sample
 */
export function extractPublicId(url: string): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;

  try {
    // Regex para pegar o que vem depois de /upload/(v\d+/)? e antes da extensão
    // Ex: .../upload/v12345/pasta/imagem.jpg -> pasta/imagem
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;

    const afterUpload = parts[1];
    
    // Remove a versão (v12345678/) se existir
    const pathWithoutVersion = afterUpload.replace(/^v\d+\//, "");
    
    // Remove a extensão do arquivo (.jpg, .png, etc)
    const publicId = pathWithoutVersion.split(".")[0];
    
    return publicId;
  } catch (error) {
    console.error("Erro ao extrair public_id:", error);
    return null;
  }
}

/**
 * Deleta uma imagem do Cloudinary usando sua URL
 */
export async function deleteImageFromCloudinary(url: string) {
  const publicId = extractPublicId(url);
  
  if (!publicId) {
    console.log("Não foi possível extrair public_id da URL ou não é uma imagem Cloudinary:", url);
    return;
  }

  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn("Cloudinary API Key ou Secret não configurados. Abortando exclusão.");
    return;
  }

  try {
    console.log(`Tentando deletar imagem do Cloudinary: ${publicId}`);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Resultado da exclusão no Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Erro ao deletar imagem do Cloudinary:", error);
    throw error;
  }
}

export { cloudinary };
