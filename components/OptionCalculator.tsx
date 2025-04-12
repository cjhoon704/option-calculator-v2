'use client';

import { useState } from "react";

export default function OptionCalculator() {
  const [entryPrice, setEntryPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [strikePrice, setStrikePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [delta, setDelta] = useState(0);
  const [gamma, setGamma] = useState(0);
  const [daysToExpiry, setDaysToExpiry] = useState(0);
  const [result, setResult] = useState(null);

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

  const isTradable = () => {
    return daysToExpiry > 3;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-10 px-4 transition-colors">
      <div className="max-w-xl mx-auto">
        <Card className="rounded-2xl shadow-lg bg-white dark:bg-neutral-800 transition-colors">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
              🎛️ 옵션 감성 계산기
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="진입가"
                className="rounded-xl px-4 py-2 dark:bg-neutral-700 dark:text-white"
                onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
              />
              <Input
                type="number"
                placeholder="목표가"
                className="rounded-xl px-4 py-2 dark:bg-neutral-700 dark:text-white"
                onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
              />
              <Input
                type="number"
                placeholder="행사가"
                className="rounded-xl px-4 py-2 dark:bg-neutral-700 dark:text-white"
                onChange={(e) => setStrikePrice(parseFloat(e.target.value))}
              />
              <Input
                type="number"
                placeholder="현재가"
                className="rounded-xl px-4 py-2 dark:bg-neutral-700 dark:text-white"
                onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
              />
              <Input
                type="number"
                placeholder="델타"
                className="rounded-xl px-4 py-2 dark:bg-neutral-700 dark:text-white"
                onChange={(e) => setDelta(parseFloat(e.target.value))}
              />
              <Input
                type="number"
                placeholder="감마"
                className="rounded-xl px-4 py-2 dark:bg-neutral-700 dark:text-white"
                onChange={(e) => setGamma(parseFloat(e.target.value))}
              />
              <Input
                type="number"
                placeholder="남은 만기일 (일)"
                className="rounded-xl px-4 py-2 dark:bg-neutral-700 dark:text-white"
                onChange={(e) => setDaysToExpiry(parseInt(e.target.value))}
              />
            </div>
            <div className="text-center">
              <Button 
                onClick={calculateReturn} 
                className="rounded-full bg-black text-white hover:bg-gray-800 px-6 py-2 transition-all">
                ✨ 수익률 계산하기
              </Button>
            </div>

            {result && (
              <div className="bg-neutral-100 dark:bg-neutral-700 rounded-xl p-4 space-y-2 text-gray-700 dark:text-gray-200">
                <div>📈 <strong>예상 수익률:</strong> {result.roi}%</div>
                <div>📏 <strong>옵션 거리:</strong> {result.distance}</div>
                <div>🎯 <strong>성공 확률 추정:</strong> {result.successRate}%</div>
              </div>
            )}

            <div className="pt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {isTradable() ? "✅ D-3 이상: 거래 가능" : "🚫 D-3 이하: 거래 주의"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
