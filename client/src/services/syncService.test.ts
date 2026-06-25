import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { syncLogs } from './syncService';
import { db } from '../db/db';
import api from './api';

vi.mock('../db/db', () => ({
  db: {
    logs: {
      where: vi.fn().mockReturnThis(),
      equals: vi.fn().mockReturnThis(),
      toArray: vi.fn(),
      update: vi.fn()
    }
  }
}));

vi.mock('./api', () => ({
  default: {
    post: vi.fn()
  }
}));

describe('syncLogs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

// ...
  it('should retry on failure and eventually succeed', async () => {
    // Mock 2 failures then success
    (api.post as Mock).mockRejectedValueOnce(new Error('fail'))
                           .mockRejectedValueOnce(new Error('fail'))
                           .mockResolvedValueOnce({ data: {} });
    
    (db.logs.toArray as Mock).mockResolvedValue([{ id: 1, transcription: 'test' }]);
    
    await syncLogs();
    
    expect(api.post).toHaveBeenCalledTimes(3);
    expect(db.logs.update).toHaveBeenCalledWith(1, { syncStatus: 'synced' });
  });

  it('should give up after max retries', async () => {
      (api.post as Mock).mockRejectedValue(new Error('permanent fail'));
      (db.logs.toArray as Mock).mockResolvedValue([{ id: 1, transcription: 'test' }]);

      await syncLogs();

      expect(api.post).toHaveBeenCalledTimes(3); // 3 attempts
      expect(db.logs.update).not.toHaveBeenCalled();
  });
});
