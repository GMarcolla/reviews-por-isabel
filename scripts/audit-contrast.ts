/**
 * Contrast Audit Script
 * 
 * Audits all color combinations in the design system to ensure WCAG AA compliance:
 * - Normal text (< 18px): minimum 4.5:1 contrast ratio
 * - Large text (≥ 18px or ≥ 14px bold): minimum 3.0:1 contrast ratio
 * - Focus indicators: minimum 3.0:1 contrast ratio
 */

import { getContrast } from 'color2k';
import { colors, semanticColors, categoryColors } from '../lib/design-tokens';

// WCAG AA contrast requirements
const WCAG_AA_NORMAL_TEXT = 4.5;
const WCAG_AA_LARGE_TEXT = 3.0;
const WCAG_AA_FOCUS_INDICATOR = 3.0;

interface ContrastResult {
  foreground: string;
  background: string;
  contrast: number;
  passes: {
    normalText: boolean;
    largeText: boolean;
    focusIndicator: boolean;
  };
  context: string;
}

/**
 * Calculate contrast ratio between two colors
 */
function calculateContrast(fg: string, bg: string): number {
  try {
    return getContrast(fg, bg);
  } catch (error) {
    console.error(`Error calculating contrast for ${fg} on ${bg}:`, error);
    return 0;
  }
}

/**
 * Check if a contrast ratio passes WCAG requirements
 */
function checkContrast(contrast: number) {
  return {
    normalText: contrast >= WCAG_AA_NORMAL_TEXT,
    largeText: contrast >= WCAG_AA_LARGE_TEXT,
    focusIndicator: contrast >= WCAG_AA_FOCUS_INDICATOR,
  };
}

/**
 * Audit a color combination
 */
function auditCombination(
  fg: string,
  bg: string,
  context: string
): ContrastResult {
  const contrast = calculateContrast(fg, bg);
  const passes = checkContrast(contrast);

  return {
    foreground: fg,
    background: bg,
    contrast: Math.round(contrast * 100) / 100,
    passes,
    context,
  };
}

/**
 * Main audit function
 */
function auditAllCombinations(): ContrastResult[] {
  const results: ContrastResult[] = [];

  // 1. Audit semantic color combinations
  console.log('\n=== Auditing Semantic Colors ===\n');

  // Header
  results.push(
    auditCombination(
      semanticColors.headerText,
      semanticColors.headerBg,
      'Header: Text on Background'
    )
  );
  results.push(
    auditCombination(
      semanticColors.headerTextActive,
      semanticColors.headerBg,
      'Header: Active Text on Background'
    )
  );

  // Primary Buttons
  results.push(
    auditCombination(
      semanticColors.btnPrimaryText,
      semanticColors.btnPrimaryBg,
      'Button Primary: Text on Background'
    )
  );
  results.push(
    auditCombination(
      semanticColors.btnPrimaryText,
      semanticColors.btnPrimaryHover,
      'Button Primary: Text on Hover'
    )
  );
  results.push(
    auditCombination(
      semanticColors.btnPrimaryText,
      semanticColors.btnPrimaryActive,
      'Button Primary: Text on Active'
    )
  );

  // Secondary Buttons
  results.push(
    auditCombination(
      semanticColors.btnSecondaryText,
      semanticColors.btnSecondaryBg,
      'Button Secondary: Text on Background'
    )
  );
  results.push(
    auditCombination(
      semanticColors.btnSecondaryText,
      semanticColors.btnSecondaryHover,
      'Button Secondary: Text on Hover'
    )
  );
  results.push(
    auditCombination(
      semanticColors.btnSecondaryText,
      semanticColors.btnSecondaryActive,
      'Button Secondary: Text on Active'
    )
  );

  // Cards
  results.push(
    auditCombination(
      semanticColors.cardText,
      semanticColors.cardBg,
      'Card: Text on Background'
    )
  );

  // Badges
  results.push(
    auditCombination(
      semanticColors.badgeText,
      semanticColors.badgeBg,
      'Badge: Text on Background'
    )
  );

  // Links
  results.push(
    auditCombination(
      semanticColors.linkText,
      semanticColors.sectionBgPrimary,
      'Link: Text on Primary Section Background'
    )
  );
  results.push(
    auditCombination(
      semanticColors.linkText,
      semanticColors.sectionBgSecondary,
      'Link: Text on Secondary Section Background'
    )
  );
  results.push(
    auditCombination(
      semanticColors.linkHover,
      semanticColors.sectionBgPrimary,
      'Link Hover: Text on Primary Section Background'
    )
  );

  // Footer
  results.push(
    auditCombination(
      semanticColors.footerText,
      semanticColors.footerBg,
      'Footer: Text on Background'
    )
  );
  results.push(
    auditCombination(
      semanticColors.footerLink,
      semanticColors.footerBg,
      'Footer: Link on Background'
    )
  );

  // Body text on backgrounds
  results.push(
    auditCombination(
      colors.marromEscuro,
      colors.offWhiteRosado,
      'Body: Text on Primary Background'
    )
  );
  results.push(
    auditCombination(
      colors.marromEscuro,
      colors.branco,
      'Body: Text on White Background'
    )
  );

  // 2. Audit category badge combinations
  console.log('\n=== Auditing Category Colors ===\n');

  Object.entries(categoryColors).forEach(([category, colorScheme]) => {
    results.push(
      auditCombination(
        colorScheme.badgeText,
        colorScheme.badge,
        `Category Badge (${category}): Text on Background`
      )
    );
  });

  // 3. Audit focus indicators
  console.log('\n=== Auditing Focus Indicators ===\n');

  // Focus outline on different backgrounds
  results.push(
    auditCombination(
      colors.rosaTulipa,
      colors.offWhiteRosado,
      'Focus Indicator: Rosa on Off-White Background'
    )
  );
  results.push(
    auditCombination(
      colors.rosaTulipa,
      colors.branco,
      'Focus Indicator: Rosa on White Background'
    )
  );
  results.push(
    auditCombination(
      colors.offWhiteRosado,
      colors.verdeTulipa,
      'Focus Indicator: Off-White on Verde Background (dark bg)'
    )
  );

  return results;
}

