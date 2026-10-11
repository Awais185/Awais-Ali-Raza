import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ─────────────────────────────────────────── */
/* Chip — larger pill with optional status dot */
/* ─────────────────────────────────────────── */

type ChipTone = "dark" | "light" | "outline";
type DotColor = "white" | "emerald" | "amber" | "red" | "blue";

type ChipProps = {
  children: ReactNode;
  className?: string;
  dot?: boolean;
  dotColor?: DotColor;
  tone?: ChipTone;
  size?: "sm" | "md";
};

const chipTones: Record<ChipTone, string> = {
  dark: "bg-white/5 text-white/80 border border-white/10",
  light: "bg-[#0a0a0a]/5 text-[#0a0a0a]/80 border border-[#0a0a0a]/10",
  outline:
    "bg-transparent text-white/70 border border-white/15",
};

const dotColors: Record<DotColor, string> = {
  white: "bg-white",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
  blue: "bg-blue-400",
};

export function Chip({
  children,
  className,
  dot,
  dotColor = "white",
  tone = "dark",
  size = "md",
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-mono font-semibold uppercase tracking-wider whitespace-nowrap select-none",
        size === "sm"
          ? "gap-1 px-2 py-0.5 text-[9.5px] md:text-[10px]"
          : "gap-1.5 px-3 py-1 text-[10px] md:text-[10.5px]",
        chipTones[tone],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping",
              dotColors[dotColor]
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-1.5 w-1.5 rounded-full",
              dotColors[dotColor]
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────── */
/* Tag — compact inline label */
/* ─────────────────────────────────────────── */

type TagTone = "dark" | "light" | "outline";

type TagProps = {
  children: ReactNode;
  className?: string;
  tone?: TagTone;
};

const tagTones: Record<TagTone, string> = {
  dark: "bg-white/5 text-white/70",
  light: "bg-[#0a0a0a]/5 text-[#0a0a0a]/70",
  outline: "bg-transparent text-white/60 border border-white/10",
};

export function Tag({ children, className, tone = "dark" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-mono text-[9.5px] md:text-[10px] tracking-wide whitespace-nowrap select-none",
        "px-2 py-0.5",
        tagTones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}