import { describe, it, expect } from 'vitest';
import { parseTransaction } from './aiParser';

describe('aiParser', () => {
  it('should parse a simple sale transaction', async () => {
    const result = await parseTransaction('I sold 100 maize');
    expect(result).toEqual({ type: 'sale', amount: 100, item: 'maize' });
  });

  it('should parse a purchase transaction', async () => {
    const result = await parseTransaction('I bought 50 rice');
    expect(result).toEqual({ type: 'purchase', amount: 50, item: 'rice' });
  });

  it('should parse a credit transaction', async () => {
    const result = await parseTransaction('Owed 20 beans');
    expect(result).toEqual({ type: 'credit', amount: 20, item: 'beans' });
  });

  it('should handle empty input', async () => {
    const result = await parseTransaction('');
    expect(result).toEqual({ type: 'sale', amount: 0, item: 'general' });
  });

  it('should handle missing amount', async () => {
    const result = await parseTransaction('sold maize');
    expect(result).toEqual({ type: 'sale', amount: 0, item: 'maize' });
  });

  it('should handle unknown item', async () => {
    const result = await parseTransaction('sold 10 unknownItem');
    expect(result).toEqual({ type: 'sale', amount: 10, item: 'general' });
  });
});
