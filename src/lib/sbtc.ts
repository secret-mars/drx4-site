export async function fetchSbtcBalance(): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const resp = await fetch(
      "https://api.mainnet.hiro.so/extended/v1/address/SP4DXVEC16FS6QR7RBKGWZYJKTXPC81W49W0ATJE/balances",
      { signal: controller.signal, next: { revalidate: 300 } }
    );
    clearTimeout(timeout);
    if (!resp.ok) return null;
    const data = (await resp.json()) as Record<string, unknown>;
    const ft = data?.fungible_tokens as
      | Record<string, { balance: string }>
      | undefined;
    const sbtc =
      ft?.[
        "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token::sbtc-token"
      ];
    return sbtc ? parseInt(sbtc.balance, 10) : null;
  } catch {
    return null;
  }
}

export function formatSats(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return String(n);
}
