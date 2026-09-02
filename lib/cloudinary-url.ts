/**
 * Builds Cloudinary delivery URLs with transformations injected.
 *
 * Cloudinary transformations go between `/upload/` and the version segment:
 *   .../image/upload/w_1000,q_auto,f_jpg/v123/roteiro/foo.jpg
 *
 * Stored URLs are kept transformation-free so the same asset can be served at
 * different sizes/formats per consumer (web page vs. PDF export).
 */

export interface CloudinaryTransform {
  /** Target width in pixels */
  width?: number;
  /** Target height in pixels */
  height?: number;
  /** Crop mode — `limit` never upscales, `fill` crops to exact dimensions */
  crop?: "limit" | "fill" | "fit" | "scale";
  /** Focus point when cropping */
  gravity?: "auto" | "center" | "face";
  /** Quality — `auto` lets Cloudinary decide, or 1-100 */
  quality?: "auto" | "auto:good" | "auto:eco" | "auto:low" | number;
  /**
   * Output format. Use an explicit format for consumers that can't negotiate:
   * @react-pdf/renderer only decodes JPEG and PNG, so the PDF export must not
   * use `auto` (which can yield WebP/AVIF).
   */
  format?: "auto" | "jpg" | "png" | "webp";
}

function isCloudinaryUrl(url: string): boolean {
  return url.includes("res.cloudinary.com") && url.includes("/upload/");
}

function buildTransformSegment(transform: CloudinaryTransform): string {
  const parts: string[] = [];

  if (transform.width) parts.push(`w_${transform.width}`);
  if (transform.height) parts.push(`h_${transform.height}`);
  if (transform.crop) parts.push(`c_${transform.crop}`);
  if (transform.gravity) parts.push(`g_${transform.gravity}`);
  if (transform.quality) parts.push(`q_${transform.quality}`);
  if (transform.format) parts.push(`f_${transform.format}`);

  return parts.join(",");
}

/**
 * Returns `url` with the given transformations applied.
 * Non-Cloudinary URLs (e.g. local `/roteiro/foo.jpg`) are returned untouched,
 * so this is safe to call on mixed sources.
 */
export function cloudinaryUrl(
  url: string,
  transform: CloudinaryTransform
): string {
  if (!url || !isCloudinaryUrl(url)) return url;

  const segment = buildTransformSegment(transform);
  if (!segment) return url;

  const [base, rest] = url.split("/upload/");
  return `${base}/upload/${segment}/${rest}`;
}

/**
 * Image sized for embedding in the exported PDF.
 *
 * 1000px wide covers the largest layout (full-width hero at ~505pt on A4,
 * ~2x for print density) without bloating the file. Forced to JPEG because
 * @react-pdf/renderer cannot decode WebP or AVIF.
 */
export function pdfImageUrl(url: string, width = 1000): string {
  return cloudinaryUrl(url, {
    width,
    crop: "limit",
    quality: "auto:good",
    format: "jpg",
  });
}
