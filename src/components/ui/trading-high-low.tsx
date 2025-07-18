import React from "react";
import type { TradingHighLowResponse } from "@/types/api";

interface TradingHighLowProps {
  data: TradingHighLowResponse["result"] | null;
  loading: boolean;
  error: string | null;
}

export function TradingHighLow({ data, loading, error }: TradingHighLowProps) {
  if (loading) return <div className="animate-pulse text-muted">Loading highs and lows...</div>;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!data) return <div className="text-muted">No data available.</div>;

  return (
    <div className="flex flex-col gap-2 p-4 bg-muted rounded">
      <div className="flex justify-between">
        <span className="font-medium">52-Week High:</span>
        <span>{data.high} <span className="text-xs text-muted-foreground">({data.highDate})</span></span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">52-Week Low:</span>
        <span>{data.low} <span className="text-xs text-muted-foreground">({data.lowDate})</span></span>
      </div>
    </div>
  );
} 