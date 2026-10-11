import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Message,
  getMessages,
  markRead,
  deleteMessage,
  clearAll,
} from "@/lib/messages";

const DASHBOARD_PASSWORD = "awais2026"; // ← change this

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [selected, setSelected] = useState<string | null>(null);

  // Load messages on auth
  useEffect(() => {
    if (!authed) return;
    setMessages(getMessages());

    const refresh = () => setMessages(getMessages());
    window.addEventListener("messages:update", refresh);
    return () => window.removeEventListener("messages:update", refresh);
  }, [authed]);

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (input === DASHBOARD_PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setInput("");
    }
  }

  function formatDate(ts: number) {
    const d = new Date(ts);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function timeAgo(ts: number) {
    const diff = Date.now() - ts;
    const min = Math.floor(diff / 60000);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    if (min < 1) return "just now";
    if (min < 60) return `${min}m ago`;
    if (hr < 24) return `${hr}h ago`;
    return `${day}d ago`;
  }

  // ── Auth screen ──
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <div className="flex flex-col gap-2 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
              Private access
            </span>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white">
              Dashboard
            </h1>
          </div>

          <form onSubmit={handleAuth} className="flex flex-col gap-3">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Password"
              autoFocus
              className={
                "w-full rounded-xl border bg-[#0e0e0e] px-4 py-3 font-mono text-[13px] text-white transition-colors focus:outline-none " +
                (error
                  ? "border-red-500/60 focus:border-red-500"
                  : "border-white/12 focus:border-white/60")
              }
            />
            {error && (
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-red-400">
                Incorrect password
              </span>
            )}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-white py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-white/90"
            >
              Enter
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            ← Back to portfolio
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── Filtered list ──
  const filtered =
    filter === "unread" ? messages.filter((m) => !m.read) : messages;
  const unreadCount = messages.filter((m) => !m.read).length;
  const selectedMessage = messages.find((m) => m.id === selected) ?? null;

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ═══ Header ═══ */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 transition-colors hover:border-white/40"
            >
              <span className="material-symbols-outlined text-[16px] text-white/70">
                arrow_back
              </span>
            </Link>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-[15px] font-bold tracking-tight">
                Inbox
              </span>
              <span className="font-mono text-[9.5px] uppercase tracking-widest text-white/40">
                {messages.length} total · {unreadCount} unread
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter toggle */}
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5">
              {(["all", "unread"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={
                    "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors " +
                    (filter === f
                      ? "bg-white text-[#0a0a0a]"
                      : "text-white/60 hover:text-white")
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Clear all */}
            {messages.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Delete all messages? This cannot be undone.")) {
                    clearAll();
                  }
                }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50 transition-colors hover:border-red-500/40 hover:text-red-400"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ═══ Body ═══ */}
      <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">

        {messages.length === 0 ? (
          // ── Empty state ──
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 py-24 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <span className="material-symbols-outlined text-[28px] text-white/40">
                inbox
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display text-xl font-bold tracking-tight">
                No messages yet
              </h2>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 max-w-xs">
                Contact form submissions appear here
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            {/* ── List column ── */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((m) => (
                  <motion.button
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setSelected(m.id);
                      if (!m.read) markRead(m.id, true);
                    }}
                    className={
                      "group relative flex flex-col gap-2 rounded-xl border p-4 text-left transition-colors " +
                      (selected === m.id
                        ? "border-white/50 bg-white/[0.06]"
                        : "border-white/10 bg-[#0e0e0e] hover:border-white/30")
                    }
                  >
                    {/* unread dot */}
                    {!m.read && (
                      <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-emerald-400" />
                    )}

                    <div className="flex items-center gap-2 pr-6">
                      <span className="font-display text-[14px] font-bold tracking-tight text-white truncate">
                        {m.name}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 truncate">
                      {m.email}
                    </span>

                    <p className="font-body text-[12.5px] leading-relaxed text-white/60 line-clamp-2">
                      {m.message}
                    </p>

                    <span className="font-mono text-[9.5px] uppercase tracking-widest text-white/30">
                      {timeAgo(m.timestamp)}
                    </span>
                  </motion.button>
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="rounded-xl border border-white/10 bg-[#0e0e0e] p-8 text-center">
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">
                    No {filter} messages
                  </span>
                </div>
              )}
            </div>

            {/* ── Detail column ── */}
            <div className="lg:col-span-7">
              <div className="sticky top-24">
                <AnimatePresence mode="wait">
                  {selectedMessage ? (
                    <motion.div
                      key={selectedMessage.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0e0e0e] p-6 md:p-8"
                    >
                      {/* Meta */}
                      <div className="flex flex-col gap-4 pb-6 border-b border-white/10">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                              From
                            </span>
                            <span className="font-display text-2xl font-bold tracking-tight text-white truncate">
                              {selectedMessage.name}
                            </span>
                            <a
                              href={`mailto:${selectedMessage.email}`}
                              className="font-mono text-[12px] text-white/60 hover:text-white transition-colors truncate"
                            >
                              {selectedMessage.email}
                            </a>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm("Delete this message?")) {
                                deleteMessage(selectedMessage.id);
                                setSelected(null);
                              }
                            }}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-red-500/40 hover:text-red-400"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              delete
                            </span>
                          </button>
                        </div>

                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                          {formatDate(selectedMessage.timestamp)}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="flex flex-col gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                          Message
                        </span>
                        <p className="font-body text-[15px] leading-relaxed text-white/85 whitespace-pre-wrap">
                          {selectedMessage.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Re: Your portfolio inquiry`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-widest text-[#0a0a0a] transition-colors hover:bg-white/90"
                        >
                          Reply via email
                          <span className="material-symbols-outlined text-[14px]">
                            arrow_outward
                          </span>
                        </a>

                        <button
                          onClick={() => markRead(selectedMessage.id, !selectedMessage.read)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-widest text-white/70 transition-colors hover:border-white/40 hover:text-white"
                        >
                          {selectedMessage.read ? "Mark unread" : "Mark read"}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty-detail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0e0e0e] p-16 text-center"
                    >
                      <span className="material-symbols-outlined text-[32px] text-white/20">
                        mail
                      </span>
                      <span className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">
                        Select a message
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}