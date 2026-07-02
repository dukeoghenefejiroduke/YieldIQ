import { useEffect, useState } from 'react';
import { WifiOff, CloudUpload } from 'lucide-react';
import api from '../../services/api';
import { useLogStore } from '../../store/logStore';

export const ConnectionStatus = () => {
  const pendingCount = useLogStore((state) => state.pendingCount);
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
        await api.get('/health');
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

  if (isConnected && pendingCount === 0) return null;

  return (
    <div className={`p-2 text-center text-xs flex items-center justify-center gap-2 border-b ${
      !isConnected 
        ? 'bg-amber-100 border-amber-200 text-amber-900' 
        : 'bg-emerald-100 border-emerald-200 text-emerald-900'
    }`}>
      {!isConnected ? (
        <>
          <WifiOff className="w-3 h-3 text-amber-700" />
          <span>Offline {pendingCount > 0 ? `- ${pendingCount} items waiting for sync` : '- Limited Functionality'}</span>
        </>
      ) : (
        <>
          <CloudUpload className="w-3 h-3 text-emerald-700" />
          <span>{pendingCount} items pending sync</span>
        </>
      )}
    </div>
  );
};
