/* Tenero API client for on-chain wallet activity (Stacks chain). */

const TENERO_BASE = "https://api.tenero.io/v1/stacks";

export interface TeneroHolding {
  symbol: string;
  name: string;
  balance: number;
  valueUsd: number;
  priceUsd: number;
  lastActiveAt: number;
}

export interface TeneroTrade {
  txId: string;
  platform: string;
  side: "buy" | "sell" | "swap";
  baseSymbol: string;
  quoteSymbol: string;
  baseAmount: number;
  quoteAmount: number;
  amountUsd: number;
  blockTime: number;
}

export interface TeneroWalletActivity {
  totalValueUsd: number;
  tokenCount: number;
  holdings: TeneroHolding[];
  totalTrades: number;
  buyCount: number;
  sellCount: number;
  swapVolumeUsd: number;
  uniquePlatforms: number;
  uniqueTokensTraded: number;
  recentTrades: TeneroTrade[];
  firstTxTime: number | null;
  lastTxTime: number | null;
}

interface ApiEnvelope<T> {
  statusCode: number;
  message: string;
  data: T;
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T | null> {
  try {
    const resp = await fetch(url, { signal, headers: { accept: "application/json" } });
    if (!resp.ok) return null;
    const json = (await resp.json()) as ApiEnvelope<T>;
    return json?.data ?? null;
  } catch {
    return null;
  }
}

function toNumber(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export async function fetchTeneroActivity(address: string, timeoutMs = 4000): Promise<TeneroWalletActivity | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const [holdingsResp, valueResp, statsResp, tradesResp, walletResp] = await Promise.all([
      fetchJson<{ rows: HoldingsRow[] }>(`${TENERO_BASE}/wallets/${address}/holdings?limit=10`, controller.signal),
      fetchJson<HoldingsValue>(`${TENERO_BASE}/wallets/${address}/holdings_value`, controller.signal),
      fetchJson<TradeStats>(`${TENERO_BASE}/wallets/${address}/trade_stats`, controller.signal),
      fetchJson<{ rows: TradeRow[] }>(`${TENERO_BASE}/wallets/${address}/trades?limit=6`, controller.signal),
      fetchJson<WalletMeta>(`${TENERO_BASE}/wallets/${address}`, controller.signal),
    ]);

    clearTimeout(timer);

    if (!holdingsResp && !valueResp && !statsResp && !tradesResp) return null;

    const holdings: TeneroHolding[] = (holdingsResp?.rows ?? [])
      .map((r) => ({
        symbol: r.token?.symbol ?? "?",
        name: r.token?.name ?? "Unknown",
        balance: toNumber(r.balance),
        valueUsd: toNumber(r.balance_value_usd),
        priceUsd: toNumber(r.token?.price_usd),
        lastActiveAt: toNumber(r.last_active_at),
      }))
      .filter((h) => h.valueUsd > 0 || h.balance > 0)
      .sort((a, b) => b.valueUsd - a.valueUsd);

    const recentTrades: TeneroTrade[] = (tradesResp?.rows ?? []).map((t) => ({
      txId: t.tx_id ?? "",
      platform: t.pool_platform ?? "?",
      side: (t.event_type as TeneroTrade["side"]) ?? "swap",
      baseSymbol: t.base_token?.symbol ?? "?",
      quoteSymbol: t.quote_token?.symbol ?? "?",
      baseAmount: toNumber(t.base_token_amount),
      quoteAmount: toNumber(t.quote_token_amount),
      amountUsd: toNumber(t.amount_usd),
      blockTime: toNumber(t.block_time),
    }));

    return {
      totalValueUsd: toNumber(valueResp?.total_value_usd),
      tokenCount: toNumber(valueResp?.token_count) || holdings.length,
      holdings,
      totalTrades: toNumber(statsResp?.total_trades),
      buyCount: toNumber(statsResp?.buy_count),
      sellCount: toNumber(statsResp?.sell_count),
      swapVolumeUsd: toNumber(statsResp?.total_volume_usd),
      uniquePlatforms: toNumber(statsResp?.unique_platforms_total),
      uniqueTokensTraded: toNumber(statsResp?.unique_tokens_traded),
      recentTrades,
      firstTxTime: walletResp?.first_and_last_tx?.first_tx_time ?? null,
      lastTxTime: walletResp?.first_and_last_tx?.last_tx_time ?? null,
    };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

interface HoldingsRow {
  balance: number | string;
  balance_value_usd: number;
  last_active_at: number;
  token: { symbol: string; name: string; price_usd: number };
}

interface HoldingsValue {
  total_value_usd: number;
  token_count: number;
}

interface TradeStats {
  total_trades: number;
  buy_count: number;
  sell_count: number;
  total_volume_usd: number;
  unique_platforms_total: number;
  unique_tokens_traded: number;
}

interface TradeRow {
  tx_id: string;
  pool_platform: string;
  event_type: string;
  base_token_amount: number | string;
  quote_token_amount: number | string;
  amount_usd: number;
  block_time: number;
  base_token: { symbol: string };
  quote_token: { symbol: string };
}

interface WalletMeta {
  first_and_last_tx: { first_tx_time: number; last_tx_time: number } | null;
}
