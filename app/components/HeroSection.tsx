const focusAreas = [
  "React + TypeScript",
  "AI-assisted product development",
  "Real-time and mobile systems",
];

export function HeroSection() {
  return (
    <section className="relative px-6 pt-20 pb-16 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/90">
          Daniel Israel
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-6xl">
          Building luminous software experiences across web, mobile, and AI
          workflows.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200/95 sm:text-lg">
          A space-inspired portfolio of projects focused on product velocity,
          thoughtful UX, and measurable performance outcomes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
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
