import { renderToBuffer } from "@react-pdf/renderer";
import { getRoteiro, getRoteiroLugares } from "@/lib/data/roteiro";
import { RoteiroPDF } from "@/components/pdf/RoteiroPDF";

/**
 * GET /api/roteiro/pdf
 *
 * Renders the roteiro as a downloadable PDF. Built from the same `getRoteiro()`
 * source the page uses, so adding an activity to lib/data/roteiro.ts updates
 * both the page and the export.
 */

// Font registration reads .ttf files from disk, so this cannot run on edge.
export const runtime = "nodejs";

// The roteiro is static content; rebuild the PDF at most once an hour.
export const revalidate = 3600;

// Generation takes ~1.6s cold locally; the headroom covers a cold start on
// Vercel having to pull all 11 images from Cloudinary.
export const maxDuration = 30;

const FILENAME = "roteiro-um-dia-em-blumenau.pdf";

export async function GET() {
  try {
    const [roteiro, lugares] = await Promise.all([
      Promise.resolve(getRoteiro()),
      getRoteiroLugares(),
    ]);

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://reviewsporisabel.com.br"
    ).replace(/\/$/, "");

    const buffer = await renderToBuffer(
      <RoteiroPDF roteiro={roteiro} lugares={lugares} siteUrl={siteUrl} />
    );

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${FILENAME}"`,
        "Content-Length": String(buffer.length),
        // `max-age=0` obriga o navegador a revalidar em vez de reusar a cópia
        // local: com um max-age longo, quem baixou antes de uma atualização do
        // roteiro continuaria recebendo o PDF antigo sem sequer consultar o
        // servidor. O `s-maxage` mantém o CDN servindo rápido mesmo assim.
        "Cache-Control":
          "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Erro ao gerar o PDF do roteiro:", error);
    return new Response("Não foi possível gerar o PDF do roteiro.", {
      status: 500,
    });
  }
}
