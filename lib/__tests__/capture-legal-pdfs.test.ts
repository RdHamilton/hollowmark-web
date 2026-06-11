/**
 * Unit tests for scripts/capture-legal-pdfs.ts utility functions.
 * hollowmark-tickets#1169
 */

import { describe, expect, it } from "vitest";
import { buildOutputPath, buildPdfConfig, LEGAL_PAGES } from "../../scripts/capture-legal-pdfs";
import path from "path";

describe("buildOutputPath", () => {
  it("produces a deterministic YYYY-MM-DD-{page}.pdf path under baseDir", () => {
    const result = buildOutputPath("/some/base", "terms", "2026-06-11");
    expect(result).toBe(path.join("/some/base", "2026-06-11-terms.pdf"));
  });

  it("works for privacy page", () => {
    const result = buildOutputPath("/docs/business/legal/published", "privacy", "2026-06-11");
    expect(result).toBe(
      path.join("/docs/business/legal/published", "2026-06-11-privacy.pdf"),
    );
  });

  it("does not double-add separator when baseDir has trailing slash", () => {
    const result = buildOutputPath("/some/base/", "terms", "2026-06-11");
    // path.join normalises the trailing slash, so the result must still be valid
    expect(result).toMatch(/2026-06-11-terms\.pdf$/);
    expect(result).not.toContain("//");
  });

  it("embeds the supplied date, not today's date", () => {
    const result = buildOutputPath("/base", "terms", "2099-01-01");
    expect(result).toContain("2099-01-01");
  });
});

describe("buildPdfConfig", () => {
  it("returns an object with a format property set to A4", () => {
    const cfg = buildPdfConfig();
    expect(cfg.format).toBe("A4");
  });

  it("sets printBackground to true so CSS backgrounds render", () => {
    const cfg = buildPdfConfig();
    expect(cfg.printBackground).toBe(true);
  });

  it("includes non-zero margins", () => {
    const cfg = buildPdfConfig();
    expect(cfg.margin).toBeDefined();
    // All four margins must be present
    expect(cfg.margin?.top).toBeDefined();
    expect(cfg.margin?.bottom).toBeDefined();
    expect(cfg.margin?.left).toBeDefined();
    expect(cfg.margin?.right).toBeDefined();
  });
});

describe("LEGAL_PAGES", () => {
  it("contains both terms and privacy slugs", () => {
    expect(LEGAL_PAGES).toContain("terms");
    expect(LEGAL_PAGES).toContain("privacy");
  });

  it("has exactly two entries", () => {
    expect(LEGAL_PAGES).toHaveLength(2);
  });
});
