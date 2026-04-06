import { HeroSection } from "@/app/components/HeroSection";
import { HomeMainSwitcher } from "@/app/components/HomeMainSwitcher";
import { projects } from "@/app/data/projects";

const quickLinks = [
  {
    label: "GitHub",
    href: "https://github.com/disrae",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-israel-software-dev",
  },
  {
    label: "Email",
    href: "mailto:danny.israel@gmail.com",
  },
];

const resumeDownloads = [
  {
    label: "Download Frontend Resume",
    href: "/Daniel%20Israel%20-%20Base%20Frontend%20Resume.pdf",
    fileName: "Daniel Israel - Base Frontend Resume.pdf",
  },
  {
    label: "Download Fullstack Resume",
    href: "/Daniel%20Israel%20-%20Base%20Fullstack%20Resume.pdf",
    fileName: "Daniel Israel - Base Fullstack Resume.pdf",
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <HeroSection />

      <HomeMainSwitcher projects={projects} />

      <section className="px-6 pt-12 pb-24 sm:px-10 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="glass-panel rounded-3xl px-8 py-10 sm:py-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between border-cyan-200/30">
            <div className="max-w-md">
              <h3 className="text-3xl font-semibold tracking-tight text-white">
                Let&apos;s build something impactful
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-200/90">
                Currently focused on delightful React &amp; TypeScript interfaces, AI-assisted product development, and performance-first web experiences.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-x-3 gap-y-4">
                {quickLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    {item.label}
                    <span className="text-xs text-cyan-300 group-hover:rotate-45 transition">↗</span>
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-4">
                {resumeDownloads.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    download={item.fileName}
                    className="group inline-flex items-center gap-2 rounded-2xl border border-cyan-300/35 bg-cyan-400/10 px-6 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/80 hover:bg-cyan-300/15"
                  >
                    {item.label}
                    <span className="text-xs text-cyan-200 transition group-hover:translate-y-0.5">↓</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
