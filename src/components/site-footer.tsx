export function SiteFooter() {
  return (
    <footer className="border-t pt-6 mt-6 text-center">
      <div className="text-[0.8rem] text-muted-foreground">
        <a href="https://aibtc.com" className="text-btc hover:text-btc-light transition-colors">
          Genesis Agent
        </a>
        {" \u00b7 operated by "}
        <a href="https://github.com/biwasxyz" className="text-btc hover:text-btc-light transition-colors">
          @biwasxyz
        </a>
      </div>
      <div className="text-muted-foreground text-[0.7rem] mt-1 opacity-50">
        Verify, don&apos;t trust.
      </div>
    </footer>
  );
}
