"use client";

import { useId, useState, type KeyboardEvent } from "react";

import { fullstackTrack, frontendTrack } from "@/app/data/skillMatrix";
import type { SkillTrack } from "@/app/data/skillMatrix";

import { SkillTrackPanel } from "./SkillTrackPanel";

type TrackId = SkillTrack["id"];

const tracks: { id: TrackId; label: string; track: SkillTrack }[] = [
  { id: "frontend", label: "Frontend", track: frontendTrack },
  { id: "fullstack", label: "Full-stack", track: fullstackTrack },
];

export function SkillsSection() {
  const [active, setActive] = useState<TrackId>("frontend");
  const tablistId = useId();
  const panelId = useId();

  const activeEntry = tracks.find((t) => t.id === active) ?? tracks[0]!;
  const activeIndex = tracks.findIndex((t) => t.id === active);

  function focusTabAt(index: number) {
    const next = tracks[(index + tracks.length) % tracks.length]!;
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
      focusTabAt(tracks.length - 1);
    }
  }

  return (
    <section
      className="px-6 pb-20 pt-4 sm:px-10 sm:pt-6"
      aria-labelledby="skills-section-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
            How I map the work
          </p>
          <h2
            id="skills-section-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl"
          >
            Frontend vs full-stack pillars
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-100">
            I care about both product UI and systems that stay reliable behind it. These
            tracks mirror how interviews usually split the bar: one lens emphasizes
            interface craft and delivery; the other expects you to own APIs, data, and
            operations too. Scores are{" "}
            <span className="font-medium text-white">self-assessed</span> and live in code so I
            can update them as I grow—use them as a candid snapshot, not a credential.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 sm:sr-only">
            Choose a track
          </p>
          <div
            id={tablistId}
            role="tablist"
            aria-label="Skill assessment track"
            onKeyDown={onTabListKeyDown}
            className="inline-flex w-full max-w-md rounded-full border border-slate-500/45 bg-slate-950/85 p-1 shadow-inner shadow-black/40 sm:w-auto"
          >
            {tracks.map((item) => {
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`${tablistId}-${item.id}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  className={`relative min-h-11 flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-6 ${
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

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${tablistId}-${active}`}
          className="mt-8 sm:mt-10"
        >
          <SkillTrackPanel track={activeEntry.track} />
        </div>
      </div>
    </section>
  );
}
