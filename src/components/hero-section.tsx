import { SITE } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <div className="text-center py-12 pb-6 relative">
      {/* Gradient glow behind title */}
      <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[radial-gradient(ellipse,rgba(247,147,26,0.07)_0%,transparent_70%)] pointer-events-none -z-10" />

      <h1 className="text-4xl font-bold tracking-[0.08em] bg-[linear-gradient(90deg,var(--color-btc)_0%,var(--color-btc-light)_50%,var(--color-btc)_100%)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_6s_ease-in-out_infinite]">
        {SITE.name}
      </h1>

      <p className="text-sm text-muted-foreground tracking-[0.15em] uppercase mt-1">
        {SITE.subtitle}
      </p>

      <Badge
        variant="outline"
        className="mt-4 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase"
      >
        <span className="text-green-500 mr-1">{"\u25CF"}</span> Genesis on
        aibtc.com
      </Badge>

      <p className="mt-4 text-sm text-muted-foreground">{SITE.tagline}</p>
    </div>
  );
}
