import { DemoGrid } from "@/app/components/DemoGrid";
import { HeroSection } from "@/app/components/HeroSection";
import { ParallaxDecor } from "@/app/components/ParallaxDecor";
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
      <ParallaxDecor />

      <main className="relative z-10">
        <HeroSection />

        <section className="px-6 pb-14 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Project Demo Orbit
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200/90 sm:text-base">
                  Each panel floats independently and tries an embedded live
                  preview first. If a site blocks framing, it gracefully falls
                  back to a polished launch card.
                </p>
              </div>
              <span className="w-fit rounded-full border border-cyan-200/25 bg-cyan-300/12 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100/85">
                Iframe-first + fallback
              </span>
            </div>
            <DemoGrid items={projects} />
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl px-6 py-8 glass-panel sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-cyan-50">
                Let&apos;s build something impactful
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-200/90 sm:text-base">
                Focused on React, TypeScript, mobile UX, and AI-assisted product
                development with measurable outcomes.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="rounded-full border border-cyan-200/35 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/18"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
