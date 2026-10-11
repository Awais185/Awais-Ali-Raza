export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  read: boolean;
};

const STORAGE_KEY = "awais_portfolio_messages";

export function getMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMessage(input: Omit<Message, "id" | "timestamp" | "read">): Message {
  const message: Message = {
    ...input,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    read: false,
  };
  const all = getMessages();
  all.unshift(message);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

  // Fire a custom event so the dashboard updates in real time if it's open
  window.dispatchEvent(new CustomEvent("messages:update"));
  return message;
}

export function markRead(id: string, read = true): void {
  const all = getMessages();
  const updated = all.map((m) => (m.id === id ? { ...m, read } : m));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent("messages:update"));
}

export function deleteMessage(id: string): void {
  const all = getMessages();
  const filtered = all.filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent("messages:update"));
}

export function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("messages:update"));
}