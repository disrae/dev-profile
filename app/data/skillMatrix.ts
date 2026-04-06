/**
 * Capability pillars for the portfolio (0-100 internal calibration for chart shaping/sorting).
 * Evidence bullets should stay aligned with experience-tracker.md (no invented claims).
 */

export type SkillPillar = {
  id: string;
  label: string;
  description: string;
  /** 0-100 internal calibration */
  score: number;
  /** Shipped outcomes tied to roles/projects (see experience-tracker.md) */
  evidenceBullets?: string[];
};

export type SkillTrack = {
  id: "frontend" | "fullstack";
  title: string;
  subtitle: string;
  pillars: SkillPillar[];
};

/** Frontend-heavy roles: UI, React/TS, and how it feels in the browser. */
export const frontendTrack: SkillTrack = {
  id: "frontend",
  title: "Frontend",
  subtitle:
    "I turn design into maintainable product UI, lean hard on React and TypeScript, and care about performance, clarity, and how the experience holds up for users and developers.",
  pillars: [
    {
      id: "fe-ui-foundations",
      label: "UI foundations",
      description:
        "Layout, responsive design, CSS architecture, and turning design specs into maintainable UI (Figma → production)—mostly in component stacks, not raw pages.",
      score: 85,
      evidenceBullets: [
        "Secrets AI: Figma designs shipped as production-ready mobile components with pixel-perfect accuracy.",
        "Goose Insurance: Figma → production React components; RN components refactored for reusability.",
        "InsightLabs: Dashboard work with standardized UI components, modal navigation, and a shared design language.",
        "PhoneMe: Figma → production React; later a responsive web version.",
      ],
    },
    {
      id: "fe-vanilla-platform",
      label: "JavaScript & the platform (vanilla)",
      description:
        "Core JS in the browser without frameworks: DOM APIs, events and delegation, async patterns, and lean HTML/CSS—still essential for small widgets, legacy surfaces, and debugging outside the React layer.",
      score: 50,
      evidenceBullets: [
        "BARK: Maintained Electron desktop app with Firebase (Firestore, Cloud Functions) for a lumber trading platform.",
        "FalconTopo (academic): Browser-based 3D cliff visualization and model rendering (falcontopo.com).",
      ],
    },
    {
      id: "fe-react",
      label: "React & component model",
      description:
        "Composition, state, effects, performance pitfalls, and patterns for scalable component trees.",
      score: 88,
      evidenceBullets: [
        "Secrets AI: React Native + Expo companion app from scratch—real-time chat, image carousels, shared element transitions, offline storage with hash-based image caching.",
        "Goose Insurance: Redux-driven modals/popups other developers triggered via state; backend payloads could drive UI visibility and behavior.",
        "Secrets AI: Redux for unread messages, user preferences, and real-time chat status across screens.",
        "PhoneMe: Redux for application state; offline poem flows with media upload and 3D search.",
      ],
    },
    {
      id: "fe-typescript",
      label: "TypeScript & tooling",
      description:
        "Typing patterns, generics where they help, build tooling, and keeping AI-generated code safely bounded.",
      score: 85,
      evidenceBullets: [
        "InsightLabs: Shared Python + TypeScript type definitions for runtime alignment across frontend and backend.",
        "Secrets AI: Strong typing and modular RN architecture so AI tooling could help prototype and scale features.",
        "PhoneMe: Firebase monorepo combining RN frontend and backend concerns under one toolchain.",
      ],
    },
    {
      id: "fe-performance",
      label: "Performance & UX",
      description:
        "Core Web Vitals mindset, bundle discipline, caching, and perceived speed—not just Lighthouse scores.",
      score: 82,
      evidenceBullets: [
        "Goose Insurance: Marketing site rebuilt with Astro—load times from ~8s to milliseconds; hosting costs cut ~10×.",
        "Secrets AI: Offline storage and hash-based image caching to cut redundant downloads.",
        "PhoneMe: Moved Fastify backend to serverless for spiky traffic; costs from ~$200/mo to $0/mo per project notes.",
      ],
    },
    {
      id: "fe-a11y",
      label: "Accessibility",
      description:
        "Semantics, keyboard flows, focus management, ARIA when needed, and catching issues before production.",
      score: 58,
    },
    {
      id: "fe-testing",
      label: "Testing (frontend)",
      description:
        "Unit/component tests, integration tests, mocking boundaries, and making CI trustworthy for UI changes.",
      score: 62,
      evidenceBullets: [
        "Goose Insurance: Testing dashboard—HTTPS events updated Firestore; RN app subscribed for real-time updates, enabling ~5× faster test runs via parallelization.",
        "ehsAI (co-op): Table builder in a custom document editor shipped with full TDD—behavior and edge cases covered in tests.",
      ],
    },
  ],
};

