import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Reveal from "./Reveal";

type Props = {
  index: string;
  headline: string;
  subtitle?: string;
  badge?: string;
  status?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function SectionHeader({
  index,
  headline,
  subtitle,
  badge,
  status,
  align = "left",
  dark = true,
  className,
  children,
}: Props) {
  const isCenter = align === "center";

  const muted = dark ? "text-white/60" : "text-[#666666]";
  const headlineColor = dark ? "text-white" : "text-[#0a0a0a]";
  const subtitleColor = dark ? "text-white/60" : "text-[#555555]";
  const dotColor = dark ? "bg-white" : "bg-[#0a0a0a]";
  const dotRing = dark ? "bg-white" : "bg-[#0a0a0a]";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-2.5 md:gap-3",
        isCenter && "items-center text-center",
        className
      )}
    >
      {/* ── Index row — centered when align=center ── */}
      <div
        className={cn(
          "flex items-center gap-2",
          isCenter && "justify-center"
        )}
      >
        <span
          className={cn(
            "font-mono text-[11px] md:text-[12px] font-medium uppercase tracking-widest whitespace-nowrap",
            muted
          )}
        >
          {index}
        </span>

        {/* Pulse dot — solid core + ping ring */}
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping",
              dotRing
            )}
          />
          <span
            className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dotColor)}
          />
        </span>
      </div>

      {/* ── Headline + badge ── */}
      {/* On mobile: stacked. On sm+: inline for left/center */}
      <div
        className={cn(
          "flex flex-col gap-2 md:flex-row md:items-center md:gap-3",
          isCenter && "items-center md:justify-center"
        )}
      >
        <h2
          className={cn(
            "font-display font-extrabold tracking-[-0.03em] uppercase leading-[0.98] md:leading-none",
            "text-[36px] md:text-5xl lg:text-6xl",
            headlineColor
          )}
        >
          {headline}
        </h2>

        {badge && (
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider whitespace-nowrap",
              dark
                ? "bg-white text-[#0a0a0a]"
                : "bg-[#0a0a0a] text-white"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {/* ── Subtitle ── */}
      {subtitle && (
        <p
          className={cn(
            "font-body text-[14.5px] md:text-[16px] leading-relaxed max-w-2xl",
            isCenter && "mx-auto",
            subtitleColor
          )}
        >
          {subtitle}
        </p>
      )}

      {/* ── Status pill — self-aligns when centered ── */}
      {status && (
        <div
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-wider",
            !isCenter && "self-start",
            dark
              ? "bg-white/5 border border-white/10 text-white/70"
              : "bg-[#f4f4f4] border border-[#e5e5e5] text-[#555555]"
          )}
        >
          {/* Emerald status dot with proper pulse */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>{status}</span>
        </div>
      )}

      {children}
    </Reveal>
  );
}