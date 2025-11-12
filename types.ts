
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface Holding extends Stock {
  quantity: number;
  avgPrice: number;
}

export interface PortfolioSummaryData {
  totalValue: number;
  todaysPL: number;
  totalPL: number;
}

export interface PnlDataPoint {
  date: string;
  pnl: number;
}

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Success = 'success'
}

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  timestamp: string;
}

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface ApiKeys {
    zerodha: string;
    tradingView: string;
    newsApi: string;
}
