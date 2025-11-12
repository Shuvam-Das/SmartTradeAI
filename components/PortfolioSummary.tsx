
import React, { useState, useEffect } from 'react';
import { PortfolioSummaryData } from '../types';

const initialSummaryData: PortfolioSummaryData = {
  totalValue: 1256340.50,
  todaysPL: 12580.35,
  totalPL: 189450.75,
};

const StatCard: React.FC<{ title: string; value: string; change?: number; }> = ({ title, value, change }) => {
  const isPositive = change !== undefined && change >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const changeIcon = isPositive ? '↑' : '↓';

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
      <h4 className="text-sm font-medium text-slate-400">{title}</h4>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-bold text-white transition-colors duration-500">{value}</p>
        {change !== undefined && (
          <span className={`ml-2 text-md font-semibold ${changeColor} transition-colors duration-500`}>
            {changeIcon} {Math.abs(change).toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
};


const PortfolioSummary: React.FC = () => {
  const [summaryData, setSummaryData] = useState<PortfolioSummaryData>(initialSummaryData);

  useEffect(() => {
    const interval = setInterval(() => {
      setSummaryData(prevData => {
        // Simulate small, slightly positive-biased market fluctuations
        const valueChange = (Math.random() - 0.45) * (prevData.totalValue / 5000);
        const plChange = valueChange * (Math.random() * 0.4 + 0.8); // P&L change is related to value change
        
        return {
          totalValue: prevData.totalValue + valueChange,
          todaysPL: prevData.todaysPL + plChange,
          totalPL: prevData.totalPL + plChange,
        };
      });
    }, 1500); // Update every 1.5 seconds

    return () => clearInterval(interval);
  }, []);


  const todaysPLPercentage = (summaryData.todaysPL / (summaryData.totalValue - summaryData.todaysPL)) * 100;

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Portfolio Value"
        value={`₹${summaryData.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      />
      <StatCard
        title="Today's P&L"
        value={`₹${summaryData.todaysPL.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={todaysPLPercentage}
      />
      <StatCard
        title="Overall P&L"
        value={`₹${summaryData.totalPL.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
      />
    </div>
  );
};

export default PortfolioSummary;
