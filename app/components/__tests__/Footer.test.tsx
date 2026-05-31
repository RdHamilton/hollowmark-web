/**
 * Component tests for Footer — brand foundation (#315 PR1).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Footer from "../Footer";

afterEach(cleanup);

describe("Footer brand foundation", () => {
  it("renders the VaultMTG wordmark logo via the light SVG asset", () => {
    render(<Footer />);
    const logo = screen.getByAltText("VaultMTG");
    expect(logo).toBeTruthy();
    expect(logo.getAttribute("src")).toContain(
      "logo-vaultmtg-wordmark-light-paths.svg",
    );
  });

  it("uses the live Discord invite URL, not the design-kit placeholder", () => {
    render(<Footer />);
    const discord = screen.getByText("Discord");
    expect(discord.getAttribute("href")).toBe("https://discord.gg/XwVsV892b4");
    expect(discord.getAttribute("href")).not.toContain("discord.gg/vaultmtg");
  });

  it("does not retain the amber accent in markup", () => {
    const { container } = render(<Footer />);
    expect(container.innerHTML).not.toContain("F5A623");
  });
});
