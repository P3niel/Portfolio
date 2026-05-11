interface ApiHealthPanelProps {
  requestRate: number | null;
  latencyP99: number | null;
  errorRate: number | null;
}

function Row({ label, value, unit }: { label: string; value: string | null; unit?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-rule last:border-0">
      <span className="text-ink-3 text-xs">{label}</span>
      <span className="text-ink text-xs font-mono">
        {value ?? "—"}
        {value && unit && <span className="text-ink-3 ml-1">{unit}</span>}
      </span>
    </div>
  );
}

export default function ApiHealthPanel({ requestRate, latencyP99, errorRate }: ApiHealthPanelProps) {
  return (
    <div className="p-4 rounded border border-rule bg-surface">
      <h3 className="text-xs text-accent uppercase tracking-widest mb-3">API Metrics</h3>
      <Row
        label="Request rate"
        value={requestRate !== null ? requestRate.toFixed(2) : null}
        unit="req/s"
      />
      <Row
        label="Latency P99"
        value={latencyP99 !== null ? (latencyP99 * 1000).toFixed(0) : null}
        unit="ms"
      />
      <Row
        label="Error rate"
        value={errorRate !== null ? (errorRate * 100).toFixed(1) : null}
        unit="%"
      />
    </div>
  );
}
