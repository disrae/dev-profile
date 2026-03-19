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
    id: "chatplanai",
    title: "ChatPlanAI",
    subtitle: "AI-augmented document generation",
    description:
      "Created an LLM-powered chat workflow for drafting and editing structured documents.",
    demoUrl: "https://chat-plan-ai.vercel.app/en-ca",
    technologies: ["React", "TypeScript", "LLMs"],
    iframe: {
      src: "https://chat-plan-ai.vercel.app/en-ca",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open ChatPlanAI",
    outcome: "Accelerates document creation with guided conversational editing.",
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
    id: "wepickle",
    title: "WePickle",
    subtitle: "Cross-platform pickleball app",
    description:
      "Shipped a community-focused mobile and web experience for court check-ins, scheduling, and skill tracking.",
    demoUrl: "https://apps.apple.com/us/app/wepickle/id6754783496?platform=vision",
    technologies: ["React Native", "Expo", "Firebase"],
    iframe: {
      src: "https://apps.apple.com/us/app/wepickle/id6754783496?platform=vision",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open WePickle",
    outcome: "Published to app stores with production-ready cross-platform UX.",
  },
  {
    id: "resume-generator",
    title: "AI Resume Generator",
    subtitle: "ATS-focused resume customization workflow",
    description:
      "Built an open-source workflow to tailor resume content and generate ATS-friendly PDF outputs.",
    demoUrl: "https://github.com/disrae/resume",
    repoUrl: "https://github.com/disrae/resume",
    technologies: ["Node.js", "Puppeteer", "Prompt workflows"],
    iframe: {
      src: "https://github.com/disrae/resume",
      timeoutMs: 7000,
    },
    fallbackLabel: "View Resume Generator",
    outcome: "Improves speed and consistency of role-specific resume generation.",
  },
  {
    id: "perrilo",
    title: "Perrilo",
    subtitle: "Performance-focused artist portfolio",
    description:
      "Designed and delivered a polished portfolio site for a concert pianist, focused on media and story.",
    demoUrl: "https://perrilo.com",
    technologies: ["Next.js", "Tailwind", "Responsive UI"],
    iframe: {
      src: "https://perrilo.com",
      timeoutMs: 7000,
    },
    fallbackLabel: "Open Perrilo",
    outcome: "Showcases media-rich content in a clean, conversion-friendly layout.",
  },
];
