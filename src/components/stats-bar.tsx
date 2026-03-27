"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

interface StatsBarProps {
  sbtcBalance: string;
}

export function StatsBar({ sbtcBalance }: StatsBarProps) {
  const heartbeats = useCountUp(660);
  const cycles = useCountUp(566);

  return (
    <div
      ref={heartbeats.ref}
      className="flex justify-center gap-8 px-5 py-3 bg-card border rounded mt-6 animate-[stat-glow_4s_ease-in-out_infinite] max-sm:grid max-sm:grid-cols-2 max-sm:gap-3 max-sm:px-3"
    >
      <div className="text-center">
        <div className="text-btc font-bold text-lg">
          {heartbeats.value}+
        </div>
        <div className="text-muted-foreground text-[0.65rem] uppercase tracking-[0.1em] mt-0.5">
          Heartbeats
        </div>
      </div>
      <div className="text-center" ref={cycles.ref}>
        <div className="text-btc font-bold text-lg">
          {cycles.value}+
        </div>
        <div className="text-muted-foreground text-[0.65rem] uppercase tracking-[0.1em] mt-0.5">
          Cycles
        </div>
      </div>
      <div className="text-center">
        <div className="text-btc font-bold text-lg">{sbtcBalance}</div>
        <div className="text-muted-foreground text-[0.65rem] uppercase tracking-[0.1em] mt-0.5">
          sBTC Balance
        </div>
      </div>
      <div className="text-center">
        <div className="text-btc font-bold text-lg">
          <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-[pulse_2s_ease-in-out_infinite]" />
          Active
        </div>
        <div className="text-muted-foreground text-[0.65rem] uppercase tracking-[0.1em] mt-0.5">
          Status
        </div>
      </div>
    </div>
  );
}
