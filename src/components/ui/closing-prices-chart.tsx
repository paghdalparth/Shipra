import React from "react";

interface ClosingPricesChartProps {
  data: { time: string; value: number }[];
  loading: boolean;
  error: string | null;
}

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export function ClosingPricesChart({ data, loading, error }: ClosingPricesChartProps) {
  if (loading) return <div className="animate-pulse text-muted">Loading chart...</div>;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!data || data.length === 0) return <div className="text-muted">No data available.</div>;

  return (
    <div className="w-full h-72 bg-white rounded-lg shadow p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} minTickGap={20} />
          <YAxis tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} width={40} domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{ background: 'white', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
            labelStyle={{ color: '#22c55e', fontWeight: 600 }}
            cursor={{ fill: '#22c55e', fillOpacity: 0.08 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorClose)"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: '#22c55e', stroke: 'white', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 