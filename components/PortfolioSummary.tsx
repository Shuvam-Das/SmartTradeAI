
import React from 'react';
import { PortfolioSummaryData } from '../types';

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


const PortfolioSummary: React.FC<{summaryData: PortfolioSummaryData}> = ({ summaryData }) => {
  
  const todaysPLPercentage = (summaryData.totalValue > 0 && summaryData.totalValue - summaryData.todaysPL !== 0) 
    ? (summaryData.todaysPL / (summaryData.totalValue - summaryData.todaysPL)) * 100 
    : 0;

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
