
import React, { useState } from 'react';
import FilterIcon from './icons/FilterIcon';
import { Stock } from '../types';

const FilterInput: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
    {children}
  </div>
);

const mockResults: Stock[] = [
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 7120.80, change: 120.30, changePercent: 1.72 },
    { symbol: 'TITAN', name: 'Titan Company Ltd', price: 3540.10, change: 55.00, changePercent: 1.58 },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', price: 2905.60, change: 25.10, changePercent: 0.87 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2480.90, change: -5.40, changePercent: -0.22 },
];

const Screener: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Stock[]>([]);

    const handleRunScreen = () => {
        setIsLoading(true);
        setResults([]);
        setTimeout(() => {
            setResults(mockResults);
            setIsLoading(false);
        }, 2000);
    };

  return (
    <div>
      <h3 className="text-3xl font-medium text-white mb-6 flex items-center">
        <FilterIcon className="w-8 h-8 mr-3 text-indigo-400"/>
        Stock Screener
      </h3>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FilterInput label="Market Cap">
            <select className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <option>Any</option>
              <option>Large Cap (&gt; 20,000 Cr)</option>
              <option>Mid Cap (5,000 - 20,000 Cr)</option>
              <option>Small Cap (&lt; 5,000 Cr)</option>
            </select>
          </FilterInput>
          <FilterInput label="Sector">
            <select className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <option>Any</option>
              <option>IT</option>
              <option>Banking</option>
              <option>Energy</option>
              <option>Automobile</option>
              <option>FMCG</option>
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
           <FilterInput label="Dividend Yield (%)">
             <input type="number" placeholder="> 1.0" className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
          </FilterInput>
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
                        <th className="py-3 px-4 font-medium">Market Cap (Cr)</th>
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
                                <td className="py-3 px-4 text-slate-200 font-mono">{(Math.random() * 100000 + 50000).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         )}
      </div>
    </div>
  );
};

export default Screener;
