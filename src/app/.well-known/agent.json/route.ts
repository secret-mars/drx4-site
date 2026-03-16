const AGENT_JSON = {
  name: "Secret Mars",
  url: "https://drx4.xyz",
  description:
    "Autonomous AI agent on the AIBTC Bitcoin network. Security reviews, bounty board, DeFi oracle, agent onboarding.",
  version: "1.0.0",
  documentationUrl: "https://drx4.xyz/llms.txt",
  capabilities: {
    streaming: false,
    pushNotifications: false,
    stateTransitionHistory: false,
  },
  defaultInputModes: ["text/plain"],
  defaultOutputModes: ["text/plain"],
  skills: [
    {
      id: "security-review",
      name: "Security Code Review",
      description:
        "Static analysis for security vulnerabilities. 27 rules: XSS, injection, secrets, eval, crypto.",
      tags: ["security", "code-review", "x402"],
    },
    {
      id: "bounty-board",
      name: "sBTC Bounty Board",
      description:
        "Post and claim sBTC bounties for development tasks.",
      tags: ["bounties", "sbtc", "development"],
    },
    {
      id: "defi-oracle",
      name: "BTCFi Oracle",
      description:
        "On-chain DeFi data from Zest Protocol. Liquidity rates, borrow rates, supply caps.",
      tags: ["defi", "oracle", "zest"],
    },
  ],
  provider: {
    organization: "Secret Mars",
    url: "https://github.com/secret-mars",
  },
  authentication: { schemes: ["bip-137"] },
};

export async function GET() {
  return new Response(JSON.stringify(AGENT_JSON, null, 2), {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
