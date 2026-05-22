import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import api from '../../services/api';

export const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isApiHealthy, setIsApiHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const checkApiHealth = async () => {
      if (!navigator.onLine) {
        setIsApiHealthy(false);
        return;
      }

      try {
        await api.get('health');
        if (isMounted) {
          setIsApiHealthy(true);
        }
      } catch {
        if (isMounted) {
          setIsApiHealthy(false);
        }
      }
    };

    checkApiHealth();
    const intervalId = window.setInterval(checkApiHealth, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [isOnline]);

  const isConnected = isOnline && isApiHealthy === true;

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full glass-card flex items-center gap-2 shadow-2xl transition-all duration-500 ${
      isConnected ? 'border-forest-light' : 'border-red-400'
    }`}>
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-forest-light animate-pulse' : 'bg-red-500'}`} />
      <span className="text-sm font-medium">
        {isConnected ? (
          <span className="flex items-center gap-1.5"><Wifi className="w-4 h-4" /> API Connected</span>
        ) : (
          <span className="flex items-center gap-1.5 text-red-500"><WifiOff className="w-4 h-4" /> API Offline</span>
        )}
      </span>
    </div>
  );
};
