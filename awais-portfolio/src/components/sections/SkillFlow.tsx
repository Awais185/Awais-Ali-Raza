import { useEffect, useMemo, useRef } from "react";
import { skillFlow } from "@/data/skillFlow";
import useReducedMotion from "@/hooks/useReducedMotion";
import Reveal from "@/components/ui/Reveal";

type Chip = {
  el: HTMLDivElement;
  loop: "outer" | "inner";
  fraction: number;
  isHovered: boolean;
  scale: number;
  targetScale: number;
};

function buildRoundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  return (
    "M " + (x + r) + "," + y +
    " H " + (x + w - r) +
    " A " + r + "," + r + " 0 0 1 " + (x + w) + "," + (y + r) +
    " V " + (y + h - r) +
    " A " + r + "," + r + " 0 0 1 " + (x + w - r) + "," + (y + h) +
    " H " + (x + r) +
    " A " + r + "," + r + " 0 0 1 " + x + "," + (y + h - r) +
    " V " + (y + r) +
    " A " + r + "," + r + " 0 0 1 " + (x + r) + "," + y +
    " Z"
  );
}

export default function SkillFlow() {
  const prefersReduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<SVGRectElement>(null);
  const innerRef = useRef<SVGRectElement>(null);

  const outerItems = useMemo(() => skillFlow.outer, []);
  const innerItems = useMemo(() => skillFlow.inner, []);

  useEffect(() => {
    const stage = stageRef.current;
    const container = containerRef.current;
    const svg = stage?.querySelector("svg");
    const outerRect = outerRef.current;
    const innerRect = innerRef.current;
    if (!stage || !container || !svg || !outerRect || !innerRect) return;

    const svgNS = "http://www.w3.org/2000/svg";
    const outerPath = document.createElementNS(svgNS, "path") as SVGPathElement;
    const innerPath = document.createElementNS(svgNS, "path") as SVGPathElement;
    outerPath.setAttribute("fill", "none");
    innerPath.setAttribute("fill", "none");
    svg.append(outerPath, innerPath);

    let outerPerim = 0;
    let innerPerim = 0;
    const chips: Chip[] = [];

    container.innerHTML = "";

    const setupChip = (text: string, loop: "outer" | "inner", fraction: number) => {
      const el = document.createElement("div");
      // ── Responsive chip sizing: smaller on mobile, larger on desktop ──
      el.className =
        "absolute top-0 left-0 h-6 px-2 rounded-md text-[10px] " +
        "md:h-8 md:px-3.5 md:rounded-lg md:text-[12.5px] " +
        "font-mono font-semibold tracking-tight " +
        "bg-white text-black border border-black/10 shadow-[0_4px_14px_rgba(0,0,0,0.4)] " +
        "inline-flex items-center justify-center whitespace-nowrap " +
        "pointer-events-auto cursor-default select-none z-10 " +
        "transition-[border-color,box-shadow,opacity] duration-200 will-change-transform";
      el.textContent = text;
      el.style.opacity = "0";
      container.appendChild(el);

      const chip: Chip = {
        el,
        loop,
        fraction,
        isHovered: false,
        scale: 1,
        targetScale: 1,
      };

      // Hover — desktop only
      el.addEventListener("mouseenter", () => {
        chip.isHovered = true;
        chip.targetScale = 1.08;
        el.style.zIndex = "50";
        el.style.borderColor = "#000";
        el.style.boxShadow = "0 0 24px rgba(255,255,255,0.5), 0 10px 30px rgba(0,0,0,0.7)";
      });
      el.addEventListener("mouseleave", () => {
        chip.isHovered = false;
        chip.targetScale = 1;
        el.style.zIndex = "10";
        el.style.borderColor = "rgba(0,0,0,0.1)";
        el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.4)";
      });

      // Tap — mobile feedback (brief highlight, no motion pause)
      el.addEventListener("touchstart", () => {
        chip.targetScale = 1.12;
        el.style.zIndex = "50";
        el.style.borderColor = "#000";
        el.style.boxShadow = "0 0 20px rgba(255,255,255,0.45), 0 8px 24px rgba(0,0,0,0.6)";
      }, { passive: true });

      el.addEventListener("touchend", () => {
        chip.targetScale = 1;
        el.style.zIndex = "10";
        el.style.borderColor = "rgba(0,0,0,0.1)";
        el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.4)";
      }, { passive: true });

      chips.push(chip);
    };

    outerItems.forEach((t, i) => setupChip(t, "outer", i / outerItems.length));
    innerItems.forEach((t, i) => setupChip(t, "inner", i / innerItems.length));

    const updateGeometry = () => {
      const stageW = stage.clientWidth;
      const stageH = stage.clientHeight || 200;

      const ox = 4,
        oy = 4,
        ow = Math.max(100, stageW - 8),
        oh = Math.max(80, stageH - 8),
        or = Math.min(40, Math.min(ow / 4, oh / 4));

      outerRect.setAttribute("x", String(ox));
      outerRect.setAttribute("y", String(oy));
      outerRect.setAttribute("width", String(ow));
      outerRect.setAttribute("height", String(oh));
      outerRect.setAttribute("rx", String(or));
      outerRect.setAttribute("ry", String(or));

      // ── Responsive inner inset: shrinks on narrow screens ──
      // On a 320px stage → inset ~22px; on desktop → 36px
      const INSET = Math.max(20, Math.min(36, Math.round(stageW * 0.075)));

      const ix = ox + INSET,
        iy = oy + INSET,
        iw = Math.max(60, ow - INSET * 2),
        ih = Math.max(40, oh - INSET * 2),
        ir = Math.min(28, Math.min(iw / 4, ih / 4));

      innerRect.setAttribute("x", String(ix));
      innerRect.setAttribute("y", String(iy));
      innerRect.setAttribute("width", String(iw));
      innerRect.setAttribute("height", String(ih));
      innerRect.setAttribute("rx", String(ir));
      innerRect.setAttribute("ry", String(ir));

      outerPath.setAttribute("d", buildRoundedRectPath(ox, oy, ow, oh, or));
      outerPerim = outerPath.getTotalLength();

      innerPath.setAttribute("d", buildRoundedRectPath(ix, iy, iw, ih, ir));
      innerPerim = innerPath.getTotalLength();
    };

    updateGeometry();
    const ro = new ResizeObserver(updateGeometry);
    ro.observe(stage);

    const outerSpeed = 40;
    const innerSpeed = 28;

    let isVisible = true;
    let lastTime = performance.now();
    let animFrameId: number | null = null;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            lastTime = performance.now();
            if (!animFrameId) animFrameId = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.05 }
    );
    io.observe(stage);

    const entranceTimer = setTimeout(() => {
      chips.forEach((chip, i) => {
        setTimeout(() => {
          chip.el.style.opacity = "1";
        }, i * 45);
      });
    }, 150);

    const tick = (now: number) => {
      animFrameId = null;
      if (!isVisible) return;
      const dt = Math.min(0.08, (now - lastTime) / 1000);
      lastTime = now;

      if (outerPerim > 0 && innerPerim > 0) {
        const stageW = stage.clientWidth;
        const stageH = stage.clientHeight;
        const outerDeltaFrac = prefersReduced ? 0 : (outerSpeed * dt) / outerPerim;
        const innerDeltaFrac = prefersReduced ? 0 : (innerSpeed * dt) / innerPerim;

        chips.forEach((chip) => {
          if (!chip.isHovered) {
            const delta = chip.loop === "outer" ? outerDeltaFrac : innerDeltaFrac;
            chip.fraction = (chip.fraction + delta) % 1;
          }
          chip.scale += (chip.targetScale - chip.scale) * 0.18;
          const path = chip.loop === "outer" ? outerPath : innerPath;
          const perim = chip.loop === "outer" ? outerPerim : innerPerim;
          const point = path.getPointAtLength(chip.fraction * perim);
          const halfWidth = chip.el.offsetWidth / 2;
          const halfHeight = chip.el.offsetHeight / 2;
          const x = Math.max(halfWidth + 2, Math.min(stageW - halfWidth - 2, point.x));
          const y = Math.max(halfHeight + 2, Math.min(stageH - halfHeight - 2, point.y));
          chip.el.style.transform =
            "translate3d(" + x + "px," + y + "px,0) translate(-50%,-50%) scale(" +
            chip.scale + ")";
        });
      }
      animFrameId = requestAnimationFrame(tick);
    };
    animFrameId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(entranceTimer);
      ro.disconnect();
      io.disconnect();
      outerPath.remove();
      innerPath.remove();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [outerItems, innerItems, prefersReduced]);

  return (
    <section
      id="skill-flow"
      className="relative w-full bg-[#0a0a0a] text-white border-t border-white/10"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-16 pt-12 md:pt-16 pb-16 md:pb-24">

        {/* ══════════ Header ══════════ */}
        <div className="flex flex-col items-center text-center gap-3 md:gap-4 mb-8 md:mb-14">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10.5px] md:text-[11px] uppercase tracking-widest text-white/70">
                {skillFlow.index}
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-display font-extrabold text-[22px] md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.1] md:leading-[1.05] uppercase max-w-3xl">
              {skillFlow.headline}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-body text-white/60 text-[13.5px] md:text-[15.5px] leading-relaxed max-w-xl mx-auto">
              {skillFlow.subtitle}
            </p>
          </Reveal>
        </div>

        {/* ══════════ Stage ══════════ */}
        <Reveal delay={0.15}>
          <div
            ref={stageRef}
            className="relative w-full h-[140px] md:h-[200px] select-none"
          >
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* ── Initial rects sized for mobile-friendly first paint ── */}
              {/* JS updates these immediately on mount via updateGeometry() */}
              <rect
                ref={outerRef}
                fill="none"
                x="4"
                y="4"
                width="340"
                height="132"
                rx="36"
                ry="36"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
              />
              <rect
                ref={innerRef}
                fill="none"
                x="26"
                y="26"
                width="296"
                height="88"
                rx="24"
                ry="24"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
              />
            </svg>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="flex flex-col items-center gap-1 md:gap-1.5 px-4">
                <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.25em] text-white/30">
                  runtime
                </span>
                <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-widest text-white/55 text-center">
                  Full Stack Technologies
                </span>
              </div>
            </div>

            <div ref={containerRef} className="absolute inset-0 pointer-events-none" />
          </div>
        </Reveal>

        {/* ══════════ Screen-reader skills list ══════════ */}
        <div className="sr-only">
          <h3>Full stack technologies</h3>
          <ul>
            {[...skillFlow.outer, ...skillFlow.inner].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* ══════════ Bottom caption ══════════ */}
        <Reveal className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center md:gap-3 mt-8 md:mt-14 pt-5 border-t border-white/10">
          <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-white/40 text-center md:text-left">
            {skillFlow.outer.length + skillFlow.inner.length} technologies in runtime loop
          </span>
          <span className="font-mono text-[10px] md:text-[10.5px] uppercase tracking-widest text-white/40 text-center md:text-right">
            Outer · Inner · Synchronized
          </span>
        </Reveal>

      </div>
    </section>
  );
}