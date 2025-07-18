import React from "react";
import type { PeaksResponse } from "@/types/api";

interface PeaksTableProps {
  data: PeaksResponse["result"];
  loading: boolean;
  error: string | null;
}

export function PeaksTable({ data, loading, error }: PeaksTableProps) {
  if (loading) return <div className="animate-pulse text-muted">Loading peaks...</div>;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!Array.isArray(data) || data.length === 0) return <div className="text-muted">No data available.</div>;

  return (
    <table className="w-full text-sm bg-muted rounded">
      <thead>
        <tr>
          <th className="text-left p-2 font-medium">Date</th>
          <th className="text-right p-2 font-medium">Value</th>
          <th className="text-left p-2 font-medium">Label</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.date + '-' + row.value + '-' + idx}>
            <td className="p-2">{row.date}</td>
            <td className="p-2 text-right">{row.value}</td>
            <td className="p-2">{row.label ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 