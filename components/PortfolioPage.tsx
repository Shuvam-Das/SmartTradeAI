
import React, { useState, useEffect } from 'react';
import { Holding } from '../types';
import PortfolioIcon from './icons/PortfolioIcon';
import RobotIcon from './icons/RobotIcon';
import AIStrategyModal from './AIStrategyModal';

interface PortfolioPageProps {
    holdings: Holding[];
    onActivateStrategy: (strategy: any) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ holdings, onActivateStrategy }) => {
    const [updatedSymbols, setUpdatedSymbols] = useState<Set<string>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);

    // This effect is now just for the flashing animation, as data comes from props
    useEffect(() => {
        const symbolsThatUpdated = new Set<string>();
        holdings.forEach(h => symbolsThatUpdated.add(h.symbol)); // Assume all might have updated

        if (symbolsThatUpdated.size > 0) {
            setUpdatedSymbols(prev => new Set([...prev, ...symbolsThatUpdated]));
            const timer = setTimeout(() => {
              setUpdatedSymbols(new Set());
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [holdings]);

    const calculateTotals = () => {
        const totalInvestment = holdings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
        const currentValue = holdings.reduce((acc, h) => acc + (h.quantity * h.price), 0);
        const totalPL = currentValue - totalInvestment;
        const totalPLPercent = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;
        return { totalInvestment, currentValue, totalPL, totalPLPercent };
    };
    
    const totals = calculateTotals();

    const handleActivateClick = (holding: Holding) => {
        setSelectedHolding(holding);
        setIsModalOpen(true);
    };

    const handleConfirmStrategy = (strategy: any) => {
        onActivateStrategy(strategy);
        setIsModalOpen(false);
        setSelectedHolding(null);
    }

    return (
        <>
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
                            <th className="py-3 px-4 font-medium text-right">P&L (%)</th>
                            <th className="py-3 px-4 font-medium text-center">AI Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings.map((h) => {
                            const pnlPercent = ((h.price - h.avgPrice) / h.avgPrice) * 100;
                            const isPositive = pnlPercent >= 0;
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
                                        {pnlPercent.toFixed(2)}%
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {h.aiStrategyActive ? (
                                            <div className="flex items-center justify-center text-sm font-semibold text-indigo-400">
                                                <RobotIcon className="w-5 h-5 mr-2 animate-pulse" />
                                                <span>Active</span>
                                            </div>
                                        ) : (
                                             <button 
                                                onClick={() => handleActivateClick(h)}
                                                className="bg-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center mx-auto"
                                             >
                                                <RobotIcon className="w-4 h-4 mr-1"/>
                                                Activate AI
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        {isModalOpen && selectedHolding && (
            <AIStrategyModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                holding={selectedHolding}
                onConfirm={handleConfirmStrategy}
            />
        )}
        </>
    );
};

export default PortfolioPage;
