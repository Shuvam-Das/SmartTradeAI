import React, { useState, useEffect, useRef } from 'react';
import BellIcon from './icons/BellIcon';
import { Alert, AlertType, User } from '../types';

// Mock alerts for the dropdown
const mockAlerts: Alert[] = [
  { id: '1', type: AlertType.Success, message: 'Executed BUY order for RELIANCE at ₹3005.00', timestamp: '2 mins ago' },
  { id: '2', type: AlertType.Error, message: 'Connection to Kite API failed. Retrying...', timestamp: '5 mins ago' },
  { id: '3', type: AlertType.Warning, message: 'HDFCBANK is approaching 52-week high.', timestamp: '1 hour ago' },
  { id: '4', type: AlertType.Info, message: 'Market opens in 30 minutes.', timestamp: '8 hours ago' },
];


const getAlertColors = (type: AlertType) => {
  switch (type) {
    case AlertType.Success:
      return 'text-green-400';
    case AlertType.Error:
      return 'text-red-400';
    case AlertType.Warning:
      return 'text-yellow-400';
    case AlertType.Info:
    default:
      return 'text-blue-400';
  }
};

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const useOutsideAlerter = (ref: React.RefObject<HTMLDivElement>, setOpenState: React.Dispatch<React.SetStateAction<boolean>>) => {
     useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpenState(false);
          }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [ref, setOpenState]);
  }
 
  useOutsideAlerter(notificationsRef, setIsNotificationsOpen);
  useOutsideAlerter(profileRef, setIsProfileOpen);


  return (
    <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-slate-800/70 backdrop-blur-sm border-b border-slate-700">
      <div className="flex items-center">
        <div className="relative text-slate-400 focus-within:text-slate-100">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition-all"
            placeholder="Search instrument..."
          />
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setIsNotificationsOpen((prev) => !prev)}
            className="flex mx-4 text-slate-400 hover:text-indigo-400 focus:outline-none"
            aria-label="Toggle notifications"
          >
            <BellIcon className="h-6 w-6" />
          </button>
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-20">
              <div className="p-4 font-bold text-white border-b border-slate-700">Notifications</div>
              <div className="divide-y divide-slate-700">
                {mockAlerts.slice(0, 4).map(alert => (
                  <div key={alert.id} className="p-4 hover:bg-slate-700/50">
                     <p className={`text-sm font-semibold ${getAlertColors(alert.type)}`}>{alert.type.toUpperCase()}</p>
                     <p className="text-sm text-slate-300 mt-1">{alert.message}</p>
                     <p className="text-xs text-slate-500 mt-2">{alert.timestamp}</p>
                  </div>
                ))}
              </div>
               <a href="#" className="block bg-slate-900/50 text-center text-white py-2 text-sm font-semibold hover:bg-slate-700 transition-colors">View all notifications</a>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
           <div className="flex items-center cursor-pointer" onClick={() => setIsProfileOpen(prev => !prev)}>
             <span className="mr-3 text-right hidden md:block">
                <span className="font-semibold text-white">{user.name}</span>
                <span className="block text-xs text-slate-400">Trader</span>
             </span>
             <button aria-label="Toggle user menu" className="relative z-10 block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none border-2 border-slate-600 hover:border-indigo-500 transition-colors">
                <img
                  className="object-cover w-full h-full"
                  src={user.avatarUrl}
                  alt="Your avatar"
                />
              </button>
           </div>
          {isProfileOpen && (
             <div className="absolute right-0 mt-3 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 py-2">
                <a href="#settings" onClick={(e) => { e.preventDefault(); onNavigate('Settings'); setIsProfileOpen(false);}} className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white">Settings</a>
                <a href="#logout" onClick={(e) => { e.preventDefault(); onLogout(); }} className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white">Logout</a>
             </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;