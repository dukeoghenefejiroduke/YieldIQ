import { create } from 'zustand';
import { db, type LogEntry } from '../db/db';
import api from '../services/api';
import { syncLogs as performSync } from '../services/syncService';

export interface UnifiedLog {
  id?: string | number;
  _id?: string;
  userId: string;
  farmerId?: number;
  type: 'sale' | 'purchase' | 'credit';
  amount: number;
  item: string;
  transcription: string;
  timestamp: number;
  location: { lat: number; lng: number } | null;
  syncStatus: 'pending' | 'synced';
}

interface LogState {
  logs: UnifiedLog[];
  isLoading: boolean;
  isSyncing: boolean;
  syncMessage: string | null;
  demoMode: boolean;
  toggleDemoMode: () => void;
  fetchLogs: () => Promise<void>;
  addLocalLog: (log: Omit<LogEntry, 'id' | 'syncStatus'>) => Promise<void>;
  setSyncing: (isSyncing: boolean, message?: string | null) => void;
  syncLogs: () => Promise<void>;
  simulateIncomingEvent: () => void;
}

export const useLogStore = create<LogState>((set, get) => ({
  logs: [],
  isLoading: false,
  isSyncing: false,
  syncMessage: null,
  demoMode: false,
  toggleDemoMode: () => set((state) => ({ demoMode: !state.demoMode })),

  simulateIncomingEvent: () => {
    if (!get().demoMode) return;
    const demoLog: UnifiedLog = {
        userId: 'demo-user',
        type: 'sale',
        amount: Math.floor(Math.random() * 1000),
        item: 'maize',
        transcription: 'Simulated WhatsApp sale',
        timestamp: Date.now(),
        location: null,
        syncStatus: 'synced'
    };
    set((state) => ({ logs: [demoLog, ...state.logs].sort((a, b) => b.timestamp - a.timestamp) }));
  },

  fetchLogs: async () => {
    set({ isLoading: true });
    try {
      const { data: cloudLogs } = await api.get('logs');
      const syncedLogs: UnifiedLog[] = cloudLogs.map((log: UnifiedLog) => ({
        ...log,
        syncStatus: 'synced' as const
      }));

      const localLogs = await db.logs.where('syncStatus').equals('pending').toArray();
      const pendingLogs: UnifiedLog[] = localLogs.map(log => ({
        ...log,
        syncStatus: 'pending' as const
      }));

      const combined = [...pendingLogs, ...syncedLogs].sort((a, b) => b.timestamp - a.timestamp);
      set({ logs: combined, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch logs:', error);
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
    
    const unifiedLog: UnifiedLog = { ...newLog, id, syncStatus: 'pending' };
    set((state) => ({
      logs: [unifiedLog, ...state.logs].sort((a, b) => b.timestamp - a.timestamp)
    }));
    
    get().syncLogs();
  },

  setSyncing: (isSyncing, message = null) => set({ isSyncing, syncMessage: message }),

  syncLogs: async () => {
    if (get().isSyncing || !navigator.onLine) {
        if (!navigator.onLine) set({ syncMessage: 'Offline - Changes saved locally' });
        return;
    }
    
    set({ isSyncing: true, syncMessage: 'Syncing to cloud...' });
    try {
      await performSync();
      set({ syncMessage: 'Synced' });
      await get().fetchLogs();
    } catch (error) {
        set({ syncMessage: 'Sync failed - will retry' });
    } finally {
      set({ isSyncing: false });
    }
  }
}));
