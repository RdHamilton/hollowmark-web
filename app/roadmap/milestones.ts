// milestones.ts — roadmap data for /roadmap page
//
// Source of truth: BROADCAST.md + vault-mtg-docs/business/product/projects/
// Every item listed here must be traceable to a shipped PR or an active ticket
// on board #45. Do NOT list aspirational features without a ticket backing them.

export type MilestoneItem = {
  label: string;
  note?: string;
};

export type Milestone = {
  version: string;
  codename: string;
  status: "current" | "next";
  statusLabel: string;
  target: string;
  summary: string;
  items: MilestoneItem[];
  githubMilestoneUrl?: string;
};

export const BETA_TARGET = "August 18, 2026";

export const MILESTONES: Milestone[] = [
  {
    version: "v0.3.8",
    codename: "Wildcard Advisor v1 + CI/Release-Pipeline Hardening",
    status: "current",
    statusLabel: "In Progress",
    target: "2026-06",
    summary:
      "Hardening the release pipeline and CI first, then shipping the first version of the Wildcard Advisor — a card-recommendation engine for building and upgrading MTG Arena decks.",
    items: [
      { label: "Flaky E2E smoke gate eliminated", note: "release-pipeline prerequisite" },
      { label: "Golden-corpus replay harness rebuilt", note: "test infra" },
      { label: "Daemon 429 back-off hardening" },
      { label: "Ingest batching for high-volume sessions" },
      { label: "Wildcard Advisor BFF scaffold + data model" },
      { label: "Marketing site brand pass complete", note: "this page" },
      { label: "Public roadmap page", note: "this page" },
    ],
    githubMilestoneUrl: "https://github.com/users/RdHamilton/projects/45",
  },
  {
    version: "v0.3.9",
    codename: "Wildcard Cluster + Launch Gate",
    status: "next",
    statusLabel: "Planned",
    target: "2026-07 / 2026-08",
    summary:
      "Completing the Wildcard Advisor with card-cluster recommendations and deck-upgrade suggestions. Final gate for the August 2026 closed-beta launch.",
    items: [
      { label: "Wildcard Advisor full implementation (cluster model)" },
      { label: "Deck-upgrade suggestions in the SPA" },
      { label: "Beta-launch gate criteria met" },
      { label: "Closed beta invite wave — free, invite-only" },
    ],
  },
];
