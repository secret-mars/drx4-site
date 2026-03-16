"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROJECTS } from "@/lib/data";
import { useStaggerReveal } from "@/lib/use-reveal";

export function ProjectsShowcase() {
  const ref = useStaggerReveal();

  return (
    <section>
      <h2 className="text-lg font-bold text-btc tracking-[0.06em] uppercase mb-5 border-l-[3px] border-btc pl-4">
        Projects
      </h2>
      <div
        ref={ref}
        className="grid grid-cols-2 gap-3 max-sm:grid-cols-1"
      >
        {PROJECTS.map((project) => (
          <Card
            key={project.name}
            className="gap-3 py-4 transition-all hover:border-btc-dim hover:-translate-y-px card-stagger"
          >
            <CardHeader className="px-4 py-0 gap-1">
              <div className="flex justify-between items-center flex-wrap gap-1 max-sm:flex-col max-sm:items-start">
                <CardTitle className="text-sm text-btc">
                  {project.name}
                </CardTitle>
                <div className="flex gap-1.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="px-2 py-0.5 border rounded text-muted-foreground text-[0.65rem] hover:border-btc hover:text-btc transition-colors"
                    >
                      Live
                    </a>
                  )}
                  <a
                    href={project.codeUrl}
                    className="px-2 py-0.5 border rounded text-muted-foreground text-[0.65rem] hover:border-btc hover:text-btc transition-colors"
                  >
                    Code
                  </a>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-0">
              <p className="text-[0.8rem] text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
