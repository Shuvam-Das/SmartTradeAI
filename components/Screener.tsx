

import React, { useState } from 'react';
import FilterIcon from './icons/FilterIcon';
import { Stock } from '../types';
import WaveformIcon from './icons/WaveformIcon';
import NewspaperIcon from './icons/NewspaperIcon';
import StockDetailsModal from './StockDetailsModal';
import { getStockDetails } from '../services/geminiService';
import InfoIcon from './icons/InfoIcon';

const FilterInput: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
    {children}
  </div>
);

const allMockResults: Stock[] = [
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 7120.80, change: 120.30, changePercent: 1.72 },
    { symbol: 'TITAN', name: 'Titan Company Ltd', price: 3540.10, change: 55.00, changePercent: 1.58 },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', price: 2905.60, change: 25.10, changePercent: 0.87 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2480.90, change: -5.40, changePercent: -0.22 },
    { symbol: 'INFY', name: 'Infosys Ltd', price: 1450.30, change: -15.10, changePercent: -1.03 }, // Made oversold
    { symbol: 'WIPRO', name: 'Wipro Ltd', price: 450.75, change: -8.20, changePercent: -1.79 }, // Made oversold
];

const Screener: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Stock[]>([]);
    
    // State for new filters
    const [marketCap, setMarketCap] = useState('any');
    const [sector, setSector] = useState('any');
    const [rsi, setRsi] = useState('any');
    const [macd, setMacd] = useState('any');
    const [sentiment, setSentiment] = useState('any');
    const [aiQuery, setAiQuery] = useState('');

    // State for details modal
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalLoading, setIsModalLoading] = useState(false);


    const handleRunScreen = () => {
        setIsLoading(true);
        setResults([]);
        console.log("Running screen with filters:", { marketCap, sector, rsi, macd, sentiment, aiQuery });

        // Simulate API call and filtering
        setTimeout(() => {
            let filteredResults = allMockResults;

            if(rsi === 'oversold') {
                 // Return specific stocks for this mock
                filteredResults = allMockResults.filter(s => ['INFY', 'WIPRO'].includes(s.symbol));
            } else if (rsi === 'overbought') {
                filteredResults = allMockResults.filter(s => ['BAJFINANCE'].includes(s.symbol));
            }

            if(sector !== 'any') {
                if(sector.toLowerCase() === 'it') {
                    filteredResults = filteredResults.filter(s => ['INFY', 'WIPRO'].includes(s.symbol));
                }
            }

            setResults(filteredResults);
            setIsLoading(false);
        }, 2000);
    };
    
    const handleAiPreset = (query: string, presetRsi: string, presetSector: string) => {
        setAiQuery(query);
        setRsi(presetRsi);
        setSector(presetSector);
    }

    const handleOpenDetails = async (stock: Stock) => {
        setSelectedStock(stock);
        setIsModalOpen(true);
        setIsModalLoading(true);
        try {
            const details = await getStockDetails(stock.symbol);
            setSelectedStock({ ...stock, details });
        } catch (error) {
            console.error("Failed to fetch stock details", error);
            // In a real app, you might set an error state here
        } finally {
            setIsModalLoading(false);
        }
    };

  return (
    <>
    <div>
      <h3 className="text-3xl font-medium text-white mb-6 flex items-center">
        <FilterIcon className="w-8 h-8 mr-3 text-indigo-400"/>
        Stock Screener
      </h3>
      
       {/* AI Screener */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
         <h4 className="text-xl font-semibold text-white mb-4">AI-Powered Screener</h4>
         <textarea
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="e.g., 'Find undervalued gems in the banking sector with strong growth potential'"
            rows={2}
            className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500 resize-none"
        />
        <div className="flex flex-wrap gap-2 mt-3">
             <button onClick={() => setAiQuery("High-Growth Momentum Stocks")} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Momentum Stocks</button>
             <button onClick={() => setAiQuery("Quality Dividend Payers")} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Dividend Payers</button>
             <button onClick={() => handleAiPreset("Find Oversold Tech Stocks", "oversold", "IT")} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Oversold Tech Stocks</button>
        </div>
      </div>

      {/* Manual Filters */}
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <h4 className="text-xl font-semibold text-white mb-4">Manual Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FilterInput label="Market Cap">
            <select value={marketCap} onChange={(e) => setMarketCap(e.target.value)} className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <option value="any">Any</option>
              <option value="large">Large Cap (&gt; 20,000 Cr)</option>
              <option value="mid">Mid Cap (5,000 - 20,000 Cr)</option>
              <option value="small">Small Cap (&lt; 5,000 Cr)</option>
            </select>
          </FilterInput>
          <FilterInput label="Sector">
            <select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <option value="any">Any</option>
              <option value="IT">IT</option>
              <option value="Banking">Banking</option>
              <option value="Energy">Energy</option>
              <option value="Automobile">Automobile</option>
              <option value="FMCG">FMCG</option>
            </select>
          </FilterInput>
           <FilterInput label="P/E Ratio">
             <input type="range" min="0" max="100" defaultValue="50" className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
             <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0</span>
                <span>50</span>
                <span>100+</span>
             </div>
          </FilterInput>
        </div>
        
        {/* Advanced Filters */}
        <div className="mt-6 border-t border-slate-700 pt-6">
             <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><WaveformIcon className="w-5 h-5 mr-2 text-indigo-400"/>Technical Indicators</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FilterInput label="RSI (14)">
                     <select value={rsi} onChange={(e) => setRsi(e.target.value)} className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        <option value="any">Any</option>
                        <option value="oversold">Oversold (&lt; 30)</option>
                        <option value="overbought">Overbought (&gt; 70)</option>
                        <option value="neutral">Neutral (30-70)</option>
                    </select>
                </FilterInput>
                <FilterInput label="MACD Crossover">
                     <select value={macd} onChange={(e) => setMacd(e.target.value)} className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        <option value="any">Any</option>
                        <option value="bullish">Bullish Crossover</option>
                        <option value="bearish">Bearish Crossover</option>
                    </select>
                </FilterInput>
             </div>
        </div>
        <div className="mt-6 border-t border-slate-700 pt-6">
             <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><NewspaperIcon className="w-5 h-5 mr-2 text-indigo-400"/>Market Sentiment</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FilterInput label="News Sentiment">
                     <select value={sentiment} onChange={(e) => setSentiment(e.target.value)} className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                        <option value="any">Any</option>
                        <option value="positive">Positive</option>
                        <option value="neutral">Neutral</option>
                        <option value="negative">Negative</option>
                    </select>
                </FilterInput>
             </div>
        </div>

        <div className="mt-6 border-t border-slate-700 pt-6">
             <button 
                onClick={handleRunScreen}
                disabled={isLoading}
                className="w-full md:w-auto bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Screening...' : 'Run Screen'}
            </button>
        </div>
      </div>

      <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-lg">
         <h4 className="text-xl font-semibold text-white mb-4">Results ({results.length})</h4>
         {isLoading && (
              <div className="text-center text-slate-400 py-16">
                 <div className="flex justify-center items-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
                 </div>
                 <p className="mt-4">Finding matching stocks...</p>
              </div>
         )}
         {!isLoading && results.length === 0 && (
             <div className="text-center text-slate-500 py-16">
                <p className="text-lg">Screening results will appear here</p>
                <p className="text-sm mt-2">Configure your filters above and click "Run Screen" to find stocks.</p>
             </div>
         )}
         {!isLoading && results.length > 0 && (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-700 text-sm text-slate-400">
                        <th className="py-3 px-4 font-medium">Symbol</th>
                        <th className="py-3 px-4 font-medium">Price (₹)</th>
                        <th className="py-3 px-4 font-medium">Change (%)</th>
                        <th className="py-3 px-4 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((stock) => (
                            <tr key={stock.symbol} className="border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="py-3 px-4">
                                    <div className="font-bold text-slate-200">{stock.symbol}</div>
                                    <div className="text-xs text-slate-400">{stock.name}</div>
                                </td>
                                <td className="py-3 px-4 text-slate-200 font-mono">{stock.price.toFixed(2)}</td>
                                <td className={`py-3 px-4 font-mono ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {stock.changePercent.toFixed(2)}%
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <button
                                        onClick={() => handleOpenDetails(stock)}
                                        className="bg-slate-700 text-slate-300 text-xs font-bold py-1 px-3 rounded-md hover:bg-slate-600 transition-colors flex items-center mx-auto"
                                    >
                                        <InfoIcon className="w-4 h-4 mr-1.5"/>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         )}
      </div>
    </div>
    {isModalOpen && selectedStock && (
        <StockDetailsModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            stock={selectedStock}
            isLoading={isModalLoading}
        />
    )}
    </>
  );
};

export default Screener;