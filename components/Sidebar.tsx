import React from 'react';
import DashboardIcon from './icons/DashboardIcon';
import PortfolioIcon from './icons/PortfolioIcon';
import ScreenerIcon from './icons/ScreenerIcon';
import ChartIcon from './icons/ChartIcon';
import SettingsIcon from './icons/SettingsIcon';
import LogoutIcon from './icons/LogoutIcon';
import AIIcon from './icons/AIIcon';
import RobotIcon from './icons/RobotIcon';

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
    className={`flex items-center px-4 py-3 my-1 text-slate-300 rounded-lg transition-colors duration-200 group ${
      disabled 
        ? 'cursor-not-allowed opacity-50'
        : 'hover:bg-slate-700 hover:text-white'
    } ${
      active ? 'bg-indigo-600 text-white font-semibold shadow-lg' : ''
    }`}
  >
    {icon}
    <span className="mx-4">{label}</span>
  </a>
);

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onLogout }) => {
  return (
    <div className="flex-shrink-0 flex flex-col w-64 h-screen px-4 py-8 bg-slate-800 border-r border-slate-700">
      <div className="flex items-center justify-center h-12">
        <h2 className="text-2xl font-bold text-white flex items-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          <ChartIcon className="w-8 h-8 mr-2" />
          SmartTradeAI
        </h2>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-10">
        <nav className="-mx-3">
          <NavLink
            icon={<DashboardIcon className="w-6 h-6" />}
            label="Dashboard"
            active={activePage === 'Dashboard'}
            onClick={() => onNavigate('Dashboard')}
          />
          <NavLink
            icon={<PortfolioIcon className="w-6 h-6" />}
            label="Portfolio"
            active={activePage === 'Portfolio'}
            onClick={() => onNavigate('Portfolio')}
          />
           <NavLink
            icon={<RobotIcon className="w-6 h-6" />}
            label="Automations"
            active={activePage === 'Automations'}
            onClick={() => onNavigate('Automations')}
          />
          <NavLink
            icon={<ScreenerIcon className="w-6 h-6" />}
            label="Screener"
            active={activePage === 'Screener'}
            onClick={() => onNavigate('Screener')}
          />
          <div className="my-4 border-t border-slate-700 -mx-3"></div>
          <NavLink
            icon={<SettingsIcon className="w-6 h-6" />}
            label="Settings"
            active={activePage === 'Settings'}
            onClick={() => onNavigate('Settings')}
          />
        </nav>

        <div className="-mx-3">
           <NavLink
            icon={<LogoutIcon className="w-6 h-6" />}
            label="Logout"
            onClick={onLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;