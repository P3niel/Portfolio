type Status = "ok" | "demo" | "offline" | "loading";

const styles: Record<Status, string> = {
  ok: "bg-accent/10 text-accent border-accent/30",
  demo: "bg-yellow-400/10 text-yellow-300 border-yellow-400/30",
  offline: "bg-red-500/10 text-red-400 border-red-500/30",
  loading: "bg-ink-3/10 text-ink-3 border-rule",
};

const labels: Record<Status, string> = {
  ok: "● online",
  demo: "◐ demo",
  offline: "○ offline",
  loading: "◌ loading",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded text-xs border font-mono ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
