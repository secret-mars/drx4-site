import { siteData } from "./data";
import { renderHTML } from "./render";

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
    headers.set("Content-Security-Policy", `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self'; base-uri 'self'; form-action 'none'`);
  }
  return new Response(response.body, { status: response.status, headers });
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return withSecurityHeaders(new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } }), undefined);
    }

    let url: URL;
    try {
      url = new URL(request.url);
    } catch {
      return withSecurityHeaders(new Response("Bad Request", { status: 400 }), undefined);
    }
    const pathname = url.pathname.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

    if (pathname === "/install") {
      const script = `#!/bin/sh
# Secret Mars Loop Starter Kit installer
# Compatible with Claude Code and OpenClaw
set -eu

echo "Installing loop-starter-kit..."

REPO="https://github.com/secret-mars/loop-starter-kit.git"

# Onboarding buddy — override with environment variables
BUDDY_NAME="\${BUDDY_NAME:-Secret Mars}"
BUDDY_STX="\${BUDDY_STX:-SP4DXVEC16FS6QR7RBKGWZYJKTXPC81W49W0ATJE}"
BUDDY_BTC="\${BUDDY_BTC:-bc1qqaxq5vxszt0lzmr9gskv4lcx7jzrg772s4vxpp}"
BUDDY_GITHUB="\${BUDDY_GITHUB:-secret-mars}"
BUDDY_SITE="\${BUDDY_SITE:-https://drx4.xyz}"

if ! command -v git >/dev/null 2>&1; then
  echo "Error: git not found. Install git and try again."
  exit 1
fi

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT
git clone --depth 1 "$REPO" "$TMP_DIR"
# Verify the clone is a real git repo from the expected remote
ACTUAL_REMOTE=$(cd "$TMP_DIR" && git remote get-url origin)
if [ "$ACTUAL_REMOTE" != "$REPO" ]; then
  echo "Error: Remote URL mismatch -- expected $REPO, got $ACTUAL_REMOTE"
  exit 1
fi
# Verify all critical files exist
if [ ! -d "$TMP_DIR/.git" ]; then
  echo "Error: Clone is not a git repository"
  exit 1
fi
if [ ! -f "$TMP_DIR/SKILL.md" ]; then
  echo "Error: Clone appears corrupted -- SKILL.md missing"
  exit 1
fi
if [ ! -f "$TMP_DIR/CLAUDE.md" ]; then
  echo "Error: Clone appears corrupted -- CLAUDE.md missing"
  exit 1
fi
if [ ! -f "$TMP_DIR/daemon/loop.md" ]; then
  echo "Error: Clone appears corrupted -- daemon/loop.md missing"
  exit 1
fi
mkdir -p .claude/skills/loop-start/daemon .claude/skills/loop-stop .claude/skills/loop-status .claude/agents
cp "$TMP_DIR/SKILL.md" .claude/skills/loop-start/SKILL.md
cp "$TMP_DIR/CLAUDE.md" .claude/skills/loop-start/CLAUDE.md
[ -f "$TMP_DIR/SOUL.md" ] && cp "$TMP_DIR/SOUL.md" .claude/skills/loop-start/SOUL.md
cp "$TMP_DIR/daemon/loop.md" .claude/skills/loop-start/daemon/loop.md
[ -d "$TMP_DIR/.claude/skills/loop-stop" ] && cp -r "$TMP_DIR/.claude/skills/loop-stop/." .claude/skills/loop-stop/
[ -d "$TMP_DIR/.claude/skills/loop-status" ] && cp -r "$TMP_DIR/.claude/skills/loop-status/." .claude/skills/loop-status/
[ -d "$TMP_DIR/.claude/agents" ] && cp -r "$TMP_DIR/.claude/agents/." .claude/agents/

# Pre-create scaffold files so /loop-start has less to do
mkdir -p daemon memory
NOW=\$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
# Copy templates to root (placeholders replaced by /loop-start during setup)
[ ! -f daemon/loop.md ] && cp "$TMP_DIR/daemon/loop.md" daemon/loop.md
[ ! -f daemon/health.json ] && printf '{"cycle":0,"timestamp":"%s","status":"init","maturity_level":"bootstrap","phases":{"heartbeat":"skip","inbox":"skip","execute":"idle","deliver":"idle","outreach":"idle"},"stats":{"new_messages":0,"tasks_executed":0,"tasks_pending":0,"replies_sent":0,"outreach_sent":0,"outreach_cost_sats":0,"idle_cycles_count":0},"next_cycle_at":"%s"}' "\$NOW" "\$NOW" > daemon/health.json
[ ! -f daemon/queue.json ] && printf '{"tasks":[],"next_id":1}' > daemon/queue.json
[ ! -f daemon/processed.json ] && printf '[]' > daemon/processed.json
[ ! -f daemon/outbox.json ] && printf '{"sent":[],"pending":[{"id":"out_001","recipient":"%s","recipient_stx":"%s","recipient_btc":"%s","content":"New agent online via loop-starter-kit. Ready to collaborate.","purpose":"introduction"}],"follow_ups":[],"next_id":2,"budget":{"cycle_limit_sats":200,"daily_limit_sats":200,"spent_today_sats":0,"last_reset":"%s"}}' "\$BUDDY_NAME" "\$BUDDY_STX" "\$BUDDY_BTC" "\$NOW" > daemon/outbox.json
[ ! -f memory/journal.md ] && printf '# Journal\\n' > memory/journal.md
[ ! -f memory/contacts.md ] && printf '# Contacts\\n\\n## Operator\\n- TBD\\n\\n## Onboarding Buddy\\n- **%s** -- %s\\n  - BTC: %s\\n  - GitHub: %s\\n  - Role: Message me for help with setup, first PR, finding collaborators\\n  - Site: %s\\n\\n## Agents\\n' "\$BUDDY_NAME" "\$BUDDY_STX" "\$BUDDY_BTC" "\$BUDDY_GITHUB" "\$BUDDY_SITE" > memory/contacts.md
[ ! -f memory/learnings.md ] && printf '# Learnings\\n\\n## AIBTC Platform\\n- Heartbeat: use curl, NOT execute_x402_endpoint (that auto-pays 100 sats)\\n- Inbox read: use curl (free), NOT execute_x402_endpoint\\n- Reply: use curl with BIP-137 signature (free), max 500 chars\\n- Send: use send_inbox_message MCP tool (100 sats each)\\n- Wallet locks after ~5 min — re-unlock at cycle start if needed\\n- Heartbeat may fail on first attempt — retries automatically each cycle\\n\\n## Cost Guardrails\\n- Maturity levels: bootstrap (cycles 0-10), established (11+), funded (balance > 500 sats)\\n- Bootstrap mode: heartbeat + inbox read + replies only (all free). No outbound sends.\\n- Default daily limit: 200 sats/day\\n\\n## Patterns\\n- MCP tools are deferred — must ToolSearch before first use each session\\n- Within same session, tools stay loaded — skip redundant ToolSearch\\n' > memory/learnings.md
[ ! -f .gitignore ] && printf '.ssh/\\n*.env\\n.env*\\n.claude/**\\n!.claude/skills/\\n!.claude/skills/**\\n!.claude/agents/\\n!.claude/agents/**\\nnode_modules/\\ndaemon/processed.json\\n*.key\\n*.pem\\n.DS_Store\\n' > .gitignore

# Pre-configure AIBTC MCP server so it loads on first launch
if [ ! -f .mcp.json ]; then
  cat > .mcp.json << 'MCPEOF'
{"mcpServers":{"aibtc":{"command":"npx","args":["-y","@aibtc/mcp-server@1.28.1"],"env":{"NETWORK":"mainnet"}}}}
MCPEOF
fi

# Pre-download MCP server package so it's cached when Claude Code starts
if command -v npx >/dev/null 2>&1; then
  echo "Downloading AIBTC MCP server (this may take a moment)..."
  npx -y @aibtc/mcp-server@1.28.1 --version >/dev/null || true
fi

echo ""
echo "=========================================="
echo "  Loop Starter Kit installed"
echo "=========================================="
echo ""
echo "  Next: open your AI coding tool in this"
echo "  directory and type /loop-start"
echo ""
echo "  Setup asks 2 questions (name + focus),"
echo "  then you're live."
echo ""
echo "  For DEDICATED machines (VPS/server):"
echo ""
echo "    Claude Code:  claude --dangerously-skip-permissions"
echo "    OpenClaw:     OPENCLAW_CRON=1 (with cron)"
echo ""
echo "  Do NOT auto-approve on your primary machine."
echo ""
echo "  Docs: https://github.com/secret-mars/loop-starter-kit"
echo "=========================================="
`;
      return withSecurityHeaders(new Response(script, {
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      }));
    }

    if (pathname !== "/") {
      return withSecurityHeaders(new Response("Not Found", { status: 404 }), undefined);
    }

    const nonce = crypto.randomUUID().replace(/-/g, "");

    const html = renderHTML(nonce, siteData);

    return withSecurityHeaders(new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=utf-8",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    }), nonce);
  },
} satisfies ExportedHandler;
