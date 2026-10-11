import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { projects } from "@/data/projects";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

/* ─────────── Detect touch device ─────────── */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsTouch(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.innerWidth < 768
      );
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTouch;
}

/* ─────────── Card with 3D tilt — mouse only ─────────── */
function TiltCard({ children, className = "" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(x * 6);
    rx.set(-y * 6);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        isTouch
          ? undefined
          : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── Magnetic arrow — mouse only ─────────── */
function MagneticArrow() {
  const ref = useRef<HTMLSpanElement>(null);
  const isTouch = useIsTouch();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLSpanElement>) {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.4);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={isTouch ? undefined : { x, y }}
      className="material-symbols-outlined flex-shrink-0 text-[16px] md:text-[20px] text-[#0a0a0a]/30 transition-all duration-300 group-hover:text-[#0a0a0a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      north_east
    </motion.span>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full bg-white text-[#0a0a0a] border-t border-[#0a0a0a]/10"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-16 py-16 md:py-32">

        {/* ═══════════════ HEADER ═══════════════ */}
        <div className="flex flex-col items-center text-center gap-4 md:gap-5 mb-12 md:mb-28">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest text-[#0a0a0a]/60">
                {projects.index}
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0a0a0a] opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display font-extrabold text-[36px] md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.98] md:leading-[0.95] uppercase">
              {projects.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-[#555] text-[14.5px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
              {projects.subtitle}
            </p>
          </Reveal>
        </div>

        {/* ══════════════════════════════════════════════════════
            PART A — ROLES
            ══════════════════════════════════════════════════════ */}
        <Reveal className="flex flex-col gap-6 md:gap-8 mb-16 md:mb-32">
          {/* Section label */}
          <div className="flex items-center gap-2.5 md:gap-3">
            <span className="font-mono text-[10.5px] md:text-[11px] font-bold uppercase tracking-widest text-[#0a0a0a] whitespace-nowrap">
              {projects.roles.title}
            </span>
            <span className="flex-1 h-[1px] bg-[#0a0a0a]/10" />
            <span className="hidden sm:inline font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-[#0a0a0a]/40 whitespace-nowrap">
              {projects.roles.meta}
            </span>
          </div>

          {/* Timeline rows */}
          <div className="flex flex-col border-t border-[#0a0a0a]/10">
            {projects.roles.items.map((r, i) => (
              <RevealItem
                key={r.title}
                variants={fadeUp}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 md:py-10 border-b border-[#0a0a0a]/10 transition-colors md:hover:bg-[#fafafa] active:bg-[#fafafa]"
              >
                {/* ── MOBILE header row: 01 · period · badge ── */}
                <div className="flex md:hidden items-center gap-2.5">
                  <span className="font-display font-extrabold text-[20px] tracking-tight text-[#0a0a0a]/25 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="h-3 w-[1px] bg-[#0a0a0a]/15" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0a0a0a]/60">
                    {r.period}
                  </span>
                  {r.badge && (
                    <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider font-bold text-emerald-700">
                      <span className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                      {r.badge}
                    </span>
                  )}
                </div>

                {/* ── DESKTOP number column ── */}
                <div className="hidden md:flex md:col-span-1 items-start">
                  <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-[#0a0a0a]/15 group-hover:text-[#0a0a0a] transition-colors duration-500 tabular-nums">
                    0{i + 1}
                  </span>
                </div>

                {/* ── DESKTOP meta column ── */}
                <div className="hidden md:flex md:col-span-3 flex-col gap-2">
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-[#0a0a0a]/50">
                    {r.period}
                  </span>
                  {r.badge ? (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold text-emerald-700">
                      <span className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                      {r.badge}
                    </span>
                  ) : r.meta ? (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#0a0a0a]/30">
                      {r.meta}
                    </span>
                  ) : null}
                </div>

                {/* ── Content column (both) ── */}
                <div className="md:col-span-8 flex flex-col gap-2.5 md:gap-3">
                  <h3 className="font-display font-bold text-[18px] md:text-[26px] tracking-tight leading-[1.2] md:leading-tight text-[#0a0a0a]">
                    {r.title}
                  </h3>
                  <p className="font-body text-[13.5px] md:text-[15px] leading-relaxed text-[#555] max-w-2xl">
                    {r.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 pt-1">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#0a0a0a]/12 bg-white px-2.5 md:px-3 py-0.5 md:py-1 font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider text-[#333]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover accent bar */}
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[#0a0a0a] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </RevealItem>
            ))}
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════════════════
            PART B — PROJECTS
            ══════════════════════════════════════════════════════ */}
        <Reveal className="flex flex-col gap-6 md:gap-8">
          {/* Section label */}
          <div className="flex items-center gap-2.5 md:gap-3">
            <span className="font-mono text-[10.5px] md:text-[11px] font-bold uppercase tracking-widest text-[#0a0a0a] whitespace-nowrap">
              {projects.backend.title}
            </span>
            <span className="flex-1 h-[1px] bg-[#0a0a0a]/10" />
            <span className="hidden sm:inline font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-[#0a0a0a]/40 whitespace-nowrap">
              {projects.backend.meta}
            </span>
          </div>

          {/* Grid */}
          <Reveal staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {projects.backend.items.map((p, i) => {
              const isFeatured = i === 0;
              return (
                <RevealItem
                  key={p.title}
                  variants={fadeUp}
                  className={isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}
                >
                  <TiltCard className="h-full">
                    <div
                      className={
                        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#0a0a0a]/10 bg-white " +
                        (isFeatured ? "p-5 md:p-10" : "p-5 md:p-6") +
                        " transition-colors md:hover:border-[#0a0a0a]/40 active:border-[#0a0a0a]/30"
                      }
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Watermark — smaller on mobile */}
                      <span
                        aria-hidden="true"
                        className={
                          "pointer-events-none absolute font-display font-extrabold tracking-tighter text-[#0a0a0a]/[0.04] select-none " +
                          (isFeatured
                            ? "-top-3 -right-1 text-[100px] md:-top-6 md:-right-2 md:text-[240px]"
                            : "-top-3 -right-1 text-[80px] md:text-[120px]") +
                          " leading-none"
                        }
                        style={{ transform: "translateZ(-20px)" }}
                      >
                        0{i + 1}
                      </span>

                      {/* Category + arrow */}
                      <div
                        className="relative flex items-center justify-between gap-3 mb-4 md:mb-6"
                        style={{ transform: "translateZ(20px)" }}
                      >
                        <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-wider text-[#0a0a0a]/50 truncate">
                          {p.category}
                        </span>
                        <MagneticArrow />
                      </div>

                      {/* Title */}
                      <h3
                        className={
                          "relative font-display font-bold tracking-tight leading-[1.1] md:leading-[1.05] text-[#0a0a0a] mb-3 md:mb-4 " +
                          (isFeatured
                            ? "text-[26px] md:text-[44px] lg:text-[52px]"
                            : "text-[20px] md:text-[24px]")
                        }
                        style={{ transform: "translateZ(30px)" }}
                      >
                        {p.title}
                      </h3>

                      {/* Body */}
                      <p
                        className={
                          "relative font-body leading-relaxed text-[#555] flex-grow " +
                          (isFeatured
                            ? "text-[13.5px] md:text-[16.5px] max-w-lg"
                            : "text-[13px] md:text-[13.5px]")
                        }
                        style={{ transform: "translateZ(15px)" }}
                      >
                        {p.body}
                      </p>

                      {/* Tags */}
                      <div
                        className="relative mt-4 md:mt-6 flex flex-wrap gap-1.5"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-[#f4f4f4] px-2 py-0.5 font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider text-[#333]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Bottom accent */}
                      <span className="absolute inset-x-0 bottom-0 h-[3px] scale-x-0 bg-[#0a0a0a] origin-left transition-transform duration-500 group-hover:scale-x-100" />
                    </div>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </Reveal>
        </Reveal>

        {/* ═══════════════ CLOSING STRIP ═══════════════ */}
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mt-14 md:mt-28 pt-5 md:pt-6 border-t border-[#0a0a0a]/10">
          <span className="text-center md:text-left font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-[#0a0a0a]/40">
            {projects.roles.items.length} roles · {projects.backend.items.length} projects · 2023 — present
          </span>
          <a
            href="#contact"
            className="group flex items-center justify-center md:justify-start gap-2 font-mono text-[10.5px] uppercase tracking-widest text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors"
          >
            Work with me
            <span className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </a>
        </Reveal>

      </div>
    </section>
  );
}