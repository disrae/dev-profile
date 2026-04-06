import { Portrait } from "@/app/components/Portrait";

const focusAreas = [
  "Frontend Engineer (React + TypeScript)",
  "Product-focused full-stack delivery",
  "React Native + real-time mobile systems",
];

export function HeroSection() {
  return (
    <section className="relative px-6 pt-20 pb-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16 lg:gap-20">
          <div className="shrink-0">
            <Portrait />
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/90 font-medium">
              Daniel Israel
            </p>
            <h1 className="mt-5 max-w-2xl text-[2.25rem] font-semibold leading-snug text-white sm:text-4xl lg:text-5xl">
              React and TypeScript engineer shipping web and mobile product features end to end
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-200/95">
              I build production UI with clear ownership, fast iteration, and measurable outcomes.
              You&apos;ll find selected work, shipped evidence, and experience context aligned with
              frontend and product-focused full-stack roles.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 md:justify-start">
          {focusAreas.map((item) => (
            <span key={item} className="glass-chip">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
