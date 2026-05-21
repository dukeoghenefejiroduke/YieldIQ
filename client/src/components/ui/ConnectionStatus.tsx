import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full glass-card flex items-center gap-2 shadow-2xl transition-all duration-500 ${
      isOnline ? 'border-forest-light' : 'border-red-400'
    }`}>
      <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-forest-light animate-pulse' : 'bg-red-500'}`} />
      <span className="text-sm font-medium">
        {isOnline ? (
          <span className="flex items-center gap-1.5"><Wifi className="w-4 h-4" /> Connected</span>
        ) : (
          <span className="flex items-center gap-1.5 text-red-500"><WifiOff className="w-4 h-4" /> Offline Mode</span>
        )}
      </span>
    </div>
  );
};
