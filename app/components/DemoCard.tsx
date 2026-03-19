"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import type { PortfolioProject } from "@/app/data/projects";

type DemoCardProps = {
  project: PortfolioProject;
  index: number;
};

type FrameStatus = "loading" | "loaded" | "fallback";

export function DemoCard({ project, index }: DemoCardProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [status, setStatus] = useState<FrameStatus>("loading");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const shouldShowIframe = status !== "fallback";

  useEffect(() => {
    if (status !== "loading") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus("fallback");
    }, project.iframe.timeoutMs);

    return () => window.clearTimeout(timeout);
  }, [project.iframe.timeoutMs, status]);

  const panelStyle = useMemo(() => {
    if (reduceMotion) {
      return {};
    }

    return {
      transform: `perspective(1400px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    };
  }, [reduceMotion, rotation.x, rotation.y]);

  return (
    <motion.article
      className="group relative rounded-3xl glass-panel"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
      onMouseMove={(event) => {
        if (reduceMotion) {
          return;
        }

        const element = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - element.left;
        const y = event.clientY - element.top;
        const rotateY = ((x / element.width) * 2 - 1) * 4.5;
        const rotateX = (((y / element.height) * 2 - 1) * -1) * 4.5;

        setRotation({ x: rotateX, y: rotateY });
      }}
      onMouseLeave={() => setRotation({ x: 0, y: 0 })}
      style={panelStyle}
    >
      <div className="relative h-full rounded-3xl p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-cyan-100">{project.title}</h3>
            <p className="mt-0.5 text-sm text-sky-100/80">{project.subtitle}</p>
          </div>
          <span className="rounded-full border border-cyan-200/20 px-2.5 py-1 text-[11px] uppercase tracking-wider text-cyan-100/70">
            Demo
          </span>
        </div>

        <div className="planet-grid relative overflow-hidden rounded-2xl border border-cyan-200/15 bg-slate-950/55 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
          {status === "loading" ? (
            <span className="absolute top-2 right-2 z-10 rounded-full border border-cyan-200/20 bg-slate-900/75 px-2 py-1 text-[10px] uppercase tracking-wider text-cyan-100/75">
              Loading preview...
            </span>
          ) : null}
          {shouldShowIframe ? (
            <iframe
              src={project.iframe.src}
              title={`${project.title} preview`}
              className="h-64 w-full bg-slate-900/60 sm:h-72"
              loading="lazy"
              sandbox={
                project.iframe.sandbox ??
                "allow-scripts allow-same-origin allow-popups allow-forms"
              }
              allow={project.iframe.allow}
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("fallback")}
            />
          ) : (
            <div className="flex h-64 flex-col justify-between p-5 sm:h-72">
              <p className="text-sm leading-relaxed text-slate-200/90">
                Live preview is unavailable in this embed. Open the project in a
                new tab to explore the full experience.
              </p>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center rounded-full border border-cyan-200/35 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
              >
                {project.fallbackLabel}
              </a>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-200/95">
          {project.description}
        </p>

        {project.outcome ? (
          <p className="mt-2 text-sm text-cyan-200/85">{project.outcome}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-cyan-200/25 bg-sky-200/10 px-2.5 py-1 text-xs text-slate-100/90"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-cyan-300/50 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/15"
          >
            Open Live Demo
          </a>
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-slate-200/30 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-200/10"
            >
              View Source
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
