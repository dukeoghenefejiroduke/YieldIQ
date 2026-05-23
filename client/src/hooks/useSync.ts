import { useEffect } from 'react';
import { useLogStore } from '../store/logStore';

export const useSync = () => {
  const syncLogs = useLogStore((state) => state.syncLogs);

  useEffect(() => {
    // Initial sync
    syncLogs();

    // Sync when coming back online
    window.addEventListener('online', syncLogs);

    // Periodic background sync every 5 minutes
    const interval = setInterval(syncLogs, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('online', syncLogs);
      clearInterval(interval);
    };
  }, [syncLogs]);
};
