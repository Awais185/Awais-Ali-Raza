import { motion } from "motion/react";
import { skills } from "@/data/skills";
import Reveal from "@/components/ui/Reveal";

const RING_BOX = {
  small:  "clamp(220px, 60vw, 280px)",
  medium: "clamp(340px, 58vw, 440px)",
  large:  "clamp(540px, 52vw, 600px)",
};

const RING_VISIBILITY = {
  small:  "block",
  medium: "hidden md:block",
  large:  "hidden lg:block",
};

const CHIP_STYLE = {
  small:  "text-[9px] px-2 py-0.5 md:text-[10px] md:px-2.5 md:py-1",
  medium: "text-[10px] px-2.5 py-0.5 md:text-[10.5px] md:px-3 md:py-1",
  large:  "text-[10.5px] px-2.5 py-0.5 md:text-[11px] md:px-3 md:py-1.5",
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full bg-white text-[#0a0a0a] border-t border-[#0a0a0a]/10"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 pt-16 md:pt-32 pb-16 md:pb-20">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center gap-4 md:gap-5 mb-8 md:mb-14">
          <Reveal>
            <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest text-[#0a0a0a]/60">
              {skills.index}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display font-extrabold text-[36px] md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.98] md:leading-[0.95] uppercase">
              {skills.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-[#555] text-[14.5px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
              {skills.subtitle}
            </p>
          </Reveal>
        </div>

        {/* ── Orbit ── */}
        <Reveal className="relative mx-auto flex items-center justify-center overflow-x-clip h-[clamp(280px,72vw,680px)] md:h-[clamp(440px,58vw,680px)]">
          {/* Nucleus — smaller on mobile */}
          <div className="relative z-30 flex flex-col items-center gap-2 md:gap-3">
            <div className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-[#0a0a0a] text-white shadow-[0_0_40px_rgba(0,0,0,0.35)] md:shadow-[0_0_50px_rgba(0,0,0,0.35)]">
              <span className="font-display text-[20px] md:text-[26px] font-extrabold leading-none">
                AI
              </span>
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#666]">
              nucleus
            </span>
          </div>

          {/* Rings */}
          {skills.rings.map((ring) => (
            <div
              key={ring.size}
              className={
                "absolute rounded-full border border-[#0a0a0a]/12 " +
                (ring.size === "small"
                  ? "h-[clamp(160px,50vw,220px)] w-[clamp(160px,50vw,220px)] md:h-[clamp(220px,60vw,280px)] md:w-[clamp(220px,60vw,280px)] "
                  : "") +
                RING_VISIBILITY[ring.size]
              }
              style={
                ring.size === "small"
                  ? undefined
                  : {
                      width: RING_BOX[ring.size],
                      height: RING_BOX[ring.size],
                    }
              }
            >
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: ring.reverse ? -360 : 360 }}
                transition={{
                  duration: ring.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {ring.items.map((item, i) => {
                  const angle = (i / ring.items.length) * 360;

                  return (
                    <div
                      key={item}
                      className="absolute inset-0"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          animate={{ rotate: ring.reverse ? 360 : -360 }}
                          transition={{
                            duration: ring.duration,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <div style={{ transform: `rotate(${-angle}deg)` }}>
                            <div
                              className={
                                "rounded-full border border-[#0a0a0a]/15 bg-white " +
                                "font-mono uppercase tracking-wider text-[#0a0a0a] " +
                                "shadow-sm whitespace-nowrap " +
                                "transition-all duration-200 active:border-[#0a0a0a]/40 active:shadow-md active:scale-105 " +
                                CHIP_STYLE[ring.size]
                              }
                            >
                              {item}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </Reveal>

        {/* ── Caption — stacked on mobile ── */}
        <Reveal className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center md:gap-3 mt-8 md:mt-10 pt-5 md:pt-6 border-t border-[#0a0a0a]/10">
          <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-[#666] text-center md:text-left">
            {skills.rings.length} orbit layers
          </span>
          <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-[#666] text-center md:text-right">
            {skills.all.length} technologies
          </span>
        </Reveal>

      </div>
    </section>
  );
}