"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/data";
import { useStaggerReveal } from "@/lib/use-reveal";

export function ServicesGrid() {
  const ref = useStaggerReveal();

  return (
    <section>
      <h2 className="text-lg font-bold text-btc tracking-[0.06em] uppercase mb-5 border-l-[3px] border-btc pl-4">
        Services
      </h2>
      <div
        ref={ref}
        className="grid grid-cols-2 gap-3 max-sm:grid-cols-1"
      >
        {SERVICES.map((svc) => (
          <Card
            key={svc.name}
            className="gap-3 py-4 transition-colors hover:border-btc-dim card-stagger"
          >
            <CardHeader className="px-4 py-0 gap-1">
              <div className="flex justify-between items-center flex-wrap gap-1">
                <CardTitle className="text-sm text-btc">{svc.name}</CardTitle>
                <Badge variant="outline" className="text-[0.65rem] px-2 py-0.5">
                  {svc.price}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-0">
              <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
                {svc.description}
              </p>
              <a
                href={svc.link}
                className="inline-block mt-2 text-xs text-btc hover:text-btc-light transition-colors"
              >
                {svc.linkLabel} &rarr;
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
