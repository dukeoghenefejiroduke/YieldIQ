import { db } from '../db/db';
import api from './api';

export const syncLogs = async () => {
  const pendingLogs = await db.logs.where('syncStatus').equals('pending').toArray();
  if (pendingLogs.length === 0) return;

  // Batching: send all pending logs in one request if the API supports it
  // Assuming the API endpoint for batching would be POST /logs/batch
  // For now, let's implement a better retry strategy for individual logs first
  
  for (const log of pendingLogs) {
    let retries = 0;
    const maxRetries = 3;
    let delay = 1000; // start with 1 second

    while (retries < maxRetries) {
      try {
        await api.post('logs', {
          transcription: log.transcription,
          timestamp: log.timestamp,
          location: log.location,
          type: log.type,
          amount: log.amount,
          item: log.item
        });
        await db.logs.update(log.id!, { syncStatus: 'synced' });
        break; // success
      } catch {
        retries++;
        if (retries === maxRetries) {
          console.error(`Failed to sync log ${log.id} after ${maxRetries} attempts`);
        } else {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // exponential backoff
        }
      }
    }
  }
};
