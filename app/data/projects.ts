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
];
