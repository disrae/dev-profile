"use client";

import { useId, useState, type KeyboardEvent } from "react";

import type { SkillTrack } from "@/app/data/skillMatrix";

import { SkillBars } from "./SkillBars";
import { SkillRadar } from "./SkillRadar";

type SkillTrackPanelProps = {
  track: SkillTrack;
};

type ChartView = "bars" | "spider";

const chartViews: { id: ChartView; label: string }[] = [
  { id: "bars", label: "Bar chart" },
  { id: "spider", label: "Spider chart" },
];

export function SkillTrackPanel({ track }: SkillTrackPanelProps) {
  const [chartView, setChartView] = useState<ChartView>("bars");
  const chartTablistId = useId();
  const chartPanelId = useId();

  const pillarsByStrength = [...track.pillars].sort((a, b) => b.score - a.score);

  /** Larger viewBox half-size so labels stay legible (SVG scales with container). */
  const radarSize = pillarsByStrength.length > 6 ? 195 : 175;

  const activeChartIndex = chartViews.findIndex((v) => v.id === chartView);

  function focusChartTabAt(index: number) {
    const next = chartViews[(index + chartViews.length) % chartViews.length]!;
    setChartView(next.id);
    requestAnimationFrame(() => {
      document.getElementById(`${chartTablistId}-${next.id}`)?.focus();
    });
  }

  function onChartTabListKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusChartTabAt(activeChartIndex + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusChartTabAt(activeChartIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusChartTabAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusChartTabAt(chartViews.length - 1);
    }
  }

  return (
    <div className="glass-panel skill-matrix-panel rounded-3xl p-6 sm:p-8">
      <div className="border-b border-slate-400/25 pb-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
          {track.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-slate-100 sm:text-[17px]">
          {track.subtitle}
        </p>
        {/* <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          Pillar scores are self-rated (0–100) and live in this site&apos;s source so they
          stay easy to update.
        </p> */}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 sm:sr-only">
          Chart type
        </p>
        <div
          id={chartTablistId}
          role="tablist"
          aria-label="Skill visualization"
          onKeyDown={onChartTabListKeyDown}
          className="inline-flex w-full max-w-md rounded-full border border-slate-500/45 bg-slate-950/85 p-1 shadow-inner shadow-black/40 sm:w-auto sm:max-w-none"
        >
          {chartViews.map((item) => {
            const selected = chartView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`${chartTablistId}-${item.id}`}
                aria-selected={selected}
                aria-controls={chartPanelId}
                tabIndex={selected ? 0 : -1}
                className={`relative min-h-11 flex-1 rounded-full px-4 py-2.5 text-base font-semibold transition sm:flex-none sm:px-6 ${
                  selected
                    ? "bg-slate-100 text-slate-950 shadow-md shadow-black/25 ring-1 ring-white/20"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
                }`}
                onClick={() => setChartView(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={chartPanelId}
        role="tabpanel"
        aria-labelledby={`${chartTablistId}-${chartView}`}
        className="mt-8"
      >
        {chartView === "bars" ? (
          <div className="min-w-0">
            <SkillBars pillars={pillarsByStrength} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <SkillRadar
              pillars={pillarsByStrength}
              size={radarSize}
              className="w-full max-w-[min(100%,min(92vw,560px))] px-1 sm:px-2"
            />
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-slate-400/25 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
          Evidence-backed profile
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200 sm:text-base">
          This section emphasizes shipped outcomes tied to each capability area so hiring
          teams can evaluate scope and impact quickly.
        </p>
      </div>
    </div>
  );
}
