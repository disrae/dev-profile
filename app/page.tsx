import { HeroSection } from "@/app/components/HeroSection";
import { HomeMainSwitcher } from "@/app/components/HomeMainSwitcher";
import { StarsBackground } from "@/app/components/StarsBackground";
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

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <StarsBackground />

      <main className="relative z-10">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
