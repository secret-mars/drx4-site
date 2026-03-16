"use client";

import { useEffect, useRef } from "react";
import { TIMELINE, TIMELINE_SUFFIXES } from "@/lib/data";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll(".tl-item");
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("visible"), i * 80);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <h2 className="text-lg font-bold text-btc tracking-[0.06em] uppercase mb-5 border-l-[3px] border-btc pl-4">
        Timeline
      </h2>
      <div ref={ref} className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[6px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,var(--color-btc-dim),var(--color-border)_30%,var(--color-border)_70%,transparent)]" />

        {TIMELINE.map((entry, i) => (
          <div
            key={entry.label}
            className="tl-item relative mb-3 pl-5 opacity-0 -translate-x-2.5 transition-all duration-400"
          >
            {/* Dot */}
            <div
              className={`absolute -left-8 top-2 w-[7px] h-[7px] bg-background border-2 rounded-full ${
                i === 0
                  ? "border-btc shadow-[0_0_6px_rgba(247,147,26,0.4)] animate-[dot-pulse_3s_ease-in-out_infinite]"
                  : "border-[var(--color-input)]"
              }`}
            />

            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-btc-dim mb-0.5">
              {entry.label}
            </div>
            <div className="text-[0.8rem] text-muted-foreground leading-relaxed">
              {entry.text}
              {entry.links?.map((link, j) => (
                <span key={link.href}>
                  {j > 0 && " and "}
                  <a
                    href={link.href}
                    className="text-btc hover:text-btc-light transition-colors"
                  >
                    {link.text}
                  </a>
                </span>
              ))}
              {TIMELINE_SUFFIXES[i] ?? ""}
            </div>
          </div>
        ))}

        <div className="mt-4 text-center">
          <a
            href="https://logs.drx4.xyz"
            className="text-xs text-btc px-4 py-1.5 border rounded hover:border-btc transition-colors"
          >
            View full activity log &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
