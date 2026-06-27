import { db, type LogEntry } from '../db/db';
import api from './api';

export const syncLogs = async () => {
  const pendingLogs = await db.logs.where('syncStatus').equals('pending').toArray();
  if (pendingLogs.length === 0) return;
  
  for (const log of pendingLogs) {
    let retries = 0;
    const maxRetries = 3;
    let delay = 1000;

    while (retries < maxRetries) {
      try {
        const payload: Omit<LogEntry, 'id' | 'syncStatus' | 'userId'> = {
          transcription: log.transcription,
          timestamp: log.timestamp,
          location: log.location,
          type: log.type,
          amount: log.amount,
          item: log.item
        };

        await api.post('/logs', payload);
        await db.logs.update(log.id!, { syncStatus: 'synced' });
        break;
      } catch {
        retries++;
        if (retries === maxRetries) {
          console.error(`Failed to sync log ${log.id} after ${maxRetries} attempts`);
        } else {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }
  }
};
