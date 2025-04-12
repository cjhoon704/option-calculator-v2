'use client';

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function OptionCalculator() {
  const [entryPrice, setEntryPrice] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [strikePrice, setStrikePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [delta, setDelta] = useState(0);
  const [gamma, setGamma] = useState(0);
  const [daysToExpiry, setDaysToExpiry] = useState(0);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

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

  useEffect(() => {
    if (entryPrice === 0) return;
    const data = [];
    for (let price = currentPrice - 10; price <= currentPrice + 10; price += 1) {
      const roi = ((targetPrice - entryPrice) / entryPrice) * 100;
      data.push({ price, roi: parseFloat(roi.toFixed(2)) });
    }
    setChartData(data);
  }, [entryPrice, targetPrice, currentPrice]);

  const isTradable = () => daysToExpiry > 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight">
            옵션 계산기
          </h1>
        </div>

        <div className="space-y-4">
          {[{ label: '진입가', setter: setEntryPrice },
            { label: '목표가', setter: setTargetPrice },
            { label: '행사가', setter: setStrikePrice },
            { label: '현재가', setter: setCurrentPrice },
            { label: '델타', setter: setDelta },
            { label: '감마', setter: setGamma },
            { label: '남은 만기일 (일)', setter: (v) => setDaysToExpiry(parseInt(v)) }
          ].map((item, idx) => (
            <input
              key={idx}
              type="number"
              placeholder={item.label}
              onChange={(e) => item.setter(parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>

        <button
          onClick={calculateReturn}
          className="w-full mt-4 bg-black text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:bg-neutral-800 hover:scale-105 active:scale-95"
        >
          수익률 계산하기
        </button>

        {result && (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 space-y-2 text-neutral-800 dark:text-white mt-4 shadow-sm">
            <div><strong>수익률:</strong> {result.roi}%</div>
            <div><strong>거리:</strong> {result.distance}</div>
            <div><strong>성공 확률:</strong> {result.successRate}%</div>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="price" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line type="monotone" dataKey="roi" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 pt-4">
          {isTradable() ? "D-3 이상: 거래 가능" : "D-3 이하: 거래 주의"}
        </p>
      </div>
    </div>
  );
}
