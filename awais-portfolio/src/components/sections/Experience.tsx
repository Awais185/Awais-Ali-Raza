import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { experience } from "@/data/experience";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

/* ────────────────────────────────────────────── */
/* Responsive hook — tracks viewport width */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ────────────────────────────────────────────── */
/* ExploringNucleus — responsive scaling */
function ExploringNucleus() {
  const chips = experience.exploring.chips;
  const [activeIdx, setActiveIdx] = useState(0);
  const isMobile = useIsMobile();

  // Scale everything down on mobile
  const radius = isMobile ? 62 : 92;
  const outerRing = isMobile ? 170 : 240;
  const innerRing = isMobile ? 130 : 184;
  const containerH = isMobile ? 240 : 300;
  const nucleusSize = isMobile ? 48 : 64;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % chips.length);
    }, 1700);
    return () => clearInterval(timer);
  }, [chips.length]);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-[#0a0a0a]/8 bg-white"
      style={{ height: containerH }}
    >
      {/* Dot-grid */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(10,10,10,0.07) 1px, transparent 1px)",
          backgroundSize: isMobile ? "14px 14px" : "18px 18px",
        }}
      />

      {/* Radar sweep */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{
          width: outerRing,
          height: outerRing,
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(10,10,10,0.10) 30deg, transparent 60deg)",
          maskImage: "radial-gradient(circle, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 100%)",
        }}
      />

      {/* Static rings */}
      <div
        className="absolute rounded-full border border-dashed border-[#0a0a0a]/15"
        style={{ width: outerRing, height: outerRing }}
      />
      <div
        className="absolute rounded-full border border-[#0a0a0a]/8"
        style={{ width: innerRing, height: innerRing }}
      />

      {/* Rotating tick ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{ width: outerRing, height: outerRing }}
      >
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute top-0 bg-[#0a0a0a]/25"
            style={{
              left: "50%",
              width: "1.5px",
              height: isMobile ? "6px" : "8px",
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              transformOrigin: `50% ${outerRing / 2}px`,
            }}
          />
        ))}
      </motion.div>

      {/* Counter-rotating inner dots */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full"
        style={{ width: innerRing, height: innerRing }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#0a0a0a]/40" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#0a0a0a]/40" />
      </motion.div>

      {/* Nucleus — breathing glow */}
      <motion.div
        animate={{
          boxShadow: [
            "0 12px 30px -8px rgba(0,0,0,0.5), 0 0 0 0 rgba(10,10,10,0.10)",
            "0 12px 30px -8px rgba(0,0,0,0.5), 0 0 0 12px rgba(10,10,10,0)",
            "0 12px 30px -8px rgba(0,0,0,0.5), 0 0 0 0 rgba(10,10,10,0.10)",
          ],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 flex items-center justify-center rounded-full bg-[#0a0a0a] text-white"
        style={{ width: nucleusSize, height: nucleusSize }}
      >
        <span
          className={
            "font-display font-extrabold leading-none " +
            (isMobile ? "text-[15px]" : "text-[18px]")
          }
        >
          AI
        </span>
        <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-[3px] ring-white" />
      </motion.div>

      {/* Chips — radial + sequential pulse */}
      {chips.map((chip, i) => {
        const angle = (i / chips.length) * 360 - 90;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const isActive = i === activeIdx;

        return (
          <motion.div
            key={chip}
            className="absolute z-10"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.span
              animate={{
                backgroundColor: isActive ? "#0a0a0a" : "#ffffff",
                color: isActive ? "#ffffff" : "#111111",
                borderColor: isActive ? "#0a0a0a" : "rgba(10,10,10,0.12)",
                scale: isActive ? 1.06 : 1,
                boxShadow: isActive
                  ? "0 0 0 3px rgba(10,10,10,0.06), 0 6px 16px -4px rgba(0,0,0,0.2)"
                  : "0 1px 2px rgba(0,0,0,0.04)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={
                "inline-block whitespace-nowrap rounded-full border font-semibold uppercase tracking-wider " +
                (isMobile
                  ? "px-2 py-[3px] font-mono text-[8.5px]"
                  : "px-2.5 py-1 font-mono text-[10px]")
              }
            >
              {chip}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* CareerProgression — mobile-tightened */
function CareerProgression() {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3">
      {experience.progression.map((step, i) => {
        const isLast = i === experience.progression.length - 1;
        return (
          <div key={step.step} className="relative flex items-center gap-2.5 md:gap-3">
            {/* Step circle */}
            <div
              className={
                "relative flex h-7 w-7 md:h-8 md:w-8 flex-shrink-0 items-center justify-center rounded-full font-mono text-[10px] md:text-[11px] font-bold transition-colors " +
                (step.active
                  ? "bg-[#0a0a0a] text-white shadow-[0_0_0_4px_rgba(10,10,10,0.08)]"
                  : "border border-[#0a0a0a]/15 bg-white text-[#555]")
              }
            >
              {step.step}
              {step.active && (
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              )}
            </div>

            {/* Label + badge — stacks tightly */}
            <div className="flex-1 flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
              <span
                className={
                  "font-mono text-[11px] md:text-[11.5px] tracking-tight " +
                  (step.active ? "font-bold text-[#0a0a0a]" : "text-[#555]")
                }
              >
                {step.label}
              </span>
              {step.active && (
                <span className="rounded bg-[#0a0a0a] px-1.5 py-0.5 font-mono text-[8px] md:text-[8.5px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
                  now here
                </span>
              )}
            </div>

            {/* Icon */}
            <span
              className={
                "material-symbols-outlined flex-shrink-0 text-[15px] md:text-[16px] " +
                (step.active ? "text-[#0a0a0a]" : "text-[#bbb]")
              }
            >
              {step.icon}
            </span>

            {/* Connector */}
            {!isLast && (
              <span
                className="absolute left-3.5 md:left-4 top-7 h-2.5 w-[1.5px] bg-[#e0e0e0]"
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* TimelineItem — mobile-tuned card */
function TimelineItem({ item }: { item: any }) {
  const isActive = !!item.active;

  return (
    <RevealItem variants={fadeUp} className="relative group">
      {/* Timeline node — tighter on mobile */}
      <div
        className={
          "absolute -left-[30px] md:-left-[54px] top-5 md:top-6 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full ring-[3px] ring-white transition-all duration-300 " +
          (isActive
            ? "bg-[#0a0a0a] shadow-[0_0_0_6px_rgba(10,10,10,0.08)]"
            : "bg-[#d4d4d4] group-hover:bg-[#0a0a0a]")
        }
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        {isActive && (
          <span className="absolute h-4 w-4 md:h-5 md:w-5 rounded-full bg-[#0a0a0a] animate-ping opacity-30" />
        )}
      </div>

      {/* Card */}
      <div
        className={
          "rounded-2xl border bg-white p-4 md:p-7 transition-all duration-300 " +
          (isActive
            ? "border-[#0a0a0a]/30 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.15)]"
            : "border-[#0a0a0a]/8 active:border-[#0a0a0a]/25 hover:border-[#0a0a0a]/30")
        }
      >
        {/* Header */}
        <div className="flex flex-col gap-2.5 md:flex-row md:items-start md:justify-between pb-3.5 md:pb-4 mb-3.5 md:mb-4 border-b border-[#0a0a0a]/8">
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-[#888]">
              {item.period}
            </span>
            <h3
              className={
                "font-display font-bold tracking-tight leading-[1.2] md:leading-tight text-[#0a0a0a] " +
                (isActive
                  ? "text-[19px] md:text-[26px]"
                  : "text-[17px] md:text-[21px]")
              }
            >
              {item.title}
            </h3>
          </div>

          {item.badge ? (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0a0a0a] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {item.badge}
            </span>
          ) : item.meta ? (
            <span className="inline-flex w-fit items-center gap-1 rounded-full border border-[#0a0a0a]/10 bg-[#fafafa] px-2.5 py-1 font-mono text-[9.5px] font-medium uppercase tracking-wider text-[#666]">
              <span className="material-symbols-outlined text-[12px]">
                location_on
              </span>
              {item.meta}
            </span>
          ) : null}
        </div>

        {/* Body */}
        <p
          className={
            "font-body leading-relaxed text-[#444] " +
            (isActive
              ? "text-[13.5px] md:text-[15px]"
              : "text-[13px] md:text-[13.5px]")
          }
        >
          {item.body}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3.5 md:pt-4">
          {item.tags.map((t) => (
            <span
              key={t}
              className={
                "rounded-md border px-2 md:px-2.5 py-0.5 md:py-1 font-mono text-[9.5px] md:text-[10px] transition-colors " +
                (t === "AI Integration"
                  ? "border-[#0a0a0a] bg-[#0a0a0a] font-semibold text-white"
                  : "border-[#0a0a0a]/10 bg-white text-[#111] hover:border-[#0a0a0a]/30")
              }
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </RevealItem>
  );
}

/* ────────────────────────────────────────────── */
/* Main component */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative w-full bg-white text-[#0a0a0a] border-t border-[#0a0a0a]/10"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:gap-20 px-6 md:px-10 lg:px-16 py-16 md:py-32">

        {/* ═══════════ HEADER ═══════════ */}
        <div className="flex flex-col items-center text-center gap-4 md:gap-5">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest text-[#0a0a0a]/60">
                {experience.index}
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0a0a0a] opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="w-full">
            <div className="flex w-full flex-col items-center gap-2.5 md:flex-row md:flex-wrap md:justify-center md:gap-3">
              <h2 className="w-full font-display font-extrabold text-[25px] min-[360px]:text-[28px] min-[375px]:text-[30px] sm:text-[36px] md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.98] md:leading-[0.95] uppercase">
                {experience.headline}
              </h2>
              <span className="rounded-full bg-[#0a0a0a] px-3 py-1 md:px-3.5 md:py-1.5 font-mono text-[10px] md:text-[10.5px] uppercase font-bold tracking-wider text-white">
                {experience.badge}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-[#555] text-[14.5px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
              {experience.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0a0a0a]/10 bg-[#fafafa] px-3 py-1.5 md:px-3.5 md:py-1.5 font-mono text-[10px] md:text-[10.5px] uppercase tracking-wider text-[#555]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{experience.status}</span>
            </div>
          </Reveal>
        </div>

        {/* ═══════════ BODY GRID ═══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 flex flex-col gap-5 md:gap-6">

            {/* Currently exploring */}
            <Reveal className="rounded-2xl border border-[#0a0a0a]/8 bg-[#fafafa] p-5 md:p-6 flex flex-col gap-4 md:gap-5">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#0a0a0a]/8">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[19px] md:text-[20px] text-[#0a0a0a] flex-shrink-0">
                    psychology
                  </span>
                  <span className="font-mono text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-wider text-[#0a0a0a] truncate">
                    {experience.exploring.title}
                  </span>
                </div>
                <span className="rounded-full bg-[#0a0a0a] px-2 py-0.5 font-mono text-[8.5px] md:text-[9px] uppercase font-bold tracking-wider text-white whitespace-nowrap">
                  {experience.exploring.badge}
                </span>
              </div>

              <ExploringNucleus />

              <p className="font-body text-[12px] md:text-[12.5px] leading-relaxed text-[#555]">
                {experience.exploring.description}
              </p>
            </Reveal>

            {/* Career progression */}
            <Reveal className="rounded-2xl border border-[#0a0a0a]/8 bg-[#fafafa] p-5 md:p-6 flex flex-col gap-4 md:gap-5">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#0a0a0a]/8">
                <span className="font-mono text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                  Career Progression
                </span>
                <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider text-[#999]">
                  3 stages
                </span>
              </div>
              <CareerProgression />
            </Reveal>

            {/* Where I'm heading */}
            <Reveal className="rounded-2xl border border-[#0a0a0a]/8 bg-[#fafafa] p-5 md:p-6 flex flex-col gap-3.5 md:gap-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#0a0a0a]/8">
                <span className="material-symbols-outlined text-[17px] md:text-[18px] text-[#0a0a0a] flex-shrink-0">
                  explore
                </span>
                <span className="font-mono text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-wider text-[#0a0a0a]">
                  {experience.heading.title}
                </span>
              </div>
              <p className="font-body text-[12.5px] md:text-[13px] leading-relaxed text-[#444] italic">
                &ldquo;{experience.heading.quote}&rdquo;
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {experience.heading.pathway.map((p, i) => {
                  const isLast = i === experience.heading.pathway.length - 1;
                  return (
                    <span key={p} className="flex items-center gap-1.5">
                      <span
                        className={
                          "rounded px-2 md:px-2.5 py-0.5 md:py-1 font-mono text-[9.5px] md:text-[10.5px] tracking-tight " +
                          (isLast
                            ? "bg-[#0a0a0a] font-bold text-white"
                            : "border border-[#0a0a0a]/10 bg-white text-[#222]")
                        }
                      >
                        {p}
                      </span>
                      {!isLast && (
                        <span className="material-symbols-outlined text-[11px] md:text-[12px] text-[#bbb]">
                          arrow_forward
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN — TIMELINE ── */}
          <div ref={containerRef} className="lg:col-span-7 flex flex-col">
            <div className="relative flex flex-col gap-6 md:gap-8 pl-6 md:pl-12">
              {/* Base line */}
              <div className="absolute left-2 md:left-[18px] top-3 bottom-3 w-[2px] bg-[#e0e0e0]" />
              {/* Animated line */}
              <motion.div
                style={{ scaleY: lineScaleY, originY: 0 }}
                className="absolute left-2 md:left-[18px] top-3 bottom-3 w-[2px] bg-[#0a0a0a]"
              />

              <Reveal staggerChildren={0.12} className="relative flex flex-col gap-6 md:gap-8">
                {experience.timeline.map((item, i) => (
                  <TimelineItem key={item.title} item={item} index={i} />
                ))}
              </Reveal>
            </div>

            {/* Bottom note */}
            <Reveal className="flex items-center gap-3 mt-6 md:mt-8 pl-6 md:pl-12">
              <div className="h-[1px] flex-1 bg-[#0a0a0a]/10" />
              <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-widest text-[#888] whitespace-nowrap">
                {experience.timeline.length} positions · ongoing
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}