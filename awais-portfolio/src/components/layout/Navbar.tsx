import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useMotionValueEvent } from "motion/react";
import useScrollSpy from "@/hooks/useScrollSpy";
import { navLinks } from "@/data/nav";
import { site } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(navLinks.map((l) => l.id));
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  const onDark = !scrolled;

  return (
    <motion.header
      className={
        "fixed inset-x-0 top-0 z-50 w-full overflow-x-clip transition-colors duration-300 " +
        (scrolled || open
          ? "bg-white/70 backdrop-blur-2xl border-b border-[#0a0a0a]/8"
          : "bg-transparent border-b border-transparent")
      }
    >
      <motion.div
        initial={false}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 h-[1px] w-full origin-left bg-gradient-to-r from-transparent via-[#0a0a0a]/30 to-transparent"
      />

      <nav className="mx-auto flex h-[64px] w-full max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-10">
        {/* ── Logo ── */}
        <a href="#hero" className="group flex items-center gap-2.5 md:gap-3">
          <LogoMark onDark={onDark} />
          <div className="flex flex-col text-left leading-tight">
            <span
              className={
                "font-display text-[16px] font-extrabold tracking-tight transition-colors duration-300 md:text-[19px] " +
                (onDark ? "text-white" : "text-[#0a0a0a]")
              }
            >
              <span className="md:hidden">{site.shortName}</span>
              <span className="hidden md:inline">{site.name}</span>
            </span>
            <span
              className={
                "hidden items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 md:flex " +
                (onDark ? "text-white/60" : "text-[#777777]")
              }
            >
              <StatusDot />
              {site.role}
            </span>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-8">
          <ul
            className={
              "flex items-center gap-1 rounded-full border p-1 backdrop-blur transition-colors duration-300 " +
              (onDark
                ? "border-white/15 bg-white/5"
                : "border-[#0a0a0a]/8 bg-white/50")
            }
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  href={"#" + link.id}
                  label={link.label}
                  active={active === link.id}
                  onDark={onDark}
                />
              </li>
            ))}
          </ul>

          <MagneticCTA href="#contact" onDark={onDark} />
        </div>

        {/* ── Mobile toggle — no negative margin ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={
            "relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 active:bg-white/10 lg:hidden " +
            (onDark ? "text-white" : "text-[#0a0a0a]")
          }
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-3 w-5">
            <motion.span
              animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={
                "absolute left-0 top-0 h-[1.5px] w-5 transition-colors duration-300 " +
                (onDark ? "bg-white" : "bg-[#0a0a0a]")
              }
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={
                "absolute left-0 top-1.5 h-[1.5px] w-5 transition-colors duration-300 " +
                (onDark ? "bg-white" : "bg-[#0a0a0a]")
              }
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className={
                "absolute left-0 top-3 h-[1.5px] w-5 transition-colors duration-300 " +
                (onDark ? "bg-white" : "bg-[#0a0a0a]")
              }
            />
          </span>
        </button>
      </nav>

      {/* ══════════ Mobile menu — full drawer ══════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-[#0a0a0a]/50 backdrop-blur-md lg:hidden"
            />

            {/* Drawer — explicit left/right instead of inset-x + mx */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-4 right-4 top-[64px] z-50 rounded-2xl border border-[#0a0a0a]/8 bg-white p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] lg:hidden"
            >
              <ul className="flex flex-col gap-0.5">
                {navLinks.map((link, i) => {
                  const isActive = active === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 + i * 0.05,
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <a
                        href={"#" + link.id}
                        onClick={() => setOpen(false)}
                        className={
                          "group flex items-center justify-between rounded-xl px-4 py-3.5 font-body text-[15px] font-medium transition-all duration-200 active:scale-[0.98] " +
                          (isActive
                            ? "bg-[#0a0a0a] text-white"
                            : "text-[#0a0a0a]/80 hover:bg-[#f4f4f4] hover:text-[#0a0a0a] active:bg-[#eaeaea]")
                        }
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={
                              "font-mono text-[10.5px] tracking-widest " +
                              (isActive ? "text-white/60" : "text-[#0a0a0a]/30")
                            }
                          >
                            0{i + 1}
                          </span>
                          <span>{link.label}</span>
                        </span>
                        <span
                          className={
                            "material-symbols-outlined text-[18px] transition-all duration-200 " +
                            (isActive
                              ? "text-white/70"
                              : "text-[#0a0a0a]/30 group-hover:translate-x-0.5 group-hover:text-[#0a0a0a]/60")
                          }
                        >
                          arrow_outward
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Divider */}
              <div className="my-2 h-[1px] bg-[#0a0a0a]/8" />

              {/* Primary CTA */}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06 + navLinks.length * 0.05,
                  duration: 0.35,
                }}
                className="flex items-center justify-between rounded-xl bg-[#0a0a0a] px-4 py-3.5 transition-transform duration-200 active:scale-[0.98]"
              >
                <div className="flex flex-col text-left leading-tight">
                  <span className="font-body text-[15px] font-semibold text-white">
                    Get in touch
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    {site.email}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-white">
                  arrow_forward
                </span>
              </motion.a>

              {/* Footer inside menu — status */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.06 + (navLinks.length + 1) * 0.05 }}
                className="mt-2 flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <StatusDot />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0a0a0a]/50">
                    Available
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#0a0a0a]/30">
                  {site.locationShort}
                </span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function LogoMark({ onDark }) {
  return (
    <motion.div
      whileHover={{ rotate: 90 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={
        "relative flex h-8 w-8 items-center justify-center rounded-lg border transition-colors duration-300 " +
        (onDark
          ? "border-white/20 bg-white text-[#0a0a0a]"
          : "border-[#0a0a0a]/15 bg-[#0a0a0a] text-white")
      }
    >
      <span className="font-display text-[14px] font-black leading-none">A</span>
      <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#0a0a0a] ring-2 ring-white" />
    </motion.div>
  );
}

function StatusDot() {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

function NavLink({ href, label, active, onDark }) {
  return (
    <a
      href={href}
      className={
        "relative block rounded-full px-4 py-1.5 font-body text-[14px] font-medium transition-colors " +
        (active
          ? onDark
            ? "text-white"
            : "text-[#0a0a0a]"
          : onDark
          ? "text-white/60 hover:text-white"
          : "text-[#0a0a0a]/60 hover:text-[#0a0a0a]")
      }
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className={
            "absolute inset-0 -z-10 rounded-full " +
            (onDark ? "bg-white/10" : "bg-[#0a0a0a]/6")
          }
        />
      )}
      <span className="relative">{label}</span>
    </a>
  );
}

function MagneticCTA({ href, onDark }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={
        "group flex items-center gap-2 rounded-full px-5 py-2 transition-colors duration-300 " +
        (onDark ? "bg-white text-[#0a0a0a]" : "bg-[#0a0a0a] text-white")
      }
    >
      <span className="font-body text-[14px] font-medium">Get in touch</span>
      <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5">
        arrow_forward
      </span>
    </motion.a>
  );
}