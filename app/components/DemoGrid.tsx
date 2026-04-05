import type { PortfolioProject } from "@/app/data/projects";

import { DemoCard } from "./DemoCard";

type DemoGridProps = {
  items: PortfolioProject[];
};

export function DemoGrid({ items }: DemoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-14">
      {items.map((project, index) => (
        <div key={project.id}>
          <DemoCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
}
