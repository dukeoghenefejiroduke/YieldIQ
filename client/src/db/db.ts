import Dexie, { type Table } from 'dexie';

export interface LogEntry {
  id?: number;
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

export interface TaskEntry {
  id?: number;
  userId: string;
  title: string;
  completed: boolean;
}

export interface Farmer {
  id?: number;
  name: string;
  location: string;
  creditScore: number;
}

export class AgroDatabase extends Dexie {
  logs!: Table<LogEntry>;
  tasks!: Table<TaskEntry>;
  farmers!: Table<Farmer>;

  constructor() {
    super('AgroVoiceDB');
    this.version(3).stores({
      logs: '++id, userId, syncStatus, type, farmerId',
      tasks: '++id, userId, completed',
      farmers: '++id, name, creditScore'
    });
  }

  async updateFarmerCreditScore(farmerId: number, amount: number, type: 'sale' | 'purchase' | 'credit') {
    const farmer = await this.farmers.get(farmerId);
    if (!farmer) return;

    // Simple scoring logic: sales increase score, credit/purchases decrease/stabilize
    let change = 0;
    if (type === 'sale') change = amount * 0.01;
    if (type === 'credit') change = -amount * 0.05;

    await this.farmers.update(farmerId, {
      creditScore: Math.max(0, farmer.creditScore + change)
    });
  }
}

export const db = new AgroDatabase();