/** Full-stack roles: UI baseline plus APIs, data, and production systems. */
export const fullstackTrack: SkillTrack = {
  id: "fullstack",
  title: "Full-stack",
  subtitle:
    "I have shipped features end to end: HTTP APIs, persistence, background work, and the operational habits that keep production stable—paired with the product UI strengths I bring on the frontend.",
  pillars: [
    {
      id: "fs-http-apis",
      label: "HTTP & APIs",
      description:
        "REST shape, error models, auth-aware requests, versioning, and integration with third-party platforms.",
      score: 72,
      evidenceBullets: [
        "InsightLabs: Zendesk integration—customers connect their instance and import support tickets into the product.",
        "PhoneMe: REST APIs for AI-enhanced poem analysis alongside offline creative flows.",
        "Goose Insurance: Testing automation issued HTTPS requests that updated Firestore for coordinated test runs.",
      ],
    },
    {
      id: "fs-data",
      label: "Data & persistence",
      description:
        "Relational vs document tradeoffs, modeling, migrations, and thinking in transactions where it matters.",
      score: 70,
      evidenceBullets: [
        "Secrets AI: SQL data layer for the in-app purchase / monetization backend integrated with the RN client.",
        "Goose Insurance: Firestore-backed real-time testing dashboard; video management dashboard with upload/tagging.",
        "PhoneMe: Firestore + Firebase Auth monorepo migration replacing prior Fastify setup for spiky workloads.",
      ],
    },
    {
      id: "fs-backend-runtime",
      label: "Backend runtime & services",
      description:
        "Serverless vs long-running services, background jobs, idempotency, and safe retries.",
      score: 75,
      evidenceBullets: [
        "InsightLabs: Customer automation pipeline—scheduled analyses, charts, PDF reports, and email delivery.",
        "PhoneMe: Serverless migration to handle spiky usage and cost (paired with Firebase services).",
        "BARK: Optimized Firebase Cloud Functions for historical price and spread calculations.",
      ],
    },
    {
      id: "fs-auth-security",
      label: "AuthN / AuthZ & security basics",
      description:
        "Sessions vs tokens, least-privilege, secrets handling, and common web attack awareness.",
      score: 68,
      evidenceBullets: [
        "PhoneMe: Firebase Auth as part of the consolidated Firebase monorepo (Firestore + Auth migration).",
      ],
    },
    {
      id: "fs-observability",
      label: "Observability & ops",
      description:
        "Searchable structured logs, metrics tied to what users feel, tracing basics, and CI/CD I trust for releases.",
      score: 55,
    },
    {
      id: "fs-system-design",
      label: "System design (practical)",
      description:
        "Tradeoffs under real constraints, how systems scale in practice, and breaking features into sensible services without over-engineering.",
      score: 62,
      evidenceBullets: [
        "InsightLabs: End-to-end Zendesk import + automation reporting pipeline with shared cross-language types.",
        "PhoneMe: Monorepo + serverless migration tradeoffs for cost and traffic spikes (100% cost reduction in tracker notes).",
        "Goose Insurance: State-driven UI architecture so backend payloads could orchestrate client behavior safely.",
      ],
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
