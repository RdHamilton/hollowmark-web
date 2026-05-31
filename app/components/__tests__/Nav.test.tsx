/**
 * Component tests for Nav — brand foundation (#315 PR1).
 *
 * Running: npm run test
 */

import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Nav from "../Nav";

afterEach(cleanup);

describe("Nav brand foundation", () => {
  it("renders the VaultMTG wordmark logo via the light SVG asset", () => {
    render(<Nav />);
    const logo = screen.getByAltText("VaultMTG");
    expect(logo).toBeTruthy();
    expect(logo.getAttribute("src")).toContain(
      "logo-vaultmtg-wordmark-light-paths.svg",
    );
  });

  it("links the home logo to the top of the page", () => {
    render(<Nav />);
    const home = screen.getByLabelText("VaultMTG home");
    expect(home.getAttribute("href")).toBe("#");
  });

  it("does not retain the amber accent in markup", () => {
    const { container } = render(<Nav />);
    expect(container.innerHTML).not.toContain("F5A623");
    expect(container.innerHTML).not.toContain("F7BA58");
    expect(container.innerHTML).not.toContain("C8841A");
  });

  it("uses the sapphire accent on the primary CTA", () => {
    render(<Nav />);
    const cta = screen.getByText("Get Early Access");
    expect(cta.className).toContain("bg-[#4A90D9]");
  });
});
