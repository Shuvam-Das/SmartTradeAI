
import React from 'react';
import { Alert, AlertType } from '../types';

const getAlertColors = (type: AlertType) => {
  switch (type) {
    case AlertType.Success:
      return 'border-green-500 bg-green-500/10';
    case AlertType.Error:
      return 'border-red-500 bg-red-500/10';
    case AlertType.Warning:
      return 'border-yellow-500 bg-yellow-500/10';
    case AlertType.Info:
    default:
      return 'border-blue-500 bg-blue-500/10';
  }
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => (
  <div className={`p-4 rounded-lg border-l-4 ${getAlertColors(alert.type)}`}>
    <p className="text-sm text-slate-200">{alert.message}</p>
    <p className="text-xs text-slate-500 mt-1">{alert.timestamp}</p>
  </div>
);

const Alerts: React.FC<{alerts: Alert[]}> = ({ alerts }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg h-full">
      <h3 className="text-xl font-semibold text-white mb-4">System Alerts</h3>
      <div className="space-y-4">
        {alerts.slice(0, 4).map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
