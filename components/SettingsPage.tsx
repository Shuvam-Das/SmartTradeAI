
import React, { useState } from 'react';
import { User, ApiKeys } from '../types';
import SettingsIcon from './icons/SettingsIcon';
import UserIcon from './icons/UserIcon';
import KeyIcon from './icons/KeyIcon';
import MailIcon from './icons/MailIcon';

interface SettingsPageProps {
  user: User;
}

const SettingsCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
        <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
            {icon}
            {title}
        </h4>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);


const SettingsPage: React.FC<SettingsPageProps> = ({ user }) => {
    const [apiKeys, setApiKeys] = useState<ApiKeys>({ zerodha: 'AB1234********', tradingView: '', newsApi: '' });
    const [dailyEmail, setDailyEmail] = useState(true);

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApiKeys({ ...apiKeys, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Mock save action
        console.log("Settings saved:", { apiKeys, dailyEmail });
        // Show a success toast in a real app
    };

  return (
    <div>
      <h3 className="text-3xl font-medium text-white mb-6 flex items-center">
        <SettingsIcon className="w-8 h-8 mr-3 text-indigo-400" />
        Settings
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <SettingsCard icon={<UserIcon className="w-6 h-6 mr-3"/>} title="User Profile">
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Full Name</label>
                    <input type="text" value={user.name} disabled className="mt-1 w-full p-2 text-sm text-slate-300 bg-slate-700/50 border border-slate-600 rounded-md cursor-not-allowed" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Email Address</label>
                    <input type="email" value={user.email} disabled className="mt-1 w-full p-2 text-sm text-slate-300 bg-slate-700/50 border border-slate-600 rounded-md cursor-not-allowed" />
                </div>
            </SettingsCard>
        </div>
        <div>
             <SettingsCard icon={<KeyIcon className="w-6 h-6 mr-3"/>} title="API Keys">
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Zerodha Kite API Key</label>
                    <input type="password" name="zerodha" value={apiKeys.zerodha} onChange={handleKeyChange} className="mt-1 w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">TradingView API Key</label>
                    <input type="password" name="tradingView" value={apiKeys.tradingView} onChange={handleKeyChange} placeholder="Enter your key" className="mt-1 w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">NewsAPI Key (for sentiment)</label>
                    <input type="password" name="newsApi" value={apiKeys.newsApi} onChange={handleKeyChange} placeholder="Enter your key" className="mt-1 w-full p-2 text-sm text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </SettingsCard>
        </div>
        <div className="lg:col-span-2">
             <SettingsCard icon={<MailIcon className="w-6 h-6 mr-3"/>} title="Notifications">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-slate-200">Daily Performance Summary Email</p>
                        <p className="text-sm text-slate-400">Receive a daily summary of your portfolio's performance and AI predictions.</p>
                    </div>
                    <label htmlFor="email-toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" id="email-toggle" className="sr-only" checked={dailyEmail} onChange={() => setDailyEmail(!dailyEmail)} />
                            <div className="block bg-slate-600 w-14 h-8 rounded-full"></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${dailyEmail ? 'transform translate-x-full bg-indigo-400' : ''}`}></div>
                        </div>
                    </label>
                </div>
             </SettingsCard>
        </div>
      </div>
       <div className="mt-8 text-right">
            <button 
                onClick={handleSave}
                className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
            >
                Save Changes
            </button>
        </div>
    </div>
  );
};

export default SettingsPage;
