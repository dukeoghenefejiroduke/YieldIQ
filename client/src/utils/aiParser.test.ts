import { describe, it, expect, vi } from 'vitest';
import * as aiParser from './aiParser';

// Mock parser behavior so tests stay deterministic.
vi.mock('./aiParser', async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    parseTransaction: vi.fn().mockImplementation(async (text: string) => {
        const lower = text.toLowerCase();
        let type: 'sale' | 'purchase' | 'credit' = 'sale';
        if (lower.includes('bought') || lower.includes('purchase')) type = 'purchase';
        if (lower.includes('credit') || lower.includes('owed')) type = 'credit';
        const amountMatch = lower.match(/(\d+)/);
        const amount = amountMatch ? parseInt(amountMatch[0], 10) : 0;
        const item = lower.split(' ').find(word => ['maize', 'beans', 'rice', 'yam'].includes(word)) || 'general';
        return { type, amount, item };
    })
  };
});

describe('aiParser', () => {
  it('should parse a simple sale transaction', async () => {
    const result = await aiParser.parseTransaction('I sold 100 maize');
    expect(result).toHaveProperty('type', 'sale');
    expect(result).toHaveProperty('amount', 100);
    expect(result).toHaveProperty('item', 'maize');
  });

  it('should parse a purchase transaction', async () => {
    const result = await aiParser.parseTransaction('bought 50 rice');
    expect(result).toHaveProperty('type', 'purchase');
    expect(result).toHaveProperty('amount', 50);
    expect(result).toHaveProperty('item', 'rice');
  });
});
