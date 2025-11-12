
import React, { useState, useEffect } from 'react';
import { Stock } from '../types';

const mockWatchlist: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3010.55, change: 45.10, changePercent: 1.52 },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 3850.20, change: -12.75, changePercent: -0.33 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1680.75, change: 8.40, changePercent: 0.50 },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1595.90, change: -22.15, changePercent: -1.37 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', price: 1150.00, change: 15.60, changePercent: 1.38 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 840.45, change: 2.10, changePercent: 0.25 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 7120.80, change: 120.30, changePercent: 1.72 },
];

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>(mockWatchlist);
  const [updatedSymbols, setUpdatedSymbols] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      let symbolToUpdate: string | null = null;
      
      setWatchlist(prevList => {
        const newList = [...prevList];
        const randomIndex = Math.floor(Math.random() * newList.length);
        const stockToUpdate = { ...newList[randomIndex] };
        symbolToUpdate = stockToUpdate.symbol;

        const priceChange = (Math.random() - 0.5) * (stockToUpdate.price / 150); // smaller, more realistic ticks
        const newPrice = stockToUpdate.price + priceChange;

        stockToUpdate.price = newPrice;
        stockToUpdate.change += priceChange;
        stockToUpdate.changePercent = (stockToUpdate.change / (newPrice - stockToUpdate.change)) * 100;
        
        newList[randomIndex] = stockToUpdate;
        return newList;
      });

      if (symbolToUpdate) {
        const symbol = symbolToUpdate;
        setUpdatedSymbols(prev => new Set(prev).add(symbol));
        setTimeout(() => {
          setUpdatedSymbols(prev => {
            const next = new Set(prev);
            next.delete(symbol);
            return next;
          });
        }, 700);
      }
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg h-full">
      <h3 className="text-xl font-semibold text-white mb-4">My Watchlist</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-700 text-sm text-slate-400">
              <th className="py-3 px-4 font-medium">Symbol</th>
              <th className="py-3 px-4 font-medium">Price (₹)</th>
              <th className="py-3 px-4 font-medium">Change (₹)</th>
              <th className="py-3 px-4 font-medium">Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => {
              const isUpdated = updatedSymbols.has(stock.symbol);
              const priceJustChangedUp = isUpdated && stock.price > mockWatchlist.find(s => s.symbol === stock.symbol)!.price; // Simplified comparison for effect
               const priceJustChangedDown = isUpdated && stock.price < mockWatchlist.find(s => s.symbol === stock.symbol)!.price;


              const updateClass = isUpdated ? (priceJustChangedUp ? 'bg-green-500/20' : 'bg-red-500/20') : '';

              return (
              <tr key={stock.symbol} className={`border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-700 ${updateClass}`}>
                <td className="py-3 px-4">
                    <div className="font-bold text-slate-200">{stock.symbol}</div>
                    <div className="text-xs text-slate-400">{stock.name}</div>
                </td>
                <td className="py-3 px-4 text-slate-200 font-mono">{stock.price.toFixed(2)}</td>
                <td className={`py-3 px-4 font-mono ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change.toFixed(2)}
                </td>
                <td className={`py-3 px-4 font-mono ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.changePercent.toFixed(2)}%
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;
