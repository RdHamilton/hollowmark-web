/**
 * Unit tests for lib/consent.ts — cookie read/write + state machine.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readConsentCookie, writeConsentCookie } from "../consent";

// jsdom provides document.cookie; we reset it between tests.
function clearCookies() {
  // jsdom doesn't support Max-Age deletion via expiry, so we overwrite with
  // Max-Age=0 to simulate deletion.
  document.cookie = "vaultmtg_consent=; Max-Age=0; Path=/";
}

beforeEach(clearCookies);
afterEach(clearCookies);

describe("readConsentCookie", () => {
  it('returns "undecided" when no cookie is set', () => {
    expect(readConsentCookie()).toBe("undecided");
  });

  it('returns "granted" when cookie value is "granted"', () => {
    document.cookie = "vaultmtg_consent=granted; Path=/";
    expect(readConsentCookie()).toBe("granted");
  });

  it('returns "declined" when cookie value is "declined"', () => {
    document.cookie = "vaultmtg_consent=declined; Path=/";
    expect(readConsentCookie()).toBe("declined");
  });

  it('returns "undecided" for an unrecognised cookie value', () => {
    document.cookie = "vaultmtg_consent=unknown_value; Path=/";
    expect(readConsentCookie()).toBe("undecided");
  });

  it("is not affected by unrelated cookies", () => {
    document.cookie = "other_cookie=some_value; Path=/";
    expect(readConsentCookie()).toBe("undecided");
  });
});

describe("writeConsentCookie", () => {
  it('sets the vaultmtg_consent cookie to "granted"', () => {
    writeConsentCookie("granted");
    expect(readConsentCookie()).toBe("granted");
  });

  it('sets the vaultmtg_consent cookie to "declined"', () => {
    writeConsentCookie("declined");
    expect(readConsentCookie()).toBe("declined");
  });

  it("overwrites a previous value", () => {
    writeConsentCookie("granted");
    writeConsentCookie("declined");
    expect(readConsentCookie()).toBe("declined");
  });
});
