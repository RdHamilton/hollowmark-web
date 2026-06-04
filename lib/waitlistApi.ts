/**
 * Waitlist API adapter — CTA form backend coupling.
 *
 * Single source of truth for all calls to POST /api/v1/waitlist.
 * `NEXT_PUBLIC_BFF_BASE_URL` is the only coupling point — never hardcode the URL.
 *
 * Fail-fast at bundle evaluation time: if the env var is missing the build
 * itself is misconfigured. A silent fallback would allow a misbuilt artifact
 * to ship to production pointing at a hardcoded URL — reject early instead.
 */

if (!process.env.NEXT_PUBLIC_BFF_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BFF_BASE_URL is not set. " +
      "Set it in deploy-marketing.yml (production) or ci.yml (CI sentinel) " +
      "before building this module."
  );
}

const BFF_BASE_URL = process.env.NEXT_PUBLIC_BFF_BASE_URL;

export interface WaitlistSuccessResponse {
  position: number;
}

export interface WaitlistErrorResponse {
  error: string;
}

export type WaitlistResult =
  | { ok: true; position: number }
  | { ok: false; error: string };

/**
 * POST /api/v1/waitlist
 *
 * Request body: { email: string }
 * Success (200): { position: number }
 * Client error (400, 409): { error: string }
 * Network / server error: throws — caller converts to a user-facing message.
 */
export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  let response: Response;
  try {
    response = await fetch(`${BFF_BASE_URL}/api/v1/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }

  if (response.ok) {
    const data = (await response.json()) as WaitlistSuccessResponse;
    return { ok: true, position: data.position };
  }

  // 409 = already registered; 400 = validation
  try {
    const data = (await response.json()) as WaitlistErrorResponse;
    return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
