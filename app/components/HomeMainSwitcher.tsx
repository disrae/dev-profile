"use client";

import { useId, useState, type KeyboardEvent } from "react";

import { DemoGrid } from "@/app/components/DemoGrid";
import { SkillsSection } from "@/app/components/skills/SkillsSection";
import type { PortfolioProject } from "@/app/data/projects";

type MainView = "projects" | "skills";

const views: { id: MainView; label: string }[] = [
  { id: "projects", label: "Selected work" },
  { id: "skills", label: "Skill pillars" },
];

type HomeMainSwitcherProps = {
  projects: PortfolioProject[];
};

export function HomeMainSwitcher({ projects }: HomeMainSwitcherProps) {
  const [active, setActive] = useState<MainView>("projects");
  const tablistId = useId();
  const projectsPanelId = useId();
  const skillsPanelId = useId();

  const activeIndex = views.findIndex((v) => v.id === active);

  function focusTabAt(index: number) {
    const next = views[(index + views.length) % views.length]!;
    setActive(next.id);
    requestAnimationFrame(() => {
      document.getElementById(`${tablistId}-${next.id}`)?.focus();
    });
  }

  function onTabListKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusTabAt(activeIndex + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusTabAt(activeIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTabAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTabAt(views.length - 1);
    }
  }

  return (
    <>
      <div className="px-6 py-3 sm:px-10 sm:py-4">
        <div className="mx-auto flex max-w-6xl justify-center">
          <div
            id={tablistId}
            role="tablist"
            aria-label="Main site section"
            onKeyDown={onTabListKeyDown}
            className="inline-flex w-full max-w-2xl rounded-full border border-slate-500/50 bg-slate-950/90 p-1.5 shadow-inner shadow-black/40 sm:w-auto sm:max-w-none sm:p-2"
          >
            {views.map((item) => {
              const selected = active === item.id;
              const controls =
                item.id === "projects" ? projectsPanelId : skillsPanelId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`${tablistId}-${item.id}`}
                  aria-selected={selected}
                  aria-controls={controls}
                  tabIndex={selected ? 0 : -1}
                  className={`relative min-h-14 flex-1 rounded-full px-5 py-3.5 text-base font-semibold tracking-tight transition sm:min-h-[3.75rem] sm:flex-none sm:px-10 sm:py-4 sm:text-lg ${
                    selected
                      ? "bg-slate-100 text-slate-950 shadow-md shadow-black/25 ring-1 ring-white/20"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-100"
                  }`}
                  onClick={() => setActive(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        id={projectsPanelId}
        role="tabpanel"
        hidden={active !== "projects"}
        aria-labelledby={`${tablistId}-projects`}
      >
        <section className="px-6 pb-20 pt-4 sm:px-10 sm:pt-6">
          <div className="mx-auto max-w-6xl">
            <DemoGrid items={projects} />
          </div>
        </section>
      </div>

      <div
        id={skillsPanelId}
        role="tabpanel"
        hidden={active !== "skills"}
        aria-labelledby={`${tablistId}-skills`}
      >
        {/* Keep mounted so iframes and the FE/FS pills keep state when switching */}
        <SkillsSection />
      </div>
    </>
  );
}
