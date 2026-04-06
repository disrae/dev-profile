"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import type { SkillPillar } from "@/app/data/skillMatrix";
import { clampScore } from "@/app/data/skillMatrix";

type SkillRadarProps = {
  pillars: SkillPillar[];
  className?: string;
  /** Viewbox half-size; SVG is square */
  size?: number;
};

function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setPrefersHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return prefersHover;
}

export function SkillRadar({ pillars, className = "", size = 120 }: SkillRadarProps) {
  const n = pillars.length;
  const [active, setActive] = useState<SkillPillar | null>(null);
  const prefersHover = usePrefersHover();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const cx = size;
  const cy = size;
  const maxR = size * 0.5;
  const labelR = size * 0.88;

  const angles = pillars.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / n);

  const dataPoints = pillars.map((p, i) => {
    const r = (clampScore(p.score) / 100) * maxR;
    const x = cx + r * Math.cos(angles[i]!);
    const y = cy + r * Math.sin(angles[i]!);
    return { x, y };
  });

  const polygonPoints = dataPoints.map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(" ");

  const gridRings = [0.25, 0.5, 0.75, 1].map((t) => maxR * t);

  const labelNodes = pillars.map((p, i) => {
    const lx = cx + labelR * Math.cos(angles[i]!);
    const ly = cy + labelR * Math.sin(angles[i]!);
    const maxLen = 48;
    const short =
      p.label.length > maxLen ? `${p.label.slice(0, maxLen - 1)}…` : p.label;
    return { lx, ly, short, id: p.id };
  });

  const summary = pillars.map((p) => p.label).join("; ");

  const selectPillar = useCallback((p: SkillPillar) => {
    setActive((a) => (a?.id === p.id ? null : p));
  }, []);

  const hoverPillar = useCallback(
    (p: SkillPillar) => {
      if (prefersHover) setActive(p);
    },
    [prefersHover],
  );

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };

    const onDocPointerDown = (e: PointerEvent) => {
      const el = wrapperRef.current;
      if (el && !el.contains(e.target as Node)) setActive(null);
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDocPointerDown, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDocPointerDown, true);
    };
  }, [active]);

  if (n < 3) return null;

  const hitR = Math.max(14, size * 0.072);
  const fontSize = n > 6 ? size * 0.056 : size * 0.062;

  return (
    <div
      ref={wrapperRef}
      className={className}
      onMouseLeave={() => {
        if (prefersHover) setActive(null);
      }}
    >
      <figure className="m-0">
        <svg
          viewBox={`0 0 ${size * 2} ${size * 2}`}
          className="h-auto w-full overflow-visible text-sky-200"
          role="img"
          aria-label={`Skill profile shape: ${summary}`}
        >
          <title>Radar chart of capability pillars</title>
          {gridRings.map((r) => (
            <circle
              key={r}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="rgba(148, 163, 184, 0.35)"
              strokeWidth={1}
              pointerEvents="none"
            />
          ))}
          {angles.map((ang, i) => {
            const x2 = cx + maxR * Math.cos(ang);
            const y2 = cy + maxR * Math.sin(ang);
            return (
              <line
                key={pillars[i]!.id}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="rgba(148, 163, 184, 0.4)"
                strokeWidth={1}
                pointerEvents="none"
              />
            );
          })}
          <polygon
            points={polygonPoints}
            fill="rgba(56, 189, 248, 0.38)"
            stroke="rgb(125, 211, 252)"
            strokeWidth={2}
            strokeLinejoin="round"
            pointerEvents="none"
          />
          {dataPoints.map((pt, i) => {
            const p = pillars[i]!;
            const selected = active?.id === p.id;
            return (
              <g key={p.id}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hitR}
                  fill="transparent"
                  className="cursor-pointer touch-manipulation outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                  tabIndex={0}
                  aria-label={`${p.label}. Show details.`}
                  onPointerEnter={() => hoverPillar(p)}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectPillar(p);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectPillar(p);
                    }
                  }}
                />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={4}
                  fill="rgb(240, 249, 255)"
                  stroke={selected ? "rgb(34, 211, 238)" : "rgb(14, 165, 233)"}
                  strokeWidth={selected ? 2.5 : 1.5}
                  pointerEvents="none"
                />
              </g>
            );
          })}
          {labelNodes.map((node, i) => {
            const p = pillars[i]!;
            const selected = active?.id === p.id;
            return (
              <text
                key={node.id}
                x={node.lx}
                y={node.ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={selected ? "rgb(165, 243, 252)" : "rgb(241, 245, 249)"}
                className="cursor-pointer touch-manipulation select-none"
                style={{
                  fontSize,
                  fontWeight: 600,
                  pointerEvents: "auto",
                }}
                onPointerEnter={() => hoverPillar(p)}
                onClick={(e) => {
                  e.stopPropagation();
                  selectPillar(p);
                }}
              >
                {node.short}
              </text>
            );
          })}
        </svg>
        <figcaption className="sr-only">{summary}</figcaption>
      </figure>

      <p className="mt-3 text-center text-base text-slate-400 sm:text-left">
        {prefersHover ? "Hover a pillar or label for details." : "Tap a pillar or label for details."}
      </p>

      {active ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="mt-4 rounded-2xl border border-sky-400/35 bg-slate-950/90 p-5 shadow-lg shadow-black/30 ring-1 ring-white/10"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 id={titleId} className="text-lg font-semibold text-slate-50">
              {active.label}
            </h4>
          </div>
          <p className="mt-3 text-base leading-relaxed text-slate-200">{active.description}</p>
          {active.evidenceBullets && active.evidenceBullets.length > 0 ? (
            <div className="mt-4 border-t border-slate-500/30 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Shipped evidence
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
                {active.evidenceBullets.map((line, i) => (
                  <li key={`${active.id}-ev-${i}`}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <button
            type="button"
            className="mt-4 w-full rounded-xl border border-slate-500/50 py-3 text-base font-semibold text-slate-200 transition hover:border-slate-400 hover:bg-slate-800/60 sm:hidden"
            onClick={() => setActive(null)}
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
