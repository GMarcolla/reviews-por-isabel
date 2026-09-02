/**
 * Uploads the roteiro images from public/roteiro/ to Cloudinary.
 *
 * The local files are unoptimized originals (~16MB total). Cloudinary keeps the
 * original and serves transformed derivatives, which is what both the web page
 * and the PDF export consume.
 *
 * Idempotent: uses a fixed public_id per file, so re-running overwrites the same
 * asset instead of creating duplicates.
 *
 * Usage: npx tsx scripts/upload-roteiro-images.ts [--dry-run]
 */

import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { readdirSync, statSync } from "fs";
import { join, parse } from "path";

config();

const FOLDER = "roteiro";
const SOURCE_DIR = join(process.cwd(), "public", "roteiro");
const DRY_RUN = process.argv.includes("--dry-run");

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`❌ Variável de ambiente ausente: ${name}`);
    process.exit(1);
  }
  return value;
}

cloudinary.config({
  cloud_name: requireEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  api_key: requireEnv("CLOUDINARY_API_KEY"),
  api_secret: requireEnv("CLOUDINARY_API_SECRET"),
  secure: true,
});

function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  const files = readdirSync(SOURCE_DIR).filter((f) =>
    /\.(jpe?g|png|webp)$/i.test(f)
  );

  if (files.length === 0) {
    console.error(`❌ Nenhuma imagem encontrada em ${SOURCE_DIR}`);
    process.exit(1);
  }

  const totalBytes = files.reduce(
    (sum, f) => sum + statSync(join(SOURCE_DIR, f)).size,
    0
  );

  console.log(`📁 ${files.length} imagens em public/roteiro/ (${formatBytes(totalBytes)})`);
  console.log(`☁️  Destino: ${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${FOLDER}/`);
  if (DRY_RUN) console.log("🔍 DRY RUN — nada será enviado\n");
  else console.log("");

  const mapping: Record<string, string> = {};
  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const localPath = join(SOURCE_DIR, file);
    const publicId = parse(file).name; // ex: "cafe-haus-roteiro"
    const size = statSync(localPath).size;

    if (DRY_RUN) {
      console.log(`   ${file.padEnd(34)} ${formatBytes(size).padStart(8)}  →  ${FOLDER}/${publicId}`);
      continue;
    }

    try {
      const result = await cloudinary.uploader.upload(localPath, {
        folder: FOLDER,
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: "image",
      });

      mapping[`/roteiro/${file}`] = result.secure_url;
      uploaded++;
      console.log(`✅ ${file.padEnd(34)} ${formatBytes(size).padStart(8)}  →  ${result.secure_url}`);
    } catch (error) {
      failed++;
      console.error(`❌ ${file}:`, error instanceof Error ? error.message : error);
    }
  }

  if (DRY_RUN) return;

  console.log(`\n📊 ${uploaded} enviadas, ${failed} falharam\n`);

  if (uploaded > 0) {
    console.log("Mapeamento (caminho local → URL Cloudinary):\n");
    console.log(JSON.stringify(mapping, null, 2));
  }

  if (failed > 0) process.exit(1);
}

main().catch((error) => {
  console.error("Erro fatal:", error);
  process.exit(1);
});
