import React from "react";
import type { MovingAverageResponse } from "@/types/api";

interface MovingAverageChartProps {
  data: MovingAverageResponse["result"];
  loading: boolean;
  error: string | null;
}

export function MovingAverageChart({ data, loading, error }: MovingAverageChartProps) {
  if (loading) return <div className="animate-pulse text-muted">Loading moving average...</div>;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!data || data.length === 0) return <div className="text-muted">No data available.</div>;

  // Placeholder for chart - replace with a real chart library if needed
  return (
    <div className="w-full h-48 bg-muted rounded flex items-center justify-center">
      <span className="text-muted-foreground">[Moving Average Chart Placeholder]</span>
    </div>
  );
} 