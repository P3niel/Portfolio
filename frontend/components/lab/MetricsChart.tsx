"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  time: string;
  latency: number;
}

interface MetricsChartProps {
  data: DataPoint[];
  bare?: boolean;
}

export default function MetricsChart({ data, bare = false }: MetricsChartProps) {
  if (data.length === 0) {
    return (
      <div className={`${bare ? "" : "border border-rule rounded bg-surface"} h-32 flex items-center justify-center text-ink-3 text-xs`}>
        Waiting for data…
      </div>
    );
  }

  return (
    <div className={bare ? "" : "p-4 rounded border border-rule bg-surface"}>
      {!bare && <h3 className="text-xs text-accent uppercase tracking-widest mb-3">Latency P99 (ms)</h3>}
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            tick={{ fill: "#6a6a6a", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6a6a6a", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "#eafff5",
              fontSize: 11,
              borderRadius: 4,
            }}
            labelStyle={{ color: "#AAAAAA" }}
          />
          <Line
            type="monotone"
            dataKey="latency"
            stroke="#00FF9C"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: "#00FF9C" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
