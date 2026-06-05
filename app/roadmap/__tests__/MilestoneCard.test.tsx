/**
 * Component tests for MilestoneCard — vault-mtg-tickets#426
 *
 * Tests the MilestoneCard client component which renders individual milestone
 * entries on the /roadmap page.
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MilestoneCard } from "../MilestoneCard";
import type { Milestone } from "../milestones";
import { MILESTONES, BETA_TARGET } from "../milestones";

afterEach(cleanup);

// ─── Fixtures ────────────────────────────────────────────────────────────────

const CURRENT = MILESTONES.find((m) => m.status === "current")!;
const NEXT = MILESTONES.find((m) => m.status === "next")!;

// ─── milestones.ts data integrity ────────────────────────────────────────────

describe("milestones.ts data integrity — vault-mtg-tickets#426", () => {
  it("exports exactly two milestones", () => {
    expect(MILESTONES.length).toBe(2);
  });

  it("has exactly one current milestone", () => {
    expect(MILESTONES.filter((m) => m.status === "current").length).toBe(1);
  });

  it("has exactly one next milestone", () => {
    expect(MILESTONES.filter((m) => m.status === "next").length).toBe(1);
  });

  it("current milestone is v0.3.8", () => {
    expect(CURRENT.version).toBe("v0.3.8");
  });

  it("next milestone is v0.3.9", () => {
    expect(NEXT.version).toBe("v0.3.9");
  });

  it("BETA_TARGET is August 18, 2026", () => {
    expect(BETA_TARGET).toBe("August 18, 2026");
  });

  it("current milestone has a githubMilestoneUrl", () => {
    expect(CURRENT.githubMilestoneUrl).toBeTruthy();
    expect(CURRENT.githubMilestoneUrl).toContain("github.com");
  });

  it("next milestone items are all non-empty strings", () => {
    NEXT.items.forEach((item) => {
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    });
  });
});

// ─── Current milestone card ───────────────────────────────────────────────────

describe("MilestoneCard — current milestone (v0.3.8)", () => {
  it("renders the article with aria-label containing version and codename", () => {
    const { container } = render(<MilestoneCard milestone={CURRENT} />);
    const article = container.querySelector("article");
    expect(article).toBeTruthy();
    expect(article!.getAttribute("aria-label")).toContain("v0.3.8");
    expect(article!.getAttribute("aria-label")).toContain(CURRENT.codename);
  });

  it("renders 'In Progress' status label", () => {
    render(<MilestoneCard milestone={CURRENT} />);
    expect(screen.getByText("In Progress")).toBeTruthy();
  });

  it("renders the v0.3.8 version marker", () => {
    render(<MilestoneCard milestone={CURRENT} />);
    expect(screen.getByText("v0.3.8")).toBeTruthy();
  });

  it("renders the codename heading as h2", () => {
    render(<MilestoneCard milestone={CURRENT} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toContain(CURRENT.codename);
  });

  it("renders the codename heading in Cormorant Garamond italic", () => {
    render(<MilestoneCard milestone={CURRENT} />);
    const heading = screen.getByRole("heading", { level: 2 });
    const style = heading.getAttribute("style") ?? "";
    expect(style).toContain("Cormorant Garamond");
    expect(style).toContain("italic");
  });

  it("renders the summary text", () => {
    render(<MilestoneCard milestone={CURRENT} />);
    expect(screen.getByText(CURRENT.summary)).toBeTruthy();
  });

  it("renders all milestone items", () => {
    render(<MilestoneCard milestone={CURRENT} />);
    CURRENT.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeTruthy();
    });
  });

  it("renders the GitHub milestone link", () => {
    render(<MilestoneCard milestone={CURRENT} />);
    const link = screen.getByRole("link", { name: /View milestone on GitHub/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute("href")).toBe(CURRENT.githubMilestoneUrl);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("uses sapphire token for version marker (current)", () => {
    const { container } = render(<MilestoneCard milestone={CURRENT} />);
    // Find the <span> element that contains only the version text
    const versionSpan = Array.from(container.querySelectorAll("span")).find(
      (el) => el.textContent === "v0.3.8",
    );
    expect(versionSpan).toBeTruthy();
    expect(versionSpan!.getAttribute("style")).toContain("var(--color-vault-sapphire)");
  });
});

// ─── Next milestone card ──────────────────────────────────────────────────────

describe("MilestoneCard — next milestone (v0.3.9)", () => {
  it("renders the article with aria-label containing v0.3.9", () => {
    const { container } = render(<MilestoneCard milestone={NEXT} />);
    const article = container.querySelector("article");
    expect(article!.getAttribute("aria-label")).toContain("v0.3.9");
  });

  it("renders 'Planned' status label", () => {
    render(<MilestoneCard milestone={NEXT} />);
    expect(screen.getByText("Planned")).toBeTruthy();
  });

  it("renders the v0.3.9 version marker", () => {
    render(<MilestoneCard milestone={NEXT} />);
    expect(screen.getByText("v0.3.9")).toBeTruthy();
  });

  it("renders the next codename heading as h2 in Cormorant Garamond italic", () => {
    render(<MilestoneCard milestone={NEXT} />);
    const heading = screen.getByRole("heading", { level: 2 });
    const style = heading.getAttribute("style") ?? "";
    expect(style).toContain("Cormorant Garamond");
    expect(style).toContain("italic");
  });

  it("renders all next milestone items", () => {
    render(<MilestoneCard milestone={NEXT} />);
    NEXT.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeTruthy();
    });
  });

  it("does NOT render a GitHub link for the next milestone", () => {
    render(<MilestoneCard milestone={NEXT} />);
    expect(screen.queryByRole("link", { name: /View milestone on GitHub/i })).toBeNull();
  });
});

// ─── Brand hygiene ────────────────────────────────────────────────────────────

describe("MilestoneCard — brand hygiene", () => {
  it("does not use amber accent (#F5A623) for current milestone", () => {
    const { container } = render(<MilestoneCard milestone={CURRENT} />);
    expect(container.innerHTML).not.toContain("F5A623");
  });

  it("does not use Sora font for current milestone", () => {
    const { container } = render(<MilestoneCard milestone={CURRENT} />);
    expect(container.innerHTML.toLowerCase()).not.toContain("sora");
  });

  it("uses Cormorant Garamond for the current milestone heading", () => {
    const { container } = render(<MilestoneCard milestone={CURRENT} />);
    const heading = container.querySelector("h2");
    expect(heading).toBeTruthy();
    expect(heading!.getAttribute("style")).toContain("Cormorant Garamond");
  });

  it("uses Cormorant Garamond for the next milestone heading", () => {
    cleanup();
    const { container } = render(<MilestoneCard milestone={NEXT} />);
    const heading = container.querySelector("h2");
    expect(heading).toBeTruthy();
    expect(heading!.getAttribute("style")).toContain("Cormorant Garamond");
  });
});

// ─── Custom milestone prop ────────────────────────────────────────────────────

describe("MilestoneCard — prop contract", () => {
  const customMilestone: Milestone = {
    version: "v0.3.X",
    codename: "Test Milestone",
    status: "current",
    statusLabel: "Testing",
    target: "2099-01",
    summary: "A test summary.",
    items: [
      { label: "Item one", note: "note one" },
      { label: "Item two" },
    ],
    githubMilestoneUrl: "https://github.com/test/project",
  };

  it("renders item notes as JetBrains Mono inline markers", () => {
    const { container } = render(<MilestoneCard milestone={customMilestone} />);
    const monoNotes = Array.from(container.querySelectorAll("[style*='JetBrains Mono']")).filter(
      (el) => el.textContent?.includes("note one"),
    );
    expect(monoNotes.length).toBeGreaterThan(0);
  });

  it("renders item without note cleanly (no note span appended)", () => {
    render(<MilestoneCard milestone={customMilestone} />);
    const item = screen.getByText("Item two");
    expect(item).toBeTruthy();
    // The text span must not contain a nested note span
    // (The li has a dot span + the text span; the text span itself should have no children)
    const noteSpan = item.querySelector("span");
    expect(noteSpan).toBeNull();
  });
});
