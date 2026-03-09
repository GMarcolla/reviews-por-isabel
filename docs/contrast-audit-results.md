# Contrast Audit Results - Paleta Tulipas

## Overview

This document summarizes the WCAG AA contrast audit performed on the Tulipas color palette for the Reviews por Isabel website.

**Audit Date:** 2024
**Standard:** WCAG AA
**Tool:** color2k library
**Total Combinations Tested:** 26
**Result:** ✅ All combinations pass WCAG AA standards

## WCAG AA Requirements

- **Normal text** (< 18px): Minimum contrast ratio of **4.5:1**
- **Large text** (≥ 18px or ≥ 14px bold): Minimum contrast ratio of **3.0:1**
- **Focus indicators**: Minimum contrast ratio of **3.0:1**

## Color Adjustments Made

During the audit, several colors were adjusted to meet WCAG AA standards:

### 1. Verde Tulipa Claro (Hover State)
- **Original:** `#6b7f4f` (contrast: 4.4:1 ❌)
- **Adjusted:** `#5d6f3f` (contrast: 5.51:1 ✅)
- **Usage:** Secondary button hover state, passeios category badge

### 2. Rosa Tulipa Claro (Hover State)
- **Original:** `#d83d7f` (contrast: 4.29:1 ❌)
- **Adjusted:** `#c21a6a` (contrast: 5.75:1 ✅)
- **Usage:** Primary button hover state, link hover state, lojas category badge

### 3. Beje Tulipa Escuro (Footer Links)
- **Created:** `#e8e0a8` (contrast: 5.23:1 ✅)
- **Usage:** Footer links on verde-tulipa background

### 4. Focus Indicators
- **Light backgrounds:** Rosa tulipa `#c80c66` (contrast: 5.41:1+ ✅)
- **Dark backgrounds:** Off-white rosado `#fff8f6` (contrast: 6.68:1 ✅)

## Audit Results by Category

### ✅ Semantic Colors (All Pass)

| Context | Foreground | Background | Contrast | Status |
|---------|-----------|------------|----------|--------|
| Header Text | #4a2f2f | #ffffff | 12.08:1 | ✅ Pass |
| Header Active | #4d5f2f | #ffffff | 7.02:1 | ✅ Pass |
| Button Primary | #ffffff | #c80c66 | 5.68:1 | ✅ Pass |
| Button Primary Hover | #ffffff | #c21a6a | 5.75:1 | ✅ Pass |
| Button Primary Active | #ffffff | #a00a52 | 7.89:1 | ✅ Pass |
| Button Secondary | #ffffff | #4d5f2f | 7.02:1 | ✅ Pass |
| Button Secondary Hover | #ffffff | #5d6f3f | 5.51:1 | ✅ Pass |
| Button Secondary Active | #ffffff | #3d4f1f | 8.99:1 | ✅ Pass |
| Card Text | #4a2f2f | #ffffff | 12.08:1 | ✅ Pass |
| Badge Text | #4a2f2f | #cec683 | 6.92:1 | ✅ Pass |
| Link on Primary BG | #c80c66 | #fff8f6 | 5.41:1 | ✅ Pass |
| Link on Secondary BG | #c80c66 | #ffffff | 5.68:1 | ✅ Pass |
| Link Hover | #c21a6a | #fff8f6 | 5.48:1 | ✅ Pass |
| Footer Text | #fff8f6 | #4d5f2f | 6.68:1 | ✅ Pass |
| Footer Link | #e8e0a8 | #4d5f2f | 5.23:1 | ✅ Pass |
| Body on Primary BG | #4a2f2f | #fff8f6 | 11.51:1 | ✅ Pass |
| Body on White BG | #4a2f2f | #ffffff | 12.08:1 | ✅ Pass |

### ✅ Category Badges (All Pass)

| Category | Badge Color | Text Color | Contrast | Status |
|----------|------------|------------|----------|--------|
| Restaurantes | #c80c66 | #ffffff | 5.68:1 | ✅ Pass |
| Cafés | #cec683 | #4a2f2f | 6.92:1 | ✅ Pass |
| Lazer | #4d5f2f | #ffffff | 7.02:1 | ✅ Pass |
| Prestadores | #4a2f2f | #ffffff | 12.08:1 | ✅ Pass |
| Lojas | #c80c66 | #ffffff | 5.68:1 | ✅ Pass |
| Passeios | #4d5f2f | #ffffff | 7.02:1 | ✅ Pass |

### ✅ Focus Indicators (All Pass)

| Context | Indicator Color | Background | Contrast | Status |
|---------|----------------|------------|----------|--------|
| Light backgrounds | #c80c66 | #fff8f6 | 5.41:1 | ✅ Pass |
| White backgrounds | #c80c66 | #ffffff | 5.68:1 | ✅ Pass |
| Dark backgrounds | #fff8f6 | #4d5f2f | 6.68:1 | ✅ Pass |

## Implementation Notes

### Design Tokens Updated
All adjusted colors have been updated in `lib/design-tokens.ts`:
- `verdeTulipaClaro`: `#5d6f3f`
- `rosaTulipaClaro`: `#c21a6a`
- `bejeTulipaEscuro`: `#e8e0a8` (new)
- Added `focusRing` and `focusRingOnDark` semantic colors

### Tailwind Config Updated
All color classes in `tailwind.config.ts` have been updated to match the adjusted values.

### Global Styles Updated
- Link hover color updated to use adjusted `rosa-tulipa-claro`
- Focus indicator styles added for dark backgrounds

### Category Colors Updated
- **Lojas:** Changed from `rosaTulipaClaro` to `rosaTulipa` (main color)
- **Passeios:** Changed from `verdeTulipaClaro` to `verdeTulipa` (main color)

## Testing

### Automated Testing
Run the contrast audit script:
```bash
npm run audit-contrast
```

This script tests all 26 color combinations and reports any that fail WCAG AA standards.

### Manual Testing Checklist
- [ ] Test focus indicators on light backgrounds (header, cards)
- [ ] Test focus indicators on dark backgrounds (footer)
- [ ] Verify button hover states have sufficient contrast
- [ ] Check link hover states on all background colors
- [ ] Verify category badges are readable
- [ ] Test with browser zoom at 200%
- [ ] Test with high contrast mode enabled

## Compliance Statement

All color combinations in the Tulipas palette meet or exceed WCAG AA standards for:
- Normal text (4.5:1 minimum)
- Large text (3.0:1 minimum)
- Focus indicators (3.0:1 minimum)

The palette is suitable for use in accessible web applications and complies with international accessibility standards.

## References

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [color2k Library](https://github.com/ricokahler/color2k)

## Maintenance

When adding new color combinations:
1. Add the combination to `scripts/audit-contrast.ts`
2. Run `npm run audit-contrast`
3. Adjust colors if needed to meet 4.5:1 (normal text) or 3.0:1 (large text/focus)
4. Update this document with the results
