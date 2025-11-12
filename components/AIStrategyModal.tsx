
import React, { useState, useEffect } from 'react';
import { Holding } from '../types';
import RobotIcon from './icons/RobotIcon';
import { getAIAnalysis } from '../services/geminiService';

interface AIStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  holding: Holding;
  onConfirm: (strategy: any) => void;
}

const SimpleMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  return (
    <div>
      {lines.map((line, index) => {
        if (line.trim().startsWith('*')) {
          const boldedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return <p key={index} className="my-2 pl-4" dangerouslySetInnerHTML={{ __html: boldedLine.replace('*', '•') }}></p>;
        }
        if (line.includes('**')) {
           const boldedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
           return <p key={index} className="font-semibold text-slate-200" dangerouslySetInnerHTML={{ __html: boldedLine }}></p>
        }
        return <p key={index} className="my-1">{line}</p>;
      })}
    </div>
  );
};

const AIStrategyModal: React.FC<AIStrategyModalProps> = ({ isOpen, onClose, holding, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [strategyText, setStrategyText] = useState('');
  
  // Hardcoded for mock purposes
  const profitTargetPercent = 0.10; // +10%
  const stopLossPercent = 0.05; // -5%

  const targetPrice = holding.price * (1 + profitTargetPercent);
  const stopLossPrice = holding.price * (1 - stopLossPercent);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getAIAnalysis(`Generate profit booking strategy for ${holding.symbol}`)
        .then(response => {
          setStrategyText(response);
          setIsLoading(false);
        });
    }
  }, [isOpen, holding.symbol]);


  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({
        symbol: holding.symbol,
        targetPrice,
        stopLossPrice,
        activationPrice: holding.price,
        quantity: holding.quantity,
        avgPrice: holding.avgPrice,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-slate-700 relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="flex items-center mb-4">
            <RobotIcon className="w-8 h-8 mr-3 text-indigo-400" />
            <h3 className="text-2xl font-bold text-white">Activate AI Agent</h3>
        </div>
        <p className="text-slate-400 mb-6">Review the AI-generated profit booking strategy for <span className="font-bold text-slate-200">{holding.name} ({holding.symbol})</span>.</p>
        
        <div className="bg-slate-900/50 p-4 rounded-md text-sm text-slate-300 min-h-[200px]">
            {isLoading ? (
                <div className="flex items-center justify-center h-full space-x-2 text-slate-400">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                    <span>Generating optimal strategy...</span>
              </div>
            ) : (
                <SimpleMarkdownRenderer text={strategyText} />
            )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-500/10 p-4 rounded-md">
                <p className="text-sm text-green-400 font-semibold">Profit Target</p>
                <p className="text-xl font-bold text-white font-mono mt-1">₹{targetPrice.toFixed(2)}</p>
                <p className="text-xs text-slate-400">(+{profitTargetPercent * 100}%)</p>
            </div>
             <div className="bg-red-500/10 p-4 rounded-md">
                <p className="text-sm text-red-400 font-semibold">Stop-Loss</p>
                <p className="text-xl font-bold text-white font-mono mt-1">₹{stopLossPrice.toFixed(2)}</p>
                 <p className="text-xs text-slate-400">(-{stopLossPercent * 100}%)</p>
            </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
            <button onClick={onClose} className="py-2 px-4 text-sm font-semibold bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors">
                Cancel
            </button>
            <button 
                onClick={handleConfirm}
                disabled={isLoading}
                className="py-2 px-6 text-sm font-semibold bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center"
            >
                <RobotIcon className="w-5 h-5 mr-2" />
                Activate AI Agent
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIStrategyModal;
