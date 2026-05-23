import { create } from 'zustand';
import { db, type LogEntry } from '../db/db';
import api from '../services/api';

export interface UnifiedLog {
  id?: string | number;
  _id?: string;
  userId: string;
  transcription: string;
  timestamp: number;
  location: { lat: number; lng: number } | null;
  syncStatus: 'pending' | 'synced';
}

interface LogState {
  logs: UnifiedLog[];
  isLoading: boolean;
  isSyncing: boolean;
  fetchLogs: () => Promise<void>;
  addLocalLog: (log: Omit<LogEntry, 'id' | 'syncStatus'>) => Promise<void>;
  setSyncing: (isSyncing: boolean) => void;
  syncLogs: () => Promise<void>;
}

export const useLogStore = create<LogState>((set, get) => ({
  logs: [],
  isLoading: false,
  isSyncing: false,

  fetchLogs: async () => {
    set({ isLoading: true });
    try {
      // 1. Fetch from cloud
      const { data: cloudLogs } = await api.get('logs');
      const syncedLogs: UnifiedLog[] = cloudLogs.map((log: any) => ({
        ...log,
        syncStatus: 'synced'
      }));

      // 2. Fetch from local Dexie
      const localLogs = await db.logs.where('syncStatus').equals('pending').toArray();
      const pendingLogs: UnifiedLog[] = localLogs.map(log => ({
        ...log,
        syncStatus: 'pending' as const
      }));

      // 3. Combine and sort
      const combined = [...pendingLogs, ...syncedLogs].sort((a, b) => b.timestamp - a.timestamp);
      set({ logs: combined, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      // Still show local logs if cloud fails
      const localLogs = await db.logs.where('syncStatus').equals('pending').toArray();
      set({ 
        logs: localLogs.map(l => ({ ...l, syncStatus: 'pending' as const })), 
        isLoading: false 
      });
    }
  },

  addLocalLog: async (logData) => {
    const newLog: LogEntry = {
      ...logData,
      syncStatus: 'pending'
    };
    const id = await db.logs.add(newLog);
    
    // Optimistically update UI
    const unifiedLog: UnifiedLog = { ...newLog, id, syncStatus: 'pending' };
    set((state) => ({
      logs: [unifiedLog, ...state.logs].sort((a, b) => b.timestamp - a.timestamp)
    }));
    
    // Trigger sync in background
    get().syncLogs();
  },

  setSyncing: (isSyncing) => set({ isSyncing }),

  syncLogs: async () => {
    if (get().isSyncing || !navigator.onLine) return;
    
    set({ isSyncing: true });
    try {
      const pendingLogs = await db.logs.where('syncStatus').equals('pending').toArray();
      
      for (const log of pendingLogs) {
        try {
          await api.post('logs', {
            transcription: log.transcription,
            timestamp: log.timestamp,
            location: log.location
          });
          await db.logs.update(log.id!, { syncStatus: 'synced' });
        } catch (err) {
          console.error('Failed to sync individual log:', err);
        }
      }
      // Refresh to get server IDs and updated statuses
      await get().fetchLogs();
    } finally {
      set({ isSyncing: false });
    }
  }
}));
