import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Screener from './components/Screener';
import PortfolioPage from './components/PortfolioPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';
import AutomationsPage from './components/AutomationsPage';
import CookieBanner from './components/CookieBanner';
import { User, Holding, Alert, AlertType, AIStrategy, PortfolioSummaryData } from './types';

const mockUser: User = {
  name: 'Shuvam Das',
  email: 'shuvam.das@example.com',
  avatarUrl: 'https://picsum.photos/100/100'
};

const initialHoldings: Holding[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 3010.55, change: 45.10, changePercent: 1.52, quantity: 50, avgPrice: 2850.00, aiStrategyActive: false },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 3850.20, change: -12.75, changePercent: -0.33, quantity: 25, avgPrice: 3900.50, aiStrategyActive: false },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1680.75, change: 8.40, changePercent: 0.50, quantity: 100, avgPrice: 1550.25, aiStrategyActive: false },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', price: 7120.80, change: 120.30, changePercent: 1.72, quantity: 15, avgPrice: 6500.00, aiStrategyActive: false },
  { symbol: 'TATA MOTORS', name: 'Tata Motors Ltd', price: 985.40, change: 5.10, changePercent: 0.52, quantity: 200, avgPrice: 910.80, aiStrategyActive: false },
];

const initialAlerts: Alert[] = [
  { id: '1', type: AlertType.Success, message: 'Executed BUY order for RELIANCE at ₹3005.00', timestamp: '2 mins ago' },
  { id: '2', type: AlertType.Error, message: 'Connection to Kite API failed. Retrying...', timestamp: '5 mins ago' },
  { id: '3', type: AlertType.Warning, message: 'HDFCBANK is approaching 52-week high.', timestamp: '1 hour ago' },
  { id: '4', type: AlertType.Info, message: 'Market opens in 30 minutes.', timestamp: '8 hours ago' },
];


const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [activeStrategies, setActiveStrategies] = useState<AIStrategy[]>([]);
  const [summaryData, setSummaryData] = useState<PortfolioSummaryData>({ totalValue: 0, todaysPL: 0, totalPL: 0 });
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
        setShowCookieBanner(true);
    }
  }, []);

  // Main simulation and agentic AI loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAuthenticated) return;

      let newHoldings = [...holdings];
      let newStrategies = [...activeStrategies];
      let newAlerts = [...alerts];

      // 1. Simulate price changes
      newHoldings = newHoldings.map(holding => {
        if (Math.random() > 0.4) { // 60% chance to update
          const priceChange = (Math.random() - 0.5) * (holding.price / 200);
          const newPrice = holding.price + priceChange;
          return { ...holding, price: newPrice };
        }
        return holding;
      });

      // 2. Check active AI strategies
      newStrategies.forEach((strategy, index) => {
        if (strategy.status === 'active') {
          const stock = newHoldings.find(h => h.symbol === strategy.symbol);
          if (stock) {
            let tradeExecuted = false;
            let profit = 0;
            if (stock.price >= strategy.targetPrice) {
              profit = (stock.price - stock.avgPrice) * stock.quantity;
              newAlerts.unshift({
                id: Date.now().toString(),
                type: AlertType.Success,
                message: `AI profit taker executed SELL for ${stock.symbol} at ₹${stock.price.toFixed(2)}. Profit: ₹${profit.toFixed(2)}`,
                timestamp: 'Just now',
              });
              tradeExecuted = true;
            } else if (stock.price <= strategy.stopLossPrice) {
              profit = (stock.price - stock.avgPrice) * stock.quantity;
              newAlerts.unshift({
                id: Date.now().toString(),
                type: AlertType.Warning,
                message: `AI stop-loss executed SELL for ${stock.symbol} at ₹${stock.price.toFixed(2)}. Loss: ₹${profit.toFixed(2)}`,
                timestamp: 'Just now',
              });
              tradeExecuted = true;
            }

            if (tradeExecuted) {
              newStrategies[index] = { ...strategy, status: 'completed', completedAt: new Date().toISOString() };
              newHoldings = newHoldings.filter(h => h.symbol !== stock.symbol);
            }
          }
        }
      });
      
      setHoldings(newHoldings);
      setActiveStrategies(newStrategies);
      if(newAlerts.length > alerts.length) {
         setAlerts(newAlerts.slice(0, 10)); // Keep alerts list from growing too large
      }

    }, 2000);

    return () => clearInterval(interval);
  }, [isAuthenticated, holdings, activeStrategies, alerts]);
  
  // Recalculate portfolio summary whenever holdings change
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const totalInvestment = initialHoldings.filter(ih => holdings.some(h => h.symbol === ih.symbol)).reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
    const currentValue = holdings.reduce((acc, h) => acc + (h.quantity * h.price), 0);
    const totalPL = currentValue - totalInvestment;
    
    // This is a simplified todaysPL for demo purposes
    const todaysPL = holdings.reduce((acc, h) => {
        const initialHolding = initialHoldings.find(ih => ih.symbol === h.symbol);
        const initialPrice = initialHolding ? (initialHolding.price - initialHolding.change) : h.price;
        return acc + (h.price - initialPrice) * h.quantity;
    }, 0);


    setSummaryData({
        totalValue: currentValue,
        todaysPL: todaysPL,
        totalPL: totalPL,
    });
  }, [holdings, isAuthenticated]);


  const handleLogin = (/* credentials */) => {
    setUser(mockUser);
    setIsAuthenticated(true);
    setHoldings(initialHoldings);
    setActivePage('Dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setHoldings([]);
    setActiveStrategies([]);
  };
  
  const handleCookieConsent = (consent: boolean) => {
    localStorage.setItem('cookie_consent', consent.toString());
    setShowCookieBanner(false);
  }

  const handleActivateStrategy = (strategy: Omit<AIStrategy, 'status' | 'createdAt'>) => {
    const newStrategy: AIStrategy = {
        ...strategy,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    setActiveStrategies(prev => [...prev, newStrategy]);
    setHoldings(prev => prev.map(h => h.symbol === strategy.symbol ? { ...h, aiStrategyActive: true } : h));
  };
  
  const handleDeactivateStrategy = (symbol: string) => {
      setActiveStrategies(prev => prev.map(s => s.symbol === symbol ? {...s, status: 'cancelled', completedAt: new Date().toISOString()} : s));
      setHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, aiStrategyActive: false } : h));
  };

  if (!isAuthenticated) {
    return (
        <>
            <LoginPage onLogin={handleLogin} />
            {showCookieBanner && <CookieBanner onAccept={() => handleCookieConsent(true)} onDecline={() => handleCookieConsent(false)} />}
        </>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard summaryData={summaryData} alerts={alerts} />;
      case 'Screener':
        return <Screener />;
      case 'Portfolio':
        return <PortfolioPage holdings={holdings} onActivateStrategy={handleActivateStrategy}/>;
      case 'Automations':
        return <AutomationsPage strategies={activeStrategies} onDeactivate={handleDeactivateStrategy} />;
      case 'Settings':
        return <SettingsPage user={user!} />;
      default:
        return <Dashboard summaryData={summaryData} alerts={alerts} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user!} onLogout={handleLogout} onNavigate={setActivePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-6 py-8 page-enter">
            {renderPage()}
          </div>
        </main>
        <Footer />
        {showCookieBanner && <CookieBanner onAccept={() => handleCookieConsent(true)} onDecline={() => handleCookieConsent(false)} />}
      </div>
    </div>
  );
};

export default App;