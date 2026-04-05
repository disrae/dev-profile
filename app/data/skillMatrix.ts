/**
 * Self-assessed skill pillars for portfolio (draft — edit scores anytime).
 * Scores are 0–100; they reflect interview-style dimensions, not vanity metrics.
 */

export type SkillPillar = {
  id: string;
  label: string;
  description: string;
  /** 0–100 self-assessment */
  score: number;
  /** Optional reminder of where this shows up in your work */
  evidenceNote?: string;
};

export type SkillTrack = {
  id: "frontend" | "fullstack";
  title: string;
  subtitle: string;
  pillars: SkillPillar[];
};

/** Frontend-focused roles: depth in UI, React, and web delivery. */
export const frontendTrack: SkillTrack = {
  id: "frontend",
  title: "Frontend track",
  subtitle:
    "What strong frontend interviews tend to stress: product UI, framework depth, and shipping fast experiences.",
  pillars: [
    {
      id: "fe-ui-foundations",
      label: "UI foundations",
      description:
        "Layout, responsive design, CSS architecture, and turning design specs into maintainable UI (Figma → production)—mostly in component stacks, not raw pages.",
      score: 85,
      evidenceNote: "Figma-to-code across RN/web; design system work at InsightLabs.",
    },
    {
      id: "fe-vanilla-platform",
      label: "JavaScript & the platform (vanilla)",
      description:
        "Core JS in the browser without frameworks: DOM APIs, events and delegation, async patterns, and minimal HTML/CSS wiring—the mode many onsites still use.",
      score: 50,
      evidenceNote:
        "Growth area: Amazon-style browser rounds felt thin vs day-to-day React/TS; more reps on plain DOM + language edge cases.",
    },
    {
      id: "fe-react",
      label: "React & component model",
      description:
        "Composition, state, effects, performance pitfalls, and patterns for scalable component trees.",
      score: 88,
      evidenceNote: "React, React Native, Redux-heavy apps; Expo shipping.",
    },
    {
      id: "fe-typescript",
      label: "TypeScript & tooling",
      description:
        "Typing patterns, generics where they help, build tooling, and keeping AI-generated code safely bounded.",
      score: 85,
      evidenceNote: "Shared TS/Python type direction; monorepo and strictness habits.",
    },
    {
      id: "fe-performance",
      label: "Performance & UX",
      description:
        "Core Web Vitals mindset, bundle discipline, caching, and perceived speed—not just Lighthouse scores.",
      score: 82,
      evidenceNote: "Astro rebuild; aggressive load-time and cost wins on marketing sites.",
    },
    {
      id: "fe-a11y",
      label: "Accessibility",
      description:
        "Semantics, keyboard flows, focus management, ARIA when needed, and catching issues before production.",
      score: 58,
      evidenceNote: "Growth area: deepen systematic a11y testing and audits.",
    },
    {
      id: "fe-testing",
      label: "Testing (frontend)",
      description:
        "Unit/component tests, integration tests, mocking boundaries, and making CI trustworthy for UI changes.",
      score: 62,
      evidenceNote: "Real-time testing dashboard; room to grow on coverage habits.",
    },
  ],
};

/** Full-stack roles: frontend baseline plus APIs, data, and running systems. */
export const fullstackTrack: SkillTrack = {
  id: "fullstack",
  title: "Full-stack track",
  subtitle:
    "End-to-end ownership: APIs, persistence, background work, and operating what you ship—on top of a solid UI baseline.",
  pillars: [
    {
      id: "fs-http-apis",
      label: "HTTP & APIs",
      description:
        "REST shape, error models, auth-aware requests, versioning, and integration with third-party platforms.",
      score: 72,
      evidenceNote: "Zendesk import, REST surfaces, HTTPS/Firestore-triggered flows.",
    },
    {
      id: "fs-data",
      label: "Data & persistence",
      description:
        "Relational vs document tradeoffs, modeling, migrations, and thinking in transactions where it matters.",
      score: 70,
      evidenceNote: "Firestore-heavy apps; SQL for monetization backend (Secrets AI).",
    },
    {
      id: "fs-backend-runtime",
      label: "Backend runtime & services",
      description:
        "Serverless vs long-running services, background jobs, idempotency, and safe retries.",
      score: 75,
      evidenceNote: "Automation pipelines, Cloud Functions, serverless migrations.",
    },
    {
      id: "fs-auth-security",
      label: "AuthN / AuthZ & security basics",
      description:
        "Sessions vs tokens, least-privilege, secrets handling, and common web attack awareness.",
      score: 68,
      evidenceNote: "Firebase Auth patterns; deepen formal security review practice.",
    },
    {
      id: "fs-observability",
      label: "Observability & ops",
      description:
        "Logging you can search, metrics that matter, tracing basics, and CI/CD fluency.",
      score: 55,
      evidenceNote: "Growth area: production SLO mindset and deeper ops tooling.",
    },
    {
      id: "fs-system-design",
      label: "System design (practical)",
      description:
        "Tradeoffs under constraints, scaling vocabulary, and decomposing features without over-engineering.",
      score: 62,
      evidenceNote: "Architecture choices in integrations and cost migrations; more reps on whiteboard clarity.",
    },
  ],
};

export const skillTracks: SkillTrack[] = [frontendTrack, fullstackTrack];

export type FocusPillarOptions = {
  /** Pillars at or below this score are highlighted as growth areas */
  threshold?: number;
  /** Always surface at least this many pillars (by lowest score) */
  minCount?: number;
  /** Cap how many labels we show */
  maxCount?: number;
};

/**
 * Pillars to emphasize as "focus next" / growth areas.
 * Prefers scores below `threshold`; if there are not enough, adds lowest overall scores until `minCount`.
 */
export function getFocusPillars(
  pillars: SkillPillar[],
  opts: FocusPillarOptions = {},
): SkillPillar[] {
  const threshold = opts.threshold ?? 60;
  const minCount = opts.minCount ?? 2;
  const maxCount = opts.maxCount ?? 4;

  const sorted = [...pillars].sort((a, b) => a.score - b.score);
  const below = sorted.filter((p) => p.score < threshold);
  const chosen = below.slice(0, maxCount);

  if (chosen.length < minCount) {
    const chosenIds = new Set(chosen.map((p) => p.id));
    for (const p of sorted) {
      if (chosen.length >= maxCount) break;
      if (!chosenIds.has(p.id)) {
        chosen.push(p);
        chosenIds.add(p.id);
      }
    }
  }

  return chosen.sort((a, b) => a.score - b.score);
}

export function clampScore(score: number): number {
  return Math.min(100, Math.max(0, Math.round(score)));
}
