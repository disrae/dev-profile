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
  const [depthTilt, setDepthTilt] = useState(0);
  const [lift, setLift] = useState(0);
  const [tiltRange, setTiltRange] = useState(2.8);

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

  useEffect(() => {
    const syncTiltRange = () => {
      if (window.innerWidth < 768) {
        setTiltRange(1.6);
      } else if (window.innerWidth < 1024) {
        setTiltRange(3.2);
      } else if (window.innerWidth < 1280) {
        setTiltRange(4.8);
      } else {
        setTiltRange(6.2);
      }
    };

    syncTiltRange();
    window.addEventListener("resize", syncTiltRange);

    return () => window.removeEventListener("resize", syncTiltRange);
  }, []);

  const panelStyle = useMemo(() => {
    if (reduceMotion) {
      return {};
    }

    return {
      transform: `perspective(1400px) rotateX(${depthTilt}deg) translateZ(${lift}px)`,
    };
  }, [depthTilt, lift, reduceMotion]);

  return (
    <motion.article
      className="group relative rounded-3xl glass-panel overflow-hidden"
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
        const normalizedY = ((y / element.height) * 2 - 1) * -1;
        const depthRotation = normalizedY * tiltRange;

        const centerX = element.width / 2;
        const centerY = element.height / 2;
        const distanceFromCenter = Math.hypot(x - centerX, y - centerY);
        const maxDistance = Math.hypot(centerX, centerY);
        const centerProximity = 1 - Math.min(distanceFromCenter / maxDistance, 1);

        setDepthTilt(depthRotation);
        setLift(centerProximity * 16);
      }}
      onMouseLeave={() => {
        setDepthTilt(0);
        setLift(0);
      }}
      style={panelStyle}
    >
      <div className="relative h-full rounded-3xl p-5 sm:p-6 lg:p-8">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
            <p className="mt-1 text-sm text-sky-100/90">{project.subtitle}</p>
          </div>
          <span className="mt-1.5 rounded-full border border-cyan-200/30 bg-cyan-950/60 px-3 py-0.5 text-[10px] font-mono uppercase tracking-[0.075em] text-cyan-100/80">
            LIVE
          </span>
        </div>

        <div className="planet-grid relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-slate-950/70 shadow-inner">
          {status === "loading" ? (
            <span className="absolute top-4 right-4 z-10 rounded-full border border-cyan-200/30 bg-slate-900/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-cyan-100/75">
              LOADING PREVIEW
            </span>
          ) : null}
          {shouldShowIframe ? (
            <iframe
              src={project.iframe.src}
              title={`${project.title} preview`}
              className="h-[min(62vh,720px)] w-full min-h-[360px] bg-slate-900/70 sm:min-h-[420px] lg:min-h-[520px] rounded-2xl"
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
            <div className="flex h-[min(62vh,720px)] min-h-[360px] flex-col justify-center p-8 text-center sm:min-h-[420px] lg:min-h-[520px]">
              <div className="mx-auto mb-6 h-16 w-16 rounded-full border border-cyan-200/30 bg-slate-900/80 flex items-center justify-center">
                <span className="text-3xl">🌍</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-200/85 max-w-[260px] mx-auto">
                Live preview unavailable. Visit the site to explore this beautiful project.
              </p>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-fit mx-auto items-center rounded-full border border-cyan-200/40 bg-cyan-400/10 px-6 py-2.5 text-sm font-medium text-cyan-100 hover:bg-cyan-400/20 transition-all active:scale-[0.985]"
              >
                {project.fallbackLabel}
              </a>
            </div>
          )}
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-slate-200/90">
          {project.description}
        </p>

        {project.outcome ? (
          <p className="mt-3 text-sm text-emerald-300/90 font-light">{project.outcome}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-xl border border-cyan-200/30 bg-slate-900/70 px-3 py-1 text-xs font-mono tracking-wider text-cyan-100/90"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-2xl border border-cyan-300/60 bg-linear-to-b from-cyan-400/10 to-transparent px-6 py-3 text-sm font-medium text-white transition-all hover:border-cyan-300 hover:from-cyan-400/20 active:scale-[0.985]"
          >
            <span>Visit Project</span>
            <span className="text-xs opacity-70 group-hover:translate-x-0.5 transition">↗</span>
          </a>
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/5"
            >
              View Source
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
