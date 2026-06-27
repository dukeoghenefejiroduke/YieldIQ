import { db, type LogEntry } from '../db/db';
import api from './api';

export const syncLogs = async () => {
  const pendingLogs = await db.logs.where('syncStatus').equals('pending').toArray();
  if (pendingLogs.length === 0) return;
  
  // Sort by timestamp to ensure chronological order of syncing
  pendingLogs.sort((a, b) => a.timestamp - b.timestamp);
  
  for (const log of pendingLogs) {
    let retries = 0;
    const maxRetries = 5; // Increased for better rural resilience
    let delay = 2000; // Start with 2 seconds

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
        console.log(`Successfully synced log ${log.id}`);
        break;
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          console.error(`CRITICAL: Failed to sync log ${log.id} after ${maxRetries} attempts`, error);
        } else {
          console.warn(`Sync failed for log ${log.id}, attempt ${retries}. Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        }
      }
    }
  }
};
