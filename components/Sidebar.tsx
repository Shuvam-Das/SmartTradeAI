
import React from 'react';
import DashboardIcon from './icons/DashboardIcon';
import PortfolioIcon from './icons/PortfolioIcon';
import ScreenerIcon from './icons/ScreenerIcon';
import ChartIcon from './icons/ChartIcon';
import SettingsIcon from './icons/SettingsIcon';
import LogoutIcon from './icons/LogoutIcon';
import AIIcon from './icons/AIIcon';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, active, onClick, disabled }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); if (!disabled) onClick(); }}
    className={`flex items-center px-4 py-2 mt-5 text-slate-400 rounded-md transition-colors duration-200 ${
      disabled 
        ? 'cursor-not-allowed opacity-50'
        : 'hover:bg-slate-700 hover:text-slate-200'
    } ${
      active ? 'bg-slate-700 text-slate-100 shadow-lg' : ''
    }`}
  >
    {icon}
    <span className="mx-4 font-medium">{label}</span>
  </a>
);

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onLogout }) => {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-slate-800 border-r border-slate-700">
      <h2 className="text-3xl font-semibold text-white flex items-center">
        <ChartIcon className="w-8 h-8 mr-2 text-indigo-400" />
        SmartTradeAI
      </h2>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <NavLink
            icon={<DashboardIcon className="w-5 h-5" />}
            label="Dashboard"
            active={activePage === 'Dashboard'}
            onClick={() => onNavigate('Dashboard')}
          />
          <NavLink
            icon={<PortfolioIcon className="w-5 h-5" />}
            label="Portfolio"
            active={activePage === 'Portfolio'}
            onClick={() => onNavigate('Portfolio')}
          />
          <NavLink
            icon={<ScreenerIcon className="w-5 h-5" />}
            label="Screener"
            active={activePage === 'Screener'}
            onClick={() => onNavigate('Screener')}
          />
          <NavLink
            icon={<AIIcon className="w-5 h-5" />}
            label="AI Analyst"
            active={activePage === 'AI Analyst'}
            onClick={() => onNavigate('Dashboard')} // AI Analyst is on the dashboard
            disabled={activePage !== 'Dashboard'}
          />
          <NavLink
            icon={<SettingsIcon className="w-5 h-5" />}
            label="Settings"
            active={activePage === 'Settings'}
            onClick={() => onNavigate('Settings')}
          />
        </nav>

        <div>
           <NavLink
            icon={<LogoutIcon className="w-5 h-5" />}
            label="Logout"
            onClick={onLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
