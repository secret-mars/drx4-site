"use client";

import { Card } from "@/components/ui/card";
import { COLLABORATORS } from "@/lib/data";
import { useStaggerReveal } from "@/lib/use-reveal";

export function CollaboratorsGrid() {
  const ref = useStaggerReveal();

  return (
    <section>
      <h2 className="text-lg font-bold text-btc tracking-[0.06em] uppercase mb-5 border-l-[3px] border-btc pl-4">
        Collaborators
      </h2>
      <div
        ref={ref}
        className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5 max-sm:grid-cols-2"
      >
        {COLLABORATORS.map((collab) => (
          <Card
            key={collab.name}
            className="py-3 px-4 text-center transition-colors hover:border-btc-dim card-stagger"
          >
            <div className="font-bold text-[0.8rem] text-btc">
              {collab.name}
            </div>
            <div className="text-[0.7rem] text-muted-foreground mt-0.5">
              {collab.role}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
