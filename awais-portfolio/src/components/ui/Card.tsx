import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  hover?: boolean;
  /** Padding scale — defaults to "md" */
  padding?: "sm" | "md" | "lg";
  /** Corner radius scale — defaults to "md" */
  radius?: "sm" | "md" | "lg";
};

export default function Card({
  children,
  className,
  tone = "dark",
  hover = true,
  padding = "md",
  radius = "md",
}: CardProps) {
  // Tone-specific styles — including their own hover borders
  const tones = {
    dark: {
      base: "bg-[#121212] border-[#222222] text-white",
      hover: "hover:border-white/40 active:border-white/30",
    },
    light: {
      base: "bg-[#f9f9f9] border-[#e5e5e5] text-[#0a0a0a]",
      hover: "hover:border-[#0a0a0a]/30 active:border-[#0a0a0a]/40",
    },
  };

  const paddings = {
    sm: "p-4 md:p-4",
    md: "p-5 md:p-5",
    lg: "p-5 md:p-7",
  };

  const radii = {
    sm: "rounded-lg",
    md: "rounded-xl md:rounded-xl",
    lg: "rounded-2xl",
  };

  return (
    <div
      className={cn(
        "border transition-all duration-200",
        radii[radius],
        paddings[padding],
        tones[tone].base,
        hover && tones[tone].hover,
        hover && "active:scale-[0.99]",
        className
      )}
    >
      {children}
    </div>
  );
}