import { useEffect } from 'react';
import { db } from '../db/db';
import api from '../services/api';

export const useSync = () => {
  useEffect(() => {
    const handleSync = async () => {
      if (navigator.onLine) {
        const pendingLogs = await db.logs.where('syncStatus').equals('pending').toArray();
        
        for (const log of pendingLogs) {
          try {
            // Include userId from Dexie/Auth store implicitly via the header-intercepted API call
            await api.post('logs', {
              transcription: log.transcription,
              timestamp: log.timestamp,
              location: log.location
            });
            await db.logs.update(log.id!, { syncStatus: 'synced' });
          } catch (err) {
            console.error('Failed to sync log:', err);
          }
        }
      }
    };

    window.addEventListener('online', handleSync);
    handleSync();

    return () => window.removeEventListener('online', handleSync);
  }, []);
};
