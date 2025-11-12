
import React, { useState } from 'react';
import { Stock } from '../types';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock;
  onOrderSubmit: (order: any) => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose, stock, onOrderSubmit }) => {
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderSubmit({
      symbol: stock.symbol,
      type: orderType,
      quantity,
      price: stock.price, // Assuming market order for simplicity
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 border border-slate-700 relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h3 className="text-2xl font-bold text-white mb-2">Place Order</h3>
        <p className="text-slate-400 mb-6">for {stock.name} ({stock.symbol})</p>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                    type="button"
                    onClick={() => setOrderType('BUY')}
                    className={`w-full py-3 font-bold rounded-md transition-colors ${orderType === 'BUY' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    BUY
                </button>
                <button 
                    type="button"
                    onClick={() => setOrderType('SELL')}
                    className={`w-full py-3 font-bold rounded-md transition-colors ${orderType === 'SELL' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    SELL
                </button>
            </div>
            
            <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-400 mb-2">Quantity</label>
                <input 
                    type="number" 
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                    min="1"
                    className="w-full p-3 text-lg text-slate-200 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="bg-slate-900/50 p-4 rounded-md text-sm">
                <div className="flex justify-between items-center text-slate-400">
                    <span>Order Type</span>
                    <span className="font-semibold text-slate-200">Market</span>
                </div>
                 <div className="flex justify-between items-center text-slate-400 mt-2">
                    <span>Market Price</span>
                    <span className="font-semibold text-slate-200 font-mono">~ ₹{stock.price.toFixed(2)}</span>
                </div>
                 <hr className="my-3 border-slate-700" />
                 <div className="flex justify-between items-center text-slate-300">
                    <span className="font-bold">Estimated Cost</span>
                    <span className="font-bold text-white font-mono">₹{(stock.price * quantity).toLocaleString('en-IN', {maximumFractionDigits: 2})}</span>
                </div>
            </div>

            <div className="mt-6">
                 <button 
                    type="submit"
                    className={`w-full py-3 font-bold text-white rounded-md transition-colors ${orderType === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                    Place {orderType} Order
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default TradeModal;
