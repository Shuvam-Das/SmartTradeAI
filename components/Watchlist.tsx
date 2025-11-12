import React, { useState, useEffect } from 'react';
import { Stock } from '../types';
import TradeModal from './TradeModal';

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
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const symbolsToUpdate = new Set<string>();
      
      setWatchlist(prevList => {
        const newList = [...prevList];
        // Update 1 to 3 stocks at a time for more dynamism
        const updateCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < updateCount; i++) {
            const randomIndex = Math.floor(Math.random() * newList.length);
            const stockToUpdate = { ...newList[randomIndex] };
            
            const priceChange = (Math.random() - 0.5) * (stockToUpdate.price / 150);
            const newPrice = stockToUpdate.price + priceChange;

            stockToUpdate.price = newPrice;
            stockToUpdate.change += priceChange;
            stockToUpdate.changePercent = (stockToUpdate.change / (newPrice - stockToUpdate.change)) * 100;
            
            newList[randomIndex] = stockToUpdate;
            symbolsToUpdate.add(stockToUpdate.symbol);
        }
        return newList;
      });

      if (symbolsToUpdate.size > 0) {
        setUpdatedSymbols(prev => new Set([...prev, ...symbolsToUpdate]));
        setTimeout(() => {
          setUpdatedSymbols(prev => {
            const next = new Set(prev);
            symbolsToUpdate.forEach(symbol => next.delete(symbol));
            return next;
          });
        }, 700);
      }
    }, 1500); // Update more frequently

    return () => clearInterval(interval);
  }, []);

  const handleTradeClick = (stock: Stock) => {
    setSelectedStock(stock);
    setIsTradeModalOpen(true);
  }

  const handleOrderPlaced = (order: any) => {
    console.log("Order placed:", order);
    // Here you would typically show a success toast/notification
  };

  return (
    <>
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg h-full">
        <h3 className="text-xl font-semibold text-white mb-4">My Watchlist</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 text-sm text-slate-400">
                <th className="py-3 px-4 font-medium">Symbol</th>
                <th className="py-3 px-4 font-medium">Price (₹)</th>
                <th className="py-3 px-4 font-medium">Change (%)</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((stock) => {
                const isUpdated = updatedSymbols.has(stock.symbol);
                const isPositiveChange = stock.change >= 0;
                const updateClass = isUpdated ? (isPositiveChange ? 'bg-green-500/20' : 'bg-red-500/20') : '';

                return (
                <tr key={stock.symbol} className={`border-b border-slate-700 hover:bg-slate-700/50 transition-colors duration-700 ${updateClass}`}>
                  <td className="py-3 px-4">
                      <div className="font-bold text-slate-200">{stock.symbol}</div>
                      <div className="text-xs text-slate-400">{stock.name}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-mono">{stock.price.toFixed(2)}</td>
                  <td className={`py-3 px-4 font-mono ${isPositiveChange ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => handleTradeClick(stock)}
                      className="bg-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isTradeModalOpen && selectedStock && (
        <TradeModal 
            isOpen={isTradeModalOpen} 
            onClose={() => setIsTradeModalOpen(false)}
            stock={selectedStock}
            onOrderSubmit={handleOrderPlaced}
        />
      )}
    </>
  );
};

export default Watchlist;