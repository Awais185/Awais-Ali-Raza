import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  once?: boolean;
  staggerChildren?: number;
  /** How much of the element must be visible to trigger. Defaults to a safe small value. */
  amount?: number | "some" | "all";
  /** Offset from the viewport edge. Use "-10%" to trigger slightly earlier. */
  margin?: string;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  once = true,
  staggerChildren,
  amount = 0.1,
  margin = "0px 0px -60px 0px",
}: RevealProps) {
  const prefersReduced = useReducedMotion();
  const container = staggerChildren != null ? stagger(staggerChildren, delay) : undefined;

  // When user prefers reduced motion, skip the animation entirely
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin }}
      variants={container ?? variants}
      transition={!container ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}