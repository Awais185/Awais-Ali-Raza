import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { site } from "@/data/site";
import { EASE } from "@/lib/motion";

const tiles = [
  { icon: "code", label: "Software development", pos: "top-[16%] left-[6%] md:top-[24%] md:left-[8%] lg:left-[12%]", rot: -10, delay: 0.5, driftX: 8, driftY: 10, duration: 5.2, mobileSize: "flex h-12 w-12 md:h-20 md:w-20" },
  { icon: "smart_toy", label: "Artificial intelligence", pos: "top-[14%] right-[6%] md:top-[20%] md:right-[8%] lg:right-[12%]", rot: 10, delay: 0.9, driftX: 10, driftY: 8, duration: 5.8, mobileSize: "flex h-12 w-12 md:h-20 md:w-20" },
  { icon: "model_training", label: "Machine learning", pos: "top-[42%] left-[4%] md:top-[52%] md:left-[7%] lg:left-[10%]", rot: -7, delay: 1.3, driftX: 7, driftY: 11, duration: 6.1, mobileSize: "hidden sm:flex h-12 w-12 md:h-20 md:w-20" },
  { icon: "database", label: "Data engineering", pos: "top-[40%] right-[4%] md:top-[48%] md:right-[7%] lg:right-[10%]", rot: 7, delay: 1.7, driftX: 9, driftY: 8, duration: 5.5, mobileSize: "hidden sm:flex h-12 w-12 md:h-20 md:w-20" },
];

export default function Hero() {
  const [displayName, setDisplayName] = useState<string>(site.shortName);
  const displayNameRef = useRef<string>(site.shortName);
  const nameTimeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(nameTimeout.current), []);

  function transitionName(target: string) {
    window.clearTimeout(nameTimeout.current);

    const step = () => {
      const current = displayNameRef.current;
      let sharedLength = 0;
      while (
        sharedLength < current.length &&
        sharedLength < target.length &&
        current[sharedLength] === target[sharedLength]
      ) {
        sharedLength += 1;
      }

      const next =
        current.length > sharedLength
          ? current.slice(0, -1)
          : target.slice(0, Math.min(current.length + 1, target.length));

      if (next === current) return;
      displayNameRef.current = next;
      setDisplayName(next);
      if (next !== target) nameTimeout.current = window.setTimeout(step, 48);
    };

    nameTimeout.current = window.setTimeout(step, 48);
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden bg-white text-[#0a0a0a] select-none"
    >
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pt-20 pb-6 md:px-10 md:pt-24 md:pb-8 lg:px-16">

        {/* ══════════ Wordmark ══════════ */}
        <div className="pointer-events-none absolute inset-x-0 top-[8vh] md:top-[10vh] flex justify-center z-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            onHoverStart={() => transitionName("ALI RAZA")}
            onHoverEnd={() => transitionName(site.shortName)}
            onTap={() => transitionName(displayName === site.shortName ? "ALI RAZA" : site.shortName)}
            className="pointer-events-auto cursor-default text-center font-display font-extrabold leading-[0.85] tracking-[-0.055em] text-[clamp(52px,14vw,140px)] md:text-[clamp(48px,9vw,140px)]"
          >
            {displayName}
          </motion.h1>
        </div>

        {/* ══════════ Floating tiles ══════════ */}
        <div className="pointer-events-none absolute inset-0 z-[5]">
          {tiles.map((tile) => (
            <motion.div
              key={tile.icon}
              initial={{ opacity: 0, scale: 0.7, rotate: tile.rot }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: tile.rot,
                x: [0, tile.driftX, -tile.driftX * 0.65, 0],
                y: [0, -tile.driftY, tile.driftY * 0.7, 0],
              }}
              whileHover={{ rotate: 0, scale: 1.08 }}
              whileTap={{ rotate: 0, scale: 1.12 }}
              transition={{
                opacity: { duration: 0.7, delay: tile.delay, ease: EASE },
                scale: { duration: 0.7, delay: tile.delay, ease: EASE },
                x: { duration: tile.duration, delay: tile.delay, repeat: Infinity, ease: "easeInOut" },
                y: { duration: tile.duration * 1.1, delay: tile.delay, repeat: Infinity, ease: "easeInOut" },
              }}
              className={
                "absolute " + tile.pos + " " + tile.mobileSize +
                " items-center justify-center rounded-xl md:rounded-2xl " +
                "bg-gradient-to-br from-[#2a2a2a] via-[#121212] to-[#050505] " +
                "border border-white/20 text-white pointer-events-auto " +
                "shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
              }
              role="img"
              aria-label={tile.label}
            >
              <div className="absolute inset-x-2 top-1 md:inset-x-3 md:top-1.5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[24px] md:text-[38px] leading-none"
              >
                {tile.icon}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ══════════ Portrait ══════════ */}
        <div className="relative z-20 mt-auto flex flex-1 items-end justify-center pt-[4vh] md:pt-[12vh] pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="relative flex flex-col items-center"
          >
            <motion.img
              src={site.portrait}
              alt={site.name}
              animate={{ y: [0, -5, 0, 5, 0] }}
              transition={{ duration: 5, delay: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-[320px] w-auto max-w-[80vw] object-contain grayscale contrast-110 sm:h-[380px] md:h-[500px] md:max-w-none"
            />
            <div className="mt-[-2px] h-2.5 w-40 md:h-3 md:w-64 rounded-full bg-black/25 blur-md" />
          </motion.div>
        </div>

        {/* ══════════ Prompt bar + meta ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="relative z-30 mt-5 md:mt-6 w-full"
        >
          {/* Meta row */}
          <div className="flex w-full flex-col items-center gap-2 pt-1 md:flex-row md:items-center md:justify-between md:pt-2">
            <div className="flex items-center gap-2 font-mono text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-wider text-[#0a0a0a]/70">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0a0a0a] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#0a0a0a]" />
              </span>
              <span className="font-semibold whitespace-nowrap">
                Based in {site.locationShort}
              </span>
            </div>

            <a
              href="#about"
              className="group flex items-center gap-1 font-mono text-[10px] md:text-[11px] lg:text-[12px] uppercase tracking-wider font-semibold text-[#0a0a0a]/70 hover:text-[#0a0a0a] hover:underline underline-offset-4 transition-colors"
            >
              <span>Scroll</span>
              <span className="material-symbols-outlined text-[14px] md:text-[16px] transition-transform group-hover:translate-y-0.5">
                arrow_downward
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}