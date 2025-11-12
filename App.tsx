
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Screener from './components/Screener';
import PortfolioPage from './components/PortfolioPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import { User } from './types';

const mockUser: User = {
  name: 'Shuvam Das',
  email: 'shuvam.das@example.com',
  avatarUrl: 'https://picsum.photos/100/100'
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (/* credentials */) => {
    // In a real app, you'd validate credentials here
    setUser(mockUser);
    setIsAuthenticated(true);
    setActivePage('Dashboard'); // Go to dashboard on login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Screener':
        return <Screener />;
      case 'Portfolio':
        return <PortfolioPage />;
      case 'Settings':
        return <SettingsPage user={user!} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user!} onLogout={handleLogout}/>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900">
          <div className="container mx-auto px-6 py-8">
            {renderPage()}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
