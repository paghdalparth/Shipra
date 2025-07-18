"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { SymbolInfo } from "@/types/api";
import { useEffect, useState } from "react";
import { ClosingPricesChart } from "@/components/ui/closing-prices-chart";
import type { ClosingPricesResponse } from "@/types/api";
import { TradingHighLow } from "@/components/ui/trading-high-low";
import type { TradingHighLowResponse } from "@/types/api";
import { MovingAverageChart } from "@/components/ui/moving-average-chart";
import type { MovingAverageResponse } from "@/types/api";
import { PerformanceTable } from "@/components/ui/performance-table";
import type { PerformanceResponse } from "@/types/api";
import { PeaksTable } from "@/components/ui/peaks-table";
import type { PeaksResponse } from "@/types/api";


const API_BASE = "https://api-shipra-v3.pilleo.ca";
const DEFAULT_SYMBOL = "AAPL";

export default function Home() {
  const [symbolInfo, setSymbolInfo] = useState<SymbolInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [closingPrices, setClosingPrices] = useState<ClosingPricesResponse["result"]>([]);
  const [closingPricesLoading, setClosingPricesLoading] = useState(true);
  const [closingPricesError, setClosingPricesError] = useState<string | null>(null);
  const [tradingHighLow, setTradingHighLow] = useState<TradingHighLowResponse["result"] | null>(null);
  const [tradingHighLowLoading, setTradingHighLowLoading] = useState(true);
  const [tradingHighLowError, setTradingHighLowError] = useState<string | null>(null);
  const [movingAverage, setMovingAverage] = useState<MovingAverageResponse["result"]>([]);
  const [movingAverageLoading, setMovingAverageLoading] = useState(true);
  const [movingAverageError, setMovingAverageError] = useState<string | null>(null);
  const [performance, setPerformance] = useState<PerformanceResponse["result"]>([]);
  const [performanceLoading, setPerformanceLoading] = useState(true);
  const [performanceError, setPerformanceError] = useState<string | null>(null);
  const [peaks, setPeaks] = useState<PeaksResponse["result"]>([]);
  const [peaksLoading, setPeaksLoading] = useState(true);
  const [peaksError, setPeaksError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance'>('overview');
  const [trendsView, setTrendsView] = useState<'grid' | 'table'>('grid');
  const [peaksView, setPeaksView] = useState<'grid' | 'table'>('grid');
  const [overview, setOverview] = useState<any>(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState('5D');
  const [info, setInfo] = useState<any>(null);
  const [infoLoading, setInfoLoading] = useState(true);
  const [infoError, setInfoError] = useState<string | null>(null);

  const rangeOptions = [
    { label: '5D', days: 5 },
    { label: '1M', days: 22 },
    { label: '3M', days: 66 },
    { label: '6M', days: 132 },
    { label: 'YTD', days: 180 }, // Approximate for demo
    { label: '1Y', days: 252 },
    { label: '3Y', days: 756 },
    { label: '5Y', days: 1260 },
    { label: '10Y', days: 2520 },
    { label: 'MAX', days: Infinity },
  ];

  useEffect(() => {
    async function fetchSymbolInfo() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/admin/ticker/unauth/info?symbol=${DEFAULT_SYMBOL}`);
        if (!res.ok) throw new Error("Failed to fetch symbol info");
        const data = await res.json();
        setSymbolInfo(data.result as SymbolInfo); // <-- use .result
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchSymbolInfo();
  }, []);

  useEffect(() => {
    async function fetchClosingPrices() {
      setClosingPricesLoading(true);
      setClosingPricesError(null);
      try {
        const res = await fetch(`${API_BASE}/admin/ticker/unauth/closing-prices?symbol=${DEFAULT_SYMBOL}`);
        if (!res.ok) throw new Error("Failed to fetch closing prices");
        const data: ClosingPricesResponse = await res.json();
        setClosingPrices(data.result);
      } catch (err) {
        setClosingPricesError((err as Error).message);
      } finally {
        setClosingPricesLoading(false);
      }
    }
    fetchClosingPrices();
  }, []);

  useEffect(() => {
    async function fetchTradingHighLow() {
      setTradingHighLowLoading(true);
      setTradingHighLowError(null);
      try {
        const res = await fetch(`${API_BASE}/admin/ticker/unauth/trading-high-low?symbol=${DEFAULT_SYMBOL}`);
        if (!res.ok) throw new Error("Failed to fetch trading highs and lows");
        const data: TradingHighLowResponse = await res.json();
        setTradingHighLow(data.result);
      } catch (err) {
        setTradingHighLowError((err as Error).message);
      } finally {
        setTradingHighLowLoading(false);
      }
    }
    fetchTradingHighLow();
  }, []);

  useEffect(() => {
    async function fetchMovingAverage() {
      setMovingAverageLoading(true);
      setMovingAverageError(null);
      try {
        const res = await fetch(`${API_BASE}/admin/ticker/unauth/moving-average?symbol=${DEFAULT_SYMBOL}`);
        if (!res.ok) throw new Error("Failed to fetch moving average");
        const data: MovingAverageResponse = await res.json();
        setMovingAverage(data.result);
      } catch (err) {
        setMovingAverageError((err as Error).message);
      } finally {
        setMovingAverageLoading(false);
      }
    }
    fetchMovingAverage();
  }, []);

  useEffect(() => {
    async function fetchPerformance() {
      setPerformanceLoading(true);
      setPerformanceError(null);
      try {
        const res = await fetch(`${API_BASE}/admin/ticker/unauth/performance?symbol=${DEFAULT_SYMBOL}`);
        if (!res.ok) throw new Error("Failed to fetch performance data");
        const data: PerformanceResponse = await res.json();
        setPerformance(data.result);
      } catch (err) {
        setPerformanceError((err as Error).message);
      } finally {
        setPerformanceLoading(false);
      }
    }
    fetchPerformance();
  }, []);

  useEffect(() => {
    async function fetchPeaks() {
      setPeaksLoading(true);
      setPeaksError(null);
      try {
        const res = await fetch(`${API_BASE}/admin/ticker/unauth/peaks?symbol=${DEFAULT_SYMBOL}`);
        if (!res.ok) throw new Error("Failed to fetch peaks data");
        const data = await res.json();
        setPeaks(Array.isArray(data.result?.peakData) ? data.result.peakData : []);
      } catch (err) {
        setPeaksError((err as Error).message);
      } finally {
        setPeaksLoading(false);
      }
    }
    fetchPeaks();
  }, []);

  useEffect(() => {
    async function fetchOverview() {
      setOverviewLoading(true);
      setOverviewError(null);
      try {
        const res = await fetch("https://api-shipra-v3.pilleo.ca/admin/ticker/unauth/overview?symbol=AAPL");
        if (!res.ok) throw new Error("Failed to fetch overview data");
        const data = await res.json();
        setOverview(data.result);
      } catch (err) {
        setOverviewError((err as Error).message);
      } finally {
        setOverviewLoading(false);
      }
    }
    fetchOverview();
  }, []);

  useEffect(() => {
    async function fetchInfo() {
      setInfoLoading(true);
      setInfoError(null);
      try {
        const res = await fetch("https://api-shipra-v3.pilleo.ca/admin/ticker/unauth/info?symbol=AAPL");
        if (!res.ok) throw new Error("Failed to fetch info data");
        const data = await res.json();
        setInfo(data.result);
      } catch (err) {
        setInfoError((err as Error).message);
      } finally {
        setInfoLoading(false);
      }
    }
    fetchInfo();
  }, []);

  // Debug API data
  console.log('peaks', peaks);
  console.log('performance', performance);
  console.log('tradingHighLow', tradingHighLow);

  // Filter closingPrices from overview based on selectedRange
  type ClosingPrice = { time: string; value: number };
  const closingPricesData: ClosingPrice[] = overview?.closingPrices || [];
  const selectedOption = rangeOptions.find(r => r.label === selectedRange) || rangeOptions[0];
  const filteredPrices = selectedOption.days === Infinity
    ? closingPricesData
    : closingPricesData.slice(-selectedOption.days);

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
<header className="flex flex-col px-0 pt-0 pb-0 bg-[#f8fbfd] border-b border-muted shadow-sm w-full">
  <div className="flex flex-row items-start px-4 pt-6 pb-2 w-full">
    {/* Left: Logo + Symbol Info */}
    {symbolInfo && (
      <div className="flex flex-col min-w-[260px] mr-10">
        <div className="flex flex-row items-center gap-x-4 mb-1">
          <img
            src={symbolInfo.logo}
            alt={symbolInfo.ticker}
            className="w-10 h-10 rounded-full bg-muted border border-border"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-x-3">
              <span className="text-xl font-bold text-foreground leading-tight">
                {symbolInfo.nm}
              </span>
              <span className="text-base font-medium text-muted-foreground">
                {symbolInfo.ticker}
              </span>
              <span className="ml-2 flex gap-x-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {symbolInfo.exchange}
            </span>
          </div>
        </div>

        {/* Stats row */}
        {infoLoading ? (
          <div className="text-muted">Loading stats...</div>
        ) : infoError ? (
          <div className="text-destructive">{infoError}</div>
        ) : info ? (
          <div className="grid grid-cols-8 gap-x-20 mt-4 text-sm w-full">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">Price</span>
              <span className="font-bold text-foreground">{info.currency}</span>
              <span className="font-semibold text-foreground">{info.latestClose} {info.change >= 0 ? '+' : ''}{info.change}
                <span className="ml-1 text-green-600">({info.percentageChange}%)</span>
              </span>
            </div>
            {/* Opportunity Buy */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">Opportunity Buy</span>
              <span className="font-semibold text-green-600">{info.remaining_opportunity ?? '--'}%</span>
            </div>
            {/* Leveraged */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">Leveraged</span>
              <span>
                <span className="font-semibold text-red-500">1x</span>{' '}
                <span className="font-semibold text-blue-500">2x</span>
              </span>
            </div>
            {/* Currency Hedged */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">Currency Hedged</span>
              <span className="font-semibold text-blue-600">
                {info.hedgedCurrency?.map((c: any) => c.currency).join(' ') ?? '--'} <span className="ml-1 text-blue-500">+3</span>
              </span>
            </div>
            {/* RSI */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">RSI</span>
              <span className="font-semibold text-red-500">{info.RSI ? `>${info.RSI}` : '--'}</span>
            </div>
            {/* 200 Day DMA */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">200 Day DMA</span>
              <span className="font-semibold text-red-500">
                {info.DMA_200 ? `${((info.latestClose - info.DMA_200) / info.DMA_200 * 100).toFixed(2)}%` : '--'}
                <span className="ml-1 text-red-400">({info.DMA_200 ? `$${info.DMA_200}` : '--'})</span>
              </span>
            </div>
            {/* SRT */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">SRT (124 DMA)</span>
              <span className="font-semibold text-foreground">{info.SRT_124 ?? '--'}</span>
            </div>
            {/* Earnings */}
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">Earnings</span>
              <span className="font-semibold text-foreground">{info.nextEarningsDate ? new Date(info.nextEarningsDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '--'}</span>
            </div>
          </div>
        ) : null}
      </div>
    )}

    {/* Right Side Actions */}
    <div className="flex flex-row items-center gap-x-3 ml-auto mt-6">
      <span className="text-red-500">↓</span>
      <span className="text-red-500">↓</span>
      <span className="text-yellow-500">↑</span>
      <span className="text-yellow-500">↑</span>
      <span className="ml-6 text-muted-foreground">Actions •••</span>
    </div>
  </div>
</header>

      {/* Tab Navigation Bar - Figma style, full width */}
      <nav className="flex flex-row gap-x-2 px-4 pt-3 pb-0 border-b border-muted bg-[#f8fbfd] w-full">
        <button className={`px-5 py-2 rounded-t-lg font-medium ${activeTab === 'overview' ? 'text-primary border-b-2 border-blue-600 bg-transparent -mb-px' : 'text-muted-foreground hover:text-primary hover:bg-muted transition-colors'}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`px-5 py-2 rounded-t-lg font-medium ${activeTab === 'performance' ? 'text-primary border-b-2 border-blue-600 bg-transparent -mb-px' : 'text-muted-foreground hover:text-primary hover:bg-muted transition-colors'}`} onClick={() => setActiveTab('performance')}>Performance</button>
        <button className="px-5 py-2 rounded-t-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">Technical</button>
        <button className="px-5 py-2 rounded-t-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">Trading</button>
        <button className="px-5 py-2 rounded-t-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">Calculators</button>
        <button className="px-5 py-2 rounded-t-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">Intelligence</button>
        <button className="px-5 py-2 rounded-t-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">Holdings</button>
        <button className="px-5 py-2 rounded-t-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">Notes & Tags</button>
        <button className="px-5 py-2 rounded-t-lg font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors">Insider Info</button>
      </nav>
      {/* Main Content Area: Switch by Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Overview Section - Figma style */}
          <section className="flex flex-col gap-6 px-4 pt-8 w-full max-w-screen-2xl mx-auto">
            {/* Top Controls and Time Range Selectors */}
            <div className="flex flex-row items-center justify-between gap-4 mb-2">
              {/* Tabs + Metrics Group */}
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row gap-1">
                  {['Price', 'Drawdown', 'P/E', 'Worst Phase'].map(tab => (
                    <button
                      key={tab}
                      className={`px-4 py-1.5 rounded-full font-medium text-sm transition-colors border border-transparent ${tab === 'Price' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-muted-foreground hover:bg-blue-50'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex flex-row items-center bg-white border border-muted-foreground/20 rounded-full px-4 py-1 text-sm font-medium gap-2">
                  <span className="text-muted-foreground">Total Change:</span>
                  <span className="font-semibold text-foreground">CA$1.22 (4.80%)</span>
                  <span className="mx-2 text-muted-foreground">|</span>
                  <span className="text-muted-foreground">CAGR:</span>
                  <span className="font-semibold text-foreground">29.63%</span>
                </div>
              </div>
              {/* Chart Actions */}
              <div className="flex flex-row gap-3 pr-2">
                <button className="p-1 rounded hover:bg-muted" aria-label="Copy chart">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="6" y="6" width="9" height="9" rx="2" stroke="#888" strokeWidth="1.5"/><rect x="4" y="4" width="9" height="9" rx="2" fill="#fff" stroke="#888" strokeWidth="1.5"/></svg>
                </button>
                <button className="p-1 rounded hover:bg-muted" aria-label="Download chart">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 4v8m0 0l-3-3m3 3l3-3" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="16" width="12" height="2" rx="1" fill="#888"/></svg>
                </button>
              </div>
            </div>
            {/* Time Range Selectors */}
            <div className="flex flex-row justify-between gap-2 mb-4 mt-1">
              {rangeOptions.map(range => (
                <button
                  key={range.label}
                  className={`px-3 py-1 rounded-full font-medium text-xs transition-colors border border-transparent ${selectedRange === range.label ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-muted-foreground hover:bg-blue-50'}`}
                  onClick={() => setSelectedRange(range.label)}
                >
                  {range.label}
                </button>
              ))}
            </div>
            {/* Main Chart Area Only */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between min-h-[340px]">
              <ClosingPricesChart data={filteredPrices} loading={overviewLoading} error={overviewError} />
            </div>
            {/* Info cards grid will go here next */}
            {overviewLoading ? (
              <div className="text-muted">Loading overview...</div>
            ) : overviewError ? (
              <div className="text-destructive">{overviewError}</div>
            ) : overview ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-2">
                {/* Profile */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2">
                  <div className="font-semibold text-sm mb-1">Profile</div>
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="font-medium">CA${overview.Profile?.['Market Cap'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">EV</div>
                  <div className="font-medium">CA${overview.Profile?.EV ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">Shares Out</div>
                  <div className="font-medium">{overview.Profile?.['Share Out'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                  <div className="font-medium">CA${overview.Profile?.Revenue ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">Employees</div>
                  <div className="font-medium">{overview.Profile?.Employees ?? '--'}</div>
                </div>
                {/* Valuation (TTM) */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2">
                  <div className="font-semibold text-sm mb-1">Valuation (TTM)</div>
                  <div className="text-xs text-muted-foreground">P/E</div>
                  <div className="font-medium">{overview['Valuation (TTM)']?.['P/E'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">P/B</div>
                  <div className="font-medium">{overview['Valuation (TTM)']?.['P/B'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">EV/Sales</div>
                  <div className="font-medium">{overview['Valuation (TTM)']?.['EV/Sales'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">EV/EBITDA</div>
                  <div className="font-medium">{overview['Valuation (TTM)']?.['EV/EBITDA'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">P/FCF</div>
                  <div className="font-medium">{overview['Valuation (TTM)']?.['P/FCF'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">EV/Gross Profit</div>
                  <div className="font-medium">{overview['Valuation (TTM)']?.['EV/Gross Profit'] ?? '--'}</div>
                </div>
                {/* Valuation (NTM) */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2">
                  <div className="font-semibold text-sm mb-1">Valuation (NTM)</div>
                  <div className="text-xs text-muted-foreground">Price Target</div>
                  <div className="font-medium">{overview['Valuation (NTM)']?.['Price Target'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">P/E</div>
                  <div className="font-medium">{overview['Valuation (NTM)']?.['P/E'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">PEG</div>
                  <div className="font-medium">{overview['Valuation (NTM)']?.['PEG'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">EV/Sales</div>
                  <div className="font-medium">{overview['Valuation (NTM)']?.['EV/Sales'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">EV/EBITDA</div>
                  <div className="font-medium">{overview['Valuation (NTM)']?.['EV/EBITDA'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">P/FCF</div>
                  <div className="font-medium">{overview['Valuation (NTM)']?.['P/FCF'] ?? '--'}</div>
                </div>
                {/* Financial Health */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2">
                  <div className="font-semibold text-sm mb-1">Financial Health</div>
                  <div className="text-xs text-muted-foreground">Revenue Per Employee</div>
                  <div className="font-medium">CA${overview.Profile?.['RPE (Revenue per Employee)'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">Cash</div>
                  <div className="font-medium">CA${overview['Financial Health']?.Cash ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">Net Debt</div>
                  <div className="font-medium">CA${overview['Financial Health']?.['Net Debt'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">Debt/Equity</div>
                  <div className="font-medium">{overview['Financial Health']?.['Debt/Equity'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">EBIT/Interest</div>
                  <div className="font-medium">{overview['Financial Health']?.['EBIT/Interest'] ?? '--'}</div>
                </div>
                {/* Growth (CAGR) */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2">
                  <div className="font-semibold text-sm mb-1">Growth (CAGR)</div>
                  <div className="text-xs text-muted-foreground">Rev 3Yr</div>
                  <div className="font-medium">{overview['Growth (CAGR)']?.['Revenue 3Yr CAGR'] ?? '--'}%</div>
                  <div className="text-xs text-muted-foreground">Rev 5Yr</div>
                  <div className="font-medium">{overview['Growth (CAGR)']?.['Revenue 5Yr CAGR'] ?? '--'}%</div>
                  <div className="text-xs text-muted-foreground">Rev 10Yr</div>
                  <div className="font-medium">{overview['Growth (CAGR)']?.['Revenue 10Yr CAGR'] ?? '--'}%</div>
                  <div className="text-xs text-muted-foreground">Dil EPS 3Yr</div>
                  <div className="font-medium">{overview['Growth (CAGR)']?.['Diluted EPS 3Yr CAGR'] ?? '--'}%</div>
                  <div className="text-xs text-muted-foreground">Dil EPS 5Yr</div>
                  <div className="font-medium">{overview['Growth (CAGR)']?.['Diluted EPS 5Yr CAGR'] ?? '--'}%</div>
                  <div className="text-xs text-muted-foreground">Dil EPS 10Yr</div>
                  <div className="font-medium">{overview['Growth (CAGR)']?.['Diluted EPS 10Yr CAGR'] ?? '--'}%</div>
                </div>
                {/* Dividends */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2">
                  <div className="font-semibold text-sm mb-1">Dividends</div>
                  <div className="text-xs text-muted-foreground">Yield</div>
                  <div className="font-medium">{overview.Dividends?.Yield ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">Payout</div>
                  <div className="font-medium">{overview.Dividends?.['Payout Ratio'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">DPS</div>
                  <div className="font-medium">{overview.Dividends?.DPS ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">DPS Growth 3yr</div>
                  <div className="font-medium">{overview.Dividends?.['DPS Growth 3Yr'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">DPS Growth 5yr</div>
                  <div className="font-medium">{overview.Dividends?.['DPS Growth 5Yr'] ?? '--'}</div>
                  <div className="text-xs text-muted-foreground">DPS Growth 10yr</div>
                  <div className="font-medium">{overview.Dividends?.['DPS Growth 10Yr'] ?? '--'}</div>
                </div>
              </div>
            ) : null}
          </section>
          {/* High/Low Statistics Row */}
          {tradingHighLowLoading ? (
            <div className="text-muted">Loading high/low statistics...</div>
          ) : tradingHighLowError ? (
            <div className="text-destructive">{tradingHighLowError}</div>
          ) : Array.isArray(tradingHighLow) && tradingHighLow.length > 0 ? (
            <section className="bg-white rounded-lg shadow p-6 mt-4">
              <div className="font-semibold text-base mb-4">High Low Statistics</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {["13", "26", "52", "104"].map(week => {
                  const stat = tradingHighLow.find(s => s.week === week);
                  return (
                    <div key={week} className="flex flex-col gap-2">
                      <div className="font-semibold text-sm mb-1">{week} Week</div>
                      <div className="flex flex-row justify-between items-end">
                        {/* Low Side */}
                        <div className="flex flex-col items-start">
                          <span className="font-semibold text-sm text-foreground">{stat ? `$${stat.low}` : '--'}</span>
                          <span className="text-xs text-red-500 font-medium">{stat ? `${stat.lowPercentage}% downside` : '--'}</span>
                        </div>
                        {/* High Side */}
                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-sm text-foreground">{stat ? `$${stat.high}` : '--'}</span>
                          <span className="text-xs text-green-600 font-medium">{stat ? `+${stat.highPercentage}% upside` : '--'}</span>
                        </div>
                      </div>
                      {/* Bar */}
                      <div className="relative h-2 w-full my-2">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded" />
                        {stat && <div className={`absolute top-1/2 -translate-y-1/2 h-1 rounded ${stat.highPercentage >= 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{ left: '10%', width: '80%' }} />}
                      </div>
                      {/* Dates */}
                      <div className="flex flex-row justify-between text-xs text-muted-foreground">
                        <div className="flex flex-col items-start">
                          <span>{stat ? stat.lowDate : '--'}</span>
                          <span>{stat ? `${stat.lowDaysAgo} days ago` : '--'}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span>{stat ? stat.highDate : '--'}</span>
                          <span>{stat ? `${stat.highDaysAgo} days ago` : '--'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}
          {/* Investment Returns & DMA Row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
            {/* Investment Returns */}
            <div className="col-span-3 bg-white rounded-lg shadow p-4 flex flex-col gap-4 min-w-0">
              <div className="font-semibold text-base mb-2">Investment Returns</div>
              <div className="grid grid-cols-2 gap-4">
                {/* Long Term */}
                <div>
                  <div className="font-medium text-sm mb-2">Long Term</div>
                  {[
                    { label: '1 Year', value: 2.62 },
                    { label: '2 Years', value: 7.51 },
                    { label: '3 Years', value: 3.70 },
                    { label: '4 Years', value: -1.52 },
                    { label: '5 Years', value: -18.85 },
                  ].map((row, idx) => (
                    <div key={row.label} className="flex items-center gap-2 mb-1">
                      <div className="w-16 text-xs text-muted-foreground">{row.label}</div>
                      <div className="flex-1 h-2 bg-muted rounded relative mx-2">
                        <div
                          className={`absolute left-0 top-0 h-2 rounded ${row.value >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(Math.abs(row.value), 20) * 5}%` }}
                        />
                      </div>
                      <div className={`text-xs font-semibold ${row.value >= 0 ? 'text-green-600' : 'text-red-500'}`}>{row.value >= 0 ? '+' : ''}{row.value}%</div>
                    </div>
                  ))}
                </div>
                {/* Short Term */}
                <div>
                  <div className="font-medium text-sm mb-2">Short Term</div>
                  {[
                    { label: '1 Day', value: 2.62 },
                    { label: '1 Week', value: 7.51 },
                    { label: '2 Weeks', value: 3.70 },
                    { label: '1 Month', value: -1.52 },
                    { label: '3 Months', value: -18.85 },
                  ].map((row, idx) => (
                    <div key={row.label} className="flex items-center gap-2 mb-1">
                      <div className="w-16 text-xs text-muted-foreground">{row.label}</div>
                      <div className="flex-1 h-2 bg-muted rounded relative mx-2">
                        <div
                          className={`absolute left-0 top-0 h-2 rounded ${row.value >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(Math.abs(row.value), 20) * 5}%` }}
                        />
                      </div>
                      <div className={`text-xs font-semibold ${row.value >= 0 ? 'text-green-600' : 'text-red-500'}`}>{row.value >= 0 ? '+' : ''}{row.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* DMA Table */}
            <div className="col-span-2 bg-white rounded-lg shadow p-6 flex flex-col gap-2 min-w-[420px]">
              <div className="font-semibold text-base mb-2">Daily Moving Average (DMA)</div>
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="font-medium p-1">Days</td>
                    {(movingAverage as any[]).map((row, idx) => (
                      <td key={row.day} className="p-1 font-medium">{row.day}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-medium p-1">DMA Price</td>
                    {(movingAverage as any[]).map((row, idx) => (
                      <td key={row.day} className="p-1">${row.dma_price}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-medium p-1">Date</td>
                    {(movingAverage as any[]).map((row, idx) => (
                      <td key={row.day} className="p-1 whitespace-nowrap">{row.date}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-medium p-1">Upwards from CP</td>
                    {(movingAverage as any[]).map((row, idx) => (
                      <td key={row.day} className={`p-1 text-xs font-semibold ${row.upward_percent > 0 ? 'text-green-600' : row.upward_percent < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>{row.upward_percent != null ? `${row.upward_percent}%` : '-'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="font-medium p-1">Downwards CP</td>
                    {(movingAverage as any[]).map((row, idx) => (
                      <td key={row.day} className={`p-1 text-xs font-semibold ${row.downward_percent > 0 ? 'text-green-600' : row.downward_percent < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>{row.downward_percent != null ? `${row.downward_percent}%` : '-'}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {activeTab === 'performance' && (
        <section className={`flex flex-col lg:flex-row ${trendsView === 'table' && peaksView === 'table' ? 'gap-0' : 'gap-6'} px-4 pt-8 w-full max-w-screen-2xl mx-auto`}>
          {/* Trends Column */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Trends</h2>
              <div className="flex gap-2">
                <button
                  className={`p-1 rounded ${trendsView === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-muted'}`}
                  onClick={() => setTrendsView('grid')}
                  aria-label="Grid view"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/><rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/><rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/><rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/></svg>
                </button>
                <button
                  className={`p-1 rounded ${trendsView === 'table' ? 'bg-blue-100 text-blue-600' : 'hover:bg-muted'}`}
                  onClick={() => setTrendsView('table')}
                  aria-label="Table view"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="2" rx="1" fill="currentColor"/><rect x="3" y="9" width="14" height="2" rx="1" fill="currentColor"/><rect x="3" y="13" width="14" height="2" rx="1" fill="currentColor"/></svg>
                </button>
              </div>
            </div>
            {trendsView === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(performance as any[]).map((row, idx) => (
                  <div key={(row.date || row.day) + '-' + idx} className="bg-green-50/20 border rounded-lg p-4 flex flex-col gap-1 shadow-sm">
                    <div className="font-semibold">{row.date}</div>
                    <div className="text-xs text-muted-foreground">{row.day}</div>
                    <div className="text-base font-bold">${row.current_price}</div>
                    <div className={`flex items-center text-sm font-medium ${row.change >= 0 ? 'text-green-600' : 'text-red-500'}`}> 
                      <span className="mr-1">{row.change >= 0 ? '↑' : '↓'}</span>
                      {row.change >= 0 ? '+' : ''}{row.change} ({row.change_pct}%)
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-2 text-left">DATE</th>
                      <th className="p-2 text-right">PRICE</th>
                      <th className="p-2 text-right">PRICE CHANGE</th>
                      <th className="p-2 text-right">% CHANGE</th>
                      <th className="p-2 text-right">PE % CHANGE</th>
                      <th className="p-2 text-right">PE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(performance as any[]).map((row, idx) => (
                      <tr key={(row.date || row.day) + '-' + idx}>
                        <td className="p-2">{row.date}</td>
                        <td className="p-2 text-right">{row.current_price}</td>
                        <td className="p-2 text-right" style={{ color: row.change >= 0 ? '#16a34a' : '#ef4444' }}>{row.change >= 0 ? '+' : ''}{row.change}</td>
                        <td className="p-2 text-right" style={{ color: row.change_pct >= 0 ? '#16a34a' : '#ef4444' }}>{row.change_pct}%</td>
                        <td className="p-2 text-right" style={{ color: row.pe_change_pct >= 0 ? '#16a34a' : '#ef4444' }}>{row.pe_change_pct ?? '-'}</td>
                        <td className="p-2 text-right" style={{ color: row.pe >= 0 ? '#16a34a' : '#ef4444' }}>{row.pe ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* Peak Data Column */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Peak Data</h2>
              <div className="flex gap-2">
                <button
                  className={`p-1 rounded ${peaksView === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-muted'}`}
                  onClick={() => setPeaksView('grid')}
                  aria-label="Grid view"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor"/><rect x="11" y="3" width="6" height="6" rx="1" fill="currentColor"/><rect x="3" y="11" width="6" height="6" rx="1" fill="currentColor"/><rect x="11" y="11" width="6" height="6" rx="1" fill="currentColor"/></svg>
                </button>
                <button
                  className={`p-1 rounded ${peaksView === 'table' ? 'bg-blue-100 text-blue-600' : 'hover:bg-muted'}`}
                  onClick={() => setPeaksView('table')}
                  aria-label="Table view"
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="2" rx="1" fill="currentColor"/><rect x="3" y="9" width="14" height="2" rx="1" fill="currentColor"/><rect x="3" y="13" width="14" height="2" rx="1" fill="currentColor"/></svg>
                </button>
              </div>
            </div>
            {peaksView === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(peaks as any[]).map((row, idx) => (
                  <div key={(row.date || row.Date) + '-' + idx} className="bg-white border rounded-lg p-4 flex flex-col gap-1 shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{row.Date ? new Date(row.Date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</div>
                        <div className="text-xs text-muted-foreground">{row.timeDiff} ({row.time_diff_str})</div>
                      </div>
                      <div className="text-base font-bold">${row.Close}</div>
                    </div>
                    <div className="flex flex-col gap-0.5 mt-2">
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <span className="mr-1">↑</span>
                        {row.reverseChange} ({row.reversePercentageChange}%)
                      </div>
                      <div className="flex items-center text-red-500 text-sm font-medium">
                        <span className="mr-1">↓</span>
                        {row.change} ({row.percentageChange}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-2 text-left">PEAK NO</th>
                      <th className="p-2 text-left">DATE</th>
                      <th className="p-2 text-left">TIMELINE</th>
                      <th className="p-2 text-right">PEAK PRICE</th>
                      <th className="p-2 text-right">DOWNWARDS CHANGE</th>
                      <th className="p-2 text-right">UPSIDE CHANGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(peaks as any[]).map((row, idx) => (
                      <tr key={(row.date || row.Date) + '-' + idx}>
                        <td className="p-2">{row.peak ?? '-'}</td>
                        <td className="p-2">{row.Date ? new Date(row.Date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}</td>
                        <td className="p-2">
                          <div style={{whiteSpace: 'nowrap'}}>{row.timeDiff}</div>
                          <div className="text-muted-foreground text-xs">{row.time_diff_str}</div>
                        </td>
                        <td className="p-2 text-right">{row.Close}</td>
                        <td className="p-2 text-right" style={{ color: row.percentageChange >= 0 ? '#16a34a' : '#ef4444' }}>{row.percentageChange}%</td>
                        <td className="p-2 text-right" style={{ color: row.reversePercentageChange >= 0 ? '#16a34a' : '#ef4444' }}>{row.reversePercentageChange}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
    </div>
        </section>
      )}
        {/* Main content will go here next */}
      </main>
  );
}
