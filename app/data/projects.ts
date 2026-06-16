export type PortfolioProject = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  demoUrl: string;
  repoUrl?: string;
  technologies: string[];
  iframe: {
    src: string;
    timeoutMs: number;
    sandbox?: string;
    allow?: string;
  };
  fallbackLabel: string;
  outcome?: string;
};

export const projects: PortfolioProject[] = [
  {
    id: "lessonsbasket",
    title: "Lessons Basket",
    subtitle: "Indigenous studies lesson library",
    description:
      "Ready-to-project Indigenous studies lessons for busy classrooms. Open one page, guide discussion, and print student handouts in minutes.",
    demoUrl: "https://lessonsbasket.com",
    technologies: ["Next.js", "Tailwind", "TypeScript"],
    iframe: {
      src: "https://lessonsbasket.com",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open Lessons Basket",
    outcome: "Makes meaningful Indigenous education content instantly accessible to teachers.",
  },
  {
    id: "phoneme",
    title: "PhoneMe",
    subtitle: "Place-based poetry platform (UBC)",
    description:
      "Long-running React Native and web product for offline poem creation with media upload, 3D discovery search, and AI-enhanced analysis APIs. Migrated from Fastify to a Firebase monorepo and serverless to handle spiky traffic—cut hosting from about $200/mo to $0 at peak.",
    demoUrl: "https://www.phonemeproject.com",
    technologies: ["React Native", "Next.js", "Firebase", "TypeScript", "Redux"],
    iframe: {
      src: "https://www.phonemeproject.com",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open PhoneMe",
    outcome:
      "Delivers creative, location-aware poetry experiences on mobile and web with cost-efficient serverless scale.",
  },
  {
    id: "wepickle",
    title: "WePickle",
    subtitle: "Pickleball community app",
    description:
      "Cross-platform pickleball app built around an in-app AI coach (Claude via Vercel AI SDK)—conversational skills onboarding, DUPR-style profile extraction, ongoing coaching, and post-match debrief. Plus court geofence check-in, chats, drills, and match challenges. Expo, Convex, NativeWind; live on wepickle.win and the iOS App Store.",
    demoUrl: "https://wepickle.win",
    technologies: ["React Native", "Expo", "Convex", "TypeScript", "Tailwind"],
    iframe: {
      src: "https://wepickle.win",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open WePickle",
    outcome: "Connects players across web, iOS, and Android from a shared codebase.",
  },
  {
    id: "meditations-guide",
    title: "Meditations Guide",
    subtitle: "Experimental LLM-driven UI (Inward)",
    description:
      "Research prototype exploring a purely LLM-driven UI: Claude tool calls are the only way the screen updates—each streamed tool_use maps to client-side side effects that render whatever the model decides next. Meditation guide use case on Expo with a Cloudflare Worker backend; early and rough, but live.",
    demoUrl: "https://www.meditationsguide.com",
    technologies: [
      "React Native",
      "Expo",
      "Claude",
      "Cloudflare Workers",
      "TypeScript",
      "Tailwind",
    ],
    iframe: {
      src: "https://www.meditationsguide.com",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open Meditations Guide",
    outcome:
      "Tests whether tool calls alone can drive a full product UI—not chat bolted onto static screens.",
  },
  {
    id: "goose-insurance",
    title: "Goose Insurance Website",
    subtitle: "Astro rebuild and performance overhaul",
    description:
      "Rebuilt the marketing site with Astro and a CMS integration for high-performance publishing.",
    demoUrl: "https://www.gooseinsurance.com/en-ca/",
    technologies: ["Astro", "Storyblok", "Performance"],
    iframe: {
      src: "https://www.gooseinsurance.com/en-ca/",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open Goose Insurance",
    outcome: "Cut load time from ~8s to milliseconds and reduced hosting costs.",
  },
  {
    id: "falcontopo",
    title: "FalconTopo",
    subtitle: "3D climbing cliff visualization",
    description:
      "Built a browser-based 3D guide replacement that helps climbers explore routes interactively.",
    demoUrl: "https://falcontopo.com",
    technologies: ["Three.js", "TypeScript", "WebGL"],
    iframe: {
      src: "https://falcontopo.com",
      timeoutMs: 7000,
      allow: "fullscreen",
    },
    fallbackLabel: "Open FalconTopo",
    outcome: "Delivers interactive route context beyond static guidebooks.",
  },
  {
    id: "perrilo",
    title: "Perrilo",
    subtitle: "Concert pianist portfolio",
    description:
      "Designed and delivered a polished portfolio site for a concert pianist, focused on media and story. Built an admin dashboard so she can update content and media, and wired a contact form so visitors can email her directly from the site.",
    demoUrl: "https://perrilo.com",
    technologies: ["Next.js", "Tailwind", "Responsive UI"],
    iframe: {
      src: "https://perrilo.com",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open Perrilo",
    outcome:
      "Self-serve updates, direct inquiries, and a presentation that matches a professional artist brand.",
  },
];