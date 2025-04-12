'use client';

import { useState } from "react";

type Result = {
  roi: string;
  distance: string;
  successRate: number;
};

export default function OptionCalculator() {
  const [entryPrice, setEntryPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [strikePrice, setStrikePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [delta, setDelta] = useState(0);
  const [gamma, setGamma] = useState(0);
  const [daysToExpiry, setDaysToExpiry] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const calculateReturn = () => {
    if (entryPrice === 0) return;
    const roi = ((targetPrice - entryPrice) / entryPrice) * 100;
    const distance = Math.abs(strikePrice - currentPrice);
    let successRate = 0;

    if (distance < 5) {
      successRate = 80;
    } else if (distance < 10) {
      successRate = 60;
    } else {
      successRate = 40;
    }

    setResult({
      roi: roi.toFixed(2),
      distance: distance.toFixed(2),
      successRate,
    });
  };

  const isTradable = () => daysToExpiry > 3;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-neutral-800 dark:text-white">
            옵션 감성 계산기
          </h1>
        </div>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="진입가"
            className="w-full rounded-xl px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="목표가"
            className="w-full rounded-xl px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="행사가"
            className="w-full rounded-xl px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setStrikePrice(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="현재가"
            className="w-full rounded-xl px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="델타"
            className="w-full rounded-xl px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setDelta(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="감마"
            className="w-full rounded-xl px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setGamma(parseFloat(e.target.value))}
          />
          <input
            type="number"
            placeholder="남은 만기일 (일)"
            className="w-full rounded-xl px-4 py-3 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setDaysToExpiry(parseInt(e.target.value))}
          />
        </div>

        <div className="text-center">
          <button
            onClick={calculateReturn}
            className="mt-4 w-full bg-black text-white py-3 rounded-full text-lg font-medium hover:bg-neutral-800 transition-all"
          >
            수익률 계산하기
          </button>
        </div>

        {result && (
          <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800 p-5 space-y-2 text-neutral-800 dark:text-neutral-100 shadow-sm">
            <div>📈 <strong>예상 수익률:</strong> {result.roi}%</div>
            <div>📏 <strong>옵션 거리:</strong> {result.distance}</div>
            <div>🎯 <strong>성공 확률 추정:</strong> {result.successRate}%</div>
          </div>
        )}

        <div className="pt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {isTradable() ? "✅ D-3 이상: 거래 가능" : "🚫 D-3 이하: 거래 주의"}
        </div>
      </div>
    </div>
  );
}
