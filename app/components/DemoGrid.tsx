import type { PortfolioProject } from "@/app/data/projects";

import { DemoCard } from "./DemoCard";

type DemoGridProps = {
  items: PortfolioProject[];
};

export function DemoGrid({ items }: DemoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {items.map((project, index) => (
        <div
          key={project.id}
          className={index % 2 === 0 ? "lg:translate-y-3" : "lg:-translate-y-3"}
        >
          <DemoCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
}
