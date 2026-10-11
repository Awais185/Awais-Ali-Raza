import { footer } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/10">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-6 md:px-10 lg:px-16">

        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3">

          {/* Copyright — bottom on mobile, left on desktop */}
          <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 sm:text-left sm:text-[10.5px] sm:tracking-widest">
            {footer.copyright}
          </span>

          {/* Back to top — pill on mobile, plain link on desktop */}
          <a
            href="#hero"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition-all duration-200 active:scale-[0.98] active:border-white/25 active:bg-white/[0.07] sm:w-auto sm:gap-2 sm:rounded-full sm:border-transparent sm:bg-transparent sm:px-2 sm:py-1.5 sm:active:scale-100 sm:active:border-transparent sm:active:bg-transparent"
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-white/70 transition-colors group-hover:text-white">
              Back to top
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10 sm:h-5 sm:w-5 sm:border-0 sm:bg-transparent">
              <span className="material-symbols-outlined text-[14px] text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-white sm:text-[13px]">
                arrow_upward
              </span>
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}