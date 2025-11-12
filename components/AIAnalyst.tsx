import React, { useState } from 'react';
import { getAIAnalysis } from '../services/geminiService';
import AIIcon from './icons/AIIcon';

// Mock data for context selectors
const mockSymbols = ['None', 'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN', 'BAJFINANCE', 'TATA MOTORS'];
const mockSectors = ['None', 'IT', 'Banking', 'Energy', 'Automobile', 'FMCG', 'Pharmaceutical'];

const Selector: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[]}> = ({ label, value, onChange, options }) => (
    <div className="flex-1">
    <label htmlFor={label} className="block text-xs font-medium text-slate-400 mb-1">
        {label}
    </label>
    <select
        id={label}
        value={value}
        onChange={onChange}
        className="w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
    >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    </div>
);


const AIAnalyst: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('None');
  const [selectedSector, setSelectedSector] = useState<string>('None');

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse('');

    let fullPrompt = prompt;
    let prefix = '';

    if (selectedSymbol !== 'None' && selectedSector !== 'None') {
        prefix = `For the stock ${selectedSymbol} in the ${selectedSector} sector: `;
    } else if (selectedSymbol !== 'None') {
        prefix = `For the stock ${selectedSymbol}: `;
    } else if (selectedSector !== 'None') {
        prefix = `For the ${selectedSector} sector: `;
    }
    
    fullPrompt = prefix + prompt;

    try {
      const aiResponse = await getAIAnalysis(fullPrompt);
      setResponse(aiResponse);
    } catch (error) {
      setResponse('Failed to get analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePresetClick = (presetPrompt: string) => {
    setPrompt(presetPrompt);
    setSelectedSymbol('None');
    setSelectedSector('None');
  };
  
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <AIIcon className="w-6 h-6 mr-3 text-indigo-400" />
        AI Analyst
      </h3>
      
      <div className="mb-4">
        <p className="text-sm text-slate-400 mb-2">Try asking:</p>
        <div className="flex flex-wrap gap-2">
            <button onClick={() => handlePresetClick("Analyze my portfolio for risks")} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Analyze my portfolio</button>
            <button onClick={() => handlePresetClick("What is your view on Nifty 50 this week?")} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Nifty 50 view</button>
            <button onClick={() => handlePresetClick("Suggest a good long-term stock in the EV sector")} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">EV stock suggestion</button>
        </div>
      </div>

       <div className="mb-4">
         <p className="text-sm text-slate-400 mb-2">Add context (optional):</p>
         <div className="flex gap-4">
            <Selector label="Stock Symbol" value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)} options={mockSymbols} />
            <Selector label="Market Sector" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} options={mockSectors} />
         </div>
       </div>

      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask for trade ideas, portfolio analysis, or market trends..."
          rows={3}
          className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-indigo-500 resize-none"
        />
        <button
          onClick={handleAskAI}
          disabled={isLoading}
          className="mt-2 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Thinking...' : 'Get Insights'}
        </button>
      </div>

      {(isLoading || response) && (
        <div className="mt-4 flex-1 min-h-0">
          <div className="bg-slate-900/50 border border-slate-700 rounded-md h-full overflow-y-auto p-4">
            <h4 className="font-semibold text-slate-300 mb-2">AI Response:</h4>
            {isLoading && !response && (
              <div className="flex items-center space-x-2 text-slate-400">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                <span>Analyzing data...</span>
              </div>
            )}
            <p className="text-sm text-slate-300 whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalyst;