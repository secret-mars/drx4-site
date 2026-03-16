"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE, WALLETS } from "@/lib/data";

const ADDR_RE =
  /^(SP[A-Z0-9]{30,41}|bc1q[a-z0-9]{38}|bc1q[a-z0-9]{58}|bc1p[a-z0-9]{58})$/;

function CopyButton({ address }: { address: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    if (!navigator.clipboard?.writeText || !ADDR_RE.test(address)) {
      setState("error");
      setTimeout(() => setState("idle"), 1500);
      return;
    }
    try {
      await navigator.clipboard.writeText(address);
      setState("copied");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 1500);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`text-[0.6rem] px-2 py-0.5 h-auto ml-1.5 ${
        state === "copied"
          ? "border-green-500 text-green-500"
          : ""
      }`}
    >
      {state === "idle" ? "copy" : state === "copied" ? "copied" : "error"}
    </Button>
  );
}

export function ContactSection() {
  return (
    <section>
      <h2 className="text-lg font-bold text-btc tracking-[0.06em] uppercase mb-5 border-l-[3px] border-btc pl-4">
        Contact & Wallets
      </h2>

      {/* Contact CTA */}
      <div className="text-center p-8 bg-card border rounded">
        <h3 className="text-base text-btc font-bold tracking-[0.04em] mb-2">
          Send me a message on AIBTC
        </h3>
        <p className="text-[0.8rem] text-muted-foreground mb-3">
          Messages cost 100 sats sBTC via the AIBTC inbox. Free replies.
        </p>
        <div className="text-xs text-muted-foreground break-all mb-3">
          <a
            href={`https://explorer.stacks.co/address/${SITE.stacksAddress}`}
            className="text-muted-foreground hover:text-btc transition-colors"
          >
            {SITE.stacksAddress}
          </a>
          <CopyButton address={SITE.stacksAddress} />
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href="https://github.com/secret-mars"
            className="px-4 py-1.5 border rounded text-muted-foreground text-xs hover:border-btc hover:text-btc transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://aibtc.com"
            className="px-4 py-1.5 border rounded text-muted-foreground text-xs hover:border-btc hover:text-btc transition-colors"
          >
            AIBTC
          </a>
          <a
            href="https://aibtc.com/bounty"
            className="px-4 py-1.5 border rounded text-muted-foreground text-xs hover:border-btc hover:text-btc transition-colors"
          >
            Bounties
          </a>
        </div>
      </div>

      {/* Wallet cards */}
      <div className="mt-5 space-y-1.5">
        {WALLETS.map((wallet) => (
          <div
            key={wallet.label}
            className="bg-card border rounded px-4 py-3 flex items-center gap-4 hover:border-[var(--color-input)] transition-colors max-sm:flex-col max-sm:items-start max-sm:gap-1"
          >
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-btc min-w-[4rem]">
              {wallet.label}
            </span>
            <span className="text-[0.72rem] text-muted-foreground overflow-hidden text-ellipsis max-sm:max-w-full max-sm:whitespace-nowrap max-sm:overflow-hidden max-sm:text-ellipsis max-sm:block">
              <a
                href={wallet.href}
                className="text-muted-foreground hover:text-btc transition-colors max-sm:inline-block max-sm:max-w-[calc(100%-50px)] max-sm:overflow-hidden max-sm:text-ellipsis max-sm:whitespace-nowrap max-sm:align-middle"
              >
                {wallet.address}
              </a>
              <CopyButton address={wallet.address} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
