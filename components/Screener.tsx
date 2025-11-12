
import React from 'react';
import FilterIcon from './icons/FilterIcon';

const FilterInput: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-400 mb-2">{label}</label>
    {children}
  </div>
);

const Screener: React.FC = () => {
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
             <button className="w-full md:w-auto bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors disabled:bg-slate-600">
                Run Screen
            </button>
        </div>
      </div>

      <div className="mt-8 bg-slate-800 p-6 rounded-lg shadow-lg">
         <h4 className="text-xl font-semibold text-white mb-4">Results (0)</h4>
         <div className="text-center text-slate-500 py-16">
            <p className="text-lg">Screening results will appear here</p>
            <p className="text-sm mt-2">Configure your filters above and click "Run Screen" to find stocks.</p>
         </div>
      </div>
    </div>
  );
};

export default Screener;
