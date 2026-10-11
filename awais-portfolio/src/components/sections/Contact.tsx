import { useState } from "react";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import { saveMessage } from "@/lib/messages";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent";

const SOCIAL_ICONS: Record<string, string> = {
  LinkedIn: "work",
  GitHub: "code",
  HuggingFace: "neurology",
  Email: "mail",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const isValid =
    form.name.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.message.trim().length > 0;

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || status === "sending") return;

    setStatus("sending");

    saveMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    const subject = encodeURIComponent(`Portfolio inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `Hi Awais,\n\n${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    }, 400);
  }

  const buttonLabel =
    status === "sent"
      ? "Message Sent ✓"
      : status === "sending"
      ? "Sending..."
      : "Send Message";

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#0a0a0a] text-white border-t border-white/10"
    >
      {/* Ghost wordmark — dimmer on mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
      >
        <span
          className="block text-center font-display text-[22vw] font-extrabold uppercase leading-none tracking-tight text-white/[0.06] md:text-[16vw] md:text-white/10 lg:text-[180px]"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.08)",
          }}
        >
          AWAIS
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-16 py-16 md:py-32">

        {/* ═══════════ HEADER ═══════════ */}
        <Reveal className="flex flex-col gap-4 md:gap-5 mb-10 md:mb-16">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-widest text-white/60">
              {contact.index}
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          </div>

          <h2 className="font-display font-extrabold text-[36px] md:text-6xl uppercase tracking-[-0.02em] leading-[0.98] md:leading-none max-w-3xl">
            {contact.headline}
          </h2>

          {/* CTA buttons — full-width stack on mobile */}
          <div className="mt-2 md:mt-4 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4">
            <a
              href={"mailto:" + site.email}
              className="group flex items-center justify-center sm:justify-start gap-2.5 rounded-full bg-white px-4 py-3.5 md:py-2.5 font-body text-[13.5px] md:text-[14px] font-semibold text-[#0a0a0a] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[17px] md:text-[18px]">
                mail
              </span>
              <span className="truncate max-w-full">{site.email}</span>
            </a>

            <a
              href="/Awais-Ali-Raza-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-3.5 md:py-2.5 font-mono text-[11.5px] md:text-[12px] uppercase tracking-wider text-white transition-colors hover:border-white/50 hover:bg-white/10 active:bg-white/15"
            >
              <span className="material-symbols-outlined text-[16px]">
                download
              </span>
              <span>Download Resume</span>
            </a>
          </div>
        </Reveal>

        {/* ═══════════ BODY GRID ═══════════ */}
        <div className="grid grid-cols-1 gap-10 md:gap-12 border-t border-white/10 pt-10 md:pt-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Form ── */}
          <Reveal className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10.5px] md:text-[11px] font-bold uppercase tracking-wider text-white/60 truncate">
                {contact.form.title}
              </span>
              <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider text-white/40 whitespace-nowrap">
                {status === "sent"
                  ? "DELIVERED"
                  : status === "sending"
                  ? "TRANSMITTING"
                  : "READY"}
              </span>
            </div>

            <form className="flex flex-col gap-2.5 md:gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="YOUR NAME"
                disabled={status === "sending"}
                autoComplete="name"
                className="w-full rounded-lg border border-white/20 bg-[#0a0a0a]/60 px-3.5 py-3.5 md:py-3 text-[15px] md:text-[14px] text-white backdrop-blur-md transition-colors placeholder:text-white/40 focus:border-white focus:outline-none disabled:opacity-60"
              />

              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="YOUR EMAIL"
                disabled={status === "sending"}
                autoComplete="email"
                inputMode="email"
                className="w-full rounded-lg border border-white/20 bg-[#0a0a0a]/60 px-3.5 py-3.5 md:py-3 text-[15px] md:text-[14px] text-white backdrop-blur-md transition-colors placeholder:text-white/40 focus:border-white focus:outline-none disabled:opacity-60"
              />

              <textarea
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="PROJECT SCOPE / MESSAGE"
                disabled={status === "sending"}
                rows={4}
                className="w-full resize-none rounded-lg border border-white/20 bg-[#0a0a0a]/60 px-3.5 py-3.5 md:py-3 text-[15px] md:text-[14px] text-white backdrop-blur-md transition-colors placeholder:text-white/40 focus:border-white focus:outline-none disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!isValid || status === "sending"}
                className={
                  "mt-1 w-full rounded-lg py-4 md:py-3 font-mono text-[12px] font-bold uppercase tracking-wider transition-colors active:scale-[0.99] " +
                  (status === "sent"
                    ? "bg-emerald-500 text-white"
                    : !isValid
                    ? "cursor-not-allowed bg-white/20 text-white/40"
                    : "bg-white text-[#0a0a0a] hover:bg-white/90")
                }
              >
                {buttonLabel}
              </button>

              <p className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider text-white/30 text-center pt-1">
                Opens your email client · A copy is saved locally
              </p>
            </form>
          </Reveal>

          {/* ── Networks ── */}
          <Reveal className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10.5px] md:text-[11px] font-bold uppercase tracking-wider text-white/60">
                {contact.networksTitle}
              </span>

              <div className="flex flex-col gap-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0a0a0a]/60 p-3 md:p-3.5 text-white backdrop-blur-md transition-all hover:border-white/50 active:border-white/30 active:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* icon tile — new on mobile */}
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-colors group-hover:border-white/30 group-hover:bg-white/[0.08]">
                        <span className="material-symbols-outlined text-[17px] text-white/70 transition-colors group-hover:text-white">
                          {SOCIAL_ICONS[s.label] ?? "link"}
                        </span>
                      </span>

                      <div className="flex flex-col leading-tight min-w-0">
                        <span className="font-display text-[15px] md:text-[16px] font-bold tracking-tight truncate">
                          {s.label}
                        </span>
                        {s.handle && (
                          <span className="font-mono text-[9.5px] md:text-[10px] uppercase tracking-wider text-white/40 truncate">
                            {s.handle}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="material-symbols-outlined flex-shrink-0 text-[17px] text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                      arrow_outward
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* runtime strip */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5 md:pt-6">
              <span className="material-symbols-outlined text-[22px] text-white/50">
                terminal
              </span>
              <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-white/40 truncate">
                {contact.runtime}
              </span>
            </div>
          </Reveal>
        </div>

        {/* ═══════════ CLOSING STRIP ═══════════ */}
        <div className="mt-14 md:mt-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/10 pt-6">
          <span className="text-center sm:text-left font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-white/40">
            {contact.copyright}
          </span>

          <a
            href="#hero"
            className="group flex items-center justify-center sm:justify-start gap-2 font-mono text-[10.5px] md:text-[11px] uppercase tracking-wider text-white/60 transition-colors hover:text-white"
          >
            <span>Back to top</span>
            <span className="material-symbols-outlined text-[13px] transition-transform duration-300 group-hover:-translate-y-0.5">
              arrow_upward
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}