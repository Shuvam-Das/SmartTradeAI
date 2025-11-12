
import React from 'react';
import PortfolioSummary from './PortfolioSummary';
import Watchlist from './Watchlist';
import PnLChart from './PnLChart';
import Alerts from './Alerts';
import AIAnalyst from './AIAnalyst';
import { PortfolioSummaryData, Alert } from '../types';

interface DashboardProps {
    summaryData: PortfolioSummaryData;
    alerts: Alert[];
}

const Dashboard: React.FC<DashboardProps> = ({ summaryData, alerts }) => {
  return (
    <div>
      <h3 className="text-3xl font-medium text-white">Dashboard</h3>
      <PortfolioSummary summaryData={summaryData} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <PnLChart />
        </div>
        <div>
            <Alerts alerts={alerts} />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div>
            <Watchlist />
        </div>
         <div>
            <AIAnalyst />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
