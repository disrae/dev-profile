import type { PortfolioProject } from "@/app/data/projects";

import { DemoCard } from "./DemoCard";

type DemoGridProps = {
  items: PortfolioProject[];
};

export function DemoGrid({ items }: DemoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-7 md:gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
      {items.map((project, index) => (
        <div
          key={project.id}
          className={
            index % 2 === 0
              ? "md:translate-y-2 md:rotate-[-0.35deg] lg:translate-y-6 lg:rotate-[-0.9deg] xl:translate-y-9 xl:rotate-[-1.35deg]"
              : "md:-translate-y-2 md:rotate-[0.35deg] lg:-translate-y-6 lg:rotate-[0.9deg] xl:-translate-y-9 xl:rotate-[1.35deg]"
          }
        >
          <DemoCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
}
