import React from 'react';
import { PortfolioSummaryData } from '../types';
import RupeeIcon from './icons/RupeeIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; change?: number; isPL?: boolean; }> = ({ title, value, icon, change, isPL }) => {
  const isPositive = change !== undefined && change >= 0;
  
  let changeColor = 'text-slate-400';
  if(change !== undefined) {
    changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  }

  let valueColor = 'text-white';
  if(isPL) {
    valueColor = isPositive ? 'text-green-400' : 'text-red-400';
  }

  const changeIcon = isPositive ? '↑' : '↓';

  return (
    <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg border border-slate-700/50 flex items-center space-x-4">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-slate-700/50">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-slate-400">{title}</h4>
        <div className="mt-1 flex items-baseline">
            <p className={`text-2xl font-bold ${valueColor} transition-colors duration-500`}>{value}</p>
            {change !== undefined && (
                <span className={`ml-2 text-sm font-semibold ${changeColor} transition-colors duration-500 flex items-center`}>
                {changeIcon} {Math.abs(change).toFixed(2)}%
                </span>
            )}
        </div>
      </div>
    </div>
  );
};


const PortfolioSummary: React.FC<{summaryData: PortfolioSummaryData}> = ({ summaryData }) => {
  
  const todaysPLPercentage = (summaryData.totalValue > 0 && summaryData.totalValue - summaryData.todaysPL !== 0) 
    ? (summaryData.todaysPL / (summaryData.totalValue - summaryData.todaysPL)) * 100 
    : 0;
    
  const totalPLPercentage = (summaryData.totalValue > 0 && summaryData.totalValue - summaryData.totalPL !== 0) 
    ? (summaryData.totalPL / (summaryData.totalValue - summaryData.totalPL)) * 100 
    : 0;

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Portfolio Value"
        value={`₹${summaryData.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={<RupeeIcon className="w-6 h-6 text-indigo-400" />}
      />
      <StatCard
        title="Today's P&L"
        value={`${summaryData.todaysPL >= 0 ? '+' : ''}₹${summaryData.todaysPL.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={todaysPLPercentage}
        isPL={true}
        icon={<TrendingUpIcon className="w-6 h-6 text-green-400" />}
      />
      <StatCard
        title="Overall P&L"
        value={`${summaryData.totalPL >= 0 ? '+' : ''}₹${summaryData.totalPL.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        change={totalPLPercentage}
        isPL={true}
        icon={<TrendingUpIcon className="w-6 h-6 text-purple-400" />}
      />
    </div>
  );
};

export default PortfolioSummary;
