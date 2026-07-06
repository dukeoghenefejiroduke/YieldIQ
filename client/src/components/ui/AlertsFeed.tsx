import { useState, useEffect } from 'react';
import { Bell, TrendingUp, CloudRain } from 'lucide-react';
import api from '../services/api';

export const AlertsFeed = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this might use WebSockets or a poll
    const fetchAlerts = async () => {
        try {
            // Placeholder: Assuming an endpoint exists or we are simulating
            // For now, displaying static example to show UI layout
            setAlerts([
                { id: 1, type: 'weather', message: 'Low rainfall detected. Insurance trigger active.' },
                { id: 2, type: 'price', message: 'Maize prices increased by 5% in your region.' }
            ]);
        } catch (error) {
            console.error('Error fetching alerts', error);
        }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-secondary" /> Advisory Alerts
      </h2>
      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className="p-3 bg-background rounded-lg border border-glass-border flex gap-3">
            {alert.type === 'weather' ? <CloudRain className="w-5 h-5 text-blue-500" /> : <TrendingUp className="w-5 h-5 text-green-500" />}
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
