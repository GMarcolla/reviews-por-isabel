import { Font } from "@react-pdf/renderer";
import path from "path";

/**
 * Design tokens for the exported roteiro PDF.
 *
 * Mirrors the Terracota palette from lib/design-tokens.ts. The roteiro page
 * still uses the legacy `*-tulipa` aliases, which all collapse onto these same
 * values, so the PDF and the page render the same colors.
 */

export const colors = {
  terracota: "#742615",
  terracotaClaro: "#a85a3a",
  terracotaEscuro: "#5f1f11",
  areia: "#c89e82",
  areiaClara: "#d4b09a",
  areiaEscura: "#b88a6a",
  background: "#f6f4f0",
  branco: "#ffffff",

  // Tonal variants — @react-pdf has no color-mix(), so the alpha blends used on
  // the page (bg-beje-tulipa/30, text-marrom-escuro/80, …) are precomputed here
  // against the page background.
  areiaSuave: "#f0e6de", // areia @ ~30% sobre background
  areiaMedia: "#e3d0c2", // areia @ ~55% sobre background
  textoSuave: "#8a5344", // terracota @ ~80%
  textoTenue: "#a07f74", // terracota @ ~55%
} as const;

export const PAGE = {
  width: 595.28,
  height: 841.89,
  paddingTop: 40,
  paddingBottom: 46,
  paddingHorizontal: 45,
} as const;

/** Usable content box after page padding. */
export const CONTENT_WIDTH =
  PAGE.width - PAGE.paddingHorizontal * 2; // 505.28

export const CONTENT_HEIGHT =
  PAGE.height - PAGE.paddingTop - PAGE.paddingBottom; // 755.89

let registered = false;

/**
 * Registers Outfit (the site's display + body face) with @react-pdf.
 *
 * The .ttf files are static instances cut from the variable Outfit[wght].ttf,
 * because @react-pdf/renderer cannot select an axis position from a variable
 * font — it needs one file per weight.
 *
 * Idempotent: re-registering the same family throws in @react-pdf.
 */
export function registerFonts() {
  if (registered) return;

  const dir = path.join(process.cwd(), "public", "fonts");

  Font.register({
    family: "Outfit",
    fonts: [
      { src: path.join(dir, "Outfit-400.ttf"), fontWeight: 400 },
      { src: path.join(dir, "Outfit-600.ttf"), fontWeight: 600 },
      { src: path.join(dir, "Outfit-700.ttf"), fontWeight: 700 },
    ],
  });

  // Portuguese words break badly under the default hyphenation heuristics
  // ("Germâ-nica", "confei-taria"). Disable it and let words wrap whole.
  Font.registerHyphenationCallback((word) => [word]);

  registered = true;
}
