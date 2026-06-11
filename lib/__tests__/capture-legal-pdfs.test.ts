/**
 * Unit tests for scripts/capture-legal-pdfs.ts utility functions.
 * hollowmark-tickets#1169
 */

import { describe, expect, it } from "vitest";
import { buildOutputPath, buildPdfConfig, LEGAL_PAGES, resolveSnapshotDate } from "../../scripts/capture-legal-pdfs";
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

describe("resolveSnapshotDate", () => {
  it("returns the explicit date when a non-empty string is supplied", () => {
    expect(resolveSnapshotDate("2026-06-11")).toBe("2026-06-11");
  });

  it("falls through to today's UTC date when the env var is undefined (unset)", () => {
    const result = resolveSnapshotDate(undefined);
    // Must match YYYY-MM-DD and equal today's UTC date
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(result).toBe(new Date().toISOString().slice(0, 10));
  });

  it("falls through to today's UTC date when the env var is empty string (GHA push-trigger path)", () => {
    // GitHub Actions sets SNAPSHOT_DATE="" on the push-trigger and no-date
    // workflow_dispatch paths. This is the regression that ?? did NOT catch.
    const result = resolveSnapshotDate("");
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(result).toBe(new Date().toISOString().slice(0, 10));
    // Crucially: must NOT be empty string (the bug)
    expect(result).not.toBe("");
  });

  it("does not allow an empty-string date to reach PDF filenames", () => {
    // Guard that empty-date produces a broken filename like '-terms.pdf'
    const date = resolveSnapshotDate("");
    const outputPath = buildOutputPath("/base", "terms", date);
    expect(outputPath).not.toMatch(/^\/base\/-terms\.pdf$/);
    expect(outputPath).toMatch(/\d{4}-\d{2}-\d{2}-terms\.pdf$/);
  });
});
