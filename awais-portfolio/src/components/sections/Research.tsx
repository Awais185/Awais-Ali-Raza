import { motion } from "motion/react";
import { research } from "@/data/research";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

/* ═══════════════════════════════════════════
   COMPACT VISUALS — responsive sizing
   ═══════════════════════════════════════════ */

function CXRGraphic() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect x="10" y="10" width="300" height="160" rx="6" fill="none" stroke="rgba(255,255,255,0.15)" />

      <rect x="70" y="26" width="180" height="128" rx="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

      <line x1="160" y1="34" x2="160" y2="150" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />

      {[50, 72, 94, 116, 138].map((y, i) => (
        <path
          key={y}
          d={`M${110 - i * 3} ${y} Q160 ${y - 10} ${210 + i * 3} ${y}`}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.2"
        />
      ))}

      <ellipse cx="128" cy="100" rx="26" ry="38" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" />
      <ellipse cx="192" cy="100" rx="26" ry="38" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" />

      <motion.g
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="108" y="80" width="40" height="40" rx="3" fill="rgba(255,255,255,0.10)" />
        <rect x="108" y="80" width="40" height="40" rx="3" fill="none" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="128" y1="80" x2="128" y2="120" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
        <line x1="108" y1="100" x2="148" y2="100" stroke="#ffffff" strokeWidth="0.5" opacity="0.6" />
        <circle cx="128" cy="100" r="2.5" fill="#ffffff" />
      </motion.g>

      <motion.line
        x1="70" x2="250"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1"
        animate={{ y1: [26, 154, 26], y2: [26, 154, 26] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function FaceGraphic() {
  const landmarks: [number, number][] = [
    [160, 50], [140, 58], [180, 58], [150, 78], [170, 78],
    [160, 88], [160, 98], [155, 108], [165, 108], [160, 118],
    [135, 128], [160, 126], [185, 128], [145, 142], [175, 142],
    [160, 152], [150, 162], [170, 162],
  ];

  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect x="10" y="10" width="300" height="160" rx="6" fill="none" stroke="rgba(255,255,255,0.15)" />

      <ellipse cx="160" cy="100" rx="52" ry="68" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

      <path d="M130 78 Q142 73 152 78" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      <path d="M168 78 Q178 73 190 78" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />

      <polygon points="132,90 142,84 152,90 142,96" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <polygon points="168,90 178,84 188,90 178,96" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx="142" cy="90" r="2" fill="#ffffff" />
      <circle cx="178" cy="90" r="2" fill="#ffffff" />

      <polyline points="160,76 157,108 165,114 160,120" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" />

      <polygon points="142,138 160,132 178,138 160,148" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

      {[
        [[150, 78], [160, 88]],
        [[170, 78], [160, 88]],
        [[160, 88], [160, 98]],
        [[160, 98], [155, 108]],
        [[160, 98], [165, 108]],
        [[155, 108], [135, 128]],
        [[165, 108], [185, 128]],
        [[135, 128], [145, 142]],
        [[185, 128], [175, 142]],
      ].map(([a, b], i) => (
        <motion.line
          key={i}
          x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.8"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}

      {landmarks.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="1.5"
          fill="#ffffff"
          animate={{ opacity: [0.3, 1, 0.3], r: [1.2, 2, 1.2] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: (i % 6) * 0.18,
          }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   BENCHMARK CHIP — full-width on mobile
   ═══════════════════════════════════════════ */

function BenchChip({ b }: { b: any }) {
  const pct = Math.min(100, parseFloat(b.value));

  return (
    <div className="flex flex-col gap-1.5 md:gap-1">
      <div className="flex items-center justify-between text-[10px] md:text-[10.5px]">
        <span className="font-mono uppercase tracking-wider text-[#555] truncate pr-2">
          {b.name}
        </span>
        <span
          className={
            "font-mono font-bold flex-shrink-0 " +
            (b.primary ? "text-[#0a0a0a]" : "text-[#666]")
          }
        >
          {b.value}
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-[#0a0a0a]/8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={
            "h-full rounded-full " +
            (b.primary ? "bg-[#0a0a0a]" : "bg-[#0a0a0a]/35")
          }
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STUDY CARD — mobile-optimized
   ═══════════════════════════════════════════ */

function StudyCard({ study, idx }: { study: any; idx: number }) {
  const isDark = idx === 0;

  return (
    <Reveal
      className={
        "group relative flex flex-col overflow-hidden rounded-2xl border transition-colors " +
        (isDark
          ? "border-white/10 bg-[#0a0a0a] text-white"
          : "border-[#0a0a0a]/10 bg-white text-[#0a0a0a]")
      }
    >
      {/* ── Visual band ── */}
      <div
        className={
          "relative h-[140px] sm:h-[160px] md:h-[170px] w-full overflow-hidden border-b " +
          (isDark ? "border-white/10" : "border-[#0a0a0a]/8")
        }
      >
        {/* grid backdrop */}
        <div
          className={
            "absolute inset-0 " +
            (isDark ? "opacity-[0.15]" : "opacity-[0.25]")
          }
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,10,10,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* SVG graphic */}
        <div className="relative flex h-full items-center justify-center p-2.5 md:p-3">
          {idx === 0 ? <CXRGraphic /> : <FaceGraphic />}
        </div>

        {/* header strip */}
        <div
          className={
            "absolute inset-x-0 top-0 flex items-center justify-between gap-2 px-3 md:px-4 py-2 md:py-2.5 backdrop-blur-sm " +
            (isDark ? "bg-[#0a0a0a]/60" : "bg-white/60")
          }
        >
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span
              className={
                "font-mono text-[9px] md:text-[9.5px] uppercase tracking-widest truncate " +
                (isDark ? "text-white/70" : "text-[#666]")
              }
            >
              {study.visual.headerLeft}
            </span>
          </div>
          <span
            className={
              "hidden sm:inline font-mono text-[9px] uppercase tracking-widest whitespace-nowrap " +
              (isDark ? "text-white/40" : "text-[#999]")
            }
          >
            {study.visual.headerRight}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-4 md:gap-5 p-5 md:p-6">

        {/* eyebrow */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={
              "rounded-full px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-widest " +
              (isDark ? "bg-white text-[#0a0a0a]" : "bg-[#0a0a0a] text-white")
            }
          >
            {study.index}
          </span>
          <span
            className={
              "font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider " +
              (isDark ? "text-white/60" : "text-[#888]")
            }
          >
            {study.domain}
          </span>
        </div>

        {/* title */}
        <h3
          className={
            "font-display font-bold text-[18px] md:text-[22px] leading-[1.2] md:leading-[1.15] tracking-tight " +
            (isDark ? "text-white" : "text-[#0a0a0a]")
          }
        >
          {study.title}
        </h3>

        {/* highlights */}
        <ul className="flex flex-col gap-2">
          {study.highlights.map((h: any) => (
            <li
              key={h.label}
              className={
                "flex items-start gap-2.5 font-body text-[12.5px] md:text-[13px] leading-relaxed " +
                (isDark ? "text-white/70" : "text-[#555]")
              }
            >
              <span
                className={
                  "mt-[6px] h-1 w-1 flex-shrink-0 rounded-full " +
                  (h.highlight
                    ? "bg-emerald-400"
                    : isDark
                    ? "bg-white/40"
                    : "bg-[#0a0a0a]/40")
                }
              />
              <span>
                <strong className={isDark ? "text-white" : "text-[#0a0a0a]"}>
                  {h.label}:
                </strong>{" "}
                {h.body}
              </span>
            </li>
          ))}
        </ul>

        {/* benchmarks */}
        {study.benchmarks && (
          <div
            className={
              "flex flex-col gap-2.5 rounded-xl border p-3 md:p-3.5 " +
              (isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-[#0a0a0a]/8 bg-[#fafafa]")
            }
          >
            <span
              className={
                "font-mono text-[9px] font-bold uppercase tracking-widest " +
                (isDark ? "text-white/50" : "text-[#888]")
              }
            >
              Benchmarks // Accuracy
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-2.5">
              {study.benchmarks.map((b: any) => (
                <BenchChip key={b.name} b={b} />
              ))}
            </div>
          </div>
        )}

        {/* pipeline */}
        {study.pipeline && (
          <div
            className={
              "flex flex-col gap-2.5 rounded-xl border p-3 md:p-3.5 " +
              (isDark
                ? "border-white/10 bg-white/[0.03]"
                : "border-[#0a0a0a]/8 bg-[#fafafa]")
            }
          >
            <span
              className={
                "font-mono text-[9px] font-bold uppercase tracking-widest " +
                (isDark ? "text-white/50" : "text-[#888]")
              }
            >
              Fusion Pipeline
            </span>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
              {study.pipeline.map((step: any, i: number) => (
                <span key={step.label} className="flex items-center gap-1.5">
                  <span
                    className={
                      "rounded-md px-2 py-1 font-mono text-[9px] md:text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap " +
                      (step.primary
                        ? isDark
                          ? "bg-white text-[#0a0a0a]"
                          : "bg-[#0a0a0a] text-white"
                        : isDark
                        ? "border border-white/15 bg-white/[0.05] text-white/80"
                        : "border border-[#0a0a0a]/10 bg-white text-[#555]")
                    }
                  >
                    {step.label}
                  </span>
                  {i < study.pipeline.length - 1 && (
                    <span
                      className={
                        "material-symbols-outlined text-[11px] md:text-[12px] flex-shrink-0 " +
                        (isDark ? "text-white/25" : "text-[#0a0a0a]/25")
                      }
                    >
                      arrow_forward
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* scope note */}
        {study.disclaimer && (
          <div
            className={
              "flex items-start gap-2 rounded-lg px-3 py-2 font-mono text-[10px] md:text-[10.5px] leading-relaxed " +
              (isDark ? "bg-white/5 text-white/60" : "bg-[#f4f4f4] text-[#666]")
            }
          >
            <span className="material-symbols-outlined flex-shrink-0 text-[12px] md:text-[13px]">
              info
            </span>
            <span>{study.disclaimer}</span>
          </div>
        )}

        <div className="flex-1" />

        {/* footer — stacks on narrow screens */}
        <div
          className={
            "flex flex-col gap-3 pt-4 border-t sm:flex-row sm:items-center sm:justify-between " +
            (isDark ? "border-white/10" : "border-[#0a0a0a]/8")
          }
        >
          {study.paper?.url ? (
            <a
              href={study.paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "group/btn inline-flex items-center justify-center sm:justify-start gap-2 rounded-full px-4 py-3 sm:py-2 font-mono text-[10.5px] font-bold uppercase tracking-widest transition-colors active:scale-[0.98] " +
                (isDark
                  ? "bg-white text-[#0a0a0a] hover:bg-white/90"
                  : "bg-[#0a0a0a] text-white hover:bg-[#222]")
              }
            >
              {study.paper.label}
              <span className="material-symbols-outlined text-[13px] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                north_east
              </span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => window.alert("Publishing Soon")}
              className={
                "group/btn inline-flex items-center justify-center sm:justify-start gap-2 rounded-full px-4 py-3 sm:py-2 font-mono text-[10.5px] font-bold uppercase tracking-widest transition-colors active:scale-[0.98] " +
                (isDark
                  ? "bg-white text-[#0a0a0a] hover:bg-white/90"
                  : "bg-[#0a0a0a] text-white hover:bg-[#222]")
              }
            >
              {study.paper?.label ?? "Read Paper"}
              <span className="material-symbols-outlined text-[13px]">
                schedule
              </span>
            </button>
          )}

          <span
            className={
              "font-mono text-[9.5px] md:text-[10px] uppercase tracking-widest text-center sm:text-right " +
              (isDark ? "text-white/40" : "text-[#999]")
            }
          >
            {study.visual.footerRight}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function Research() {
  return (
    <section
      id="research"
      className="relative w-full bg-white text-[#0a0a0a] border-t border-[#0a0a0a]/10"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:gap-20 px-5 md:px-10 lg:px-16 py-16 md:py-32">

        {/* ═══════════ HEADER ═══════════ */}
        <div className="flex flex-col items-center text-center gap-4 md:gap-5">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest text-[#0a0a0a]/60">
                {research.index}
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0a0a0a] opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="w-full">
            <h2 className="w-full font-display font-extrabold text-[28px] min-[360px]:text-[32px] min-[400px]:text-[36px] md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.98] md:leading-[0.95] uppercase">
              {research.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-[#555] text-[14.5px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
              {research.subtitle}
            </p>
          </Reveal>
        </div>

        {/* ═══════════ CARDS ═══════════ */}
        <Reveal staggerChildren={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {research.studies.map((study, idx) => (
            <RevealItem key={study.title} variants={fadeUp}>
              <StudyCard study={study} idx={idx} />
            </RevealItem>
          ))}
        </Reveal>

        {/* ═══════════ FOOTER STRIP ═══════════ */}
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-5 md:pt-6 border-t border-[#0a0a0a]/10">
          <span className="text-center md:text-left font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-[#888]">
            {research.studies.length} studies · {research.status.toLowerCase()}
          </span>
          <a
            href="#contact"
            className="group flex items-center justify-center md:justify-start gap-2 font-mono text-[10.5px] uppercase tracking-widest text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors"
          >
            Discuss research
            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </a>
        </Reveal>

      </div>
    </section>
  );
}