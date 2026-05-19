import Dexie, { Table } from 'dexie';

export interface LogEntry {
  id?: number;
  userId: string;
  transcription: string;
  timestamp: number;
  location: { lat: number; lng: number } | null;
  syncStatus: 'pending' | 'synced';
}

export class AgroDatabase extends Dexie {
  logs!: Table<LogEntry>;

  constructor() {
    super('AgroVoiceDB');
    this.version(1).stores({
      logs: '++id, userId, syncStatus'
    });
  }
}

export const db = new AgroDatabase();
