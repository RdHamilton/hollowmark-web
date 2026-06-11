/**
 * capture-legal-pdfs.ts
 *
 * Snapshot /terms and /privacy on hollowmark.app to dated PDFs for compliance
 * archiving. Output files are written to a target directory (typically a local
 * clone of hollowmark-docs) at the path:
 *
 *   business/legal/published/YYYY-MM-DD-{terms|privacy}.pdf
 *
 * Usage:
 *   npx tsx scripts/capture-legal-pdfs.ts
 *
 * Environment variables (all optional — defaults to production):
 *   BASE_URL       Base URL to snapshot (default: https://hollowmark.app)
 *   OUTPUT_DIR     Absolute path to the output directory
 *                  (default: ./pdf-output — override with hollowmark-docs clone path in CI)
 *   SNAPSHOT_DATE  Override date used in filename (default: today's UTC date YYYY-MM-DD)
 *
 * hollowmark-tickets#1169
 */

import path from "path";
import fs from "fs";
import type { Page } from "playwright";

// ---------------------------------------------------------------------------
// Exported constants + pure utility functions (unit-testable without Playwright)
// ---------------------------------------------------------------------------

/** The two legal pages to snapshot. */
export const LEGAL_PAGES: readonly string[] = ["terms", "privacy"] as const;

/**
 * Build the deterministic output file path for a single page snapshot.
 *
 * @param baseDir   Directory that will contain the PDF.
 * @param page      Page slug — "terms" or "privacy".
 * @param date      ISO date string in YYYY-MM-DD format.
 * @returns         Absolute or relative path to the output PDF file.
 */
export function buildOutputPath(baseDir: string, page: string, date: string): string {
  return path.join(baseDir, `${date}-${page}.pdf`);
}

/**
 * Build the Playwright PDF options used for all legal-page snapshots.
 * A4 paper, printed backgrounds so colour/brand renders correctly, and
 * comfortable margins so no text is clipped.
 */
export function buildPdfConfig(): NonNullable<Parameters<Page["pdf"]>[0]> {
  return {
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  };
}

// ---------------------------------------------------------------------------
// Main — only runs when this file is executed directly (not when imported)
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const { chromium } = await import("playwright");

  const baseUrl = process.env.BASE_URL ?? "https://hollowmark.app";
  const outputDir = process.env.OUTPUT_DIR ?? path.join(process.cwd(), "pdf-output");
  const snapshotDate =
    process.env.SNAPSHOT_DATE ??
    new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const pdfConfig = buildPdfConfig();
  const results: Array<{ page: string; path: string; ok: boolean; error?: string }> = [];

  for (const page of LEGAL_PAGES) {
    const url = `${baseUrl}/${page}`;
    const outputPath = buildOutputPath(outputDir, page, snapshotDate);
    let ok = false;
    let errorMsg: string | undefined;

    try {
      const tab = await context.newPage();
      const response = await tab.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

      if (!response || response.status() !== 200) {
        throw new Error(`HTTP ${response?.status() ?? "no response"} for ${url}`);
      }

      // networkidle already guarantees the static page is fully rendered.
      // Additionally wait for <main> to be visible as a belt-and-suspenders check.
      await tab.waitForSelector("main", { timeout: 10_000 });

      await tab.pdf({ path: outputPath, ...pdfConfig });
      await tab.close();

      const stat = fs.statSync(outputPath);
      if (stat.size < 1024) {
        throw new Error(`PDF suspiciously small (${stat.size} bytes) — likely empty render`);
      }

      ok = true;
      console.log(`[capture-legal-pdfs] OK  ${page} -> ${outputPath} (${stat.size} bytes)`);
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[capture-legal-pdfs] ERR ${page}: ${errorMsg}`);
    }

    results.push({ page, path: outputPath, ok, error: errorMsg });
  }

  await context.close();
  await browser.close();

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error(
      `[capture-legal-pdfs] FAILED: ${failed.map((r) => r.page).join(", ")}`,
    );
    process.exit(1);
  }

  console.log(
    `[capture-legal-pdfs] All ${LEGAL_PAGES.length} pages captured successfully for ${snapshotDate}`,
  );
}

// Guard so Vitest importing the module does not trigger main()
if (
  typeof process !== "undefined" &&
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(import.meta.filename ?? "")
) {
  main().catch((err) => {
    console.error("[capture-legal-pdfs] Fatal:", err);
    process.exit(1);
  });
}
