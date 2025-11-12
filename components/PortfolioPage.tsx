import React, { useState, useEffect } from 'react';
import { Holding } from '../types';
import PortfolioIcon from './icons/PortfolioIcon';

const mockHoldings: Holding[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3010.55, change: 45.10, changePercent: 1.52, quantity: 50, avgPrice: 2850.00 },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 3850.20, change: -12.75, changePercent: -0.33, quantity: 25, avgPrice: 3900.50 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1680.75, change: 8.40, changePercent: 0.50, quantity: 100, avgPrice: 1550.25 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 7120.80, change: 120.30, changePercent: 1.72, quantity: 15, avgPrice: 6500.00 },
  { symbol: 'TATA MOTORS', name: 'Tata Motors Ltd', price: 985.40, change: 5.10, changePercent: 0.52, quantity: 200, avgPrice: 910.80 },
];

const PortfolioPage: React.FC = () => {
    const [holdings, setHoldings] = useState<Holding[]>(mockHoldings);
    const [updatedSymbols, setUpdatedSymbols] = useState<Set<string>>(new Set());


    useEffect(() => {
        const interval = setInterval(() => {
            const symbolsThatUpdated = new Set<string>();

            setHoldings(prevHoldings => 
                prevHoldings.map(holding => {
                    if (Math.random() > 0.4) { // 60% chance to update
                        const priceChange = (Math.random() - 0.5) * (holding.price / 200);
                        const newPrice = holding.price + priceChange;
                        symbolsThatUpdated.add(holding.symbol);
                        return { ...holding, price: newPrice };
                    }
                    return holding;
                })
            );

            if (symbolsThatUpdated.size > 0) {
                setUpdatedSymbols(prev => new Set([...prev, ...symbolsThatUpdated]));
                setTimeout(() => {
                setUpdatedSymbols(prev => {
                    const next = new Set(prev);
                    symbolsThatUpdated.forEach(symbol => next.delete(symbol));
                    return next;
                });
                }, 700);
            }
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const calculateTotals = () => {
        const totalInvestment = holdings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
        const currentValue = holdings.reduce((acc, h) => acc + (h.quantity * h.price), 0);
        const totalPL = currentValue - totalInvestment;
        const totalPLPercent = (totalPL / totalInvestment) * 100;
        return { totalInvestment, currentValue, totalPL, totalPLPercent };
    };
    
    const totals = calculateTotals();

    return (
        <div>
            <h3 className="text-3xl font-medium text-white mb-6 flex items-center">
                <PortfolioIcon className="w-8 h-8 mr-3 text-indigo-400"/>
                My Portfolio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-sm font-medium text-slate-400">Total Investment</h4>
                    <p className="text-2xl font-bold text-white mt-2">₹{totals.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                </div>
                 <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-sm font-medium text-slate-400">Current Value</h4>
                    <p className="text-2xl font-bold text-white mt-2">₹{totals.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
                </div>
                 <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-sm font-medium text-slate-400">Overall P&L</h4>
                     <p className={`text-2xl font-bold mt-2 ${totals.totalPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {totals.totalPL >= 0 ? '+' : ''}₹{totals.totalPL.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                     </p>
                </div>
                 <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-sm font-medium text-slate-400">P&L %</h4>
                     <p className={`text-2xl font-bold mt-2 ${totals.totalPLPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {totals.totalPLPercent.toFixed(2)}%
                    </p>
                </div>
            </div>

            <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                    <thead className="bg-slate-900/50">
                        <tr className="text-sm text-slate-400">
                            <th className="py-3 px-4 font-medium">Instrument</th>
                            <th className="py-3 px-4 font-medium text-right">Qty.</th>
                            <th className="py-3 px-4 font-medium text-right">Avg. Cost (₹)</th>
                            <th className="py-3 px-4 font-medium text-right">LTP (₹)</th>
                            <th className="py-3 px-4 font-medium text-right">Unrealized P&L (₹)</th>
                            <th className="py-3 px-4 font-medium text-right">Unrealized P&L (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings.map((h) => {
                            const pnl = (h.price - h.avgPrice) * h.quantity;
                            const pnlPercent = ((h.price - h.avgPrice) / h.avgPrice) * 100;
                            const isPositive = pnl >= 0;
                            const isUpdated = updatedSymbols.has(h.symbol);
                            const updateClass = isUpdated ? (isPositive ? 'bg-green-500/20' : 'bg-red-500/20') : '';

                            return (
                                <tr key={h.symbol} className={`border-t border-slate-700 hover:bg-slate-700/50 transition-colors duration-700 ${updateClass}`}>
                                    <td className="py-3 px-4">
                                        <div className="font-bold text-slate-200">{h.symbol}</div>
                                        <div className="text-xs text-slate-400">{h.name}</div>
                                    </td>
                                    <td className="py-3 px-4 text-slate-200 font-mono text-right">{h.quantity}</td>
                                    <td className="py-3 px-4 text-slate-200 font-mono text-right">{h.avgPrice.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-slate-200 font-mono text-right">{h.price.toFixed(2)}</td>
                                    <td className={`py-3 px-4 font-mono text-right ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                        {pnl.toFixed(2)}
                                    </td>
                                    <td className={`py-3 px-4 font-mono text-right ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                        {pnlPercent.toFixed(2)}%
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;