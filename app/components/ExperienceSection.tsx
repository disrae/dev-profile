import {
  experienceEntries,
  engagementLabels,
  type EngagementKind,
} from "@/app/data/experience";

function engagementPillClass(kind: EngagementKind): string {
  const base =
    "inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm shadow-black/20 sm:text-sm";
  switch (kind) {
    case "full-time":
      return `${base} border-emerald-200/50 bg-emerald-950/55 text-emerald-50`;
    case "contract":
      return `${base} border-amber-200/50 bg-amber-950/55 text-amber-50`;
    case "co-op":
      return `${base} border-violet-200/55 bg-violet-950/55 text-violet-50`;
  }
}

export function ExperienceSection() {
  return (
    <section
      className="px-6 pb-20 pt-4 sm:px-10 sm:pt-6"
      aria-labelledby="experience-section-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2
            id="experience-section-heading"
            className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
          >
            Experience
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-[17px]">
            Roles by employer and timeframe—the same facts as my internal experience tracker, organized for hiring
            context rather than by skill pillar. Each card labels engagement type (full-time, contract, or co-op).
          </p>
        </div>

        <ol className="mt-10 flex list-none flex-col gap-6 sm:mt-12 sm:gap-8">
          {experienceEntries.map((job) => (
            <li key={job.id}>
              <article className="glass-panel rounded-3xl border border-slate-500/25 p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-4">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                    {job.organization}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <span className={engagementPillClass(job.engagement)}>
                      {engagementLabels[job.engagement]}
                    </span>
                    <p className="text-sm font-medium tabular-nums text-sky-200 sm:text-base">{job.dates}</p>
                  </div>
                </div>
                <p className="mt-2 text-base font-medium text-slate-200">{job.role}</p>

                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {job.highlights.map((line, i) => (
                    <li key={`${job.id}-h-${i}`}>{line}</li>
                  ))}
                </ul>

                {job.scopeNote ? (
                  <p className="mt-4 border-t border-slate-500/30 pt-4 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                    <span className="font-semibold text-slate-500">Scope: </span>
                    {job.scopeNote}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
