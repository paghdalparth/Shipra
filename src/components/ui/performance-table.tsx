import React from "react";
import type { PerformanceResponse } from "@/types/api";

interface PerformanceTableProps {
  data: PerformanceResponse["result"];
  loading: boolean;
  error: string | null;
}

export function PerformanceTable({ data, loading, error }: PerformanceTableProps) {
  if (loading) return <div className="animate-pulse text-muted">Loading performance...</div>;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!data || data.length === 0) return <div className="text-muted">No data available.</div>;

  return (
    <table className="w-full text-sm bg-muted rounded">
      <thead>
        <tr>
          <th className="text-left p-2 font-medium">Period</th>
          <th className="text-right p-2 font-medium">Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.period + '-' + row.value + '-' + idx}>
            <td className="p-2">{row.period}</td>
            <td className="p-2 text-right">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 