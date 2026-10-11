import { motion } from "motion/react";
import { education } from "@/data/education";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

export default function Education() {
  return (
    <section
      id="education"
      className="relative w-full bg-[#0a0a0a] text-white border-t border-white/10"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:gap-20 px-6 md:px-10 lg:px-16 py-16 md:py-32">

        {/* ═══════════ HEADER ═══════════ */}
        <div className="flex flex-col items-center text-center gap-4 md:gap-5">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest text-white/60">
                {education.index}
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="w-full">
            <h2 className="mx-auto w-full max-w-4xl font-display font-extrabold text-[20px] min-[360px]:text-[23px] sm:text-[36px] min-[900px]:text-6xl min-[1200px]:text-7xl tracking-[-0.03em] leading-[0.98] md:leading-[0.95] uppercase">
              {education.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-white/60 text-[14.5px] md:text-[17px] leading-relaxed max-w-2xl mx-auto">
              {education.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:px-3.5 md:py-1.5 font-mono text-[10px] md:text-[10.5px] uppercase tracking-wider text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>{education.status}</span>
            </div>
          </Reveal>
        </div>

        {/* ═══════════ DEGREE HERO ═══════════ */}
        <Reveal className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e] p-5 md:p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">

          {/* grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative flex flex-col gap-6 md:gap-8">

            {/* ── Top: icon + degree info ── */}
            <div className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-start lg:justify-between">

              <div className="flex items-start gap-3.5 md:gap-5 flex-1">
                {/* Icon — animated pulse ring */}
                <div className="relative flex h-12 w-12 md:h-16 md:w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
                  <motion.span
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-[22px] md:text-[30px]">
                      school
                    </span>
                  </motion.span>
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-[3px] ring-[#0e0e0e]" />
                </div>

                <div className="flex flex-col gap-2.5 md:gap-2 min-w-0">
                  {/* badges */}
                  <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                    <span className="rounded-full bg-white/10 px-2 md:px-2.5 py-0.5 font-mono text-[9px] md:text-[9.5px] font-bold uppercase tracking-wider text-white">
                      {education.degree.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 md:px-2.5 py-0.5 font-mono text-[9px] md:text-[9.5px] font-semibold uppercase tracking-wider text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {education.degree.progress}
                    </span>
                  </div>

                  <h3 className="font-display text-[20px] md:text-[30px] lg:text-[34px] font-bold leading-[1.15] md:leading-tight tracking-tight">
                    {education.degree.title}
                  </h3>

                  {/* university + faculty — stacks on mobile */}
                  <div className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-x-3 md:gap-y-1.5 font-body text-[12.5px] md:text-[13px]">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <span className="material-symbols-outlined text-[15px] text-white/50">
                        account_balance
                      </span>
                      {education.degree.university}
                    </span>
                    <span className="hidden md:inline text-white/20">•</span>
                    <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-wider text-white/40">
                      {education.degree.faculty}
                    </span>
                  </div>
                </div>
              </div>

              {/* location — top-right on desktop, inline on mobile */}
              <div className="flex items-center gap-2 self-start rounded-lg border border-white/10 bg-white/5 px-3 md:px-3.5 py-1.5 md:py-2 font-mono text-[10.5px] md:text-[11px] font-semibold text-white/80">
                <span className="material-symbols-outlined text-[14px] md:text-[15px] text-white/50">
                  location_on
                </span>
                <span>{education.degree.location}</span>
              </div>
            </div>

            {/* ── Progress timeline — animated ── */}
            <div className="pt-5 md:pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-white/40">
                  4-Year Program
                </span>
                <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-white/40">
                  2023 — 2027
                </span>
              </div>

              <div className="relative">
                {/* base line */}
                <div className="absolute top-[7px] left-0 right-0 h-[2px] bg-white/10" />

                {/* filled line — animates from 0 to 75% on reveal */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[7px] left-0 h-[2px] bg-white"
                />

                {/* year markers */}
                <div className="relative flex justify-between">
                  {["2023", "2024", "2025", "2026", "2027"].map((year, i) => {
                    const isPast = i < 3;
                    const isCurrent = i === 3;
                    return (
                      <div key={year} className="flex flex-col items-center gap-1.5 md:gap-2">
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.3 + i * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={
                            "relative flex h-4 w-4 items-center justify-center rounded-full ring-[3px] ring-[#0e0e0e] transition-colors " +
                            (isPast || isCurrent ? "bg-white" : "bg-white/15")
                          }
                        >
                          {isCurrent && (
                            <>
                              <span className="absolute h-4 w-4 rounded-full bg-white animate-ping opacity-40" />
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0e0e0e]" />
                            </>
                          )}
                        </motion.span>
                        <span
                          className={
                            "font-mono text-[9.5px] md:text-[10px] tracking-wider " +
                            (isCurrent
                              ? "font-bold text-white"
                              : isPast
                              ? "text-white/60"
                              : "text-white/30")
                          }
                        >
                          {year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══════════ COURSEWORK ═══════════ */}
        <div className="flex flex-col gap-5 md:gap-6">
          <Reveal className="flex items-center gap-2.5 md:gap-3">
            <span className="min-w-0 font-mono text-[10.5px] md:text-[11px] font-bold uppercase tracking-widest text-white">
              {education.coursework.title}
            </span>
            <span className="hidden md:block flex-1 h-[1px] bg-white/10" />
            <span className="hidden md:inline font-mono text-[10.5px] uppercase tracking-widest text-white/40">
              {education.coursework.meta}
            </span>
          </Reveal>

          <Reveal staggerChildren={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {education.coursework.items.map((item) => (
              <RevealItem
                key={item.title}
                variants={fadeUp}
                className="group relative flex items-start gap-3.5 md:gap-4 overflow-hidden rounded-xl border border-white/10 bg-[#0e0e0e] p-4 md:p-5 transition-all duration-300 hover:border-white/40 hover:-translate-y-0.5 active:border-white/30 active:bg-white/[0.03] md:hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)]"
              >
                <div className="flex h-10 w-10 md:h-11 md:w-11 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors group-hover:border-white/30 group-hover:bg-white/10">
                  <span className="material-symbols-outlined text-[18px] md:text-[20px] text-white/70 transition-colors group-hover:text-white">
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-display text-[14.5px] md:text-[16px] font-bold leading-tight text-white">
                    {item.title}
                  </span>
                  <span className="font-mono text-[10px] md:text-[10.5px] leading-relaxed text-white/45">
                    {item.sub}
                  </span>
                </div>

                {/* bottom accent */}
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
              </RevealItem>
            ))}
          </Reveal>
        </div>

        {/* ═══════════ HIGHLIGHT PANELS ═══════════ */}
        <Reveal staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {education.panels.map((p, i) => (
            <RevealItem
              key={p.title}
              variants={fadeUp}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 md:p-6 transition-colors hover:border-white/30 active:border-white/20"
            >
              {/* watermark — smaller on mobile */}
              <span className="pointer-events-none absolute -top-3 -right-1 md:-top-2 font-display font-extrabold text-[60px] md:text-[80px] leading-none text-white/[0.04] select-none">
                0{i + 1}
              </span>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                  <span className="material-symbols-outlined text-[17px] md:text-[18px] text-white">
                    {p.icon}
                  </span>
                </div>
                <span className="font-display text-[14.5px] md:text-[15px] font-bold tracking-tight text-white">
                  {p.title}
                </span>
              </div>
              <p className="font-body text-[12.5px] md:text-[13px] leading-relaxed text-white/60">
                {p.body}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        {/* ═══════════ FOOTER STRIP ═══════════ */}
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-5 md:pt-6 border-t border-white/10">
          <div className="flex items-center gap-2.5 font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            <span>{education.footer.verified}</span>
          </div>
          <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-white/40">
            {education.footer.affiliation}
          </span>
        </Reveal>

      </div>
    </section>
  );
}