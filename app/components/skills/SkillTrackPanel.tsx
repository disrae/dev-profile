import type { SkillTrack } from "@/app/data/skillMatrix";
import { getFocusPillars } from "@/app/data/skillMatrix";

import { SkillBars } from "./SkillBars";
import { SkillRadar } from "./SkillRadar";

type SkillTrackPanelProps = {
  track: SkillTrack;
};

export function SkillTrackPanel({ track }: SkillTrackPanelProps) {
  const focus = getFocusPillars(track.pillars);

  const radarSize = track.pillars.length > 6 ? 132 : 118;

  return (
    <div className="glass-panel skill-matrix-panel rounded-3xl p-6 sm:p-8">
      <div className="border-b border-slate-400/25 pb-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
          {track.title}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-100">
          {track.subtitle}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        <div className="min-w-0 flex-1">
          <SkillBars pillars={track.pillars} />
        </div>
        <div className="mx-auto shrink-0 hidden sm:block lg:mx-0 lg:w-[min(100%,300px)]">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 lg:text-left">
            Shape
          </p>
          <SkillRadar pillars={track.pillars} size={radarSize} />
        </div>
      </div>

      <div className="mt-10 border-t border-slate-400/25 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
          Growth areas next
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-200">
          Pillars I am prioritizing next: anything under my current interview-ready bar
          (60%), then the next lowest scores if I need more focus slots.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {focus.map((p) => (
            <li key={p.id}>
              <span className="inline-flex items-center rounded-full border border-violet-200/55 bg-violet-950/55 px-3 py-1.5 text-xs font-semibold text-violet-50 shadow-sm shadow-black/20">
                {p.label}
                <span className="ml-2 tabular-nums font-medium text-violet-200">{p.score}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
