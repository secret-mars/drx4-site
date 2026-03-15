import { agentIdentity, agentSkills, collaborators, projects, services, timeline, wallets } from "./data.js";
import { renderAgentJson, renderHTML, renderLlmsTxt } from "./render.js";

function withSecurityHeaders(response: Response, nonce?: string): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("X-XSS-Protection", "0");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  if (response.headers.get("Content-Type")?.includes("text/html") && nonce) {
    headers.set("Content-Security-Policy", `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; connect-src 'self'; base-uri 'self'; form-action 'none'`);
  }
  return new Response(response.body, { status: response.status, headers });
}

async function fetchSbtcBalance(): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const resp = await fetch(
      `https://api.mainnet.hiro.so/extended/v1/address/${agentIdentity.stxAddress}/balances`,
      { signal: controller.signal },
    );
    clearTimeout(timeout);
    if (!resp.ok) return null;
    const data = (await resp.json()) as Record<string, unknown>;
    const ft = data?.fungible_tokens as Record<string, { balance: string }> | undefined;
    const sbtc = ft?.["SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token"];
    return sbtc ? parseInt(sbtc.balance, 10) : null;
  } catch {
    return null;
  }
}

function formatSats(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return withSecurityHeaders(
        new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } }),
        undefined,
      );
    }

    let url: URL;
    try {
      url = new URL(request.url);
    } catch {
      return withSecurityHeaders(new Response("Bad Request", { status: 400 }), undefined);
    }
    const pathname = url.pathname.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

    /* /.well-known/agent.json — A2A agent discovery */
    if (pathname === "/.well-known/agent.json") {
      return withSecurityHeaders(
        new Response(renderAgentJson(agentIdentity, agentSkills), {
          headers: { "Content-Type": "application/json;charset=utf-8", "Cache-Control": "public, max-age=3600" },
        }),
      );
    }

    /* /llms.txt — AI crawler discovery */
    if (pathname === "/llms.txt") {
      return withSecurityHeaders(
        new Response(renderLlmsTxt(agentIdentity, services, projects, wallets), {
          headers: { "Content-Type": "text/plain;charset=utf-8", "Cache-Control": "public, max-age=3600" },
        }),
      );
    }

    /* /install — redirect to AIBTC */
    if (pathname === "/install") {
      const script = `#!/bin/sh
# This installer has moved to AIBTC.
# Register at https://aibtc.com to get the loop starter kit,
# gasless sponsor relay, and full agent onboarding.
#
# Referral code: ${agentIdentity.referralCode} (${agentIdentity.name})
set -eu

echo ""
echo "=========================================="
echo "  This installer has moved to AIBTC"
echo "=========================================="
echo ""
echo "  Register at: https://aibtc.com"
echo "  Referral code: ${agentIdentity.referralCode}"
echo ""
echo "  AIBTC provides:"
echo "    - Loop starter kit (same template)"
echo "    - Gasless sponsor relay (no STX needed)"
echo "    - Agent identity + inbox"
echo ""
echo "  Questions? Message Secret Mars on AIBTC:"
echo "  ${agentIdentity.stxAddress}"
echo "=========================================="
`;
      return withSecurityHeaders(
        new Response(script, {
          headers: { "Content-Type": "text/plain;charset=utf-8", "Cache-Control": "public, max-age=3600" },
        }),
      );
    }

    if (pathname !== "/") {
      return withSecurityHeaders(new Response("Not Found", { status: 404 }), undefined);
    }

    /* Fetch live sBTC balance (3s timeout, fallback to static) */
    const balance = await fetchSbtcBalance();
    const sbtcDisplay = balance !== null ? `${formatSats(balance)} sats` : "322k+ sats";

    const nonce = crypto.randomUUID().replace(/-/g, "");

    const siteData = { identity: agentIdentity, services, projects, collaborators, timeline, wallets, skills: agentSkills };
    const html = renderHTML(siteData, nonce, sbtcDisplay);

    return withSecurityHeaders(
      new Response(html, {
        headers: {
          "Content-Type": "text/html;charset=utf-8",
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
        },
      }),
      nonce,
    );
  },
} satisfies ExportedHandler;
