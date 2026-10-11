import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "technical";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
} & ComponentPropsWithoutRef<"a">;

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-[#0a0a0a] border border-transparent " +
    "hover:bg-white/90 hover:scale-[1.02] " +
    "active:scale-[0.98] active:bg-white/85",
  ghost:
    "bg-transparent text-white border border-white/20 " +
    "hover:bg-white/10 hover:border-white/40 " +
    "active:bg-white/15 active:border-white/30 active:scale-[0.98]",
  technical:
    "bg-[#0a0a0a] text-white border border-white/20 " +
    "hover:border-white/60 hover:bg-[#111] " +
    "active:border-white/40 active:bg-[#1a1a1a] active:scale-[0.98]",
};

export default function Button({
  variant = "primary",
  children,
  className,
  icon,
  iconRight,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <a
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full",
        "px-5 py-3 md:py-2.5",
        "font-body text-[13.5px] md:text-[14px] font-medium",
        "transition-all duration-200 select-none",
        fullWidth && "w-full sm:w-auto",
        variants[variant],
        className
      )}
    >
      {icon && (
        <span className="flex-shrink-0 inline-flex items-center" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {iconRight && (
        <span className="flex-shrink-0 inline-flex items-center" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </a>
  );
}