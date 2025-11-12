import React, { useState } from 'react';
import { getAIAnalysis } from '../services/geminiService';
import AIIcon from './icons/AIIcon';

// Mock data for context selectors
const mockSymbols = ['None', 'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN', 'BAJFINANCE', 'TATA MOTORS'];
const mockSectors = ['None', 'IT', 'Banking', 'Energy', 'Automobile', 'FMCG', 'Pharmaceutical'];
const sentimentOptions = ['Neutral', 'Bullish', 'Bearish'];

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

const SimpleMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const parseLine = (line: string) => {
    // This regex splits the string by the bolded parts, keeping the delimiters
    const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </>
    );
  };

  const elements: React.ReactNode[] = [];
  let currentListItems: string[] = [];
  const lines = text.split('\n');

  const flushList = (key: string) => {
    if (currentListItems.length > 0) {
      elements.push(
        <ul key={key} className="list-disc list-inside space-y-1 my-2 pl-2">
          {currentListItems.map((item, itemIndex) => (
            <li key={itemIndex}>{parseLine(item)}</li>
          ))}
        </ul>
      );
      currentListItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('* ')) {
      currentListItems.push(trimmedLine.substring(2));
    } else {
      flushList(`ul-${i}`);
      if (trimmedLine) {
        elements.push(<p key={`p-${i}`} className="my-1">{parseLine(trimmedLine)}</p>);
      }
    }
  });

  flushList('ul-end');

  return <>{elements}</>;
};


const AIAnalyst: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('None');
  const [selectedSector, setSelectedSector] = useState<string>('None');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('Neutral');

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResponse('');

    let fullPrompt = prompt;
    let prefix = '';

    const sentimentPart = selectedSentiment !== 'Neutral' ? `with a ${selectedSentiment.toLowerCase()} sentiment` : '';
    const stockPart = selectedSymbol !== 'None' ? `for the stock ${selectedSymbol}` : '';
    const sectorPart = selectedSector !== 'None' ? `in the ${selectedSector} sector` : '';

    // Combine parts into a coherent sentence fragment
    const allParts = [sentimentPart, stockPart, sectorPart].filter(Boolean);

    if (allParts.length > 0) {
        prefix = `${allParts.join(' ')}: `;
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

  const handlePresetClick = (presetPrompt: string, symbol: string = 'None', sector: string = 'None') => {
    setPrompt(presetPrompt);
    setSelectedSymbol(symbol);
    setSelectedSector(sector);
    setSelectedSentiment('Neutral');
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
            <button onClick={() => handlePresetClick("Analyze my portfolio for risks and suggest diversification.")} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Analyze Portfolio</button>
            <button onClick={() => handlePresetClick("What are the key support and resistance levels?", 'TATA MOTORS')} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Technicals for TATA MOTORS</button>
            <button onClick={() => handlePresetClick("What is the short-term outlook and top stock picks?", 'None', 'Banking')} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors">Banking Sector Outlook</button>
            <button 
                onClick={() => handlePresetClick(`Generate a simple trading strategy for ${selectedSymbol}.`)}
                disabled={selectedSymbol === 'None'}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={selectedSymbol === 'None' ? 'Select a stock symbol first' : `Generate strategy for ${selectedSymbol}`}
            >
                Trading Strategy
            </button>
        </div>
      </div>

       <div className="mb-4">
         <p className="text-sm text-slate-400 mb-2">Add context (optional):</p>
         <div className="flex gap-4">
            <Selector label="Stock Symbol" value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)} options={mockSymbols} />
            <Selector label="Market Sector" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} options={mockSectors} />
            <Selector label="Sentiment" value={selectedSentiment} onChange={(e) => setSelectedSentiment(e.target.value)} options={sentimentOptions} />
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
          disabled={isLoading || !prompt.trim()}
          className="mt-2 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Thinking...' : 'Get Insights'}
        </button>
      </div>

      {(isLoading || response) && (
        <div className="mt-4 flex-1 min-h-0">
          <div className="bg-slate-900/50 border border-slate-700 rounded-md h-full overflow-y-auto p-4 text-sm text-slate-300">
            <h4 className="font-semibold text-slate-300 mb-2">AI Response:</h4>
            {isLoading && !response && (
              <div className="flex items-center space-x-2 text-slate-400">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                <span>Analyzing data...</span>
              </div>
            )}
            {response && <SimpleMarkdownRenderer text={response} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalyst;