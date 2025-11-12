
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PnlDataPoint } from '../types';

const pnlData: PnlDataPoint[] = [
  { date: 'Jan', pnl: 20000 },
  { date: 'Feb', pnl: 25000 },
  { date: 'Mar', pnl: 18000 },
  { date: 'Apr', pnl: 35000 },
  { date: 'May', pnl: 42000 },
  { date: 'Jun', pnl: 55000 },
  { date: 'Jul', pnl: 65000 },
  { date: 'Aug', pnl: 58000 },
  { date: 'Sep', pnl: 72000 },
  { date: 'Oct', pnl: 85000 },
  { date: 'Nov', pnl: 92000 },
  { date: 'Dec', pnl: 105000 },
];

const PnLChart: React.FC = () => {
    // The Recharts library is loaded from a CDN and available globally.
    // This component assumes its presence on the window object.

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg h-[400px]">
       <h3 className="text-xl font-semibold text-white mb-4">Portfolio P&L Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={pnlData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <defs>
            <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
          <YAxis stroke="#9ca3af" tickFormatter={(value) => `₹${Number(value) / 1000}k`} tick={{ fill: '#9ca3af' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              color: '#d1d5db',
            }}
            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'P&L']}
          />
          <Area type="monotone" dataKey="pnl" stroke="#6366f1" fillOpacity={1} fill="url(#colorPnl)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PnLChart;
