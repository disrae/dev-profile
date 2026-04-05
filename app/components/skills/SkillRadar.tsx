import type { SkillPillar } from "@/app/data/skillMatrix";
import { clampScore } from "@/app/data/skillMatrix";

type SkillRadarProps = {
  pillars: SkillPillar[];
  className?: string;
  /** Viewbox half-size; SVG is square */
  size?: number;
};

export function SkillRadar({ pillars, className = "", size = 120 }: SkillRadarProps) {
  const n = pillars.length;
  if (n < 3) return null;

  const cx = size;
  const cy = size;
  const maxR = size * 0.52;
  const labelR = size * 0.78;

  const angles = pillars.map((_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / n);

  const dataPoints = pillars.map((p, i) => {
    const r = (clampScore(p.score) / 100) * maxR;
    const x = cx + r * Math.cos(angles[i]!);
    const y = cy + r * Math.sin(angles[i]!);
    return { x, y };
  });

  const polygonPoints = dataPoints.map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(" ");

  const gridRings = [0.25, 0.5, 0.75, 1].map((t) => maxR * t);

  const labelNodes = pillars.map((p, i) => {
    const lx = cx + labelR * Math.cos(angles[i]!);
    const ly = cy + labelR * Math.sin(angles[i]!);
    const maxLen = n > 6 ? 16 : 20;
    const short =
      p.label.length > maxLen ? `${p.label.slice(0, maxLen - 1)}…` : p.label;
    return { lx, ly, short, id: p.id };
  });

  const summary = pillars.map((p) => `${p.label} ${p.score}`).join("; ");

  return (
    <figure className={className}>
      <svg
        viewBox={`0 0 ${size * 2} ${size * 2}`}
        className="h-auto w-full max-w-[min(100%,300px)] text-sky-200"
        role="img"
        aria-label={`Self-assessed skill shape: ${summary}`}
      >
        <title>Radar chart of self-assessed pillars</title>
        {gridRings.map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(148, 163, 184, 0.35)"
            strokeWidth={1}
          />
        ))}
        {angles.map((ang, i) => {
          const x2 = cx + maxR * Math.cos(ang);
          const y2 = cy + maxR * Math.sin(ang);
          return (
            <line
              key={pillars[i]!.id}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth={1}
            />
          );
        })}
        <polygon
          points={polygonPoints}
          fill="rgba(56, 189, 248, 0.38)"
          stroke="rgb(125, 211, 252)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {dataPoints.map((pt, i) => (
          <circle
            key={pillars[i]!.id}
            cx={pt.x}
            cy={pt.y}
            r={4}
            fill="rgb(240, 249, 255)"
            stroke="rgb(14, 165, 233)"
            strokeWidth={1.5}
          />
        ))}
        {labelNodes.map((node) => (
          <text
            key={node.id}
            x={node.lx}
            y={node.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgb(241, 245, 249)"
            style={{ fontSize: n > 6 ? size * 0.068 : size * 0.075, fontWeight: 600 }}
          >
            {node.short}
          </text>
        ))}
      </svg>
      <figcaption className="sr-only">{summary}</figcaption>
    </figure>
  );
}
