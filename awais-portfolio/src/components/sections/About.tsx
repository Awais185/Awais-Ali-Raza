import { about } from "@/data/about";
import { site } from "@/data/site";
import Reveal, { RevealItem } from "@/components/ui/Reveal";
import { fadeUp } from "@/lib/motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#0a0a0a] text-white border-t border-white/10"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-16 md:py-32">

        {/* ── Label row ── simplified on mobile ── */}
        <Reveal className="flex items-center gap-2.5 md:gap-3 mb-8 md:mb-16">
          <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest text-white whitespace-nowrap">
            {about.index}
          </span>
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>

          {/* Status — hidden on narrow phones to avoid cramping */}
          <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-widest text-white/40 truncate">
            {about.status}
          </span>

          {/* Hairline + "About" — desktop only */}
          <span className="hidden md:block flex-1 h-[1px] bg-white/10" />
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-widest text-white/40">
            About
          </span>
        </Reveal>

        {/* ── Headline ── slightly smaller on mobile ── */}
        <Reveal className="max-w-5xl mb-10 md:mb-24">
          <h2 className="font-display font-extrabold text-[32px] md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.02] md:leading-[0.95]">
            {about.headline}
          </h2>
        </Reveal>

        {/* ── Body: portrait first on mobile, text first on desktop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 md:mb-32">

          {/* Portrait — order-first on mobile, right column on desktop */}
          <Reveal
            className="lg:col-span-5 lg:order-2 flex justify-center lg:justify-end"
            delay={0.1}
          >
            <div className="relative w-full max-w-[320px] md:max-w-[400px] lg:max-w-[440px]">
              {/* ambient glow — smaller on mobile */}
              <div className="absolute -inset-3 md:-inset-6 rounded-[24px] md:rounded-[32px] bg-gradient-to-b from-white/8 via-white/3 to-transparent blur-2xl opacity-70 pointer-events-none" />

              <div className="relative rounded-2xl border border-white/10 bg-[#0e0e0e] p-2.5 md:p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] group">
                {/* Square on mobile, 4:5 on desktop */}
                <div className="relative overflow-hidden rounded-xl aspect-square md:aspect-[4/5]">
                  <img
                    src={site.portraitAbout}
                    alt={site.name}
                    className="w-full h-full object-cover object-top grayscale contrast-110 transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                  {/* location chip */}
                  <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0a0a0a]/80 px-2.5 md:px-3 py-1 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider text-white/80">
                      {site.locationShort}
                    </span>
                  </div>

                  {/* corner index — hidden on smallest screens to avoid overlap */}
                  <div className="hidden sm:block absolute top-2.5 right-2.5 md:top-3 md:right-3 rounded bg-[#0a0a0a]/80 px-2 py-1 backdrop-blur-md border border-white/10 font-mono text-[9.5px] md:text-[10px] tracking-widest text-white/60">
                    /{about.index}
                  </div>
                </div>

                {/* bottom meta strip */}
                <div className="flex items-center justify-between px-2 pt-2.5 md:pt-3 pb-1">
                  <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-widest text-white/40 truncate">
                    {site.name}
                  </span>
                  <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-widest text-white/40">
                    AI // ENG
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text content */}
          <div className="lg:col-span-7 lg:order-1 flex flex-col gap-7 md:gap-8">
            <Reveal className="flex flex-col gap-4 md:gap-5">
              <p className="font-body text-white/80 text-[16px] md:text-[18px] leading-relaxed max-w-2xl">
                {site.description}
              </p>
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-white/60 text-[14.5px] md:text-[15.5px] leading-relaxed max-w-2xl"
                >
                  {p}
                </p>
              ))}
              <p className="font-mono text-white/35 text-[11px] md:text-[12px] uppercase tracking-wider mt-1 md:mt-2">
                {about.footnote}
              </p>
            </Reveal>

            {/* CTA buttons — full-width stack on mobile */}
            <Reveal className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 md:py-3 font-body text-[14px] font-semibold text-[#0a0a0a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Get In Touch
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </a>
              <a
                href={site.resume}
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 md:py-3 font-mono text-[11.5px] md:text-[12px] uppercase tracking-wider text-white transition-colors hover:bg-white/5 active:bg-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download Resume</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* ── Stats strip ── tighter on mobile ── */}
        <Reveal className="grid grid-cols-2 md:grid-cols-4 border-y border-white/10 mb-16 md:mb-32">
          {site.stats.map((s, i) => (
            <div
              key={i}
              className={
                "py-5 md:py-10 px-4 md:px-6 border-white/10 " +
                (i % 2 === 0 ? "border-r " : "") +
                (i < 2 ? "border-b md:border-b-0 " : "") +
                (i < 3 ? "md:border-r" : "")
              }
            >
              <div className="font-display font-extrabold text-[28px] md:text-4xl lg:text-5xl tracking-tight text-white leading-none mb-1.5 md:mb-2">
                {s.value}
              </div>
              <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-white/40 leading-tight">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>

        {/* ── Featured work ── */}
        <div>
          {/* section header */}
          <Reveal className="flex flex-col gap-3 mb-8 md:mb-14">
            <div className="flex items-center gap-2.5 md:gap-3">
              <span className="font-mono text-[10.5px] md:text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
                {about.featured.title}
              </span>
              <span className="hidden md:block flex-1 h-[1px] bg-white/10" />
              <span className="hidden md:inline font-mono text-[10px] uppercase tracking-widest text-white/40">
                {about.featured.meta}
              </span>
            </div>
            <p className="font-body text-[13.5px] md:text-[14px] text-white/60 leading-relaxed max-w-2xl">
              {about.featured.body}
            </p>
          </Reveal>

          <Reveal staggerChildren={0.05} className="flex flex-col gap-4 md:gap-5">
            {/* Flagship */}
            <RevealItem
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e] p-5 md:p-8 transition-colors hover:border-white/40 active:border-white/30"
            >
              <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 min-w-0">
                  <span className="font-display font-bold text-[20px] md:text-3xl tracking-tight text-white">
                    {about.flagship.name}
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[9.5px] md:text-[10px] uppercase font-bold tracking-wider text-[#0a0a0a]">
                    {about.flagship.badge}
                  </span>
                </div>
                <span className="material-symbols-outlined flex-shrink-0 text-[18px] md:text-[20px] text-white/40 group-hover:text-white transition-colors">
                  {about.flagship.icon}
                </span>
              </div>

              <p className="font-body text-[13.5px] md:text-[15px] text-white/70 leading-relaxed mb-4 md:mb-5">
                {about.flagship.body}
              </p>

              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {about.flagship.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 md:px-3 py-1 font-mono text-[10px] md:text-[10.5px] uppercase tracking-wider text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </RevealItem>

            {/* Mini projects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {about.miniProjects.map((p) => (
                <RevealItem
                  key={p.name}
                  variants={fadeUp}
                  className="group rounded-2xl border border-white/10 bg-[#0e0e0e] p-5 transition-colors hover:border-white/40 active:border-white/30"
                >
                  <div className="flex items-center justify-between gap-3 mb-2 md:mb-2.5">
                    <span className="font-display font-bold text-[16px] md:text-[17px] tracking-tight text-white">
                      {p.name}
                    </span>
                    <span className="material-symbols-outlined flex-shrink-0 text-[17px] md:text-[18px] text-white/40 group-hover:text-white transition-colors">
                      {p.icon}
                    </span>
                  </div>
                  <p className="font-body text-[12.5px] md:text-[13px] text-white/60 leading-relaxed mb-3">
                    {p.body}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-white/5 px-2 py-0.5 font-mono text-[9.5px] md:text-[10px] text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </RevealItem>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}