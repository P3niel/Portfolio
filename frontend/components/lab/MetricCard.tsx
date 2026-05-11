interface MetricCardProps {
  label: string;
  value: string | null;
  unit?: string;
  sub?: string;
}

export default function MetricCard({ label, value, unit, sub }: MetricCardProps) {
  return (
    <div className="p-4 rounded border border-rule bg-surface flex flex-col gap-1">
      <span className="text-ink-3 text-xs uppercase tracking-widest">{label}</span>
      <span className="text-xl font-bold text-ink font-mono">
        {value ?? "—"}
        {value && unit && <span className="text-ink-2 text-sm ml-1">{unit}</span>}
      </span>
      {sub && <span className="text-ink-3 text-xs">{sub}</span>}
    </div>
  );
}
