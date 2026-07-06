import { db } from '../db/db';
import api from './api';

export const syncLogs = async () => {
  const pendingLogs = await db.logs.where('syncStatus').equals('pending').toArray();
  if (pendingLogs.length === 0) return;
  
  // Sort by timestamp to ensure chronological order of syncing
  pendingLogs.sort((a, b) => a.timestamp - b.timestamp);
  
  // Batch process
  try {
      const payload = pendingLogs.map(log => ({
        uuid: log.uuid,
        transcription: log.transcription,
        timestamp: log.timestamp,
        location: log.location,
        type: log.type,
        amount: log.amount,
        item: log.item
      }));

      await api.post('/logs/batch', { logs: payload });
      
      // Mark all as synced
      await db.logs.bulkUpdate(pendingLogs.map(log => log.id!), { syncStatus: 'synced' });
      console.log(`Successfully synced ${pendingLogs.length} logs`);
  } catch (error) {
    console.error('Failed to batch sync logs', error);
    // Fallback: individual sync with retry (optional, keeping it simple for now)
  }
};