/**
 * Format and display results
 */
function displayResults(results: ContrastResult[]) {
  let failCount = 0;
  let warnCount = 0;

  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║           WCAG AA CONTRAST AUDIT RESULTS                       ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  results.forEach((result) => {
    const { foreground, background, contrast, passes, context } = result;

    // Determine status
    let status = '✓ PASS';
    let statusColor = '\x1b[32m'; // Green

    if (!passes.normalText) {
      status = '✗ FAIL';
      statusColor = '\x1b[31m'; // Red
      failCount++;
    } else if (!passes.largeText) {
      status = '⚠ WARN';
      statusColor = '\x1b[33m'; // Yellow
      warnCount++;
    }

    console.log(`${statusColor}${status}\x1b[0m ${context}`);
    console.log(`  Foreground: ${foreground}`);
    console.log(`  Background: ${background}`);
    console.log(`  Contrast: ${contrast}:1`);
    console.log(`  Normal Text (≥4.5:1): ${passes.normalText ? '✓' : '✗'}`);
    console.log(`  Large Text (≥3.0:1): ${passes.largeText ? '✓' : '✗'}`);
    console.log(`  Focus Indicator (≥3.0:1): ${passes.focusIndicator ? '✓' : '✗'}`);
    console.log('');
  });

  // Summary
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                         SUMMARY                                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  console.log(`Total combinations tested: ${results.length}`);
  console.log(`\x1b[32m✓ Passed: ${results.length - failCount - warnCount}\x1b[0m`);
  console.log(`\x1b[33m⚠ Warnings: ${warnCount}\x1b[0m (passes large text but not normal text)`);
  console.log(`\x1b[31m✗ Failed: ${failCount}\x1b[0m (does not meet minimum requirements)\n`);

  if (failCount > 0) {
    console.log('\x1b[31m⚠ ACTION REQUIRED: Some color combinations do not meet WCAG AA standards.\x1b[0m');
    console.log('Please adjust the colors or use them only for large text/decorative elements.\n');
  } else if (warnCount > 0) {
    console.log('\x1b[33m⚠ NOTE: Some combinations only pass for large text (≥18px or ≥14px bold).\x1b[0m\n');
  } else {
    console.log('\x1b[32m✓ All color combinations meet WCAG AA standards!\x1b[0m\n');
  }
}

// Run the audit
const results = auditAllCombinations();
displayResults(results);

// Exit with error code if there are failures
const failCount = results.filter(r => !r.passes.normalText).length;
process.exit(failCount > 0 ? 1 : 0);
