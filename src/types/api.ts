// Strict TypeScript types for Shipra API endpoints

// Symbol Info (e.g. /admin/ticker/unauth/info)
export interface SymbolInfo {
  ticker: string;
  nm: string; // company name
  logo: string;
  exchange: string;
  latestClose: number;
  percentageChange: number;
  change: number;
  currency: string;
  // ...add more fields as needed
}

// Overview Data (e.g. /admin/ticker/unauth/overview)
export interface OverviewData {
  // Define fields based on actual API response
  [key: string]: unknown;
}

// Closing Prices (e.g. /admin/ticker/unauth/closing-prices)
export interface ClosingPrice {
  date: string;
  close: number;
}

// Trading Highs and Lows (e.g. /admin/ticker/unauth/trading-high-low)
export interface TradingHighLow {
  high: number;
  low: number;
  date: string;
}

// Moving Average Data (e.g. /admin/ticker/unauth/moving-average)
export interface MovingAverage {
  date: string;
  average: number;
}

// Performance Data (e.g. /admin/ticker/unauth/performance)
export interface PerformanceData {
  // Define fields based on actual API response
  [key: string]: unknown;
}

// Peaks Data (e.g. /admin/ticker/unauth/peaks)
export interface PeaksData {
  // Define fields based on actual API response
  [key: string]: unknown;
}

// Closing Prices (e.g. /admin/ticker/unauth/closing-prices)
export interface ClosingPricesResponse {
  message: string;
  result: Array<{
    date: string;
    close: number;
  }>;
}

// Trading Highs and Lows (e.g. /admin/ticker/unauth/trading-high-low)
export interface TradingHighLowResponse {
  message: string;
  result: {
    high: number;
    low: number;
    highDate: string;
    lowDate: string;
  };
}

// Moving Average Data (e.g. /admin/ticker/unauth/moving-average)
export interface MovingAverageResponse {
  message: string;
  result: Array<{
    date: string;
    movingAverage: number;
  }>;
}

// Performance Data (e.g. /admin/ticker/unauth/performance)
export interface PerformanceResponse {
  message: string;
  result: Array<{
    period: string;
    value: number;
  }>;
}

// Peaks Data (e.g. /admin/ticker/unauth/peaks)
export interface PeaksResponse {
  message: string;
  result: Array<{
    date: string;
    value: number;
    label?: string;
  }>;
} 