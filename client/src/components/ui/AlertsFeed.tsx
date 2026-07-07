import { useState, useEffect } from 'react';
import { Bell, TrendingUp, CloudRain } from 'lucide-react';
import api from '../../services/api';

export const AlertsFeed = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
        try {
            const [weatherRes, marketRes] = await Promise.all([
                api.get('/weather/alert'),
                api.get('/market/alerts')
            ]);
            
            const newAlerts = [];
            if (weatherRes.data.alert) {
                newAlerts.push({ id: 'weather', type: 'weather', message: 'Insurance trigger active due to low rainfall.' });
            }
            if (marketRes.data && marketRes.data.length > 0) {
                marketRes.data.forEach((alert: any, index: number) => {
                    newAlerts.push({ id: `market-${index}`, type: 'price', message: alert.message });
                });
            }
            setAlerts(newAlerts);
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
        {alerts.length === 0 ? <p className="text-sm text-gray-400">No new alerts.</p> : alerts.map(alert => (
          <div key={alert.id} className="p-3 bg-background rounded-lg border border-glass-border flex gap-3">
            {alert.type === 'weather' ? <CloudRain className="w-5 h-5 text-blue-500" /> : <TrendingUp className="w-5 h-5 text-green-500" />}
            <p className="text-sm">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
