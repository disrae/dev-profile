/**
 * Employer-centric timeline for the portfolio. Keep in sync with experience-tracker.md.
 */

/** W-2 vs contract vs co-op—shown as a pill on each card */
export const engagementLabels = {
  "full-time": "Full-time",
  contract: "Contract",
  "co-op": "Co-op",
} as const;

export type EngagementKind = keyof typeof engagementLabels;

export type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  /** e.g. "Nov 2025 – Feb 2026" */
  dates: string;
  engagement: EngagementKind;
  highlights: string[];
  /** Optional honest scope note (from tracker "what I didn't do") */
  scopeNote?: string;
};

/** Newest first */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "insightlabs",
    organization: "InsightLabs",
    role: "Senior Full Stack Developer",
    dates: "Nov 2025 – Feb 2026",
    engagement: "contract",
    highlights: [
      "Architected Zendesk integration so customers connect their instance and import support tickets into the product.",
      "Built customer-facing automation pipeline: scheduled analyses, comparing outputs over time, charts and PDF reports with email delivery (analysis/ML portions existed before I joined).",
      "Created configurable offboarding interviews customers can embed in their apps.",
      "Upgraded the dashboard with standardized UI, modal navigation, and a shared design system.",
      "Defined shared Python and TypeScript types for safer handoff between frontend and backend.",
      "Established structure and patterns so AI tooling could ship features quickly without losing coherence.",
    ],
    scopeNote:
      "Did not build initial data-analysis/ML features or LLM integrations for analysis (already in place when I joined).",
  },
  {
    id: "secrets-ai",
    organization: "Secrets AI",
    role: "Mobile Developer",
    dates: "Jan 2025 – Oct 2025",
    engagement: "full-time",
    highlights: [
      "Built React Native + Expo AI companion app from scratch: real-time chat, image sharing, carousels, shared element transitions, and strong animations.",
      "Shipped Figma designs as production-ready mobile UI with pixel-level fidelity.",
      "Full-stack in-app purchases: Node.js backend, SQL data layer, and RN client integration.",
      "Offline storage and hash-based image caching to avoid redundant downloads.",
      "Redux for unread messages, preferences, and live chat status across screens.",
      "Typed, modular architecture so AI-assisted development could scale feature work.",
      "App reached production-ready quality; not officially launched.",
    ],
    scopeNote: "Did not build the browser-based web version (owned by another developer).",
  },
  {
    id: "goose",
    organization: "Goose Insurance Services",
    role: "Mobile Front End Developer",
    dates: "Jul 2023 – Dec 2024",
    engagement: "full-time",
    highlights: [
      "Rebuilt marketing site with Astro: load times from ~8s to milliseconds and ~10× hosting cost reduction.",
      "Storyblok headless CMS so marketing could publish blogs without engineering.",
      "Redux-driven modals/popups teammates could trigger from shared state—reusable patterns that saved downstream time.",
      "Backend payloads could drive UI state for visibility and behavior (state-driven UI).",
      "Internal Firebase video CMS: upload, tagging, and controlling in-app content.",
      "Real-time testing dashboard: HTTPS-triggered Firestore updates with RN subscriptions—about 5× faster test cycles via parallel runs.",
      "Shipped Figma-accurate React UI and refactored RN components for reuse.",
    ],
  },
  {
    id: "bark",
    organization: "BARK",
    role: "Full Stack Developer",
    dates: "May 2022 – Sep 2023",
    engagement: "contract",
    highlights: [
      "Maintained Electron desktop client with Firebase (Firestore, Cloud Functions) for a lumber trading platform.",
      "Optimized Cloud Functions for historical price and spread calculations.",
      "Fixed cross-stack issues in Electron UI and Firebase backend; kept trader-facing data reliable.",
    ],
    scopeNote: "Inherited codebase; did not build most of the original platform.",
  },
  {
    id: "ehsai",
    organization: "ehsAI",
    role: "Co-op Developer",
    dates: "Sept 2020 – May 2021",
    engagement: "co-op",
    highlights: [
      "Table-building in a custom document editor for LLM-training markup workflows.",
      "Shipped via full TDD: behavior and edge cases covered in tests first.",
    ],
  },
  {
    id: "phoneme",
    organization: "PhoneMe",
    role: "Full Stack Developer",
    dates: "May 2020 – present",
    engagement: "contract",
    highlights: [
      "Consolidated RN + Fastify into a Firebase monorepo (Firestore, Firebase Auth)—100% cost reduction on prior hosting pain from spiky traffic.",
      "Later moved off Fastify to serverless; tracker notes ~$200/mo → $0/mo at peak migration.",
      "Offline poem creation, media upload, 3D search, and poem-analysis REST APIs.",
      "Figma → production React; later a responsive web build. Redux for client state.",
    ],
  },
];
