

import React, { useState } from 'react';
import { Stock } from '../types';
import ChartIcon from './icons/ChartIcon';

interface StockDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
  isLoading: boolean;
}

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-slate-700/50">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="font-semibold font-mono text-slate-200">{value}</span>
    </div>
);

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            active ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700'
        }`}
    >
        {children}
    </button>
);

const StockDetailsModal: React.FC<StockDetailsModalProps> = ({ isOpen, onClose, stock, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'ai'>('overview');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl border border-slate-700 relative flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700 flex-shrink-0">
            <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="text-2xl font-bold text-white">{stock.name}</h3>
            <p className="text-slate-400">{stock.symbol}</p>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
            {isLoading ? (
                 <div className="flex items-center justify-center h-full min-h-[300px] space-x-2 text-slate-400">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
                    <span>Fetching detailed analysis...</span>
                </div>
            ) : !stock.details ? (
                <div className="text-center text-slate-500 min-h-[300px] flex items-center justify-center">
                    <p>Could not load stock details.</p>
                </div>
            ) : (
                <>
                    <div className="mb-6">
                        <div className="flex space-x-2 p-1 bg-slate-900/50 rounded-lg">
                            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</TabButton>
                            <TabButton active={activeTab === 'financials'} onClick={() => setActiveTab('financials')}>Financials</TabButton>
                            <TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')}>AI Rationale</TabButton>
                        </div>
                    </div>
                    <div className="text-sm text-slate-300 leading-relaxed">
                        {activeTab === 'overview' && <p>{stock.details.overview}</p>}
                        {activeTab === 'financials' && (
                            <div className="space-y-2">
                                <StatItem label="Market Cap" value={stock.details.marketCap} />
                                <StatItem label="P/E Ratio" value={stock.details.peRatio} />
                                <StatItem label="Dividend Yield" value={stock.details.dividendYield} />
                                <StatItem label="EPS (TTM)" value={stock.details.eps} />
                                <StatItem label="Book Value" value={stock.details.bookValue} />
                            </div>
                        )}
                        {activeTab === 'ai' && <p>{stock.details.aiRationale}</p>}
                    </div>
                </>
            )}
        </div>
        
        <div className="p-4 bg-slate-900/50 border-t border-slate-700 flex-shrink-0 text-right">
             <button onClick={onClose} className="py-2 px-6 text-sm font-semibold bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors">
                Close
            </button>
        </div>

      </div>
    </div>
  );
};

export default StockDetailsModal;