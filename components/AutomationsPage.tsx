
import React from 'react';
import { AIStrategy } from '../types';
import RobotIcon from './icons/RobotIcon';

const getStatusChip = (status: AIStrategy['status']) => {
    switch (status) {
        case 'active':
            return <span className="px-2 py-1 text-xs font-semibold text-green-300 bg-green-500/20 rounded-full">Active</span>;
        case 'completed':
            return <span className="px-2 py-1 text-xs font-semibold text-blue-300 bg-blue-500/20 rounded-full">Completed</span>;
        case 'cancelled':
            return <span className="px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-500/20 rounded-full">Cancelled</span>;
    }
}

interface AutomationsPageProps {
    strategies: AIStrategy[];
    onDeactivate: (symbol: string) => void;
}

const AutomationsPage: React.FC<AutomationsPageProps> = ({ strategies, onDeactivate }) => {
    return (
        <div>
            <h3 className="text-3xl font-medium text-white mb-6 flex items-center">
                <RobotIcon className="w-8 h-8 mr-3 text-indigo-400"/>
                AI Automations
            </h3>
            <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    {strategies.length === 0 ? (
                        <div className="text-center text-slate-500 py-24">
                            <p className="text-lg">No active AI automations</p>
                            <p className="text-sm mt-2">Activate an AI agent from your Portfolio page to see it here.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                        <thead className="bg-slate-900/50">
                            <tr className="text-sm text-slate-400">
                                <th className="py-3 px-4 font-medium">Instrument</th>
                                <th className="py-3 px-4 font-medium text-center">Status</th>
                                <th className="py-3 px-4 font-medium text-right">Qty.</th>
                                <th className="py-3 px-4 font-medium text-right">Avg. Cost (₹)</th>
                                <th className="py-3 px-4 font-medium text-right">Profit Target (₹)</th>
                                <th className="py-3 px-4 font-medium text-right">Stop-Loss (₹)</th>
                                <th className="py-3 px-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {strategies.map((s) => (
                                <tr key={s.symbol} className="border-t border-slate-700 hover:bg-slate-700/50">
                                    <td className="py-3 px-4">
                                        <div className="font-bold text-slate-200">{s.symbol}</div>
                                        <div className="text-xs text-slate-400">Activated: {new Date(s.createdAt).toLocaleString()}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">{getStatusChip(s.status)}</td>
                                    <td className="py-3 px-4 font-mono text-right">{s.quantity}</td>
                                    <td className="py-3 px-4 font-mono text-right">{s.avgPrice.toFixed(2)}</td>
                                    <td className="py-3 px-4 font-mono text-right text-green-400">{s.targetPrice.toFixed(2)}</td>
                                    <td className="py-3 px-4 font-mono text-right text-red-400">{s.stopLossPrice.toFixed(2)}</td>
                                    <td className="py-3 px-4 text-center">
                                        {s.status === 'active' ? (
                                             <button 
                                                onClick={() => onDeactivate(s.symbol)}
                                                className="bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-700 transition-colors"
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <span className="text-xs text-slate-500">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AutomationsPage;
