import React from 'react';
import { Cloud, WifiOff } from 'lucide-react';
import { useLogStore } from '../../store/logStore';

export const SyncIndicator = () => {
  const { pendingCount } = useLogStore();
  const isOnline = navigator.onLine;

  if (isOnline && pendingCount === 0) return null;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${!isOnline ? 'bg-alert-danger text-white' : 'bg-amber-500 text-white'}`}>
      {isOnline ? (
        <>
          <Cloud className="w-4 h-4" />
          <span>{pendingCount} items pending</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span>Offline</span>
        </>
      )}
    </div>
  );
};
