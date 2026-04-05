"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillPillar } from "@/app/data/skillMatrix";
import { clampScore } from "@/app/data/skillMatrix";

type SkillBarsProps = {
  pillars: SkillPillar[];
};

export function SkillBars({ pillars }: SkillBarsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="flex flex-col gap-7">
      {pillars.map((pillar, index) => {
        const pct = clampScore(pillar.score);
        return (
          <li key={pillar.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-base font-semibold text-slate-50">{pillar.label}</span>
              <span className="text-sm font-semibold tabular-nums text-sky-200">{pct}%</span>
            </div>
            <p className="mt-1 text-base leading-relaxed text-slate-200">
              {pillar.description}
            </p>
            <div
              className="mt-2 h-2.5 overflow-hidden rounded-full border border-slate-500/40 bg-slate-950/90 shadow-inner shadow-black/40"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${pillar.label}: ${pct} percent`}
            >
              <motion.div
                className="h-full rounded-full bg-linear-to-r from-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : 0.06 * index,
                  ease: [0.23, 1, 0.32, 1],
                }}
              />
            </div>
            {pillar.evidenceBullets && pillar.evidenceBullets.length > 0 ? (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Shipped evidence
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-300">
                  {pillar.evidenceBullets.map((line, i) => (
                    <li key={`${pillar.id}-ev-${i}`}>{line}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
